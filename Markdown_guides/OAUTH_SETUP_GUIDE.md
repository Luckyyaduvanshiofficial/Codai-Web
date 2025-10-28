# OAuth Authentication Setup Guide

This guide will help you enable GitHub and Google OAuth authentication in your CodaiPro website.

## ✅ Code Changes Completed

The following changes have been made to your codebase:

1. **Updated `hooks/useAuth.ts`**:
   - Added `loginWithOAuth` function
   - Added OAuthProvider import from Appwrite
   - Updated AuthContextType interface

2. **Updated `app/(auth)/login/page.tsx`**:
   - Enabled GitHub and Google OAuth buttons
   - Added `handleOAuthLogin` function
   - Buttons now trigger OAuth flow

3. **Updated `app/(auth)/register/page.tsx`**:
   - Enabled GitHub and Google OAuth buttons
   - Added `handleOAuthLogin` function
   - Buttons now trigger OAuth flow

4. **Created `app/(auth)/oauth-callback/page.tsx`**:
   - New page to handle OAuth authentication responses
   - Redirects users to dashboard on success
   - Shows error and redirects to login on failure

## 📋 Setup Instructions

### Step 1: Configure GitHub OAuth

1. **Go to GitHub Developer Settings**:
   - Navigate to [https://github.com/settings/developers](https://github.com/settings/developers)
   - Click on "OAuth Apps" in the sidebar
   - Click "New OAuth App"

2. **Fill in the Application Details**:
   - **Application name**: `CodaiPro` (or your preferred name)
   - **Homepage URL**: 
     - Production: `https://yourdomain.com`
     - Development: `http://localhost:3000`
   - **Application description**: Your app description (optional)
   - **Authorization callback URL**: 
     - Get this from your Appwrite Console (see Step 3)
     - Format: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/[PROJECT_ID]`

3. **Register the Application**:
   - Click "Register application"
   - You'll see your **Client ID** displayed
   - Click "Generate a new client secret" to get your **Client Secret**
   - **Important**: Copy both values immediately - the secret won't be shown again!

4. **Configure in Appwrite Console**:
   - Go to [Appwrite Console](https://cloud.appwrite.io)
   - Select your project
   - Navigate to **Auth** → **Settings** → **OAuth2 Providers**
   - Find **GitHub** in the list
   - Toggle it to enable
   - Enter your **Client ID** (App ID)
   - Enter your **Client Secret**
   - Click **Update**

### Step 2: Configure Google OAuth

1. **Go to Google Cloud Console**:
   - Navigate to [https://console.cloud.google.com](https://console.cloud.google.com)
   - Select your project or create a new one

2. **Enable Google+ API** (if not already enabled):
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API"
   - Click and enable it

3. **Configure OAuth Consent Screen**:
   - Go to **APIs & Services** → **OAuth consent screen**
   - Choose **External** (unless you have a Google Workspace)
   - Fill in the required information:
     - App name: `CodaiPro`
     - User support email: Your email
     - Developer contact: Your email
   - Add scopes (optional for basic auth):
     - `./auth/userinfo.email`
     - `./auth/userinfo.profile`
   - Add test users if in development mode
   - Click **Save and Continue**

4. **Create OAuth 2.0 Credentials**:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **OAuth 2.0 Client ID**
   - Choose **Web application**
   - Name: `CodaiPro Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - Get this from Appwrite Console
     - Format: `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/[PROJECT_ID]`
   - Click **Create**
   - Copy your **Client ID** and **Client Secret**

5. **Configure in Appwrite Console**:
   - Go to [Appwrite Console](https://cloud.appwrite.io)
   - Select your project
   - Navigate to **Auth** → **Settings** → **OAuth2 Providers**
   - Find **Google** in the list
   - Toggle it to enable
   - Enter your **Client ID** (App ID)
   - Enter your **Client Secret**
   - Click **Update**

### Step 3: Get Appwrite Callback URLs

To find your exact OAuth callback URLs in Appwrite:

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project
3. Navigate to **Auth** → **Settings** → **OAuth2 Providers**
4. Click on **GitHub** or **Google**
5. The callback URL will be displayed at the top
6. Copy this URL and use it in your OAuth app configuration

The URL format is:
```
https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/{provider}/{projectId}
```

### Step 4: Update Success/Failure URLs (Optional)

If you want to customize where users land after OAuth:

1. In your code, the URLs are set in `hooks/useAuth.ts`:
   ```typescript
   const successUrl = `${window.location.origin}/dashboard`;
   const failureUrl = `${window.location.origin}/login`;
   ```

2. You can modify these to any route in your application.

## 🧪 Testing

### Test in Development:

1. Make sure your `.env.local` has the Appwrite credentials:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

2. Start your development server:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:3000/login` or `http://localhost:3000/register`

4. Click the **GitHub** or **Google** button

5. You should be redirected to the OAuth provider

6. After authorizing, you'll be redirected back and logged in

### Test Flow:

✅ Click OAuth button → Redirected to provider  
✅ Sign in with provider → Grant permissions  
✅ Redirected back to your app → User logged in  
✅ Check dashboard access → User data loaded  

## 🔧 Troubleshooting

### "Invalid OAuth callback URL" error:
- Verify the callback URL in your OAuth app matches exactly what Appwrite shows
- Make sure there are no trailing slashes or extra characters
- Check that the project ID is correct

### "redirect_uri_mismatch" error (Google):
- The redirect URI must be added to **both**:
  - Authorized JavaScript origins
  - Authorized redirect URIs
- URLs must match exactly (including http/https)

### OAuth buttons not working:
- Check browser console for errors
- Verify Appwrite credentials in `.env.local`
- Make sure OAuth is enabled in Appwrite Console
- Check that Client ID and Secret are correctly entered

### User not redirected after OAuth:
- Check the success/failure URLs are correct
- Verify the `/oauth-callback` route exists
- Check browser console and network tab for errors

### Session not persisting:
- Make sure cookies are enabled
- Check that your domain allows third-party cookies
- Verify Appwrite endpoint is accessible

## 🔒 Security Best Practices

1. **Never commit OAuth secrets**:
   - Keep Client Secrets in Appwrite Console only
   - Don't store them in your code or `.env` files committed to Git

2. **Use environment variables**:
   - Store Appwrite credentials in `.env.local` (gitignored)
   - Use different credentials for development and production

3. **Validate redirect URLs**:
   - Only add trusted domains to OAuth apps
   - Use HTTPS in production

4. **Regular security reviews**:
   - Rotate OAuth secrets periodically
   - Monitor OAuth app access logs
   - Review authorized applications

## 📚 Additional Resources

- [Appwrite OAuth Documentation](https://appwrite.io/docs/products/auth/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## 🎉 You're All Set!

Your OAuth authentication is now configured! Users can sign in with their GitHub or Google accounts, making registration faster and more secure.

### What Users Will See:

1. On login/register page, they'll see enabled GitHub and Google buttons
2. Clicking a button opens the provider's authorization page
3. After authorizing, they're redirected back to your dashboard
4. Their account is automatically created (if new) or logged in (if existing)

### Next Steps:

- Test both GitHub and Google OAuth flows
- Add more OAuth providers if needed (Appwrite supports 30+ providers)
- Customize the user profile page to show OAuth provider info
- Set up email verification for email/password users
- Add two-factor authentication for enhanced security

---

**Need Help?** Check the troubleshooting section or refer to the Appwrite documentation.
