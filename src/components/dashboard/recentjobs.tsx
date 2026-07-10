"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  jobs: {
    id: string;
    company: string;
    role: string;
    location: string | null;
    jobType: string | null;
    status: string;
    appliedDate: Date | null;
  }[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export default function RecentlyAppliedJobs({ jobs }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className=" w-full rounded-2xl border border-white/10 bg-[#010a17] p-4"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white lg:text-3xl">
          Recently Applied
        </h2>

        <p className="mt-1 text-xs text-zinc-500">
          Latest applications
        </p>
      </div>

      <div className="space-y-2">
        {jobs.slice(0, 7).map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
            }}
            className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-indigo-500/50"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-white">
                {job.company}
              </h3>

              <p className="min-w-0 flex-1 truncate text-right text-sm text-zinc-300">
                {job.role}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-zinc-500">
              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {job.location}
                </span>
              )}

              {job.appliedDate && (
                <span className="flex items-center gap-1">
                  <CalendarDays size={11} />
                  {formatDate(job.appliedDate)}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-zinc-500">
          No applications yet
        </div>
      )}
    </motion.div>
  );
}
