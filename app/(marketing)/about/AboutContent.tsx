'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink, Heart, Users, Target, Zap, Globe, Award, Code, BookOpen } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { icon: Users, label: 'Active Users', value: '100K+' },
  { icon: Globe, label: 'Countries', value: '50+' },
  { icon: Code, label: 'Lines of Code Assisted', value: '1M+' },
  { icon: Award, label: 'User Rating', value: '4.8/5' },
];

const values = [
  {
    icon: Heart,
    title: 'Student First',
    description: 'Built specifically for students and learners. Every feature is designed with education in mind.',
  },
  {
    icon: Zap,
    title: 'Offline by Design',
    description: 'Works completely without internet. Perfect for lab exams, restricted networks, and remote areas.',
  },
  {
    icon: Users,
    title: 'Open Source',
    description: 'Free and open-source under MIT License. Community-driven development and complete transparency.',
  },
  {
    icon: Target,
    title: 'Privacy Focused',
    description: 'Your code never leaves your machine. Zero data collection, zero tracking, complete privacy.',
  },
];

const timeline = [
  {
    id: 'idea-2023',
    year: '2023',
    title: 'The Idea',
    description: 'Born from the frustration of not having AI assistance during university lab exams.',
  },
  {
    id: 'first-release-2024',
    year: '2024',
    title: 'First Release',
    description: 'CodaiPro v1.0 launched with basic offline AI capabilities. Initial community response exceeded expectations.',
  },
  {
    id: 'production-ready-2024',
    year: '2024',
    title: 'Production Ready',
    description: 'Version 2.0 released with CustomTkinter UI, FastAPI backend, and multi-language support.',
  },
  {
    id: 'enhanced-stability-2024',
    year: '2024',
    title: 'Enhanced Stability',
    description: 'Version 2.1 with improved single-instance protection, better performance, and expanded features.',
  },
  {
    id: 'global-impact-2025',
    year: '2025',
    title: 'Global Impact',
    description: '100K+ downloads, 50+ countries, adopted by universities worldwide.',
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-[var(--gh-canvas-default)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-default)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--gh-border-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--gh-border-muted)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--gh-fg-default)]">
              About CodaiPro
            </h1>
            <p className="text-xl md:text-2xl text-[var(--gh-fg-muted)] max-w-3xl mx-auto mb-4">
              Empowering students and developers worldwide with accessible, offline AI-powered coding assistance
            </p>
            <p className="text-lg text-[var(--gh-fg-muted)] max-w-2xl mx-auto">
              Created by <strong className="text-[var(--gh-accent-fg)]">Lucky Yaduvanshi</strong>, 
              a computer science student passionate about making AI tools accessible to everyone
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--gh-accent-subtle)] mb-4">
                  <stat.icon className="w-6 h-6 text-[var(--gh-accent-fg)]" />
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

      {/* Version Info Section */}
      <section className="py-12 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-[var(--gh-border-default)] bg-gradient-to-br from-[var(--gh-accent-subtle)] to-[var(--gh-canvas-default)]">
              <CardHeader>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <CardTitle className="text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                      <Code className="w-6 h-6 text-[var(--gh-accent-fg)]" />
                      Current Version
                    </CardTitle>
                    <CardDescription className="text-base">
                      Latest stable release of CodaiPro Desktop
                    </CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[var(--gh-accent-fg)] mb-2">
                      v2.1
                    </div>
                    <div className="text-sm text-[var(--gh-fg-muted)]">
                      Released December 2024
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/downloads">
                      <Button className="bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90 w-full">
                        Download Now
                      </Button>
                    </Link>
                    <Link href="https://github.com/Luckyyaduvanshiofficial/codaipro/releases" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">
                        View Release Notes
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 text-[var(--gh-success-fg)]" />
                    <div>
                      <div className="font-medium text-[var(--gh-fg-default)]">Enhanced Stability</div>
                      <div className="text-[var(--gh-fg-muted)]">Improved single-instance protection</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 mt-0.5 text-[var(--gh-success-fg)]" />
                    <div>
                      <div className="font-medium text-[var(--gh-fg-default)]">Multi-Language</div>
                      <div className="text-[var(--gh-fg-muted)]">Python, Java, C++, JavaScript & more</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 mt-0.5 text-[var(--gh-success-fg)]" />
                    <div>
                      <div className="font-medium text-[var(--gh-fg-default)]">Performance</div>
                      <div className="text-[var(--gh-fg-muted)]">Faster response, better accuracy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-[var(--gh-fg-default)]">Our Story</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-[var(--gh-fg-muted)] mb-6">
                CodaiPro was born from a simple frustration: during crucial university lab exams and coding competitions, 
                when students need help the most, traditional AI coding assistants are unavailable because they require 
                internet access.
              </p>
              <p className="text-lg text-[var(--gh-fg-muted)] mb-6">
                As a computer science student, I experienced this firsthand. Lab environments often have restricted or 
                no internet access, and existing AI tools like ChatGPT, GitHub Copilot, and others simply won't work. 
                Students are left struggling with complex algorithms and debugging issues without the modern tools they've 
                come to rely on.
              </p>
              <p className="text-lg text-[var(--gh-fg-muted)] mb-6">
                That's when the idea for CodaiPro was born: <strong>What if we could bring powerful AI coding assistance 
                directly to students' machines, with zero internet dependency?</strong>
              </p>
              <p className="text-lg text-[var(--gh-fg-muted)]">
                Today, CodaiPro has grown beyond my initial vision. With over 100,000 downloads across 50+ countries, 
                it's being used by students worldwide in university labs, coding competitions, and learning environments. 
                It's completely free, open-source, and will always remain that way.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">Our Values</h2>
            <p className="text-xl text-[var(--gh-fg-muted)] max-w-2xl mx-auto">
              These principles guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-[var(--gh-accent-subtle)] flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-[var(--gh-accent-fg)]" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">Our Journey</h2>
            <p className="text-xl text-[var(--gh-fg-muted)]">
              From idea to global impact
            </p>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[var(--gh-accent-emphasis)] text-white flex items-center justify-center font-bold text-sm">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-bold mb-2 text-[var(--gh-fg-default)]">{item.title}</h3>
                  <p className="text-[var(--gh-fg-muted)]">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-[var(--gh-fg-default)]">Meet the Creator</h2>
            <p className="text-xl text-[var(--gh-fg-muted)]">
              Building tools that make a difference
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0969da] to-[#1f6feb] flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                    LY
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <CardTitle className="text-3xl mb-2">Lucky Yaduvanshi</CardTitle>
                    <CardDescription className="text-lg mb-4">
                      Creator & Lead Developer | Open Source Enthusiast
                    </CardDescription>
                    <p className="text-[var(--gh-fg-muted)] mb-4 leading-relaxed">
                      Computer Science student and full-stack developer passionate about making AI-powered tools 
                      accessible to everyone. Creator of <strong>CodaiPro</strong>, <strong>ProWriter</strong>, 
                      and multiple open-source projects used by thousands of students worldwide.
                    </p>
                    <div className="mb-6 p-4 bg-[var(--gh-canvas-default)] rounded-lg border border-[var(--gh-border-default)]">
                      <h4 className="font-semibold text-[var(--gh-fg-default)] mb-3">Key Achievements</h4>
                      <ul className="space-y-2 text-sm text-[var(--gh-fg-muted)] text-left">
                        <li className="flex items-start gap-2">
                          <Award className="w-4 h-4 mt-0.5 text-[var(--gh-accent-fg)] flex-shrink-0" />
                          <span><strong>100K+ Downloads</strong> - CodaiPro adopted by students in 50+ countries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Code className="w-4 h-4 mt-0.5 text-[var(--gh-accent-fg)] flex-shrink-0" />
                          <span><strong>Full-Stack Developer</strong> - Python, JavaScript/TypeScript, React, Next.js, FastAPI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Globe className="w-4 h-4 mt-0.5 text-[var(--gh-accent-fg)] flex-shrink-0" />
                          <span><strong>Open Source Contributor</strong> - Building tools that solve real-world problems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 mt-0.5 text-[var(--gh-accent-fg)] flex-shrink-0" />
                          <span><strong>AI Integration Expert</strong> - Offline AI models, SambaNova API, OpenAI integration</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-[var(--gh-fg-default)] mb-3">Projects</h4>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-[var(--gh-accent-subtle)] text-[var(--gh-accent-fg)] rounded-full text-sm font-medium">
                          CodaiPro v2.1
                        </span>
                        <span className="px-3 py-1 bg-[var(--gh-success-subtle)] text-[var(--gh-success-fg)] rounded-full text-sm font-medium">
                          ProWriter
                        </span>
                        <span className="px-3 py-1 bg-[var(--gh-attention-subtle)] text-[var(--gh-attention-fg)] rounded-full text-sm font-medium">
                          Lucky Labs
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Link href="https://github.com/Luckyyaduvanshiofficial" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href="https://linkedin.com/in/luckyyaduvanshi" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                      <Link href="mailto:lucky@luckylabs.tech">
                        <Button variant="outline" size="sm">
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-[var(--gh-fg-default)]">Our Mission</h2>
            <p className="text-2xl text-[var(--gh-fg-muted)] mb-12 leading-relaxed">
              "Making AI-powered coding assistance available to everyone, everywhere - regardless of internet connectivity, 
              financial resources, or geographic location."
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/downloads">
                <Button size="lg" className="bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90">
                  Download CodaiPro
                </Button>
              </Link>
              <Link href="https://github.com/Luckyyaduvanshiofficial/codaipro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 text-[var(--gh-fg-default)]">Join Our Community</h2>
            <p className="text-xl text-[var(--gh-fg-muted)] mb-12 max-w-2xl mx-auto">
              CodaiPro is built by the community, for the community. Join us in making coding education accessible to everyone.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-[var(--gh-border-default)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="w-8 h-8 text-[var(--gh-accent-fg)] mb-2" />
                  <CardTitle>Contribute</CardTitle>
                  <CardDescription>Help us improve CodaiPro with code, docs, or ideas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="https://github.com/Luckyyaduvanshiofficial/codaipro" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Start Contributing
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-[var(--gh-border-default)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-8 h-8 text-[var(--gh-accent-fg)] mb-2" />
                  <CardTitle>Discuss</CardTitle>
                  <CardDescription>Join discussions, ask questions, share experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="https://github.com/Luckyyaduvanshiofficial/codaipro/discussions" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Join Discussions
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-[var(--gh-border-default)] hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Mail className="w-8 h-8 text-[var(--gh-accent-fg)] mb-2" />
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>Get notified about new releases and features</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="https://github.com/Luckyyaduvanshiofficial/codaipro" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full">
                      Watch on GitHub
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
