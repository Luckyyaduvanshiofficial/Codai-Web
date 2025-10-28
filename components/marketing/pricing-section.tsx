'use client';

import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// TypeScript interfaces for type safety
interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  highlight?: boolean;
}

// Feature constants to avoid duplication
const FEATURES = {
  DESKTOP_OFFLINE: 'Desktop Offline Version',
  CLOUD_REQUESTS_100: '100 Cloud Requests/Day',
  CLOUD_REQUESTS_UNLIMITED: 'Unlimited Cloud Requests',
  BASIC_CODE_GEN: 'Basic Code Generation',
  CODE_EXPLANATION: 'Code Explanation',
  MULTI_LANG: '20+ Programming Languages',
  COMMUNITY_SUPPORT: 'Community Support',
  PRIORITY_AI: 'Priority AI Processing',
  ADVANCED_ANALYSIS: 'Advanced Code Analysis',
  EXPORT_SAVE: 'Export & Save Conversations',
  EMAIL_SUPPORT: 'Email Support (24h response)',
  CUSTOM_INSTRUCTIONS: 'Custom AI Instructions',
  EXCLUSIVE_COMMUNITY: 'Exclusive Student Community',
  CERTIFICATES: 'Certificate Programs',
  LEARNING_TRACKING: 'Learning Path Tracking',
  FREE_ENROLLED: 'Free as long as you\'re enrolled',
} as const;

const plans: Plan[] = [
  {
    name: 'Starter',
    price: '$3',
    period: '/month',
    description: 'Perfect for casual users and beginners',
    features: [
      FEATURES.DESKTOP_OFFLINE,
      FEATURES.CLOUD_REQUESTS_100,
      FEATURES.BASIC_CODE_GEN,
      FEATURES.CODE_EXPLANATION,
      FEATURES.MULTI_LANG,
      FEATURES.COMMUNITY_SUPPORT,
    ],
    cta: 'Get Started',
    href: '/register',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$10',
    period: '/month',
    description: 'Everything you need for professional development',
    features: [
      'Everything in Starter',
      FEATURES.CLOUD_REQUESTS_UNLIMITED,
      FEATURES.PRIORITY_AI,
      FEATURES.ADVANCED_ANALYSIS,
      FEATURES.EXPORT_SAVE,
      FEATURES.EMAIL_SUPPORT,
      FEATURES.CUSTOM_INSTRUCTIONS,
    ],
    cta: 'Get Pro',
    href: '/register',
    popular: true,
  },
  {
    name: 'Student',
    price: 'FREE',
    period: 'while enrolled',
    description: 'Full Pro access for students - worth $120/year!',
    features: [
      'Everything in Pro (Worth $120/year!)',
      FEATURES.CLOUD_REQUESTS_UNLIMITED,
      FEATURES.PRIORITY_AI,
      FEATURES.EXCLUSIVE_COMMUNITY,
      FEATURES.CERTIFICATES,
      FEATURES.LEARNING_TRACKING,
      FEATURES.FREE_ENROLLED,
    ],
    cta: '🎓 Claim Free Access',
    href: '/students',
    popular: false,
    highlight: true,
  },
];

export function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose the plan that's right for you. All plans include our core AI features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={plan.popular ? 'md:-mt-4' : ''}
            >
              <Card className={`h-full relative ${
                plan.popular 
                  ? 'border-4 border-purple-500 shadow-2xl shadow-purple-500/20' 
                  : plan.highlight
                  ? 'border-4 border-green-500 shadow-2xl shadow-green-500/20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20'
                  : 'border-2'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      🎓 For Students
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-8">
                  <Link href={plan.href} className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : plan.highlight
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                          : ''
                      }`}
                      size="lg"
                      variant={plan.popular || plan.highlight ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-gray-600 dark:text-gray-400"
        >
          Need a custom enterprise plan?{' '}
          <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold">
            Contact us
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
