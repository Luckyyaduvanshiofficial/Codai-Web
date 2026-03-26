'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Download, Shield } from 'lucide-react';
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#1f2328] dark:text-[#e6edf3]">
            Ready to code without limits?
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-[#656d76] dark:text-[#7d8590] max-w-2xl mx-auto">
            Join developers who've already gone local. Your code stays on your machine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/downloads">
              <Button size="lg" className="px-8 py-6 text-lg bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0]">
                <Download className="mr-2 h-5 w-5" />
                Download CodaiPro Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <p className="mt-8 flex items-center justify-center gap-4 text-sm text-[#656d76] dark:text-[#7d8590]">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-[#2da44e]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#d29922]" />
              No signup required
            </span>
            <span>✓ Works offline immediately</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
