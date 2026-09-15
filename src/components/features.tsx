"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import {
  blurredShapeGray,
  blurredShape,
  featuresImage,
} from "@/lib/images";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
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

const floatingVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 14,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const features = [
  {
    icon: (
      <>
        <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
        <path
          fillOpacity=".48"
          d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z"
        />
      </>
    ),
    title: "Application Tracking",
    desc:
      "Track every application from wishlist to offer with clear status updates and a centralized dashboard.",
  },
  {
    icon: (
      <>
        <path fillOpacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
        <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
      </>
    ),
    title: "Interview Pipeline",
    desc:
      "Organize interview rounds, upcoming schedules, and recruiter conversations without losing track.",
  },
  {
    icon: (
      <>
        <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
        <path
          fillOpacity=".48"
          d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z"
        />
      </>
    ),
    title: "Powerful Search",
    desc:
      "Instantly find any application using company names, job titles, locations, or custom tags.",
  },
  {
    icon: (
      <>
        <path
          fillOpacity=".48"
          d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z"
        />
        <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
        <path
          opacity=".48"
          d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z"
        />
        <path d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z" />
      </>
    ),
    title: "Analytics Dashboard",
    desc:
      "Visualize your application success rate, interview performance, and overall job search progress.",
  },
    {
    icon: (
      <>
        <path
          fillOpacity=".48"
          d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
        />
        <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
      </>
    ),
    title: "Custom Organization",
    desc:
      "Create personalized tags, notes, priorities, and workflows that match your own application process.",
  },
  {
    icon: (
      <>
        <path
          fillOpacity=".48"
          d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z"
        />
        <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
      </>
    ),
    title: "Career Timeline",
    desc:
      "View your complete job search history in one timeline, from your first application to your final offer.",
  },
];

export default function Features() {
  const [entered, setEntered] = useState(false);

  return (
    <section className="relative overflow-hidden pb-15">

      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
      >
        <Image
          src={blurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
      >
        <Image
          src={blurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px 0px" }} // ← FIXED
        onAnimationComplete={() => setEntered(true)}
        className="mx-auto max-w-6xl px-4 sm:px-6"
        style={{ willChange: "transform, opacity" }}
      >
        <div>

          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">

            <motion.div
              variants={itemVariants}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="inline-flex items-center gap-3 pb-6 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
                <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                  Everything You Need
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-2 bg-clip-text pb-4 font-snasm text-3xl font-semibold tracking-normal md:text-4xl"
              style={{ willChange: "transform, opacity" }}
            >
              Built for the modern job search
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="pb-6 text-lg text-indigo-200/65"
              style={{ willChange: "transform, opacity" }}
            >
              Manage applications, interviews, offers, and rejections from one
              beautiful dashboard. Stay organized and focus on landing your next
              role.
            </motion.p>

          </div>

          <motion.div
            variants={itemVariants}
            whileHover={entered ? { scale: 1.02 } : undefined}
            transition={{ duration: 0.35 }}
            className="flex justify-center pb-8 md:pb-12"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={featuresImage}
              width={1004}
              height={284}
              alt="Features"
              className="h-auto w-full max-w-[900px]"
            />
          </motion.div>

          <div className="mx-auto grid max-w-xl gap-12 py-8 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {features.map((feature) => (
              <motion.article
                key={feature.title}
                variants={itemVariants}
                whileHover={entered ? {
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 20,
                  },
                } : undefined}
                className="group cursor-default"
                style={{ willChange: "transform, opacity" }}
              >
                <motion.div
                  whileHover={entered ? {
                    scale: 1.12,
                    rotate: 4,
                  } : undefined}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 16,
                  }}
                  className="mb-3 inline-flex"
                >
                  <svg
                    className="fill-indigo-500 transition-colors duration-300 group-hover:fill-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    {feature.icon}
                  </svg>
                </motion.div>

                <h3 className="mb-2 font-nacelle text-[1rem] font-semibold text-gray-200 transition-colors duration-300 group-hover:text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-indigo-200/65 transition-colors duration-300 group-hover:text-indigo-100/80">
                  {feature.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
