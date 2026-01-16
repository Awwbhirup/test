"use client";

import { useState } from "react";
import { GlitchButton } from "@/components/ui/glitch-button";
import { cn } from "@/lib/utils";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full max-w-md space-y-8 rounded-xl border border-white/10 bg-black/50 p-8 backdrop-blur-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold uppercase tracking-tighter">
          {isLogin ? "System Access" : "New User Entry"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground font-jp">
          {isLogin ? "Please verify your identity." : "Begin initialization sequence."}
        </p>
      </div>

      <form className="space-y-6">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Registration No.
            </label>
            <input
              type="text"
              placeholder="e.g. 24BCE1001"
              className="w-full rounded-none border-b border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        )}
        
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              placeholder="user@vitstudent.ac.in"
              className="w-full rounded-none border-b border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-colors"
            />
        </div>

        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Security Key
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-none border-b border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-colors"
            />
        </div>

        <GlitchButton className="w-full" type="button">
          {isLogin ? "Authenticate" : "Initialize"}
        </GlitchButton>
      </form>

      <div className="text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
        >
          {isLogin ? "Create New Profile >" : "< Back to Login"}
        </button>
      </div>
    </div>
  );
}
