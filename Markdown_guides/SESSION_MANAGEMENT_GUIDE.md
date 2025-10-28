# Session Management & Expiry Guide

## 🎯 The Problem We Solved

### **Without Session Expiry:**
```
Day 1:  User Lucky: "I need Python help"
        → Session: abc123
        → MongoDB saves conversation

Day 10: Same user returns
        → Still Session: abc123 (never expires!)
        → Bot: "So about that Python error from 10 days ago..." ❌
        → User is confused: "What Python error?"
```

### **With Session Expiry (24 hours):**
```
Day 1, 10:00 AM:  User Lucky: "I need Python help"
                  → Session: abc123 (expires Day 2, 10:00 AM)
                  
Day 1, 3:00 PM:   Same user: "What was my issue?"
                  → Still Session: abc123 (not expired yet)
                  → Bot: "Your Python error from earlier" ✅
                  
Day 3, 10:00 AM:  Same user returns
                  → Session expired! New session: xyz789
                  → Bot: "Hi! How can I help you?" ✅ Fresh start!
```

---

## ✅ How Our Session System Works

### **1. Session Creation**

When user first opens chat:
```javascript
Session ID: session-1730123456-abc123xyz
Expiry Time: 24 hours from now (86400000 milliseconds)

Saved in Browser localStorage:
- chat_session_id: "session-1730123456-abc123xyz"
- chat_session_expiry: "1730209856000" (timestamp)
```

### **2. Session Validation**

Every time user sends a message:
```javascript
1. Check if session exists in localStorage ✅
2. Check if expiry time exists ✅
3. Compare current time vs expiry time
   - If now < expiry → Use existing session ✅
   - If now >= expiry → Create new session 🔄
```

### **3. Session in MongoDB**

Each session has its own conversation:
```json
{
  "sessionId": "session-1730123456-abc123xyz",
  "messages": [
    { "role": "user", "content": "I need Python help" },
    { "role": "assistant", "content": "What Python error?" }
  ],
  "lastUpdated": "2025-10-28T10:00:00.000Z"
}
```

After 24 hours, **new session created** → **new conversation** in MongoDB!

---

## ⚙️ Configuration Options

### **Change Expiry Time**

In `components/support-chat.tsx`:

```javascript
const EXPIRY_HOURS = 24; // Change this number!
```

**Common Options:**
- `1` hour - Very short memory (for sensitive support)
- `6` hours - Half day (good for business hours)
- `24` hours - Full day (recommended for most use cases)
- `72` hours - 3 days (for ongoing complex issues)
- `168` hours - 1 week (for long-term projects)

**Choose based on your needs:**
- **Technical Support**: 24-48 hours (issues take time to resolve)
- **Sales Chat**: 6-12 hours (short inquiry window)
- **General FAQ**: 1-2 hours (quick questions)

---

## 🔄 Manual "New Conversation" Button

Users can also **manually start fresh** anytime!

### **How It Works:**

1. User clicks **🔄 Refresh icon** in chat header
2. System:
   - Deletes current session from localStorage
   - Creates brand new session ID
   - Clears all messages in chat window
   - Shows welcome message
3. Next message goes to new session in MongoDB

**Use Cases:**
- User wants to ask about different topic
- Previous conversation got off track
- User wants privacy (start fresh)
- Testing/debugging

---

## 📊 Session Lifecycle Example

### **Complete User Journey:**

```
Day 1, Monday 9:00 AM - First Visit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User opens chat
→ Creates: session-mon-123
→ Expires: Tuesday 9:00 AM

User: "How do I install CodaiPro?"
Bot: "Here's how to install..."

User closes browser
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Day 1, Monday 2:00 PM - Returns Same Day
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User opens chat
→ Checks: session-mon-123 still valid ✅
→ Loads: Previous conversation

User: "I got an error during install"
Bot: "What error did you see during installation?"
      ↑ Remembers context from morning!

User closes browser
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Day 3, Wednesday 10:00 AM - Returns After 2 Days
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User opens chat
→ Checks: session-mon-123 expired! ❌
→ Creates: session-wed-456 (new!)
→ Expires: Thursday 10:00 AM

User: "How do I use the debugger?"
Bot: "Hi! Here's how to use the debugger..."
      ↑ Fresh conversation, no memory of install issue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔐 Privacy & Data Management

### **What Gets Stored:**

**In User's Browser (localStorage):**
- Session ID
- Expiry timestamp
- ✅ Cleared when: Session expires, user clears browser data, or clicks "New Conversation"

**In MongoDB (Server):**
- Session ID
- Full conversation history
- Last updated timestamp
- ⚠️ Never automatically deleted (unless you add cleanup)

### **Best Practices:**

1. **Add MongoDB Cleanup** (Recommended)
   - Delete conversations older than 30 days
   - Protects user privacy
   - Saves database space
   - See section below ⬇️

2. **GDPR Compliance**
   - Add "Delete My Data" button
   - Provide data export option
   - Document data retention policy

---

## 🗑️ MongoDB Cleanup (Recommended)

### **Option A: N8N Cron Job (Easy)**

Create separate N8N workflow:

```
Cron Node (runs daily at 3 AM)
    ↓
MongoDB - Delete Many
    Collection: conversations
    Query: {
      "lastUpdated": {
        "$lt": "{{ $now.minus({ days: 30 }).toISO() }}"
      }
    }
```

This deletes conversations older than 30 days automatically!

### **Option B: MongoDB TTL Index (Automatic)**

In MongoDB Atlas:

1. Go to **Collections** → `conversations`
2. **Indexes** → **Create Index**
3. Field: `lastUpdated`
4. **TTL**: `2592000` seconds (30 days)

MongoDB automatically deletes old documents! ✨

---

## 🎛️ Advanced: User-Specific Sessions

### **Current System:**
- Session based on browser only
- Same user, different browsers = different sessions
- Same browser, different users = same session ❌

### **Better: Combine with Authentication**

If you have user login (you do - Appwrite!):

```javascript
const getSessionId = () => {
  const user = getCurrentUser(); // From your auth system
  
  if (user) {
    // Logged-in users: session based on user ID
    return `session-${user.$id}-${Date.now()}`;
  } else {
    // Anonymous users: session based on browser
    return `session-anon-${Date.now()}-${random()}`;
  }
};
```

**Benefits:**
- User's conversations follow them across devices
- Better customer support (see all user's past issues)
- Personalized experience

---

## 📈 Session Analytics

Track useful metrics in MongoDB:

```json
{
  "sessionId": "session-123",
  "messages": [...],
  "metadata": {
    "startTime": "2025-10-28T10:00:00Z",
    "endTime": "2025-10-28T10:15:00Z",
    "messageCount": 5,
    "resolved": true,
    "satisfaction": "positive"
  }
}
```

**Analytics You Can Track:**
- Average conversation length
- Most common questions
- Resolution rate
- Time to resolution
- User satisfaction

---

## 🐛 Troubleshooting

### **Issue: Session expires too quickly**
**Solution:** Increase `EXPIRY_HOURS` in support-chat.tsx

### **Issue: Session never expires**
**Solution:** Check localStorage has `chat_session_expiry` - if missing, clear localStorage and reload

### **Issue: Different browsers show same conversation**
**Solution:** This is normal! Each browser = unique session. To share across browsers, implement user-based sessions.

### **Issue: User loses conversation mid-chat**
**Solution:** Session expired while chatting! Increase `EXPIRY_HOURS` or implement "extend session on activity"

### **Issue: Too many old conversations in MongoDB**
**Solution:** Implement MongoDB cleanup (TTL index or cron job)

---

## ✅ Current Implementation Summary

**Your chat now has:**

✅ **24-hour session expiry**
- Sessions automatically expire after 24 hours
- New session created when expired
- Fresh conversation for returning users

✅ **Manual "New Conversation" button**
- Users can start fresh anytime
- Clears current session
- Creates new session ID

✅ **Session persistence**
- Sessions survive browser close/reopen
- Same session within 24 hours
- Conversations continue naturally

✅ **Isolated user conversations**
- Each session ID = separate conversation
- No mixing between users
- Privacy protected

---

## 🚀 Recommended Next Steps

1. **Test the expiry system:**
   ```javascript
   // In browser console:
   localStorage.getItem('chat_session_expiry')
   // Should show timestamp 24 hours in future
   ```

2. **Set up MongoDB cleanup:**
   - Add TTL index for automatic deletion
   - Or create cron job workflow

3. **Monitor session analytics:**
   - How long do conversations last?
   - How many messages per session?
   - Adjust expiry time based on data

4. **Consider user-based sessions:**
   - Link sessions to Appwrite user accounts
   - Conversations follow users across devices

---

## 📝 Quick Reference

**Session Duration:** 24 hours (configurable)

**Storage Locations:**
- Browser: `localStorage` (session ID + expiry)
- Server: MongoDB (full conversation)

**Manual Reset:** Click 🔄 button in chat header

**Automatic Expiry:** After 24 hours of inactivity

**Privacy:** Implement MongoDB cleanup for old conversations

---

Need to adjust session behavior? Just change `EXPIRY_HOURS` in `support-chat.tsx`!
