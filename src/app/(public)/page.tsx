import dynamic from "next/dynamic";
import { GlitchButton } from "@/components/ui/glitch-button";
import { Marquee } from "@/components/ui/marquee";
import { TextReveal } from "@/components/ui/text-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Code2, Globe, Lock, Cpu, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroScene = dynamic(() => import("@/components/canvas/hero-scene"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-transparent" />
});

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating Debris - Global */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <Image src="/assets/img/debris-1.png" alt="debris" width={50} height={50} className="absolute top-1/4 left-10 opacity-40 animate-float" />
         <Image src="/assets/img/debris-1.png" alt="debris" width={30} height={30} className="absolute bottom-1/3 right-20 opacity-30 animate-float delay-1000 rotate-45" />
      </div>

      {/* Hero Content */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="z-10 text-center space-y-8 mix-blend-difference flex flex-col items-center">
          <p className="font-mono text-sm tracking-[0.5em] text-cyber-pink animate-pulse">
            EST. 2026 // NEON_CITY
          </p>
          
          <div className="flex flex-col items-center mb-4">
              <TextReveal text="DEVSPACE" className="text-8xl md:text-[12rem] font-black tracking-tighter text-white leading-none" delay={0.2} />
              <TextReveal text="HACKATHON" className="text-6xl md:text-[8rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-white opacity-80" delay={0.4} />
          </div>

          <p className="max-w-xl text-lg font-light text-muted-foreground md:text-xl italic">
            &quot;Leveraging Web3 for Social Responsibility&quot;
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
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

        {/* Hero Scene (Canvas) - Temporarily disabled due to R3F crash */}
        <div className="absolute inset-0 z-0">
          {/* <HeroScene /> */}
        </div>
        
        {/* Massive Japanese Title Layer (Background) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full text-center pointer-events-none">
             <Image 
                src="/morepics/DEVスペース.png" 
                alt="Japanese Title" 
                width={1200}
                height={400} 
                className="opacity-10 w-full object-contain"
             />
        </div>
      </section>

      {/* Stats Ticker - Cyberpunk HUD */}
      <div className="border-y border-cyber-cyan/20 bg-black/80 py-4 backdrop-blur-md relative overflow-hidden my-8">
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

      {/* Visual Glue: Vertical Line */}
      <div className="w-[1px] h-[100px] bg-gradient-to-b from-transparent via-cyber-cyan/50 to-transparent mx-auto opacity-50 animate-pulse my-8" />

      {/* Tracks Section - Katana Style */}
      <section className="relative py-24 overflow-hidden bg-black">
        <div className="container relative z-10">
            <div className="flex items-center justify-center mb-12">
                 <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#8d8d8d] border border-white/10 px-4 py-1 rounded-full">
                    TRACK 1: RESILIENCE
                </h2>
            </div>
            
            <div className="relative flex flex-col items-center justify-center text-center">
                 {/* Floating Katana */}
                 <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] z-20 pointer-events-none mix-blend-screen">
                     <Image src="/assets/img/katana.png" alt="Katana" width={900} height={200} className="drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] animate-float-slow" />
                 </div>
                 
                 <div className="relative z-10 mt-24 md:mt-32">
                     <h1 className="text-6xl md:text-9xl font-bold text-[#beb0a6] mb-6 font-sans tracking-tighter leading-[0.9]">
                        Fine! I&apos;ll<br/>do it Myself
                     </h1>
                     <p className="max-w-xl mx-auto text-[#8d8d8d] text-base md:text-lg leading-relaxed font-mono">
                        &gt; Explore how systems handle failure by preserving context, guiding recovery, and staying useful.
                     </p>
                 </div>

                 {/* Idea Submission Badge */}
                 <div className="absolute top-10 right-10 hidden md:block">
                     <span className="bg-[#ff4d29] text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider shadow-[0_0_20px_#ff4d29]">
                        Idea Submission
                     </span>
                 </div>
                 
                 {/* Bottom Katana for Loop effect */}
                 <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] z-20 pointer-events-none opacity-30 blur-sm mix-blend-overlay">
                     <Image src="/assets/img/katana.png" alt="Katana" width={800} height={200} className="rotate-180" />
                 </div>
            </div>
        </div>
      </section>

       {/* Visual Glue: Marquee */}
       <div className="py-4 bg-black border-y border-white/5 opacity-50">
            <Marquee className="text-sm font-mono text-[#8d8d8d] tracking-widest uppercase">
                SYSTEM NORMAL // INITIALIZING // DATE: 2026 // DEVSPACE // HACKATHON // READY PLAYER ONE //
            </Marquee>
       </div>

       {/* Timeline Section - Cream & Train */}
      <section className="bg-cream py-24 relative overflow-hidden text-[#1a103c]">
         <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                     <h2 className="mb-8 font-sans text-6xl font-black tracking-tighter sm:text-8xl">
                      Time<br/>Line
                    </h2>
                    
                    {/* Date Badge */}
                    <div className="inline-block bg-[#ff4d29] p-6 rounded-xl text-white mb-20 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform">
                        <div className="text-2xl font-mono mb-2 border-b border-white/20 pb-2">CS HALL A</div>
                        <div className="bg-[#e6e6e6] text-[#333] p-4 rounded text-center shadow-inner">
                            <div className="text-sm font-bold uppercase tracking-wider">February</div>
                            <div className="text-5xl font-black leading-none mt-1">12</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative h-[500px] w-full">
                    {/* Train Illustration */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <Image 
                            src="/assets/img/train.png" 
                            alt="Train" 
                            fill 
                            className="object-contain drop-shadow-2xl scale-125 hover:scale-130 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* Timeline Points Horizontal/Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 border-t-2 border-[#1a103c]/10 pt-12">
                 {timeline.map((item, id) => (
                    <div key={id} className="relative group pt-8 border-t border-[#1a103c] transition-all hover:-translate-y-2">
                         {/* Dot */}
                        <div className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-[#ff4d29]" />
                        <p className="font-mono text-xs opacity-60 mb-1 tracking-widest uppercase">{item.time}</p>
                        <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-[#ff4d29] transition-colors">{item.title}</h3>
                        <p className="text-sm opacity-80 font-medium">{item.sub}</p>
                    </div>
                 ))}
            </div>
         </div>
      </section>

      {/* Visual Glue: Vertical Line */}
      <div className="w-[1px] h-[80px] bg-gradient-to-b from-[#EBE9E0] via-cyber-cyan to-[#111] mx-auto opacity-80" />

      {/* Sponsors - Bento Grid */}
      <section className="py-16 bg-[#111] relative text-white border-t border-white/10">
          <div className="container">
              <div className="flex justify-between items-end mb-16">
                   <h2 className="text-6xl font-bold tracking-tighter">Sponsors</h2>
                   <div className="hidden md:flex flex-col items-end">
                       <span className="text-xs font-mono text-gray-500 mb-1">SUPPORTED BY</span>
                       <div className="bg-[#ff4d29] text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider">
                            Join the Alliance
                       </div>
                   </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                  {/* Large Card - Camera */}
                  <div className="row-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] group min-h-[400px]">
                      <Image 
                        src="/assets/img/camera.png" 
                        alt="Camera" 
                        fill 
                        className="object-cover opacity-80 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-8 left-8">
                          <h3 className="text-3xl font-bold mb-2">Wolfram</h3>
                          <p className="text-white/60 text-sm max-w-[200px]">Computational intelligence for the next generation.</p>
                      </div>
                  </div>
                  
                  {/* Stat Card */}
                  <div className="bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-white/10 hover:border-[#ff4d29] hover:bg-[#1f1f1f] transition-all group">
                      <p className="text-muted-foreground mb-4 text-xs font-mono uppercase tracking-widest">Prize Pool</p>
                      <h3 className="text-5xl font-bold mb-2 text-[#ff4d29] group-hover:scale-110 transition-transform">₹10L+</h3>
                       <p className="text-muted-foreground text-sm">Total cash prizes & grants</p>
                  </div>

                  {/* Rating Card */}
                  <div className="bg-[#1a1a1a] rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-white/10 hover:border-cyber-cyan transition-colors">
                       <div className="flex gap-1 text-[#ff4d29] mb-4 text-2xl">
                           {[...Array(5)].map((_,i) => <span key={i}>★</span>)}
                       </div>
                       <h3 className="text-6xl font-bold mb-2">500+</h3>
                       <p className="text-sm text-muted-foreground uppercase tracking-widest">Hackers Registered</p>
                  </div>

                  {/* Wide Wolframe Card */}
                  <div className="col-span-1 md:col-span-2 bg-[#1a1a1a] rounded-3xl p-12 flex items-center justify-between border border-white/10 relative overflow-hidden group">
                       {/* Smoke Effect */}
                        <Image 
                            src="/assets/img/smoke.png" 
                            alt="Smoke" 
                            width={500} 
                            height={300} 
                            className="absolute bottom-[-50px] right-[-50px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-screen"
                        />
                       <div className="relative z-10">
                            <h3 className="text-5xl font-bold mb-4">DevFolio</h3>
                            <button className="px-6 py-2 border border-white/30 rounded-full text-sm hover:bg-white hover:text-black transition-colors">Apply with Devfolio</button>
                       </div>
                       <div className="text-9xl opacity-10 font-black absolute right-10 top-1/2 -translate-y-1/2 select-none group-hover:opacity-20 transition-opacity">
                           DEV
                       </div>
                  </div>
                  
                   {/* Polaroid Card */}
                  <div className="relative bg-[#ebe9e0] rounded-sm p-3 rotate-3 transform hover:rotate-6 hover:scale-105 transition-all duration-300 w-full h-[320px] shadow-2xl">
                      <div className="bg-black h-[240px] w-full mb-3 relative overflow-hidden">
                           <Image src="/assets/img/smoke.png" alt="Polaroid" fill className="object-cover opacity-60 scale-150" />
                           <div className="absolute inset-0 flex items-center justify-center text-white/50 text-4xl font-black rotate-[-15deg]">
                               ?
                           </div>
                      </div>
                      <p className="font-handwriting text-black text-sm text-center -rotate-1 mt-2 font-bold">
                          Coming Soon...
                      </p>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-600 text-3xl shadow-sm">📌</div>
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
