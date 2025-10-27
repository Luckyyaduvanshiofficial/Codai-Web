'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Star, Code2, Zap, Shield } from 'lucide-react';
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* GitHub-style badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dff7ff] dark:bg-[#1c2d41] border border-[#0969da]/30 dark:border-[#4493f8]/30 rounded-full mb-8 text-[#0969da] dark:text-[#4493f8] text-sm font-medium">
              <Star className="w-3 h-3 fill-current" />
              <span>100K+ developers trust CodaiPro</span>
            </div>
            
            {/* Main heading - GitHub style */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#1f2328] dark:text-[#e6edf3] tracking-tight">
              Code faster with
              <br />
              <span className="text-[#0969da] dark:text-[#4493f8]">AI assistance</span>{' '}
              <span className="relative inline-block">
                offline
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0 6 Q50 0, 100 6 T200 6" stroke="#2da44e" strokeWidth="3" fill="none" className="dark:stroke-[#3fb950]"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-[#656d76] dark:text-[#7d8590] max-w-3xl mx-auto leading-relaxed font-normal">
              The ultimate offline AI coding assistant. Perfect for students, developers, 
              and anyone learning to code. <span className="font-semibold text-[#1f2328] dark:text-[#e6edf3]">No internet required.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/try-now">
              <Button 
                size="lg" 
                className="bg-[#2da44e] hover:bg-[#2c974b] active:bg-[#298e46] text-white px-8 py-6 text-base font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-100 border-0"
              >
                Try CodaiPro Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/downloads">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent hover:bg-[#f3f4f6] dark:hover:bg-[#21262d] border border-[#d0d7de] dark:border-[#30363d] text-[#1f2328] dark:text-[#e6edf3] px-8 py-6 text-base font-medium rounded-md transition-all duration-100"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for Windows
              </Button>
            </Link>
          </motion.div>

          {/* GitHub-style feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590]">
              <Code2 className="w-5 h-5 text-[#0969da] dark:text-[#4493f8]" />
              <span className="text-sm font-medium">20+ Languages</span>
            </div>
            <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590]">
              <Zap className="w-5 h-5 text-[#2da44e] dark:text-[#3fb950]" />
              <span className="text-sm font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590]">
              <Shield className="w-5 h-5 text-[#6e7781] dark:text-[#7d8590]" />
              <span className="text-sm font-medium">100% Private</span>
            </div>
            <div className="flex items-center gap-2 text-[#656d76] dark:text-[#7d8590]">
              <Star className="w-5 h-5 text-[#d29922] dark:text-[#d29922] fill-current" />
              <span className="text-sm font-medium">Free & Open Source</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
