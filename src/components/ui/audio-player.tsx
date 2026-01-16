"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
      {/* Visualizer Bars */}
      <div className="flex items-end gap-1 h-8">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-cyber-cyan"
            animate={{
              height: isPlaying ? ["20%", "100%", "50%"] : "10%",
              backgroundColor: isPlaying ? ["#00f0ff", "#ff003c", "#fcee0a"] : "#1a103c"
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <button
        onClick={togglePlay}
        className="group relative flex h-12 w-12 items-center justify-center border border-white/10 bg-black/80 backdrop-blur-md transition-all hover:border-cyber-cyan"
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-cyber-cyan group-hover:text-cyber-pink transition-colors" />
        ) : (
          <VolumeX className="h-5 w-5 text-muted-foreground group-hover:text-cyber-pink transition-colors" />
        )}
        <audio
          ref={audioRef}
          src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b829671b.mp3?filename=cyberpunk-beat-112396.mp3" 
          loop
        />
      </button>

      {!isPlaying && (
        <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-mono text-cyber-cyan animate-pulse">
          INITIALIZE SYSTEM &gt;&gt;
        </div>
      )}
    </div>
  );
}
