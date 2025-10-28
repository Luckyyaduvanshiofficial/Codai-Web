'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, Sparkles, Check, Github, 
  Code2, BookOpen, Users, Award, Zap, Heart,
  Clock, Shield, Globe, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Sparkles,
    title: 'Everything in Pro',
    description: 'Access all premium features worth $120/year absolutely free',
  },
  {
    icon: Code2,
    title: 'Unlimited AI Assistance',
    description: 'Generate, debug, and optimize code without any limits',
  },
  {
    icon: Zap,
    title: 'Priority Processing',
    description: 'Get faster responses with priority AI processing',
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    description: 'Exclusive tutorials, guides, and coding best practices',
  },
  {
    icon: Users,
    title: 'Student Community',
    description: 'Join 10,000+ students learning and growing together',
  },
  {
    icon: Award,
    title: 'Certificate Programs',
    description: 'Earn certificates as you complete coding milestones',
  },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Student Users' },
  { icon: Globe, value: '50+', label: 'Countries' },
  { icon: Code2, value: '1M+', label: 'Code Generated' },
  { icon: Award, value: '4.9/5', label: 'Student Rating' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    university: 'MIT',
    image: '👩‍💻',
    quote: 'CodaiPro helped me ace my algorithms class. The free student plan is a game-changer!',
  },
  {
    name: 'Raj Patel',
    university: 'Stanford',
    image: '👨‍💻',
    quote: 'Best coding assistant ever! Saved me countless hours during my final project.',
  },
  {
    name: 'Emily Rodriguez',
    university: 'Berkeley',
    image: '👩‍🎓',
    quote: 'As a CS freshman, CodaiPro made learning to code so much easier. Highly recommend!',
  },
];

const comparison = [
  { feature: 'AI Code Generation', starter: false, pro: true, student: true },
  { feature: 'Daily Request Limit', starter: '100', pro: 'Unlimited', student: 'Unlimited' },
  { feature: 'Response Speed', starter: 'Standard', pro: 'Fast', student: 'Priority' },
  { feature: 'Code Analysis', starter: 'Basic', pro: 'Advanced', student: 'Advanced' },
  { feature: 'Export & Save', starter: false, pro: true, student: true },
  { feature: 'Learning Resources', starter: false, pro: true, student: true },
  { feature: 'Community Access', starter: true, pro: true, student: true },
  { feature: 'Certificate Programs', starter: false, pro: false, student: true },
  { feature: 'Priority Support', starter: false, pro: true, student: true },
  { feature: 'Price/Month', starter: '$3', pro: '$10', student: 'FREE' },
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-[var(--gh-canvas-default)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--gh-border-default)] bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-[var(--gh-canvas-default)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gh-border-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--gh-border-muted)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full mb-6">
              <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Limited Time Offer for Students
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--gh-fg-default)]">
              Free Pro for Students
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--gh-fg-muted)] max-w-3xl mx-auto mb-4">
              Get CodaiPro Pro <span className="line-through text-gray-400">worth $120/year</span> <span className="font-bold text-green-600 dark:text-green-400">absolutely FREE</span> while you're a student
            </p>
            
            <p className="text-lg text-[var(--gh-fg-muted)] mb-8">
              Join 10,000+ students already coding smarter with AI assistance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0] text-white text-lg px-8 py-6 h-auto">
                  <Github className="mr-2 h-5 w-5" />
                  Claim Free Access with GitHub
                </button>
              </Link>
              <Link href="/try-now">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 h-auto">
                  Try Demo First
                </button>
              </Link>
            </div>

            <p className="text-sm text-[var(--gh-fg-muted)] mt-4">
              No credit card required • Verify student status with GitHub • Free as long as you're enrolled
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <stat.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--gh-fg-default)] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--gh-fg-muted)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Students Love CodaiPro */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)] max-w-2xl mx-auto">
              All Pro features, completely free for students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">
              Student Plan vs Others
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)]">
              See how much you save as a student
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--gh-border-default)]">
                  <th className="text-left p-4 text-[var(--gh-fg-default)] font-semibold">Feature</th>
                  <th className="text-center p-4 text-[var(--gh-fg-default)] font-semibold">Starter</th>
                  <th className="text-center p-4 text-[var(--gh-fg-default)] font-semibold">Pro</th>
                  <th className="text-center p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-semibold border-x-2 border-green-200 dark:border-green-800">
                    🎓 Student
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={index} className="border-b border-[var(--gh-border-default)]">
                    <td className="p-4 text-[var(--gh-fg-default)]">{row.feature}</td>
                    <td className="text-center p-4">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-[var(--gh-fg-muted)]">{row.starter}</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="text-[var(--gh-fg-muted)]">{row.pro}</span>
                      )}
                    </td>
                    <td className="text-center p-4 bg-green-50 dark:bg-green-900/20 border-x-2 border-green-200 dark:border-green-800">
                      {typeof row.student === 'boolean' ? (
                        row.student ? (
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )
                      ) : (
                        <span className="font-semibold text-green-600 dark:text-green-400">{row.student}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">
              Loved by Students Worldwide
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)]">
              See what students are saying about CodaiPro
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{testimonial.image}</div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.university}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--gh-fg-muted)] italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="py-24 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">
              How to Claim Your Free Pro Access
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)]">
              It's easy and takes less than 2 minutes
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Sign Up with GitHub',
                description: 'Click "Sign Up" and connect your GitHub account. We use GitHub to verify your student status.',
                icon: Github,
              },
              {
                step: '2',
                title: 'Verify Student Status',
                description: 'If you have GitHub Student Developer Pack, you\'re instantly verified! Otherwise, upload your student ID.',
                icon: Shield,
              },
              {
                step: '3',
                title: 'Start Coding!',
                description: 'That\'s it! You now have full Pro access. Download the desktop app or use the web version.',
                icon: Sparkles,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <h3 className="text-2xl font-bold text-[var(--gh-fg-default)]">{item.title}</h3>
                  </div>
                  <p className="text-[var(--gh-fg-muted)] text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'How long do I get free access?',
                a: 'As long as you\'re a student! Your access is free until you graduate or are no longer enrolled in an educational institution.',
              },
              {
                q: 'How do you verify I\'m a student?',
                a: 'We verify through GitHub Student Developer Pack or by reviewing your student ID/enrollment letter. The process is quick and secure.',
              },
              {
                q: 'What happens after I graduate?',
                a: 'You can switch to our affordable paid plans ($3/month starter or $10/month pro). Your data and history are preserved.',
              },
              {
                q: 'Can I use this for commercial projects?',
                a: 'Yes! Student accounts have the same usage rights as Pro accounts. You can use CodaiPro for personal projects, assignments, and even freelance work.',
              },
              {
                q: 'Do I need a credit card?',
                a: 'No! Student accounts are completely free with no credit card required. Ever.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--gh-fg-muted)]">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-12 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <GraduationCap className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">
                Ready to Code Smarter?
              </h2>
              <p className="text-xl text-[var(--gh-fg-muted)] mb-8">
                Join 10,000+ students getting Pro features for free
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0] text-white text-lg px-8 py-6 h-auto">
                    <Github className="mr-2 h-5 w-5" />
                    Claim Your Free Access Now
                  </button>
                </Link>
                <Link href="/try-now">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 h-auto">
                    Try Demo First
                  </button>
                </Link>
              </div>
              <p className="text-sm text-[var(--gh-fg-muted)] mt-6">
                💡 Limited offer • No credit card required • Instant verification
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
