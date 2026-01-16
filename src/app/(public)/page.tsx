import { GlitchButton } from "@/components/ui/glitch-button";
import { Marquee } from "@/components/ui/marquee";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Code2, Globe, Lock, Cpu, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating Debris - Global */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <Image src="/assets/img/debris-1.png" alt="debris" width={50} height={50} className="absolute top-1/4 left-10 opacity-40 animate-float" />
         <Image src="/assets/img/debris-1.png" alt="debris" width={30} height={30} className="absolute bottom-1/3 right-20 opacity-30 animate-float delay-1000 rotate-45" />
      </div>

      {/* Hero Section */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Parallax Layers */}
        <div className="absolute inset-0 -z-20">
            <Image 
                src="/assets/img/hero-parallax.png" 
                alt="Cyberpunk City" 
                fill 
                className="object-cover opacity-60 scale-105 animate-pulse-slow"
                priority
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        {/* Massive Japanese Title Layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center">
             <Image 
                src="/morepics/DEVスペース.png" 
                alt="Japanese Title" 
                width={1200}
                height={400} 
                className="opacity-10 w-full object-contain"
             />
        </div>

        <div className="container z-10 flex flex-col items-center text-center relative">
          <h2 className="mb-4 font-jp text-xl font-bold tracking-[0.5em] text-cyber-cyan animate-pulse">
            デブスペース 2026
          </h2>
          <h1 className="mb-6 font-sans text-6xl font-black uppercase leading-none tracking-tighter text-white sm:text-8xl md:text-9xl relative drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            DevSpace
            <br />
            <span className="bg-gradient-to-r from-cyber-cyan via-white to-cyber-pink bg-clip-text text-transparent">
              2026
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-light text-muted-foreground md:text-xl italic">
            &quot;Leveraging Web3 for Social Responsibility.&quot;
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <GlitchButton className="bg-cyber-pink text-white border-cyber-pink hover:shadow-[0_0_20px_#ff003c]">
                INITIALIZE_SYSTEM
              </GlitchButton>
            </Link>
            <Link href="https://discord.gg" target="_blank">
                <GlitchButton variant="outline" className="border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10">
                    JOIN_NETWORK
                </GlitchButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Ticker - Cyberpunk HUD */}
      <div className="border-y border-cyber-cyan/20 bg-black/80 py-4 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50" />
        <Marquee className="text-2xl font-bold uppercase tracking-widest text-white/80 font-mono">
            {["3500+ Footfall", "12,000+ Participants", "₹10,00,000 Prize Pool"].map((stat, i) => (
                 <div key={i} className="flex items-center gap-6 mx-8 group">
                     <span className="h-2 w-2 bg-cyber-pink rotate-45 group-hover:animate-spin"></span>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{stat}</span>
                 </div>
            ))}
        </Marquee>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-pink to-transparent opacity-50" />
      </div>

      {/* Tracks Section */}
      <section className="relative py-32 overflow-hidden">
         <Image 
            src="/assets/img/polygon-bg.jpg" 
            alt="Texture" 
            fill 
            className="object-cover mix-blend-overlay opacity-20 -z-20"
        />
        
        <div className="container relative z-10">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
                <div>
                     <h2 className="font-sans text-5xl font-bold uppercase tracking-tighter sm:text-7xl text-white">
                        Tracks
                    </h2>
                    <div className="h-1 w-20 bg-cyber-yellow mt-2" />
                </div>
                <Link href="/tracks" className="hidden md:flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors">
                    VIEW ALL PROTOCOLS <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, i) => (
                <GlassCard key={i} className="group min-h-[300px] border-l-4 border-l-transparent hover:border-l-cyber-cyan transition-all" gradient={track.gradient}>
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyber-cyan/20 transition-colors">
                        <track.icon className="h-8 w-8 text-white/80 group-hover:text-cyber-cyan" />
                    </div>
                    <span className="text-xs font-mono text-white/30 border border-white/10 px-2 py-1 rounded">SYS_0{i+1}</span>
                </div>
                <h3 className="mb-4 font-sans text-2xl font-bold uppercase leading-none group-hover:text-cyber-cyan transition-colors">{track.title}</h3>
                <p className="font-light text-muted-foreground leading-relaxed text-sm">{track.description}</p>
                </GlassCard>
            ))}
            </div>
        </div>
      </section>

       {/* Timeline Section */}
      <section className="border-t border-white/10 bg-black/90 py-32 relative">
         <div className="container">
            <h2 className="mb-20 text-center font-sans text-4xl font-bold uppercase tracking-tighter sm:text-6xl text-white">
              Chronology
            </h2>
            <div className="mx-auto max-w-4xl space-y-16 pl-8 border-l-2 border-white/10 relative">
              {timeline.map((item, id) => (
                <div key={id} className="relative pl-12 group">
                  {/* Flashing Circle */}
                  <div className="absolute -left-[25px] top-1 bg-black p-1">
                      <Image 
                        src="/assets/img/flashing-circle.png" 
                        alt="Bullet" 
                        width={40} 
                        height={40} 
                        className="animate-spin-slow opacity-80 group-hover:opacity-100 group-hover:sepia transition-all" 
                      />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                    <span className="w-fit rounded border border-cyber-pink/30 bg-cyber-pink/10 px-3 py-1 font-mono text-xs text-cyber-pink">
                        {item.time}
                    </span>
                    <h3 className="text-2xl font-bold group-hover:text-cyber-pink transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground max-w-lg">{item.description}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Sponsors */}
      <section className="py-24 bg-black relative border-t border-cyber-yellow/20">
          <h2 className="mb-12 text-center font-jp text-sm uppercase tracking-widest text-cyber-yellow">
            SUPPORTED_BY
          </h2>
          <Marquee direction="left" className="text-6xl font-black text-white/5 font-clash">
            <span className="mx-16 hover:text-white/20 transition-colors">GOOGLE</span>
            <span className="mx-16 hover:text-white/20 transition-colors">MICROSOFT</span>
            <span className="mx-16 hover:text-white/20 transition-colors">GITHUB</span>
            <span className="mx-16 hover:text-white/20 transition-colors">ETHEREUM</span>
            <span className="mx-16 hover:text-white/20 transition-colors">ORACLE</span>
          </Marquee>
      </section>
    </div>
  );
}

const tracks = [
  {
    title: "Adaptive Systems",
    description: "Systems that learn from user behavior.",
    icon: Globe,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Digital Archaeology",
    description: "Modern software working with old protocols.",
    icon: Lock,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Zero Trust Zone",
    description: "Security and verification baked in.",
    icon: Lock,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Minds in the Machine",
    description: "Software that learns patterns.",
    icon: Cpu,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Creative Code",
    description: "Tools that amplify creativity.",
    icon: Palette,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
   {
    title: "Eco-Tech Synergy",
    description: "Optimizing for sustainable compute.",
    icon: Globe,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

const timeline = [
  {
    time: "Feb 12 - 09:00 PM",
    title: "The Arrival",
    description: "Check-in begins at the venue.",
  },
  {
    time: "Feb 12 - 10:00 PM",
    title: "Initialization",
    description: "Opening Ceremony & Problem Statements revealed.",
  },
  {
    time: "Feb 14 - 09:00 PM",
    title: "System Shutdown",
    description: "Submission deadline. Coding ends.",
  },
];
