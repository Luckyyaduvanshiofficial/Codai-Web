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
    default: 'CodaiPro - AI-Powered Offline Coding Assistant',
    template: '%s | CodaiPro'
  },
  description: "The ultimate offline AI coding assistant. Perfect for students, developers, and anyone learning to code. Works 100% offline with 20+ programming languages. No internet required, completely private.",
  keywords: ["AI coding assistant", "offline coding", "student coding tool", "programming assistant", "code completion", "AI IDE", "learn programming", "coding help", "developer tools", "free coding assistant", "Python AI", "JavaScript assistant", "coding offline"],
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
    title: "CodaiPro - AI-Powered Offline Coding Assistant",
    description: "Code smarter with AI. Works 100% offline. Perfect for students and developers.",
    siteName: "CodaiPro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodaiPro - Offline AI Coding Assistant"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodaiPro - AI-Powered Offline Coding Assistant",
    description: "Code smarter with AI. Works 100% offline. Perfect for students and developers.",
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
