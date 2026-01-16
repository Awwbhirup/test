import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyber-cyan selection:text-black font-sans overflow-hidden">
      {/* Background Grid */}
      {/* Background with Great Wave Image */}
      <div 
        className="fixed inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/bg/portal-wave.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Japanese Decor Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
         <div className="font-naganoshi text-[20vw] text-white/5 opacity-50 select-none blur-sm mix-blend-overlay leading-none">
            司令部
         </div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 min-h-screen relative z-10 transition-all duration-300">
         {/* Top Border Gradient Removed for cleaner glass look */}
         
        <div className="p-6 md:p-12 max-w-7xl mx-auto relative min-h-screen">
            {/* Content wrapped in a subtle container if needed, or let individual cards float */}
            {children}
        </div>
      </main>
    </div>
  );
}
