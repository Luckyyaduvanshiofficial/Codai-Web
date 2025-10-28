'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gh-canvas-default)] px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-[var(--gh-fg-default)] mb-3">
          Oops! Something went wrong
        </h1>
        
        <p className="text-[var(--gh-fg-muted)] mb-2">
          We encountered an unexpected error while loading this page.
        </p>
        
        {error.message && (
          <div className="bg-[var(--gh-canvas-subtle)] border border-[var(--gh-border-default)] rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-mono text-[var(--gh-fg-muted)] break-words">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go home
          </Button>
        </div>
        
        <p className="text-xs text-[var(--gh-fg-muted)] mt-6">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
