"use client";

import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";
import { Volume2, VolumeX, Activity } from "lucide-react";
import { usePathname } from "next/navigation";

export function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  // Load Sounds
  const [playAmbient, { stop: stopAmbient, sound: ambientSound }] = useSound("/assets/sound/ambient.mp3", { 
    loop: true, 
    volume: 0.5,
    interrupt: false,
    autoplay: true,
  });

  const [playClick] = useSound("/assets/sound/click.mp3", { 
    volume: 1.0, 
    interrupt: true 
  });
  
  // Interaction Handler
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (!isMuted) {
          playAmbient();
        }
      }
    };

    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, [hasInteracted, isMuted, playAmbient]);

  useEffect(() => {
    const handleClick = () => {
      if (!isMuted && hasInteracted) playClick();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isMuted, hasInteracted, playClick]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (hasInteracted) playAmbient();
    } else {
      setIsMuted(true);
      stopAmbient();
    }
  };

  return (
    <button
      onClick={(e) => {
          e.stopPropagation(); // Prevent triggering generic click
          toggleMute();
      }}
      className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:border-cyber-cyan/50 text-white/70 hover:text-cyber-cyan transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <div className="relative">
             <Volume2 className="w-5 h-5" />
             <div className="absolute inset-0 bg-cyber-cyan/20 blur-md rounded-full animate-pulse-slow opacity-0 group-hover:opacity-100" />
        </div>
      )}
    </button>
  );
}
