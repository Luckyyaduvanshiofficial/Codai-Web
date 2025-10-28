# 🎯 Quick Setup Instructions

## Immediate Steps Required

### 1. Create Environment File
Create `.env.local` in your project root:

```env
# Get this from https://cloud.appwrite.io (Settings)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=paste_your_project_id_here

# Your N8N chat webhook
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.rankllms.com/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat

# Optional: SambaNova API for AI features
SAMBANOVA_API_KEY=your_key_here
```

### 2. Configure Appwrite (CRITICAL for OAuth)

**Go to [Appwrite Console](https://cloud.appwrite.io) → Your Project → Settings → Platforms**

Click **Add Platform** → **Web**, then add:

**Development:**
- Name: `Codai Local`
- Hostname: `localhost:3000`

**Production:**
- Name: `Codai Production`
- Hostname: `codai.pro`

Add another platform:
- Name: `Codai WWW`  
- Hostname: `www.codai.pro`

### 3. Setup GitHub OAuth

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name:** CodaiPro
   - **Homepage URL:** `https://codai.pro`
   - **Authorization callback URL:** Copy from Appwrite Console → Auth → OAuth2 → GitHub
     - Format: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/{your-project-id}`
4. Copy **Client ID** and **Client Secret**
5. Paste into Appwrite Console → Auth → OAuth2 → GitHub

### 4. Setup Google OAuth

1. Go to https://console.cloud.google.com
2. Create/Select project
3. Go to **APIs & Services** → **OAuth consent screen** → Configure
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. **Application type:** Web application
6. **Authorized JavaScript origins:**
   - `http://localhost:3000`
   - `https://codai.pro`
7. **Authorized redirect URIs:** Copy from Appwrite Console → Auth → OAuth2 → Google
   - Format: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/{your-project-id}`
8. Copy **Client ID** and **Client Secret**
9. Paste into Appwrite Console → Auth → OAuth2 → Google

### 5. Restart Server

```bash
npm run dev
```

## ✅ Test Checklist

- [ ] Login with email/password works
- [ ] Signup with email/password works
- [ ] GitHub OAuth login works
- [ ] Google OAuth login works
- [ ] Download button works (uses portable .zip)
- [ ] Chatbot responds to messages
- [ ] Try-now page requires login
- [ ] Outline buttons are visible (blue by default)

## 🐛 Quick Troubleshooting

**OAuth Error 400?**
→ Make sure you added `codai.pro` to Appwrite Platforms

**Failed to fetch?**
→ Check `.env.local` has correct `NEXT_PUBLIC_APPWRITE_PROJECT_ID`

**Chatbot not working?**
→ Verify webhook URL ends with `/chat` not `/post`

**Download 404?**
→ File is now `CodaiPro_v2.1.zip` (portable version)

**Try-now accessible without login?**
→ Clear browser cache and restart dev server

## 📋 Files Changed

All fixes have been applied to these files:
- ✅ `components/ui/button.tsx` - Button styling
- ✅ `hooks/useAuth.ts` - OAuth redirect URL
- ✅ `app/(dashboard)/try-now/page.tsx` - Login protection
- ✅ `app/(dashboard)/downloads/page.tsx` - Download URLs
- ✅ `app/(dashboard)/download-thanks/page.tsx` - Download path
- ✅ `.env.example` - Environment configuration

## 🚀 Ready to Test!

After completing steps 1-5 above, all 5 problems should be fixed:
1. ✅ Buttons now visible (blue by default)
2. ✅ OAuth configured correctly
3. ✅ Chatbot using correct endpoint
4. ✅ Downloads use working .zip URL
5. ✅ Try-now requires authentication

---

**Full Documentation:** See `COMPLETE_FIXES_GUIDE.md` for detailed explanation of each fix.
