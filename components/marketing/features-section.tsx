'use client';

import { Code, Zap, Shield, Wifi, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Assistance',
    description: 'Get intelligent code suggestions, explanations, and debugging help powered by advanced AI models.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Wifi,
    title: '100% Offline',
    description: 'Work anywhere without internet. All AI processing happens locally on your machine.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Code,
    title: 'Multi-Language Support',
    description: 'Support for 20+ programming languages including Python, JavaScript, Java, C++, and more.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with instant responses and minimal resource usage.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your code never leaves your machine. Complete privacy and security guaranteed.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: Globe,
    title: 'Perfect for Students',
    description: 'Ideal for learning and exam preparation where internet access may be restricted.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Why Choose CodaiPro?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to code smarter, faster, and more efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-purple-500/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
