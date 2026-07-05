"use client";
import { Search } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 lg:left-72 z-30 h-16 border-b border-white/10 bg-[#000816]">
      <div className="flex h-full items-center justify-between px-6">
        {/* Page Title */}
        <h1 className="text-lg font-semibold text-white">Dashboard</h1>

        {/* Search */}
        <div className="hidden md:flex h-11 w-80 items-center gap-3 rounded-full border border-white/10 bg-[#111827] px-4 transition-colors focus-within:border-indigo-500/60">
          <Search size={18} className="shrink-0 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full border-none bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none"
          />
        </div>
      </div>
    </header>
  );
}