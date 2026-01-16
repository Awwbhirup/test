"use client";

import { useEffect, useRef } from "react";
import GlitchedWriter from "glitched-writer";

interface GlitchedTextProps {
  text: string;
  className?: string;
  options?: any;
  glitchInterval?: number;
}

export function GlitchedText({ text, className, options, glitchInterval = 3000 }: GlitchedTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const writerRef = useRef<GlitchedWriter | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      writerRef.current = new GlitchedWriter(elementRef.current, options);
      writerRef.current.write(text);

      // Loop effect based on prop
      const interval = setInterval(() => {
        // Re-write text to trigger glitch animation
        writerRef.current?.write(text);
      }, glitchInterval);

      return () => clearInterval(interval);
    }
  }, [text, options, glitchInterval]);

  return <span ref={elementRef} className={className} />;
}
