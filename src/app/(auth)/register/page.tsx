"use client";

import { GlitchButton } from "@/components/ui/glitch-button";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Chaotic Background */}
      <div 
        className="absolute inset-0 z-[-1] bg-[url('/assets/img/hero-parallax.png')] bg-cover bg-center blur-lg opacity-40 scale-110 contrast-125"
      />

      <GlassCard className="w-full max-w-md p-8 border-cyber-pink/30 bg-black/80 backdrop-blur-xl">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-jp text-cyber-pink mb-2">新規ユーザー登録</h1>
            <p className="text-muted-foreground font-mono text-sm tracking-widest">NEW USER ENTRY</p>
        </div>

        <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-cyber-cyan/80">FIRST_NAME</label>
                    <input className="w-full bg-transparent border-b border-white/20 px-0 py-2 font-mono text-white focus:outline-none focus:border-cyber-pink transition-colors" />
                </div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-cyber-cyan/80">LAST_NAME</label>
                    <input className="w-full bg-transparent border-b border-white/20 px-0 py-2 font-mono text-white focus:outline-none focus:border-cyber-pink transition-colors" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-mono text-cyber-cyan/80">EMAIL_ADDRESS</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 px-0 py-2 font-mono text-white focus:outline-none focus:border-cyber-pink transition-colors" />
            </div>
            
             <div className="space-y-2">
                <label className="text-xs font-mono text-cyber-cyan/80">SET_PASSWORD</label>
                <input type="password" className="w-full bg-transparent border-b border-white/20 px-0 py-2 font-mono text-white focus:outline-none focus:border-cyber-pink transition-colors" />
            </div>

            <div className="pt-4">
                <Link href="/dashboard">
                    <GlitchButton variant="secondary" className="w-full text-cyber-pink border-cyber-pink hover:bg-cyber-pink/10">INITIALIZE</GlitchButton>
                </Link>
            </div>
        </form>
         <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
                ALREADY REGISTERED? <Link href="/login" className="text-cyber-cyan hover:underline decoration-wavy underline-offset-4">SYSTEM_LOGIN</Link>
            </p>
        </div>
      </GlassCard>
    </div>
  );
}
