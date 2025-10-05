# Deployment Guide for HelpDesk Mini

## Vercel Deployment

### Prerequisites
1. Make sure you have a Vercel account
2. Install Vercel CLI: `npm i -g vercel`

### Environment Variables
Set these environment variables in your Vercel dashboard:

```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
UPLOAD_DIR=/tmp/uploads
```

### Deployment Steps

1. **Push your code to GitHub/GitLab**
2. **Connect your repository to Vercel**
3. **Configure build settings (Vercel will auto-detect from vercel.json):**
   - Build Command: `npm run vercel-build` (auto-detected)
   - Output Directory: `frontend/dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)
   - Root Directory: `./` (leave empty)

4. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings → Environment Variables
   - Add the environment variables listed above
   - Make sure to set them for Production environment

5. **Deploy:**
   ```bash
   # Using Vercel CLI
   vercel --prod
   
   # Or push to main branch (if connected to Git)
   git push origin main
   ```

### Post-Deployment Steps

1. **Run database migrations:**
   ```bash
   # If using Vercel CLI
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

2. **Test the deployment:**
   - Visit your Vercel URL
   - Test API endpoints: `https://your-app.vercel.app/api`
   - Test frontend functionality

### Important Notes

- The `vercel.json` configuration handles routing between frontend and backend
- Backend runs as serverless functions on Vercel
- Database should be hosted externally (e.g., Railway, Supabase, or Neon)
- File uploads will use `/tmp` directory (temporary storage)

### Troubleshooting

**If you get a 404 error:**
1. Make sure `vercel.json` is in the root directory
2. Verify that the build completed successfully in Vercel dashboard
3. Check that environment variables are set correctly
4. Ensure database is accessible from Vercel's servers
5. Check the Function logs in Vercel dashboard for API errors

**If build fails:**
1. Check that all dependencies are properly listed in package.json
2. Ensure Prisma schema is valid
3. Verify DATABASE_URL is accessible during build
4. Check build logs in Vercel dashboard

**Common fixes:**
- Clear Vercel cache: Go to project settings → General → Clear cache
- Redeploy: Click "Redeploy" in your deployment
- Check Node.js version compatibility (Vercel uses Node 18.x by default)
- Make sure all dependencies are in root package.json
- Verify DATABASE_URL environment variable is set correctly

**Quick Fix Steps:**
1. Commit and push all changes to your repository
2. In Vercel dashboard, go to your project
3. Go to Settings → Environment Variables
4. Add your DATABASE_URL and other environment variables
5. Go to Deployments tab and click "Redeploy" on the latest deployment
6. Check Function logs for any errors

### Alternative: Railway Deployment

For a simpler full-stack deployment, consider using Railway:
1. Connect your GitHub repository
2. Railway will auto-detect your Node.js backend
3. Set environment variables in Railway dashboard
4. Deploy with automatic builds
