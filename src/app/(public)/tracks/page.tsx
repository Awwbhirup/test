"use client";

import React from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { GlitchButton } from "@/components/ui/glitch-button";
import { ArrowRight, Code, Cpu, Globe, Lock, Palette, Database } from "lucide-react";
import { motion } from "framer-motion";

const tracks = [
  {
    id: "01",
    title: "Adaptive Systems",
    subtitle: "Resilience Engineering",
    description: "Design systems that learn from failure. How do we build software that adapts to unexpected conditions and preserves context during recovery?",
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    image: "/assets/img/katana.png" // Using existing asset as placeholder
  },
  {
    id: "02",
    title: "Digital Archaeology",
    subtitle: "Legacy Protocols",
    description: "Integrating modern intelligence with ancient protocols. Bridge the gap between legacy infrastructure and next-gen AI capabilities.",
    icon: Database,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    image: "/assets/img/train.png" 
  },
  {
    id: "03",
    title: "Zero Trust Zone",
    subtitle: "Security First",
    description: "In a world of deepfakes and AI impersonation, how do we verify identity? Build the next generation of trustless verification systems.",
    icon: Lock,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    image: "/assets/img/camera.png"
  },
  {
    id: "04",
    title: "Minds in the Machine",
    subtitle: "Neural Patterns",
    description: "Leveraging large language models to detect patterns in chaos. Create tools that amplify human cognition rather than replacing it.",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    image: "/assets/img/smoke.png"
  }
];

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12 relative overflow-x-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 bg-[url('/assets/img/grid-pattern.svg')] opacity-20 pointer-events-none" />
        
        <div className="container relative z-10">
            <div className="mb-16 border-b border-white/10 pb-8">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
                    Track <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-cyan">Gallery</span>
                </h1>
                <p className="text-xl text-white/60 max-w-2xl font-mono">
                    {"> SELECT YOUR PATHWAY. EACH PROTOCOL REPRESENTS A UNIQUE CHALLENGE TO THE SYSTEM."}
                </p>
            </div>

            {/* Horizontal Gallery Layout */}
            <div className="grid grid-cols-1 gap-12 pb-24">
                {tracks.map((track, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        key={track.id} 
                        className={`relative group bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500`}
                    >
                        <div className="flex flex-col lg:flex-row min-h-[500px]">
                            {/* Content Side */}
                            <div className="p-8 lg:p-16 flex-1 flex flex-col justify-center relative z-10">
                                <span className={`font-mono text-sm tracking-widest uppercase mb-4 ${track.bg} ${track.color} w-fit px-3 py-1 rounded border ${track.border}`}>
                                    Protocol {track.id}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold uppercase mb-2 tracking-tight group-hover:text-white transition-colors text-white/90">
                                    {track.title}
                                </h2>
                                <h3 className={`text-xl font-mono mb-6 ${track.color} opacity-80`}>
                                    // {track.subtitle}
                                </h3>
                                <p className="text-lg text-white/60 leading-relaxed max-w-xl mb-8">
                                    {track.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["AI", "Blockchain", "Security"].map((tag) => (
                                        <span key={tag} className="text-xs font-mono border border-white/10 px-2 py-1 rounded text-white/40 group-hover:border-white/30 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <GlitchButton className="w-fit">
                                    INITIALIZE PROTOCOL <ArrowRight className="ml-2 w-4 h-4" />
                                </GlitchButton>
                            </div>

                            {/* Image/Visual Side */}
                            <div className="flex-1 relative min-h-[300px] lg:min-h-auto overflow-hidden bg-white/5">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                                <Image
                                    src={track.image}
                                    alt={track.title}
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 items-center justify-center"
                                />
                                {/* Large Number Overlay */}
                                <div className="absolute bottom-4 right-4 text-9xl font-black text-white/5 select-none z-0">
                                    {track.id}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
  );
}
