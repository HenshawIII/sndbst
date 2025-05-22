'use client';
import Image from 'next/image';

import React from 'react';
import Navbar from '../components/Navbar';
import Docs from '../components/Docs';
export default function DocsPage() {
  return (
    <div className="bg-[#000]">
    <Navbar />
      <Docs />
      <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)] bg-[#000]  ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
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
      </footer>
    </div>
  );
}

