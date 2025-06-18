import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from 'react-tooltip';

const wallets = [
  { src: "/afil/phantom.svg", alt: "Phantom" ,color: "bg-[#AB9FF2]"},
  { src: "/afil/privy.png", alt: "Privy" ,color: "bg-white"},
 
];

const protocols = [
  // Row 1
  [
    { src: "/afil/sol.png", alt: "Solana" },
    { src: "/afil/flash.png", alt: "Flash" },
    { src: "/afil/flux.png", alt: "Flux" },
    { src: "/afil/mayan.png", alt: "Mayan" },
    { src: "/afil/pump.png", alt: "Pump" },
    { src: "/afil/pyth.png", alt: "Pyth" },
    { src: "/afil/Orca.png", alt: "Orca" },
    { src: "/afil/raydium.png", alt: "Raydium" },
  ],
  // Row 2
  [
    { src: "/afil/Tensor.png", alt: "Tensor" },
    { src: "/afil/solu.png", alt: "SolutioFi" },
    { src: "/afil/voltr.png", alt: "Voltr" },
    { src: "/afil/sanctum.png", alt: "Sanctum" },
    { src: "/afil/rug.png", alt: "Rugcheck" },
    { src: "/afil/3land.png", alt: "3Land" },
    { src: "/afil/meta.png", alt: "Metaplex" },
    { src: "/afil/lulo.png", alt: "Lulo" },
  ]
];

export const Afil: React.FC = () => (
  <div className="w-full flex justify-center items-center py-16 bg-[#000000] ">
    <div className="bg-[#000] rounded-2xl p-10 max-w-4xl w-full flex flex-col items-center shadow-lg">
        <h2 className="text-gray-300 text-xl  mb-8 tracking-wide">COMPATIBLE WALLETS</h2>
      <div className="flex flex-row gap-8 mb-12">
        {wallets.map((w, i) => (
          <div key={i} className={`w-16 h-16 flex items-center justify-center overflow-hidden rounded-full ${w.color ? w.color : "bg-[#111]"} `}>
            <Image src={w.src} alt={w.alt} width={48} height={48}
              className="hover:scale-110 transition-all duration-300"
              data-tooltip-id={`wallet-tooltip-${i}`}
              data-tooltip-content={w.alt}
            />
          </div>
        ))}
      </div>
      <h2 className="text-gray-300 text-xl  mb-8 tracking-wide">INTEGRATED PROTOCOLS</h2>
      <div className="flex flex-col gap-6 mb-10">
        {protocols.map((row, i) => (
          <div key={i} className="grid place-items-center grid-cols-4 md:grid-cols-8 gap-6 justify-center">
            {row.map((p, j) => (
              <div key={j} className="w-14 h-14 flex justify-center items-center  md:grid-cols-8 rounded-full bg-[#111]">
                <Image src={p.src} alt={p.alt} width={40} height={40}
                  className="hover:scale-125 transition-all duration-300"
                  data-tooltip-id={`protocol-tooltip-${i}-${j}`}
                  data-tooltip-content={p.alt}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-gray-400 text-center text-sm mt-4">
        Sendbeast integrates with the leading blockchains, protocols, and wallets.&nbsp;
        {/* <Link href="mailto:contact@syntoprotocol.com" className="text-yellow-400 hover:underline">
          Contact us to integrate your protocol &gt;
        </Link> */}
      </div>
      {/* Tooltips for wallets */}
      {wallets.map((w, i) => (
        <Tooltip key={`wallet-tooltip-${i}`} id={`wallet-tooltip-${i}`} />
      ))}
      {/* Tooltips for protocols */}
      {protocols.map((row, i) =>
        row.map((p, j) => (
          <Tooltip key={`protocol-tooltip-${i}-${j}`} id={`protocol-tooltip-${i}-${j}`} />
        ))
      )}
    </div>
  </div>
);

export default Afil;
