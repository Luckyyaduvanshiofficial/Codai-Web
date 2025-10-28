'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Send, User, Bot, Loader2, Copy, Check, 
  Sparkles, Code, Terminal, X
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface CodeBlock {
  language: string;
  code: string;
}

function extractCodeBlocks(text: string): (string | CodeBlock)[] {
  const parts: (string | CodeBlock)[] = [];
  // Enhanced regex to handle code blocks with or without newlines after opening fence
  const codeBlockRegex = /```([\w-+#]*)\s*\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add code block
    parts.push({
      language: match[1] || 'code',
      code: match[2].trim(),
    });
    
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function CodeBlock({ language, code, index }: { language: string; code: string; index: number }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyCode = async () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
      // Fallback: create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
          timeoutRef.current = null;
        }, 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--gh-canvas-default)] border-b border-[var(--gh-border-default)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--gh-fg-muted)]" />
          <span className="text-sm font-mono text-[var(--gh-fg-muted)]">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyCode}
          className="h-8 px-3"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1 text-green-600" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-[var(--gh-fg-default)]">{code}</code>
      </pre>
    </div>
  );
}

function MessageContent({ content, role }: { content: string; role: string }) {
  const parts = extractCodeBlocks(content);

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return (
            <div 
              key={index} 
              className={`text-sm leading-relaxed whitespace-pre-wrap ${
                role === 'user' ? 'text-white' : 'text-[var(--gh-fg-default)]'
              }`}
            >
              {part}
            </div>
          );
        } else {
          return <CodeBlock key={index} {...part} index={index} />;
        }
      })}
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: '👋 Welcome! I\'m CodaiPro AI - your intelligent coding assistant. I can help you write code, debug errors, explain concepts, and optimize your solutions. What would you like to build today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are CodaiPro, an expert coding assistant. Help users write, debug, and understand code. Always format code in proper markdown code blocks with language tags (```python, ```javascript, etc). Provide clear explanations. Be concise but thorough.',
            },
            ...messages
              .filter((m) => m.role !== 'system')
              .map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: input },
          ],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from AI service');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      let errorMsg = '⚠️ Oops! I encountered an error connecting to the AI service. Please try again in a moment!';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMsg = '⏱️ Request timed out. The AI service is taking too long to respond. Please try again.';
        } else if (error.message.includes('HTTP')) {
          errorMsg = `⚠️ Server error: ${error.message}. Please try again later.`;
        }
      }
      
      const errorMessage: Message = {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'system',
        content: '👋 Chat cleared! Ready for a fresh start. What would you like to code today?',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)] border-[var(--gh-border-default)] shadow-xl bg-[var(--gh-canvas-default)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--gh-canvas-default)]"></div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[var(--gh-fg-default)]">AI Code Assistant</h2>
            <p className="text-xs text-[var(--gh-fg-muted)]">Powered by Meta Llama 3.1</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            disabled={messages.length <= 1}
            className="text-[var(--gh-fg-muted)] hover:text-[var(--gh-fg-default)]"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[var(--gh-canvas-default)] to-[var(--gh-canvas-subtle)]">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {message.role === 'user' ? (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                ) : message.role === 'assistant' ? (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-[85%] ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block rounded-2xl px-5 py-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-green-500 to-teal-600 text-white shadow-lg'
                      : message.role === 'system'
                      ? 'bg-[var(--gh-accent-subtle)] border border-[var(--gh-accent-emphasis)] shadow-sm'
                      : 'bg-[var(--gh-canvas-subtle)] border border-[var(--gh-border-default)] shadow-sm'
                  }`}
                >
                  <MessageContent content={message.content} role={message.role} />
                </div>
                
                {/* Timestamp */}
                <div className={`mt-2 px-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs text-[var(--gh-fg-muted)]">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[var(--gh-canvas-subtle)] border border-[var(--gh-border-default)] shadow-sm">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-sm text-[var(--gh-fg-muted)]">
                CodaiPro is thinking...
              </span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)] p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about coding... (Shift+Enter for new line)"
              className="min-h-[60px] max-h-[200px] resize-none bg-[var(--gh-canvas-default)] border-[var(--gh-border-default)] focus:border-[var(--gh-accent-emphasis)] focus:ring-2 focus:ring-[var(--gh-accent-emphasis)]/20"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="lg"
            className="h-[60px] px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        {/* Tips */}
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--gh-fg-muted)]">
          <div className="flex items-center gap-1">
            <Code className="w-3 h-3" />
            <span>I can help with code, debugging, explanations, and more!</span>
          </div>
          <span>{input.length} characters</span>
        </div>
      </div>
    </Card>
  );
}
