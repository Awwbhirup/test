"use client";

import React from "react";
import { GlitchButton } from "@/components/ui/glitch-button";
import { Upload } from "lucide-react";

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-transparent p-8 pt-24">
      {/* Background with Grid */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{
            backgroundImage: "url('/assets/img/grid-pattern.png')",
            backgroundSize: "100px 100px",
            backgroundRepeat: "repeat"
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold uppercase mb-8 text-white tracking-wider flex items-center gap-4">
            <Upload className="text-cyber-cyan" />
            Project Submission
        </h1>
        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl hover:border-cyber-cyan/50 transition-colors group cursor-pointer bg-black/20">
                <Upload className="w-16 h-16 text-white/20 mx-auto mb-4 group-hover:text-cyber-cyan transition-colors" />
                <h3 className="text-xl font-bold text-white mb-2">Upload Project Artifacts</h3>
                <p className="text-white/50 mb-8 max-w-md mx-auto">Drag and drop your project files, or click to browse. Max size 500MB. Supported formats: .zip, .tar.gz</p>
                <GlitchButton>
                    Select Files
                </GlitchButton>
            </div>
            
            <div className="mt-8 space-y-4">
                <div>
                    <label className="block text-sm font-mono text-cyber-cyan mb-2">PROJECT_NAME</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-cyan outline-none transition-colors" placeholder="Enter output name..." />
                </div>
                <div>
                    <label className="block text-sm font-mono text-cyber-cyan mb-2">REPO_URL</label>
                    <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-cyan outline-none transition-colors" placeholder="https://github.com/..." />
                </div>
                
                <div className="pt-4 flex justify-end">
                    <GlitchButton>
                        Initiate Upload
                    </GlitchButton>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
