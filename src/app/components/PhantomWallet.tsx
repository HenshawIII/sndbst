"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createPhantom, Position } from "@phantom/wallet-sdk";
import { PublicKey } from "@solana/web3.js";
import { usePrivy } from '@privy-io/react-auth';

interface PhantomWalletContextType {
  phantom: any;
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
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
      // Only initialize Phantom if user is authenticated
      if (!authenticated) {
        return;
      }

      try {
        // Initialize Phantom wallet as a popup
        const phantomInstance = await createPhantom({
          position: Position.bottomRight,
          namespace: "phantom-sak",
        });
        
        setPhantom(phantomInstance);
        
        // Check if already connected
        try {
          if (phantomInstance.solana) {
            // Try to connect silently if the user has previously connected
            const account = await phantomInstance.solana.connect();
            console.log("account", account);
            if (account) {
              setPublicKey(phantomInstance.solana.publicKey);
              setConnected(true);
            }
          }
        } catch (error) {
          // Silent connection failed, user needs to connect manually
          console.log("Not previously connected");
        }
      } catch (error) {
        console.error("Error initializing Phantom wallet:", error);
      }
    };

    initWallet();
  }, [authenticated]); // Add authenticated as a dependency

  const connect = async () => {
    if (!phantom?.solana) return;
    
    try {
      setConnecting(true);
      phantom.show(); // Show the wallet UI
      
      const account = await phantom.solana.connect();
      if (account) {
        setPublicKey(phantom.solana.publicKey);
        setConnected(true);
      }
    } catch (error) {
      console.error("Error connecting to Phantom wallet:", error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    if (!phantom?.solana) return;
    
    try {
      await phantom.solana.disconnect();
      setPublicKey(null);
      setConnected(false);
    } catch (error) {
      console.error("Error disconnecting from Phantom wallet:", error);
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