'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

// Declare the custom element type
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gecko-coin-price-marquee-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          locale?: string;
          'dark-mode'?: string;
          'transparent-background'?: string;
          outlined?: string;
          'coin-ids'?: string;
          'initial-currency'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function TokenBanner() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  return (
    <div className="w-[105vw] md:w-full bg-[#20242D] p-4">
      <Script 
        src="https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      {isScriptLoaded && (
        <div className="w-full" id="gecko-widget-container">
          <gecko-coin-price-marquee-widget 
            locale="en" 
            dark-mode="true" 
            transparent-background="true" 
            outlined="true" 
            coin-ids="sui,vanar-chain,new-xai-gork,ai-companions,official-trump,berachain-bera,solana,verasity,mantra-dao,ondo-finance,kaspa,pepe,ava-ai,particle-network,bitcoin,ethereum" 
            initial-currency="usd"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
} 