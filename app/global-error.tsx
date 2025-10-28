'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Critical Error
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A critical error occurred. Please try refreshing the page.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset}>
                Reload Application
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
