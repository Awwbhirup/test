"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlitchButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const GlitchButton = React.forwardRef<HTMLButtonElement, GlitchButtonProps>(
  ({ className, children, variant = "primary", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative px-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 group overflow-hidden glitch-hover",
          variant === "primary" && "bg-white text-black hover:bg-cyber-cyan hover:text-black hover:shadow-[0_0_20px_#00f0ff]",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "outline" && "border-2 border-white/20 text-white hover:border-cyber-pink hover:bg-cyber-pink/10 hover:text-cyber-pink",
          className
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        
        {/* Glitch Effect Elements */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-white/30 skew-x-12 transition-transform duration-500" />
      </motion.button>
    );
  }
);
GlitchButton.displayName = "GlitchButton";
