"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Fingerprint, ScanEye, ArrowRight } from "lucide-react";
import { GlitchButton } from "@/components/ui/glitch-button";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/hero-parallax.png"
          alt="City Background"
          fill
          className="object-cover blur-xl opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[url('/assets/img/grid-pattern.svg')] opacity-20" />
      </div>

      {/* Main Container - Glass Terminal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,240,255,0.1)]"
      >
        {/* Left Side - Scanner Animation */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-black/20 border-r border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
             
             <div className="relative z-10">
                 <div className="relative w-48 h-48 flex items-center justify-center rounded-full border border-cyber-cyan/30">
                     <div className="absolute inset-0 rounded-full border-t border-cyber-cyan animate-spin-slow" />
                     <div className="absolute inset-2 rounded-full border-b border-cyber-pink animate-spin-reverse-slow" />
                     <Fingerprint className="w-24 h-24 text-cyber-cyan/80 animate-pulse" />
                 </div>
                 <div className="mt-8 text-center space-y-2">
                     <h3 className="text-xl font-bold tracking-widest text-white">BIOMETRIC SCAN</h3>
                     <p className="text-xs font-mono text-cyber-cyan animate-pulse">WAITING FOR INPUT...</p>
                 </div>
             </div>
             
             {/* Scanning Line */}
             <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-cyber-cyan/50 shadow-[0_0_20px_#00f0ff]"
             />
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-black/40">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 tracking-tighter text-white">IDENTITY VERIFICATION</h1>
                <p className="text-xs font-mono text-[#8d8d8d]">SECURE CONNECTION ESTABLISHED</p>
            </div>

            <form className="space-y-8">
                {/* Email Input */}
                <div className="group relative">
                    <label className="text-xs font-mono text-[#8d8d8d] uppercase tracking-widest mb-2 block">
                        User_ID / Email
                    </label>
                    <input 
                        type="email" 
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none transition-all focus:border-cyber-cyan font-mono"
                        placeholder="ENTER ID..."
                    />
                    <div className={cn(
                        "absolute -bottom-5 left-0 text-[10px] font-mono text-cyber-cyan flex items-center gap-1 transition-opacity",
                        focusedField === "email" ? "opacity-100" : "opacity-0"
                    )}>
                        <ScanEye className="w-3 h-3 animate-pulse" /> SCANNING DATABASE...
                    </div>
                </div>

                {/* Password Input */}
                <div className="group relative">
                    <label className="text-xs font-mono text-[#8d8d8d] uppercase tracking-widest mb-2 block">
                        Access Key
                    </label>
                    <input 
                        type="password" 
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none transition-all focus:border-cyber-pink font-mono"
                        placeholder="••••••••"
                    />
                     <div className={cn(
                        "absolute -bottom-5 left-0 text-[10px] font-mono text-cyber-pink flex items-center gap-1 transition-opacity",
                        focusedField === "password" ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="w-1 h-1 bg-cyber-pink rounded-full animate-ping" /> VERIFYING KEY...
                    </div>
                </div>

                <div className="pt-4">
                    <GlitchButton className="w-full justify-center" variant="primary">
                        AUTHENTICATE <ArrowRight className="w-4 h-4" />
                    </GlitchButton>
                </div>

                <div className="text-center mt-6">
                    <Link href="/register" className="text-xs font-mono text-[#8d8d8d] hover:text-white transition-colors border-b border-dashed border-[#8d8d8d] hover:border-white pb-1">
                        NO IDENTIFICATION? REGISTER NEW USER
                    </Link>
                </div>
            </form>
        </div>
      </motion.div>
    </div>
  );
}
