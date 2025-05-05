'use client';

import { useState } from 'react';
import { Icon } from "@iconify/react";
import { toast } from "sonner";

const TOKEN_ADDRESS = "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa";

export default function StartTrading() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_ADDRESS);
      setIsCopied(true);
      toast.success("Token address copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-8 relative overflow-hidden group">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5 transition-all duration-300"></div>
        
        <div className="relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold text-white">Start Trading $SEND</h2>
              <p className="text-gray-400 text-lg">
                Copy the token address below to start trading $SEND on your favorite DEX. 
                Make sure to verify the contract address before trading.
              </p>
            </div>
            
            <div className="w-full max-w-2xl space-y-6">
              <div className="flex items-center justify-between bg-[rgba(255,255,255,0.05)] px-6 py-4 rounded-xl group/address hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <span className="text-gray-300 font-mono text-base block truncate">
                    {TOKEN_ADDRESS}
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
                >
                  <Icon
                    icon={isCopied ? "solar:check-circle-bold" : "solar:copy-bold"}
                    className={`${isCopied ? 'text-green-500' : 'text-gray-400'} hover:text-white transition-colors`}
                    width="24"
                    height="24"
                  />
                </button>
              </div>
              
              <a
                href={`https://solscan.io/token/${TOKEN_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#3351FF] hover:bg-[#2B44E5] text-white rounded-xl transition-colors w-full"
              >
                <Icon icon="solar:chart-bold" width="24" height="24" />
                View on Solscan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 