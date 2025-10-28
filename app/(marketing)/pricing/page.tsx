'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Download, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$3',
    period: 'per month',
    description: 'Perfect for casual users and beginners',
    popular: false,
    badge: null,
    features: [
      { text: 'Desktop Offline Version', included: true },
      { text: '100 Cloud Requests/Day', included: true },
      { text: 'Basic Code Generation', included: true },
      { text: 'Code Explanation', included: true },
      { text: '20+ Programming Languages', included: true },
      { text: 'Standard Response Time', included: true },
      { text: 'Community Support', included: true },
      { text: 'Regular Updates', included: true },
      { text: 'Priority AI Processing', included: false },
      { text: 'Advanced Code Analysis', included: false },
      { text: 'Export & Save Conversations', included: false },
      { text: 'Certificate Programs', included: false },
    ],
    cta: 'Get Started',
    ctaLink: '/register',
  },
  {
    name: 'Pro',
    price: '$10',
    period: 'per month',
    description: 'Everything you need for professional development',
    popular: true,
    badge: 'Most Popular',
    features: [
      { text: 'Everything in Starter', included: true },
      { text: 'Unlimited Cloud Requests', included: true },
      { text: 'Priority AI Processing', included: true },
      { text: 'Advanced Code Analysis', included: true },
      { text: 'Code Review Features', included: true },
      { text: 'Export & Save Conversations', included: true },
      { text: 'Learning Resources Library', included: true },
      { text: 'Email Support (24h response)', included: true },
      { text: 'Custom AI Instructions', included: true },
      { text: 'Faster Response Time', included: true },
      { text: 'Certificate Programs', included: true },
      { text: 'Team Collaboration', included: false },
    ],
    cta: 'Get Pro',
    ctaLink: '/register',
  },
  {
    name: 'Student',
    price: 'FREE',
    period: 'while enrolled',
    description: 'Full Pro access for students - worth $120/year!',
    popular: false,
    badge: '🎓 For Students',
    features: [
      { text: 'Everything in Pro (Worth $120/year!)', included: true },
      { text: 'Unlimited Cloud Requests', included: true },
      { text: 'Priority AI Processing', included: true },
      { text: 'Advanced Code Analysis', included: true },
      { text: 'Certificate Programs', included: true },
      { text: 'Exclusive Student Community', included: true },
      { text: 'Learning Path Tracking', included: true },
      { text: 'Student Resources & Tutorials', included: true },
      { text: 'Priority Email Support', included: true },
      { text: 'Free as long as you\'re enrolled', included: true },
      { text: 'Verify with GitHub Student', included: true },
      { text: 'No Credit Card Required', included: true },
    ],
    cta: 'Claim Free Access',
    ctaLink: '/students',
  },
];

const faqs = [
  {
    question: 'Is the offline desktop version still completely free?',
    answer: 'Yes! The desktop offline version will always remain free and open-source under MIT License. The paid plans add cloud features like online IDE, unlimited AI requests, and advanced analysis.',
  },
  {
    question: 'How is the Student plan different from paid plans?',
    answer: 'Student plan gives you ALL Pro features ($10/month value) completely FREE! You get unlimited requests, priority processing, certificates, and exclusive student resources. Just verify your student status with GitHub.',
  },
  {
    question: 'What happens to my Student account after graduation?',
    answer: 'You can seamlessly upgrade to our $10/month Pro plan to keep all features. Your data, history, and certificates are all preserved. Many graduates stay with us!',
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Yes! You can upgrade or downgrade anytime. If you\'re a student on Starter/Pro, just verify your student status to switch to the free Student plan.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and international payment methods. Student accounts require no payment - just GitHub verification.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes! All new users get a 7-day free trial of Pro features. No credit card required for the trial. Students get unlimited free access without any trial limits.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--gh-canvas-default)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--gh-border-default)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gh-border-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--gh-border-muted)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--gh-fg-default)]">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-[var(--gh-fg-muted)] max-w-3xl mx-auto mb-8">
              Start free forever. Upgrade when you need more.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 font-semibold">
              <Sparkles className="w-5 h-5" />
              Students Get Pro Free • Desktop version always free • No credit card required
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <div className={`${plan.name === 'Pro' ? 'bg-[var(--gh-accent-emphasis)]' : plan.name === 'Student' ? 'bg-green-600' : 'bg-gray-600'} text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2`}>
                      {plan.name === 'Pro' && <Zap className="w-4 h-4" />}
                      {plan.badge}
                    </div>
                  </div>
                )}
                <Card className={`h-full ${plan.popular || plan.name === 'Student' ? 'border-2 border-[var(--gh-accent-emphasis)] shadow-xl' : 'border-[var(--gh-border-default)]'} ${plan.name === 'Student' ? 'bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20' : 'bg-[var(--gh-canvas-subtle)]'}`}>
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-[var(--gh-fg-default)]">{plan.price}</span>
                      <span className="text-[var(--gh-fg-muted)] ml-2">/ {plan.period}</span>
                    </div>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Link href={plan.ctaLink}>
                      <button
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          plan.popular || plan.name === 'Student'
                            ? `${plan.name === 'Student' ? 'bg-green-600 hover:bg-green-700' : 'bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90'} text-white`
                            : 'border-2 border-[var(--gh-border-default)] hover:border-[var(--gh-accent-emphasis)] bg-[var(--gh-canvas-default)]'
                        }`}
                      >
                      {plan.cta}
                      </button>
                    </Link>
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-[var(--gh-fg-default)]' : 'text-[var(--gh-fg-muted)]'}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 border-t border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4 text-center text-[var(--gh-fg-default)]">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)] text-center mb-16">
              Everything you need to know about CodaiPro pricing
            </p>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-default)]">
                    <CardHeader>
                      <CardTitle className="text-xl">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[var(--gh-fg-muted)] leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-[var(--gh-border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-[var(--gh-fg-default)]">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)] mb-8">
              Download CodaiPro Free today. No credit card required.
            </p>
            <Link href="/downloads">
              <button className="px-8 py-4 bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90 text-white rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Free Version
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
