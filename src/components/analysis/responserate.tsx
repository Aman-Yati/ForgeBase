"use client";

import { motion } from "framer-motion";
import { MessageCircleReply } from "lucide-react";

interface Props {
  jobs: {
    status: string;
  }[];
}

export default function ResponseRate({ jobs }: Props) {
  const total = jobs.length;

  const responded = jobs.filter((job) =>
    ["INTERVIEW", "OFFER", "REJECTED"].includes(job.status)
  ).length;

  const responseRate =
    total === 0
      ? 0
      : Math.round((responded / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-white/10 bg-[#000816] mt-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            Response Rate
          </p>

          <h2 className="mt-2 text-5xl font-bold text-white">
            {responseRate}%
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Companies that responded
          </p>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
          <MessageCircleReply className="h-8 w-8 text-indigo-400" />
        </div>
      </div>

      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${responseRate}%` }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            className="h-full rounded-full bg-[#615fff]"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-zinc-500">
            Responses
          </span>

          <span className="font-semibold text-white">
            {responded} / {total}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
