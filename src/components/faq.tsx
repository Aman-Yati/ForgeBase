"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const faqs = [
  {
    question: "What is ForgeBase?",
    answer:
      "ForgeBase is a modern job application tracker that helps you organize your job search in one place. Track applications, monitor interview progress, analyze your job hunt, and stay organized with an intuitive dashboard.",
  },
  {
    question: "What can I track in ForgeBase?",
    answer:
      "You can manage job applications from wishlist to offer, store company details, roles, salaries, application dates, job links, and personal notes—all in one centralized workspace.",
  },
  {
    question: "How does the analytics dashboard help?",
    answer:
      "The dashboard provides visual insights into your job search, including application status distribution and recent activity, helping you understand your progress at a glance.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Every account has its own secure workspace. Your job applications and personal information are accessible only to you through authenticated access.",
  },
  {
    question: "Can I access ForgeBase on mobile?",
    answer:
      "Absolutely. ForgeBase is fully responsive and works seamlessly across desktops, tablets, and smartphones, so you can manage your applications anywhere.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. ForgeBase runs entirely in your browser. Simply sign in and start tracking your job applications without installing any software.",
  },
];

/* ── Framer Motion Variants ── */

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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* ── Header with staggered entrance ── */}
        <motion.div
          className="mx-auto max-w-3xl pb-4 text-center md:pb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px 0px" }} 
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center gap-3 pb-6 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50"
            style={{ willChange: "transform, opacity" }}
          >
            <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="mt-2 bg-clip-text pb-4 font-snasm tracking-normal text-3xl font-semibold md:text-4xl"
            style={{ willChange: "transform, opacity" }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="mx-auto max-w-2xl text-lg text-zinc-400"
            style={{ willChange: "transform, opacity" }}
          >
            Everything you need to know about ForgeBase.
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                layout
                transition={{ duration: 0.25 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-white/[0.02]"
                >
                  <span className="text-base font-semibold text-white md:text-lg">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-zinc-400" size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-white/10 px-6 py-5">
                        <p className="leading-7 text-white-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
