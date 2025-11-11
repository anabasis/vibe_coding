import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt Discovery - AI 프롬프트 마켓플레이스",
  description: "AI 프롬프트를 사고 팔 수 있는 마켓플레이스",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
