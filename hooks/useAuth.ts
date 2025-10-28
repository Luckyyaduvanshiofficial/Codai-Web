'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { account } from '@/lib/appwrite';
import { Models, OAuthProvider } from 'appwrite';

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginWithOAuth: (provider: 'github' | 'google') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await account.create('unique()', email, password, name);
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loginWithOAuth = async (provider: 'github' | 'google') => {
    try {
      const successUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/oauth-callback`;
      const failureUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/login`;
      
      // Note: createOAuth2Session redirects the browser, so this doesn't return a promise
      // The try-catch here catches any immediate errors before the redirect
      account.createOAuth2Session(
        provider as OAuthProvider,
        successUrl,
        failureUrl
      );
    } catch (error) {
      console.error('OAuth error:', error);
      throw error; // Re-throw so calling code can handle it
    }
  };

  return { user, loading, login, register, logout, loginWithOAuth };
};