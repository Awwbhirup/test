"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Users, Upload, Settings, Activity, Shield } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/team", label: "My Squad", icon: Users },
  { href: "/dashboard/submit", label: "Submit", icon: Upload },
  { href: "/dashboard/config", label: "Config", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 border-r border-white/10 bg-black/90 backdrop-blur-xl z-50 flex flex-col">
      {/* Header */}
      <div className="h-20 flex items-center justify-center md:justify-start md:px-8 border-b border-white/10 relative overflow-hidden group">
        <div className="absolute inset-0 bg-cyber-cyan/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        <Shield className="h-8 w-8 text-cyber-cyan animate-pulse relative z-10" />
        <span className="ml-3 font-bold tracking-widest uppercase hidden md:block text-white relative z-10 font-mono">
          CMD_CTR
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 flex flex-col gap-2 px-2 md:px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-lg transition-all duration-300 group relative",
                isActive ? "text-cyber-cyan" : "text-white/60 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <item.icon className={cn("h-5 w-5 relative z-10", isActive && "animate-pulse")} />
              <span className="text-sm font-mono uppercase tracking-wider hidden md:block relative z-10">
                {item.label}
              </span>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </Link>
          );
        })}
      </nav>

      {/* Footer / Status */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-center md:justify-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-green-500/50 transition-colors cursor-help group">
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <div className="hidden md:block">
            <p className="text-[10px] text-white/40 uppercase tracking-widest group-hover:text-green-500/80 transition-colors">System Status</p>
            <p className="text-xs font-bold text-green-500">ONLINE</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
