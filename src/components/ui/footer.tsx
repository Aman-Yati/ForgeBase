"use client";

import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { footerIllustration } from "@/lib/images";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/#features" },
      { name: "FAQ", href: "/#faq" },
      { name: "How it works", href: "/#how-it-works" },
      { name: "Our Method", href: "/#method" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/#about" },
      { name: "Diversity & Inclusion", href: "/#diversity" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Financial Statements", href: "/financials" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Community", href: "/community" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Report a Vulnerability", href: "/security" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Feedback", href: "/feedback" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Documentation", href: "/docs" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up")
  ) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center overflow-hidden"
          aria-hidden="true"
        >
          <Image
            src={footerIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
            className="h-auto w-full max-w-[1076px]"
            priority
          />
        </div>

        <div className="grid grid-cols-2 justify-between gap-12 py-16 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-24 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          {/* Footer Sections */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-200">
                {section.title}
              </h3>

              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-indigo-200/65 transition hover:text-indigo-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Logo & Copyright */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:text-right">
            <div className="mb-3">
              <Logo />
            </div>

            <div className="text-sm">
              <p className="mb-3 text-indigo-200/65">
                © ForgeBase 2026.
                <span className="text-gray-700"> · </span>

                <Link
                  href="/terms"
                  className="transition hover:text-indigo-500"
                >
                  Terms
                </Link>
              </p>

              <ul className="inline-flex gap-1">
                {/* Keep your social icons here unchanged */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}