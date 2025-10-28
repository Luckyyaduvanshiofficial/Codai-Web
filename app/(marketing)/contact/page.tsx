'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MessageSquare, Github, Linkedin, Globe, MapPin, Phone, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Send us an email anytime',
    value: 'lucky@luckylabs.tech',
    link: 'mailto:lucky@luckylabs.tech',
    primary: true,
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Report issues or contribute',
    value: '@Luckyyaduvanshiofficial',
    link: 'https://github.com/Luckyyaduvanshiofficial',
  },
  {
    icon: MessageSquare,
    title: 'Discussions',
    description: 'Join community discussions',
    value: 'GitHub Discussions',
    link: 'https://github.com/Luckyyaduvanshiofficial/codaipro/discussions',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    description: 'Connect professionally',
    value: 'Lucky Yaduvanshi',
    link: 'https://linkedin.com/in/luckyyaduvanshi',
  },
];

const supportTopics = [
  {
    icon: AlertCircle,
    title: 'Bug Reports',
    description: 'Found a bug? Let us know',
    action: 'Report on GitHub',
    link: 'https://github.com/Luckyyaduvanshiofficial/codaipro/issues/new?template=bug_report.md',
  },
  {
    icon: MessageSquare,
    title: 'Feature Request',
    description: 'Have an idea? Share it with us',
    action: 'Suggest Feature',
    link: 'https://github.com/Luckyyaduvanshiofficial/codaipro/issues/new?template=feature_request.md',
  },
  {
    icon: Globe,
    title: 'General Support',
    description: 'Questions about CodaiPro',
    action: 'Ask Community',
    link: 'https://github.com/Luckyyaduvanshiofficial/codaipro/discussions',
  },
];

const officeInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Usually within 24-48 hours',
  },
  {
    icon: Mail,
    label: 'Business Email',
    value: 'lucky@luckylabs.tech',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => {
        timeoutRef.current = setTimeout(resolve, 1500);
      });
      
      // For now, we'll just show success and open email client
      const mailtoLink = `mailto:lucky@luckylabs.tech?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      // Set success state and reset form before navigation
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Open email client after a brief delay to ensure state updates are visible
      timeoutRef.current = setTimeout(() => {
        window.location.href = mailtoLink;
        // Reset success message after navigation
        timeoutRef.current = setTimeout(() => {
          setStatus('idle');
          timeoutRef.current = null;
        }, 3000);
      }, 500);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try emailing us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-[var(--gh-fg-muted)] max-w-3xl mx-auto">
              Have questions, feedback, or need support? We're here to help!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[var(--gh-fg-default)]">Contact Methods</h2>
            <p className="text-lg text-[var(--gh-fg-muted)]">
              Choose your preferred way to reach us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={method.link} target="_blank" rel="noopener noreferrer">
                  <Card className={`h-full hover:shadow-lg transition-all border-[var(--gh-border-default)] ${
                    method.primary ? 'bg-gradient-to-br from-[var(--gh-accent-subtle)] to-[var(--gh-canvas-default)] border-[var(--gh-accent-muted)]' : 'bg-[var(--gh-canvas-subtle)]'
                  } hover:scale-105`}>
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                        method.primary ? 'bg-[var(--gh-accent-emphasis)]' : 'bg-[var(--gh-accent-subtle)]'
                      }`}>
                        <method.icon className={`w-6 h-6 ${method.primary ? 'text-white' : 'text-[var(--gh-accent-fg)]'}`} />
                      </div>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-medium text-[var(--gh-fg-default)]">{method.value}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[var(--gh-fg-default)]">Send Us a Message</h2>
            <p className="text-lg text-[var(--gh-fg-muted)]">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-[var(--gh-border-default)] bg-[var(--gh-canvas-default)]">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-[var(--gh-canvas-subtle)]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[var(--gh-canvas-subtle)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-[var(--gh-canvas-subtle)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your question or feedback..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-[var(--gh-canvas-subtle)] resize-none"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-[var(--gh-success-subtle)] border border-[var(--gh-success-muted)] rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-[var(--gh-success-fg)]" />
                      <p className="text-sm text-[var(--gh-success-fg)]">
                        Opening your email client... Please send the message to complete your request.
                      </p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-[var(--gh-danger-subtle)] border border-[var(--gh-danger-muted)] rounded-lg">
                      <AlertCircle className="w-5 h-5 text-[var(--gh-danger-fg)]" />
                      <p className="text-sm text-[var(--gh-danger-fg)]">
                        {errorMessage || 'Failed to send message. Please try again.'}
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-[var(--gh-accent-emphasis)] hover:bg-[var(--gh-accent-emphasis)]/90"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-center text-[var(--gh-fg-muted)]">
                    We typically respond within 24-48 hours
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Support Topics Section */}
      <section className="py-24 border-b border-[var(--gh-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[var(--gh-fg-default)]">Quick Support</h2>
            <p className="text-lg text-[var(--gh-fg-muted)]">
              Need specific help? Jump directly to the right place
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)] hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-[var(--gh-accent-subtle)] flex items-center justify-center mb-4">
                      <topic.icon className="w-6 h-6 text-[var(--gh-accent-fg)]" />
                    </div>
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                    <CardDescription className="text-base">{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={topic.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        {topic.action}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Info Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-[var(--gh-fg-default)]">Contact Information</h2>
            <p className="text-lg text-[var(--gh-fg-muted)]">
              Additional ways to reach Lucky Labs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {officeInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center border-[var(--gh-border-default)] bg-[var(--gh-canvas-subtle)]">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--gh-accent-subtle)] mb-4 mx-auto">
                      <info.icon className="w-6 h-6 text-[var(--gh-accent-fg)]" />
                    </div>
                    <CardTitle className="text-lg">{info.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--gh-fg-muted)]">{info.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
