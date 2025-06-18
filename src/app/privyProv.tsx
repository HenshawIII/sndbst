  'use client';

  import {PrivyProvider} from '@privy-io/react-auth';
  import { qMainnet, mainnet, metachain, baseSepolia } from 'viem/chains';
  import { defineChain } from 'viem';
  import {toSolanaWalletConnectors} from "@privy-io/react-auth/solana";
  

  export const ethereumMainnet = defineChain({
    id: 1, // Ethereum Mainnet chain ID
    name: 'Ethereum Mainnet',
    network: 'homestead', // This is the network name used for Ethereum Mainnet
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['https://cloudflare-eth.com'],
      },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  });

  export default function Providers({children}: {children: React.ReactNode}) {
    return (
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVYAPP_ID ?? ""}
        clientId={process.env.NEXT_PUBLIC_PRIVYCLIENT_ID ?? ""}
        config={{
          // Create embedded wallets for users who don't have a wallet
          appearance: {
              landingHeader: '',
              loginMessage: 'Sendbeast',
              theme: 'light',
              accentColor: '#3351FF',
              showWalletLoginFirst: false,
              walletChainType: 'solana-only',
              walletList: [ 'phantom'],
              // walletConnectors: ['phantom'],
            },
            loginMethods: ['email','wallet' ,'google','twitter'],
            externalWallets: {solana: {connectors: toSolanaWalletConnectors()}},
           
            
            
            // walletConnectors: ['phantom'],
            
          
          
        }}
      >
        {children}
      </PrivyProvider>
    );
  }