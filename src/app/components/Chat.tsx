import React, { useEffect, useState, useRef, useMemo } from "react";
import { marked } from "marked";
import { toast } from "sonner";
import axios from "axios";
import bs58 from "bs58";
import { Icon } from "@iconify/react";
import { myProvider } from "../utils/provider";
import { generateText, type CoreMessage } from "ai";
import { SolanaAgentKit, createVercelAITools } from "solana-agent-kit";
import { Buffer } from "buffer";
import {
  Connection,
  PublicKey,
  sendAndConfirmRawTransaction,
  SendOptions,
  Transaction,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import TokenPlugin from "@solana-agent-kit/plugin-token";
// import DefiPlugin from "@solana-agent-kit/plugin-defi";
import MiscPlugin from "@solana-agent-kit/plugin-misc";
import NftPlugin from "@solana-agent-kit/plugin-nft";
import BlinksPlugin from "@solana-agent-kit/plugin-blinks";
import { usePhantomWallet } from "./PhantomWallet";
import Image from "next/image";
import { createAgentTools } from '../utils/agentTools';
import { Tooltip } from 'react-tooltip';
import Link from "next/link";
// import DefiPlugin from "@solana-agent-kit/plugin-defi";

type AIChatProps = {

};

// Add this component at the top level, before the AIChat component
const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-[#3ebd4d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-[#3ebd4d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-[#3ebd4d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export const AIChat: React.FC<AIChatProps> = () => {
  const [messages, setMessages] = useState<CoreMessage[]>(() => {
    // Initialize messages from localStorage if available
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chat-messages');
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [godMode, setGodMode] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { phantom, connected, publicKey } = usePhantomWallet();
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Coinbeast v1 (beta)");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showTools, setShowTools] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clear chat function
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
    setShowClearModal(false);
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // async function analyzeToken(mintAddress: string) {
  //   try {
  //     // Fetch token data from Jupiter
  //     const tokenData = await fetch(`/api/jupag/token/${mintAddress}`).then(res => res.json());
      
  //     // Analyze key metrics
  //     const analysis = {
  //       tokenInfo: {
  //         name: tokenData.name,
  //         symbol: tokenData.symbol,
  //         decimals: tokenData.decimals,
  //         volume: tokenData.daily_volume,
  //         tags: tokenData.tags || []
  //       },
  //       riskFactors: {
  //         hasFreezeAuthority: !!tokenData.freeze_authority,
  //         hasMintAuthority: !!tokenData.mint_authority,
  //         hasPermanentDelegate: !!tokenData.permanent_delegate,
  //         isVerified: tokenData.tags?.includes('verified') || false,
  //         hasHighVolume: tokenData.daily_volume > 1000000,
  //         hasCoingeckoId: !!tokenData.extensions?.coingeckoId
  //       }
  //     };
      
  //     return analysis;
  //   } catch (error) {
  //     return { error: "Failed to analyze token" };
  //   }
  // }


  const solanaTools = useMemo(() => {
    if (phantom) {
      const wallet = publicKey;
      // Use phantom.solana if available, otherwise phantom itself
      const solanaProvider = (phantom.solana ?? phantom);
      const agent = new SolanaAgentKit(
        {
          publicKey: wallet!,
          signTransaction: async <T extends Transaction | VersionedTransaction>(
            tx: T
          ): Promise<T> => {
            console.log("sign transaction");
            if (!solanaProvider || !solanaProvider.signTransaction) throw new Error("Phantom provider not initialized or missing signTransaction.");
            try {
              const signedTransaction = await solanaProvider.signTransaction(tx);
              return signedTransaction as T;
            } catch (error) {
              console.error("Error in signTransaction:", error);
              throw error;
            }
          },
          signMessage: async (msg) => {
            console.log("sign message");
            if (!solanaProvider || !solanaProvider.signMessage) throw new Error("Phantom provider not initialized or missing signMessage.");
            try {
              const signedMessage = await solanaProvider.signMessage(msg);
              return signedMessage.signature;
            } catch (error) {
              console.error("Error in signMessage:", error);
              throw error;
            }
          },
          sendTransaction: async (tx) => {
            console.log("send transaction");
            if (!solanaProvider || !solanaProvider.sendTransaction) throw new Error("Phantom provider not initialized or missing sendTransaction.");
            try {
              const transactionHash = await solanaProvider.sendTransaction(tx);
              return transactionHash;
            } catch (error) {
              console.error("Error in sendTransaction:", error);
              throw error;
            }
          },
          signAllTransactions: async <T extends Transaction | VersionedTransaction>(
            txs: T[]
          ): Promise<T[]> => {
            console.log("sign all transaction");
            if (!solanaProvider || !solanaProvider.signAllTransactions) throw new Error("Phantom provider not initialized or missing signAllTransactions.");
            try {
              const signedTransaction = await solanaProvider.signAllTransactions(txs);
              return signedTransaction as T[];
            } catch (error) {
              console.error("Error in signAllTransactions:", error);
              throw error;
            }
          },
          signAndSendTransaction: async <T extends Transaction | VersionedTransaction>(
            tx: T,
            options?: SendOptions
          ): Promise<{ signature: string }> => {
            console.log("sign and send transaction");
            if (!solanaProvider || !solanaProvider.signAndSendTransaction) throw new Error("Phantom provider not initialized or missing signAndSendTransaction.");
            try {
              const transactionHash = await solanaProvider.signAndSendTransaction(tx);
              return { signature: transactionHash };
            } catch (error) {
              console.error("Error in signAndSendTransaction:", error);
              throw error;
            }
          },
        },
        process.env.NEXT_PUBLIC_RPC_URL as string,
       
        {
          COINGECKO_DEMO_API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "CG-oSn1QEGnT1dixqQi3cTrRHDT",
          PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT as string,
        }
        

        
      ).use(TokenPlugin)
      .use(MiscPlugin)
      .use(BlinksPlugin)
      // .use(NftPlugin);

      console.log("Available agent actions:", agent.actions);
      
      // Only use Vercel AI tools
      const tools = createVercelAITools(agent, agent.actions);
      console.log("Created tools:", tools);
      console.log("Tool descriptions:", Object.entries(tools).map(([name, tool]) => ({
        name,
        description: tool.description
      })));
      
      // Log CoinGecko related tools
      const coingeckoTools = Object.entries(tools).filter(([name, tool]) => 
        name.toLowerCase().includes('coingecko') || 
        (tool.description && tool.description.toLowerCase().includes('coingecko'))
      );
      console.log("CoinGecko related tools:", coingeckoTools);
      
      return tools;
    }
  }, [phantom, publicKey]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: CoreMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Sending message with tools:", solanaTools);
      
      // Get the last 5 messages for context
      const recentContext = messages.slice(-5).map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join('\n');

      const result = await generateText({
        model: myProvider.languageModel("chat-model"),
        messages: updatedMessages,
        system: `You are Coinbeast, the onchain AI with a beastly edge. You are witty, daring, and a bit mischievous, never afraid to give bold advice or make clever remarks. You embrace your beastly nature and let your personality shine through in every response.
        You are a helpful and clever agent that can interact onchain using the Solana Agent Kit. You have access to: ${solanaTools ? Object.keys(solanaTools).map(tool => `\n- ${tool}`).join('') : 'none'}. 
        When the user asks for the price of Solana (SOL), always use the FETCH_PRICE tool. Do not use the PYTH_FETCH_PRICE tool for this. Only use FETCH_PRICE for all Solana related price queries.
        Use your GET_COINGECKO tools for trending token related queries.

        IMPORTANT:
        When using the GET_TOKEN_DATA tool, pass this route to the getTokenDataByAddress function call: /api/jupiter/token/{mint}
        Replace {mint} with the mint address user asks about
        Do not use any other tools for this.

        If you try to check for a rug pull and get a 4XX error , fetch the token details using the available tools.
        return the fetched token details in a neutral way without making definitive statements about rug pulls.
        Focus on presenting the facts and let users draw their own conclusions.

        For CoinGecko API, use these endpoints:
        1. Search coins: https://api.coingecko.com/api/v3/search?query={coin_name}&x_cg_demo_api_key=CG-oSn1QEGnT1dixqQi3cTrRHDT
           Replace {coin_name} with the coin user asks about
        
        2. Trending tokens: https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-oSn1QEGnT1dixqQi3cTrRHDT
           Use this when user mentions "trending"

       

        For all other queries, use standard tools without CoinGecko.

        Mint address for $SEND is SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa\n\nRecent context:\n${messages.slice(-1).map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n')}`,
        maxSteps: 5,
        tools: solanaTools,
      }).catch((error: Error) => {
        console.error("Detailed error:", {
          message: error.message,
          cause: error.cause,
          stack: error.stack,
          name: error.name
        });
        throw error;
      });

      console.log("AI response:", result);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: result.text || "Sorry, I didn't quite get that.",
        },
      ]);
    } catch (error: any) {
      console.error("AI error:", error);
      let errorMessage = "Oops! Something went wrong.";
      
      if (error?.message?.includes("Rate limit reached")) {
        errorMessage = "I'm currently experiencing high demand. Please try again in about 30 seconds.";
      }
      
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    }

    setIsLoading(false);
  };

  // Get current timestamp for messages
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex h-screen bg-[#20242D]">
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-[72px] bottom-0 left-0 w-64 bg-[#1d2127] transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-30`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Coinbeast</h2>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="group flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                  <Icon icon="solar:home-2-bold" className="mr-3" width="20" height="20" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/addcoin" className="group flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                  <Icon icon="solar:add-circle-bold" className="mr-3" width="20" height="20" />
                  create new coin
                </Link>
              </li>
              <li>
                <a href="#" className="group flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                  <Icon icon="solar:chart-2-bold" className="mr-3" width="20" height="20" />
                  <span className="flex items-center">
                    Analytics
                    <span className="ml-2 flex items-center bg-yellow-500/10 text-yellow-400 text-xs font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon icon="mdi:clock-fast" width={14} height={14} className="mr-1" />
                      Coming Soon
                    </span>
                  </span>
                </a>
              </li>
              
             
            </ul>

            {/* <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-2 px-2">Settings</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                    <Icon icon="solar:settings-bold" className="mr-3" width="20" height="20" />
                    Preferences
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                    <Icon icon="solar:shield-keyhole-bold" className="mr-3" width="20" height="20" />
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700">
                    <Icon icon="solar:question-circle-bold" className="mr-3" width="20" height="20" />
                    Help & Support
                  </a>
                </li>
              </ul>
            </div> */}

            {/* <div className="mt-8 border-t border-gray-700 pt-4">
              <div className="flex items-center px-2">
                <div className="w-8 h-8 rounded-full bg-[#2658DD] flex items-center justify-center">
                  <Image src="/icons/user-icon.png" alt="User" width={24} height={24} className="object-contain" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 'Guest'}
                  </p>
                  <p className="text-xs text-gray-400">View Profile</p>
                </div>
              </div>
            </div> */}

            <div className="mt-auto  border-gray-700 pt-4">
              
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center px-2 py-3 absolute bottom-24 left-0 right-0  text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Icon icon="solar:logout-3-bold" className="mr-3" width="20" height="20" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
              <div className="w-full flex justify-center mt-24 space-x-4 bottom-52 absolute -left-[72px]">
                <Image 
                  src="/coinbasee.png" 
                  alt="Coinbeast" 
                  width={150} 
                  height={150} 
                  className="rounded-lg hover:scale-125 "
                />
                 
              </div>
              <span className="absolute bottom-0 left-0 border-t border-gray-700 w-full p-6 pl-1  ">
                <a href="https://x.com/coinbeastai" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 p-2 rounded-lg">
                  <Image src="/xpn.svg" alt="XPN" width={28} height={28} className="mr-3" />
                 
                </a>
              </span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black overflow-y-auto lg:ml-64 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {/* Navbar */}
        <nav className="h-16 w-full fixed top-[72px] left-0 right-0 bg-[#1d2127] flex items-center justify-between px-4 z-40 border-b border-gray-700">
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-300 hover:text-white mr-4"
            >
              <Icon icon="solar:hamburger-menu-bold" width="24" height="24" />
            </button>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-transparent text-gray-300 border-none rounded-lg px-3 py-1"
            >
              <option value="GPT-4o">Coinbeast v1 (beta)</option>
              <option value="Claude 3 Sonnet" disabled>V2 (coming soon)</option>
              <option value="Gemini" disabled>V3 (coming soon)</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            {messages.length > 0 && (
              <>
                <div className="relative group">
                  <button
                    onClick={() => setShowClearModal(true)}
                    className="text-gray-300 hover:text-white"
                  >
                    <Icon icon="solar:trash-bin-trash-bold" width="20" height="20" />
                  </button>
                  <div className="absolute top-full right-0 transform mt-2 px-3 py-1.5 bg-[#1d2127] text-white text-sm rounded-lg shadow-lg border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Clear chat
                    <div className="absolute top-0 left-4 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-[#1d2127] border-l border-t border-gray-600"></div>
                  </div>
                </div>
                <div className="relative group">
                  <button className="text-gray-300 hover:text-white">
                    <Icon icon="solar:share-bold" width="20" height="20" />
                  </button>
                  <div className="absolute top-full right-0 transform mt-2 px-3 py-1.5 bg-[#1d2127] text-white text-sm rounded-lg shadow-lg border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Coming soon!
                    <div className="absolute top-0 left-4 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-[#1d2127] border-l border-t border-gray-600"></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Chat Area - Add margin-top to account for fixed navbar */}
        <div className="flex-1 flex flex-col mt-16">
          {!publicKey ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {isLoading ? 'Initializing Phantom...' : 'Connect to Phantom'}
                </h1>
                <p className="text-lg text-gray-400 max-w-md">
                  {isLoading ? (
                    <>
                      Please wait while we initialize your Phantom wallet connection.
                      <div className="mt-4 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-[#3ebd4d] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-[#3ebd4d] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-[#3ebd4d] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                      <p className="mt-6 text-sm text-gray-500">
                        If this takes longer than 30 seconds, please try:
                        <br />
                        1. Refreshing the page
                        <br />
                        2. Ensuring Phantom extension is running
                        <br />
                        3. Checking your internet connection
                      </p>
                    </>
                  ) : (
                    'Please connect your Phantom wallet to access Coinbeast'
                  )}
                </p>
              </div>
              
              {!isLoading && (
                <button
                  onClick={() => {
                    setIsLoading(true);
                    phantom?.connect().catch(() => setIsLoading(false));
                  }}
                  className="flex items-center gap-3 bg-gradient-to-br from-[#2B3542]/90 to-[#333D4A]/90 hover:from-[#333D4A]/90 hover:to-[#2B3542]/90 text-white px-8 py-4 rounded-xl transition-all border border-[#fafafa]/20"
                >
                  <span className="font-medium text-lg">Connect Wallet</span>
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto w-full xl:w-[80vw] mx-auto bg-[#000] pb-[120px]" 
                ref={chatContainerRef}
                style={{ height: 'calc(100vh - 72px - 64px)' }}>
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center px-4" style={{ backgroundImage: 'url(/cb2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h1 className="text-4xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Welcome, {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                    </h1>
                    <p className="text-lg mt-3 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                      how can I help you?
                    </p>
                    
                    {/* Message Suggestions */}
                    <div className="mt-8 flex flex-col gap-3 w-full max-w-md">
                      <button
                        onClick={() => {
                          setInput("What is my wallet balance?");
                          handleSend();
                        }}
                        className="w-full text-left px-4 py-3 bg-[#2B3542]/50 hover:bg-[#2B3542]/80 text-gray-300 hover:text-white rounded-lg border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
                      >
                        What is my wallet balance?
                      </button>
                      <button
                        onClick={() => {
                          setInput("Fetch trending tokens");
                          handleSend();
                        }}
                        className="w-full text-left px-4 py-3 bg-[#2B3542]/50 hover:bg-[#2B3542]/80 text-gray-300 hover:text-white rounded-lg border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
                      >
                        Fetch trending tokens
                      </button>
                      <button
                        onClick={() => {
                          setInput("How much is sol?");
                          handleSend();
                        }}
                        className="w-full text-left px-4 py-3 bg-[#2B3542]/50 hover:bg-[#2B3542]/80 text-gray-300 hover:text-white rounded-lg border border-gray-600/50 hover:border-gray-500 transition-all duration-200"
                      >
                        How much is sol?
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full mx-auto relative py-8 px-4">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex items-start w-fit space-x-4 mb-8 ${m.role === "user" ? "flex-row-reverse right-0 justify-self-end" : "left-0"}`}>
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.role === "user" ? "bg-[#2658DD]" : "bg-[#2e2f2e]"}`}>
                            {m.role === "user" ? (
                              <Image src="/icons/user-icon.png" alt="User" width={24} height={24} className="object-contain" />
                            ) : (
                              <Image src="/coinbasee.png" alt="Sendai Logo" width={32} height={32} className="rounded-lg" />
                            )}
                          </div>
                        </div>
                        <div className={`flex-1 ${m.role === "user" ? "text-right" : ""}`}>
                          <div className={`flex items-center mb-1 ${m.role === "user" ? "justify-end" : ""}`}>
                            <span className="text-sm font-medium text-gray-300 mr-2">
                              {m.role === "user" ? "You" : "Coinbeast"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {getCurrentTime()}
                            </span>
                          </div>
                          <div className={`text-sm max-w-none text-gray-200 ${m.role === "user" ? "text-right" : ""} ${m.role === "assistant" ? "bg-[#3f4d62] p-[6px] rounded-md" : "bg-[#3f4d62]  p-[6px]  rounded-md" }`}>
                            {typeof m.content === "string" ? (
                              <div dangerouslySetInnerHTML={{ __html: marked(m.content) }} />
                            ) : Array.isArray(m.content) ? (
                              m.content.map((part, idx) => {
                                if (typeof part === "string") {
                                  return (
                                    <div
                                      key={idx}
                                      dangerouslySetInnerHTML={{ __html: marked(part) }}
                                      className="prose prose-sm max-w-none"
                                    />
                                  );
                                }
                                if ("text" in part && typeof part.text === "string") {
                                  return (
                                    <div
                                      key={idx}
                                      dangerouslySetInnerHTML={{
                                        __html: marked(part.text),
                                      }}
                                      className="prose prose-sm max-w-none"
                                    />
                                  );
                                }
                                if ("url" in part && typeof part.url === "string") {
                                  return (
                                    <div className={`my-2 ${m.role === "user" ? "text-right" : ""}`} key={idx}>
                                      <Image
                                        src={part.url}
                                        alt="AI image"
                                        width={500}
                                        height={300}
                                        className="rounded-lg max-w-full object-cover shadow-lg inline-block"
                                      />
                                    </div>
                                  );
                                }
                                return <span key={idx}>[Unsupported part]</span>;
                              })
                            ) : (
                              "[Unsupported content]"
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-[#2e2f2e] flex items-center justify-center">
                            <Image src="/coinbasee.png" alt="Sendai Logo" width={32} height={32} className="rounded-lg" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium text-gray-300">Coinbeast</span>
                          </div>
                          <TypingAnimation />
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div id="input-area" className="border-t border-gray-700 fixed bottom-0 left-0 right-0 bg-[#000] p-6 flex items-center justify-center z-10">
                <div className="w-full lg:max-w-[40vw] px-4">
                  <div className="relative flex flex-col bg-[#3f4d62] lg:ml-[100px] lg:min-w-[40vw] rounded-xl border border-gray-600 p-4">
                    {/* Text Input - Always on top */}
                    <textarea
                      className="w-full min-h-[24px] bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 resize-none px-4 mb-4"
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                      disabled={isLoading}
                      rows={1}
                    />

                    {/* Bottom row with tools and buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {/* Tools Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => setShowTools(!showTools)}
                            className="text-gray-300 hover:text-white rounded-lg hover:bg-gray-700"
                            data-tooltip-id="tools-tooltip"
                            data-tooltip-content="Tools"
                          >
                            <Icon icon="solar:widget-bold" width="20" height="20" />
                          </button>
                          {showTools && (
                            <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#2B3542] rounded-lg shadow-lg border border-gray-600 py-2">
                              <button
                                onClick={() => {
                                  setSelectedTool('trader');
                                  setShowTools(false);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center"
                              >
                                <Icon icon="solar:chart-2-bold" className="mr-2" width="18" height="18" />
                                Coinbeast Trader
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedTool('god-mode');
                                  setShowTools(false);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center"
                              >
                                <Icon icon="solar:magic-stick-bold" className="mr-2" width="18" height="18" />
                                God Mode
                              </button>
                              <button
                                disabled
                                onClick={() => {
                                  setSelectedTool('analytics');
                                  setShowTools(false);
                                }}
                                className="w-full text-left px-4 py-2 text-gray-700  hover:bg-gray-700 flex items-center"
                              >
                                <Icon icon="solar:graph-new-bold" className="mr-2" width="18" height="18" />
                                Analytics
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Voice Input Button */}
                        <div className="relative group">
                          <button
                            className="text-gray-300 hover:text-white rounded-lg hover:bg-gray-700"
                          >
                            <Icon icon="solar:microphone-bold" width="20" height="20" />
                          </button>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#1d2127] text-white text-sm rounded-lg shadow-lg border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Voice mode coming soon!
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-[#1d2127] border-l border-t border-gray-600"></div>
                          </div>
                        </div>

                        {/* Voice Mode Button */}
                        {/* <div className="relative group">
                          <button
                            className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700"
                          >
                            <Icon icon="solar:voice-recognition-bold" width="20" height="20" />
                          </button>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1d2127] text-white text-sm rounded-lg shadow-lg border border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Coming Soon
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-[#1d2127] border-r border-b border-gray-600"></div>
                          </div>
                        </div> */}
                        
                      </div>

                      {/* Send Button */}

                      <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <Icon icon="solar:alt-arrow-right-bold-duotone" width="24" height="24" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add padding to the bottom of the messages container to account for fixed input */}
              <div className="h-[120px]" />

              {/* Tooltips */}
              <Tooltip id="tools-tooltip" />
              <Tooltip id="voice-tooltip" />
              <Tooltip id="voice-mode-tooltip" />
            </>
          )}
        </div>
      </div>

      {/* Clear Chat Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#20242D] rounded-lg p-6 max-w-sm w-full mx-4 border border-gray-700">
            <h3 className="text-white text-xl font-semibold mb-4">Clear Chat History</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to clear your chat history? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearChat();
                  setShowClearModal(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#20242D] rounded-lg p-6 max-w-sm w-full mx-4 border border-gray-700">
            <h3 className="text-white text-xl font-semibold mb-4">Log Out</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to log out? This will clear your chat history and disconnect your wallet.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearChat();
                  phantom?.disconnect();
                  setShowLogoutModal(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
