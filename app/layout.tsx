import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://codai.pro'),
  title: {
    default: 'CodaiPro - Free AI Coding Assistant for Students | Offline AI IDE',
    template: '%s | CodaiPro'
  },
  description: "Free AI coding assistant for students! Get Pro features FREE while enrolled. Works 100% offline with 20+ languages. Perfect for learning programming - Python, JavaScript, Java & more. No credit card required.",
  keywords: [
    "free AI coding assistant for students",
    "student coding assistant free",
    "free programming help for students",
    "AI code generator for students",
    "offline coding assistant",
    "free AI IDE students",
    "GitHub Student Pack coding tool",
    "learn programming with AI",
    "free coding AI",
    "student developer tools free",
    "AI coding helper",
    "Python AI assistant free",
    "JavaScript coding help",
    "free code completion",
    "student programming assistant",
    "AI for CS students",
    "coding tutor AI free",
    "university coding tool",
    "free offline AI coder"
  ],
  authors: [{ name: "CodaiPro Team", url: "https://codai.pro" }],
  creator: "Lucky Yaduvanshi",
  publisher: "CodaiPro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codai.pro",
    title: "CodaiPro - Free AI Coding Assistant for Students | Pro Features FREE",
    description: "Students get Pro FREE! AI-powered coding assistant for learning. Works offline, supports 20+ languages. Join 10,000+ students coding smarter.",
    siteName: "CodaiPro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodaiPro - Free AI Coding Assistant for Students"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodaiPro - Free for Students | AI Coding Assistant",
    description: "Students get Pro FREE! AI-powered coding help for learning. 100% offline, 20+ languages.",
    images: ["/og-image.png"],
    creator: "@codaipro",
  },
  alternates: {
    canonical: "https://codai.pro",
  },
  verification: {
    google: "your-google-verification-code", // Add this from Google Search Console
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CodaiPro',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows 10, Windows 11',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description: 'AI-powered offline coding assistant for students and developers. Works 100% offline with 20+ programming languages.',
    downloadUrl: 'https://codai.pro/downloads',
    softwareVersion: '2.1.0',
    author: {
      '@type': 'Organization',
      name: 'CodaiPro Team',
      url: 'https://codai.pro',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          defaultTheme="system"
        >
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
