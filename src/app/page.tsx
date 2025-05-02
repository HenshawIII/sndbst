"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { Icon } from "@iconify/react";
import { usePrivy } from '@privy-io/react-auth';
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const { ready, authenticated, login } = usePrivy();

  // useEffect(() => {
  //   if (ready && authenticated) {
  //     router.push("/chat");
  //   }
  // }, [ready, authenticated, router]);

  return (
    <div className="bg-[radial-gradient(circle,#242A37,#29313F,#2C3644,#3D4854)] min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center mt-10 justify-center px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your AI Agent with On-Chain Capabilities
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of AI combined with Solana blockchain technology. 
            Interact with your assets, execute transactions, and get intelligent insights - all in one place.
          </p>
          {!authenticated && (
            <button
              onClick={login}
              className="bg-[#3351FF] hover:bg-[#2B44E5] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <Icon icon="solar:wallet-bold" className="text-white" width={24} height={24} />
              Connect Wallet to Start
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6">
            <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="solar:chat-round-dots-bold" className="text-[#3351FF]" width={24} height={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Chat</h3>
            <p className="text-gray-400">Interact with an intelligent agent that understands your needs and provides real-time assistance.</p>
          </div>

          <div className="bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6">
            <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="solar:chart-bold" className="text-[#3351FF]" width={24} height={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">On-Chain Analytics</h3>
            <p className="text-gray-400">Get detailed insights about your assets and transactions with advanced analytics.</p>
          </div>

          <div className="bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6">
            <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4">
              <Icon icon="solar:shield-check-bold" className="text-[#3351FF]" width={24} height={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Transactions</h3>
            <p className="text-gray-400">Execute transactions safely with built-in security features and real-time verification.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/sendai.jpg" alt="Sendai Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-white font-semibold"></span>
          </div>
          <div className="text-gray-400 text-sm">
            Powered by Solana Agent Kit 2.0
          </div>
        </div>
      </footer>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-[rgba(42,43,54,0.8)] text-white border border-[rgba(255,255,255,0.1)] shadow-lg",
          duration: 2500
        }}
      />
    </div>
  );
}