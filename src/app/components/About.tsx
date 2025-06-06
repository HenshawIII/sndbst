'use client';

import Link from 'next/link';
import Image from 'next/image';
// import { usePhantomWallet } from './PhantomWallet';
import { Icon } from "@iconify/react";

export default function About() {
//   const { phantom, connected } = usePhantomWallet();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2">
          {/* Header */}
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
            What is Coinbeast?
          </h1>

          {/* Intro */}
          <p className="text-xl text-gray-300 mb-12">
            Coinbeast is your intelligent blockchain companion, powered by advanced AI technology. 
            It helps you navigate the complex world of cryptocurrency with confidence and ease.
          </p>

          {/* Capabilities */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Key Capabilities</h2>
            <ul className="space-y-4">
              {[
                {
                  title: "Real-time Market Analysis",
                  description: "Get insights and analysis of cryptocurrency market trends ."
                },
                {
                  title: "Smart Portfolio Management",
                  description: "Track and manage your portfolio with intelligent recommendations."
                },
                {
                  title: "Automated Trading",
                  description: "Execute trades based on predefined strategies and market conditions."
                },
                {
                  title: "Risk Assessment",
                  description: "Receive detailed risk analysis and market volatility assessments."
                }
              ].map((capability, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center group-hover:bg-[#3ebd4d]/20 transition-colors">
                    <Icon 
                      icon="solar:check-circle-bold" 
                      className="text-[#3ebd4d]" 
                      width="20" 
                      height="20" 
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{capability.title}</h3>
                    <p className="text-gray-400">{capability.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto px-8 py-4 relative group overflow-hidden rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3ebd4d] to-[#b71ec0] rounded-xl"></div>
              <div className="absolute inset-[2px] bg-[#20242D] rounded-[10px]"></div>
              <div className="relative flex items-center gap-2 hover:scale-110 transition-all duration-200">
                <Icon icon="solar:rocket-bold" width="24" height="24" className="text-white" />
                <Link href="#hero" className="text-white">Launch App</Link>
              </div>
            </button>
            {/* <div
              className="w-full sm:w-auto px-8 py-4 bg-[#20242D] hover:bg-[#2A3240] text-white rounded-xl font-medium transition-colors border border-[rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
            >
              <Icon icon="solar:notebook-square-bold" width="24" height="24" />
             <Link href="/docs"> Read the Docs</Link>
            </div> */}
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src="/coin01.jpeg"
              alt="Coinbeast Agent Interface"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
} 