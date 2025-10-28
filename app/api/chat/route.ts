import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    // Validate messages array is not empty
    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array cannot be empty' },
        { status: 400 }
      );
    }

    // Sanitize and validate each message
    const sanitizedMessages = messages.map((msg: any) => {
      if (!msg || typeof msg !== 'object') {
        throw new Error('Invalid message format');
      }
      
      if (!msg.role || typeof msg.role !== 'string') {
        throw new Error('Invalid message role');
      }
      
      if (!msg.content || typeof msg.content !== 'string') {
        throw new Error('Invalid message content');
      }
      
      // Sanitize content - remove potential XSS/injection attempts
      const sanitizedContent = msg.content
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .substring(0, 10000); // Limit length to prevent abuse
      
      return {
        role: ['user', 'assistant', 'system'].includes(msg.role) ? msg.role : 'user',
        content: sanitizedContent,
      };
    });

    // Get API key from environment variable (SECURE)
    const apiKey = process.env.SAMBANOVA_API_KEY;
    
    if (!apiKey) {
      console.error('SAMBANOVA_API_KEY is not configured');
      
      // Return 503 Service Unavailable for missing configuration
      const userMessage = sanitizedMessages[sanitizedMessages.length - 1];
      const demoResponse = {
        choices: [{
          message: {
            role: 'assistant',
            content: `## 🚀 CodaiPro Try Now - Demo Mode

Thank you for trying CodaiPro! This is a **demo version** running without AI backend configuration.

### 📥 Get the Full Experience

To use the complete AI-powered coding assistant, you have two options:

#### Option 1: Download Desktop App (Recommended)
- **100% Offline** - Works without internet
- Full AI model included
- No API keys required
- Perfect for lab exams and restricted networks

👉 [Download CodaiPro Desktop](/downloads)

#### Option 2: Configure API Key
Website administrators can enable the online version by adding a \`SAMBANOVA_API_KEY\` to environment variables.

### 💡 Your Question
> ${userMessage.content}

For answers to coding questions, debugging help, and code generation, please download the desktop app!

### ✨ Why Choose CodaiPro Desktop?
- 🔒 **100% Private** - Code never leaves your machine
- ⚡ **Lightning Fast** - No API latency
- 📚 **Multi-Language Support** - Python, Java, C++, JavaScript, and more
- 🎓 **Student Friendly** - Free forever for students
`
          }
        }],
        model: 'demo-mode',
        created: Date.now(),
      };
      
      return NextResponse.json(demoResponse, { status: 503 }); // 503 Service Unavailable
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch('https://api.sambanova.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stream: false,
          model: 'Meta-Llama-3.1-8B-Instruct',
          messages: sanitizedMessages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('SambaNova API error:', response.status, errorText);
        return NextResponse.json(
          { error: `AI service error: ${response.statusText}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data || !data.choices || !data.choices[0]) {
        return NextResponse.json(
          { error: 'Invalid response from AI service' },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout: AI service took too long to respond' },
          { status: 504 }
        );
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
