import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07090E',
};

export const metadata: Metadata = {
  title: 'ROCK AUTOMATIONS — AI Automation, Outreach & Growth Systems',
  description:
    'ROCK AUTOMATIONS builds AI-powered lead discovery, outreach, websites and business automation systems for growing businesses.',
  metadataBase: new URL('https://rockautomations.com'),
  openGraph: {
    title: 'ROCK AUTOMATIONS — AUTOMATE • OUTREACH • WEBSITES • GROWTH',
    description:
      'We Find, Message, Build & Grow Your Business Automatically. AI-powered client acquisition, digital presence and business automation systems for growing businesses.',
    url: 'https://rockautomations.com',
    siteName: 'ROCK AUTOMATIONS',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Abhishek Kumar',
        jobTitle: 'Founder & AI Systems Architect',
        sameAs: ['https://linkedin.com/in/abhishek-kumar-527921384'],
        description:
          'Founder of Rock Automations. Specializing in automated outreach, AI systems, websites, and business scaling.',
      },
      {
        '@type': 'Organization',
        name: 'Rock Automations',
        description:
          'We Find, Message, Build & Grow Your Business — Automatically. AI solutions, outreach systems, websites, and verified professional network.',
        currenciesAccepted: 'INR, USD',
      },
    ],
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090E] text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-300">
        <AuthProvider>
          <CurrencyProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
