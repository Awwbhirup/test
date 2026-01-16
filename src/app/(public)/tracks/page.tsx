import { GlassCard } from "@/components/ui/glass-card";
import { GlitchButton } from "@/components/ui/glitch-button";
import Link from "next/link";
import Image from "next/image";

export default function TracksPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto">
        <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
            <div>
                 <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-2">HACK_TRACKS</h1>
                 <p className="font-mono text-cyber-cyan">{"/// SELECT_YOUR_PATHWAY"}</p>
            </div>
            <Link href="/">
                <GlitchButton variant="outline">BACK TO MAIN</GlitchButton>
            </Link>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {trackDetails.map((track, i) => (
                <div key={i} className="break-inside-avoid">
                    <GlassCard className="relative overflow-hidden group hover:border-cyber-yellow/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                             <Image src={`/assets/img/track-icon-${(i % 2) + 1}.png`} alt="Icon" width={60} height={60} />
                        </div>
                        
                        <div className="mb-4 text-xs font-mono text-cyber-pink border border-cyber-pink/30 px-2 py-1 w-fit rounded">
                            PROTOCOL_0{i+1}
                        </div>
                        
                        <h2 className="text-3xl font-bold uppercase mb-4 leading-none">{track.title}</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed bg-black/40 p-2 rounded backdrop-blur-sm">
                            {track.description}
                        </p>
                        
                        <div className="flex gap-2 flex-wrap">
                            {track.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-white/60">#{tag}</span>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            ))}
        </div>
    </div>
  );
}

const trackDetails = [
  {
    title: "Adaptive Systems",
    description: "Building interfaces that evolve with user behavior. Focus on personalized AI models and dynamic UI generation.",
    tags: ["AI", "UX", "GENERATIVE"]
  },
  {
    title: "Digital Archaeology",
    description: "Reviving legacy protocols with modern tech. Interfacing Web3 with Web1. Retro-computing solutions.",
    tags: ["WEB3", "RETRO", "Protocol"]
  },
  {
    title: "Zero Trust Zone",
    description: "Next-gen security paradigms. Identity without central authority. Blockchain verification layers.",
    tags: ["SECURITY", "BLOCKCHAIN", "ZK-PROOFS"]
  },
  {
    title: "Minds in the Machine",
    description: "LLM integration for creative problem solving. Agents that code, design, and deploy autonomously.",
    tags: ["LLM", "AGENTS", "AUTOMATION"]
  },
  {
    title: "Creative Code",
    description: "Art through algorithms. Visualizers, audio-reactive systems, and interactive installations.",
    tags: ["WEBGL", "THREE.JS", "AUDIO"]
  },
   {
    title: "Eco-Tech Synergy",
    description: "Sustainable computing. Optimizing energy consumption of data centers through smart algorithms.",
    tags: ["GREEN-TEACH", "OPTIMIZATION"]
  },
];
