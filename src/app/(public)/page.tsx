import { GlitchButton } from "@/components/ui/glitch-button";
import { Marquee } from "@/components/ui/marquee";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Code2, Globe, Lock, Cpu, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Storm Background */}
        <div className="absolute inset-0 -z-20">
            <Image 
                src="/assets/img/storm.jpg" 
                alt="Storm Background" 
                fill 
                className="object-cover opacity-80"
                priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        {/* Parallax Foreground Elements */}
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 animate-pulse opacity-80">
            <Image src="/assets/img/bamboo-1.png" alt="Bamboo" width={400} height={600} className="object-contain" />
        </div>
        <div className="absolute bottom-0 right-0 -z-10 w-1/3 animate-pulse opacity-80 delay-700">
            <Image src="/assets/img/bamboo-2.png" alt="Bamboo" width={400} height={600} className="object-contain scale-x-[-1]" />
        </div>

        <div className="container z-10 flex flex-col items-center text-center relative">
          {/* Background Japanese Text */}
          <h1 className="select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/5 whitespace-nowrap pointer-events-none z-[-1] font-jp">
            デブスペース
          </h1>

          <h2 className="mb-4 font-jp text-xl font-bold tracking-widest text-primary animate-pulse">
            デブスペース 2026
          </h2>
          <h1 className="mb-6 font-sans text-6xl font-black uppercase leading-none tracking-tighter text-white sm:text-8xl md:text-9xl relative">
            DevSpace
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              2026
            </span>
            <span className="absolute -top-4 -right-4 text-xs font-mono text-white/40 tracking-widest">VER 2.0</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-light text-muted-foreground md:text-xl italic">
            &quot;Leveraging Web3 for Social Responsibility.&quot;
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard">
              <GlitchButton>Register Now</GlitchButton>
            </Link>
            <GlitchButton variant="outline">Join Discord</GlitchButton>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <div className="border-y border-white/10 bg-black/50 py-4 backdrop-blur-sm">
        <Marquee className="text-2xl font-bold uppercase tracking-widest text-white/80 font-mono">
            {["3500+ Footfall", "12,000+ Participants", "10 Lakh Prize Pool"].map((stat, i) => (
                 <div key={i} className="flex items-center gap-8 mx-8">
                     <span className="border border-primary/50 px-3 py-1 bg-primary/10 rounded-sm text-primary text-sm">SYS.STAT</span>
                     <span>{stat}</span>
                 </div>
            ))}
        </Marquee>
      </div>

      {/* Tracks Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Polygon Background */}
         <div className="absolute inset-0 -z-20">
            <Image 
                src="/assets/img/polygon-bg.jpg" 
                alt="Polygon Background" 
                fill 
                className="object-cover mix-blend-overlay opacity-30"
            />
        </div>
        
        <div className="container relative z-10">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-8">
                <h2 className="font-sans text-5xl font-bold uppercase tracking-tighter sm:text-7xl">
                Tracks
                </h2>
                <span className="hidden md:block text-muted-foreground font-mono">///_SELECT_PROTOCOL</span>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track, i) => (
                <GlassCard key={i} className="group min-h-[300px] border-l-4 border-l-primary/0 hover:border-l-primary transition-all" gradient={track.gradient}>
                <div className="flex justify-between items-start mb-6">
                    <track.icon className="h-10 w-10 text-white/80 transition-transform duration-300 group-hover:rotate-12 group-hover:text-primary" />
                    <span className="text-xs font-mono text-white/30">0{i+1}</span>
                </div>
                <h3 className="mb-4 font-sans text-3xl font-bold uppercase leading-none">{track.title}</h3>
                <p className="font-light text-muted-foreground leading-relaxed">{track.description}</p>
                </GlassCard>
            ))}
            </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="border-t border-white/10 bg-black/90 py-32 relative">
         <div className="absolute inset-0 bg-[url('/assets/external/texture.jpg')] bg-cover opacity-5 mix-blend-screen -z-10" />

         <div className="container">
            <h2 className="mb-20 text-center font-sans text-4xl font-bold uppercase tracking-tighter sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              Chronology
            </h2>
            <div className="mx-auto max-w-4xl space-y-16 pl-8 border-l border-white/10">
              {timeline.map((item, id) => (
                <div key={id} className="relative pl-12 group">
                  {/* Flashing Circle */}
                  <div className="absolute -left-[53px] top-1">
                      <Image 
                        src="/assets/img/flashing-circle.png" 
                        alt="Bullet" 
                        width={40} 
                        height={40} 
                        className="animate-spin-slow opacity-80 group-hover:opacity-100 transition-opacity" 
                      />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                    <span className="w-fit rounded border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                        {item.time}
                    </span>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground max-w-lg">{item.description}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Sponsors */}
      <section className="py-24 bg-black relative">
         <div className="absolute inset-0 bg-[url('/assets/external/code-abstract.jpg')] bg-cover opacity-10 -z-10" />
          <h2 className="mb-12 text-center font-jp text-sm uppercase tracking-widest text-muted-foreground">
            Backed By Titans
          </h2>
          <Marquee direction="right" className="text-5xl font-black text-white/10">
            <span className="mx-16">GOOGLE</span>
            <span className="mx-16">MICROSOFT</span>
            <span className="mx-16">GITHUB</span>
            <span className="mx-16">ETHEREUM</span>
            <span className="mx-16">ORACLE</span>
            <span className="mx-16">SAMSUNG</span>
          </Marquee>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/external/cyberpunk-city.jpg')] bg-cover opacity-20 blur-sm -z-10" />
        <div className="relative z-10">
             <h2 className="font-jp text-4xl mb-4 text-white">デブスペース</h2>
            <p className="font-mono text-sm text-muted-foreground">
            Built by CSI-VIT. © 2026 DevSpace.
            </p>
        </div>
      </footer>
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
