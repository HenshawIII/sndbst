'use client';

import Image from 'next/image';
import { Icon } from "@iconify/react";

export default function Docs() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:pt-2 flex bg-[#000]">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col justify-center pt-28 fixed left-0 top-0 h-screen w-[300px] bg-[#000] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 z-30">
        <div>
          {/* <h2 className="text-xl font-semibold text-white mb-4">Contents</h2> */}
          <nav className="space-y-4">
            <div className="mb-10">
              <h3 className=" font-bold text-white mb-4 uppercase tracking-wide">Getting Started</h3>
              <a href="#getting-started" className=" text-gray-400 text-sm pb-1 hover:text-[#3ebd4d] transition-colors mb-1 flex items-center">
                <Icon icon="mdi:rocket-launch" width={18} height={18} className="mr-2 inline-block align-middle" />
                Getting Started
              </a>
              <a href="#core-features" className=" text-gray-400 text-sm hover:text-[#3ebd4d] transition-colors mb-1 flex items-center">
                <Icon icon="mdi:star-circle" width={18} height={18} className="mr-2 inline-block align-middle" />
                Core Features
              </a>
            </div>
            <div className="mt-10">
              <h3 className=" font-bold text-white mb-2 uppercase tracking-wide">Basics</h3>
              <a href="#market-analysis" className="text-gray-400 pb-1 text-sm hover:text-[#3ebd4d] transition-colors mb-1 flex items-center">
                <Icon icon="mdi:chart-line" width={18} height={18} className="mr-2 inline-block align-middle" />
                Market Analysis
              </a>
              {/* <a href="#portfolio-management" className="block text-gray-400 py-1 text-sm hover:text-[#3ebd4d] transition-colors mb-1">Portfolio Management</a> */}
              <a href="#trading-strategies" className="text-gray-400 pb-1 text-sm hover:text-[#3ebd4d] transition-colors mb-1 flex items-center">
                <Icon icon="mdi:swap-horizontal" width={18} height={18} className="mr-2 inline-block align-middle" />
                Trading Strategies
              </a>
              {/* <a href="#risk-management" className="block text-gray-400 py-1 text- sm hover:text-[#3ebd4d] transition-colors mb-1">Risk Management</a> */}
              <a href="#api-integration" className="text-gray-400 pb-1 text-sm hover:text-[#3ebd4d] transition-colors mb-1 flex items-center">
                <Icon icon="mdi:api" width={18} height={18} className="mr-2 inline-block align-middle" />
                API Integration
              </a>
              <a href="#basic-commands" className="text-gray-400 text-sm hover:text-[#3ebd4d] transition-colors mb-1 flex items-center">
                <Icon icon="mdi:console" width={18} height={18} className="mr-2 inline-block align-middle" />
                Basic Commands
              </a>
            </div>
          </nav>
        </div>
        <div className="mt-24 justify-self-end flex flex-row  border-2 border-gray-500 px-8 rounded-md  ">
          <a
            href="https://www.gitbook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left text-gray-400 py-3 rounded-lg transition-colors shadow-lg flex items-center gap-2"
          >
            <Image src="/gbk.svg" alt="GitBook" width={20} height={20} className="inline-block" />
           <p className=''> Powered by GitBook</p>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[320px] w-full bg-[#000] mt-0">
        {/* Header */}
        <div className="text-left mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-700 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Learn how to use Coinbeast to its full potential. From basic setup to advanced features.
          </p>
        </div>

        {/* Main Documentation */}
        <div className="space-y-12">
          {/* Getting Started Section */}
          <section id="getting-started" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                Coinbeast is designed to be your intelligent companion in the world of cryptocurrency trading. 
                Let us walk through the setup process and basic usage.
              </p>

              <div className="bg-[#000]  rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Start</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                      <span className="text-[#3ebd4d] font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Connect Your Wallet</h4>
                      <p className="text-gray-400">Click the Connect Wallet button and log in with any of the available options , a phantom wallet extension will be provided if not already installed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                      <span className="text-[#3ebd4d] font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Launch Coinbeast</h4>
                      <p className="text-gray-400">Once logged in, Coinbeast will check for phantom wallet extension and connect to it</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                      <span className="text-[#3ebd4d] font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Start Interacting</h4>
                      <p className="text-gray-400">Begin by asking Coinbeast about market conditions or wallet balances.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3ebd4d]/10 flex items-center justify-center">
                        <span className="text-[#3ebd4d] font-semibold">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Get Insights</h4>
                      <p className="text-gray-400">Ask Coinbeast to get insights about a specific token or fetch trending tokens.</p>
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

              <h3 className="text-2xl font-semibold text-white mb-4" id="basic-commands">Basic Commands</h3>
              <div className="bg-[#000] rounded-xl p-6 mb-6">
                <pre className="text-gray-300 overflow-x-auto bg-[#1A1F2A]">
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
                  className="bg-[#1A1F2A] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 hover:border-[#3ebd4d]/30 hover:shadow-[0_0_20px_rgba(62,189,77,0.1)] transition-all duration-300"
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

          {/* Market Analysis Section */}
          <section id="market-analysis" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">Market Analysis</h2>
            <div className="bg-[#000] rounded-xl p-6 mb-6 ">
              <p className="text-gray-300">
                Use Coinbeast to get real-time market data, price trends, and analytics for your favorite tokens. Ask about current prices, historical performance, or trending assets to stay ahead in the market.
              </p>
            </div>
          </section>

          {/* Trading Strategies Section */}
          <section id="trading-strategies" className="scroll-mt-24">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-white mr-4">Trading Strategies</h2>
              <span className="flex items-center bg-yellow-500/10 text-yellow-400 text-sm font-semibold px-3 py-1 rounded-full">
                <Icon icon="mdi:clock-fast" width={18} height={18} className="mr-1" />
                Coming Soon
              </span>
            </div>
            <div className="bg-[#000] rounded-xl p-6 mb-6">
              <p className="text-gray-300">
                Discover and implement trading strategies with the help of Coinbeast. Whether you are a beginner or an experienced trader, get suggestions for DCA, swing trading, or custom strategies tailored to your goals.
              </p>
            </div>
          </section>

          {/* API Integration Section */}
          <section id="api-integration" className="scroll-mt-24 ">
            <h2 className="text-3xl font-bold text-white mb-6">API Integration</h2>
            <div className="bg-[#000] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Getting Your API Key</h3>
              <p className="text-gray-300 mb-6">
                To integrate Coinbeast with your applications, you will need to obtain an API key. 
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
      </main>
    </div>
  );
} 