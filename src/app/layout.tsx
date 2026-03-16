import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'AsyuraCommerce | Find Your Needs',
  description: 'Modern e-commerce platform built with Next.js and Golang Microservices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen pb-16 tablet:pb-0 bg-gradient-to-br from-[#f5f5f7] via-[#f2f2f7] to-[#e5e5ea] text-[var(--foreground)]">
        
        {/* Header di-import sebagai Client Component terpisah */}
        <Header />

        <main className="max-w-7xl mx-auto w-full p-4">
          {children}
        </main>

        {/* Bottom Navigation di-import sebagai Client Component terpisah */}
        <BottomNav />

      </body>
    </html>
  );
}
