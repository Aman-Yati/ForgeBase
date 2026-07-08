"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Props {
  jobs: {
    status: string;
  }[];
}

export default function SuccessRate({ jobs }: Props) {
  const total = jobs.length;

  const interviews = jobs.filter(
    (job) => job.status === "INTERVIEW"
  ).length;

  const offers = jobs.filter(
    (job) => job.status === "OFFER"
  ).length;

  const successful = interviews + offers;

  const successRate =
    total === 0
      ? 0
      : Math.round((successful / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-white/10 bg-[#101726] p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/50">
            Success Rate
          </p>

          <h2 className="mt-2 text-5xl font-bold text-white">
            {successRate}%
          </h2>

          <p className="mt-2 text-sm text-white/40">
            Interviews + Offers
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15">
          <TrendingUp className="h-8 w-8 text-emerald-400" />
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${successRate}%` }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="h-full rounded-full bg-emerald-400"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-white/50">
            Successful
          </span>

          <span className="font-semibold text-white">
            {successful} / {total}
          </span>
        </div>
      </div>
    </motion.div>
  );
}