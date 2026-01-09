# Netlify Deployment Guide

## Prerequisites Checklist

- ✅ Code pushed to GitHub
- ⚠️ Supabase project created
- ⚠️ Database migrations run
- ⚠️ Environment variables ready

## Step-by-Step Deployment

### Part 1: Supabase Setup (Do this FIRST)

#### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `sss-subscription-management` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is fine for MVP
4. Click "Create new project"
5. Wait 2-3 minutes for project to initialize

#### 2. Run Database Migrations

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Open `supabase/migrations/001_initial_schema.sql` from your project
4. Copy the entire contents
5. Paste into SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Verify success message

#### 3. Get Supabase Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")
   - **service_role** key (under "Project API keys" - keep this secret!)

#### 4. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - **Email**: your-admin-email@example.com
   - **Password**: create a strong password
   - **Auto Confirm User**: ✅ Check this
4. Click **Create user**
5. Save these credentials - you'll use them to log in!

### Part 2: Netlify Deployment

#### 1. Connect GitHub Repository

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign in with GitHub
3. Click **Add new site** → **Import an existing project**
4. Select **GitHub**
5. Authorize Netlify if prompted
6. Find and select your repository: `sss-subscription-management`
7. Click **Import**

#### 2. Configure Build Settings

Netlify should auto-detect Next.js, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20` (should be auto-set from netlify.toml)

#### 3. Add Environment Variables

**CRITICAL STEP** - Add these in Netlify:

1. In Netlify site settings, go to **Site configuration** → **Environment variables**
2. Click **Add variable** for each:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```
   Value: Your Supabase Project URL (from Step 3 above)

   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
   Value: Your Supabase anon public key

   ```
   SUPABASE_SERVICE_ROLE_KEY
   ```
   Value: Your Supabase service_role key (keep secret!)

3. Click **Save**

#### 4. Deploy!

1. Click **Deploy site** (or it will auto-deploy)
2. Wait 2-5 minutes for build to complete
3. Check build logs for any errors

#### 5. Test Your Deployment

1. Once deployed, click on your site URL (e.g., `https://your-site.netlify.app`)
2. You should see the landing page
3. Click the "Admin Login" link in footer
4. Log in with your admin credentials from Supabase
5. Test adding a subscriber
6. Test generating labels

### Part 3: Post-Deployment Checklist

- [ ] Landing page loads correctly
- [ ] Login page works
- [ ] Can log in with admin credentials
- [ ] Can add a new subscriber
- [ ] Can search subscribers
- [ ] Can generate PDF labels
- [ ] All pages load without errors

## Troubleshooting

### Build Fails

**Error: Environment variables not found**
- Double-check all 3 environment variables are set in Netlify
- Make sure variable names match exactly (case-sensitive)
- Redeploy after adding variables

**Error: Module not found**
- Check build logs for specific package
- May need to add to `package.json` dependencies

### Authentication Issues

**Can't log in**
- Verify user exists in Supabase Authentication → Users
- Check RLS policies are enabled (they should be from migration)
- Check browser console for errors

### Database Errors

**Can't fetch subscribers**
- Verify migrations ran successfully
- Check Supabase Dashboard → Table Editor → `subscribers` table exists
- Verify RLS policies are active

### PDF Generation Fails

**Labels don't generate**
- Check that you have active subscribers in database
- Verify `@react-pdf/renderer` is in dependencies
- Check Netlify function logs

## Quick Reference

### Supabase Dashboard Links
- **SQL Editor**: https://app.supabase.com/project/YOUR_PROJECT/sql
- **API Settings**: https://app.supabase.com/project/YOUR_PROJECT/settings/api
- **Authentication**: https://app.supabase.com/project/YOUR_PROJECT/auth/users
- **Table Editor**: https://app.supabase.com/project/YOUR_PROJECT/editor

### Netlify Dashboard Links
- **Site Settings**: https://app.netlify.com/sites/YOUR_SITE/configuration/env
- **Deploy Logs**: https://app.netlify.com/sites/YOUR_SITE/deploys
- **Site URL**: https://app.netlify.com/sites/YOUR_SITE/overview

## Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Add custom domain in Netlify settings
   - Update DNS records

2. **Environment Variables for Production**
   - Consider using different Supabase project for production
   - Or use environment-specific variables

3. **Monitoring**
   - Set up Netlify Analytics (if needed)
   - Monitor Supabase usage/database size

4. **Backup**
   - Export database regularly from Supabase
   - Keep environment variables documented securely

## Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console for errors
3. Verify Supabase connection in Supabase Dashboard
4. Check environment variables are set correctly

