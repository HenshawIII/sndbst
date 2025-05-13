'use client';

import Image from 'next/image';
import { Icon } from "@iconify/react";

export default function Docs() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-left mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
          Documentation
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Learn how to use Coinbeast Agent to its full potential. From basic setup to advanced features.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Navigation */}
        {/* <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Contents</h2>
            <nav className="space-y-2">
              {[
                "Getting Started",
                "Core Features",
                "Market Analysis",
                "Portfolio Management",
                "Trading Strategies",
                "Risk Management",
                "API Integration",
                "Best Practices"
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-gray-300 hover:text-[#3ebd4d] transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div> */}

        {/* Main Documentation */}
        <div className="lg:col-span-2 space-y-12">
          {/* Getting Started Section */}
          <section id="getting-started" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                Coinbeast Agent is designed to be your intelligent companion in the world of cryptocurrency trading. 
                Let us walk through the setup process and basic usage.
              </p>

              <div className="bg-[#20242D] rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Start</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                      <span className="text-[#3ebd4d] font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Connect Your Wallet</h4>
                      <p className="text-gray-400">Click the Connect Wallet button and authorize the connection through your Phantom wallet.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                      <span className="text-[#3ebd4d] font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Launch the Agent</h4>
                      <p className="text-gray-400">Once connected, click Launch Agent to start interacting with the AI assistant.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                      <span className="text-[#3ebd4d] font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Start Trading</h4>
                      <p className="text-gray-400">Begin by asking the agent about market conditions or specific trading strategies.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Example Image */}
              <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
                <Image
                  src="/coinbasee.png"
                  alt="Coinbeast Agent Interface"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>

              <h3 className="text-2xl font-semibold text-white mb-4">Basic Commands</h3>
              <div className="bg-[#1A1F2A] rounded-xl p-6 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{`// Example commands
"What is my wallet balance?"
"Show me trending tokens"
"Analyze my portfolio performance"
"audit this token address for scams"
"What is the price of SOL?"
"Monitor price movements for SOL"`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Core Features Section */}
          <section id="core-features" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Real-time Analysis",
                  description: "Get instant market insights and trend analysis powered by advanced AI algorithms.",
                  icon: "solar:chart-bold"
                },
                {
                  title: "Portfolio Tracking",
                  description: "Monitor your assets and receive intelligent recommendations for portfolio optimization.",
                  icon: "solar:pie-chart-bold"
                },
                {
                  title: "Automated Trading",
                  description: "Set up automated trading strategies based on your risk tolerance and goals.",
                  icon: "mdi:robot"
                },
                {
                  title: "Risk Management",
                  description: "Receive detailed risk assessments and market volatility analysis.",
                  icon: "solar:shield-check-bold"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 hover:border-[#3ebd4d]/30 hover:shadow-[0_0_20px_rgba(62,189,77,0.1)] transition-all duration-300"
                >
                  <Icon 
                    icon={feature.icon} 
                    className="text-[#3ebd4d] mb-4" 
                    width="32" 
                    height="32" 
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* API Integration Section */}
          <section id="api-integration" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">API Integration</h2>
            <div className="bg-[#20242D] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Getting Your API Key</h3>
              <p className="text-gray-300 mb-6">
                To integrate Coinbeast Agent with your applications, you will need to obtain an API key. 
                Follow these steps to get started:
              </p>
              <div className="bg-[#1A1F2A] rounded-xl p-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{`// Example API request
const response = await fetch('https://api.coinbeast.ai/v1/analysis', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symbol: 'BTC/USD',
    timeframe: '1h',
    indicators: ['RSI', 'MACD']
  })
});`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 