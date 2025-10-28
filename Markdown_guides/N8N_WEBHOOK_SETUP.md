# N8N Webhook Setup Guide for Support Chat

## 📋 Current Setup from Your Screenshot

You have:
- **Webhook node** (for retrieval)
- **"When chat message received" node** ✅ (This is what you should use!)
- **AI Agent** connected to Azure GPT-5-MINI

## ✅ Recommended Setup: Use "When chat message received" Node

### Step 1: Get the Chat Webhook URL

1. **Open your N8N workflow**
2. **Click on the "When chat message received" node**
3. **Look for the webhook URL** - it should look like:
   ```
   https://n8n.rankllms.com/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat
   ```
4. **Copy this URL**

### Step 2: Configure in Your Website

1. **Open `.env.local`** in your project
2. **Add/Update this line:**
   ```env
   NEXT_PUBLIC_N8N_WEBHOOK_URL="https://n8n.rankllms.com/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat"
   ```
3. **Save the file**

### Step 3: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 4: Test the Chat

1. Open your website
2. Click the support chat button
3. Type "hi" and send
4. You should get a response from your AI Agent!

---

## 🔧 Alternative: Configure Regular Webhook Node

If you prefer to use the regular Webhook node instead:

### In N8N Webhook Node Settings:

1. **HTTP Method**: `POST` (change from GET)
2. **Path**: Keep your unique ID (`05299192-29ba-4575-9ffe-7a9cabba0e56`)
3. **Authentication**: `None`
4. **Respond**: `Immediately` or use "Respond to Webhook" node

### Expected Request Format:

The website will send:
```json
{
  "message": "user's message here",
  "sessionId": "session-1234567890-abc123"
}
```

**Important:** The `sessionId` identifies each unique user so conversations don't get mixed up!

### N8N Workflow Setup:

```
Webhook (POST)
    ↓
Extract message from body: {{ $json.chatInput }}
    ↓
AI Agent / OpenAI / etc.
    ↓
Respond to Webhook
    ↓
Return: { "output": "AI response here" }
```

### Example Webhook Response:

Your N8N workflow should return JSON like:
```json
{
  "output": "Hello! How can I help you with CodaiPro today?"
}
```

Or:
```json
{
  "response": "Your AI response here"
}
```

Or:
```json
{
  "message": "Your AI response here"
}
```

The website will accept any of these fields: `output`, `response`, `message`, `text`, or `reply`.

---

## 🐛 Troubleshooting

### Issue: "Sorry, I encountered an error"

**Check in Browser Console (F12):**

1. Look for logs starting with "Sending message to webhook:"
2. Check "Response status:" - should be `200`
3. Look for "Response data:" to see what N8N returned

**Common Issues:**

1. **404 Error**: Wrong webhook URL
   - Solution: Copy the exact URL from N8N workflow

2. **405 Error**: Method not allowed
   - Solution: Change webhook to accept POST requests

3. **CORS Error**: Cross-origin blocked
   - Solution: In N8N webhook settings, enable CORS
   - Or add response headers in N8N:
     ```
     Access-Control-Allow-Origin: *
     Access-Control-Allow-Methods: POST, OPTIONS
     ```

4. **500 Error**: N8N workflow failed
   - Solution: Check your N8N workflow execution
   - Make sure AI Agent is configured correctly

### Test Your Webhook Directly

Use curl or Postman to test:

```bash
curl -X POST https://n8n.rankllms.com/webhook/4091fa09-fb9a-4039-9411-7104d213f601/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "test message", "sessionId": "test-session-123"}'
```

Expected response:
```json
{
  "output": "AI response here"
}
```

---

## 📝 Quick Checklist

- [ ] N8N workflow is active (not paused)
- [ ] "When chat message received" node is connected to AI Agent
- [ ] Copied correct webhook URL from N8N
- [ ] Added URL to `.env.local` with `NEXT_PUBLIC_` prefix
- [ ] Restarted development server (`npm run dev`)
- [ ] Chat widget appears on website
- [ ] Browser console shows no CORS errors
- [ ] Webhook responds with valid JSON

---

## 🎯 Recommended N8N Workflow Structure

```
When chat message received (Chat Webhook)
    ↓
[Optional] Simple Memory (for context)
    ↓
AI Agent (Azure GPT-5-MINI)
    ↓
Query Data Tool (if needed)
    ↓
Response sent automatically
```

The "When chat message received" node **automatically handles the response**, so you don't need a separate "Respond to Webhook" node!

---

## ✨ Expected Behavior

1. User types message in chat widget
2. Website sends POST to N8N webhook
3. N8N processes through AI Agent
4. AI Agent returns response
5. Response appears in chat widget
6. Conversation continues!

---

Need help? Check:
- N8N workflow execution logs
- Browser developer console (F12 → Console tab)
- Network tab to see actual request/response
