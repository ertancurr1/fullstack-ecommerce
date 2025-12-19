# Deployment Checklist ✅

Use this checklist to track your deployment progress.

---

## Pre-Deployment Preparation

- [ ] Read [DEPLOYMENT.md](DEPLOYMENT.md) fully
- [ ] Review [QUICK-START-DEPLOYMENT.md](QUICK-START-DEPLOYMENT.md)
- [ ] Ensure code is pushed to GitHub
- [ ] Have hosting account ready ($3/month host purchased)
- [ ] Have database credentials from hosting provider

---

## Backend Deployment (PHP + MySQL)

### 1. File Upload
- [ ] Connect to hosting via cPanel or FTP
- [ ] Upload all backend files to `public_html/`
  - [ ] `config/` folder
  - [ ] `database/` folder
  - [ ] `public/` folder
  - [ ] `src/` folder
  - [ ] `vendor/` folder
  - [ ] `composer.json`
  - [ ] `composer.lock`
  - [ ] `.htaccess` (root)
- [ ] Verify files uploaded correctly

### 2. Database Setup
- [ ] Create MySQL database in cPanel
- [ ] Create database user
- [ ] Grant ALL PRIVILEGES to user
- [ ] Note database name (usually `username_dbname`)
- [ ] Note database user (usually `username_user`)
- [ ] Note database password

### 3. Import Database
- [ ] Open phpMyAdmin
- [ ] Select your database
- [ ] Import `database/schema.sql`
- [ ] Import `database/seed.sql`
- [ ] Verify tables created (check for `products`, `categories`, etc.)

### 4. Environment Configuration
- [ ] Create `.env` file in root directory
- [ ] Add database credentials:
  ```env
  DB_HOST=localhost
  DB_NAME=your_username_dbname
  DB_USER=your_username_user
  DB_PASS=your_password
  DB_CHARSET=utf8mb4
  ```
- [ ] Save `.env` file
- [ ] Ensure `.env` is not publicly accessible

### 5. Web Server Configuration
- [ ] Set document root to `/public` folder
  - OR ensure root `.htaccess` redirects to `/public`
- [ ] Verify PHP version is 8.0+ (cPanel → MultiPHP Manager)
- [ ] Check that `mod_rewrite` is enabled

### 6. Test Backend
- [ ] Visit `https://yourdomain.com/graphql`
- [ ] Should see GraphQL response (not 404)
- [ ] Test query with curl or Postman:
  ```bash
  curl -X POST https://yourdomain.com/graphql \
    -H "Content-Type: application/json" \
    -d '{"query": "{ categories { name } }"}'
  ```
- [ ] Verify response contains categories data
- [ ] No CORS errors in response
- [ ] Check error logs if issues occur

---

## Frontend Deployment (Vercel)

### 1. GitHub Setup
- [ ] Ensure latest code is committed
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify repository is public or Vercel has access

### 2. Vercel Project Setup
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub
- [ ] Click "Add New Project"
- [ ] Import your repository
- [ ] Configure project settings:
  - [ ] Framework Preset: **Vite**
  - [ ] Root Directory: **frontend**
  - [ ] Build Command: `npm run build` (auto-detected)
  - [ ] Output Directory: `dist` (auto-detected)

### 3. Environment Variables
- [ ] In Vercel project → Settings → Environment Variables
- [ ] Add new variable:
  - [ ] Name: `VITE_API_URL`
  - [ ] Value: `https://yourdomain.com/graphql`
  - [ ] Environment: All (Production, Preview, Development)
- [ ] Save environment variable

### 4. Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (1-2 minutes)
- [ ] Check build logs for errors
- [ ] Note your Vercel URL: `https://your-project.vercel.app`

### 5. Test Frontend
- [ ] Visit Vercel URL
- [ ] Homepage loads without errors
- [ ] Products display correctly
- [ ] Images load properly
- [ ] Open browser DevTools → Console
- [ ] No CORS errors
- [ ] No API connection errors

---

## End-to-End Testing

### Feature Testing
- [ ] Browse all product categories (All, Clothes, Tech)
- [ ] Click on individual products
- [ ] Product details page loads
- [ ] Product images display
- [ ] Product attributes show correctly
- [ ] Add product to cart (with attributes selected)
- [ ] Cart overlay opens
- [ ] Cart shows correct items and quantities
- [ ] Increase/decrease quantity
- [ ] Remove item from cart
- [ ] Clear cart
- [ ] Place an order (if implemented)

### Performance Testing
- [ ] Page loads in reasonable time (< 3 seconds)
- [ ] API responses are fast (< 1 second)
- [ ] Images load progressively
- [ ] No console errors
- [ ] No broken images

### Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari (if available)
- [ ] Test on mobile device or DevTools mobile view

---

## Post-Deployment

### Documentation
- [ ] Update README with live links
- [ ] Add live demo URL to README
- [ ] Share with portfolio viewers

### Optional Enhancements
- [ ] Add custom domain to backend
- [ ] Add custom domain to Vercel
- [ ] Set up SSL certificates (usually automatic)
- [ ] Configure CDN (Vercel includes this)
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Add analytics (Google Analytics, Plausible, etc.)

### Maintenance
- [ ] Schedule regular database backups
- [ ] Document how to update backend code
- [ ] Document Vercel auto-deployment process
- [ ] Plan for future feature additions

---

## Troubleshooting

If you encounter issues, check:

### Backend Issues
- [ ] PHP error logs in cPanel
- [ ] Database connection in `.env`
- [ ] File permissions (755 for folders, 644 for files)
- [ ] `.htaccess` files exist and are correct
- [ ] PHP version compatibility

### Frontend Issues
- [ ] Vercel build logs
- [ ] Browser console for errors
- [ ] Network tab for failed API calls
- [ ] Environment variables set correctly
- [ ] CORS headers from backend

### Common Fixes
- [ ] Redeploy Vercel after changing environment variables
- [ ] Clear browser cache
- [ ] Check API URL ends with `/graphql`
- [ ] Verify backend is accessible publicly
- [ ] Test API with curl/Postman directly

---

## Success Criteria

Your deployment is successful when:
- ✅ Backend API responds at `https://yourdomain.com/graphql`
- ✅ Frontend loads at `https://your-project.vercel.app`
- ✅ Products display from database
- ✅ Cart functionality works
- ✅ No console errors
- ✅ No CORS errors
- ✅ All features work as in local development

---

## Need Help?

Refer to:
1. [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed guide
2. [QUICK-START-DEPLOYMENT.md](QUICK-START-DEPLOYMENT.md) - Quick reference
3. [DEPLOYMENT-CHANGES.md](DEPLOYMENT-CHANGES.md) - What changed and why

---

**Date Started**: ________________

**Date Completed**: ________________

**Live URLs**:
- Frontend: ________________
- Backend: ________________

**Notes**:
