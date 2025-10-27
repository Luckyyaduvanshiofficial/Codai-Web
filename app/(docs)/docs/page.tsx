'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Search, 
  Zap, 
  Code2, 
  Download, 
  Settings, 
  Puzzle,
  FileText,
  ChevronRight,
  Github,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocsHomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickStart = [
    {
      icon: Download,
      title: 'Installation',
      description: 'Get started by installing CodaiPro on your system',
      href: '/docs/installation',
    },
    {
      icon: Zap,
      title: 'Quick Start',
      description: 'Learn the basics and start coding in 5 minutes',
      href: '/docs/quick-start',
    },
    {
      icon: Code2,
      title: 'Core Concepts',
      description: 'Understand how CodaiPro works under the hood',
      href: '/docs/concepts',
    },
  ];

  const sections = [
    {
      title: 'Getting Started',
      icon: BookOpen,
      items: [
        { title: 'Introduction', href: '/docs/introduction' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Quick Start Guide', href: '/docs/quick-start' },
        { title: 'Configuration', href: '/docs/configuration' },
      ],
    },
    {
      title: 'Features',
      icon: Zap,
      items: [
        { title: 'AI Code Generation', href: '/docs/features/code-generation' },
        { title: 'Code Explanation', href: '/docs/features/explanation' },
        { title: 'Debugging Assistant', href: '/docs/features/debugging' },
        { title: 'Multi-Language Support', href: '/docs/features/languages' },
      ],
    },
    {
      title: 'Configuration',
      icon: Settings,
      items: [
        { title: 'Settings Overview', href: '/docs/config/overview' },
        { title: 'Model Configuration', href: '/docs/config/models' },
        { title: 'Keyboard Shortcuts', href: '/docs/config/shortcuts' },
        { title: 'Themes', href: '/docs/config/themes' },
      ],
    },
    {
      title: 'Extensions',
      icon: Puzzle,
      items: [
        { title: 'VS Code Extension', href: '/docs/extensions/vscode' },
        { title: 'Chrome Extension', href: '/docs/extensions/chrome' },
        { title: 'API Reference', href: '/docs/extensions/api' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Code2 className="w-10 h-10 text-purple-600" />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CodaiPro
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Documentation
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Everything you need to master CodaiPro - from installation to advanced features
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-purple-500 dark:focus:border-purple-600"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Start Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStart.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-semibold">
                      Read more
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Browse Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + sectionIndex * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                        >
                          <FileText className="w-4 h-4 opacity-50" />
                          {item.title}
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-8">
                <Github className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Open Source
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  CodaiPro is open source. Contribute, customize, or learn from the code.
                </p>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/Luckyyaduvanshiofficial/Codai" target="_blank">
                    View on GitHub
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <MessageSquare className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Need Help?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Join our community or reach out for support and assistance.
                </p>
                <Button variant="outline">
                  Get Support
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
