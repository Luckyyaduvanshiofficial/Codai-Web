'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Code2, Zap, Shield, Github, Flame } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-white dark:bg-[#0d1117] overflow-hidden">
      {/* GitHub-style animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Subtle floating elements - GitHub style */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-[10%] w-72 h-72 bg-[#0969da]/5 dark:bg-[#4493f8]/5 rounded-full blur-3xl"
        ></motion.div>
        
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-[#2da44e]/5 dark:bg-[#3fb950]/5 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge - Honest positioning */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dff7ff] dark:bg-[#1c2d41] border border-[#0969da]/30 dark:border-[#4493f8]/30 rounded-full mb-8 text-[#0969da] dark:text-[#4493f8] text-sm font-medium">
                <Flame className="w-3 h-3 fill-current" />
                <span>Built differently from cloud AI</span>
              </div>
              
              {/* Main heading - Category defining */}
              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold mb-6 text-[#1f2328] dark:text-[#e6edf3] tracking-tight leading-[1.1]">
                Your Code.
                <br />
                <span className="text-[#0969da] dark:text-[#4493f8]">Your Machine.</span>
                <br />
                <span className="relative inline-block mt-2">
                  Zero Cloud
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0 6 Q50 0, 100 6 T200 6" stroke="#2da44e" strokeWidth="3" fill="none" className="dark:stroke-[#3fb950]"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl mb-8 text-[#656d76] dark:text-[#7d8590] max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                The AI coding assistant that runs <span className="font-semibold text-[#1f2328] dark:text-[#e6edf3]">100% offline</span>. 
                Your code never leaves your device. No internet required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10"
            >
              <Link href="/downloads" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-[#0969da] hover:bg-[#0860ca] active:bg-[#0757ba] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0] text-white px-8 py-6 text-base font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-100 border-0 w-full"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download for macOS
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              
              <Link href="/downloads" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent hover:bg-[#f3f4f6] dark:hover:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] text-[#1f2328] dark:text-[#e6edf3] px-8 py-6 text-base font-medium rounded-md transition-all duration-100 w-full"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download for Windows
                </Button>
              </Link>
            </motion.div>

            {/* Trust signals - Honest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm mt-4"
            >
              <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590] bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-2 rounded-full border border-[#d0d7de] dark:border-[#30363d]">
                <Code2 className="w-4 h-4 text-[#0969da] dark:text-[#4493f8]" aria-hidden="true" />
                <span className="font-medium">20+ Languages</span>
              </div>
              <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590] bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-2 rounded-full border border-[#d0d7de] dark:border-[#30363d]">
                <Zap className="w-4 h-4 text-[#2da44e] dark:text-[#3fb950]" aria-hidden="true" />
                <span className="font-medium">Works Offline</span>
              </div>
              <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590] bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-2 rounded-full border border-[#d0d7de] dark:border-[#30363d]">
                <Shield className="w-4 h-4 text-[#6e7781] dark:text-[#7d8590]" aria-hidden="true" />
                <span className="font-medium">100% Private</span>
              </div>
              <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590] bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-2 rounded-full border border-[#d0d7de] dark:border-[#30363d]">
                <Github className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">Open Source</span>
              </div>
            </motion.div>
          </div>

          {/* Right: App Preview / Terminal Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block w-full"
          >
            {/* Terminal Window - Fits perfectly in grid column */}
            <div className="bg-[#1a1a1a] dark:bg-[#0d1117] rounded-xl border border-[#30363d] shadow-2xl overflow-hidden w-full">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-4 bg-[#161b22] border-b border-[#30363d]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                <span className="ml-4 text-sm text-[#7d8590] font-medium">CodaiPro Terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 md:p-8 font-mono text-sm leading-relaxed">
                <div className="text-[#7d8590] mb-2">$ codai --help</div>
                <div className="text-[#e6edf3] mb-4">
                  CodaiPro v2.1 - Offline AI Coding Assistant
                </div>
                <div className="text-[#7d8590] mb-2">$ help</div>
                <div className="space-y-2 text-[#a5d6ff]">
                  <div>  --generate    Generate code with AI</div>
                  <div>  --explain     Explain code logic</div>
                  <div>  --debug       Find and fix bugs</div>
                  <div>  --optimize    Optimize performance</div>
                </div>
                <div className="mt-6 text-[#7d8590] mb-2">$ codai generate python bubble sort</div>
                <div className="text-[#7d8590] flex items-center gap-2">
                  <span className="animate-pulse">▋</span> Processing locally...
                </div>
              </div>
            </div>

            {/* Floating badges around terminal */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-lg px-4 py-2 shadow-lg flex items-center gap-2 z-20"
            >
              <Shield className="w-4 h-4 text-[#2da44e]" />
              <span className="text-sm font-medium text-[#1f2328] dark:text-[#e6edf3]">Offline ✓</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] rounded-lg px-4 py-2 shadow-lg flex items-center gap-2 z-20"
            >
              <Zap className="w-4 h-4 text-[#d29922]" />
              <span className="text-sm font-medium text-[#1f2328] dark:text-[#e6edf3]">Local Only ✓</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
