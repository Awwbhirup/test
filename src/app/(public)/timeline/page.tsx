"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TimelinePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heightSync = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#e0dcd0] pt-32 pb-24 relative overflow-x-hidden font-sans selection:bg-[#ff4d29] selection:text-white">
      {/* Background System */}
      <div className="fixed inset-0 z-0">
          <Image 
            src="/assets/bg/bg-1.jpg" 
            alt="Red Sun Background" 
            fill 
            className="object-cover opacity-10 mix-blend-multiply grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-[#e0dcd0]/80 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[url('/assets/img/grid-pattern.png')] opacity-5 mix-blend-multiply" />
      </div>

      {/* Japanese Decor Removed - Now Integrated into Content */}
        
      <div className="container max-w-6xl relative z-10">
         <div className="text-center mb-24">
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-block border border-[#ff4d29] text-[#ff4d29] px-6 py-2 tracking-[0.5em] text-sm font-bold uppercase mb-6 bg-[#ff4d29]/5 backdrop-blur-sm"
            >
                Event Protocol
            </motion.div>
            <h1 className="text-7xl md:text-9xl font-black text-[#1a1a1a] tracking-tighter uppercase mb-0 drop-shadow-sm leading-none">
                Time<span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ff4d29] to-red-600">line</span>
            </h1>
            <div className="font-naganoshi text-4xl md:text-5xl text-[#ff4d29]/40 mt-2 mb-4">
                進行表
            </div>
            <p className="font-mono text-[#1a1a1a]/60 text-lg">
                // SYSTEM_SYNC: ACTIVE // FEB 12, 2026
            </p>
         </div>

         {/* Vertical Timeline - Central Spine */}
         <div className="relative py-12">
            {/* The Static Spine (Darker for visibility) */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-2 bg-black/5 md:-translate-x-1/2 rounded-full" />
            
            {/* The Animated Progress Spine */}
            <motion.div 
                style={{ height: heightSync }}
                className="absolute left-4 md:left-1/2 top-0 w-2 bg-[#ff4d29] md:-translate-x-1/2 rounded-full shadow-[0_0_20px_#ff4d29] origin-top z-10"
            />

            <div className="space-y-24 md:space-y-32 pb-48">
                {timeline.map((item, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
                        key={index} 
                        className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Time Card */}
                        <div className={`flex-1 w-full md:w-auto ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'} group`}>
                            <div className="font-mono text-6xl md:text-8xl font-black text-[#ff4d29]/10 absolute -top-10 md:top-auto md:-translate-y-1/2 z-0 select-none pointer-events-none group-hover:text-[#ff4d29]/20 transition-colors duration-500">
                                {item.time.replace(/[^0-9]/g, '').slice(0,4)}
                            </div>
                            
                            <div className={`relative z-10 p-10 border-white/50 bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-[0_0_50px_rgba(255,77,41,0.1)] transition-all duration-500 min-h-[280px] flex flex-col justify-center border ${index % 2 === 0 ? 'border-r-4 border-r-[#ff4d29]' : 'border-l-4 border-l-[#ff4d29]'} rounded-2xl`}>
                                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-0 text-[#1a1a1a] group-hover:text-[#ff4d29] transition-colors leading-none">{item.title}</h3>
                                <div className="font-naganoshi text-xl md:text-2xl text-[#1a1a1a]/40 group-hover:text-[#ff4d29]/60 transition-colors mb-4 mt-2">
                                    {item.ja}
                                </div>
                                <p className="font-mono text-base md:text-lg text-[#1a1a1a]/70 tracking-wide leading-relaxed">{item.sub}</p>
                            </div>
                        </div>

                        {/* Center Node */}
                        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#e0dcd0] border-4 border-[#ff4d29] rounded-full z-20 shadow-[0_0_30px_#ff4d29]">
                            {/* Inner Pulse */}
                             <motion.div 
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-[#ff4d29] rounded-full"
                             />
                        </div>

                        {/* Spacer for Flex Alignment */}
                        <div className="flex-1 hidden md:block" />
                        
                        {/* Mobile Time Label */}
                         <div className="md:hidden absolute left-16 top-0 text-sm font-mono font-bold text-[#ff4d29] px-3 py-1 bg-[#ff4d29]/10 border border-[#ff4d29]/20 transform -translate-y-1/2 rounded">
                            {item.time}
                        </div>
                    </motion.div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}

const timeline = [
  {
    time: "till 6PM",
    title: "Round 0",
    ja: "予選ラウンド",
    sub: "Online Idea Submission Deadline"
  },
  {
    time: "9PM",
    title: "Check In",
    ja: "受付開始",
    sub: "Report to Venue // Verification Protocol"
  },
  {
    time: "10:30PM",
    title: "Ceremony",
    ja: "開会式",
    sub: "System Initialization by CSI Team"
  },
  {
    time: "11:00PM",
    title: "Hack Begins",
    ja: "作戦開始",
    sub: "Network Access Granted // Start Coding"
  },
  {
    time: "08:00AM",
    title: "Breakfast",
    ja: "エネルギー補給",
    sub: "Refuel // Energy Replenishment"
  },
];
