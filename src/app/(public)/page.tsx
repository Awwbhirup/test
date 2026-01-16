import { GlitchButton } from "@/components/ui/glitch-button";
import { Marquee } from "@/components/ui/marquee";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Code2, Globe, Lock, Cpu, Palette } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10 opacity-30">
           {/* Placeholder for 3D/Spline background */}
           <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-background to-background" />
        </div>
        
        <div className="container z-10 flex flex-col items-center text-center">
          <h2 className="mb-4 font-jp text-xl font-bold tracking-widest text-primary/80">
            デブスペース 2026
          </h2>
          <h1 className="mb-6 font-sans text-5xl font-black uppercase leading-tight tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl">
            DevSpace
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              2026
            </span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-light text-muted-foreground md:text-xl">
            Leveraging Web3 for Social Responsibility.
            <br />
            A 48-hour flagship hackathon.
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
        <Marquee className="text-2xl font-bold uppercase tracking-widest text-white/50">
          <span className="mx-8">3500+ Footfall</span>
          <span className="mx-8 text-primary">★</span>
          <span className="mx-8">12,000+ Participants</span>
          <span className="mx-8 text-primary">★</span>
          <span className="mx-8">10. Lakh Prize Pool</span>
          <span className="mx-8 text-primary">★</span>
        </Marquee>
      </div>

      {/* Tracks Section */}
      <section className="container py-24">
        <h2 className="mb-16 text-center font-sans text-4xl font-bold uppercase tracking-tighter sm:text-6xl">
          Tracks
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track, i) => (
            <GlassCard key={i} className="group min-h-[300px]" gradient={track.gradient}>
              <track.icon className="mb-6 h-12 w-12 text-white/80 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mb-2 font-sans text-2xl font-bold uppercase">{track.title}</h3>
              <p className="font-light text-muted-foreground">{track.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="border-t border-white/10 bg-white/5 py-24">
         <div className="container">
            <h2 className="mb-16 text-center font-sans text-4xl font-bold uppercase tracking-tighter sm:text-6xl">
              Chronology
            </h2>
            <div className="mx-auto max-w-3xl space-y-12 pl-8 border-l-2 border-white/10">
              {timeline.map((item, id) => (
                <div key={id} className="relative">
                  <div className="absolute -left-[41px] top-2 h-5 w-5 rounded-full border-4 border-black bg-white" />
                  <span className="mb-2 inline-block rounded bg-primary/10 px-3 py-1 font-mono text-sm text-primary">
                    {item.time}
                  </span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Sponsors */}
      <section className="py-24">
          <h2 className="mb-12 text-center font-jp text-sm uppercase tracking-widest text-muted-foreground">
            Backed By Titans
          </h2>
          <Marquee direction="right" className="text-4xl font-black text-white/20">
            <span className="mx-12">GOOGLE</span>
            <span className="mx-12">MICROSOFT</span>
            <span className="mx-12">GITHUB</span>
            <span className="mx-12">ETHEREUM</span>
            <span className="mx-12">ORACLE</span>
            <span className="mx-12">SAMSUNG</span>
          </Marquee>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 text-center">
        <p className="font-jp text-sm text-muted-foreground">
          Built by CSI-VIT. © 2026 DevSpace.
        </p>
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
