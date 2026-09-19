'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/lib/types';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  status: string;
  professionalProfile?: any;
  clientProfile?: any;
}

interface RegistrationAgreementData {
  agreedToTerms?: boolean;
  agreedToEscrow?: boolean;
  agreedToAntiCircumvention?: boolean;
  signatureType?: 'DRAWN' | 'TYPED';
  signatureData?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  register: (
    fullName: string,
    email: string,
    pass: string,
    role?: 'CLIENT' | 'PROFESSIONAL',
    agreementData?: RegistrationAgreementData
  ) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/v1/auth/me');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.user) {
          setUser(json.data.user);
          return;
        }
      }
      setUser(null);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error?.message || 'Invalid credentials' };
      }
      setUser(data.data.user);
      return { success: true, user: data.data.user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (
    fullName: string, 
    email: string, 
    pass: string, 
    role: 'CLIENT' | 'PROFESSIONAL' = 'CLIENT',
    agreementData?: RegistrationAgreementData
  ) => {
    try {
      const payload: any = { fullName, email, password: pass, role };
      if (agreementData) {
        Object.assign(payload, agreementData);
      }

      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error?.message || data.error || 'Registration failed' };
      }
      setUser(data.data.user);
      return { success: true, user: data.data.user };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (e) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser: fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
