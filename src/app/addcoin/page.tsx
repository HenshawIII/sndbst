'use client';

import { useState } from 'react';
import { Icon } from "@iconify/react";
import Image from 'next/image';
import Navbar from '../components/Navbar';
export default function AddCoin() {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    description: '',
    media: null as File | null
  });

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
            Coming Soon!
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
    </>
  );
}


// 'use client';

// import { useState } from 'react';
// import { Icon } from "@iconify/react";
// import Image from 'next/image';
// import Navbar from '../components/Navbar';
// import {  usePhantomWallet } from '../components/PhantomWallet';

// import { VersionedTransaction, Connection, PublicKey, Keypair } from '@solana/web3.js';
// // import { PhantomWalletProvider } from '../components/PhantomWallet';

// const RPC_ENDPOINT = process.env.NEXT_PUBLIC_RPC_ENDPOINT as string;

// export default function AddCoin() {
//   const [formData, setFormData] = useState({
//     name: '',
//     ticker: '',
//     description: '',
//     media: null as File | null,
//     website: '',
//     twitter: '',
//     telegram: '',
//   });
//   const { phantom, publicKey } = usePhantomWallet();
//   // Social links dropdown state
//   const [showLinks, setShowLinks] = useState({
//     website: false,
//     twitter: false,
//     telegram: false,
//   });

  
//   const solanaProvider = phantom?.solana ?? phantom;
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//   };

//   const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData({ ...formData, media: e.target.files[0] });
//     }
//   };

//   async function handleLaunchOnPumpFun(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // 1. Upload image and metadata to Pump.fun IPFS
//       const formData = new FormData(e.target as HTMLFormElement);
//       const file = formData.get("media") as File;
//       const name = formData.get("name") as string;
//       const symbol = formData.get("ticker") as string;
//       const description = formData.get("description") as string;
//       const twitter = formData.get("twitter") as string;
//       const telegram = formData.get("telegram") as string;
//       const website = formData.get("website") as string;
//       // formData.append("showName", "true");
//       const showName = true;
//       setFormData({  name: name, ticker: symbol, description: description, media: file, twitter: twitter, telegram: telegram, website: website});

//       const metadataResponse = await fetch("https://pump.fun/api/ipfs", {
//         method: "POST",
//         body: formData,
//       });
//       const metadataResponseJSON = await metadataResponse.json();

//       // 2. Request the create transaction from Pump.fun
//       const mintKeypair = Keypair.generate();
//       const txResponse = await fetch(`https://pumpportal.fun/api/trade-local`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           publicKey: publicKey?.toBase58(),
//           action: "create",
//           tokenMetadata: {
//             name: metadataResponseJSON.metadata.name,
//             symbol: metadataResponseJSON.metadata.symbol,
//             uri: metadataResponseJSON.metadataUri
//           },
//           mint: mintKeypair.publicKey.toBase58(),
//           denominatedInSol: "true",
//           amount: 1,
//           slippage: 10,
//           priorityFee: 0.0005,
//           pool: "pump"
//         })
//       });

//       if (txResponse.status === 200) {
//         const data = await txResponse.arrayBuffer();
//         const tx = VersionedTransaction.deserialize(new Uint8Array(data));
//         tx.sign([mintKeypair]);
//         const signedTx = await solanaProvider.signTransaction(tx);
//         const connection = new Connection(RPC_ENDPOINT, 'confirmed');
//         const signature = await connection.sendRawTransaction(signedTx.serialize());
//         alert("Transaction sent! https://solscan.io/tx/" + signature);
//       } else {
//         alert("Error: " + txResponse.statusText);
//       }
//     } catch (e: any) {
//       alert("Error: " + e.message);
//     }
//     setLoading(false);
//   }

//   return (
//     <>
      
//       <Navbar />
//       <div className="min-h-screen bg-[#000] text-white mb-20">
//         {/* Header */}
//         <div className="max-w-4xl mx-auto pt-20 px-4">
//           <div className="flex items-center justify-center gap-3 mb-12">
//             <Icon icon="solar:rocket-bold" className="text-[#3ebd4d]" width="32" height="32" />
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3ebd4d] to-[#2B3542] bg-clip-text text-transparent">
//               Launch Your Coin!
//             </h1>
//           </div>

//           {/* Responsive Form + Preview */}
//           <div className="flex flex-col lg:flex-row gap-8 items-start">
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-6 w-full lg:w-[60%]">
//               {/* Name Input */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                   Coin Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
//                   placeholder="Enter coin name"
//                   required
//                 />
//               </div>

//               {/* Ticker Input */}
//               <div>
//                 <label htmlFor="ticker" className="block text-sm font-medium text-gray-300 mb-2">
//                   Ticker Symbol
//                 </label>
//                 <input
//                   type="text"
//                   id="ticker"
//                   value={formData.ticker}
//                   onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
//                   placeholder="e.g., BTC, ETH"
//                   required
//                 />
//               </div>

//               {/* Description Input */}
//               <div>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full px-4 py-3 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400 min-h-[120px] resize-y"
//                   placeholder="Describe your coin..."
//                   required
//                 />
//               </div>

//               {/* Media Upload */}
//               <div>
//                 <label htmlFor="media" className="block text-sm font-medium text-gray-300 mb-2">
//                   Logo / Video
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-[#3ebd4d] transition-colors">
//                   <div className="space-y-1 text-center">
//                     <Icon icon="solar:upload-bold" className="mx-auto text-gray-400" width="32" height="32" />
//                     <div className="flex text-sm text-gray-400">
//                       <label
//                         htmlFor="media-upload"
//                         className="relative cursor-pointer rounded-md font-medium text-[#3ebd4d] hover:text-[#3ebd4d]/80"
//                       >
//                         <span>Upload a file</span>
//                         <input
//                           id="media-upload"
//                           name="media-upload"
//                           type="file"
//                           className="sr-only"
//                           accept="image/*,video/*"
//                           onChange={handleMediaChange}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Social Links Dropdown */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Add Social Links (optional)
//                 </label>
//                 <div className="flex gap-4 mb-2">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={showLinks.website}
//                       onChange={() => setShowLinks(s => ({ ...s, website: !s.website }))}
//                       className="accent-[#3ebd4d]"
//                     />
//                     Website
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={showLinks.twitter}
//                       onChange={() => setShowLinks(s => ({ ...s, twitter: !s.twitter }))}
//                       className="accent-[#3ebd4d]"
//                     />
//                     Twitter
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={showLinks.telegram}
//                       onChange={() => setShowLinks(s => ({ ...s, telegram: !s.telegram }))}
//                       className="accent-[#3ebd4d]"
//                     />
//                     Telegram
//                   </label>
//                 </div>
//                 {showLinks.website && (
//                   <input
//                     type="url"
//                     placeholder="Website URL"
//                     value={formData.website}
//                     onChange={e => setFormData({ ...formData, website: e.target.value })}
//                     className="w-full px-4 py-3 mt-2 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
//                   />
//                 )}
//                 {showLinks.twitter && (
//                   <input
//                     type="url"
//                     placeholder="Twitter URL"
//                     value={formData.twitter}
//                     onChange={e => setFormData({ ...formData, twitter: e.target.value })}
//                     className="w-full px-4 py-3 mt-2 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
//                   />
//                 )}
//                 {showLinks.telegram && (
//                   <input
//                     type="url"
//                     placeholder="Telegram URL"
//                     value={formData.telegram}
//                     onChange={e => setFormData({ ...formData, telegram: e.target.value })}
//                     className="w-full px-4 py-3 mt-2 bg-[#1d2127] border border-gray-600 rounded-lg focus:outline-none focus:border-[#3ebd4d] text-white placeholder-gray-400"
//                   />
//                 )}
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-full px-6 py-3 bg-[#3ebd4d] hover:bg-[#3ebd4d]/80 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Icon icon="solar:rocket-bold" width="20" height="20" />
//                   Create Coin
//                 </button>
//               </div>
//             </form>

//             {/* Preview */}
//             <div className="w-full lg:w-[40%] flex flex-col items-center mt-8 lg:mt-0">
//               {formData.media ? (
//                 <>
//                   <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
//                   <div className="relative w-40 h-40 rounded-lg overflow-hidden">
//                     <Image
//                       src={URL.createObjectURL(formData.media)}
//                       alt="Preview"
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-sm font-medium text-gray-300 mb-2">Preview:</p>
//                   <div className="relative w-40 h-32 rounded-lg overflow-hidden bg-[#1d2127] flex items-center justify-center">
//                     {/* <Image
//                       src="/placeholder.png"
//                       alt="Placeholder"
//                       fill
//                       className="object-contain opacity-40"
//                     /> */}
//                     <p className='text-gray-400 text-sm'>No image selected</p>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <footer className="py-8 px-4 border-t border-[rgba(255,255,255,0.1)]">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="flex items-center gap-2 md:gap-4 mb-4 md:mb-0">
//             <Image src="/cb1.jpg" alt="Agent Character" width={80} height={80} className="rounded-lg" />
//             <a href="https://x.com/CoinbeastAI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
//               <div className="rounded-2xl flex items-center justify-center">
//                 <Image
//                   src="/xpn.svg"
//                   width={40}
//                   height={40}
//                   alt="Sendai Logo"
//                   className="rounded-xl"
//                 />
//               </div>
//             </a>
//           </div>
//           <div className="text-gray-400 text-sm flex flex-row-reverse gap-2 items-center justify-around">
//             <p>Coinbeast Agent v1.0</p>
//           </div>
//         </div>
//       </footer>
      
//     </>
//   );
// }
