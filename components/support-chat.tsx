'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
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
  return `msg-${Date.now()}-${messageIdCounter}-${Math.random().toString(36).substr(2, 9)}`;
};

export function SupportChat() {
  // Get webhook URL from environment variable - must be at top level
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';
  
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
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: data.response || data.message || 'Thank you for your message. Our team will get back to you shortly!',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setHasUnread(true); // Set unread when receiving response
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us at support@codai.pro',
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, webhookUrl]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

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
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
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
