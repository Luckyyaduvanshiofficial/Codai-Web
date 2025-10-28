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

    // Get API key from environment variable (SECURE)
    const apiKey = process.env.SAMBANOVA_API_KEY;
    
    if (!apiKey) {
      console.error('SAMBANOVA_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
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
          messages,
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
