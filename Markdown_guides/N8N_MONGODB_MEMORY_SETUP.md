# N8N MongoDB Memory Setup Guide

## 🎯 Problem We're Solving

**Without Session-Based Memory:**
```
User 1 (Lucky): "My name is Lucky, I have a Python error"
Bot: "Hi Lucky! What's the Python error?"

User 2 (John): "How do I install?"
Bot: "Hi Lucky! To fix your Python error..." ❌ WRONG!
```

**With Session-Based Memory (MongoDB):**
```
User 1 (Lucky) → Session: abc123 → "Lucky has Python error"
User 2 (John)  → Session: xyz789 → "John wants install help"
```

Each user gets their **own isolated conversation**! ✅

---

## 📦 What You'll Need

1. **MongoDB Atlas Account** (Free tier - 512MB)
2. **N8N Workflow** (you already have this)
3. **Updated Website Code** (already done! ✅)

---

## Step 1: Create MongoDB Atlas Account

### 1.1 Sign Up

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose **FREE** tier (M0 Sandbox)

### 1.2 Create Cluster

1. Click **"Build a Database"**
2. Choose **FREE** (M0)
3. Select **Cloud Provider**: AWS
4. Select **Region**: Closest to you
5. Cluster Name: `codai-chat`
6. Click **"Create"**

### 1.3 Create Database User

1. **Security → Database Access**
2. Click **"Add New Database User"**
3. **Username**: `n8n_chat`
4. **Password**: Generate strong password (save it!)
5. **Database User Privileges**: `Read and write to any database`
6. Click **"Add User"**

### 1.4 Allow Network Access

1. **Security → Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access From Anywhere"** (0.0.0.0/0)
   - Or add your N8N server IP for better security
4. Click **"Confirm"**

### 1.5 Get Connection String

1. **Deployment → Database**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://n8n_chat:<password>@codai-chat.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with your actual password

---

## Step 2: Configure MongoDB in N8N

### 2.1 Add MongoDB Credentials

1. Open N8N: https://n8n.rankllms.com
2. Go to **Settings → Credentials**
3. Click **"Add Credential"**
4. Search for **"MongoDB"**
5. Fill in:
   - **Name**: `CodaiPro Chat MongoDB`
   - **User**: `n8n_chat`
   - **Password**: Your password
   - **Database**: `codai_chat`
   - **Connection String**: (paste from step 1.5)
6. Click **"Save"**

---

## Step 3: Create N8N Workflow with MongoDB Memory

### 3.1 Delete Simple Memory Node

1. Open your chat workflow
2. **Delete** the "Simple Memory" node
3. **Save** the workflow

### 3.2 Workflow Structure

```
When chat message received
    ↓
MongoDB - Get conversation history (by sessionId)
    ↓
Code - Format history for AI
    ↓
AI Agent (with conversation context)
    ↓
MongoDB - Save new messages
    ↓
Return response (automatic)
```

### 3.3 Add MongoDB Get Node

1. **Add Node** → Search **"MongoDB"**
2. Choose **"MongoDB"** node
3. **Operation**: `Find`
4. **Collection**: `conversations`
5. **Query (JSON)**:
   ```json
   {
     "sessionId": "{{ $json.sessionId }}"
   }
   ```
6. **Limit**: `1`
7. **Options → Sort**: 
   ```json
   { "lastUpdated": -1 }
   ```

### 3.4 Add Code Node (Format History)

1. **Add Node** → Search **"Code"**
2. **JavaScript Code**:

```javascript
// Get the MongoDB result
const mongoResult = $input.first().json;

// Get the current message
const currentMessage = $('When chat message received').item.json.message;
const sessionId = $('When chat message received').item.json.sessionId;

// Initialize conversation history
let conversationHistory = [];

// If conversation exists, get the messages
if (mongoResult && mongoResult.messages) {
  conversationHistory = mongoResult.messages;
}

// Add current user message to history
conversationHistory.push({
  role: 'user',
  content: currentMessage
});

// Format for AI Agent (last 10 messages to avoid token limit)
const recentHistory = conversationHistory.slice(-10);

// Create context string for AI
const contextString = recentHistory
  .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
  .join('\n');

return {
  json: {
    sessionId: sessionId,
    currentMessage: currentMessage,
    conversationHistory: conversationHistory,
    contextForAI: contextString,
    messageCount: conversationHistory.length
  }
};
```

### 3.5 Update AI Agent Node

1. Click on **"AI Agent"** node
2. In the **System Message** or **Prompt**, add:
   ```
   You are a helpful CodaiPro support assistant.
   
   Previous conversation:
   {{ $json.contextForAI }}
   
   Current user message: {{ $json.currentMessage }}
   
   Respond helpfully and remember the context of this conversation.
   ```

### 3.6 Add MongoDB Save Node

1. **Add Node** → **"MongoDB"** (after AI Agent)
2. **Operation**: `Update`
3. **Collection**: `conversations`
4. **Update Key**: `sessionId`
5. **Fields to Update (JSON)**:

```json
{
  "sessionId": "={{ $('Code').item.json.sessionId }}",
  "messages": "={{ $('Code').item.json.conversationHistory.concat([{ role: 'assistant', content: $json.output }]) }}",
  "lastUpdated": "={{ new Date().toISOString() }}"
}
```

6. **Options**:
   - ✅ **Upsert**: `true` (create if doesn't exist)

---

## Step 4: MongoDB Collection Structure

Your MongoDB will store conversations like this:

```json
{
  "_id": "ObjectId('...')",
  "sessionId": "session-1234567890-abc123",
  "messages": [
    {
      "role": "user",
      "content": "Hi, my name is Lucky"
    },
    {
      "role": "assistant",
      "content": "Hi Lucky! How can I help you with CodaiPro?"
    },
    {
      "role": "user",
      "content": "I have a Python error"
    },
    {
      "role": "assistant",
      "content": "What's the Python error, Lucky?"
    }
  ],
  "lastUpdated": "2025-10-28T12:34:56.789Z"
}
```

### Index for Performance

In MongoDB Atlas:
1. Go to **Collections**
2. Select `codai_chat` database → `conversations` collection
3. Click **"Indexes"** tab
4. Click **"Create Index"**
5. Field: `sessionId`, Type: `1 (ascending)`
6. **Unique**: ✅ (each session is unique)

---

## Step 5: Test the System

### 5.1 Test from Website

1. **Restart your dev server**: `npm run dev`
2. **Open website** in **Browser 1** (or regular window)
3. **Open support chat**, type: `"Hi, my name is Lucky"`
4. Bot should respond: `"Hi Lucky! How can I help you?"`
5. Type: `"What's my name?"`
6. Bot should respond: `"Your name is Lucky!"` ✅

### 5.2 Test Different User

1. **Open website** in **Browser 2** (or incognito window)
2. **Open support chat**, type: `"Hi, I'm John"`
3. Bot should respond: `"Hi John! How can I help you?"`
4. Type: `"What's my name?"`
5. Bot should respond: `"Your name is John!"` ✅

**Not "Lucky"!** Each user has separate memory! 🎉

### 5.3 Verify in MongoDB

1. Go to **MongoDB Atlas**
2. **Browse Collections** → `codai_chat` → `conversations`
3. You should see **2 documents** (one for each session)
4. Each has different `sessionId` and different `messages`

---

## 🔧 Simplified N8N Workflow (Alternative)

If the above is too complex, here's a simpler version:

### Simple Version Workflow:

```
When chat message received
    ↓
MongoDB Find (get conversation by sessionId)
    ↓
[Skip if no history] → MongoDB Insert (create new conversation)
    ↓
AI Agent (using chat history)
    ↓
MongoDB Update (add new message to history)
```

### Using N8N's Chat Memory Feature:

Instead of manual MongoDB nodes, N8N Chat webhooks have built-in memory:

1. Click **"When chat message received"** node
2. In **Options** → Enable **"Use Message History"**
3. **Store**: Choose **"MongoDB"**
4. **Connection**: Select your MongoDB credentials
5. **Collection**: `chat_conversations`
6. **Session ID Field**: `{{ $json.sessionId }}`

This automatically handles all the MongoDB operations! ✨

---

## 📊 MongoDB Free Tier Limits

- **Storage**: 512 MB (≈ 50,000 conversations)
- **Connections**: 100 concurrent
- **Backups**: Not included (manual export recommended)

For most support chats, this is **more than enough**!

---

## 🐛 Troubleshooting

### Issue: "Connection timeout"
**Solution**: Check Network Access in MongoDB Atlas - allow your N8N server IP

### Issue: "Authentication failed"
**Solution**: Verify username/password in N8N credentials match MongoDB user

### Issue: "Collection not found"
**Solution**: MongoDB auto-creates collections on first write - wait for first message

### Issue: "Session not persisting"
**Solution**: Check browser console - session ID should be saved in localStorage

### Issue: "All users see same conversation"
**Solution**: 
1. Check website is sending `sessionId` in request
2. Verify N8N uses `{{ $json.sessionId }}` in MongoDB query
3. Clear browser localStorage and test again

---

## 🎯 Expected Behavior

1. **User opens chat** → Website creates unique session ID → Saves in browser
2. **User sends message** → Website sends `{ message, sessionId }` to N8N
3. **N8N receives** → Finds conversation by `sessionId` in MongoDB
4. **AI Agent** → Gets conversation history as context
5. **Response sent** → New message saved to MongoDB
6. **User returns later** → Same session ID → Continues same conversation!

---

## 🚀 Advanced: Clean Old Conversations

Add a **Cron Node** to delete old conversations:

### Daily Cleanup Workflow:

```
Cron (daily at 3 AM)
    ↓
MongoDB Delete Many
    Query: { "lastUpdated": { "$lt": "30 days ago" } }
```

This keeps your database clean and under the 512 MB limit!

---

## ✅ Benefits You Now Have

✅ **Isolated conversations** - Each user has their own memory
✅ **Context-aware responses** - Bot remembers what each user said
✅ **Multi-turn problem solving** - Can guide users through complex issues
✅ **Analytics ready** - Can analyze common questions per user
✅ **Scalable** - Works for thousands of concurrent users
✅ **Persistent** - Conversations survive server restarts

---

## 📝 Quick Reference

**Website sends:**
```json
{
  "message": "user's message",
  "sessionId": "session-1234567890-abc123"
}
```

**MongoDB stores:**
```json
{
  "sessionId": "session-1234567890-abc123",
  "messages": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ],
  "lastUpdated": "2025-10-28T..."
}
```

**N8N queries:**
```json
{ "sessionId": "{{ $json.sessionId }}" }
```

---

Need help? Check the N8N execution logs and MongoDB Atlas logs for debugging!
