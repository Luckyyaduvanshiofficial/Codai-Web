'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X, Download, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free Forever',
    price: '$0',
    period: 'forever',
    description: 'Perfect for students and individual learners',
    popular: false,
    features: [
      { text: '100% Offline AI Assistant', included: true },
      { text: 'Code Generation & Explanation', included: true },
      { text: 'Debugging & Optimization', included: true },
      { text: '20+ Programming Languages', included: true },
      { text: 'Portable Executable', included: true },
      { text: 'No Internet Required', included: true },
      { text: 'Unlimited Usage', included: true },
      { text: 'Open Source (MIT License)', included: true },
      { text: 'Community Support', included: true },
      { text: 'Regular Updates', included: true },
      { text: 'Priority Support', included: false },
      { text: 'Cloud IDE Access', included: false },
      { text: 'Team Collaboration', included: false },
    ],
    cta: 'Download Free',
    ctaLink: '/downloads',
  },
  {
    name: 'Student Pro',
    price: '$9',
    period: 'per month',
    description: 'Enhanced features for serious students',
    popular: true,
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Cloud IDE Access', included: true },
      { text: 'Priority AI Processing', included: true },
      { text: 'Advanced Code Analysis', included: true },
      { text: 'Code Templates Library', included: true },
      { text: 'Email Support (24h response)', included: true },
      { text: 'Project Workspace Sync', included: true },
      { text: 'Extended AI Context', included: true },
      { text: 'Custom AI Instructions', included: true },
      { text: 'Export Conversations', included: true },
      { text: 'Team Collaboration', included: false },
      { text: 'API Access', included: false },
      { text: 'Custom Integrations', included: false },
    ],
    cta: 'Coming Soon',
    ctaLink: '#',
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For professional developers and teams',
    popular: false,
    features: [
      { text: 'Everything in Student Pro', included: true },
      { text: 'Team Collaboration (up to 10)', included: true },
      { text: 'API Access & Integrations', included: true },
      { text: 'Custom AI Model Training', included: true },
      { text: 'Priority Support (1h response)', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Custom Deployment', included: true },
      { text: 'White-label Option', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'SLA Guarantee', included: true },
      { text: 'Custom Features', included: true },
      { text: 'Training Sessions', included: true },
      { text: 'Enterprise SSO', included: true },
    ],
    cta: 'Coming Soon',
    ctaLink: '#',
  },
];

const faqs = [
  {
    question: 'Is CodaiPro really free forever?',
    answer: 'Yes! The core desktop application is 100% free and open-source under MIT License. It will always remain free with no hidden costs or limitations. Premium tiers (coming soon) will offer additional cloud-based features but the offline version will always be free.',
  },
  {
    question: 'What\'s the difference between Free and paid plans?',
    answer: 'The Free version includes all core features (offline AI, code generation, debugging, 20+ languages). Paid plans (coming soon) will add cloud-based features like online IDE, team collaboration, and priority support. The offline experience remains identical.',
  },
  {
    question: 'Can I use the free version for commercial projects?',
    answer: 'Absolutely! The MIT License allows commercial use. You can use CodaiPro Free for personal projects, commercial development, freelance work, or any other purpose without restrictions.',
  },
  {
    question: 'Do I need internet for the free version?',
    answer: 'No! CodaiPro Free works 100% offline. All AI processing happens locally on your computer. No internet connection required, no data transmission, complete privacy.',
  },
  {
    question: 'When will paid plans be available?',
    answer: 'Student Pro and Professional plans are currently in development. They will offer cloud-based features like online IDE access, team collaboration, and API access. Join our community to get early access when they launch!',
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes! When paid plans launch, you\'ll be able to upgrade or downgrade your subscription at any time. The free version will always be available as a fallback.',
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
              Core features always free • No credit card required
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
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <div className="bg-[var(--gh-accent-emphasis)] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'border-2 border-[var(--gh-accent-emphasis)] shadow-xl' : 'border-[var(--gh-border-default)]'} bg-[var(--gh-canvas-subtle)]`}>
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
                          plan.popular
                            ? 'bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90 text-white'
                            : 'border-2 border-[var(--gh-border-default)] hover:border-[var(--gh-accent-emphasis)] bg-[var(--gh-canvas-default)]'
                        }`}
                      >
                        {plan.name === 'Free Forever' && <Download className="inline-block w-5 h-5 mr-2" />}
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
