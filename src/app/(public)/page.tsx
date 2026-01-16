import dynamic from "next/dynamic";
import { GlitchedText } from "@/components/ui/glitched-text";
import { GlitchButton } from "@/components/ui/glitch-button";
import HorizontalTracks from "@/components/marketing/horizontal-tracks";
import { Marquee } from "@/components/ui/marquee";
import { TextReveal } from "@/components/ui/text-reveal";
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
         {/* Background Elements - Red Sun Theme */}
         <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/bg/hero-bg.png" 
              alt="Red Sun Background" 
              fill 
              className="object-cover opacity-80"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" />
         </div>
         
         {/* Gradient Overlay for Top Readability */}
         <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-10" />

         <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
            
            <div className="mb-8 relative z-20">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-mono border border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5 rounded backdrop-blur-sm">
                // SYSTEM_READY
              </span>
              <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-white mb-2 mix-blend-difference drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] whitespace-nowrap">
                <GlitchedText 
                  text="DEVSPACE" 
                  options={{ html: true, letterize: true, steps: [3, 8] }} 
                  glitchInterval={2500}
                />
              </h1>
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-cyan drop-shadow-lg">
                <GlitchedText 
                  text="2026 EDITION" 
                  options={{ html: true, letterize: true, startFrom: "code" }}
                />
              </h2>
            </div>
          {/* CTA Buttons - Fluid Glassmorphism (No Glitch) */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login">
              <div className="rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg px-8 py-4 text-white font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                INITIALIZE_SYSTEM
              </div>
            </Link>
            <Link href="https://discord.gg" target="_blank">
                <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg px-8 py-4 text-cyber-cyan font-bold hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    JOIN_NETWORK
                </div>
            </Link>
          </div>
        </div>

        {/* Hero Scene (Canvas) */}
        <div className="absolute inset-0 z-0">
          {/* Scene temporarily disabled for performance */}
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

      {/* Intro / Visual Hook Section - "Flagship Hackathon" */}
      <section className="relative py-32 overflow-hidden bg-[#e0dcd0] min-h-[80vh] flex flex-col items-center justify-center">
        {/* Floating Katana - Background Layer - Pushed UP significantly */}
         <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-60 mix-blend-multiply -translate-y-48">
             <Image src="/assets/img/katana.png" alt="Katana" width={1100} height={350} className="animate-float-slow grayscale drop-shadow-2xl" />
         </div>

        <div className="container relative z-10 flex flex-col items-center">
            
            {/* Spacing to separate Text from Katana - Pushed DOWN */}
            <div className="mt-80 relative flex flex-col items-center justify-center text-center">
                 <div className="mb-8">
                     <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#555] border border-black/10 px-4 py-1 rounded-full bg-white/40 backdrop-blur-sm inline-block">
                        TRACK 1: RESILIENCE
                    </h2>
                 </div>

                 <div className="relative z-10">
                     <h1 className="text-6xl md:text-9xl font-black text-[#1a1a1a] mb-8 font-sans tracking-tighter leading-[0.8] drop-shadow-2xl mix-blend-multiply whitespace-nowrap">
                        CSI&apos;s Flagship<br/>Hackathon
                     </h1>
                     <p className="max-w-xl mx-auto text-[#333] text-base md:text-lg leading-relaxed font-mono bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                        &gt; Explore how systems handle failure by preserving context, guiding recovery, and staying useful.
                     </p>
                 </div>
            </div>
        </div>
      </section>

      {/* Tracks Section - Horizontal Scroll */}
      <HorizontalTracks />

      {/* Visual Glue: Marquee */}
      <div className="py-4 bg-black border-y border-white/5 opacity-50 relative z-20">
           <Marquee className="text-sm font-mono text-[#8d8d8d] tracking-widest uppercase">
               SYSTEM NORMAL // NEO TOKYO // DATE: 2026 // DEVSPACE // HACKATHON // READY PLAYER ONE //
           </Marquee>
      </div>

       {/* Timeline Section - Neo Tokyo Redesign */}
      <section className="relative py-24 overflow-hidden min-h-screen flex items-center bg-black">
          {/* Background Texture - Image 18 (Portal BG) Blurred & Darkened */}
          <div className="absolute inset-0 z-0">
               <Image 
                src="/assets/bg/portal-bg.png" 
                alt="Neo Tokyo Backdrop" 
                fill 
                className="object-cover blur-[3px] opacity-40 contrast-125"
               />
               <div className="absolute inset-0 bg-black/80 mix-blend-multiply" /> {/* Dark Overlay */}
               <div className="absolute inset-0 bg-[url('/assets/img/grid-pattern.png')] opacity-10" />
          </div>
          
         <div className="container relative z-10 max-w-6xl">
             
             <div className="flex flex-col lg:flex-row gap-16">
                 {/* Neo Tokyo Left Column - Vertical Text */}
                 <div className="hidden lg:flex flex-col items-center justify-center border-r border-[#ff4d29]/30 pr-8">
                     <div 
                        className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff4d29] to-transparent opacity-80 select-none tracking-widest font-sans drop-shadow-[0_0_15px_rgba(255,77,41,0.5)]"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
                     >
                         作戦計画
                     </div>
                     <div className="mt-8 h-32 w-[2px] bg-[#ff4d29]" />
                     <div 
                        className="mt-4 text-[#ff4d29] font-mono text-xs tracking-widest uppercase"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                     >
                         MISSION_PROTOCOL_V4
                     </div>
                 </div>

                 {/* Content Grid */}
                 <div className="flex-1">
                     <div className="mb-12 flex items-end justify-between border-b border-white/10 pb-6">
                        <div>
                             <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white">
                                 TIME<span className="text-[#ff4d29]">LINE</span>
                             </h2>
                             <p className="text-white/60 font-mono text-lg mt-2">
                                // OPERATION_NEO_TOKYO
                             </p>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-5xl font-black text-white/10">2026</div>
                            <div className="text-[#ff4d29]/50 font-mono text-sm">ESTABLISHED</div>
                        </div>
                     </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {timeline.map((item, id) => (
                            <div key={id} className="group relative bg-black/60 backdrop-blur-xl border border-white/10 hover:border-[#ff4d29]/80 p-10 min-h-[300px] flex flex-col justify-between rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,77,41,0.2)]">
                                {/* Decor Corners */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ff4d29] opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ff4d29] opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div>
                                    {/* Time Badge */}
                                    <div className="inline-block px-4 py-2 bg-[#ff4d29]/10 border border-[#ff4d29]/20 text-[#ff4d29] font-mono text-sm mb-6">
                                        {item.time}
                                    </div>
                                    
                                    <h3 className="text-4xl font-bold mb-3 text-white group-hover:text-[#ff4d29] transition-colors">{item.title}</h3>
                                    <p className="font-mono text-sm tracking-widest text-white/50 uppercase">{item.sub}</p>
                                </div>
                                
                                {/* Background Glitch Element */}
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 text-9xl font-black text-white/5 select-none pointer-events-none group-hover:text-[#ff4d29]/10 transition-colors">
                                    {id + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
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
    title: "closing ceremony",
    sub: "awards and conclusion"
  },
];
