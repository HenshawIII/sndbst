"use client";
import React from "react";
import { Icon } from "@iconify/react"; // Only needed if you want to add icons

const STEPS = [
  {
    number: 1,
    title: "Connect Wallet",
    description: "Link your wallet to access your personalized AI agent.",
    iconBg: "bg-[#3351FF]/20",
    iconColor: "text-[#838e91]",
  },
  {
    number: 2,
    title: "Customize Agent",
    description: "Configure your agent with the tools you need for your crypto journey.",
    iconBg: "bg-[#3351FF]/20",
    iconColor: "text-[#838e91]",
  },
  {
    number: 3,
    title: "Use It",
    description: (
      <>
        Done! <br />
        I told you it was easy.
      </>
    ),
    iconBg: "bg-[#3351FF]/20",
    iconColor: "text-[#838e91]",
  },
];

export default function Setup() {
  return (
    <section className="w-full py-20 bg-[#18181b] lg:mb-20 flex flex-col items-center">
      <h2 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-16">
        Quick Start.
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="group relative bg-[#20242D] rounded-xl border border-[rgba(255,255,255,0.1)] p-6 transition-all duration-300 hover:border-[#99a89b] hover:shadow-lg hover:shadow-lime-300 hover:scale-110"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3351FF]/0 via-[#3351FF]/0 to-[#3351FF]/0 rounded-xl transition-all duration-300 group-hover:from-[#3351FF]/5 group-hover:via-[#3351FF]/10 group-hover:to-[#3351FF]/5 pointer-events-none"></div>
            <div className="relative flex flex-col items-center text-center">
              {/* Step number in a square, styled like the icon container */}
              <div className="w-12 h-12 bg-[#3351FF]/20 rounded-lg flex items-center justify-center mb-4 text-xl font-bold text-[#838e91] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#3351FF]/30">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}