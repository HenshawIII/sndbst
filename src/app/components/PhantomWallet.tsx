"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { usePrivy } from '@privy-io/react-auth';

// Add type declaration for window.solana
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect?: () => Promise<{ publicKey: PublicKey }>;
      disconnect?: () => Promise<void>;
      publicKey?: PublicKey;
      signTransaction?: (transaction: Transaction | VersionedTransaction) => Promise<Transaction | VersionedTransaction>;
      signAndSendTransaction?: (transaction: Transaction | VersionedTransaction) => Promise<{ signature: string }>;
    };
  }
}

interface PhantomWalletContextType {
  phantom: any;
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (transaction: Transaction | VersionedTransaction) => Promise<{ signature: string }>;
}

const PhantomWalletContext = createContext<PhantomWalletContextType | undefined>(undefined);

export function PhantomWalletProvider({ children }: { children: ReactNode }) {
  const [phantom, setPhantom] = useState<any>(null);
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const { authenticated } = usePrivy();

  useEffect(() => {
    const initWallet = async () => {
      if (!authenticated) return;

      try {
        // Check for installed Phantom extension
        const provider = window?.solana;
        
        if (provider?.isPhantom) {
          // Use the embedded wallet directly
          setPhantom(provider);
        
        // Check if already connected
          if (provider.publicKey) {
            setPublicKey(provider.publicKey);
              setConnected(true);
          }
        } else {
          console.error("Phantom wallet not found! Please install Phantom.");
        }
      } catch (error) {
        console.error("Error initializing Phantom wallet:", error);
      }
    };

    initWallet();
  }, [authenticated]);

  const connect = async () => {
    const provider = window?.solana;
    
    if (!provider?.isPhantom || !provider.connect) {
      console.error("Phantom wallet not found or connect method not available!");
      return;
    }
    
    try {
      setConnecting(true);
      
      // Connect directly to the extension
      const resp = await provider.connect();
      console.log("Connected to Phantom:", resp);
      
      if (resp.publicKey) {
        setPublicKey(resp.publicKey);
        setConnected(true);
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error);
      throw error;
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    const provider = window?.solana;
    
    if (!provider?.isPhantom || !provider.disconnect) return;
    
    try {
      await provider.disconnect();
      setPublicKey(null);
      setConnected(false);
    } catch (error) {
      console.error("Error disconnecting from Phantom wallet:", error);
    }
  };

  const signAndSendTransaction = async (transaction: Transaction | VersionedTransaction) => {
    const provider = window?.solana;
    
    if (!provider?.isPhantom || !provider.signAndSendTransaction) {
      const err = new Error("Phantom wallet not found or signAndSendTransaction method not available!");
      console.error(err);
      throw err;
    }
    
    try {
      const result = await provider.signAndSendTransaction(transaction);
      return result;
    } catch (error) {
      // Enhanced error logging
      console.error("Error signing and sending transaction:", error);
      if (error && typeof error === 'object') {
        const errObj = error as Record<string, unknown>;
        for (const key in errObj) {
          if (Object.prototype.hasOwnProperty.call(errObj, key)) {
            console.error(`Error property [${key}]:`, errObj[key]);
          }
        }
      }
      throw error;
    }
  };

  // If not authenticated, don't render the provider
  if (!authenticated) {
    return <>{children}</>;
  }

  return (
    <PhantomWalletContext.Provider
      value={{
        phantom,
        publicKey,
        connected,
        connecting,
        connect,
        disconnect,
        signAndSendTransaction,
      }}
    >
      {children}
    </PhantomWalletContext.Provider>
  );
}

export function usePhantomWallet() {
  const context = useContext(PhantomWalletContext);
  if (context === undefined) {
    throw new Error("usePhantomWallet must be used within a PhantomWalletProvider");
  }
  return context;
} 