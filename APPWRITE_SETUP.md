# 🔐 Appwrite Configuration Guide for CodaiPro

This guide will help you set up Appwrite Cloud for your CodaiPro website.

## 📋 Step 1: Create Appwrite Project

1. Go to https://cloud.appwrite.io
2. Sign up or log in
3. Click "Create Project"
4. Enter project details:
   - **Name**: CodaiPro
   - **Project ID**: Will be auto-generated (copy this!)

## 🔑 Step 2: Configure Authentication

### Enable Email/Password Authentication

1. In your Appwrite console, navigate to **Auth** → **Settings**
2. Enable the following:
   - ✅ Email/Password
   - ✅ Email Verification (recommended)
   - ✅ Password Recovery

### Configure Platforms

1. Go to **Settings** → **Platforms**
2. Add a **Web App** platform:
   - **Name**: CodaiPro Web
   - **Hostname**: `localhost` (for development)
   - For production, add: `codai.pro` or your domain

## 💾 Step 3: Create Database & Collections

### Create Database

1. Navigate to **Databases** in the left sidebar
2. Click **Create Database**
3. Enter:
   - **Database ID**: `codai-main`
   - **Name**: CodaiPro Main Database

### Create Collections

#### Collection 1: Users
```
Collection ID: users
Name: Users
```

**Attributes:**
- `userId` (String, 36, required) - Appwrite user ID
- `name` (String, 128, required)
- `email` (String, 254, required)
- `role` (String, 20) - "student", "pro", "free"
- `university` (String, 255)
- `subscriptionStatus` (String, 20) - "active", "inactive"
- `createdAt` (DateTime, required)
- `updatedAt` (DateTime, required)

**Indexes:**
- `userId_index` on `userId` (Unique)
- `email_index` on `email` (Unique)

**Permissions:**
- Create: Users
- Read: Users (own documents)
- Update: Users (own documents)
- Delete: None

#### Collection 2: Downloads
```
Collection ID: downloads
Name: Downloads
```

**Attributes:**
- `userId` (String, 36, required)
- `version` (String, 20, required)
- `platform` (String, 50, required) - "windows", "mac", "linux", "source"
- `downloadedAt` (DateTime, required)
- `ipAddress` (String, 45)

**Indexes:**
- `userId_index` on `userId`
- `date_index` on `downloadedAt`

**Permissions:**
- Create: Users
- Read: Admins only
- Update: None
- Delete: None

#### Collection 3: Analytics
```
Collection ID: analytics
Name: Analytics
```

**Attributes:**
- `userId` (String, 36, required)
- `event` (String, 100, required) - "login", "code_execution", "ai_query"
- `metadata` (String, 5000) - JSON string
- `timestamp` (DateTime, required)

**Indexes:**
- `userId_index` on `userId`
- `event_index` on `event`
- `timestamp_index` on `timestamp`

**Permissions:**
- Create: Users
- Read: Users (own documents)
- Update: None
- Delete: None

#### Collection 4: Feedback
```
Collection ID: feedback
Name: Feedback
```

**Attributes:**
- `userId` (String, 36)
- `email` (String, 254, required)
- `subject` (String, 200, required)
- `message` (String, 5000, required)
- `rating` (Integer, required) - 1 to 5
- `status` (String, 20) - "new", "reviewing", "resolved"
- `createdAt` (DateTime, required)

**Indexes:**
- `userId_index` on `userId`
- `status_index` on `status`
- `date_index` on `createdAt`

**Permissions:**
- Create: Users and Guests
- Read: Admins only
- Update: Admins only
- Delete: Admins only

## 🔐 Step 4: Create API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Configure:
   - **Name**: CodaiPro Server Key
   - **Expiration**: Never (or set custom)
   - **Scopes**: Select all required scopes:
     - ✅ `databases.read`
     - ✅ `databases.write`
     - ✅ `users.read`
     - ✅ `users.write`
4. **Copy the API key** - you won't see it again!

## 📁 Step 5: Configure Storage (Optional)

If you need file storage (for user uploads, exports):

1. Navigate to **Storage** → **Buckets**
2. Click **Create Bucket**
3. Configure:
   - **Bucket ID**: `user-uploads`
   - **Name**: User Uploads
   - **File Security**: Enabled
   - **Max File Size**: 10MB (or as needed)

**Permissions:**
- Create: Users
- Read: Users (own files)
- Update: Users (own files)
- Delete: Users (own files)

## ⚡ Step 6: Create Cloud Functions (Optional)

For advanced features like email notifications or background processing:

### Function 1: Email Welcome
```
Function ID: email-welcome
Name: Send Welcome Email
Runtime: Node.js 18
```

### Function 2: Analytics Processor
```
Function ID: analytics-processor
Name: Process Analytics
Runtime: Node.js 18
```

## 🌐 Step 7: Update Environment Variables

Copy your credentials to `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=codai-main
NEXT_PUBLIC_APP_URL=http://localhost:3000
APPWRITE_API_KEY=<YOUR_API_KEY>
```

## 🔒 Step 8: Security Best Practices

### Rate Limiting
1. Go to **Settings** → **Security**
2. Configure rate limits:
   - Authentication: 10 requests/minute
   - API: 100 requests/minute

### CORS Settings
1. In **Settings** → **Platforms**
2. Add allowed origins:
   - Development: `http://localhost:3000`
   - Production: `https://codai.pro`

### Session Management
- Default session length: 1 year
- Enable session refresh
- Allow multiple sessions per user

## 📊 Step 9: Set Up Monitoring

1. Navigate to **Settings** → **Webhooks**
2. Create webhooks for important events:
   - User registration
   - Failed login attempts
   - File uploads

Example webhook URLs:
- `https://your-domain.com/api/webhooks/user-created`
- `https://your-domain.com/api/webhooks/download-tracked`

## 🧪 Step 10: Test Your Setup

### Test Authentication
```typescript
// In your browser console or test file
import { account } from '@/lib/appwrite';

// Test user creation
const user = await account.create('unique()', 'test@example.com', 'password123', 'Test User');
console.log('User created:', user);

// Test login
const session = await account.createEmailPasswordSession('test@example.com', 'password123');
console.log('Session created:', session);

// Test get current user
const currentUser = await account.get();
console.log('Current user:', currentUser);
```

### Test Database
```typescript
import { databases, DATABASE_ID } from '@/lib/appwrite';

// Create a test document
const doc = await databases.createDocument(
  DATABASE_ID,
  'users',
  'unique()',
  {
    userId: 'test-123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'free',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
);
console.log('Document created:', doc);
```

## 🚀 Step 11: Production Deployment

Before going live:

1. ✅ Update platform URLs to production domain
2. ✅ Enable email verification
3. ✅ Configure password recovery
4. ✅ Set up proper CORS policies
5. ✅ Enable rate limiting
6. ✅ Review all permissions
7. ✅ Set up monitoring and alerts
8. ✅ Create backup strategy

## 📝 Quick Reference

### Appwrite Console URLs
- Main Console: https://cloud.appwrite.io/console
- Documentation: https://appwrite.io/docs
- GitHub: https://github.com/appwrite/appwrite

### Important Collection IDs
- Users: `users`
- Downloads: `downloads`
- Analytics: `analytics`
- Feedback: `feedback`

### Database ID
- Main Database: `codai-main`

## 🆘 Troubleshooting

### Common Issues

**Authentication not working:**
- Check if platform (localhost/domain) is added
- Verify email/password auth is enabled
- Check browser console for CORS errors

**Database write failures:**
- Verify collection permissions
- Check attribute types match data
- Ensure required fields are provided

**API Key errors:**
- Regenerate API key if needed
- Check scopes are properly set
- Verify key hasn't expired

## 📚 Additional Resources

- [Appwrite Authentication Docs](https://appwrite.io/docs/products/auth)
- [Appwrite Database Docs](https://appwrite.io/docs/products/databases)
- [Appwrite Security Best Practices](https://appwrite.io/docs/advanced/security)

---

**You're all set!** 🎉 Your Appwrite backend is now configured for CodaiPro.
