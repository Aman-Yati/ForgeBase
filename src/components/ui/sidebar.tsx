"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    label: "Resume",
    href: "/resume",
    icon: FileText,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

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
      <header className="fixed inset-x-0 top-0 z-40 flex flex-col gap-3 border-b border-white/10 bg-[#000816] px-5 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-snasm text-white">
              ForgeBase
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-white/10 bg-[#000816] transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-7">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-snasm text-white">
              ForgeBase
            </span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white lg:hidden"
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
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/dashboard" && pathname.startsWith(href));

              return (
                <li key={label}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#151B31] text-white"
                        : "text-white hover:bg-[#151B31] hover:text-white"
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
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Card */}
        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <UserButton />
            <span className="truncate text-sm font-medium text-white">
              {username}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}