"use client";
import { Search } from "lucide-react";

export default function DashboardNavbar({name}: {name: string | null | undefined}) {
  return (
    <header className="fixed top-0 left-0 right-0 lg:left-60 z-30 h-16 border-b border-white/10 bg-[#000816]">
      <div className="flex h-full items-center justify-between px-6">
        {/* Page Title */}
        <h1 className="text-lg font-semibold text-white">Welcome, {name}</h1>
      </div>
    </header>
  );
}