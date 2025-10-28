'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, Wifi, Code2, Zap, Shield, GraduationCap, 
  Languages, Bug, BookOpen, Settings, FileCode, Repeat,
  CheckCircle2, Cpu, HardDrive, Globe, Lock
} from 'lucide-react';

const mainFeatures = [
  {
    icon: Sparkles,
    title: 'AI-Powered Code Generation',
    description: 'Generate complete functions, classes, and algorithms from natural language descriptions. Get production-ready code in seconds.',
    benefits: [
      'Natural language to code conversion',
      'Multiple solution approaches',
      'Optimized and commented code',
      'Best practices included',
    ],
  },
  {
    icon: Wifi,
    title: '100% Offline Operation',
    description: 'Works completely without internet connection. Perfect for lab exams, restricted networks, and remote areas.',
    benefits: [
      'No internet required',
      'Zero latency',
      'Complete privacy',
      'Works anywhere',
    ],
  },
  {
    icon: Languages,
    title: 'Multi-Language Support',
    description: 'Support for 20+ programming languages including Python, JavaScript, Java, C++, C#, and more.',
    benefits: [
      'Python, JavaScript, Java, C++',
      'Web development (HTML/CSS)',
      'Database queries (SQL)',
      '15+ additional languages',
    ],
  },
  {
    icon: Bug,
    title: 'Intelligent Debugging',
    description: 'Find and fix bugs quickly with AI-powered error analysis and solution suggestions.',
    benefits: [
      'Error identification',
      'Root cause analysis',
      'Multiple fix suggestions',
      'Performance optimization',
    ],
  },
  {
    icon: BookOpen,
    title: 'Code Explanation',
    description: 'Understand complex code with detailed, step-by-step explanations of algorithms and logic.',
    benefits: [
      'Line-by-line breakdown',
      'Algorithm explanations',
      'Concept clarification',
      'Learning-focused',
    ],
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for performance with instant responses. No waiting, no delays.',
    benefits: [
      'Instant AI responses',
      'Minimal resource usage',
      'Works on older hardware',
      'Optimized algorithms',
    ],
  },
];

const technicalFeatures = [
  {
    icon: Cpu,
    title: 'Local AI Processing',
    description: 'Advanced LLM runs directly on your machine',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your code never leaves your computer',
  },
  {
    icon: HardDrive,
    title: 'Low Resource Usage',
    description: 'Optimized for 4GB RAM systems',
  },
  {
    icon: Lock,
    title: 'Secure by Design',
    description: 'No external connections or data transmission',
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'Adjust AI behavior and response style',
  },
  {
    icon: Repeat,
    title: 'Auto-Recovery',
    description: 'Session persistence and crash recovery',
  },
];

const useCases = [
  {
    icon: GraduationCap,
    title: 'Perfect for Students',
    description: 'Learn faster with AI assistance',
    scenarios: [
      'Understand complex algorithms',
      'Debug homework assignments',
      'Learn new programming concepts',
      'Prepare for coding interviews',
    ],
  },
  {
    icon: FileCode,
    title: 'Lab Exams & Tests',
    description: 'Your reliable coding companion',
    scenarios: [
      'Works in restricted environments',
      'No installation needed (portable)',
      'Run from USB drives',
      'Bypass network restrictions',
    ],
  },
  {
    icon: Code2,
    title: 'Coding Competitions',
    description: 'Gain competitive advantage',
    scenarios: [
      'Fast code generation',
      'Algorithm optimization',
      'Error-free implementations',
      'Time-saving automation',
    ],
  },
  {
    icon: Globe,
    title: 'Professional Development',
    description: 'Boost productivity',
    scenarios: [
      'Rapid prototyping',
      'Code review assistance',
      'Documentation generation',
      'Refactoring suggestions',
    ],
  },
];

export default function FeaturesContent() {
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
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl text-[var(--gh-fg-muted)] max-w-3xl mx-auto">
              Everything you need to code smarter, faster, and better - completely offline
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">Core Features</h2>
            <p className="text-xl text-[var(--gh-fg-muted)] max-w-2xl mx-auto">
              Powerful AI capabilities designed specifically for coding
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-[var(--gh-accent-subtle)] flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-[var(--gh-accent-fg)]" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--gh-fg-muted)]">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-24 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">Technical Excellence</h2>
            <p className="text-xl text-[var(--gh-fg-muted)] max-w-2xl mx-auto">
              Built with modern technologies for optimal performance and security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6 rounded-lg border border-[var(--gh-border-default)] bg-[var(--gh-canvas-default)] hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--gh-accent-subtle)] flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-[var(--gh-fg-default)]">{feature.title}</h3>
                      <p className="text-sm text-[var(--gh-fg-muted)]">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">Perfect For Every Scenario</h2>
            <p className="text-xl text-[var(--gh-fg-muted)] max-w-2xl mx-auto">
              Whether you're learning, competing, or developing professionally
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-[var(--gh-accent-subtle)] flex items-center justify-center mb-4">
                      <useCase.icon className="w-7 h-7 text-[var(--gh-accent-fg)]" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{useCase.title}</CardTitle>
                    <CardDescription className="text-base">{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {useCase.scenarios.map((scenario, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--gh-accent-fg)] mt-2 shrink-0" />
                          <span className="text-[var(--gh-fg-muted)]">{scenario}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-[var(--gh-fg-default)]">
              Ready to Experience CodaiPro?
            </h2>
            <p className="text-xl text-[var(--gh-fg-muted)] mb-8">
              Download now and start coding smarter with AI assistance
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/downloads">
                <button className="px-8 py-4 bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0] text-white rounded-lg font-semibold text-lg transition-colors">
                  Download CodaiPro
                </button>
              </a>
              <a href="/try-now">
                <button className="px-8 py-4 border-2 border-[var(--gh-border-default)] hover:border-[var(--gh-accent-emphasis)] rounded-lg font-semibold text-lg transition-colors">
                  Try Online IDE
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
