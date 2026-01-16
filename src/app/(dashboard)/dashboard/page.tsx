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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-8 bg-black/20 backdrop-blur-md p-6 rounded-3xl">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 flex items-center gap-3">
            WELCOME BACK <span className="text-cyber-cyan font-naganoshi text-5xl md:text-6xl mt-1">PILOT</span>
          </h1>
          <div className="flex items-center gap-3 opacity-60">
             <span className="font-naganoshi text-2xl">システム起動</span>
             <span className="h-4 w-[1px] bg-white/20"/>
             <p className="text-muted-foreground font-mono text-xs">
                SYSTEM STATUS: <span className="text-green-500 animate-pulse">OPTIMAL</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
           {/* Decorative indicators */}
           <div className="h-10 px-4 border border-white/10 bg-black/40 rounded-full flex items-center justify-center gap-3 backdrop-blur-sm">
               <div className="w-2 h-2 rounded-full bg-cyber-pink animate-ping" />
               <span className="text-[10px] font-mono text-white/50 tracking-widest">LIVE FEEDS // ライブ</span>
           </div>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Countdown Widget */}
        <div className="col-span-1 md:col-span-2 relative group min-h-[250px] flex flex-col justify-center p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl hover:bg-black/30 transition-all duration-500 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-cyber-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-6 right-6 text-white/20">
                <Clock className="w-6 h-6" />
            </div>
            
            <div className="relative z-10">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyber-yellow mb-1">Mission Start</h3>
                <div className="font-naganoshi text-2xl text-white/40 mb-6">作戦開始</div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries(timeLeft).map(([label, value]) => (
                        <div key={label} className="bg-black/20 rounded-2xl p-4 border border-white/5 backdrop-blur-sm">
                            <div className="text-3xl md:text-6xl font-black font-mono text-white mb-2 tabular-nums">
                                {value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Team Status Widget */}
        <div className="relative group p-8 flex flex-col justify-between rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl hover:bg-black/30 transition-all duration-500 shadow-2xl">
            <div>
                 <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-cyber-pink">Squad Status</h3>
                    <Users className="w-5 h-5 text-white/30" />
                </div>
                <div className="font-naganoshi text-xl text-white/30 mb-6">部隊状況</div>

                <div className="flex flex-col items-center justify-center py-10 text-center bg-red-500/5 border border-red-500/20 rounded-2xl mb-4 backdrop-blur-sm">
                    <span className="text-red-500 font-bold tracking-wider mb-2 text-sm">NO SQUAD FOUND</span>
                    <p className="text-[10px] text-white/60 max-w-[150px]">
                        You are currently operating as a solo unit.
                    </p>
                </div>
            </div>
            <GlitchButton variant="secondary" className="w-full text-xs py-5 rounded-xl border-white/10 hover:bg-white/10">
                INITIATE TEAM CREATION
            </GlitchButton>
        </div>
        
        {/* Quest/Tracks Widget */}
        <div className="col-span-1 md:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl">
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-cyber-cyan/10 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-cyber-cyan" />
                      </div>
                      <div>
                          <h3 className="text-sm font-bold tracking-wider uppercase text-white">Active Protocols</h3>
                          <div className="font-naganoshi text-xs text-white/30 mt-1">実行中のプロトコル</div>
                      </div>
                  </div>
                  <span className="text-xs font-mono text-cyber-cyan animate-pulse bg-cyber-cyan/10 px-2 py-1 rounded">SYNCING...</span>
             </div>
             
             <div className="divide-y divide-white/5 p-2">
                 {[
                     { name: "Adaptive Systems", sub: "適応システム", progress: 0, status: "LOCKED" },
                     { name: "Digital Archaeology", sub: "デジタル考古学", progress: 0, status: "LOCKED" },
                     { name: "Zero Trust Zone", sub: "ゼロトラスト", progress: 0, status: "LOCKED" }
                 ].map((track, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group rounded-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center border border-white/10 group-hover:border-cyber-cyan/50 transition-colors">
                                <Code className="w-5 h-5 text-white/50 group-hover:text-cyber-cyan" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-wide text-white group-hover:text-cyber-cyan transition-colors">{track.name}</h4>
                                <div className="font-naganoshi text-xs text-white/20">{track.sub}</div>
                            </div>
                        </div>
                        <span className="text-[10px] font-mono border border-white/10 px-3 py-1 rounded-full text-white/50 bg-black/20">{track.status}</span>
                    </div>
                 ))}
             </div>
        </div>

        {/* System Logs */}
         <div className="relative p-6 overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl">
             <div className="flex items-center gap-3 mb-1">
                 <Terminal className="w-4 h-4 text-white/50" />
                 <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">System Logs</h3>
             </div>
             <div className="font-naganoshi text-lg text-white/20 mb-4">システムログ</div>

             <div className="font-mono text-[10px] space-y-3 text-white/60 h-[150px] overflow-y-auto custom-scrollbar p-4 bg-black/20 rounded-xl border border-white/5">
                 <p className="flex gap-2"><span className="text-white/20">10:42:01</span> <span>Initialization sequence start...</span></p>
                 <p className="flex gap-2"><span className="text-white/20">10:42:02</span> <span>Verifying biometrics... <span className="text-green-500">MATCH</span></span></p>
                 <p className="flex gap-2"><span className="text-white/20">10:42:05</span> <span>Mainframe connection established.</span></p>
                 <p className="flex gap-2 text-cyber-cyan"><span className="text-cyber-cyan/50">10:43:00</span> <span>&gt; WELCOME PILOT</span></p>
                 <p className="flex gap-2"><span className="text-white/20">10:43:05</span> <span>Scanning for network threats...</span></p>
                 <p className="flex gap-2"><span className="text-white/20">10:43:10</span> <span>No active anomalies detected.</span></p>
             </div>
         </div>

      </div>
    </div>
  );
}
