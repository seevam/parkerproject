# Quick Start Guide - Levelling Labs

## 🚀 Get Started in 5 Minutes

### 1. Set Up Your API Keys

Edit the `.env` file in the project root:

```bash
# Required for AI Chatbot
ANTHROPIC_API_KEY="your-api-key-here"

# Required for Production Database (when deploying)
# For local development, the default SQLite is fine
DATABASE_URL="file:./dev.db"
```

**Get your Anthropic API key:**
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Go to "API Keys" and create a new key
4. Copy and paste it into the `.env` file

### 2. Test Locally

The development server is already running! Visit:
- **Main Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin (Password: `LevellinglabsY7`)

### 3. Add Your First Content

1. Go to http://localhost:3000/admin
2. Enter password: `LevellinglabsY7`
3. Try adding:
   - A gadget review
   - A 3D print project
   - A product

### 4. Deploy to Vercel (Make it Live!)

**Option A: Easy Deploy (Recommended)**
1. Push your code to GitHub:
   ```bash
   cd levelling-labs
   git init
   git add .
   git commit -m "Initial commit"
   # Create a repo on GitHub first, then:
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Click "Import Git Repository"
4. Select your Levelling Labs repo
5. Add environment variables:
   - `ANTHROPIC_API_KEY` - Your Claude API key
   - `NEXTAUTH_SECRET` - Run this command to generate: `openssl rand -base64 32`
   - For production, also add payment keys (Stripe, PayPal)

6. Click "Deploy" and wait!

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel
```

### 5. Set Up Production Database

For production, you need PostgreSQL instead of SQLite:

1. **Get a Free PostgreSQL Database:**
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Recommended)
   - [Supabase](https://supabase.com) (Free tier)
   - [Railway](https://railway.app) (Free tier)

2. **Update Database:**
   - Copy the PostgreSQL connection string
   - Add it to Vercel environment variables as `DATABASE_URL`
   - Update `prisma/schema.prisma`:
     ```prisma
     datasource db {
       provider = "postgresql"  // change from "sqlite"
       url      = env("DATABASE_URL")
     }
     ```
   - Redeploy on Vercel

## 🎯 What's Next?

### Customize Your Site
- Edit `app/page.tsx` to change the homepage content
- Upload your logo and images
- Update colors in `tailwind.config.js`

### Add Payment Integration
1. **Stripe** (for cards, Alipay, WeChat Pay):
   - Sign up at [stripe.com](https://stripe.com)
   - Get API keys from Dashboard
   - Add `STRIPE_SECRET_KEY` to environment variables

2. **PayPal**:
   - Sign up at [developer.paypal.com](https://developer.paypal.com)
   - Create an app and get credentials
   - Add `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`

### Test the AI Chatbot
1. Make sure `ANTHROPIC_API_KEY` is set
2. Click the chat icon in the bottom-right corner
3. Ask questions about products, shipping, etc.

### Add Your First Products
1. Go to `/admin`
2. Use the "Add Product" form
3. Set prices, stock, and upload images
4. Products appear immediately on `/shop`

## 📧 Support

- **Email**: levellinglabs@gmail.com
- **Documentation**: See `DEPLOYMENT.md` for detailed instructions

## 🔐 Default Credentials

- **Admin Password**: `LevellinglabsY7`
  - *Change this in production by updating the password check in `app/admin/page.tsx`*

## ✅ Checklist

- [ ] Set `ANTHROPIC_API_KEY` in `.env`
- [ ] Test site locally at http://localhost:3000
- [ ] Add test content via admin panel
- [ ] Deploy to Vercel
- [ ] Set up production database (PostgreSQL)
- [ ] Configure payment gateways
- [ ] Add custom domain (optional)
- [ ] Test all features in production

---

**Need Help?** Check `DEPLOYMENT.md` for detailed setup instructions!
