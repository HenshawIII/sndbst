"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import { Icon } from "@iconify/react";
import { usePrivy } from '@privy-io/react-auth';
import Image from "next/image";
import TokenBanner from "./components/TokenBanner";
import Link from "next/link";
// import { AIChat } from "./components/Chat";
import FAQ from "./components/FAQ";
import StartTrading from "./components/StartTrading";

export default function LandingPage() {
  const router = useRouter();
  const { ready, authenticated, login } = usePrivy();

  // useEffect(() => {
  //   if (ready && authenticated) {
  //     router.push("/chat");
  //   }
  // }, [ready, authenticated, router]);

  return (
    <>
    
    <div className="bg-[radial-gradient(circle,#242A37,#29313F,#2C3644,#3D4854)] min-h-screen flex flex-col">
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:pt-2 pb-20 pt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3351FF]/10 rounded-full">
                <span className="w-2 h-2 bg-[#3351FF] rounded-full animate-pulse"></span>
                <span className="text-[#3351FF] font-medium">Powered by Solana Agent Kit 2.0</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#3351FF] to-[#3351FF] bg-clip-text text-transparent">
                Your AI Agent with On-Chain Capabilities
              </h1>
              <p className="text-xl text-gray-300 max-w-xl">
                Experience the power of AI combined with Solana blockchain technology. 
                Interact with your assets, execute transactions, and get intelligent insights - all in one place.
              </p>
            </div>

            {!authenticated ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={login}
                  className="bg-[#3351FF] hover:bg-[#2B44E5] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Icon icon="solar:wallet-bold" className="text-white" width={24} height={24} />
                  Connect Wallet to Start
                </button>
                
              </div>
            ):(
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={login}
                  className="bg-[#3351FF] hover:bg-[#2B44E5] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center gap-2"
                >
                  
                  <Link href="/chat">Chat with Agent</Link>
                </button>
              </div>
            )}

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#20242D] bg-[#3351FF]/20 flex items-center justify-center">
                    <Icon icon="solar:user-bold" className="text-[#3351FF]" width={16} height={16} />
                  </div>
                ))}
              </div>
              <p className="text-gray-400">Join 1,000+ users already using our platform</p>
            </div>
          </div>

          {/* Right side - Character image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative">
              <Image
                src="/agent-character.svg"
                alt="AI Agent Character"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-white font-medium">AI Agent Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#3351FF]/50 hover:shadow-[0_0_30px_rgba(51,81,255,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                <Icon icon="solar:chat-round-dots-bold" className="text-[#3351FF] transition-transform duration-300 group-hover:scale-110" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-[#3351FF]">AI-Powered Chat</h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Interact with an intelligent agent that understands your needs and provides real-time assistance.</p>
            </div>
          </div>

          <div className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#3351FF]/50 hover:shadow-[0_0_30px_rgba(51,81,255,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                <Icon icon="solar:chart-bold" className="text-[#3351FF] transition-transform duration-300 group-hover:scale-110" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-[#3351FF]">On-Chain Analytics</h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Get detailed insights about your assets and transactions with advanced analytics.</p>
            </div>
          </div>

          <div className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#3351FF]/50 hover:shadow-[0_0_30px_rgba(51,81,255,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                <Icon icon="solar:shield-check-bold" className="text-[#3351FF] transition-transform duration-300 group-hover:scale-110" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 group-hover:text-[#3351FF]">Secure Transactions</h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Execute transactions safely with built-in security features and real-time verification.</p>
            </div>
          </div>
        </div>
      </div>

      <StartTrading />

      <FAQ />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/agent-character.svg" alt="Agent Character" width={80} height={80} className="rounded-lg" />
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
    </>
  );
}