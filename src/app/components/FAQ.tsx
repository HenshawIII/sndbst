'use client';

import { useState } from 'react';
import { Icon } from "@iconify/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Phantom AI Agent?",
    answer: "Phantom AI Agent is an intelligent assistant powered by Solana Agent Kit that can help you interact with the Solana blockchain.It can help you manage tokens, execute transactions, and provide insights about your on-chain activities."
  },
  {
    question: "How do I connect my wallet?",
    answer: "Simply click the 'Connect Wallet' button on the homepage. You'll need to have the Phantom wallet browser extension installed. The agent will guide you through the connection process."
  },
  {
    question: "What can the AI Agent do?",
    answer: "The AI Agent can help you with various Solana blockchain operations including token transfers, checking balances, executing transactions, and providing insights about your wallet activities. It can also answer questions about Solana and help you understand blockchain concepts."
  },
  {
    question: "Is my wallet secure?",
    answer: "Yes, your wallet remains secure as the AI Agent never has direct access to your private keys. All transactions require your explicit approval through the Phantom wallet interface."
  },
  {
    question: "How do I start a conversation?",
    answer: "After connecting your wallet, simply type your question or request in the chat input field. The AI Agent will respond and guide you through any necessary steps for blockchain operations."
  },
  {
    question: "What tokens are supported?",
    answer: "The AI Agent supports all Solana tokens, including SPL tokens. It can help you manage SOL and any other tokens in your wallet."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 ${
              openIndex === index 
                ? 'border-[#3351FF]/50 shadow-[0_0_30px_rgba(51,81,255,0.15)]' 
                : 'hover:border-[#3351FF]/30 hover:shadow-[0_0_20px_rgba(51,81,255,0.1)]'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 ${
              openIndex === index 
                ? 'from-[#3351FF]/5 via-[#3351FF]/10 to-[#3351FF]/5' 
                : 'group-hover:from-[#3351FF]/3 group-hover:via-[#3351FF]/5 group-hover:to-[#3351FF]/3'
            }`}></div>
            
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-300 relative"
            >
              <span className={`font-medium transition-colors duration-300 ${
                openIndex === index ? 'text-[#3351FF]' : 'text-white group-hover:text-[#3351FF]/80'
              }`}>
                {faq.question}
              </span>
              <Icon
                icon={openIndex === index ? "solar:alt-arrow-up-bold" : "solar:alt-arrow-down-bold"}
                className={`transition-all duration-300 ${
                  openIndex === index ? 'text-[#3351FF] rotate-180' : 'text-white group-hover:text-[#3351FF]/80'
                }`}
                width="24"
                height="24"
              />
            </button>
            
            <div className={`transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 py-4 bg-[rgba(255,255,255,0.02)]">
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 