'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/lib/appwrite';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleOAuthCallback = async () => {
      try {
        // Check if user is authenticated
        const user = await account.get();
        
        toast({
          title: "Successfully signed in! 🎉",
          description: `Welcome ${user.name || 'back'}!`,
        });
        router.push('/dashboard');
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError('Authentication failed. Please try again.');
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "There was a problem signing you in. Please try again.",
        });
        
        // Redirect to login after a short delay
        timeoutId = setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    };

    handleOAuthCallback();

    // Cleanup function to clear timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0d1117]">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
            <h2 className="text-xl font-semibold text-[#1f2328] dark:text-[#e6edf3]">
              Authentication Failed
            </h2>
            <p className="text-sm text-red-600 dark:text-red-400 max-w-md">
              {error}
            </p>
            <p className="text-xs text-muted-foreground">
              Redirecting you back to login...
            </p>
          </>
        ) : (
          <>
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#0969da]" />
            <h2 className="text-xl font-semibold text-[#1f2328] dark:text-[#e6edf3]">
              Completing sign in...
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we finish authenticating you.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
