"use client";

import { GlitchButton } from "@/components/ui/glitch-button";
import { GlassCard } from "@/components/ui/glass-card";
import { useState } from "react";

export default function TeamPage() {
    const [mode, setMode] = useState<"view" | "create" | "join">("view");

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold uppercase">Team Configuration</h1>
                <p className="text-muted-foreground font-jp">Manage your unit.</p>
            </header>

            {mode === "view" && (
                <div className="grid gap-6 md:grid-cols-2">
                    <GlassCard className="p-8 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setMode("create")}>
                         <h3 className="text-2xl font-bold uppercase">Create Unit</h3>
                         <p className="text-muted-foreground">Initialize a new team and invite members.</p>
                         <GlitchButton className="w-full mt-4">Initialize</GlitchButton>
                    </GlassCard>

                    <GlassCard className="p-8 text-center space-y-4 hover:border-secondary/50 transition-colors cursor-pointer" onClick={() => setMode("join")}>
                         <h3 className="text-2xl font-bold uppercase">Join Unit</h3>
                         <p className="text-muted-foreground">Enter an access code to join an existing unit.</p>
                         <GlitchButton variant="secondary" className="w-full mt-4">Connect</GlitchButton>
                    </GlassCard>
                </div>
            )}

            {mode === "create" && (
                <GlassCard className="max-w-md mx-auto p-8">
                    <h3 className="text-xl font-bold uppercase mb-6">Unit Initialization</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Team Name</label>
                            <input type="text" className="w-full bg-transparent border-b border-white/20 p-2 focus:border-primary outline-none" placeholder="e.g. CyberSamurai" />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <GlitchButton className="flex-1">Create</GlitchButton>
                            <button onClick={() => setMode("view")} className="text-sm text-muted-foreground hover:text-white">Cancel</button>
                        </div>
                    </div>
                </GlassCard>
            )}

            {mode === "join" && (
                <GlassCard className="max-w-md mx-auto p-8">
                    <h3 className="text-xl font-bold uppercase mb-6">Unit Connection</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Access Code</label>
                            <input type="text" className="w-full bg-transparent border-b border-white/20 p-2 focus:border-primary outline-none text-center text-2xl tracking-[0.5em] font-mono uppercase" placeholder="XXXXXX" maxLength={6} />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <GlitchButton className="flex-1">Join</GlitchButton>
                            <button onClick={() => setMode("view")} className="text-sm text-muted-foreground hover:text-white">Cancel</button>
                        </div>
                    </div>
                </GlassCard>
            )}
        </div>
    )
}
