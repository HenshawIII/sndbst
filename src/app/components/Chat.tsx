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
  const { phantom, connected, publicKey } = usePhantomWallet();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // console.log("publicKey", publicKey);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
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
          COINGECKO_DEMO_API_KEY: process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "CG-oSn1QEGnT1dixqQi3cTrRHDT"
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
        system: `You are a helpful and friednly agent that can interact onchain using the Solana Agent Kit. You have access to: ${solanaTools ? Object.keys(solanaTools).map(tool => `\n- ${tool}`).join('') : 'none'}. 

        For CoinGecko API, use these endpoints:
        1. Search coins: https://api.coingecko.com/api/v3/search?query={coin_name}&x_cg_demo_api_key=CG-oSn1QEGnT1dixqQi3cTrRHDT
           Replace {coin_name} with the coin user asks about
        
        2. Trending tokens: https://api.coingecko.com/api/v3/search/trending?x_cg_demo_api_key=CG-oSn1QEGnT1dixqQi3cTrRHDT
           Use this when user mentions "trending"

        For all other queries, use standard tools without CoinGecko.

        Mint address for $SEND is SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa

        Recent context:
        ${messages.slice(-1).map(msg => 
          `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n')}`,
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
    <div className="w-full max-w-4xl flex flex-col h-[calc(100vh-24px)] mt-20 mx-auto px-4">
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
                'Please connect your Phantom wallet to access your AI agent'
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Chat with AI</h1>
            {messages.length > 0 && (
              <button
                onClick={() => setShowClearModal(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Clear Chat
              </button>
            )}
          </div>

          {/* Clear Chat Confirmation Modal */}
          {showClearModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
              <div className="bg-[#20242D] rounded-lg p-6 max-w-sm w-full mx-4 border border-[rgba(255,255,255,0.1)]">
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
                    onClick={clearChat}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Clear Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col overflow-hidden rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-start justify-start h-full px-4 pt-24" style={{ backgroundColor: 'black',backgroundImage: 'url(/cb2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <h1 className="text-4xl font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Welcome, {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                  </h1>
                  <p className="text-lg mt-3 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                    how can I help you?
                  </p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className="flex items-start justify-start">
                    <div className="flex-shrink-0 mr-3">
                      <div
                        className={`${m.role === "user" ? "bg-[#2658DD] rounded-lg" : "bg-[#2e2f2e] rounded-lg"} flex items-center justify-center w-8 h-8`}
                      >
                        {m.role === "user" ? (
                          <Image
                            src="/icons/user-icon.png"
                            alt="User"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        ) : (
                            <Image src="/coinbasee.png" alt="Sendai Logo" width={32} height={32} className="rounded-lg" />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-start">
                      <div className="flex items-center mb-1">
                        <span className="text-xs text-gray-400 mr-2">
                          {m.role === "user" ? "You" : "Phantom Agent"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getCurrentTime()}
                        </span>
                      </div>

                      <div
                        className={
                          m.role === "user"
                            ? "chat-message-user"
                            : "chat-message-ai"
                        }
                      >
                        {typeof m.content === "string" ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: marked(m.content) }}
                            className="prose prose-sm max-w-none"
                          />
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
                                <div className="my-2" key={idx}>
                                  <Image
                                    src={part.url}
                                    alt="AI image"
                                    width={500}
                                    height={300}
                                    className="rounded-lg max-w-full object-cover shadow-lg"
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

                      {m.role === "assistant" && (
                        <div className="flex space-x-2 mt-2">
                          <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
                            <Icon icon="solar:pen-bold" width="16" height="16" />
                          </button>
                          <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
                            <Icon icon="solar:like-bold" width="16" height="16" />
                          </button>
                          <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
                            <Icon
                              icon="solar:dislike-bold"
                              width="16"
                              height="16"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex items-start justify-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="bg-white rounded-lg flex items-center justify-center w-8 h-8">
                      <Image src="/coinbasee.png" alt="Sendai Logo" width={32} height={32} className="rounded-lg" />
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center mb-1">
                      <span className="text-xs text-gray-400 mr-2">Phantom Agent</span>
                      <span className="text-xs text-gray-500">{getCurrentTime()}</span>
                    </div>
                    <div className="chat-message-ai">
                      <TypingAnimation />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="mt-4 p-2 relative">
              <div className="relative flex flex-col bg-gradient-to-br from-[#2B3542]/90 to-[#333D4A]/90 rounded-3xl border border-[#fafafa]/20 overflow-hidden">
                {/* Top part - input field */}
                <div className="w-full px-4 py-3">
                  <textarea
                    className="w-full min-h-[24px] bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 resize-none"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      (e.preventDefault(), handleSend())
                    }
                    disabled={isLoading}
                  />
                </div>

                {/* Bottom part - icons and send button */}
                <div className="flex justify-between items-center px-4 py-2">
                  {/* Left side icons */}
                  <div className="flex items-center gap-3">
                    {/* <button
                      onClick={() => setGodMode(!godMode)}
                      className="text-white opacity-70 hover:opacity-100 p-1 rounded transition-colors flex items-center gap-2"
                    >
                      <div className="relative flex items-center">
                        <div
                          className={`w-8 h-4 rounded-full transition-colors ${godMode ? "bg-[#94959D]/70" : "bg-gray-600/40"}`}
                        >
                          <div
                            className={`absolute w-3 h-3 rounded-full bg-white shadow-md transform transition-transform ${godMode ? "translate-x-4" : "translate-x-1"}`}
                            style={{ top: "2px" }}
                          />
                        </div>
                      </div>
                      <span className="text-xs">God Mode</span>
                    </button> */}
                    {/* <button className="text-white opacity-70 hover:opacity-100 p-1 rounded transition-colors">
                      <Icon icon="solar:upload-linear" width="20" height="20" />
                    </button>
                    <button className="text-white opacity-70 hover:opacity-100 p-1 rounded transition-colors">
                      <Icon icon="solar:link-bold" width="20" height="20" />
                    </button>
                    <button className="text-white opacity-70 hover:opacity-100 p-1 rounded transition-colors">
                      <Icon icon="solar:monitor-linear" width="20" height="20" />
                    </button> */}
                  </div>

                  {/* Right side send button */}
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className=" text-white bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] rounded-full p-2 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Icon
                        icon="solar:alt-arrow-right-bold-duotone"
                        width="24"
                        height="24"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="text-center text-white text-md opacity-50 mt-4">
                Coinbeast Agent v1.0
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom-left page links */}
      {/* <div className="fixed bottom-12 left-12 flex items-center gap-4 text-white opacity-60 hover:opacity-90 transition-opacity">
        <a
          href="https://solana-agent-kit.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1"
        >
          <Icon icon="solar:notebook-square-bold" width="24" height="24" />
          <span>Docs</span>
          <Icon icon="solar:arrow-right-up-bold-duotone" width="16" height="16" />
        </a>
      </div> */}
    </div>
  );
};
