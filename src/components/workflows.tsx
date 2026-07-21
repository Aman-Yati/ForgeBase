"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { workflow01, workflow02, workflow03 } from "@/lib/images";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.18,
    },
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    // ❌ filter removed — was causing re-paints every frame
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    // ❌ filter removed — was causing re-paints every frame
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Workflows() {
  const [entered, setEntered] = useState(false);

  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section Header */}
          <motion.div
            className="mx-auto max-w-3xl pb-12 text-center md:pb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            style={{ willChange: "transform, opacity" }} // ✅ Fix #2
          >
            <motion.div
              variants={headerVariants}
              className="inline-flex items-center gap-3 pb-6 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                About ForgeBase
              </span>
            </motion.div>

            <motion.h2
              variants={headerVariants}
              className="mt-2 bg-clip-text pb-4 font-snasm tracking-normal text-3xl font-semibold md:text-4xl"
              style={{ willChange: "transform, opacity" }}
            >
              Map your job search journey
            </motion.h2>

            <motion.p
              variants={headerVariants}
              className="mb-6 text-lg text-indigo-200/65"
              style={{ willChange: "transform, opacity" }}
            >
              Simple and powerful job application tracker with dashboards,
              analytics, and Excel-style control. Organize applications, track
              progress, and get insights to land your next role faster.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            onAnimationComplete={() => setEntered(true)} // ✅ Fix #3 — mark as entered
            style={{ willChange: "transform, opacity" }}
          >
            <div className="group mx-auto grid max-w-sm items-start gap-8 pb-10 md:max-w-none lg:grid-cols-3">
              {/* Card 1 */}
              <motion.a
                variants={cardVariants}
                href="#0"
                className="group/card relative h-full rounded-2xl bg-gray-800 p-px"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="relative overflow-hidden z-20 h-full rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="relative overflow-hidden z-30">
                    <motion.div
                      whileHover={entered ? { scale: 1.05 } : undefined} // ✅ Fix #3 — only active after entrance
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "center" }}
                    >
                      <Image
                        src={workflow01}
                        width={1000}
                        height={288}
                        alt="Workflow 01"
                        className="w-full h-auto rounded-t-2xl"
                      />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-md bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-indigo-500 to-white bg-clip-text text-transparent">
                          Built-in Job Tracker
                        </span>
                      </span>
                    </div>

                    <p className="text-white">
                      Track every job application in one place with a clean
                      Excel-like interface. Add, edit, and manage applications
                      effortlessly without losing any opportunity.
                    </p>
                  </div>
                </div>
              </motion.a>

              {/* Card 2 */}
              <motion.a
                variants={cardVariants}
                href="#0"
                className="group/card relative h-full rounded-2xl bg-gray-800 p-px"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="relative overflow-hidden z-20 h-full rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="relative overflow-hidden z-30">
                    <motion.div
                      whileHover={entered ? { scale: 1.05 } : undefined}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "center" }}
                    >
                      <Image
                        src={workflow02}
                        width={1000}
                        height={288}
                        alt="Workflow 02"
                        className="w-full h-auto rounded-t-2xl"
                      />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-md bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-indigo-500 to-white bg-clip-text text-transparent">
                          Smart Analytics Dashboard
                        </span>
                      </span>
                    </div>

                    <p className="text-white">
                      Visualize your job search with real-time analytics —
                      track response rates, interview progress, and company
                      pipeline performance at a glance.
                    </p>
                  </div>
                </div>
              </motion.a>

              {/* Card 3 */}
              <motion.a
                variants={cardVariants}
                href="#0"
                className="group/card relative h-full rounded-2xl bg-gray-800 p-px"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="relative overflow-hidden z-20 h-full rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="relative overflow-hidden z-30">
                    <motion.div
                      whileHover={entered ? { scale: 1.05 } : undefined}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "center" }}
                    >
                      <Image
                        src={workflow03}
                        width={1000}
                        height={288}
                        alt="Workflow 03"
                        className="w-full h-auto rounded-t-2xl"
                      />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-md bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-indigo-500 to-white bg-clip-text text-transparent">
                          Excel-like Filtering & Search
                        </span>
                      </span>
                    </div>

                    <p className="text-white">
                      Use powerful filters and search like a spreadsheet.
                      Sort applications by status, company, role, or date to
                      stay fully organized and in control.
                    </p>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
