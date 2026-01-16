"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GlitchButton } from "@/components/ui/glitch-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Activity, Clock, Users, Trophy, Code, Terminal } from "lucide-react";

export default function DashboardPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-02-12T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            WELCOME BACK, <span className="text-cyber-cyan">PILOT</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            SYSTEM STATUS: <span className="text-green-500 animate-pulse">OPTIMAL</span> // CONNECTION SECURE
          </p>
        </div>
        <div className="flex gap-4">
           {/* Decorative indicators */}
           <div className="h-10 w-32 border border-white/10 bg-black/40 rounded flex items-center justify-center gap-2">
               <div className="w-2 h-2 rounded-full bg-cyber-pink animate-ping" />
               <span className="text-[10px] font-mono text-white/50">LIVE FEEDS</span>
           </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Countdown Widget */}
        <GlassCard className="col-span-1 md:col-span-2 relative overflow-hidden group min-h-[250px] flex flex-col justify-center">
            <div className="absolute top-2 right-2 text-white/20">
                <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyber-yellow mb-2">Mission Start</h3>
            
            <div className="grid grid-cols-4 gap-4 text-center mt-4">
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <div className="text-3xl md:text-5xl font-black font-mono text-white mb-1">
                            {value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
                    </div>
                ))}
            </div>
            
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />
        </GlassCard>

        {/* Team Status Widget */}
        <GlassCard className="relative group p-8 flex flex-col justify-between">
            <div>
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-cyber-pink">Squad Status</h3>
                    <Users className="w-5 h-5 text-white/30" />
                </div>
                <div className="flex flex-col items-center justify-center h-full py-8 text-center bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                    <span className="text-red-500 font-bold tracking-wider mb-2">NO SQUAD FOUND</span>
                    <p className="text-[10px] text-white/60 max-w-[150px]">
                        You are currently operating as a solo unit.
                    </p>
                </div>
            </div>
            <GlitchButton variant="secondary" className="w-full text-xs py-2 h-10">
                INITIATE TEAM CREATION
            </GlitchButton>
             
             {/* Corner Brackets */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20" />
        </GlassCard>
        
        {/* Quest/Tracks Widget */}
        <GlassCard className="col-span-1 md:col-span-2 p-0 overflow-hidden border-cyber-cyan/20">
             <div className="p-6 border-b border-white/10 flex justify-between items-center bg-cyber-cyan/5">
                  <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-cyber-cyan" />
                      <h3 className="text-sm font-bold tracking-wider uppercase text-white">Active Protocols</h3>
                  </div>
                  <span className="text-xs font-mono text-cyber-cyan animate-pulse">SYNCING...</span>
             </div>
             
             <div className="divide-y divide-white/5">
                 {[
                     { name: "Adaptive Systems", progress: 0, status: "LOCKED" },
                     { name: "Digital Archaeology", progress: 0, status: "LOCKED" },
                     { name: "Zero Trust Zone", progress: 0, status: "LOCKED" }
                 ].map((track, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyber-cyan/50 transition-colors">
                                <Code className="w-4 h-4 text-white/50 group-hover:text-cyber-cyan" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-wide">{track.name}</h4>
                                <div className="h-1 w-24 bg-white/10 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-cyber-cyan w-0" />
                                </div>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-white/50">{track.status}</span>
                    </div>
                 ))}
             </div>
        </GlassCard>

        {/* System Logs */}
         <GlassCard className="relative p-6 overflow-hidden">
             <div className="flex items-center gap-2 mb-4">
                 <Terminal className="w-4 h-4 text-white/50" />
                 <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">System Logs</h3>
             </div>
             <div className="font-mono text-[10px] space-y-2 text-white/40 h-[150px] overflow-y-auto custom-scrollbar">
                 <p>&gt; Initializing user session...</p>
                 <p>&gt; Verifying biometrics... OK</p>
                 <p>&gt; Connecting to main server... OK</p>
                 <p className="text-cyber-cyan">&gt; WELCOME PILOT</p>
                 <p>&gt; Checking mail... 0 new</p>
                 <p>&gt; Scanning for threats... NONE</p>
             </div>
              {/* Corner Brackets */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20" />
         </GlassCard>

      </div>
    </div>
  );
}
