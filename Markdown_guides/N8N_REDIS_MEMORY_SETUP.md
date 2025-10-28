# N8N Redis Memory Setup Guide (10-Minute Sessions)

## 🎯 Why Redis for 10-Minute Sessions?

✅ **Fast** - In-memory storage, super quick responses
✅ **Auto-expiry** - Built-in TTL (Time To Live), data auto-deletes
✅ **Privacy-first** - No permanent storage, conversations disappear
✅ **Simple** - Easier than MongoDB for short-term memory
✅ **Free tier** - Upstash Redis gives 10,000 commands/day free

---

## 📦 Step 1: Create Free Redis Database (Upstash)

### 1.1 Sign Up for Upstash

1. Go to: https://upstash.com/
2. Click **"Get Started"**
3. Sign up with **GitHub** or **Email**
4. Choose **Free tier** (no credit card needed!)

### 1.2 Create Redis Database

1. Click **"Create Database"**
2. **Name**: `codai-chat-memory`
3. **Type**: `Regional` (faster)
4. **Region**: Choose closest to your N8N server
5. **Eviction**: `allkeys-lru` (auto-remove old data)
6. Click **"Create"**

### 1.3 Get Connection Details

After creating, you'll see:

```
Endpoint: https://usw1-xxxxx.upstash.io
Port: 6379
Password: AXXXXXXXXxxxxxx
```

**Important:** Copy these! You'll need them for N8N.

---

## 📋 Step 2: Configure Redis in N8N

### 2.1 Add Redis Credentials

1. Open N8N: https://n8n.rankllms.com
2. Go to **Settings → Credentials**
3. Click **"Add Credential"**
4. Search for **"Redis"**
5. Fill in:
   - **Name**: `CodaiPro Chat Redis`
   - **Host**: `usw1-xxxxx.upstash.io` (from Upstash)
   - **Port**: `6379`
   - **Password**: Your Upstash password
   - **Database**: `0`
   - **SSL**: ✅ **Enable** (Upstash uses SSL)
6. Click **"Test"** to verify connection
7. Click **"Save"**

---

## 🔧 Step 3: Update N8N Workflow for Redis

### 3.1 Remove Simple Memory Node

1. Open your chat workflow
2. **Delete** the "Simple Memory" node
3. **Save** the workflow

### 3.2 Workflow Structure

```
When chat message received
    ↓
Redis GET (get conversation history)
    ↓
Code (format history for AI)
    ↓
AI Agent (with context)
    ↓
Redis SET (save updated conversation with 10-min expiry)
    ↓
Response (automatic)
```

---

## 🛠️ Step 4: Build the Workflow

### 4.1 Add Redis GET Node

1. **Add Node** → Search **"Redis"**
2. Select **"Redis"** node
3. Configure:
   - **Credentials**: Select `CodaiPro Chat Redis`
   - **Operation**: `Get`
   - **Key**: `chat:{{ $json.sessionId }}`
   - **Get Value as**: `String`

This retrieves the conversation for this session!

### 4.2 Add Code Node (Parse & Format)

1. **Add Node** → Search **"Code"**
2. **JavaScript Code**:

```javascript
// Get inputs
const redisData = $input.first().json;
const sessionId = $('When chat message received').item.json.sessionId;
const currentMessage = $('When chat message received').item.json.message;

// Parse existing conversation (if exists)
let conversation = [];
if (redisData.value) {
  try {
    conversation = JSON.parse(redisData.value);
  } catch (e) {
    console.log('No previous conversation or parse error');
    conversation = [];
  }
}

// Add current user message
conversation.push({
  role: 'user',
  content: currentMessage,
  timestamp: new Date().toISOString()
});

// Format for AI (last 5 messages to keep it lightweight)
const recentHistory = conversation.slice(-5);

// Create context string
const contextString = recentHistory
  .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
  .join('\n');

return {
  json: {
    sessionId: sessionId,
    currentMessage: currentMessage,
    conversation: conversation,
    contextForAI: contextString
  }
};
```

### 4.3 Update AI Agent

1. Click **"AI Agent"** node
2. In the **System Prompt**, add:

```
You are a helpful CodaiPro support assistant.

Recent conversation:
{{ $json.contextForAI }}

Current message: {{ $json.currentMessage }}

Respond helpfully. Keep answers concise and focused.
```

### 4.4 Add Redis SET Node (Save Response)

1. **Add Node** → **"Redis"** (after AI Agent)
2. Configure:
   - **Credentials**: `CodaiPro Chat Redis`
   - **Operation**: `Set`
   - **Key**: `chat:{{ $('Code').item.json.sessionId }}`
   - **Value**: 

```javascript
{{ JSON.stringify($('Code').item.json.conversation.concat([{
  role: 'assistant',
  content: $json.output,
  timestamp: new Date().toISOString()
}])) }}
```

   - **Expire**: ✅ **Enable**
   - **Expire After**: `600` (10 minutes in seconds)

This saves the conversation and **auto-deletes after 10 minutes**!

---

## 📊 How Redis Stores Data

### **Key Format:**
```
chat:session-1730123456-abc123xyz
```

### **Value (JSON String):**
```json
[
  {
    "role": "user",
    "content": "How do I install CodaiPro?",
    "timestamp": "2025-10-28T10:00:00.000Z"
  },
  {
    "role": "assistant",
    "content": "Here's how to install CodaiPro...",
    "timestamp": "2025-10-28T10:00:05.000Z"
  },
  {
    "role": "user",
    "content": "I got an error",
    "timestamp": "2025-10-28T10:01:00.000Z"
  },
  {
    "role": "assistant",
    "content": "What error did you see?",
    "timestamp": "2025-10-28T10:01:03.000Z"
  }
]
```

### **TTL (Time To Live):**
```
600 seconds (10 minutes)
```

After 10 minutes, Redis **automatically deletes** the key! No manual cleanup needed! 🎉

---

## 🧪 Step 5: Test the System

### 5.1 Test Basic Chat

1. **Restart dev server**: `npm run dev`
2. **Open website**, open chat
3. Type: `"Hi, my name is Lucky"`
4. Bot should respond

### 5.2 Test Memory (Within 10 Minutes)

1. Type: `"What's my name?"`
2. Bot should respond: `"Your name is Lucky!"` ✅

### 5.3 Test Expiry (After 10 Minutes)

1. **Wait 10 minutes** (or change expiry to 60 seconds for testing)
2. Type: `"What's my name?"`
3. Bot should respond: `"I don't have your name yet"` ✅
4. New conversation started!

### 5.4 Test Different Users

1. **Browser 1**: "My name is Lucky"
2. **Browser 2** (incognito): "My name is John"
3. Each should remember their **own name** only!

### 5.5 Verify in Upstash Dashboard

1. Go to Upstash dashboard
2. Click on your database
3. Go to **"Data Browser"**
4. You should see keys like: `chat:session-xxxxx`
5. After 10 minutes, keys disappear automatically!

---

## 🔥 Advanced: Simple N8N Chat Memory

Even **easier** option - N8N has built-in chat memory!

### Use N8N's Built-in Memory:

1. Click **"When chat message received"** node
2. In **Options**:
   - ✅ **Enable Memory**
   - **Memory Type**: `Redis`
   - **Redis Credentials**: Select your Redis credentials
   - **Session ID**: `{{ $json.sessionId }}`
   - **TTL**: `600` (10 minutes)

That's it! N8N handles everything automatically! 🚀

---

## 📊 Comparison: Redis vs MongoDB

| Feature | Redis (10 min) | MongoDB (30 days) |
|---------|---------------|-------------------|
| **Speed** | ⚡⚡⚡ Ultra fast | ⚡ Fast |
| **Data Persistence** | 10 minutes only | Permanent |
| **Privacy** | ✅ Excellent (auto-delete) | ⚠️ Needs manual cleanup |
| **Setup** | 🟢 Easy | 🟡 Medium |
| **Analytics** | ❌ No (data deleted) | ✅ Yes |
| **Use Case** | Quick support | Long-term issues |
| **Free Tier** | 10k commands/day | 512 MB storage |
| **Best For** | Your use case! ✅ | Complex projects |

---

## 🎯 Why 10 Minutes is Perfect

✅ **Privacy-First**
- No long-term data collection
- Conversations auto-delete
- GDPR compliant by design

✅ **Right for Support Chat**
- Most support chats are 2-5 minutes
- 10 minutes covers follow-up questions
- Not so long that context gets stale

✅ **Resource Efficient**
- Redis uses minimal memory
- Auto-cleanup (no maintenance)
- Free tier is plenty

✅ **User Expectations**
- Users expect fresh start when they return later
- No confusion about old context
- Clear, focused conversations

---

## 🔧 Troubleshooting

### Issue: "Connection timeout" to Redis
**Solution:** 
- Check SSL is enabled in credentials
- Verify Upstash endpoint is correct
- Check N8N server can access internet

### Issue: "Memory not persisting between messages"
**Solution:**
- Verify Redis SET is after AI Agent
- Check TTL is set to 600 (not 60)
- Verify sessionId is same across messages (check browser console)

### Issue: "Too many commands" error
**Solution:**
- Upstash free tier: 10,000 commands/day
- Each chat uses ~4 commands (GET + SET per message)
- Supports ~2,500 messages/day
- If exceeded, upgrade to paid tier ($0.20/10k commands)

### Issue: "Data not expiring"
**Solution:**
- Verify "Expire" is enabled in Redis SET node
- Check "Expire After" is 600 (seconds, not minutes)
- In Upstash dashboard, check TTL on keys

---

## 🚀 Production Checklist

- [ ] Upstash Redis database created
- [ ] Redis credentials added to N8N
- [ ] N8N workflow updated with Redis nodes
- [ ] TTL set to 600 seconds (10 minutes)
- [ ] Website sends sessionId with messages
- [ ] Session expires after 10 minutes in browser
- [ ] Tested: Memory works within 10 min
- [ ] Tested: Memory clears after 10 min
- [ ] Tested: Different users get different sessions
- [ ] Verified: Keys auto-delete in Upstash

---

## 📝 Complete N8N Workflow Summary

```
1. When chat message received
   Input: { message, sessionId }
   ↓
2. Redis GET
   Key: chat:{{ sessionId }}
   Gets: Previous conversation (or empty)
   ↓
3. Code Node
   - Parse conversation from Redis
   - Add current message
   - Format for AI
   ↓
4. AI Agent
   System prompt includes conversation context
   Generates response
   ↓
5. Redis SET
   Key: chat:{{ sessionId }}
   Value: Updated conversation + AI response
   TTL: 600 seconds (auto-delete after 10 min)
   ↓
6. Response sent to user automatically
```

---

## 🎉 Benefits You Get

✅ **10-minute memory** - Perfect for support conversations
✅ **Auto-expiry** - No manual cleanup needed
✅ **Privacy-first** - Data automatically deleted
✅ **Fast** - Redis is in-memory, ultra quick
✅ **Free** - Upstash free tier is plenty
✅ **Simple** - Easier than MongoDB setup
✅ **Scalable** - Handles many concurrent users

---

## 📊 Expected Usage (Free Tier)

**Upstash Free Tier:** 10,000 commands/day

**Per conversation:**
- Initial message: 2 commands (GET + SET)
- Each reply: 2 commands (GET + SET)
- Average chat: 3-4 messages = ~8 commands

**Capacity:**
- ~1,250 conversations per day
- ~37,500 conversations per month
- More than enough for most use cases!

---

## 🔄 Quick Comparison

**Before (Simple Memory):**
```
❌ Limited testing only
❌ Errors in production
❌ All users shared memory
```

**Now (Redis with 10-min expiry):**
```
✅ Production ready
✅ Each user isolated
✅ Privacy-first design
✅ Auto-cleanup
✅ Fast & scalable
```

---

**Ready to set up?** Follow the steps above, and you'll have a privacy-first, fast chat with 10-minute memory! 🚀
