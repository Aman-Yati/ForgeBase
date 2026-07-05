"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is ForgeBase?",
    answer:
      "ForgeBase is a modern job application tracker that helps you organize applications, monitor interview progress, save opportunities, and gain insights into your job search—all from one dashboard.",
  },
  {
    question: "Can I track multiple job applications?",
    answer:
      "Yes. Add as many applications as you want and keep track of their status, company, role, interview dates, notes, and more.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. ForgeBase uses secure authentication and your data is stored safely in your own account. Only you can access your information.",
  },
  {
    question: "Can I upload my resume?",
    answer:
      "Yes. Upload your resume in PDF format and access it anytime directly from your dashboard.",
  },
  {
    question: "Does ForgeBase support mobile devices?",
    answer:
      "Yes. ForgeBase is fully responsive, providing a seamless experience across desktops, tablets, and smartphones.",
  },
  {
    question: "Is ForgeBase free to use?",
    answer:
      "Yes. The core features are completely free, with additional premium features planned for future releases.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                FAQ
              </span>
            </div>
            <h2 className="mt-2 bg-clip-text pb-4 font-snasm tracking-normal text-3xl font-semibold md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            Everything you need to know about ForgeBase.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                layout
                transition={{ duration: 0.25 }}
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