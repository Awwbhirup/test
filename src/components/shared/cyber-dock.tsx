"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Radio, Calendar, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useCyberSound } from "@/components/hooks/use-cyber-sound"; // Audio optional for initial render

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tracks", label: "Tracks", icon: Zap },
  { href: "/timeline", label: "Timeline", icon: Calendar },
  { href: "/dashboard", label: "Portal", icon: User },
];

export function CyberDock() {
  const pathname = usePathname();
  // const { playHover, playClick } = useCyberSound(); 

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link 
                        key={item.href} 
                        href={item.href}
                        className="relative group"
                        // onMouseEnter={() => playHover()}
                        // onClick={() => playClick()}
                    >
                        <motion.div
                            whileHover={{ scale: 1.2, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className={cn(
                                "p-3 rounded-xl transition-all duration-300 relative",
                                isActive ? "bg-white/10 text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]" : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-6 h-6" />
                            
                            {/* Label Tooltip */}
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none whitespace-nowrap">
                                {item.label}
                            </span>
                            
                            {/* Active Dot */}
                            {isActive && (
                                <motion.div 
                                    layoutId="dock-active"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyber-cyan rounded-full shadow-[0_0_5px_#00f0ff]" 
                                />
                            )}
                        </motion.div>
                    </Link>
                );
            })}
        </motion.div>
    </div>
  );
}
