"use client";

import "./globals.css";
import { PhantomWalletProvider } from './components/PhantomWallet';
import PrivyProv from './privyProv'
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <title>Phantom AI</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`h-full ${inter.className}`}>
        <PrivyProv>
        <PhantomWalletProvider>
          {children}
        </PhantomWalletProvider>
        </PrivyProv>
      </body>
    </html>
  );
}

export default RootLayout;
