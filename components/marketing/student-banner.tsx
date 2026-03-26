'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, Sparkles, Gift, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function StudentBanner() {
  return (
    <section 
      className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-[#0d1117] dark:to-gray-900 border-y border-[#d0d7de] dark:border-[#30363d] overflow-hidden"
      aria-label="Student offer section"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0969da]/5 dark:bg-[#4493f8]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2da44e]/5 dark:bg-[#3fb950]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            aria-label="Student offer details"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0969da]/10 dark:bg-[#4493f8]/10 border border-[#0969da]/30 dark:border-[#4493f8]/30 rounded-full mb-6">
              <GraduationCap className="w-4 h-4 text-[#0969da] dark:text-[#4493f8]" aria-hidden="true" />
              <span className="text-sm font-semibold text-[#0969da] dark:text-[#4493f8]">For Students</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1f2328] dark:text-[#e6edf3]">
              Your Skills.
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0969da] dark:text-[#4493f8]">
                  Our Tools.
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q75 0, 150 6 T300 6"
                    stroke="#2da44e"
                    strokeWidth="3"
                    fill="none"
                    className="dark:stroke-[#3fb950]"
                  />
                </svg>
              </span>
              <br />
              <span className="text-[#2da44e] dark:text-[#3fb950]">Free.</span>
            </h2>

            <div className="bg-white dark:bg-[#161b22] border-2 border-[#d0d7de] dark:border-[#30363d] rounded-2xl p-8 mb-8 shadow-lg">
              <p className="text-lg text-[#656d76] dark:text-[#7d8590] mb-6 leading-relaxed">
                You didn't choose computer science because it was easy. You chose it because you wanted to build things that matter.
              </p>
              <p className="text-lg text-[#656d76] dark:text-[#7d8590] mb-6 leading-relaxed">
                We built CodaiPro for students like you—who code in coffee shops, in libraries, in dorm rooms with spotty WiFi. Who need AI help at 2am when the internet's down. Who are building the next big thing.
              </p>
              <p className="text-lg text-[#1f2328] dark:text-[#e6edf3] font-medium leading-relaxed">
                If you're enrolled in a CS program, bootcamp, or online course—you get CodaiPro Pro completely free. No credit card. No catch.
              </p>
              <p className="text-lg text-[#656d76] dark:text-[#7d8590] mt-4 leading-relaxed">
                This is our way of investing in the next generation of developers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/students" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0] text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <GraduationCap className="mr-2 h-6 w-6" aria-hidden="true" />
                  Claim Student Access
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#656d76] dark:text-[#7d8590]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d29922]" aria-hidden="true" />
                <span>12,000+ student developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#2da44e]" aria-hidden="true" />
                <span>No credit card required</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
            aria-label="Student statistics"
          >
            <div className="relative bg-white dark:bg-[#161b22] rounded-3xl p-8 border border-[#d0d7de] dark:border-[#30363d] shadow-xl">
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-[#2da44e] text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm"
                aria-label="100% free offer"
              >
                100% FREE
              </motion.div>

              <div className="space-y-6">
                {/* Stats cards - Real numbers */}
                {[
                  { label: 'Student Users', value: '12,000+', icon: '👨‍🎓', iconLabel: 'Student', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Countries', value: '50+', icon: '🌍', iconLabel: 'Globe', color: 'from-green-500 to-emerald-500' },
                  { label: 'Languages Supported', value: '20+', icon: '💻', iconLabel: 'Computer', color: 'from-purple-500 to-pink-500' },
                  { label: 'Free Forever', value: 'Yes', icon: '🎯', iconLabel: 'Target', color: 'from-orange-500 to-red-500' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-gray-50 dark:bg-[#0d1117] p-5 rounded-2xl border border-[#d0d7de] dark:border-[#30363d]"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-3xl shadow-md`} aria-hidden="true">
                      <span role="img" aria-label={stat.iconLabel}>{stat.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-[#1f2328] dark:text-[#e6edf3] mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#656d76] dark:text-[#7d8590]">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial snippet - Realistic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-[#d0d7de] dark:border-[#30363d] shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl" role="img" aria-label="Developer">👨‍💻</div>
                <div className="flex-1">
                  <p className="text-[#1f2328] dark:text-[#e6edf3] italic mb-3">
                    "During finals week, campus internet crawls. Every other AI tool is useless. CodaiPro? Works perfectly. Saved my Algorithms final."
                  </p>
                  <div>
                    <p className="font-semibold text-[#1f2328] dark:text-[#e6edf3]">Jordan M.</p>
                    <p className="text-sm text-[#656d76] dark:text-[#7d8590]">Bootcamp Student</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
