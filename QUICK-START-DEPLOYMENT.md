# Quick Deployment Guide 🚀

**100% FREE Deployment - No Credit Card Required!**

## TL;DR - Steps to Deploy

### Backend (InfinityFree - FREE)
1. **Sign up** → [infinityfree.com](https://infinityfree.com) (free account)
2. **Create hosting account** → Choose subdomain (e.g., `yourproject.epizy.com`)
3. **Upload files** → Use FileZilla FTP
4. **Create database** → InfinityFree control panel → MySQL Databases
5. **Import SQL** → phpMyAdmin → Import `database/schema.sql` & `database/seed.sql`
6. **Create .env** → Add database credentials (use SQL hostname, not localhost)
7. **Configure** → Move `public/` contents to `htdocs/` root
8. **Test** → Visit `https://yourproject.epizy.com/graphql`

### Frontend (Vercel - FREE)
1. **Push to GitHub** → `git push origin main`
2. **Deploy to Vercel** → Import project, set root to `frontend`
3. **Add env var** → `VITE_API_URL=https://yourproject.epizy.com/graphql`
4. **Deploy** → Done! ✅

**Total Cost**: $0/month 🎉

---

## Backend .env File Template

Create `.env` in File Manager (InfinityFree control panel):

```env
DB_HOST=sql123.epizy.com
DB_NAME=epiz_12345678_ecommerce
DB_USER=epiz_12345678_user
DB_PASS=your_strong_password
DB_CHARSET=utf8mb4
```

**IMPORTANT Notes**:
- **DB_HOST**: Use the MySQL hostname from InfinityFree (NOT `localhost`)
- **DB_NAME**: Includes `epiz_` prefix (check your InfinityFree control panel)
- **DB_USER**: Also includes `epiz_` prefix
- **DB_PASS**: The password you set when creating the database

---

## Vercel Environment Variable

In Vercel Dashboard → Settings → Environment Variables:

```
Name: VITE_API_URL
Value: https://yourproject.epizy.com/graphql
```

**Important**: Replace `yourproject.epizy.com` with your actual InfinityFree subdomain!

---

## Files to Upload to InfinityFree

Upload these to `htdocs/` folder via FTP:
```
✅ config/
✅ database/ (optional, for reference)
✅ public/
✅ src/
✅ vendor/
✅ .htaccess (root)
✅ composer.json
✅ composer.lock
```

Create on server using File Manager:
```
✅ .env (with your database credentials)
```

❌ **DO NOT upload**:
```
❌ frontend/ (deploys separately to Vercel)
❌ .git/
❌ node_modules/
❌ .env.example (only upload actual .env)
```

**After upload**: Move contents of `public/` folder to `htdocs/` root for cleaner URLs.

---

## Testing Your Deployment

### Test Backend
```bash
curl -X POST https://yourproject.epizy.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ categories { name } }"}'
```

Should return:
```json
{"data":{"categories":[{"name":"all"},{"name":"clothes"},{"name":"tech"}]}}
```

If you get a 403 or 500 error, check:
- `.env` file has correct MySQL hostname (not `localhost`)
- Database credentials are correct
- `.htaccess` file is in the right location

### Test Frontend
1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Products should load
3. Cart should work
4. Check browser console for errors

---

## Troubleshooting Quick Fixes

### "Database connection failed"
- Check `.env` file credentials match InfinityFree control panel
- Database host should be MySQL hostname (e.g., `sql123.epizy.com`), **NOT** `localhost`
- Database name and user should include `epiz_` prefix
- Ensure database was created successfully in control panel

### "500 Internal Server Error"
- Check error logs in InfinityFree control panel
- Ensure `.htaccess` exists in correct location (`htdocs/` root)
- Verify all files uploaded correctly via FTP
- Check file permissions (should be 644 for files, 755 for folders)

### "CORS policy error" on frontend
- Backend `.htaccess` should have CORS headers
- Check `public/index.php` has CORS handling for OPTIONS requests

### Frontend can't connect to API
- Verify `VITE_API_URL` in Vercel environment variables
- Make sure URL ends with `/graphql`
- Redeploy after changing environment variables

---

## Hosting Platforms

### Backend
- **InfinityFree** - 100% FREE - [Sign up here](https://infinityfree.com)
  - No credit card required
  - Perfect for portfolio projects
  - Includes MySQL, PHP, and SSL

### Frontend
- **Vercel** - 100% FREE - [Deploy now](https://vercel.com)
  - Best for React/Vite
  - Auto-deploy from GitHub
  - Global CDN included

**Total Monthly Cost**: $0 🎉

---

## Post-Deployment

After successful deployment:
1. ✅ Test all features
2. ✅ Add custom domain (optional)
3. ✅ Set up SSL (usually automatic on both platforms)
4. ✅ Share your live site!

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)
