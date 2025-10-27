'use client';

import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    university: 'MIT',
    content: 'CodaiPro has been a game-changer for my studies. Being able to work offline during exams and get AI assistance is incredible!',
    avatar: '👩‍💻',
  },
  {
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    university: 'Stanford University',
    content: 'The privacy-first approach is exactly what I needed. My code stays on my machine, and the AI is surprisingly powerful.',
    avatar: '👨‍💻',
  },
  {
    name: 'Priya Patel',
    role: 'Data Science Student',
    university: 'UC Berkeley',
    content: 'Perfect for learning Python and data analysis. The offline capability means I can code anywhere, even on flights!',
    avatar: '👩‍🔬',
  },
  {
    name: 'Alex Rivera',
    role: 'Software Engineering Student',
    university: 'Carnegie Mellon',
    content: 'Best coding assistant for students. The student pricing is affordable and the features rival expensive cloud alternatives.',
    avatar: '👨‍🎓',
  },
  {
    name: 'Emily Wang',
    role: 'Web Developer',
    university: 'Harvard University',
    content: 'Lightning fast and works perfectly offline. I use it for all my web development projects now.',
    avatar: '👩‍🎨',
  },
  {
    name: 'David Kim',
    role: 'Mobile App Developer',
    university: 'Georgia Tech',
    content: 'The multi-language support is outstanding. I switch between Java, Kotlin, and Swift seamlessly.',
    avatar: '👨‍🔧',
  },
];

export function TestimonialsSection() {
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
            Loved by Students & Developers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See what our users have to say about CodaiPro
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-purple-500 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-400">
                        {testimonial.university}
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
