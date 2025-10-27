# 🚀 Quick Start - CodaiPro Website

Get your CodaiPro website running in 5 minutes!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Environment (2 min)

```bash
# Copy the environment template
cp .env.local.example .env.local

# Edit .env.local with your Appwrite credentials
# You'll need:
# - NEXT_PUBLIC_APPWRITE_ENDPOINT (from Appwrite console)
# - NEXT_PUBLIC_APPWRITE_PROJECT_ID (from Appwrite console)
```

### Get Appwrite Credentials:
1. Go to https://cloud.appwrite.io
2. Create a new project
3. Copy your Project ID from Settings
4. Use endpoint: `https://cloud.appwrite.io/v1`

## Step 3: Run the Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:3000 to see your website! 🎉

## Step 4: Verify Setup (1 min)

```bash
# Optional: Run setup verification
npm run setup
```

---

## 📖 What You'll See

### Landing Page
- Beautiful animated hero section
- Features showcase
- Student testimonials
- Pricing plans
- Call-to-action sections

### Try These Routes:
- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Downloads**: http://localhost:3000/downloads

---

## 🔐 Enable Authentication

To make login/register work:

1. **Go to Appwrite Console** → Auth
2. **Enable** Email/Password authentication
3. **Add Platform**: 
   - Name: CodaiPro Web
   - Hostname: `localhost`
4. **Test** by creating an account on /register

---

## 🎯 Next Steps

### For Development:
- Customize content in `components/marketing/*.tsx`
- Update pricing in `components/marketing/pricing-section.tsx`
- Modify colors/styling with Tailwind classes

### For Production:
1. Set up Appwrite database (see `APPWRITE_SETUP.md`)
2. Configure domain in Appwrite platforms
3. Deploy to Vercel or your hosting provider
4. Update `NEXT_PUBLIC_APP_URL` to your domain

---

## 📚 Documentation

- **PROJECT_SUMMARY.md** - Overview of everything
- **SETUP_GUIDE.md** - Detailed setup instructions
- **APPWRITE_SETUP.md** - Appwrite configuration
- **ARCHITECTURE.md** - System architecture

---

## 🆘 Need Help?

### Common Issues:

**"npm install" fails:**
```bash
# Try using a different package manager
yarn install
# or
pnpm install
```

**Appwrite connection errors:**
- Check if `.env.local` exists and has correct values
- Verify Appwrite project ID is correct
- Add `localhost` to allowed platforms in Appwrite

**Styling looks broken:**
```bash
# Restart the dev server
# Press Ctrl+C, then:
npm run dev
```

---

## ✅ Quick Checklist

- [ ] Dependencies installed
- [ ] `.env.local` created and configured
- [ ] Dev server running
- [ ] Can see landing page at localhost:3000
- [ ] Appwrite project created
- [ ] Authentication enabled in Appwrite

---

**That's it! You're ready to start developing! 🚀**

For detailed instructions, see `SETUP_GUIDE.md`
