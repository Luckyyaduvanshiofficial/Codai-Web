'use client';

import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight, Sparkles, Gift, Check } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function StudentBanner() {
  return (
    <section 
      className="relative py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/20 dark:to-teal-950/20 border-y border-[var(--gh-border-default)] overflow-hidden"
      aria-label="Student offer section"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-full mb-6 shadow-lg">
              <Gift className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-bold">SPECIAL STUDENT OFFER</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--gh-fg-default)]">
              Are You a{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Student?
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q75 0, 150 6 T300 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-green-500 dark:text-green-400"
                  />
                </svg>
              </span>
            </h2>

            <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-green-500/30 rounded-2xl p-8 mb-8 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                  <GraduationCap className="w-9 h-9 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--gh-fg-default)] mb-2">
                    Get Pro Version FREE!
                  </h3>
                  <p className="text-lg text-[var(--gh-fg-muted)]">
                    Worth <span className="line-through text-gray-400">$120/year</span>{' '}
                    <span className="font-bold text-green-600 dark:text-green-400">
                      - Absolutely FREE
                    </span>
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Unlimited AI code generation & debugging',
                  'Priority processing - faster responses',
                  'Advanced code analysis & optimization',
                  'Exclusive student community access',
                  'Learning certificates & achievements',
                  'Free as long as you\'re enrolled',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-[var(--gh-fg-default)]">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0" aria-hidden="true">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/students" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <GraduationCap className="mr-2 h-6 w-6" aria-hidden="true" />
                    Claim Your Free Access
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-center text-[var(--gh-fg-muted)] mt-4">
                <span role="img" aria-label="Information">💡</span> <strong>No credit card required</strong> • Verify with GitHub Student Pack • Instant activation
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-[var(--gh-fg-muted)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                <span>10,000+ students already joined</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                <span>Trusted by universities</span>
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
            <div className="relative bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-[var(--gh-border-default)] shadow-2xl">
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl font-bold text-lg"
                aria-label="100% free offer"
              >
                <span role="img" aria-label="Party">🎉</span> 100% FREE
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-xl font-bold text-lg"
                aria-label="Save 120 dollars per year"
              >
                <span role="img" aria-label="Money">💰</span> Save $120/yr
              </motion.div>

              <div className="space-y-6">
                {/* Stats cards */}
                {[
                  { label: 'Student Users', value: '10,000+', icon: '👨‍🎓', iconLabel: 'Student', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Countries', value: '50+', icon: '🌍', iconLabel: 'Globe', color: 'from-green-500 to-emerald-500' },
                  { label: 'Code Generated', value: '1M+', icon: '💻', iconLabel: 'Computer', color: 'from-purple-500 to-pink-500' },
                  { label: 'Success Rate', value: '98%', icon: '⭐', iconLabel: 'Star', color: 'from-orange-500 to-red-500' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-5 rounded-2xl border border-[var(--gh-border-default)] shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-3xl shadow-md`} aria-hidden="true">
                      <span role="img" aria-label={stat.iconLabel}>{stat.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-[var(--gh-fg-default)] mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[var(--gh-fg-muted)]">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial snippet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-[var(--gh-border-default)] shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl" role="img" aria-label="Developer">👨‍💻</div>
                <div className="flex-1">
                  <p className="text-[var(--gh-fg-default)] italic mb-3">
                    "Finally, an AI assistant that actually works offline! Perfect for coding during my long commute. The free student version has all the features I need."
                  </p>
                  <div>
                    <p className="font-semibold text-[var(--gh-fg-default)]">Alex Kumar</p>
                    <p className="text-sm text-[var(--gh-fg-muted)]">CS Student • IIT Delhi</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* SEO-optimized text section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-[var(--gh-fg-default)] mb-4">
            Why Students Choose CodaiPro
          </h3>
          <p className="text-[var(--gh-fg-muted)] leading-relaxed">
            <strong className="text-[var(--gh-fg-default)]">Free AI coding assistant for students</strong> - 
            CodaiPro offers the best free coding AI for students learning programming. Our student program provides 
            <strong className="text-[var(--gh-fg-default)]"> free Pro access</strong> to all enrolled students, 
            making it the perfect <strong className="text-[var(--gh-fg-default)]">coding helper for students</strong>. 
            Whether you're learning Python, JavaScript, Java, or any of 20+ languages, get 
            <strong className="text-[var(--gh-fg-default)]"> unlimited AI-powered code generation</strong>, 
            debugging assistance, and explanations - all completely free for students. Join thousands of students 
            at top universities who are coding smarter with CodaiPro's free student plan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
