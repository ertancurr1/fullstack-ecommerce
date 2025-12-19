# InfinityFree Hosting - Important Notes

This document contains InfinityFree-specific configuration details and common issues.

---

## Why InfinityFree?

✅ **Completely FREE** - No credit card, no hidden costs
✅ **Unlimited Bandwidth** - No traffic limits
✅ **MySQL Databases** - Included for free
✅ **PHP Support** - Compatible with your backend
✅ **Free SSL** - HTTPS included
✅ **Perfect for Portfolio** - Great for demo projects

---

## Key Differences from Paid Hosting

### 1. Database Host is NOT `localhost`

❌ **Wrong**:
```env
DB_HOST=localhost
```

✅ **Correct**:
```env
DB_HOST=sql123.epizy.com
```

InfinityFree's MySQL runs on a separate server, so you **must** use the MySQL hostname provided in your control panel.

### 2. Database Names Have Prefixes

All database names and users include your account prefix (e.g., `epiz_12345678_`).

Example:
```env
DB_NAME=epiz_12345678_ecommerce
DB_USER=epiz_12345678_user
```

### 3. File Structure

InfinityFree uses `htdocs/` instead of `public_html/`:
- Upload files to: `htdocs/`
- Public files should be in `htdocs/` root (not in a subdolder)

### 4. .env File Creation

You cannot upload `.env` files directly via FTP (security restriction).

**Solution**: Create `.env` using the File Manager in the control panel.

---

## Step-by-Step Setup

### 1. Get Your Credentials

After creating your hosting account, note:
- **FTP Hostname**: `ftpupload.net`
- **FTP Username**: `epiz_XXXXXXXX`
- **FTP Password**: (what you set)
- **MySQL Hostname**: `sqlXXX.epizy.com`
- **Domain**: `yourproject.epizy.com` or your custom domain

### 2. Connect via FTP

Use FileZilla:
1. Download FileZilla from [filezilla-project.org](https://filezilla-project.org/)
2. Connect with:
   - Host: `ftpupload.net`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. Navigate to `htdocs/` folder
4. Upload your project files

### 3. Project Structure on Server

After upload, your `htdocs/` should look like:

```
htdocs/
├── config/
├── src/
├── vendor/
├── public/
│   ├── index.php
│   └── .htaccess
├── .htaccess (root - redirects to public/)
├── .env (create this in File Manager)
└── composer.json
```

**Recommended**: Move contents of `public/` to `htdocs/` root for cleaner URLs.

### 4. Create Database

1. Go to control panel → **MySQL Databases**
2. Click **Create Database**
3. Database name: `ecommerce` (will become `epiz_XXXXX_ecommerce`)
4. Username: `user` (will become `epiz_XXXXX_user`)
5. Password: Set a strong password
6. Remember: Database and user will have the `epiz_` prefix

### 5. Configure .env

In File Manager, create `.env` with:

```env
DB_HOST=sql123.epizy.com
DB_NAME=epiz_12345678_ecommerce
DB_USER=epiz_12345678_user
DB_PASS=YourStrongPassword123
DB_CHARSET=utf8mb4
```

**Replace**:
- `sql123.epizy.com` → Your actual MySQL hostname
- `epiz_12345678` → Your actual account prefix
- `YourStrongPassword123` → Your database password

---

## Common Issues & Solutions

### Issue: "Database connection failed"

**Cause**: Wrong database host or credentials

**Solution**:
1. Check `.env` file has correct MySQL hostname (NOT `localhost`)
2. Verify database name includes `epiz_` prefix
3. Test credentials in phpMyAdmin
4. Ensure database user has privileges

### Issue: "500 Internal Server Error"

**Causes**:
- `.htaccess` syntax error
- Missing PHP files
- Wrong file permissions
- PHP version incompatibility

**Solutions**:
1. Check error logs in control panel
2. Verify `.htaccess` is correct
3. Ensure all files uploaded (especially `vendor/`)
4. Check PHP version (should be 7.4+ for InfinityFree)

### Issue: "403 Forbidden"

**Cause**: InfinityFree's security system blocking requests

**Solutions**:
1. Check if `index.php` exists in the correct location
2. Verify `.htaccess` rules don't conflict
3. Some HTTP requests may be blocked by InfinityFree's firewall
4. Check if GraphQL endpoint is accessible

### Issue: "CORS policy error"

**Cause**: CORS headers not set or InfinityFree blocking

**Solutions**:
1. Ensure `.htaccess` has CORS headers:
   ```apache
   Header always set Access-Control-Allow-Origin "*"
   Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS"
   Header always set Access-Control-Allow-Headers "Content-Type"
   ```
2. Check `public/index.php` handles OPTIONS requests
3. Test API directly with curl first

### Issue: "Upload errors" or "File not found"

**Cause**: Incomplete upload or wrong directory

**Solutions**:
1. Re-upload all files, especially `vendor/` folder
2. Ensure files are in `htdocs/`, not a subfolder
3. Check FTP logs for upload errors
4. Large files may timeout - upload in batches

---

## Performance Limitations

InfinityFree is free but has some limitations:

### Execution Time
- PHP scripts timeout after 30-60 seconds
- Not an issue for this project (GraphQL queries are fast)

### Database Size
- 400 MB limit per database
- More than enough for an e-commerce demo

### Hits Per Day
- Limited to ~50,000 hits/day
- Perfect for portfolio/demo projects

### File Upload Size
- 10 MB per file upload
- Your vendor files should be fine if uploaded via FTP

---

## Optimization Tips

### 1. Enable Caching

Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
</IfModule>
```

### 2. Compress Responses

Already included in `public/.htaccess` via CORS headers.

### 3. Optimize Database

- Ensure indexes exist on frequently queried columns
- Your `schema.sql` should already have appropriate indexes

### 4. Monitor Usage

- Check InfinityFree control panel for resource usage
- Monitor error logs regularly

---

## Upgrading from InfinityFree

If your project grows and needs better performance:

### When to Consider Paid Hosting
- More than 10,000 daily visitors
- Need faster database queries
- Want better uptime guarantees
- Need premium features

### Recommended Upgrades
1. **Hostinger** - $2.99/month
   - Better performance
   - More resources
   - Better support

2. **Namecheap** - $2.98/month
   - Reliable uptime
   - Easy migration
   - Good value

Migration is easy - just:
1. Export database from InfinityFree phpMyAdmin
2. Download files via FTP
3. Upload to new host
4. Update `.env` with new database credentials

---

## Testing Your InfinityFree Backend

### Test 1: Check API Endpoint

Visit: `https://yourproject.epizy.com/graphql`

Should see: GraphQL response (not 404)

### Test 2: Query Categories

```bash
curl -X POST https://yourproject.epizy.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ categories { name } }"}'
```

Expected:
```json
{"data":{"categories":[{"name":"all"},{"name":"clothes"},{"name":"tech"}]}}
```

### Test 3: Query Products

```bash
curl -X POST https://yourproject.epizy.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ products { id name brand inStock } }"}'
```

Should return product list.

### Test 4: Check CORS

Open browser console on your Vercel frontend:
- No CORS errors should appear
- API calls should succeed

---

## Support Resources

- **InfinityFree Forum**: [forum.infinityfree.com](https://forum.infinityfree.com)
- **Knowledge Base**: [infinityfree.com/support](https://infinityfree.com/support)
- **Community**: Active community for troubleshooting

---

## Summary

InfinityFree is perfect for your e-commerce portfolio project because:

✅ **FREE** - No monthly costs
✅ **Easy Setup** - Similar to cPanel
✅ **Sufficient Resources** - Handles demo traffic well
✅ **Learning Tool** - Great for understanding hosting
✅ **Portfolio Ready** - Looks professional with free subdomain or custom domain

Just remember the key differences:
- Database host is NOT `localhost`
- Database names have `epiz_` prefix
- Use File Manager to create `.env`
- Upload to `htdocs/` directory

---

**You're ready to deploy!** Follow [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step instructions.
