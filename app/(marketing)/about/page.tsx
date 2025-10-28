import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CodaiPro - Lucky Yaduvanshi | Offline AI Coding Assistant',
  description: 'Learn about Lucky Yaduvanshi, creator of CodaiPro - the offline AI coding assistant trusted by 100K+ students worldwide. Computer science student building accessible AI tools.',
  keywords: ['Lucky Yaduvanshi', 'Lucky Yaduvanshi developer', 'Lucky Yaduvanshi projects', 'CodaiPro creator', 'offline AI', 'coding assistant', 'open source developer', 'Lucky Labs', 'ProWriter', 'computer science student'],
  openGraph: {
    title: 'About CodaiPro - Lucky Yaduvanshi | Offline AI Coding Assistant',
    description: 'Meet Lucky Yaduvanshi - Creator of CodaiPro, the offline AI coding assistant empowering 100K+ students worldwide.',
    type: 'website',
    url: 'https://codaipro.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CodaiPro - Lucky Yaduvanshi',
    description: 'Creator of CodaiPro, the offline AI coding assistant empowering 100K+ students worldwide.',
  },
};

function AboutContent() {
  return (
    <main>
      <h1>About CodaiPro</h1>
      <p>Meet Lucky Yaduvanshi — creator of CodaiPro, the offline AI coding assistant empowering 100K+ students worldwide.</p>
    </main>
  );
}

export default function AboutPage() {
  return <AboutContent />;
}
