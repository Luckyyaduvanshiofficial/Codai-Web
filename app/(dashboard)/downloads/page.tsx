'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Github, Package, Puzzle, BookOpen, Zap, ExternalLink, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const mainDownloads = [
  {
    icon: Download,
    title: 'CodaiPro v2.1 - Portable',
    description: 'Ready-to-use portable executable. Perfect for lab environments and USB drives.',
    version: 'v2.1',
    size: '~2 GB',
    platform: 'Windows 10/11',
    downloadUrl: 'https://github.com/Luckyyaduvanshiofficial/Codai/releases',
    badge: 'Recommended',
    badgeColor: 'bg-green-500',
  },
  {
    icon: Package,
    title: 'Windows Installer Setup',
    description: 'Traditional installer with automatic updates and desktop shortcuts.',
    version: 'v2.1',
    size: '~2 GB',
    platform: 'Windows 10/11',
    downloadUrl: 'https://github.com/Luckyyaduvanshiofficial/Codai/releases',
    badge: 'Popular',
    badgeColor: 'bg-purple-500',
  },
];

const extensions = [
  {
    icon: Puzzle,
    title: 'VS Code Extension',
    description: 'Integrate CodaiPro directly into Visual Studio Code for seamless coding.',
    downloadUrl: '#',
    status: 'Coming Soon',
  },
  {
    icon: Puzzle,
    title: 'Chrome Extension',
    description: 'Browser extension for quick code assistance while browsing documentation.',
    downloadUrl: '#',
    status: 'Coming Soon',
  },
];

const resources = [
  {
    icon: Github,
    title: 'Source Code',
    description: 'Build from source, contribute, or customize CodaiPro for your needs.',
    downloadUrl: 'https://github.com/Luckyyaduvanshiofficial/Codai',
    buttonText: 'View on GitHub',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Complete guides, API references, and tutorials for CodaiPro.',
    downloadUrl: '/docs',
    buttonText: 'Read Docs',
  },
  {
    icon: Zap,
    title: 'Quick Start Guide',
    description: 'Get started with CodaiPro in under 5 minutes with our interactive guide.',
    downloadUrl: '#',
    buttonText: 'Quick Start',
  },
];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[var(--gh-canvas-default)] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--gh-fg-default)]">
            Download CodaiPro
          </h1>
          <p className="text-xl text-[var(--gh-fg-muted)] max-w-3xl mx-auto mb-8">
            100% offline AI coding assistant. No internet, no subscriptions, no limits. Perfect for students and developers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--gh-fg-muted)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>100K+ Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Works Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Free & Open Source</span>
            </div>
          </div>
        </motion.div>

        {/* Main Downloads */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--gh-fg-default)]">Choose Your Version</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mainDownloads.map((download, index) => (
              <motion.div
                key={download.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-[var(--gh-accent-emphasis)] relative overflow-hidden group bg-[var(--gh-canvas-subtle)]">
                  {download.badge && (
                    <div className={`absolute top-4 right-4 ${download.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {download.badge}
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 rounded-xl bg-[var(--gh-accent-emphasis)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <download.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{download.title}</CardTitle>
                    <CardDescription className="text-base">{download.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-[var(--gh-fg-muted)]">
                      <div>
                        <span className="font-semibold">Version:</span> {download.version}
                      </div>
                      <div>
                        <span className="font-semibold">Size:</span> {download.size}
                      </div>
                    </div>
                    <div className="text-sm text-[var(--gh-fg-muted)]">
                      <span className="font-semibold">Platform:</span> {download.platform}
                    </div>
                    <a href={download.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90 text-lg py-6">
                        <Download className="mr-2 h-5 w-5" />
                        Download Now
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extensions Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--gh-fg-default)]">Extensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {extensions.map((ext, index) => (
              <motion.div
                key={ext.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <ext.icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{ext.title}</CardTitle>
                        {ext.status && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{ext.status}</span>
                        )}
                      </div>
                    </div>
                    <CardDescription className="mt-2">{ext.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--gh-fg-default)]">Resources & Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                      <resource.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={resource.downloadUrl}>
                      <Button variant="outline" className="w-full">
                        {resource.buttonText}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="bg-[var(--gh-canvas-subtle)] border-2 border-[var(--gh-border-default)]">
            <CardHeader>
              <CardTitle className="text-2xl">System Requirements</CardTitle>
              <CardDescription>Make sure your system meets these requirements</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[var(--gh-accent-fg)]">Minimum Requirements</h3>
                <ul className="space-y-2 text-[var(--gh-fg-default)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Windows 10 (64-bit) or later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span>4 GB RAM minimum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span>2 GB free disk space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Intel/AMD x64 processor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span>Python 3.11+ (for source installation)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[var(--gh-accent-fg)]">Recommended</h3>
                <ul className="space-y-2 text-[var(--gh-fg-default)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gh-accent-emphasis)] mt-0.5 shrink-0" />
                    <span>Windows 11 (64-bit)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gh-accent-emphasis)] mt-0.5 shrink-0" />
                    <span>8 GB RAM or more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gh-accent-emphasis)] mt-0.5 shrink-0" />
                    <span>4 GB free disk space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gh-accent-emphasis)] mt-0.5 shrink-0" />
                    <span>Multi-core processor (4+ cores)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[var(--gh-accent-emphasis)] mt-0.5 shrink-0" />
                    <span>SSD for faster performance</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Try Cloud IDE CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-block p-8 rounded-2xl bg-[var(--gh-canvas-subtle)] border-2 border-[var(--gh-border-default)]">
            <p className="text-xl text-[var(--gh-fg-default)] mb-6 font-semibold">
              Want to try before downloading?
            </p>
            <Link href="/try-now">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Zap className="mr-2 h-5 w-5" />
                Try Cloud IDE - No Download Required
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
