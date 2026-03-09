# Levelling Labs

> Your Ultimate Destination for Gadgets & Custom 3D Printed Accessories

## 🌟 Overview

Levelling Labs is a modern e-commerce platform that combines cutting-edge gadgets with custom 3D printed accessories. Built with Next.js and powered by AI, it features an innovative XP/leveling system that rewards customers with exclusive benefits.

## ✨ Features

### 🛍️ E-Commerce
- **Gadget Shop**: Browse and purchase the latest tech products
- **3D Printed Accessories**: Both pre-made and customizable options
- **Smart Categorization**: Easy navigation between gadgets and accessories
- **Stock Management**: Real-time inventory tracking

### 🎮 XP & Leveling System
- Earn XP with every purchase (1 XP per dollar)
- 10 progressive levels with increasing benefits
- **Level 3+**: Faster shipping (3-5 days) + 5% discount
- **Level 7+**: Express shipping (2-3 days) + 10% discount
- **Level 10**: Priority shipping (1-2 days) + 15% discount + 14-day premium trial

### 💳 Payment Integration
- Credit/Debit Cards (via Stripe)
- PayPal
- Alipay
- WeChat Pay

### 🤖 AI Customer Support
- Powered by Anthropic's Claude
- 24/7 instant responses
- Knowledge of products, shipping, and policies
- Natural conversation interface

### 📺 Content Platform
- **Gadget Reviews**: Video reviews with ratings
- **3D Print Showcase**: Browse printable models
- **Project Gallery**: Featured customization projects

### 💎 Subscription Tiers
- **Pass** ($49/month): Priority support, 5% discount, free shipping
- **Plus** ($79/month): All Pass benefits + 10% discount, express shipping, exclusive designs
- **Premium** ($99/month): All Plus benefits + 15% discount, priority shipping, unlimited consultations

### 🔐 Admin Panel
- Password-protected dashboard
- Add/manage products
- Upload gadget reviews
- Create 3D print projects
- Real-time content updates

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment**
   ```bash
   # Edit .env file and add your API keys
   ANTHROPIC_API_KEY="your-api-key"
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Access Admin Panel**
   - Visit [http://localhost:3000/admin](http://localhost:3000/admin)
   - Password: `LevellinglabsY7`

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get up and running in 5 minutes
- **[Deployment Guide](DEPLOYMENT.md)** - Detailed deployment instructions for Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (SQLite dev, PostgreSQL prod)
- **AI**: Anthropic Claude API
- **Payments**: Stripe, PayPal
- **Deployment**: Vercel
- **Icons**: React Icons

## 📂 Project Structure

```
levelling-labs/
├── app/
│   ├── api/           # API routes
│   │   ├── chat/      # AI chatbot endpoint
│   │   └── admin/     # Admin CRUD operations
│   ├── admin/         # Admin dashboard
│   ├── reviews/       # Gadget reviews page
│   ├── shop/          # E-commerce shop
│   ├── 3d-prints/     # 3D models gallery
│   ├── subscriptions/ # Subscription plans
│   └── login/         # Authentication
├── components/        # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ChatBot.tsx
├── lib/              # Utilities
│   ├── prisma.ts     # Database client
│   └── levels.ts     # XP/leveling logic
├── prisma/           # Database schema
└── public/           # Static assets
```

## 🔑 Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY="your-api-key"
STRIPE_SECRET_KEY="your-stripe-key"
PAYPAL_CLIENT_ID="your-paypal-id"
PAYPAL_CLIENT_SECRET="your-paypal-secret"
```

## 🎨 Customization

### Update Main Page Content
Edit `app/page.tsx` to modify:
- Hero section text
- About Us content
- Feature descriptions
- Level benefits

### Adjust XP Thresholds
Modify `lib/levels.ts` to change level requirements:
```typescript
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000
];
```

### Change Admin Password
Update the password check in `app/admin/page.tsx`:
```typescript
if (password === 'YourNewPassword') {
  // ...
}
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub:
   ```bash
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Import to Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Add environment variables
   - Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📧 Contact

- **Email**: levellinglabs@gmail.com
- **Admin Portal**: [Your Domain]/admin

## 📝 License

Private - All rights reserved

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- AI powered by [Anthropic Claude](https://www.anthropic.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Styling with [Tailwind CSS](https://tailwindcss.com)

---

**Ready to launch your e-commerce empire?** Follow the [Quick Start Guide](QUICKSTART.md)! 🚀
