# Deployment Guide

This guide will help you deploy your Full-Stack eCommerce Application with:
- **Backend (PHP + MySQL)**: InfinityFree (100% FREE)
- **Frontend (React)**: Vercel (100% FREE)

**Total Cost**: $0/month 🎉

## Prerequisites

- [ ] InfinityFree account (sign up at [infinityfree.com](https://infinityfree.com))
- [ ] GitHub account (for Vercel deployment)
- [ ] Git repository pushed to GitHub

---

## Part 1: Deploy Backend to InfinityFree (FREE)

### Step 1: Sign Up for InfinityFree

1. Go to [infinityfree.com](https://infinityfree.com)
2. Click **Sign Up** (completely free, no credit card required)
3. Verify your email
4. Log into your account

### Step 2: Create Hosting Account

1. In InfinityFree dashboard, click **Create Account**
2. Choose a **subdomain** (e.g., `yourproject.epizy.com`) or use your own domain
3. Enter account details
4. Click **Create Account**
5. Wait 2-5 minutes for account activation
6. Note down:
   - **FTP Hostname** (e.g., `ftpupload.net`)
   - **FTP Username** (e.g., `epiz_12345678`)
   - **FTP Password**
   - **MySQL Hostname** (e.g., `sql123.epizy.com`)

### Step 3: Upload Files via FTP

**Using FileZilla (Recommended):**

1. Download [FileZilla](https://filezilla-project.org/) if you don't have it
2. Open FileZilla and connect:
   - Host: Your FTP hostname (from InfinityFree)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. Navigate to `htdocs/` folder on the server (right side)
4. Upload these folders/files from your local project:
   - `config/` folder
   - `database/` folder (optional, for reference)
   - `public/` folder
   - `src/` folder
   - `vendor/` folder
   - `.htaccess` file (root)
   - `composer.json`
   - `composer.lock`

**IMPORTANT**: Upload everything INSIDE `htdocs/`, not in a subfolder.

### Step 4: Create `.env` File on Server

InfinityFree doesn't allow direct `.env` upload via FTP, so:

1. In InfinityFree control panel, go to **File Manager**
2. Navigate to `htdocs/`
3. Click **New File**
4. Name it `.env`
5. Edit the file and add (we'll fill in database details in the next step):
```env
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
DB_CHARSET=utf8mb4
```

### Step 5: Setup MySQL Database

1. In InfinityFree control panel, go to **MySQL Databases**
2. Click **Create Database**
3. Database name will be auto-prefixed (e.g., `epiz_12345678_ecommerce`)
4. Create database user (also auto-prefixed)
5. Set a strong password
6. Click **Create Database**
7. **IMPORTANT**: Note down these credentials:
   - **Database Name**: `epiz_XXXXX_ecommerce`
   - **Database User**: `epiz_XXXXX_user`
   - **Database Password**: Your chosen password
   - **MySQL Hostname**: Usually shown in the control panel (e.g., `sql123.epizy.com`)

### Step 6: Import Database Schema

1. In InfinityFree control panel, click **phpMyAdmin**
2. Log in with your MySQL credentials
3. Select your database from the left sidebar
4. Click **Import** tab
5. Click **Choose File** and select `database/schema.sql`
6. Click **Go** at the bottom
7. Wait for success message
8. Repeat for `database/seed.sql`
9. Verify tables created: Click on your database and check for tables

### Step 7: Update `.env` File

Go back to File Manager and edit `.env`:

```env
DB_HOST=sql123.epizy.com
DB_NAME=epiz_12345678_ecommerce
DB_USER=epiz_12345678_user
DB_PASS=your_database_password
DB_CHARSET=utf8mb4
```

**Replace with your actual values from Step 5!**

### Step 8: Configure Document Root

InfinityFree expects files in `htdocs/`. Since we have a `public/` folder:

**Option 1: Move contents** (Recommended)
1. In File Manager, go to `htdocs/public/`
2. Select all files in `public/` folder
3. Move them to `htdocs/` root
4. Delete empty `public/` folder
5. Ensure `.htaccess` is in `htdocs/` root

**Option 2: Keep structure** (Use root `.htaccess`)
- The root `.htaccess` file we created will redirect to `public/`
- This should work automatically

### Step 9: Test Backend API

Visit your GraphQL endpoint (use your InfinityFree subdomain or custom domain):
```
https://yourproject.epizy.com/graphql
```

You should see a GraphQL response (not a 404 or 403 error).

Test with a query using curl or Postman:
```bash
curl -X POST https://yourproject.epizy.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ categories { name } }"}'
```

Expected response:
```json
{"data":{"categories":[{"name":"all"},{"name":"clothes"},{"name":"tech"}]}}
```

---

## Part 2: Deploy Frontend (React) to Vercel

### Step 1: Push Code to GitHub

If you haven't already:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **Add New Project**
3. Import your repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variable

In Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://yourproject.epizy.com/graphql` (your InfinityFree domain)
   - **Environment**: Production, Preview, Development (select all)
3. Click **Save**

**IMPORTANT**: Use your actual InfinityFree subdomain or custom domain!

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete (1-2 minutes)
3. Visit your deployed site at: `https://your-project.vercel.app`

### Step 5: Test End-to-End

1. Open your Vercel URL
2. Browse products
3. Add items to cart
4. Check if data loads from your backend API

---

## Troubleshooting

### Backend Issues (InfinityFree)

**500 Internal Server Error**
- Check `.htaccess` file exists in `htdocs/` or `htdocs/public/`
- Verify PHP version is compatible (InfinityFree supports PHP 7.4+)
- Check error logs in InfinityFree control panel → Error Logs
- Ensure all files uploaded correctly (re-upload if needed)

**Database connection failed**
- Verify `.env` credentials match your MySQL database settings
- Database host should be the MySQL hostname (e.g., `sql123.epizy.com`), NOT `localhost`
- Database name and user should include the `epiz_` prefix
- Password should match what you set during database creation

**403 Forbidden Error**
- InfinityFree blocks certain file types and patterns
- Check if `.htaccess` is configured correctly
- Ensure `index.php` is in the right location

**CORS errors**
- Ensure `.htaccess` has CORS headers
- Check `public/index.php` (or `htdocs/index.php`) has CORS handling
- InfinityFree sometimes has firewall rules that affect CORS

### Frontend Issues

**API calls failing**
- Check `VITE_API_URL` in Vercel environment variables
- Ensure URL includes `/graphql` endpoint
- Check browser console for CORS errors
- Verify backend API is accessible

**Build fails on Vercel**
- Check build logs
- Ensure all dependencies are in `package.json`
- Try building locally: `cd frontend && npm run build`

---

## Hosting Platform

### Backend (PHP + MySQL)

**InfinityFree** - 100% FREE ✅
- **Pros**:
  - Completely free (no credit card required)
  - Unlimited disk space and bandwidth
  - MySQL databases included
  - PHP support (7.4+)
  - SSL certificates included
  - Good for portfolio/demo projects
- **Cons**:
  - Ads on free subdomain (removable with custom domain)
  - Some limitations (file upload limits, execution time)
  - Shared hosting (slower than paid options)
- **Website**: [infinityfree.com](https://infinityfree.com)

**Alternative Paid Options** (if you need better performance later):
- Hostinger ($2.99/month) - Better performance
- Namecheap ($2.98/month) - More reliable
- Only consider these if InfinityFree doesn't meet your needs

### Frontend

**Vercel** - 100% FREE ✅
- Best for React/Vite projects
- Automatic deployments from GitHub
- Global CDN included
- SSL certificates included
- Excellent for portfolio projects
- **Website**: [vercel.com](https://vercel.com)

---

## Custom Domain (Optional)

### Add Domain to Backend Hosting
1. Purchase domain or use existing
2. Point nameservers to your hosting provider
3. Add domain in cPanel → Addon Domains

### Add Domain to Vercel
1. In Vercel project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Database is populated with products
- [ ] Frontend loads without errors
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Orders can be created
- [ ] CORS is configured properly
- [ ] Environment variables are set

---

## Maintenance

### Update Backend
1. Make changes locally
2. Upload modified files via FTP/File Manager
3. Clear cache if using any

### Update Frontend
1. Push changes to GitHub
2. Vercel auto-deploys from `main` branch
3. Or manually redeploy in Vercel dashboard

### Database Backups
- Use cPanel → phpMyAdmin → Export
- Schedule automatic backups in cPanel
- Download backups regularly

---

## Need Help?

- Backend API not working? Check cPanel error logs
- Frontend not connecting? Verify VITE_API_URL
- CORS issues? Check headers in `.htaccess` and `index.php`

Good luck with your deployment! 🚀
