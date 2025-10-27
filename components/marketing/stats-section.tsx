'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Shield, Users } from 'lucide-react';

export function StatsSection() {
  const stats = [
    { icon: Users, value: '100K+', label: 'Active Users', color: 'text-[#0969da] dark:text-[#4493f8]' },
    { icon: Code2, value: '20+', label: 'Languages', color: 'text-[#2da44e] dark:text-[#3fb950]' },
    { icon: Zap, value: '5M+', label: 'Lines of Code', color: 'text-[#bf8700] dark:text-[#d29922]' },
    { icon: Shield, value: '100%', label: 'Privacy', color: 'text-[#8250df] dark:text-[#a371f7]' },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0d1117] border-y border-[#d0d7de] dark:border-[#30363d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-[#f6f8fa] dark:bg-[#161b22] rounded-xl border border-[#d0d7de] dark:border-[#30363d] group-hover:border-[#0969da] dark:group-hover:border-[#4493f8] transition-all duration-200"
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </motion.div>
              <motion.h3
                className="text-4xl font-bold text-[#1f2328] dark:text-[#e6edf3] mb-2"
                whileHover={{ scale: 1.05 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-sm text-[#656d76] dark:text-[#7d8590] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
