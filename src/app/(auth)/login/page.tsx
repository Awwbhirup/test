"use client";

import { GlitchButton } from "@/components/ui/glitch-button";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Chaotic Background */}
      <div 
        className="absolute inset-0 z-[-1] bg-[url('/assets/img/hero-parallax.png')] bg-cover bg-center blur-lg opacity-40 scale-110"
      />
      
      <GlassCard className="w-full max-w-md p-8 border-cyber-cyan/30 bg-black/80 backdrop-blur-xl">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-jp text-cyber-cyan mb-2">システムアクセス</h1>
            <p className="text-muted-foreground font-mono text-sm tracking-widest">SYSTEM ACCESS</p>
        </div>

        <form className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-mono text-cyber-pink/80">USER_ID //</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-2 font-mono text-white focus:outline-none focus:border-cyber-cyan transition-colors placeholder:text-white/10"
                    placeholder="ENTER_EMAIL"
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-mono text-cyber-pink/80">PASSPHRASE //</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-0 py-2 font-mono text-white focus:outline-none focus:border-cyber-cyan transition-colors placeholder:text-white/10"
                    placeholder="••••••••"
                />
            </div>

            <div className="pt-4">
                <Link href="/dashboard">
                    <GlitchButton className="w-full">AUTHENTICATE</GlitchButton>
                </Link>
            </div>
        </form>

        <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
                NO ID? <Link href="/register" className="text-cyber-yellow hover:underline decoration-wavy underline-offset-4">INIT_NEW_USER</Link>
            </p>
        </div>
      </GlassCard>
    </div>
  );
}
