"use client";

import {
  CalendarDays,
  MapPin,
} from "lucide-react";
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

export default function RecentlyAppliedJobs({
  jobs,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-90 min-w-60 rounded-2xl my-6 border border-white/10 bg-[#101726] p-4"
    >

      <div className="mb-4">
        <h2 className="font-bold text-lg text-white">
          Recently Applied
        </h2>

        <p className="mt-1 text-xs text-white/50">
          Latest applications
        </p>
      </div>


      <div className="space-y-2">
        {jobs.slice(0, 5).map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: index * 0.06,
            }}
            className="px-4 py-3 hover:border-white/40 rounded-xl border border-white/10 bg-black/20 transition">

            <div className="flex items-center justify-between gap-4">

              {/* Company */}
              <h3 className="truncate text-sm font-medium text-white">
                {job.company}
              </h3>


              {/* Role */}
              <p className="truncate text-sm text-white">
                {job.role}
              </p>

            </div>


            <div className="mt-2 flex items-center gap-4 text-[11px] text-white/40">

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
        <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-white/40">
          No applications yet
        </div>
      )}

    </motion.div>
  );
}