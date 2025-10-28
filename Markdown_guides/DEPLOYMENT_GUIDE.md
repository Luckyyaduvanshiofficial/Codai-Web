# 🚀 CodaiPro Deployment & Setup Guide

## 📁 Project Structure

```
Lucky-Labs/
├── codai-web/          → Main website (codai.pro)
└── codai-docs/         → Documentation site (docs.codai.pro)
```

---

## 1️⃣ Documentation Site Setup (docs.codai.pro)

### Step 1: Configure Nextra Docs

```bash
cd codai-docs
```

Edit `theme.config.tsx`:
```tsx
export default {
  logo: <span>CodaiPro Documentation</span>,
  project: {
    link: 'https://github.com/Luckyyaduvanshiofficial/Codai'
  },
  docsRepositoryBase: 'https://github.com/Luckyyaduvanshiofficial/Codai/tree/main/docs',
  footer: {
    text: '© 2025 CodaiPro. All rights reserved.'
  },
  primaryHue: 250, // Purple color for GitHub theme
  darkMode: true,
}
```

### Step 2: Deploy to Vercel

1. **Push to GitHub:**
```bash
cd codai-docs
git init
git add .
git commit -m "Initial docs setup"
git remote add origin https://github.com/Luckyyaduvanshiofficial/codai-docs.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Import `codai-docs` repository
   - **Custom Domain:** Add `docs.codai.pro`

3. **DNS Configuration (Namecheap/GoDaddy):**
```
Type: CNAME
Host: docs
Value: cname.vercel-dns.com
```

---

## 2️⃣ Main Website Deployment (codai.pro)

### Step 1: Push to GitHub
```bash
cd codai-web
git add .
git commit -m "Add SEO, GitHub releases, and docs link"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Import `codai-web` repository
3. **Environment Variables:**
```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=68ff4366001b6740bb21
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=Codai
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_DATABASE_ID=codai-main
NEXT_PUBLIC_APP_URL=https://codai.pro
APPWRITE_API_KEY=your_api_key_here
```

### Step 3: Add Custom Domain

1. In Vercel project settings → Domains
2. Add `codai.pro` and `www.codai.pro`
3. **DNS Configuration:**

```
Type: A
Host: @
Value: 76.76.21.21

Type: CNAME
Host: www
Value: cname.vercel-dns.com
```

---

## 3️⃣ Building Windows Installer Setup

### Option 1: Using Inno Setup (Recommended) ⭐

**Download:** https://jrsoftware.org/isdl.php

**Create `setup.iss` file:**

```iss
[Setup]
AppName=CodaiPro
AppVersion=2.1.0
AppPublisher=Lucky Yaduvanshi
AppPublisherURL=https://codai.pro
DefaultDirName={autopf}\CodaiPro
DefaultGroupName=CodaiPro
OutputDir=output
OutputBaseFilename=CodaiPro-v2.1-Setup
Compression=lzma2
SolidCompression=yes
SetupIconFile=icon.ico
UninstallDisplayIcon={app}\codai.exe

[Files]
Source: "dist\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs

[Icons]
Name: "{group}\CodaiPro"; Filename: "{app}\codai.exe"
Name: "{autodesktop}\CodaiPro"; Filename: "{app}\codai.exe"

[Run]
Filename: "{app}\codai.exe"; Description: "Launch CodaiPro"; Flags: postinstall skipifsilent nowait
```

**Build Command:**
```bash
iscc setup.iss
```

### Option 2: Using NSIS

**Download:** https://nsis.sourceforge.io/Download

**Create `installer.nsi`:**
```nsis
!define APP_NAME "CodaiPro"
!define APP_VERSION "2.1.0"
!define APP_PUBLISHER "Lucky Yaduvanshi"
!define APP_WEB_SITE "https://codai.pro"

Name "${APP_NAME}"
OutFile "CodaiPro-v2.1-Setup.exe"
InstallDir "$PROGRAMFILES\CodaiPro"

Section "MainSection" SEC01
  SetOutPath "$INSTDIR"
  File /r "dist\*.*"
  CreateShortCut "$DESKTOP\CodaiPro.lnk" "$INSTDIR\codai.exe"
SectionEnd
```

---

## 4️⃣ GitHub Release Management

### Create Release with Both Versions

```bash
# Tag version
git tag v2.1.0
git push origin v2.1.0

# Create release on GitHub
# Upload both files:
# 1. CodaiPro-v2.1-Portable.exe
# 2. CodaiPro-v2.1-Setup.exe
```

### Auto-Update Downloads Page

Your website now automatically fetches the latest release from:
```
https://api.github.com/repos/Luckyyaduvanshiofficial/Codai/releases/latest
```

The downloads page will show:
- Latest version number
- Download links for both portable and setup
- File sizes
- Download counts

---

## 5️⃣ SEO Optimizations Applied ✅

### What's Been Added:

1. **Enhanced Meta Tags:**
   - Rich Open Graph tags for social sharing
   - Twitter Card support
   - Comprehensive keywords
   - Canonical URLs

2. **Sitemap:**
   - Auto-generated at `/sitemap.xml`
   - All important pages included
   - Priority levels set

3. **Robots.txt:**
   - Search engine friendly
   - Excludes auth and API routes
   - Points to sitemap

4. **Structured Data:**
   - JSON-LD for software application
   - Better search engine understanding

### Post-Deployment SEO Tasks:

1. **Google Search Console:**
   - Add https://codai.pro
   - Submit sitemap: `https://codai.pro/sitemap.xml`
   - Get verification code and add to `layout.tsx`

2. **Google Analytics:**
```tsx
// Add to app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

3. **Create Open Graph Image:**
   - Create `public/og-image.png`
   - Size: 1200x630px
   - Include CodaiPro logo and tagline

---

## 6️⃣ Building Portable vs Setup

### Portable Version:
```bash
# Using PyInstaller (if Python-based)
pyinstaller --onefile --windowed --icon=icon.ico codai.py

# Output: dist/codai.exe (single file)
# Rename to: CodaiPro-v2.1-Portable.exe
```

### Setup Version:
```bash
# 1. Build portable first
pyinstaller --onedir --windowed --icon=icon.ico codai.py

# 2. Use Inno Setup to create installer
iscc setup.iss

# Output: CodaiPro-v2.1-Setup.exe
```

### Comparison:

| Feature | Portable | Installer |
|---------|----------|-----------|
| Single File | ✅ Yes | ❌ No |
| Desktop Shortcut | ❌ Manual | ✅ Auto |
| Uninstaller | ❌ None | ✅ Included |
| Auto-Update | ❌ Manual | ✅ Possible |
| User Preference | 🎒 Students | 🏢 Enterprise |

---

## 7️⃣ Quick Checklist

### Before Deployment:
- [ ] Update `.env` with production values
- [ ] Test GitHub release API endpoint
- [ ] Create OG image (`public/og-image.png`)
- [ ] Build both portable and setup versions
- [ ] Test downloads locally

### Deployment:
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Add custom domains (codai.pro, docs.codai.pro)
- [ ] Configure DNS records
- [ ] Test all routes

### Post-Deployment:
- [ ] Submit to Google Search Console
- [ ] Add Google Analytics
- [ ] Create GitHub release with both files
- [ ] Test download links
- [ ] Share on social media

---

## 8️⃣ Useful Commands

```bash
# Main website
cd codai-web
npm run dev          # Development
npm run build        # Production build
npm run start        # Start production

# Docs site
cd codai-docs
npm run dev          # Development
npm run build        # Production build

# Create release
git tag v2.1.0
git push origin v2.1.0

# Check SEO
curl https://codai.pro/sitemap.xml
curl https://codai.pro/robots.txt
```

---

## 9️⃣ Domain Setup Summary

| Domain | Points To | Type |
|--------|-----------|------|
| codai.pro | Vercel (main site) | A Record |
| www.codai.pro | Vercel | CNAME |
| docs.codai.pro | Vercel (docs site) | CNAME |

---

## 🎉 You're All Set!

Your stack:
- **Main Website:** codai.pro (Next.js on Vercel)
- **Documentation:** docs.codai.pro (Nextra on Vercel)
- **Downloads:** GitHub Releases API
- **Auth:** Appwrite Cloud
- **SEO:** Optimized and ready

Need help? Check the documentation or reach out! 🚀
