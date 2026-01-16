"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]", className)}>
      <div
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] min-w-full animate-scroll",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)] min-w-full animate-scroll",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
