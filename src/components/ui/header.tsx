"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.header
      initial={{
        opacity: 0,
        y: -70,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="top-0 z-50 mx-auto w-full"
    >
      <div className="mx-auto max-w-[89rem] px-4 sm:px-6">
        <div className="relative">
          {/* ================= Desktop ================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="hidden h-22 items-center justify-between border-b border-white/40 md:flex"
          >
            <Logo />

            <nav>
              <ul className="flex items-center gap-12 pl-24 text-xs font-snasm-light text-white">
                <li>
                  <Link href="/#about">ABOUT</Link>
                </li>

                <li>
                  <Link href="/#features">FEATURES</Link>
                </li>

                <li>
                  <Link
                    href="/#how-it-works"
                    className="whitespace-nowrap"
                  >
                    HOW IT WORKS
                  </Link>
                </li>

                <li>
                  <Link href="/#faq">FAQ</Link>
                </li>
              </ul>
            </nav>

<Link
    href="/sign-up"
    className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-6 py-3 uppercase transition-colors duration-300 hover:text-black"
  >
    {/* Background */}
    <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-300 ease-out group-hover:scale-y-100" />

    {/* Rolling Text */}
    <span className="relative block h-5 overflow-hidden leading-5">
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span>Get Started</span>
        <span>Get Started</span>
      </span>
    </span>
  </Link>        
            
          </motion.div>

          {/* ================= Mobile ================= */}

          <div className="relative mt-4 md:hidden">
            <motion.div
              initial={{
                
                y: -25,
              }}
              animate={{
                
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-30"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <Logo />

                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                    rotate: -90,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.12,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  className="transition-transform"
                >
                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    {isOpen ? (
                      <X className="h-7 w-7 text-white" />
                    ) : (
                      <Menu className="h-7 w-7 text-white" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : -15,
                scale: isOpen ? 1 : 0.97,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute left-0 right-0 top-full z-20 origin-top overflow-hidden rounded-xl border border-white/15 bg-grey-500 shadow-[0_15px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-2xl ${
                !isOpen && "pointer-events-none"
              }`}
            >
              <nav className="px-6 py-6 font-snasm-light">
                <ul className="space-y-5">
                  <li>
                    <Link
                      href="/#about"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-sm tracking-[0.2em] text-white transition hover:text-violet-300"
                    >
                      ABOUT
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/#features"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-sm tracking-[0.2em] text-white transition hover:text-violet-300"
                    >
                      FEATURES
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/#how-it-works"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-sm tracking-[0.2em] text-white transition hover:text-violet-300"
                    >
                      HOW IT WORKS
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/#faq"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-sm tracking-[0.2em] text-white transition hover:text-violet-300"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}