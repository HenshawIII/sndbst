"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";

const EXAMPLE_MESSAGES = [
  {
    role: "user",
    content: "What is my wallet balance?",
  },
  {
    role: "assistant",
    content: "Your wallet balance is <b>2.45 SOL</b> Not exactly a treasure trove, but every little bit counts! 🪙💪.",
  },
//   {
//     role: "user",
//     content: "Fetch details of BONK token",
//   },
//   {
//     role: "assistant",
//     content: `
//       <div>
//         <b>Trending tokens:</b>
//         <ul>
//           <li>• <span class="text-[#3ebd4d]">$SOL</span></li>
//           <li>• <span class="text-[#3ebd4d]">$RAY</span></li>
//           <li>• <span class="text-[#3ebd4d]">$USDC</span></li>
//         </ul>
//       </div>
//     `,
//   },
  {
    role: "user",
    content: "Send 0.1 SOL to 2P4yA4......",
  },
  {
    role: "assistant",
    content: `
      <div>
        <b>✅ Transaction Successful!</b><br/>
        0.1 SOL has been sent to <span class="font-mono text-xs">2P4yA4......</span>.<br/>
        <a href="#" class="text-[#3ebd4d] underline">View on Solscan</a>
      </div>
    `,
  },
  {
    role: "user",
    content: "Fetch details of popcat token",
  },
  {
    role: "assistant",
    content: `
      <div>
        <b>Here are the details of the token:</b><br/>
        <ul>
          <li>Name: <span class="text-[#3ebd4d]">Popcat</span></li>
          <li>Symbol: <span class="text-[#3ebd4d]">POPCAT</span></li>
          <li>Decimals: 6</li>
          <li>Volume: 1,234,567</li>
          <li>Tags: meme, trending</li>
          <li>Image:</li>
        </ul>
    <div>
      <img src="/popcat.png" alt="Popcat" width={100} height={100} />
    </div>
      </div>
    `,
  },
];

const EXAMPLE_MESSAGES_ALWAYS = EXAMPLE_MESSAGES.slice(0, 4);
const EXAMPLE_MESSAGES_LG_ONLY = EXAMPLE_MESSAGES.slice(4);

export default function Examples() {
  return (
    <section className="w-full flex items-center py-16 bg-black">
     
     <div className="w-full lg:w-1/2 hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src="/cb2.jpg"
              alt="Coinbeast Agent Interface"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
         
      <div className="relative rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-0.5 max-w-2xl w-full">
        {/* Browser bar mockup */}
        <div className="flex items-center gap-2 mx-auto px-4 py-2 bg-[#23272f] ml-4 md:ml-0 rounded-t-2xl border-b border-white/10">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
          <span className="ml-4 text-xs text-gray-400">coinbeast.app/chat</span>
        </div>
        {/* Chat area */}
        <div className="bg-[#20242D]/80 rounded-b-2xl ml-4 md:ml-0 p-8 min-h-[400px] flex flex-col gap-6">
          {/* Always show these messages */}
          {EXAMPLE_MESSAGES_ALWAYS.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-10 h-10 rounded-lg bg-[#2e2f2e] flex items-center justify-center">
                  <Image src="/coinbasee.png" alt="Coinbeast" width={32} height={32} className="rounded-lg" />
                </div>
              )}
              <div
                className={`
                  text-sm
                  ${msg.role === "user"
                    ? "bg-white/20 backdrop-blur border border-white/20 rounded-md px-4 py-2 max-w-[70%] text-right text-white shadow-lg"
                    : "bg-[#3f4d62]/70 rounded-md px-4 py-2 max-w-[70%] text-left text-gray-200 shadow"
                  }
                  break-words
                `}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
              {msg.role === "user" && (
                <div className="w-10 h-10 rounded-lg bg-blue-700/40 flex items-center justify-center">
                  <Image src="/user.png" alt="User" width={24} height={24} className="object-contain" />
                </div>
              )}
            </div>
          ))}

          {/* Only show these messages on large screens */}
          <div className="hidden lg:flex flex-col gap-6">
            {EXAMPLE_MESSAGES_LG_ONLY.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-10 h-10 rounded-lg bg-[#2e2f2e] flex items-center justify-center">
                    <Image src="/coinbasee.png" alt="Coinbeast" width={32} height={32} className="rounded-lg" />
                  </div>
                )}
                <div
                  className={`
                    text-sm
                    ${msg.role === "user"
                      ? "bg-white/20 backdrop-blur border border-white/20 rounded-md px-4 py-2 max-w-[70%] text-right text-white shadow-lg"
                      : "bg-[#3f4d62]/70 rounded-md px-4 py-2 max-w-[70%] text-left text-gray-200 shadow"
                  }
                  break-words
                `}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
                {msg.role === "user" && (
                  <div className="w-10 h-10 rounded-lg bg-[#2658DD] flex items-center justify-center">
                    <Image src="/user.png" alt="User" width={24} height={24} className="object-contain" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fake input area */}
          <div className="flex items-center gap-2 mt-8">
            <div className="flex-1 bg-[#23272f]/80 rounded-lg px-4 py-3 text-gray-400 text-sm">
              Ask me anything...
            </div>
            <button className="bg-[#3ebd4d] hover:bg-[#2658DD] text-white rounded-lg px-4 py-2 transition">
              <Icon icon="solar:alt-arrow-right-bold-duotone" width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}