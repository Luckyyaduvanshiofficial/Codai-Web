# Chat API Setup Guide

## Security Note
The API key is now securely stored in environment variables on the server-side, not exposed in client code.

## Setup Instructions

### 1. Get Your SambaNova API Key
1. Visit [SambaNova Cloud](https://cloud.sambanova.ai/)
2. Sign up or log in
3. Navigate to API Keys section
4. Generate a new API key

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your API key to `.env.local`:
   ```env
   SAMBANOVA_API_KEY=your_actual_api_key_here
   ```

3. **Important**: Never commit `.env.local` to version control!

### 3. Restart Development Server
After adding the environment variable, restart your dev server:
```bash
npm run dev
```

## API Route Details

### Endpoint
`POST /api/chat`

### Request Body
```json
{
  "messages": [
    {
      "role": "system" | "user" | "assistant",
      "content": "message content"
    }
  ]
}
```

### Response
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "AI response"
      }
    }
  ]
}
```

### Error Responses
- `400`: Invalid request (missing messages array)
- `500`: Server error or AI service error

## Features

### Security
- ✅ API key stored in environment variables (server-side only)
- ✅ Never exposed to client-side code
- ✅ Request/response validation
- ✅ Error handling and logging

### Reliability
- ✅ 30-second timeout on requests
- ✅ Abort controller for cancellation
- ✅ Response structure validation
- ✅ Detailed error messages

### User Experience
- ✅ Loading states
- ✅ Error feedback
- ✅ Clipboard copy with fallback
- ✅ Enhanced markdown code block parsing

## Troubleshooting

### "AI service is not configured"
- Make sure `SAMBANOVA_API_KEY` is set in `.env.local`
- Restart your development server

### "Request timed out"
- The AI service might be slow or down
- Try again in a moment
- Check your internet connection

### Clipboard copy not working
- The code uses a fallback method if the Clipboard API fails
- Check browser console for specific errors

## Production Deployment

### Vercel
Add environment variable in project settings:
```
SAMBANOVA_API_KEY=your_key
```

### Other Platforms
Ensure `SAMBANOVA_API_KEY` is set in your hosting platform's environment variables section.

## Best Practices

1. **Never commit API keys** - Always use `.env.local` for local development
2. **Rotate keys regularly** - Generate new keys periodically for security
3. **Monitor usage** - Check your SambaNova dashboard for API usage
4. **Rate limiting** - Consider implementing rate limiting for production
5. **Error logging** - Monitor server logs for API errors

## Support

If you encounter issues:
1. Check the browser console for client-side errors
2. Check server logs for API errors
3. Verify your API key is valid and active
4. Open an issue on GitHub with error details
