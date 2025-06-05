"use client";

import "./globals.css";
import { PhantomWalletProvider } from './components/PhantomWallet';
import PrivyProv from './privyProv'
import { Inter } from 'next/font/google';
import TokenBanner from './components/TokenBanner';
// import { useEffect } from "react";
// import { createPhantom } from "@phantom/wallet-sdk";

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       createPhantom();
  //     }
  //   }, []);

  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <title>Coinbeast</title>
        <link rel="icon" href="/coinbett.png" type="image/png" />
      </head>
      <body className={`h-full ${inter.className}`}>
      <div className=" !sticky !top-0 left-0 right-0 z-[9999]">
            <TokenBanner />
          </div>
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
