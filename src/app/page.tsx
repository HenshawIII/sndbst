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
import { AIChat } from './components/Chat';
import FAQ from "./components/FAQ";
import StartTrading from "./components/StartTrading";
import TestCoinGecko from './components/TestCoinGecko';
import About from "./components/About";
import Examples from "./components/Examples";
import Template from "./components/Template";
import Setup from "./components/Setup";
import Afil from "./components/Afil";
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
    
    <div className="bg-[black] min-h-screen flex flex-col" id="hero">
      
      <Navbar />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:pt-2 pb-20 pt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left space-y-8">
            <div className="space-y-4">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3351FF]/10 rounded-full">
                <span className="w-2 h-2 bg-[green] rounded-full animate-pulse"></span>
                <span className="text-gray-400 font-medium">Coinbeast Agent v1.</span>
              </div> */}
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-[#b5b3b3] to-[#5a5858] bg-clip-text text-transparent">
               Your onchain {'be(a)st'} friend
              </h1>
              <p className="text-xl text-gray-400 max-w-xl mt-2 mb-1">
                Experience the power of AI combined with Solana blockchain technology.
              </p>
              {/* Feature List */}
              <ul className="space-y-3 mt-4 mb-2">
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#3ebd4d] inline-block"></span>
                  <span className="text-lg text-gray-300">Interact with your assets</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#3ebd4d] inline-block"></span>
                  <span className="text-lg text-gray-300">Execute transactions</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#3ebd4d] inline-block"></span>
                  <span className="text-lg text-gray-300">Get intelligent insights – all in one place</span>
                </li>
              </ul>
            </div>

            {!authenticated ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={login}
                  className="bg-gradient-to-r from-[#3ebd4d] to-[#b71ec0] hover:bg-[#2B44E5] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Icon icon="solar:wallet-bold" className="text-white" width={24} height={24} />
                  Connect to start
                </button>
                
              </div>
            ):(
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={login}
                  className="bg-gradient-to-r from-[#3ebd4d] to-[#b71ec0] hover:bg-[#2B44E5] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center gap-2"
                >
                  
                  <Link href="/chat">Chat with Coinbeast</Link>
                </button>
              </div>
            )}

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#34549d] bg-[#34549d]/20 flex items-center justify-center">
                    <Icon icon="solar:user-bold" className="text-[#63758e]" width={16} height={16} />
                  </div>
                ))}
              </div>
              <p className="text-gray-400">Join 1,000+ users already using our platform</p>
            </div>
          </div>

          {/* Right side - Character image */}
          <div className="relative">
            <div className="absolute inset-0 = from-[#3351FF]/20 to-transparent rounded-full"></div>
            <div className="relative">
              <Image
                src="/coinbasee.png"
                alt="AI Agent Character"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-white font-medium"> Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StartTrading />
      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#99a89b]  hover:shadow-lg hover:shadow-lime-300 hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                <Icon icon="solar:chat-round-dots-bold" className="text-[#838e91] transition-transform duration-300 group-hover:scale-110" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 ">AI-Powered Chat</h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Interact with an intelligent agent that understands your needs and provides real-time assistance.</p>
            </div>
          </div>

          <div className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#99a89b]  hover:shadow-lg hover:shadow-lime-300 hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                <Icon icon="solar:chart-bold" className="text-[#838e91] transition-transform duration-300 group-hover:scale-110" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 ">On-Chain Analytics</h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Get detailed insights about your assets and transactions with advanced analytics.</p>
            </div>
          </div>

          <div className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#99a89b]  hover:shadow-lg hover:shadow-lime-300 hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                <Icon icon="solar:shield-check-bold" className="text-[#838e91] transition-transform duration-300 group-hover:scale-110" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300 ">Secure Transactions</h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">Execute transactions safely with built-in security features and real-time verification.</p>
            </div>
          </div>
        </div>
      </div>
     
      <About />
      <Setup />
      <Examples />
      <Template />
      <Afil />
      <FAQ />
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
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
            <p>Coinbeast v1.0</p>
            
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

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        
        {/* <TestCoinGecko /> */}
        
      </div>
      
    </div>
    </>
  );
}