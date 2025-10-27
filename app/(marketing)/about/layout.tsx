import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CodaiPro',
  description: 'Learn about CodaiPro - the offline AI coding assistant built for students and developers worldwide. Discover our story, mission, and values.',
  openGraph: {
    title: 'About CodaiPro - Offline AI Coding Assistant',
    description: 'Built by students, for students. Making AI-powered coding assistance accessible to everyone, everywhere.',
    url: 'https://codai.pro/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
