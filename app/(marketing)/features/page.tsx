import type { Metadata } from 'next';
import FeaturesContent from './FeaturesContent';

export const metadata: Metadata = {
  title: 'Features - AI Coding Assistant for Students | CodaiPro',
  description: 'Explore CodaiPro features: AI code generation, debugging, 20+ languages, offline mode, and more. Perfect for students and developers.',
  keywords: ['AI coding features', 'code generation', 'debugging tools', 'offline IDE', 'student coding assistant', 'multi-language support'],
  openGraph: {
    title: 'CodaiPro Features - Complete AI Coding Assistant',
    description: 'AI-powered code generation, debugging, and learning tools for students. Works 100% offline with 20+ programming languages.',
    type: 'website',
    url: 'https://codaipro.com/features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodaiPro Features - AI Coding Assistant',
    description: 'AI-powered code generation, debugging, and learning tools for students. Works 100% offline.',
  },
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
