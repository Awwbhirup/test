import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyber-cyan selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[url('/assets/img/grid-pattern.svg')] opacity-10 pointer-events-none" />
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 min-h-screen relative">
         {/* Top Border Gradient */}
         <div className="sticky top-0 z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
         
        <div className="p-6 md:p-12 max-w-7xl mx-auto relative min-h-[calc(100vh-1px)] border-x border-white/5 bg-black/50 backdrop-blur-sm shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {children}
        </div>
      </main>
    </div>
  );
}
