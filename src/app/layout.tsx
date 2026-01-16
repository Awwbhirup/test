import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

// In a real app, you'd import fonts from @next/font
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevSpace 2026 | Hackathon",
  description: "Leveraging Web3 for Social Responsibility. Flagship Hackathon by CSI-VIT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Placeholder for CDN fonts if not using next/font yet to speed up dev */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@200,400,700,500,600&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-white selection:text-black")}>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
