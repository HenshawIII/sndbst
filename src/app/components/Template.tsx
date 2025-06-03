"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";

const TABS = [
  {
    key: "inquiry",
    label: "Inquiry",
    icon: <Icon icon="solar:refresh-bold" width={20} height={20} />,
    color: "border-[#b71ec0] border-2 text-white", // purple
    questions: [
      "fetch trending tokens",
      "fetch details of trump coin",
      "Scan EKpQG... for rug pulls ",
      "Get details of EKpQG... coin",
    ],
  },
  {
    key: "transact",
    label: "Transact",
    icon: <Icon icon="solar:arrow-up-bold" width={20} height={20} />,
    color: "border-[#3ebd4d] border-2 text-white", // green
    questions: [
      "Send 1 SOL to 2P4yA4......",
      "buy 0.1sol worth of trump coin",
      "Send 0.5 SOL to my friend",
      "How do I buy tokens?",
    ],
  },
  {
    key: "general",
    label: "General",
    icon: <Icon icon="solar:user-bold" width={20} height={20} />,
    color: "border-[#b71ec0] border-2 text-white", // blue
    questions: [
      "Hi ,what is your name",
      "What is your wallet address?",
      "what can you do for me?",
      "what is the price of SOL?",
    ],
  },
  {
    key: "bridge",
    label: "Bridge",
    icon: <Icon icon="solar:link-bold" width={20} height={20} />,
    color: "bg-[#6c3ef7] text-white", // purple
    questions: [
      "Bridge 1 SOL to Ethereum",
      "How do I bridge USDC to Polygon?",
      "Show bridge fees",
      "Bridge all my tokens",
    ],
    disabled: false,
  },
  {
    key: "stake",
    label: "Stake",
    icon: <Icon icon="solar:lock-bold" width={20} height={20} />,
    color: "bg-[#2d3a8c] text-white", // blue
    questions: [
      "Stake 5 SOL",
      "Show my staking rewards",
      "Unstake all my SOL",
      "How do I stake tokens?",
    ],
    disabled: false,
  },
];

export default function Template() {
  const [activeTab, setActiveTab] = useState("general");
  const active = TABS.find((tab) => tab.key === activeTab);

  return (
    <section className="w-full flex flex-col items-center ml-2 md:ml-0 py-16 mt-32 mb-20 bg-[#18181a]">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
        Try these commands with our AI agent
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Select a category below to see example commands
      </p>
      {/* Tabs */}
      <div className="grid grid-cols-3  md:grid-cols-5 gap-3 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => !tab.disabled && setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition
              ${
                activeTab === tab.key
                  ? `${tab.color} shadow-lg`
                  : "bg-[#23232b] text-gray-300 hover:bg-[#23232b]/80"
              }
              ${tab.disabled ? "opacity-50 cursor-not-allowed relative" : ""}
            `}
            style={{
              minWidth: 100,
              border: activeTab === tab.key ? "2px solid #6c3ef7" : "none",
            }}
            disabled={tab.disabled}
            data-tooltip-id={tab.disabled ? `tab-tooltip-${tab.key}` : undefined}
            data-tooltip-content={tab.disabled ? "Coming soon!" : undefined}
          >
            {tab.icon}
            {tab.label}
            {tab.disabled && <Tooltip id={`tab-tooltip-${tab.key}`} />}
          </button>
        ))}
      </div>
      {/* Example Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {active?.questions.map((q, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-[#2B3542]/50 hover:bg-[#2B3542]/80 transition text-white rounded-xl px-6 py-5 font-medium text-base shadow-md"
            style={{ minHeight: 56 }}
          >
            <Icon icon="solar:refresh-bold" width={20} height={20} className="text-[#3ebd4d]" />
            {q}
          </div>
        ))}
      </div>
    </section>
  );
}