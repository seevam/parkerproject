# Deployment Instructions for Levelling Labs

## Step 1: Push to GitHub

Replace YOUR_USERNAME with your actual GitHub username, then run:

```bash
cd /Users/ericgan/levelling-labs

# Remove the placeholder remote
git remote remove origin

# Add your real GitHub repository (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/levelling-labs.git

# Push to GitHub
git push -u origin main
```

If prompted for credentials, you may need to use a Personal Access Token instead of password:
- Go to https://github.com/settings/tokens
- Generate new token (classic)
- Copy the token and use it as your password

## Step 2: Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Find and select "levelling-labs"
4. Click "Import"
5. Click "Deploy"

Wait for deployment to complete (~2 minutes)

## Step 3: Set Up Database

### Option A: Vercel Postgres (Recommended)
1. In your Vercel project, go to "Storage" tab
2. Click "Create Database" → "Postgres"
3. Click "Create"
4. DATABASE_URL will be auto-added to environment variables

### Option B: Supabase (Free)
1. Go to https://supabase.com/dashboard
2. Create new project: "levelling-labs"
3. Copy connection string from Settings → Database
4. Add to Vercel environment variables

## Step 4: Add Environment Variables

In Vercel → Settings → Environment Variables, add:

```
ANTHROPIC_API_KEY = your-claude-api-key
NEXTAUTH_SECRET = (run: openssl rand -base64 32)
NEXTAUTH_URL = https://your-project.vercel.app
DATABASE_URL = (auto-added if using Vercel Postgres)
```

## Step 5: Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click "Redeploy" on latest deployment

Your site will be live at: https://your-project.vercel.app

## Troubleshooting

If the site shows errors:
- Check deployment logs in Vercel
- Verify all environment variables are set
- Make sure DATABASE_URL is configured
- Run database migrations if needed
