"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./logo";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative rounded-2xl border border-white/15 bg-[#0b1220]/40 backdrop-blur-2xl shadow-lg">

          {/* Navbar */}
          <div className="flex h-16 items-center justify-between px-4">

            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8 text-sm font-medium text-gray-400">
                <li>
                  <Link
                    href="#about"
                    className="transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="#features"
                    className="transition-colors hover:text-white"
                  >
                    Features
                  </Link>
                </li>

                <li>
                  <Link
                    href="#how-it-works"
                    className="whitespace-nowrap transition-colors hover:text-white"
                  >
                    How It Works
                  </Link>
                </li>

                <li>
                  <Link
                    href="#faq"
                    className="transition-colors hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right Side */}
            <div className="hidden items-center gap-3 md:flex">

              <Link
                href="/sign-up"
                className="inline-flex items-center rounded-md bg-gradient-to-t from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:from-indigo-500 hover:to-indigo-400"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 md:hidden"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
              isOpen ? "max-h-96 border-t border-gray-800" : "max-h-0"
            }`}
          >
            <nav className="px-4 py-4">
              <ul className="space-y-2">

                <li>
                  <Link
                    href="#about"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="#features"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Features
                  </Link>
                </li>

                <li>
                  <Link
                    href="#how-it-works"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    How It Works
                  </Link>
                </li>

                <li>
                  <Link
                    href="#faq"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>

                <div className="my-3 border-t border-gray-800" />

                <li className="pt-2">
                  <Link
                    href="/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="block rounded-full bg-gradient-to-t from-indigo-600 to-indigo-500 px-4 py-3 text-center font-medium text-white"
                  >
                    Get Started
                  </Link>
                </li>

              </ul>
            </nav>
          </div>

        </div>
      </div>
    </header>
  );
}