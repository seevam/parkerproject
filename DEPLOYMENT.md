# Levelling Labs - Deployment Guide

## Overview
Levelling Labs is a full-stack e-commerce platform for gadgets and custom 3D printed accessories with an XP/leveling system.

## Features
- 🛍️ E-commerce shop for gadgets and 3D printed accessories
- ⭐ Gadget review section with video support
- 🎨 3D print models and customization
- 🎮 XP/Leveling system (10 levels with benefits)
- 💳 Multiple payment methods (PayPal, Stripe, Alipay, WeChat Pay)
- 🤖 AI-powered customer support chatbot (powered by Claude)
- 🔐 Admin panel for content management
- 📧 Contact: levellinglabs@gmail.com

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Payments**: Stripe, PayPal
- **Deployment**: Vercel

## Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   cd levelling-labs
   npm install
   ```

2. **Environment Variables**
   Update the `.env` file with your API keys:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="your-secret-key-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   ANTHROPIC_API_KEY="your-anthropic-api-key-here"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Step 1: Prepare for Deployment

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Levelling Labs"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select "Import Git Repository"
   - Choose your Levelling Labs repository

2. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**
   Add these in Vercel's Environment Variables section:
   ```
   DATABASE_URL="your-postgresql-connection-string"
   NEXTAUTH_SECRET="generate-a-random-secret"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   ANTHROPIC_API_KEY="your-anthropic-api-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
   ```

4. **Database for Production**
   - Sign up for a PostgreSQL database (recommended: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Railway](https://railway.app), or [Supabase](https://supabase.com))
   - Update `DATABASE_URL` with your PostgreSQL connection string
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"  // Change from sqlite
       url      = env("DATABASE_URL")
     }
     ```
   - Run migrations: `npx prisma db push`

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `levellinglabs.com`)
   - Follow DNS configuration instructions
   - Update `NEXTAUTH_URL` environment variable with your custom domain

2. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - Your site will be accessible via HTTPS

## Admin Access

- **Admin Panel**: `/admin`
- **Password**: `LevellinglabsY7`

### Admin Capabilities
1. Add gadget reviews with video URLs
2. Upload 3D print projects
3. Manage products (gadgets and accessories)
4. Set prices and stock levels

## Payment Integration

### Stripe (Credit/Debit Cards)
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from Dashboard → Developers → API Keys
3. Add `STRIPE_SECRET_KEY` to environment variables

### PayPal
1. Create a PayPal Business account
2. Get credentials from [developer.paypal.com](https://developer.paypal.com)
3. Add `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`

### Alipay & WeChat Pay
- These require Stripe or PayPal business accounts with international payments enabled
- Contact Stripe/PayPal support to enable these payment methods

## Claude AI Chatbot

The chatbot uses the Anthropic Claude API:
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add it to `ANTHROPIC_API_KEY` environment variable
4. The chatbot will appear in the bottom-right corner

## Monitoring & Analytics

1. **Vercel Analytics**
   - Enable in Project Settings → Analytics
   - View traffic and performance metrics

2. **Error Tracking**
   - Check Vercel logs for errors
   - Consider adding [Sentry](https://sentry.io) for production error tracking

## Security Checklist

- ✅ Environment variables are set and not committed to Git
- ✅ Admin password is secure (`LevellinglabsY7` - consider changing in production)
- ✅ SSL/HTTPS is enabled
- ✅ Database credentials are secure
- ✅ API keys are restricted to your domain

## Customization

### Updating Main Page Content
The About Us section and main page content can be edited in:
- `app/page.tsx` - Main homepage
- Admin panel (future feature for non-technical edits)

### Level Thresholds
Edit XP requirements in `lib/levels.ts`:
```typescript
export const LEVEL_THRESHOLDS = [
  0,     // Level 1
  100,   // Level 2
  // ... etc
];
```

## Support

- **Email**: levellinglabs@gmail.com
- **Admin Panel**: [Your Domain]/admin

## Next Steps After Deployment

1. ✅ Test all pages and features
2. ✅ Add initial products via admin panel
3. ✅ Upload gadget reviews
4. ✅ Test payment flows
5. ✅ Test AI chatbot
6. ✅ Set up custom domain
7. ✅ Configure email notifications (future enhancement)
8. ✅ Add analytics and tracking

## Troubleshooting

### Build Errors
- Run `npm run build` locally to test
- Check Vercel build logs for specific errors

### Database Issues
- Ensure `DATABASE_URL` is correct
- Run `npx prisma db push` after schema changes
- Check database provider connection limits

### API Errors
- Verify all environment variables are set
- Check API key validity and quotas
- Review Vercel function logs

---

**Deployed successfully? Your Levelling Labs website is now live!** 🎉
