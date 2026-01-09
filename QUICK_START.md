# Quick Start: Deploy to Netlify

## ✅ Your code is ready to deploy!

Everything is configured. Follow these steps:

## 🚀 Quick Deployment Steps

### 1️⃣ Set Up Supabase (5 minutes)

1. **Create Supabase Project**
   - Go to https://supabase.com → New Project
   - Name: `sss-subscription-management`
   - Choose region and create

2. **Run Database Migration**
   - In Supabase Dashboard → SQL Editor
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and click "Run"

3. **Get Your Credentials**
   - Settings → API
   - Copy: **Project URL**, **anon public key**, **service_role key**

4. **Create Admin User**
   - Authentication → Users → Add user
   - Email: your-email@example.com
   - Password: (create strong password)
   - ✅ Check "Auto Confirm User"
   - Save credentials for login!

### 2️⃣ Deploy to Netlify (5 minutes)

1. **Connect Repository**
   - Go to https://app.netlify.com
   - Sign in with GitHub
   - "Add new site" → "Import an existing project"
   - Select your repository

2. **Add Environment Variables** ⚠️ CRITICAL
   - Site settings → Environment variables
   - Add these 3 variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL = (your Supabase Project URL)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (your anon public key)
   SUPABASE_SERVICE_ROLE_KEY = (your service_role key)
   ```

3. **Deploy**
   - Click "Deploy site"
   - Wait 2-5 minutes
   - Your site will be live!

### 3️⃣ Test Your Site

1. Visit your Netlify URL (e.g., `https://your-site.netlify.app`)
2. Click "Admin Login" in footer
3. Log in with your Supabase admin credentials
4. Test adding a subscriber
5. Test generating labels

## 📋 Checklist

Before deploying, make sure you have:
- [x] Code pushed to GitHub ✅
- [ ] Supabase project created
- [ ] Database migration run
- [ ] Admin user created
- [ ] Environment variables ready to add in Netlify

## 🔗 Important Links

- **Supabase Dashboard**: https://app.supabase.com
- **Netlify Dashboard**: https://app.netlify.com
- **Full Deployment Guide**: See `DEPLOYMENT.md`

## ⚠️ Common Issues

**Build fails?**
- Check all 3 environment variables are set in Netlify
- Variable names must match exactly (case-sensitive)

**Can't log in?**
- Verify user exists in Supabase Authentication → Users
- Check "Auto Confirm User" was checked when creating user

**Database errors?**
- Verify migration ran successfully
- Check Supabase → Table Editor → `subscribers` table exists

## 🎉 You're All Set!

Once deployed, your subscription management system will be live and ready to use!

