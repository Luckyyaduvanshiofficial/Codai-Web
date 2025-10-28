'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Generate unique IDs using counter + timestamp to prevent collisions
let messageIdCounter = 0;
const generateMessageId = () => {
  messageIdCounter += 1;
  return `msg-${Date.now()}-${messageIdCounter}-${Math.random().toString(36).substring(2, 11)}`;
};

// Generate or get session ID for this user
const getSessionId = () => {
  // SSR safety check
  if (typeof window === 'undefined') return '';
  
  const EXPIRY_MINUTES = 10; // Session expires after 10 minutes
  
  try {
    // Check if session exists in localStorage
    const storedSession = localStorage.getItem('chat_session_id');
    const storedExpiry = localStorage.getItem('chat_session_expiry');
    
    // Check if session is still valid
    if (storedSession && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      const now = Date.now();
      
      // If not expired, return existing session
      if (now < expiryTime) {
        return storedSession;
      }
    }
    
    // Create new session ID with expiry
    const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const expiryTime = Date.now() + (EXPIRY_MINUTES * 60 * 1000); // Convert minutes to milliseconds
    
    localStorage.setItem('chat_session_id', newSessionId);
    localStorage.setItem('chat_session_expiry', expiryTime.toString());
    
    return newSessionId;
  } catch (error) {
    // Fallback if localStorage is not available
    return `session-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};

export function SupportChat() {
  // Get webhook URL from environment variable - must be at top level
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';
  
  // Get or create session ID for this user
  const [sessionId, setSessionId] = useState<string>('');
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateMessageId(),
      role: 'assistant',
      content: 'Hi! 👋 How can I help you with CodaiPro today?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // Track unread messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session ID on mount
  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Don't render if webhook URL is not configured
  if (!webhookUrl) {
    return null;
  }
  
  // Mark as read when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          sessionId: sessionId, // Add session ID to identify this user
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textData = await response.text();
        data = { output: textData };
      }
      
      // Try multiple possible response fields
      const assistantContent = 
        data.output || 
        data.response || 
        data.message || 
        data.text ||
        data.reply ||
        (typeof data === 'string' ? data : null) ||
        'Thank you for your message. Our team will get back to you shortly!';

      const assistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: assistantContent,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setHasUnread(true);
    } catch (error) {
      let errorContent = 'Sorry, I encountered an error. ';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorContent = '🔌 Connection error. Please check your internet connection or try again later.';
        } else if (error.message.includes('404')) {
          errorContent = '⚠️ Chat service is not available. Please email us at support@codai.pro';
        } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
          errorContent = '⚠️ Our chat service is temporarily unavailable. Please try again in a few moments or email support@codai.pro';
        } else {
          errorContent += `Error: ${error.message}. Please contact us at support@codai.pro`;
        }
      } else {
        errorContent += 'Please try again or contact us at support@codai.pro';
      }
      
      const errorMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: errorContent,
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, webhookUrl, sessionId]); // Add sessionId dependency

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Start a new conversation
  const startNewConversation = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear session from localStorage
      localStorage.removeItem('chat_session_id');
      localStorage.removeItem('chat_session_expiry');
      
      // Generate new session
      const newSessionId = getSessionId();
      setSessionId(newSessionId);
      
      // Reset messages
      setMessages([
        {
          id: generateMessageId(),
          role: 'assistant',
          content: 'Hi! 👋 How can I help you with CodaiPro today?',
          timestamp: Date.now(),
        },
      ]);
    } catch (error) {
      // Silently handle localStorage errors
    }
  }, []);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-[#0969da] to-[#4493f8] hover:from-[#0860ca] hover:to-[#368cf9] hover:shadow-blue-500/50 transition-all duration-300"
              aria-label="Open support chat"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            
            {/* Notification Badge - Only show if there are unread messages */}
            {hasUnread && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                aria-label="Unread messages"
              >
                •
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
            style={{
              width: isMinimized ? '320px' : '384px',
              height: isMinimized ? '60px' : '600px',
            }}
          >
            <Card className="h-full flex flex-col shadow-2xl border-[var(--gh-border-default)] overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0969da] to-[#4493f8] dark:from-[#4493f8] dark:to-[#1f7eea] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">CodaiPro Support</h3>
                    <p className="text-xs opacity-90">We're here to help!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={startNewConversation}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                    title="Start new conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--gh-canvas-subtle)]">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.role === 'user'
                              ? 'bg-gradient-to-r from-[#0969da] to-[#4493f8] text-white'
                              : 'bg-[var(--gh-canvas-default)] border border-[var(--gh-border-default)] text-[var(--gh-fg-default)]'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-[var(--gh-canvas-default)] border border-[var(--gh-border-default)] rounded-2xl px-4 py-2">
                          <div className="flex gap-1">
                            <motion.div
                              className="w-2 h-2 bg-[var(--gh-fg-muted)] rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-[var(--gh-fg-muted)] rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-[var(--gh-fg-muted)] rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-[var(--gh-canvas-default)] border-t border-[var(--gh-border-default)]">
                    <div className="flex items-end gap-2">
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="min-h-[44px] max-h-[100px] resize-none"
                        disabled={isLoading}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        size="icon"
                        className="h-[44px] w-[44px] flex-shrink-0 bg-gradient-to-r from-[#0969da] to-[#4493f8] hover:from-[#0860ca] hover:to-[#368cf9]"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
