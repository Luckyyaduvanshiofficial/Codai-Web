'use client';

import { Code, Zap, Shield, Wifi, Globe, Sparkles, Lock, Rocket, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Lock,
    title: 'Privacy You Can Verify',
    description: 'No telemetry. No tracking. No cloud uploads. Every byte of your code stays on your hard drive. We can\'t see your code because we designed it not to leave.',
    microcopy: 'Zero cloud. Zero compromise.',
    color: 'text-[#0969da]',
    bgColor: 'bg-[#0969da]/10',
    borderColor: 'border-[#0969da]/30 hover:border-[#0969da]',
    highlight: true,
  },
  {
    icon: Wifi,
    title: 'Works in Airplane Mode',
    description: 'Code on a flight, in a remote cabin, or during a campus internet outage. CodaiPro runs locally—no connection required.',
    microcopy: 'Your code doesn\'t need WiFi to be brilliant.',
    color: 'text-[#2da44e]',
    bgColor: 'bg-[#2da44e]/10',
    borderColor: 'border-[#2da44e]/20 hover:border-[#2da44e]',
  },
  {
    icon: Rocket,
    title: 'Speed Without Compromise',
    description: 'No API round-trips means instant responses. Your workflow never waits for a server. Fast enough to keep up with your thoughts.',
    microcopy: 'No network latency. Pure local speed.',
    color: 'text-[#bf8700]',
    bgColor: 'bg-[#bf8700]/10',
    borderColor: 'border-[#bf8700]/20 hover:border-[#bf8700]',
  },
  {
    icon: Code,
    title: 'Speaks Every Language',
    description: 'From Python to Rust, JavaScript to Go—20+ languages supported. Same powerful model, every syntax you write.',
    microcopy: 'One assistant. Every language.',
    color: 'text-[#8250df]',
    bgColor: 'bg-[#8250df]/10',
    borderColor: 'border-[#8250df]/20 hover:border-[#8250df]',
  },
  {
    icon: GraduationCap,
    title: 'Built for Students',
    description: 'Perfect for CS students, bootcamp learners, and self-taught developers. No internet? No problem. Learn anywhere—even in computer labs with restricted access.',
    microcopy: 'The AI that works when the internet doesn\'t.',
    color: 'text-[#d29922]',
    bgColor: 'bg-[#d29922]/10',
    borderColor: 'border-[#d29922]/20 hover:border-[#d29922]',
  },
  {
    icon: Sparkles,
    title: 'Code, Debug, Explain',
    description: 'Generate code, find bugs, get explanations—powered by local AI. Everything you need to code smarter, from a tool that lives on your machine.',
    microcopy: 'Your personal coding tutor. Always available.',
    color: 'text-[#cf222e]',
    bgColor: 'bg-[#cf222e]/10',
    borderColor: 'border-[#cf222e]/20 hover:border-[#cf222e]',
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1f2328] dark:text-[#e6edf3]">
            Built for a different kind of developer
          </h2>
          <p className="text-xl text-[#656d76] dark:text-[#7d8590] max-w-3xl mx-auto">
            For those who value privacy, speed, and control over convenience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full border-2 ${feature.borderColor} bg-white dark:bg-[#161b22] transition-all duration-300 hover:shadow-lg ${feature.highlight ? 'ring-2 ring-[#0969da]/30 shadow-md' : ''}`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-[#1f2328] dark:text-[#e6edf3]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-[#656d76] dark:text-[#7d8590] mb-3">
                    {feature.description}
                  </CardDescription>
                  <p className="text-sm font-medium text-[#1f2328] dark:text-[#e6edf3] italic">
                    {feature.microcopy}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
