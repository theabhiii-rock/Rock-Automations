'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/lib/types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (amount: number, sourceCurrency?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const INR_PER_USD = 83.5;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('pref_currency') as Currency;
    if (saved === 'INR' || saved === 'USD') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('pref_currency', c);
  };

  const toggleCurrency = () => {
    const next = currency === 'USD' ? 'INR' : 'USD';
    setCurrency(next);
  };

  const formatPrice = (amount: number, sourceCurrency: Currency = 'USD'): string => {
    let finalAmount = amount;

    if (sourceCurrency === 'USD' && currency === 'INR') {
      finalAmount = Math.round(amount * INR_PER_USD);
    } else if (sourceCurrency === 'INR' && currency === 'USD') {
      finalAmount = Math.round(amount / INR_PER_USD);
    }

    if (currency === 'INR') {
      return `₹${finalAmount.toLocaleString('en-IN')}`;
    }
    return `$${finalAmount.toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
