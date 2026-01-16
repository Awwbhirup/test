import { cn } from "@/lib/utils";
import Link from "next/link";
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-md hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold uppercase tracking-tight">DevSpace</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
            <NavItem href="/dashboard" icon={LayoutDashboard} label="Overview" active />
            <NavItem href="/dashboard/team" icon={Users} label="Team Unit" />
        </nav>

        <div className="p-4 border-t border-white/10">
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />
                Disconnect
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active?: boolean }) {
    return (
        <Link href={href} className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
            active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-white"
        )}>
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    )
}
