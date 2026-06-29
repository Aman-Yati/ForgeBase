"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Logo from "./logo";
import {
  LayoutDashboard,
  Briefcase,
  BarChart3,
  Calendar,
  FileText,
  User,
  Settings,
  Menu,
  X,
  Search,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Jobs", icon: Briefcase },
  { label: "Analytics", icon: BarChart3 },
  { label: "Calendar", icon: Calendar },
  { label: "Resume", icon: FileText },
  { label: "Profile", icon: User },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useUser();

  const username =
    user?.fullName ||
    user?.firstName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ||
    "User";

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex flex-col gap-3 border-b border-white/10 bg-[#0B1020] px-5 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-semibold text-white">
              JobHive
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="flex h-11 w-full items-center gap-3 rounded-full border border-white/10 bg-[#111827] px-4 transition-colors focus-within:border-indigo-500/60">
          <Search size={18} className="shrink-0 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full border-none bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none"
          />
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#0B1020] transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-7">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-semibold text-white">
              JobHive
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Navigation
          </p>

          <ul className="space-y-1">
            {NAV_ITEMS.map(({ label, icon: Icon }) => {
              const isActive = active === label;

              return (
                <li key={label}>
                  <button
                    onClick={() => {
                      setActive(label);
                      setMobileOpen(false);
                    }}
                    className={`relative flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#151B31] text-white"
                        : "text-zinc-400 hover:bg-[#151B31] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-indigo-500" />
                    )}

                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-indigo-400"
                          : "text-zinc-500"
                      }
                    />

                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Card */}
        <div className="border-t border-white/10 p-5">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <UserButton/>
            {username}

            </div>
        </div>
      </aside>
    </>
  );
}