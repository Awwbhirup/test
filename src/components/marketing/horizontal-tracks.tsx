"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Globe, Database, Lock, Cpu } from "lucide-react";
import { GlitchButton } from "@/components/ui/glitch-button";

const tracks = [
  {
    id: "01",
    title: "Adaptive Systems",
    subtitle: "Resilience Engineering",
    description: "Design systems that learn from failure. How do we build software that adapts to unexpected conditions?",
    icon: Globe,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    image: "/assets/img/katana.png"
  },
  {
    id: "02",
    title: "Digital Archaeology",
    subtitle: "Legacy Protocols",
    description: "Integrating modern intelligence with ancient protocols. Bridge the gap between legacy infrastructure.",
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
    description: "In a world of deepfakes and AI impersonation, how do we verify identity? Build trustless systems.",
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
    description: "Leveraging large language models to detect patterns in chaos. Amplify human cognition.",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    image: "/assets/img/smoke.png"
  }
];

export default function HorizontalTracks() {
  return (
    <section className="relative py-24">
      <div className="container px-4 md:px-6 mb-12">
            <h2 className="text-6xl font-black uppercase text-white tracking-tighter">
                Track <span className="text-cyber-cyan">Gallery</span>
            </h2>
            <p className="text-white/50 font-mono mt-2">{"> DRAG OR SCROLL TO EXPLORE PROTOCOLS"}</p>
      </div>

      {/* Native Horizontal Scroll Container */}
      <div className="flex overflow-x-auto pb-12 px-4 md:px-12 gap-8 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyber-cyan/20">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="group relative h-[600px] w-[400px] md:w-[500px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#050505]/80 backdrop-blur-md transition-all hover:border-white/30 snap-center"
            >
              {/* Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={track.image}
                  alt={track.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-10">
                <span className={`inline-block w-fit px-3 py-1 mb-4 text-xs font-mono border rounded ${track.color} ${track.border} ${track.bg}`}>
                    {track.id} // {track.subtitle}
                </span>
                <h3 className="text-4xl font-bold uppercase text-white mb-2">{track.title}</h3>
                <p className="text-white/60 mb-8 line-clamp-3">{track.description}</p>
                <GlitchButton className="w-full justify-center">
                    Initialize <ArrowRight className="ml-2 w-4 h-4" />
                </GlitchButton>
              </div>
            </div>
          ))}
          
          {/* Spacer for end of list */}
          <div className="w-12 flex-shrink-0" />
      </div>
    </section>
  );
}
