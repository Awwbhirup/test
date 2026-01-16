import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { CyberDock } from "@/components/shared/cyber-dock";
import localFont from "next/font/local";

const naganoshi = localFont({ 
  src: "./fonts/Naganoshi.ttf",
  variable: "--font-naganoshi"
});

export const metadata: Metadata = {
  title: "DevSpace 2026 | Hackathon",
  description: "Leveraging Web3 for Social Responsibility. Flagship Hackathon by CSI-VIT.",
};

import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { AudioPlayer } from "@/components/ui/audio-player";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${naganoshi.variable}`}>
      <head>
        {/* Placeholder for CDN fonts if not using next/font yet to speed up dev */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-transparent font-sans antialiased overflow-x-hidden selection:bg-cyber-pink selection:text-black")}>
        {/* Anti-Void Global Background System */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {/* Layer 1: Deep Base (Avoids pure black) */}
          <div className="absolute inset-0 bg-[#050505]" />
          
          {/* Layer 2: Texture/Storm Image */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: "url('/assets/bg/bg-2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />

          {/* Layer 3: Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('/assets/noise.png')] mix-blend-overlay" />

          {/* Layer 4: Vignette to focus center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />
        </div>

        <Providers>
          <SmoothScroll>
            {/* Audio Player (Persists across pages) */}
            <div className="fixed bottom-4 left-4 z-50">
              <AudioPlayer />
            </div>
            
            {/* Cyber Dock (Floating Nav) */}
            <CyberDock />
            
            <main className="relative flex flex-col min-h-screen">
              {children}
            </main>
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
