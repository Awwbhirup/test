"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.h1
        initial={{ y: "100%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        whileInView={{ 
            y: 0, 
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" 
        }}
        viewport={{ once: true }}
        transition={{ 
            duration: 1, 
            ease: [0.76, 0, 0.24, 1], 
            delay: delay 
        }}
        className="leading-tight"
      >
        {text}
      </motion.h1>
    </div>
  );
}
