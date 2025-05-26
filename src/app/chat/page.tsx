"use client";

import { AIChat } from "../components/Chat"
import { SolanaTransactionExample } from "../components/SolanaTransactionExample";
import { useEffect, useState } from "react";
import {
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "sonner";
import AuthGuard from "../components/AuthGuard";
import TokenBanner from "../components/TokenBanner";
import TestCoinGecko from "../components/TestCoinGecko";
import Image from "next/image";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[var(--background)]">
        <Navbar />
        <CircularProgress
          size={60}
          thickness={4}
          className="text-blue-500"
        />
      </div>
    );
  }

  return (
    <AuthGuard>
       
      <div className="bg-[black] min-h-screen flex flex-col">
       
       {/* <div className="md:hidden"> <Navbar /></div> */}
        <div className="flex-1 flex flex-col">
          {/* <SolanaTransactionExample /> */}
          <AIChat/>
          {/* <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-0">
            <Image src="/cb1.jpg" alt="Agent Character" width={80} height={80} className="rounded-lg" />
            <a href="https://x.com/CoinbeastAI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <div className="rounded-2xl flex items-center justify-center">
              <Image
                src="/xpn.svg"
                width={40}
                height={40}
                alt="Sendai Logo"
                className="rounded-xl"
              />
            </div>
            
          </a>
          </div>
          <div className="text-gray-400 text-sm flex flex-row-reverse gap-2 items-center justify-around">
            <p>Coinbeast Agent v1.0</p>
            
          </div>
        </div>
      </footer> */}
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{ 
            className: "bg-[rgba(42,43,54,0.8)] text-white border border-[rgba(255,255,255,0.1)] shadow-lg", 
            duration: 2500 
          }}
        />
      </div>
      {/* <TestCoinGecko /> */}
    </AuthGuard>
  );
}