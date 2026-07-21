"use client";

import { useEffect, useLayoutEffect, useRef, useCallback, useState } from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  UserPlus,
  BriefcaseBusiness,
  BarChart3,
  Trophy,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Create Your Workspace",
    description:
      "Sign up in seconds and get your personal dashboard where every job application is organized in one place.",
    icon: UserPlus,
    color: "bg-violet-500",
  },
  {
    id: "02",
    title: "Add Your Applications",
    description:
      "Track every opportunity by saving company details, job roles, application status, interview dates, and notes.",
    icon: BriefcaseBusiness,
    color: "bg-blue-500",
  },
  {
    id: "03",
    title: "Monitor Your Progress",
    description:
      "Visual dashboards help you understand your application pipeline, interview rate, and overall job search performance.",
    icon: BarChart3,
    color: "bg-emerald-500",
  },
  {
    id: "04",
    title: "Land Your Dream Job",
    description:
      "Stay organized, never miss a follow-up, and focus on preparing for interviews instead of managing spreadsheets.",
    icon: Trophy,
    color: "bg-orange-500",
  },
];

type ConnectorRect = { left: number; width: number };
type TrunkRect = { top: number; height: number };

const TRUNK_EXTENSION = 64;

/* ── Framer Motion Variants (header only) ── */

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
    // ❌ filter: "blur(4px)" removed
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

export default function HowItWorks() {
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const topStubFillRef = useRef<HTMLDivElement | null>(null);
  const bottomStubFillRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [connectorRects, setConnectorRects] = useState<ConnectorRect[]>(
    steps.map(() => ({ left: 0, width: 0 }))
  );
  const [trunkRect, setTrunkRect] = useState<TrunkRect>({ top: 0, height: 0 });
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const nextConnectors = steps.map((_, index) => {
      const card = cardRefs.current[index];
      const circle = circleRefs.current[index];
      if (!card || !circle) return { left: 0, width: 0 };

      const cardLeft = card.offsetLeft;
      const cardRight = cardLeft + card.offsetWidth;
      const circleLeft = circle.offsetLeft;
      const circleRight = circleLeft + circle.offsetWidth;

      if (cardLeft < circleLeft) {
        return { left: cardRight, width: Math.max(circleLeft - cardRight, 0) };
      }
      return { left: circleRight, width: Math.max(cardLeft - circleRight, 0) };
    });
    setConnectorRects(nextConnectors);

    const centers = steps.map((_, index) => {
      const row = rowRefs.current[index];
      const circle = circleRefs.current[index];
      if (!row || !circle) return 0;
      return row.offsetTop + circle.offsetTop + circle.offsetHeight / 2;
    });
    const first = centers[0] ?? 0;
    const last = centers[centers.length - 1] ?? 0;
    setTrunkRect({
      top: first - TRUNK_EXTENSION,
      height: Math.max(last - first, 0) + TRUNK_EXTENSION * 2,
    });
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    measure();

    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measure())
        : null;
    if (resizeObserver && trackWrapperRef.current) {
      resizeObserver.observe(trackWrapperRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [measure]);

  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    const wrapper = trackWrapperRef.current;
    const fill = lineFillRef.current;
    const topStub = topStubFillRef.current;
    const bottomStub = bottomStubFillRef.current;
    const firstCircle = circleRefs.current[0];
    const lastCircle = circleRefs.current[circleRefs.current.length - 1];
    if (!wrapper || !fill || !topStub || !bottomStub || !firstCircle || !lastCircle) return;

    const ctx = gsap.context(() => {
      const coreHeight = Math.max(trunkRect.height - TRUNK_EXTENSION * 2, 0);

      gsap.set(fill, { height: 0 });
      gsap.to(fill, {
        height: coreHeight,
        ease: "none",
        scrollTrigger: {
          trigger: firstCircle,
          start: "top 35%",
          endTrigger: lastCircle,
          end: "top 35%",
          scrub: true,
        },
      });

      gsap.set(topStub, { height: 0 });
      gsap.to(topStub, {
        height: TRUNK_EXTENSION,
        ease: "none",
        scrollTrigger: {
          trigger: firstCircle,
          start: "top 35%",
          end: "top 30%",
          scrub: true,
        },
      });

      gsap.set(bottomStub, { height: 0 });
      gsap.to(bottomStub, {
        height: TRUNK_EXTENSION,
        ease: "none",
        scrollTrigger: {
          trigger: lastCircle,
          start: "top 35%",
          end: "top 25%",
          scrub: true,
        },
      });

      circleRefs.current.forEach((circle, index) => {
        if (!circle) return;

        const icon = circle.querySelector<HTMLDivElement>("[data-icon-wrap]");
        const rowLine = rowLineRefs.current[index];
        const card = cardRefs.current[index];

        const scrubTrigger = {
          trigger: circle,
          start: "top 35%",
          end: "top 30%",
          scrub: true,
        };

        if (icon) {
          gsap.set(icon, { scale: 0.95, opacity: 0.8 });
          gsap.to(icon, {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: scrubTrigger,
          });
        }

        gsap.set(circle, { boxShadow: "0 0 0 0 rgba(255,255,255,0)" });
        gsap.to(circle, {
          boxShadow:
            "0 0 0 2px rgba(255,255,255,0.8), 0 0 12px 4px rgba(255,255,255,0.25)",
          ease: "none",
          scrollTrigger: scrubTrigger,
        });

        if (rowLine) {
          gsap.set(rowLine, { backgroundColor: "rgba(255,255,255,0.1)" });
          gsap.to(rowLine, {
            backgroundColor: "rgba(255,255,255,0.9)",
            ease: "none",
            scrollTrigger: scrubTrigger,
          });
        }

        if (card) {
          gsap.set(card, {
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "0 0 0 0 transparent",
          });
          gsap.to(card, {
            borderColor: "rgba(255,255,255,1)",
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
            ease: "none",
            scrollTrigger: scrubTrigger,
          });
        }
      });
    }, wrapper);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, [connectorRects, trunkRect]);

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl pb-15 px-6 py-28">
      {/* ── Header: Framer Motion staggered entrance ── */}
      <motion.div
        className="mx-auto max-w-3xl pb-4 text-center md:pb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px 0px" }} 
        style={{ willChange: "transform, opacity" }} // ✅ Fix #2
      >
        <motion.div
          variants={headerVariants}
          className="inline-flex items-center gap-3 pb-6 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50"
          style={{ willChange: "transform, opacity" }}
        >
          <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
            How It Works
          </span>
        </motion.div>

        <motion.h2
          variants={headerVariants}
          className="mt-2 bg-clip-text pb-4 font-snasm tracking-normal text-3xl font-semibold md:text-4xl"
          style={{ willChange: "transform, opacity" }}
        >
          Your job search,
          <span className="text-indigo-500"> simplified.</span>
        </motion.h2>

        <motion.p
          variants={headerVariants}
          className="mx-auto max-w-2xl text-lg text-zinc-400"
          style={{ willChange: "transform, opacity" }}
        >
          ForgeBase keeps everything organized—from applications and interviews
          to offers—so you can spend less time managing spreadsheets and more
          time getting hired.
        </motion.p>
      </motion.div>

      <div ref={trackWrapperRef} className="relative mt-20">
        {/* Vertical trunk line */}
        <div
          className="pointer-events-none absolute left-1/2 hidden w-2 -translate-x-1/2 bg-white/10 opacity-0 transition-opacity duration-500 ease-out lg:block"
          style={{
            top: trunkRect.top,
            height: trunkRect.height,
            opacity: ready ? 1 : 0,
          }}
        >
          <div
            ref={topStubFillRef}
            className="absolute left-0 top-0 w-full bg-white"
          />
          <div
            ref={lineFillRef}
            className="absolute left-0 w-full bg-white"
            style={{ top: TRUNK_EXTENSION }}
          />
          <div
            ref={bottomStubFillRef}
            className="absolute left-0 w-full bg-white"
            style={{
              top: Math.max(trunkRect.height - TRUNK_EXTENSION, 0),
            }}
          />
        </div>

        {/* ── Steps: Pure GSAP (no Framer Motion) ── */}
        <div className="space-y-40">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const rect = connectorRects[index];

            return (
              <div
                key={step.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className={`relative flex flex-col items-center gap-10 lg:flex-row ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Horizontal connector */}
                <div
                  ref={(el) => {
                    rowLineRefs.current[index] = el;
                  }}
                  className="pointer-events-none absolute top-1/2 z-0 hidden h-2 -translate-y-1/2 bg-white/10 opacity-0 transition-opacity duration-500 ease-out lg:block"
                  style={{
                    left: rect.left,
                    width: rect.width,
                    opacity: ready ? 1 : 0,
                  }}
                />

                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="relative z-[1] w-full rounded-3xl border border-white/10 bg-[#121826] p-8 backdrop-blur-lg transition duration-300 hover:border-white hover:shadow-xl lg:w-[45%]"
                >
                  <span className="text-sm font-semibold text-indigo-400">
                    STEP {step.id}
                  </span>

                  <h3 className="mt-3 text-3xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-8 text-zinc-400">
                    {step.description}
                  </p>
                </div>

                <div
                  ref={(el) => {
                    circleRefs.current[index] = el;
                  }}
                  className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-8 border-[#0B1120] bg-[#121826]"
                >
                  <div
                    data-icon-wrap
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${step.color} opacity-80`}
                    style={{ transform: "scale(0.95)" }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="relative z-[1] hidden lg:block lg:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
