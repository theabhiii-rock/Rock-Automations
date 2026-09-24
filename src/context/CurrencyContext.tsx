'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '@/lib/types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (amount: number, sourceCurrency?: Currency) => string;
  convertAmount: (amount: number, sourceCurrency: Currency, targetCurrency?: Currency) => number;
  rate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const INR_PER_USD = 83.5;

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

  const convertAmount = (
    amount: number,
    sourceCurrency: Currency,
    targetCurrency: Currency = currency
  ): number => {
    if (isNaN(amount) || amount === 0) return 0;
    if (sourceCurrency === targetCurrency) return amount;

    if (sourceCurrency === 'USD' && targetCurrency === 'INR') {
      return Math.round(amount * INR_PER_USD);
    }
    if (sourceCurrency === 'INR' && targetCurrency === 'USD') {
      return Math.round(amount / INR_PER_USD);
    }
    return amount;
  };

  const formatPrice = (amount: number, sourceCurrency: Currency = 'USD'): string => {
    const finalAmount = convertAmount(amount, sourceCurrency, currency);

    if (currency === 'INR') {
      return `₹${finalAmount.toLocaleString('en-IN')}`;
    }
    return `$${finalAmount.toLocaleString('en-US')}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        convertAmount,
        rate: INR_PER_USD,
      }}
    >
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
