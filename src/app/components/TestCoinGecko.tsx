'use client';

import { useEffect } from 'react';

export default function TestCoinGecko() {
  useEffect(() => {
    const testCoinGecko = async () => {
      try {
        console.log('Making test request to CoinGecko...');
        const response = await fetch('/api/coingecko/simple/price?ids=solana&vs_currencies=usd');
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers));
        
        // Log the raw response text
        const rawText = await response.text();
        console.log('Raw response:', rawText);
        
        // Only try to parse as JSON if we have content
        if (rawText) {
          const data = JSON.parse(rawText);
          console.log('Parsed response:', data);
        } else {
          console.log('Empty response received');
        }
      } catch (error) {
        console.error('Error fetching from CoinGecko:', error);
      }
    };

    testCoinGecko();
  }, []);

  return null;
} 