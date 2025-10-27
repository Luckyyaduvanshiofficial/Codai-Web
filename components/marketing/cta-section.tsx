'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="py-24 bg-[#f6f8fa] dark:bg-[#0d1117] border-t border-[#d0d7de] dark:border-[#30363d] relative overflow-hidden">
      {/* Subtle floating elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-[#0969da]/10 dark:bg-[#4493f8]/10 rounded-full blur-2xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-40 h-40 bg-[#2da44e]/10 dark:bg-[#3fb950]/10 rounded-full blur-2xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0969da]/10 dark:bg-[#4493f8]/10 backdrop-blur-sm rounded-full border border-[#0969da]/20 dark:border-[#4493f8]/20 mb-8">
            <Sparkles className="w-4 h-4 text-[#0969da] dark:text-[#4493f8]" />
            <span className="text-sm font-medium text-[#1f2328] dark:text-[#e6edf3]">Start Your Free Trial Today</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#1f2328] dark:text-[#e6edf3]">
            Ready to Code Smarter?
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-[#656d76] dark:text-[#7d8590] max-w-2xl mx-auto">
            Join thousands of students and developers who are already coding smarter with CodaiPro
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/try-now">
              <Button size="lg" className="px-8 py-6 text-lg">
                Try Cloud IDE - Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/downloads">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Download Desktop App
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-[#656d76] dark:text-[#7d8590]">
            No credit card required • Free forever plan available • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
