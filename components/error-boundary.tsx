'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--gh-canvas-default)] px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--gh-fg-default)] mb-2">
              Something went wrong
            </h2>
            <p className="text-[var(--gh-fg-muted)] mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  // Force remount by triggering a page reload if state reset doesn't work
                  setTimeout(() => {
                    if (this.state.hasError) {
                      window.location.reload();
                    }
                  }, 100);
                }}
                variant="default"
              >
                Try again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Reload page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
