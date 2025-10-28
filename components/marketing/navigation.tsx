'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2, ChevronDown, Sparkles, PenTool, LayoutDashboard, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { GitHubStarButton } from '@/components/github-star-button';
import { useAuthState } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuthState();

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/downloads', label: 'Downloads' },
    { href: 'https://docs.codai.pro', label: 'Docs', external: true },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const products = [
    {
      name: 'CodaiPro',
      description: 'AI-Powered Offline Coding Assistant',
      href: '/',
      icon: Code2,
      gradient: 'from-purple-600 to-pink-600',
      external: false,
    },
    {
      name: 'ProWriter AI',
      description: 'Professional AI Blog Writer',
      href: 'https://prowriter.luckylabs.tech/',
      icon: PenTool,
      gradient: 'from-blue-600 to-cyan-600',
      external: true,
    },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md border-b border-[#d0d7de] dark:border-[#30363d] z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-[#0969da] dark:bg-[#4493f8] rounded-md flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#1f2328] dark:text-[#e6edf3]">
              CodaiPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-1.5 text-[#1f2328] dark:text-[#e6edf3] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] rounded-md transition-colors outline-none font-medium text-sm">
                Products
                <ChevronDown className="w-4 h-4 opacity-60" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-2">
                {products.map((product) => (
                  product.external ? (
                    <a key={product.href} href={product.href} target="_blank" rel="noopener noreferrer">
                      <DropdownMenuItem className="cursor-pointer p-3 rounded-md hover:bg-[#f6f8fa] dark:hover:bg-[#21262d]">
                        <div className={`w-10 h-10 rounded-md bg-[#0969da] dark:bg-[#4493f8] flex items-center justify-center mr-3`}>
                          <product.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-[#1f2328] dark:text-[#e6edf3]">{product.name}</div>
                          <div className="text-xs text-[#656d76] dark:text-[#7d8590]">{product.description}</div>
                        </div>
                      </DropdownMenuItem>
                    </a>
                  ) : (
                    <Link key={product.href} href={product.href}>
                      <DropdownMenuItem className="cursor-pointer p-3 rounded-md hover:bg-[#f6f8fa] dark:hover:bg-[#21262d]">
                        <div className={`w-10 h-10 rounded-md bg-[#0969da] dark:bg-[#4493f8] flex items-center justify-center mr-3`}>
                          <product.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-[#1f2328] dark:text-[#e6edf3]">{product.name}</div>
                          <div className="text-xs text-[#656d76] dark:text-[#7d8590]">{product.description}</div>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  )
                ))}
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="cursor-pointer text-sm text-[#0969da] dark:text-[#4493f8] font-medium rounded-md">
                  <Sparkles className="w-4 h-4 mr-2" />
                  View All Products
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="px-3 py-1.5 text-[#1f2328] dark:text-[#e6edf3] hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] rounded-md transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <GitHubStarButton />
            <ThemeToggle />
            <div className="flex items-center gap-2 min-w-[200px] justify-end">
              {loading ? (
                <div className="h-9 w-[100px] bg-[var(--gh-canvas-subtle)] animate-pulse rounded-md" />
              ) : user ? (
                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="font-medium gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="sm" className="font-medium bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0]">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="font-medium">Sign In</Button>
                  </Link>
                  <Link href="/try-now">
                    <Button size="sm" className="font-medium bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0]">
                      Try Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#f6f8fa] dark:hover:bg-[#21262d] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-[#1f2328] dark:text-[#e6edf3]" />
            ) : (
              <Menu className="w-5 h-5 text-[#1f2328] dark:text-[#e6edf3]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {/* Mobile Products */}
            <div className="px-4">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Products</div>
              {products.map((product) => (
                product.external ? (
                  <a
                    key={product.href}
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                      <product.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{product.description}</div>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={product.href}
                    href={product.href}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
                      <product.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{product.description}</div>
                    </div>
                  </Link>
                )
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 my-2" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <GitHubStarButton />
                </div>
                <ThemeToggle />
              </div>
              {loading ? (
                <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
              ) : user ? (
                <div className="space-y-2">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0]">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/try-now" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#0969da] hover:bg-[#0860ca] dark:bg-[#4493f8] dark:hover:bg-[#3a87f0]">
                      Try Now
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
