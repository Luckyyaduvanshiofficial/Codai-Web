# 🚀 CodaiPro Official Website

The official marketing website for CodaiPro - an AI-powered offline coding assistant designed for students and developers.

![CodaiPro](https://img.shields.io/badge/CodaiPro-v2.1-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌐 Live Website

**Production**: [https://codai.pro](https://codai.pro)  
**Documentation**: [https://docs.codai.pro](https://docs.codai.pro)  
**Repository**: [https://github.com/Luckyyaduvanshiofficial/Codai](https://github.com/Luckyyaduvanshiofficial/Codai)

---

## ✨ Features

- 🎨 **Modern Design**: Clean GitHub-inspired theme with light/dark mode
- ⚡ **Lightning Fast**: Built with Next.js 16 and React 19
- 📱 **Fully Responsive**: Perfect on desktop, tablet, and mobile
- 🔍 **SEO Optimized**: Complete meta tags, sitemap, robots.txt, JSON-LD
- 🎯 **Type-Safe**: Full TypeScript coverage
- 🔐 **Authentication**: Integrated with Appwrite Cloud
- 📊 **Analytics Ready**: Structured data and social sharing optimized
- ♿ **Accessible**: WCAG compliant with proper ARIA labels

---

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **React**: [React 19](https://react.dev/)

### Styling
- **CSS Framework**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Custom components with [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend & Services
- **Authentication**: [Appwrite Cloud](https://appwrite.io/)
- **API**: GitHub REST API (for releases)
- **Hosting**: [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```
codai-web/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── verify/
│   ├── (dashboard)/              # Protected pages
│   │   ├── dashboard/
│   │   ├── downloads/
│   │   ├── profile/
│   │   └── try-now/
│   ├── (marketing)/              # Public pages
│   │   ├── about/
│   │   ├── features/
│   │   └── pricing/
│   ├── api/                      # API routes
│   │   └── releases/             # GitHub releases API
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Homepage
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt
├── components/
│   ├── dashboard/                # Dashboard components
│   ├── marketing/                # Marketing components
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── stats-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── navigation.tsx
│   │   └── footer.tsx
│   └── ui/                       # Reusable UI components
├── hooks/
│   └── useAuth.ts                # Authentication hook
├── lib/
│   ├── appwrite.ts               # Appwrite client
│   └── utils.ts                  # Utility functions
├── public/
│   └── assets/                   # Static assets
└── types/                        # TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (20+ recommended)
- **npm/yarn/pnpm**: Latest version
- **Git**: For version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/codai-web.git
cd codai-web
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Appwrite credentials:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run dev:turbo    # Start with Turbopack (faster)

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types

# Deployment
npm run deploy       # Deploy to Vercel
```

---

## 🎨 Customization

### Theme
The website uses a GitHub-inspired color system. To customize:

1. **Colors**: Edit `app/globals.css`
2. **Components**: Modify files in `components/`
3. **Tailwind**: Update `tailwind.config.ts`

### Content
- **Homepage**: Edit `app/page.tsx`
- **About**: Edit `app/(marketing)/about/page.tsx`
- **Features**: Edit `app/(marketing)/features/page.tsx`
- **Pricing**: Edit `app/(marketing)/pricing/page.tsx`

---

## 📊 SEO Features

### Implemented
- ✅ **Meta Tags**: Comprehensive title, description, keywords
- ✅ **Open Graph**: Optimized for social media sharing
- ✅ **Twitter Cards**: Rich previews for Twitter
- ✅ **JSON-LD**: Structured data for search engines
- ✅ **Sitemap**: Auto-generated dynamic sitemap
- ✅ **Robots.txt**: Proper crawler directives
- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Alt Text**: All images have descriptive alt text
- ✅ **Semantic HTML**: Proper heading hierarchy

### Performance
- ⚡ **Lighthouse Score**: 95+ on all metrics
- 📦 **Bundle Size**: Optimized with code splitting
- 🖼️ **Images**: Next.js Image optimization
- 💨 **Loading**: Lazy loading and prefetching

---

## 🔐 Authentication Setup

The website uses [Appwrite](https://appwrite.io/) for authentication.

### Setup Steps

1. **Create Appwrite Project**
   - Go to [Appwrite Cloud](https://cloud.appwrite.io/)
   - Create a new project
   - Note your Project ID

2. **Configure Platform**
   - Add web platform
   - Set hostname: `localhost` and `codai.pro`

3. **Enable Authentication**
   - Enable Email/Password auth
   - Configure email templates (optional)

4. **Create Database**
   - Create database and collections
   - Set up permissions

5. **Update Environment Variables**
   - Add credentials to `.env.local`

For detailed instructions, see `APPWRITE_SETUP.md`.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Domain**
   - Add custom domain: `codai.pro`
   - Add DNS records:
     - `A` record: `76.76.21.21`
     - `CNAME` www: `cname.vercel-dns.com`

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

---

## 📱 Pages Overview

### Public Pages
- **/** - Homepage with hero, features, stats, testimonials, pricing
- **/about** - About CodaiPro, mission, team, story
- **/features** - Detailed feature breakdown
- **/pricing** - Pricing tiers and FAQs
- **/downloads** - Download links and system requirements

### Authentication
- **/login** - User login
- **/register** - User registration
- **/verify** - Email verification

### Protected (Dashboard)
- **/dashboard** - User dashboard
- **/downloads** - Personal downloads
- **/profile** - User profile
- **/try-now** - Cloud IDE

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Lucky Yaduvanshi**
- Portfolio: [luckyyaduvanshiofficial.github.io](https://luckyyaduvanshiofficial.github.io)
- GitHub: [@luckyyaduvanshi](https://github.com/luckyyaduvanshi)
- LinkedIn: [linkedin.com/in/luckyyaduvanshi](https://linkedin.com/in/luckyyaduvanshi)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Appwrite](https://appwrite.io/) - Backend as a Service
- [Vercel](https://vercel.com/) - Hosting Platform
- [Radix UI](https://www.radix-ui.com/) - Accessible Components
- [Lucide](https://lucide.dev/) - Beautiful Icons

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Luckyyaduvanshiofficial/Codai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Luckyyaduvanshiofficial/Codai/discussions)
- **Email**: Contact via [portfolio](https://luckyyaduvanshiofficial.github.io)

---

<div align="center">

**Made with ❤️ for the coding community**

*Empowering students and developers with offline AI assistance*

</div>
