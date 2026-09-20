"use client";

import Image from "next/image";
import { headerImage } from "@/lib/images";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const lineVariants = {
  hidden: {
    y: "-110%",
  },
  show: {
    y: "0%",
    transition: {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HeroHome() {
  const { scrollY } = useScroll();

  const rawScale = useTransform(scrollY, [0, 400], [1.25, 1]);

  const scale = useSpring(rawScale, {
    stiffness: 80,
    damping: 30,
    mass: 0.8,
  });

  return (
    <section className="pb-20 pt-20 text-white lg:pt-20">
      <div className="mx-auto w-full max-w-[90rem] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="font-snasm pl-0 text-[clamp(4rem,18vw,14rem)] uppercase leading-[0.78] tracking-tight lg:pl-1"
            >
              <div className="inline-block overflow-hidden pr-[0.15em]">
                <motion.div variants={lineVariants}>FORGE</motion.div>
              </div>

              <div className="inline-block overflow-hidden pr-[0.15em]">
                <motion.div variants={lineVariants}>BASE</motion.div>
              </div>
            </motion.h1>
          </div>

          <div className="mt-10 h-100 w-full max-w-sm sm:max-w-md lg:ml-auto lg:mt-60">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "30%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.10,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                  ✦
                </div>

                <h2 className="mb-4 font-snasm text-xl uppercase leading-tight">
                  ORGANIZE YOUR JOB SEARCH
                </h2>

                <p className="mb-8 leading-5 text-white/55">
                  Track applications, interviews, offers, and rejections from
                  one clean dashboard. Stay organized and focus on landing your
                  next opportunity.
                </p>
            <div className="flex gap-4">
            <Link
              href="/sign-up"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-6 py-3 uppercase transition-colors duration-300 hover:text-black"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-300 ease-out group-hover:scale-y-100" />

                <span className="relative block h-5 overflow-hidden leading-5">
                <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                <span>Start Tracking</span>
                <span>Start Tracking</span>
                </span>
                </span>
              </Link>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pb-10 flex justify-center overflow-hidden rounded-2xl px-6">
        <div className="relative w-full max-w-7xl overflow-hidden rounded-2xl">
          <motion.div style={{ scale }}>
            <Image
              src={headerImage}
              width={1104}
              height={384}
              quality={100}
              unoptimized
              alt="Home Illustration"
              className="h-auto w-full rounded-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}