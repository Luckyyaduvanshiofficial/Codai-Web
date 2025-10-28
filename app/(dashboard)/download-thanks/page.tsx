'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DownloadThanksPage() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const [downloadStarted, setDownloadStarted] = useState(false);
  
  // Get download URL from env or use direct GitHub release URL
  const downloadUrl = process.env.NEXT_PUBLIC_DOWNLOAD_URL || 
    'https://github.com/Luckyyaduvanshiofficial/Codai/releases/download/git-tag-v2.1.0/CodaiPro_v2.1.zip';
  
  const fileName = 'CodaiPro_v2.1.zip';

  const startDownload = useCallback(() => {
    setDownloadStarted(true);
    // Create invisible link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [downloadUrl, fileName]);

  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Start download
          if (!downloadStarted) {
            startDownload();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [downloadStarted, startDownload]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2 border-[var(--gh-border-default)]">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#0969da] to-[#4493f8] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <CardTitle className="text-3xl mb-2">Thank You for Downloading!</CardTitle>
            <CardDescription className="text-lg">
              CodaiPro {fileName.includes('v2.1') ? 'v2.1' : 'Desktop'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Download Status */}
            <div className="bg-[var(--gh-canvas-subtle)] rounded-lg p-6 text-center border border-[var(--gh-border-default)]">
              {!downloadStarted ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-[var(--gh-accent-fg)] animate-pulse" />
                    <p className="text-lg font-semibold">
                      Download will start in{' '}
                      <span className="text-3xl text-[var(--gh-accent-fg)] font-bold">{countdown}</span>{' '}
                      seconds...
                    </p>
                  </div>
                  
                  <motion.div
                    className="h-2 bg-[var(--gh-border-default)] rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0969da] to-[#4493f8]"
                      initial={{ width: '0%' }}
                      animate={{ width: `${((10 - countdown) / 10) * 100}%` }}
                      transition={{ duration: 1, ease: 'linear' }}
                    />
                  </motion.div>
                </>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Download className="w-6 h-6 text-[var(--gh-success-fg)] animate-bounce" />
                  <p className="text-lg font-semibold text-[var(--gh-success-fg)]">
                    Download Started!
                  </p>
                </div>
              )}
            </div>

            {/* Manual Download Button */}
            <div className="text-center">
              <p className="text-sm text-[var(--gh-fg-muted)] mb-3">
                {downloadStarted ? "If download didn't start:" : "Don't want to wait?"}
              </p>
              <Button
                onClick={startDownload}
                size="lg"
                className="gap-2"
              >
                <Download className="w-5 h-5" />
                Click Here to Download Now
              </Button>
            </div>

            {/* Installation Instructions */}
            <Card className="bg-[var(--gh-canvas-subtle)] border-[var(--gh-border-default)]">
              <CardHeader>
                <CardTitle className="text-xl">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-[var(--gh-fg-muted)]">
                  <li>Locate the downloaded file in your Downloads folder</li>
                  <li>Double-click <strong className="text-[var(--gh-fg-default)]">{fileName}</strong> to run the installer</li>
                  <li>Follow the installation wizard</li>
                  <li>Launch CodaiPro and start coding offline!</li>
                </ol>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/docs" className="block">
                <Card className="h-full hover:shadow-lg transition-shadow border-[var(--gh-border-default)] hover:border-[var(--gh-accent-fg)] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold text-[var(--gh-fg-default)]">📖 Documentation</p>
                    <p className="text-xs text-[var(--gh-fg-muted)] mt-1">Get started guide</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="https://github.com/Luckyyaduvanshiofficial/codaipro" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="h-full hover:shadow-lg transition-shadow border-[var(--gh-border-default)] hover:border-[var(--gh-accent-fg)] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold text-[var(--gh-fg-default)]">🐛 Report Issue</p>
                    <p className="text-xs text-[var(--gh-fg-muted)] mt-1">Found a bug?</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/contact" className="block">
                <Card className="h-full hover:shadow-lg transition-shadow border-[var(--gh-border-default)] hover:border-[var(--gh-accent-fg)] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <p className="font-semibold text-[var(--gh-fg-default)]">💬 Get Support</p>
                    <p className="text-xs text-[var(--gh-fg-muted)] mt-1">Need help?</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-[var(--gh-fg-default)]">
                <strong>💡 Pro Tip:</strong> Add CodaiPro to your Windows startup apps for quick access. 
                Works 100% offline with no internet required!
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center pt-4">
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  Back to Home
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
