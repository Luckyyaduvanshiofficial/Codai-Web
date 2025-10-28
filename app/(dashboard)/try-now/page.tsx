'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Sparkles, Copy, Check, Mic, StopCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Floating symbols for background animation
const FloatingSymbol = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      className="absolute text-2xl sm:text-4xl opacity-10 pointer-events-none"
      initial={{ y: '100vh', x: Math.random() * 100 - 50 }}
      animate={{
        y: '-100vh',
        x: Math.random() * 100 - 50,
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
      style={{
        left: `${Math.random() * 100}%`,
      }}
    >
      {children}
    </motion.div>
  );
};

export default function TryNowPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [typingIntervalId, setTypingIntervalId] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToBottom = () => {
    // Only auto-scroll if user is near bottom
    const messagesContainer = messagesEndRef.current?.parentElement;
    if (messagesContainer) {
      const isNearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 100;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Only scroll on new messages, not while typing
    if (messages.length > 0 && !isTyping) {
      scrollToBottom();
    }
  }, [messages]);

  // Typing animation effect
  const typeMessage = (text: string, messageId: string) => {
    setIsTyping(true);
    setTypingText('');
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypingText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypingText('');
        setTypingIntervalId(null);
        
        // Add complete message to messages
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, content: text } : msg
          )
        );
      }
    }, 20); // Typing speed

    setTypingIntervalId(typingInterval);
  };

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalId) {
        clearInterval(typingIntervalId);
      }
    };
  }, [typingIntervalId]);

  useEffect(() => {
    // Only scroll on new messages, not while typing
    if (messages.length > 0 && !isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleStop = () => {
    // Stop API request if ongoing
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    
    // Stop typing animation
    if (typingIntervalId) {
      clearInterval(typingIntervalId);
      setTypingIntervalId(null);
    }
    
    // If there's typing text, add it as incomplete message
    if (typingText && isTyping) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant' && !lastMessage.content) {
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, content: typingText + '\n\n[Response stopped by user]' } : msg
          )
        );
      }
    }
    
    setIsTyping(false);
    setTypingText('');
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput('');
    setIsLoading(true);

    // Create abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are CodaiPro AI, an expert coding assistant. Help users with code generation, debugging, explanations, and best practices. Format your responses using proper markdown with headings (##), bold (**text**), code blocks (```), lists, etc. Make responses well-structured and easy to read.',
            },
            ...messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: 'user', content: userInput },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response from AI service');
      }
      
      const assistantContent = data.choices[0].message.content || 'Sorry, I could not generate a response.';

      // Don't create placeholder message - typing will show directly
      setIsLoading(false);
      setAbortController(null);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '', // Will be filled by typing animation
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      typeMessage(assistantContent, assistantMessage.id);
    } catch (error) {
      // Don't show error if request was aborted
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      
      console.error('Error:', error);
      
      // Provide helpful error messages
      let errorContent = 'Sorry, I encountered an error. ';
      if (error instanceof Error) {
        if (error.message.includes('AI service is not configured')) {
          errorContent = '⚠️ API configuration required. Please contact support or download the desktop app for offline access.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorContent = '🔌 Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('Invalid response')) {
          errorContent = '⚠️ Received invalid response from AI service. Please try again.';
        } else {
          errorContent += error.message;
        }
      } else {
        errorContent += 'Please try again or download our desktop app for offline access.';
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Prevent hydration errors by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center">
        <div className="flex gap-2">
          <motion.div 
            className="w-3 h-3 bg-[#2D7FF9] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="w-3 h-3 bg-[#2D7FF9] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="w-3 h-3 bg-[#2D7FF9] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="try-now-fullscreen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950">
      {/* Animated Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingSymbol delay={0}>&lt;/&gt;</FloatingSymbol>
        <FloatingSymbol delay={2}>{'{ }'}</FloatingSymbol>
        <FloatingSymbol delay={4}>( )</FloatingSymbol>
        <FloatingSymbol delay={1}>;</FloatingSymbol>
        <FloatingSymbol delay={3}>[ ]</FloatingSymbol>
        <FloatingSymbol delay={5}>=&gt;</FloatingSymbol>
      </div>

      {/* Main Chat Container - Full Height */}
      <div className="relative flex flex-col h-full">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-6">
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-4 sm:py-6"
              >
                {/* Pulsing Icon with Floating Effect */}
                <motion.div
                  className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED] opacity-30 blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  
                  {/* Icon Container with Breathing Animation */}
                  <motion.div
                    className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED] flex items-center justify-center shadow-2xl shadow-blue-500/50"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </motion.div>

                  {/* Orbiting Dots */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        rotate: 360,
                        x: [0, 35 * Math.cos((i * 120 * Math.PI) / 180)],
                        y: [0, 35 * Math.sin((i * 120 * Math.PI) / 180)],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Animated Gradient Heading */}
                <motion.h1
                  className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 px-4 bg-gradient-to-r from-[#2D7FF9] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent"
                  style={{
                    backgroundSize: '200% auto',
                    animation: 'gradient 3s linear infinite',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  How can I help you code today?
                </motion.h1>

                {/* Fade-in Subheading */}
                <motion.p
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Ask me anything about programming, debugging, or code explanations
                </motion.p>

                {/* Enhanced Prompt Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-3xl mx-auto px-2">
                  {[
                    { 
                      text: 'Write a Python function to reverse a string',
                      icon: '🐍',
                      color: 'from-blue-500 to-blue-600',
                      shadowColor: 'shadow-blue-500/20 hover:shadow-blue-500/40'
                    },
                    { 
                      text: 'Explain async/await in JavaScript',
                      icon: '⚡',
                      color: 'from-purple-500 to-purple-600',
                      shadowColor: 'shadow-purple-500/20 hover:shadow-purple-500/40'
                    },
                    { 
                      text: 'Create a REST API with Express.js',
                      icon: '🚀',
                      color: 'from-green-500 to-green-600',
                      shadowColor: 'shadow-green-500/20 hover:shadow-green-500/40'
                    },
                    { 
                      text: 'Help me debug this code error',
                      icon: '🐛',
                      color: 'from-orange-500 to-orange-600',
                      shadowColor: 'shadow-orange-500/20 hover:shadow-orange-500/40'
                    },
                  ].map((prompt, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInput(prompt.text)}
                      className={`group relative p-3 sm:p-4 text-left rounded-xl bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 ${prompt.shadowColor} shadow-lg overflow-hidden`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -4,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Colored Accent Border */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${prompt.color}`} />
                      
                      {/* Ripple Effect Container */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-950/20 dark:group-hover:to-purple-950/20 transition-all duration-300"
                      />

                      <div className="relative flex items-start gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl flex-shrink-0">{prompt.icon}</span>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {prompt.text}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {/* Typing Animation */}
            {isTyping && typingText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 mb-8"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <MessageContent content={typingText} />
                    <span className="inline-block w-1 h-4 bg-gradient-to-r from-[#2D7FF9] to-[#7C3AED] ml-1 animate-pulse"></span>
                  </div>
                </div>
              </motion.div>
            )}

            {isLoading && !isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 mb-8"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex gap-2 items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-[#2D7FF9] to-[#7C3AED] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-[#2D7FF9] to-[#7C3AED] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="w-2 h-2 bg-gradient-to-r from-[#2D7FF9] to-[#7C3AED] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Glassmorphism Chat Input */}
        <div className="relative border-t border-white/10 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <motion.div
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glow Effect on Focus */}
              {isFocused && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-end gap-3 p-4">
                  {/* Sparkle Icon */}
                  <div className="pb-2">
                    <Sparkles className="w-5 h-5 text-[#2D7FF9]" />
                  </div>

                  {/* Textarea */}
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="Ask me anything about coding..."
                      className="min-h-[50px] max-h-[150px] border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-end gap-2 pb-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Mic className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </motion.button>

                    {/* Show Stop button when loading or typing */}
                    {(isLoading || isTyping) ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleStop}
                          className="h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
                        >
                          <StopCircle className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleSend}
                          disabled={!input.trim()}
                          className="h-10 w-10 p-0 rounded-xl bg-gradient-to-r from-[#2D7FF9] to-[#7C3AED] hover:from-[#1F6FE8] hover:to-[#6B2DD4] shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        className="flex gap-4 mb-8 justify-end"
      >
        <div className="flex-1 max-w-3xl">
          <div className="bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED] rounded-2xl px-4 py-3 shadow-lg shadow-blue-500/20">
            <p className="text-sm sm:text-base text-white whitespace-pre-wrap break-words">{message.content}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-2 border-white dark:border-gray-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-4 mb-8"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D7FF9] to-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-200 dark:border-gray-700 shadow-lg">
          <MessageContent content={message.content} />
        </div>
      </div>
    </motion.div>
  );
}

function MessageContent({ content }: { content: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (code: string, index: number) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      timeoutRef.current = setTimeout(() => {
        setCopiedIndex(null);
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
        setCopiedIndex(index);
        timeoutRef.current = setTimeout(() => {
          setCopiedIndex(null);
          timeoutRef.current = null;
        }, 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
      document.body.removeChild(textarea);
    }
  };

  let codeBlockIndex = 0;

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const code = String(children).replace(/\n$/, '');
            const blockIndex = codeBlockIndex++;
            const inline = !className;

            if (!inline && code) {
              return (
                <div className="relative group my-4">
                  <div className="absolute right-2 top-2 z-10">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(code, blockIndex)}
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800/80 hover:bg-gray-700/80 text-white"
                    >
                      {copiedIndex === blockIndex ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-[#1e293b]">
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm text-gray-100 font-mono">
                        {code}
                      </code>
                    </pre>
                  </div>
                </div>
              );
            }

            return (
              <code className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-gray-700 dark:text-gray-300 my-2 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 my-2 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 my-2 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-gray-700 dark:text-gray-300">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
          ),
          hr: () => <hr className="my-3 border-gray-300 dark:border-gray-600" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-2">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
