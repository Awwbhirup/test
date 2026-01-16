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

      {/* Tracks Section - Katana Style */}
      <section className="relative py-32 overflow-hidden bg-black">
        <div className="container relative z-10">
            <div className="flex items-center justify-center mb-16">
                 <h2 className="font-sans text-sm font-bold uppercase tracking-widest text-[#8d8d8d]">
                    TRACK 1
                </h2>
            </div>
            
            <div className="relative flex flex-col items-center justify-center text-center">
                 {/* Floating Katana */}
                 <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] z-20 pointer-events-none">
                     <Image src="/assets/img/katana.png" alt="Katana" width={800} height={200} className="drop-shadow-2xl animate-float-slow" />
                 </div>
                 
                 <div className="relative z-10 mt-32">
                     <h1 className="text-7xl md:text-9xl font-bold text-[#bfaea4] mb-4 font-sans tracking-tighter">
                        Fine! I&apos;ll do it Myself
                     </h1>
                     <p className="max-w-2xl mx-auto text-[#8d8d8d] text-lg leading-relaxed">
                        Explore how systems handle failure by preserving context, guiding recovery, and staying useful when things don&apos;t go as planned.
                     </p>
                 </div>

                 {/* Idea Submission Badge */}
                 <div className="absolute top-0 right-0">
                     <span className="bg-[#ff4d29] text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider shadow-[0_0_20px_#ff4d29]">
                        Idea Submission
                     </span>
                 </div>
                 
                 {/* Bottom Katana for Loop effect */}
                 <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] z-20 pointer-events-none opacity-50 blur-sm">
                     <Image src="/assets/img/katana.png" alt="Katana" width={800} height={200} className="rotate-180" />
                 </div>
            </div>
        </div>
      </section>

       {/* Timeline Section - Cream & Train */}
      <section className="bg-cream py-32 relative overflow-hidden text-[#1a103c]">
         <div className="container relative z-10">
            <h2 className="mb-8 font-sans text-6xl font-bold tracking-tighter sm:text-8xl">
              Timeline
            </h2>
            
            {/* Date Badge */}
            <div className="inline-block bg-[#ff4d29] p-6 rounded-xl text-white mb-20 shadow-lg transform -rotate-3">
                <div className="text-2xl font-mono mb-2">cs hall</div>
                <div className="bg-[#e6e6e6] text-[#333] p-4 rounded text-center">
                    <div className="text-sm font-bold">FEB</div>
                    <div className="text-4xl font-black">12</div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Train Illustration */}
                <div className="relative h-[400px] w-full">
                    <Image 
                        src="/assets/img/train.png" 
                        alt="Train" 
                        fill 
                        className="object-contain object-left-bottom drop-shadow-2xl"
                    />
                </div>

                {/* Timeline Points */}
                <div className="space-y-12 border-l-4 border-[#2d3a5e] pl-8 relative">
                    {timeline.map((item, id) => (
                        <div key={id} className="relative group">
                            {/* Dot */}
                            <div className="absolute -left-[42px] top-1 h-5 w-5 rounded-full bg-[#5b7c99] border-4 border-cream" />
                            
                            <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                            <p className="font-mono text-sm opacity-60 mb-1 tracking-widest uppercase">{item.sub}</p>
                            <p className="text-xl font-medium opacity-80">{item.time}</p>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* Sponsors - Bento Grid */}
      <section className="py-24 bg-[#111] relative text-white">
          <div className="container">
              <div className="flex justify-between items-end mb-12">
                   <h2 className="text-6xl font-bold tracking-tighter">Sponsor</h2>
                   <div className="bg-[#ff4d29] text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider">
                        Idea Submission
                   </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
                  {/* Large Card - Camera */}
                  <div className="row-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] group">
                      <Image 
                        src="/assets/img/camera.png" 
                        alt="Camera" 
                        fill 
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-8 left-8">
                          <h3 className="text-2xl font-bold">WOLFRAM</h3>
                      </div>
                  </div>
                  
                  {/* Stat Card */}
                  <div className="bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-white/10 hover:border-[#ff4d29] transition-colors">
                      <p className="text-muted-foreground mb-4">Insert some statistic</p>
                      <h3 className="text-5xl font-bold mb-4">Key feature</h3>
                       <p className="text-muted-foreground">Insert some statistic or metric name</p>
                  </div>

                  {/* Rating Card */}
                  <div className="bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-white/10">
                       <div className="flex gap-1 text-[#ff4d29] mb-4">
                           {[...Array(5)].map((_,i) => <span key={i}>★</span>)}
                       </div>
                       <h3 className="text-6xl font-bold mb-2">100k</h3>
                       <p className="text-2xl text-muted-foreground">users rated it</p>
                  </div>

                  {/* Wide Wolframe Card */}
                  <div className="col-span-1 md:col-span-2 bg-[#1a1a1a] rounded-3xl p-8 flex items-center justify-center border border-white/10 relative overflow-hidden">
                       {/* Smoke Effect */}
                        <Image 
                            src="/assets/img/smoke.png" 
                            alt="Smoke" 
                            width={300} 
                            height={100} 
                            className="absolute bottom-0 left-0 opacity-50"
                        />
                       <h3 className="text-5xl font-bold relative z-10">Wolframe</h3>
                  </div>
                  
                   {/* Polaroid Card (using smoke/texture as placeholder for now) */}
                  <div className="relative bg-[#ebe9e0] rounded-sm p-4 rotate-3 transform hover:rotate-0 transition-transform duration-300 w-64 h-72 mx-auto md:mx-0 shadow-xl">
                      <div className="bg-black h-48 w-full mb-4 relative overflow-hidden">
                           <Image src="/assets/img/smoke.png" alt="Polaroid" fill className="object-cover opacity-80" />
                      </div>
                      <p className="font-handwriting text-black text-sm text-center -rotate-2">
                          wolframe tagline or smthing bro idk okay?
                      </p>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-500 text-4xl">📌</div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}

const timeline = [
  {
    time: "till 6PM",
    title: "round 0",
    sub: "online idea submission"
  },
  {
    time: "9PM",
    title: "check in",
    sub: "report to the venue"
  },
  {
    time: "10:30PM",
    title: "opening ceremony",
    sub: "inauguration ceremony by the csi team"
  },
  {
    time: "11:00PM",
    title: "something",
    sub: "something idk man"
  },
];
