'use client';
import React,{useState,useEffect} from 'react'
// import AddCoin from '../components/Addcoin';
// import {
//   CircularProgress,
// } from "@mui/material";
// import Navbar from '../components/Navbar';
// import { useState,useEffect } from 'react';
import { Icon } from "@iconify/react";
import Image from 'next/image';
import { usePhantomWallet} from '../components/PhantomWallet';
import Navbar from '../components/Navbar';
export default function AddCoin() {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    description: '',
    media: null as File | null
  });
  // const {phantom,publicKey} = usePhantomWallet()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

 

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, media: e.target.files[0] });
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#000] text-white mb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Icon icon="solar:rocket-bold" className="text-[#3ebd4d]" width="32" height="32" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3ebd4d] to-[#2B3542] bg-clip-text text-transparent">
            Coming soon!
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Coin Name
            </label>
            <input
              type="text"
              id="name"
              disabled
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
              placeholder="Enter coin name"
              required
            />
          </div>

          {/* Ticker Input */}
          <div>
            <label htmlFor="ticker" className="block text-sm font-medium text-gray-300 mb-2">
              Ticker Symbol
            </label>
            <input
              type="text"
              id="ticker"
              disabled
              value={formData.ticker}
              onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
              className="w-full px-4 py-3 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
              placeholder="e.g., BTC, ETH"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              disabled
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400 min-h-[120px] resize-y"
              placeholder="Describe your coin..."
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <label htmlFor="media" className="block text-sm font-medium text-gray-300 mb-2">
              Logo / Video
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-[#3ebd4d] transition-colors">
              <div className="space-y-1 text-center">
                <Icon icon="solar:upload-bold" className="mx-auto text-gray-400" width="32" height="32" />
                <div className="flex text-sm text-gray-400">
                  <label
                    htmlFor="media-upload"
                    className="relative cursor-pointer rounded-md font-medium text-[#3ebd4d] hover:text-[#3ebd4d]/80"
                  >
                    <span>Upload a file</span>
                    <input
                      id="media-upload"
                      name="media-upload"
                      disabled
                      type="file"
                      className="sr-only"
                      accept="image/*,video/*"
                      onChange={handleMediaChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          {formData.media && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
              <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                <Image
                  src={URL.createObjectURL(formData.media)}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled
              className="w-full px-6 py-3 bg-[#3ebd4d] hover:bg-[#3ebd4d]/80 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Icon icon="solar:rocket-bold" width="20" height="20" />
              Create Coin
            </button>
          </div>
        </form>
      </div>
    </div>
    <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-0">
            <Image src="/cb1.jpg" alt="Agent Character" width={80} height={80} className="rounded-lg" />
            <a href="https://x.com/SendbeastAI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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
            <p>Sendbeast Agent v1.0</p>
            
          </div>
        </div>
      </footer>
    </>
  );
}




// const AddcoinPage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen w-screen flex justify-center items-center bg-[var(--background)]">
//         <Navbar />
//         <CircularProgress
//           size={60}
//           thickness={4}
//           className="text-blue-500"
//         />
//       </div>
//     );
//   }
//   return (
//     <div>
//       <AddCoin/>
//     </div>
//   )
// }

// export default AddcoinPage