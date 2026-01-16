import { GlassCard } from "@/components/ui/glass-card";
import { GlitchButton } from "@/components/ui/glitch-button";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <header className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-bold uppercase">Mission Control</h1>
            <p className="text-muted-foreground font-jp">Welcome back, Operator.</p>
         </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {/* Status Card */}
         <GlassCard className="p-0">
            <div className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Application Status</h3>
                <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                    </span>
                    <span className="text-2xl font-bold">Pending Review</span>
                </div>
                <p className="text-sm text-muted-foreground">Your profile is being scanned by the organizers.</p>
            </div>
         </GlassCard>

          {/* Team Status */}
         <GlassCard className="p-0">
             <div className="p-6">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Team Unit</h3>
                 <p className="text-2xl font-bold mb-2">No active unit</p>
                 <div className="flex gap-2">
                    <GlitchButton className="text-xs px-4 py-2">Create</GlitchButton>
                    <GlitchButton variant="secondary" className="text-xs px-4 py-2">Join</GlitchButton>
                 </div>
             </div>
         </GlassCard>
      </div>
    </div>
  );
}
