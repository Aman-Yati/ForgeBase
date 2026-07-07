
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./css/globals.css";
import SmoothScroll from "@/components/smoothscroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ForgeBase",
  description: "A modern job application tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
          <main className="flex-1">
            <SmoothScroll/>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
