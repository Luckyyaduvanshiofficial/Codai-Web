'use client';

import Link from 'next/link';
import { Code2, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Try Now', href: '/try-now' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Community', href: '/community' },
      { label: 'Support', href: '/support' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'License', href: '/license' },
    ],
  };

  return (
    <footer className="bg-[#f6f8fa] dark:bg-[#0d1117] border-t border-[#d0d7de] dark:border-[#30363d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0969da] dark:bg-[#4493f8] rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1f2328] dark:text-[#e6edf3]">CodaiPro</span>
            </Link>
            <p className="text-sm text-[#656d76] dark:text-[#7d8590] mb-4">
              AI-powered coding assistant for everyone. Code smarter, offline.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:support@codai.pro" className="text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#1f2328] dark:text-[#e6edf3]">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#1f2328] dark:text-[#e6edf3]">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#1f2328] dark:text-[#e6edf3]">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#1f2328] dark:text-[#e6edf3]">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#656d76] dark:text-[#7d8590] hover:text-[#0969da] dark:hover:text-[#4493f8] transition-colors duration-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#d0d7de] dark:border-[#30363d] pt-8 text-center text-sm text-[#656d76] dark:text-[#7d8590]">
          <p>&copy; {new Date().getFullYear()} CodaiPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
