'use client';
import Image from 'next/image';

import React from 'react';
import Navbar from '../components/Navbar';
import Docs from '../components/Docs';
export default function DocsPage() {
  return (
    <>
    <Navbar />
      <Docs />
      <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/cb1.jpg" alt="Agent Character" width={80} height={80} className="rounded-lg" />
            <span className="text-white font-semibold"></span>
          </div>
          <div className="text-gray-400 text-sm">
            Coinbeast Agent v1.0
          </div>
        </div>
      </footer>
    </>
  );
}

