'use client';

import { motion } from 'framer-motion';
import { Download, Cpu, Zap } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: '1. Download the app',
    description: 'Get the desktop app for macOS or Windows. Takes under 30 seconds.',
  },
  {
    icon: Cpu,
    title: '2. Runs locally on your machine',
    description: 'All AI processing happens on your device. No internet connection needed after download.',
  },
  {
    icon: Zap,
    title: '3. Start coding with AI instantly',
    description: 'Generate code, debug, explain—right from your IDE. No signup required.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#f6f8fa] dark:bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1f2328] dark:text-[#e6edf3]">
            How CodaiPro works
          </h2>
          <p className="text-xl text-[#656d76] dark:text-[#7d8590] max-w-3xl mx-auto">
            From download to coding in less than a minute. No setup, no configuration, no cloud account.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-[#0969da]/10 dark:bg-[#4493f8]/10 rounded-2xl border border-[#0969da]/20 dark:border-[#4493f8]/20">
                <step.icon className="w-10 h-10 text-[#0969da] dark:text-[#4493f8]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1f2328] dark:text-[#e6edf3]">
                {step.title}
              </h3>
              <p className="text-[#656d76] dark:text-[#7d8590] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
