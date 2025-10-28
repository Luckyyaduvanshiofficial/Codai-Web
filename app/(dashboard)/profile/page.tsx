'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuthState } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  LogOut, 
  Settings,
  Shield,
  Zap,
  Download,
  Code
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuthState();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Show error to user (you can add a toast notification here)
      alert('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--gh-canvas-default)] flex items-center justify-center">
        <div className="flex gap-2">
          <motion.div 
            className="w-3 h-3 bg-[#0969da] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="w-3 h-3 bg-[#0969da] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="w-3 h-3 bg-[#0969da] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    );
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  // Determine user's plan (you can customize this based on your logic)
  const userPlan = user.labels?.includes('pro') ? 'Pro' : 'Free';
  const isPro = userPlan === 'Pro';
  
  // Format join date with validation
  let joinDate = 'Unknown';
  try {
    const createdDate = new Date(user.$createdAt);
    // Validate date is valid
    if (!isNaN(createdDate.getTime())) {
      joinDate = createdDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (error) {
    console.error('Error parsing date:', error);
  }

  return (
    <div className="min-h-screen bg-[var(--gh-canvas-default)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--gh-fg-default)] mb-2">
            My Profile
          </h1>
          <p className="text-lg text-[var(--gh-fg-muted)]">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-[var(--gh-border-default)]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0969da] to-[#4493f8] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{user.name || 'User'}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-[var(--gh-canvas-subtle)] rounded-lg">
                      <Calendar className="w-5 h-5 text-[var(--gh-fg-muted)]" />
                      <div>
                        <p className="text-xs text-[var(--gh-fg-muted)]">Joined</p>
                        <p className="text-sm font-medium text-[var(--gh-fg-default)]">{joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-[var(--gh-canvas-subtle)] rounded-lg">
                      <Shield className="w-5 h-5 text-[var(--gh-fg-muted)]" />
                      <div>
                        <p className="text-xs text-[var(--gh-fg-muted)]">Status</p>
                        <p className="text-sm font-medium text-[var(--gh-success-fg)]">Verified</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-[var(--gh-border-default)]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[var(--gh-canvas-subtle)] rounded-lg">
                    <div>
                      <p className="font-medium text-[var(--gh-fg-default)]">Email Notifications</p>
                      <p className="text-sm text-[var(--gh-fg-muted)]">Receive updates about CodaiPro</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[var(--gh-canvas-subtle)] rounded-lg">
                    <div>
                      <p className="font-medium text-[var(--gh-fg-default)]">Privacy Settings</p>
                      <p className="text-sm text-[var(--gh-fg-muted)]">Control your data and privacy</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div>
                      <p className="font-medium text-[var(--gh-fg-default)]">Delete Account</p>
                      <p className="text-sm text-[var(--gh-fg-muted)]">Permanently delete your account</p>
                    </div>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Plan & Actions */}
          <div className="space-y-6">
            {/* Current Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className={`border-2 ${isPro ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20' : 'border-[var(--gh-border-default)]'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {isPro ? (
                        <>
                          <Crown className="w-5 h-5 text-yellow-600" />
                          <span>Pro Plan</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Free Plan</span>
                        </>
                      )}
                    </CardTitle>
                    <Badge variant={isPro ? "default" : "secondary"} className={isPro ? "bg-yellow-600" : ""}>
                      {userPlan}
                    </Badge>
                  </div>
                  <CardDescription>
                    {isPro ? 'Enjoy all premium features' : 'Upgrade for more features'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Code className="w-4 h-4 text-[var(--gh-success-fg)]" />
                      <span className="text-[var(--gh-fg-default)]">
                        {isPro ? 'Unlimited' : 'Basic'} code generation
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Download className="w-4 h-4 text-[var(--gh-success-fg)]" />
                      <span className="text-[var(--gh-fg-default)]">
                        Offline desktop app
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-[var(--gh-success-fg)]" />
                      <span className="text-[var(--gh-fg-default)]">
                        {isPro ? 'Priority' : 'Community'} support
                      </span>
                    </div>
                  </div>

                  {!isPro && (
                    <>
                      <Separator />
                      <Link href="/pricing">
                        <Button className="w-full gap-2">
                          <Crown className="w-4 h-4" />
                          Upgrade to Pro
                        </Button>
                      </Link>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-[var(--gh-border-default)]">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/downloads">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Download className="w-4 h-4" />
                      Download Desktop App
                    </Button>
                  </Link>
                  
                  <Link href="/docs">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Code className="w-4 h-4" />
                      View Documentation
                    </Button>
                  </Link>

                  <Link href="/try-now">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Zap className="w-4 h-4" />
                      Try AI Assistant
                    </Button>
                  </Link>

                  <Separator />

                  <Button
                    variant="destructive"
                    className="w-full justify-start gap-2"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="w-4 h-4" />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
