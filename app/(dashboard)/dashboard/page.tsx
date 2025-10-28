'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, Sparkles, BookOpen, Zap, Download, ExternalLink,
  Award, FileCode, TrendingUp, Users, Globe, Check,
  GraduationCap, Github, MessageSquare, ArrowRight, Clock,
  Star, Activity, Calendar, Package
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { 
    label: 'Code Generated', 
    value: '1.2M+', 
    icon: Code2, 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20'
  },
  { 
    label: 'Active Users', 
    value: '100K+', 
    icon: Users, 
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20'
  },
  { 
    label: 'Countries', 
    value: '50+', 
    icon: Globe, 
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20'
  },
  { 
    label: 'Success Rate', 
    value: '98%', 
    icon: TrendingUp, 
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20'
  },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI Code Generation',
    description: 'Generate code in 20+ programming languages with state-of-the-art AI',
    badge: 'Popular',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: FileCode,
    title: 'Smart Debugging',
    description: 'Identify and fix bugs automatically with intelligent error analysis',
    badge: 'Pro',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    icon: BookOpen,
    title: 'Code Explanations',
    description: 'Understand complex algorithms and concepts with detailed explanations',
    badge: 'Free',
    badgeColor: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    icon: Zap,
    title: 'Offline Mode',
    description: 'Work without internet using our powerful desktop application',
    badge: 'Desktop',
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  },
  {
    icon: Code2,
    title: 'Code Refactoring',
    description: 'Improve code quality, performance, and maintainability automatically',
    badge: 'New',
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  },
  {
    icon: Award,
    title: 'Best Practices',
    description: 'Get recommendations following industry standards and patterns',
    badge: 'Pro',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
];

const quickLinks = [
  {
    icon: MessageSquare,
    title: 'Try AI Chat',
    description: 'Chat with our AI coding assistant',
    href: '/try-now',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Download,
    title: 'Download Desktop',
    description: 'Get the offline desktop app',
    href: '/downloads',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Read guides and tutorials',
    href: 'https://docs.codai.pro',
    external: true,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: Github,
    title: 'GitHub Repo',
    description: 'View source & contribute',
    href: 'https://github.com/Luckyyaduvanshiofficial/codaipro',
    external: true,
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-950/20',
  },
];

const recentActivity = [
  { icon: Star, text: 'CodaiPro v2.1 released with new features', time: '2 days ago', type: 'release' },
  { icon: Package, text: 'Desktop app updated to support M3 Macs', time: '1 week ago', type: 'update' },
  { icon: Users, text: '100K+ users milestone reached!', time: '2 weeks ago', type: 'milestone' },
  { icon: Sparkles, text: 'New AI model integration: Llama 3.1', time: '3 weeks ago', type: 'feature' },
];

function DashboardOverview() {
  return (
    <div className="min-h-screen bg-[var(--gh-canvas-default)]">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--gh-fg-default)] mb-2 flex items-center gap-3">
                Welcome to CodaiPro
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              </h1>
              <p className="text-lg text-[var(--gh-fg-muted)]">
                Your AI-powered coding companion. Start building amazing things today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/try-now">
                <Button size="lg" className="bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Try AI Chat
                </Button>
              </Link>
              <Link href="/downloads">
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border-[var(--gh-border-default)] bg-gradient-to-br ${stat.bgColor} hover:shadow-lg transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-[var(--gh-fg-default)] mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[var(--gh-fg-muted)]">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Features Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Features Grid */}
            <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                  Powerful Features
                </CardTitle>
                <CardDescription>
                  Everything you need to code smarter and faster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-default)] hover:shadow-md transition-all duration-200 h-full">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--gh-accent-subtle)] flex items-center justify-center">
                              <feature.icon className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                            </div>
                            <Badge className={`${feature.badgeColor} border-0 text-xs font-semibold`}>
                              {feature.badge}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-[var(--gh-fg-default)] mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-[var(--gh-fg-muted)] leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Link 
                        href={link.href} 
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        <Card className={`border-[var(--gh-border-default)] ${link.bg} hover:shadow-md transition-all duration-200 cursor-pointer group`}>
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`w-10 h-10 rounded-lg ${link.bg} border border-[var(--gh-border-default)] flex items-center justify-center`}>
                                  <link.icon className={`w-5 h-5 ${link.color}`} />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-[var(--gh-fg-default)] mb-1 group-hover:text-[var(--gh-accent-fg)] transition-colors">
                                    {link.title}
                                  </h3>
                                  <p className="text-sm text-[var(--gh-fg-muted)]">
                                    {link.description}
                                  </p>
                                </div>
                              </div>
                              {link.external && (
                                <ExternalLink className="w-4 h-4 text-[var(--gh-fg-muted)] flex-shrink-0" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Offer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-7 h-7 text-green-600 dark:text-green-400" />
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
                      Students Get Pro FREE!
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--gh-fg-default)] mb-4 leading-relaxed">
                    Unlock all premium features completely free while you're studying. No credit card required!
                  </p>
                  <ul className="text-sm space-y-2.5 text-[var(--gh-fg-muted)] mb-5">
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Unlimited AI requests</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Priority processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Advanced code analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span>Learning certificates</span>
                    </li>
                  </ul>
                  <Link href="/students">
                    <Button className="w-full bg-green-600 hover:bg-green-700 shadow-md text-white">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Claim Free Access
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-[var(--gh-fg-muted)] mt-3 font-semibold">
                    💰 Save $120/year • Verify with GitHub Student
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-[var(--gh-border-default)] last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-lg bg-[var(--gh-accent-subtle)] flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-[var(--gh-accent-fg)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--gh-fg-default)] font-medium mb-1">
                          {activity.text}
                        </p>
                        <p className="text-xs text-[var(--gh-fg-muted)] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Desktop App Promo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Work Offline
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--gh-fg-default)] mb-4 leading-relaxed">
                    Download our desktop app and code anywhere, even without internet!
                  </p>
                  <ul className="text-sm space-y-2.5 text-[var(--gh-fg-muted)] mb-5">
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span>100% offline AI assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span>Lightning fast responses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span>Support for 20+ languages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span>Perfect for exams & labs</span>
                    </li>
                  </ul>
                  <Link href="/downloads">
                    <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                      <Download className="w-4 h-4 mr-2" />
                      Download Free (v2.1)
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

const quickExamples = [
  { icon: '🐍', text: 'Python sorting algorithm', prompt: 'Write a Python function to sort a list using quicksort algorithm' },
  { icon: '⚛️', text: 'React component', prompt: 'Create a React component with useState hook for a todo list' },
  { icon: '🟢', text: 'Node.js API', prompt: 'Write a Node.js Express REST API endpoint for user authentication' },
  { icon: '🎨', text: 'CSS animation', prompt: 'Create a CSS keyframe animation for a bouncing ball effect' },
  { icon: '🔧', text: 'Debug code', prompt: 'Help me debug this code and explain the issue' },
];

const capabilities = [
  { icon: '✨', title: 'Generate Code', desc: 'Any language, any complexity' },
  { icon: '🐛', title: 'Debug & Fix', desc: 'Find and fix errors instantly' },
  { icon: '📚', title: 'Explain Concepts', desc: 'Learn algorithms & patterns' },
  { icon: '🎯', title: 'Optimize', desc: 'Improve performance & style' },
  { icon: '🔄', title: 'Refactor', desc: 'Make code cleaner & better' },
  { icon: '📝', title: 'Document', desc: 'Add comments & docs' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--gh-canvas-default)] via-[var(--gh-canvas-subtle)] to-[var(--gh-canvas-default)]">
      <div className="max-w-[1800px] mx-auto p-4 md:p-6 lg:p-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--gh-fg-default)] mb-2">
                Welcome to CodaiPro 🚀
              </h1>
              <p className="text-[var(--gh-fg-muted)]">
                Your AI-powered coding workspace. Start coding smarter, not harder.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/downloads">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Desktop
                </Button>
              </Link>
              <Link href="/students">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  🎓 Get Pro Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-[var(--gh-canvas-subtle)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--gh-fg-muted)] mb-1">Languages</p>
                    <p className="text-2xl font-bold text-[var(--gh-fg-default)]">20+</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-[var(--gh-canvas-subtle)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--gh-fg-muted)] mb-1">AI Features</p>
                    <p className="text-2xl font-bold text-[var(--gh-fg-default)]">6+</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-[var(--gh-canvas-subtle)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--gh-fg-muted)] mb-1">Examples</p>
                    <p className="text-2xl font-bold text-[var(--gh-fg-default)]">5+</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <FileCode className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-[var(--gh-canvas-subtle)]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--gh-fg-muted)] mb-1">Status</p>
                    <p className="text-2xl font-bold text-[var(--gh-fg-default)]">Live</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content Area - Takes 2 columns */}
          <div className="lg:col-span-2">
            <DashboardOverview />
          </div>

          {/* Sidebar - Takes 1 column */}
          <div className="space-y-6">
            {/* Quick Start Examples */}
            <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)] shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[var(--gh-fg-default)] mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                  Quick Start Examples
                </h3>
                <div className="space-y-2">
                  {quickExamples.map((example, index) => (
                    <Link href="/try-now" key={index}>
                      <button
                        className="w-full text-left p-3 rounded-xl border border-[var(--gh-border-default)] hover:border-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-canvas-default)] transition-all duration-200 group"
                        onClick={() => {
                          // Store prompt in sessionStorage for try-now page to use
                          if (typeof window !== 'undefined') {
                            sessionStorage.setItem('codai-prompt', example.prompt);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl" role="img" aria-label={example.text}>
                            {example.icon}
                          </span>
                          <span className="text-sm font-medium group-hover:text-[var(--gh-accent-fg)] transition-colors">
                            {example.text}
                          </span>
                        </div>
                      </button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What I Can Do */}
            <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)] shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[var(--gh-fg-default)] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[var(--gh-accent-fg)]" />
                  What I Can Do
                </h3>
                <div className="space-y-3">
                  {capabilities.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-[var(--gh-fg-default)]">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--gh-fg-muted)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Offer */}
            <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                    Are You a Student?
                  </h3>
                </div>
                <p className="text-sm text-[var(--gh-fg-default)] mb-4">
                  Get <strong>Pro features FREE</strong> while you study!
                </p>
                <ul className="text-sm space-y-2 text-[var(--gh-fg-muted)] mb-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    Unlimited AI requests
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    Learning certificates
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    Advanced features
                  </li>
                </ul>
                <Link href="/students">
                  <Button className="w-full bg-green-600 hover:bg-green-700 shadow-md">
                    🎓 Claim Free Pro Access
                  </Button>
                </Link>
                <p className="text-xs text-center text-[var(--gh-fg-muted)] mt-3">
                  💰 Save $120/year • Verify with GitHub
                </p>
              </CardContent>
            </Card>

            {/* Desktop App Promo */}
            <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Offline Power
                  </h3>
                </div>
                <p className="text-sm text-[var(--gh-fg-default)] mb-4">
                  Work without internet! Download our desktop app:
                </p>
                <ul className="text-sm space-y-2 text-[var(--gh-fg-muted)] mb-4">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    100% offline AI
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    Lightning fast
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    20+ languages
                  </li>
                </ul>
                <Link href="/downloads">
                  <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
