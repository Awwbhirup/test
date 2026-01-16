import { GlassCard } from "@/components/ui/glass-card";
import { GlitchButton } from "@/components/ui/glitch-button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
       {/* Welcome Banner */}
      <GlassCard className="border-l-4 border-l-cyber-cyan bg-cyber-cyan/5">
        <div className="flex justify-between items-start">
            <div>
                 <h1 className="text-3xl font-bold font-sans text-white mb-2">WELCOME, CANDIDATE_734</h1>
                 <p className="text-muted-foreground font-mono text-sm">ACCESS_LEVEL: PARTICIPANT</p>
            </div>
            <div className="flex items-center gap-2 border border-cyber-cyan/30 px-3 py-1 rounded-full bg-cyber-cyan/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
                </span>
                <span className="text-xs font-mono text-cyber-cyan">SYSTEM ONLINE</span>
            </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard className="hover:border-cyber-pink transition-colors">
          <h2 className="mb-4 text-xl font-bold uppercase text-white">Application Status</h2>
          <div className="mb-6 rounded-lg bg-orange-500/20 p-4 text-orange-200 border border-orange-500/30">
            <span className="mr-2 animate-pulse">●</span> PENDING REVIEW
          </div>
          <p className="text-sm text-muted-foreground">
            Our guardians are reviewing your profile. You will be notified via neural link (Email) once approved.
          </p>
        </GlassCard>

        <GlassCard className="hover:border-cyber-yellow transition-colors">
          <h2 className="mb-4 text-xl font-bold uppercase text-white">Team Unit</h2>
          <p className="mb-6 text-muted-foreground">
            You are currently operating as a lone wolf. Form a unit to increase survival chances.
          </p>
          <div className="flex gap-4">
             <Link href="/dashboard/team">
                <GlitchButton className="w-full bg-cyber-yellow text-black border-cyber-yellow hover:bg-white">MANAGE UNIT</GlitchButton>
             </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
