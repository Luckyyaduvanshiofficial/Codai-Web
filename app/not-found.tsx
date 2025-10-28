import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gh-canvas-default)] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-[var(--gh-accent-emphasis)] mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-[var(--gh-fg-default)] mb-3">
          Page not found
        </h2>
        
        <p className="text-[var(--gh-fg-muted)] mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="gap-2 w-full sm:w-auto">
              <Home className="w-4 h-4" />
              Go home
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4" />
              Browse docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
