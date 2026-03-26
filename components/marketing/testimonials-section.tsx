'use client';

import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Dev Patel',
    role: 'Indie Hacker',
    content: 'I replaced ChatGPT completely for local projects. No latency, no privacy concerns. I can work on proprietary code without worrying about it leaving my machine.',
    avatar: '👨‍💻',
  },
  {
    name: 'Sarah Lin',
    role: 'Founder @ DevTools Co',
    content: 'Our startup\'s proprietary algorithms never leave our machines. That\'s non-negotiable for us. CodaiPro is the only AI tool our team uses now.',
    avatar: '👩‍💼',
  },
  {
    name: 'Jordan M.',
    role: 'Bootcamp Student',
    content: 'During finals week, campus internet crawls. Every other AI tool is useless. CodaiPro works perfectly in airplane mode. Saved my Algorithms final.',
    avatar: '👨‍🎓',
  },
  {
    name: 'Marcus T.',
    role: 'Freelance Developer',
    content: 'Works flawlessly on client sites with restricted networks. The local model is surprisingly capable—I\'ve used it for debugging legacy code at bank IT systems.',
    avatar: '👨‍🔧',
  },
  {
    name: 'Emily R.',
    role: 'Self-Taught Developer',
    content: 'Learning to code in a rural area with spotty internet. CodaiPro made it possible to get AI help whenever I needed it—airplane mode is a game changer.',
    avatar: '👩‍🎨',
  },
  {
    name: 'Alex K.',
    role: 'Junior Developer',
    content: 'My first job involves legacy Fortran code nobody understands. CodaiPro helps me understand and refactor it without sending proprietary stuff to the cloud.',
    avatar: '👨‍💻',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1f2328] dark:text-[#e6edf3]">
            Loved by developers who value privacy
          </h2>
          <p className="text-xl text-[#656d76] dark:text-[#7d8590] max-w-3xl mx-auto">
            Real feedback from people who code offline, in restricted environments, and care about their data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-[#d0d7de] dark:border-[#30363d] hover:border-[#0969da] dark:hover:border-[#4493f8] transition-colors duration-300">
                <CardContent className="pt-6">
                  <Quote className="w-8 h-8 text-[#656d76] dark:text-[#7d8590] mb-4" />
                  <p className="text-[#1f2328] dark:text-[#e6edf3] mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-[#1f2328] dark:text-[#e6edf3]">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[#656d76] dark:text-[#7d8590]">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
