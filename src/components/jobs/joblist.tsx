"use client";

import { Job } from "@prisma/client";
import {
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";
import EditOptions from "./editoptions";
import { motion } from "framer-motion";

interface JobListProps {
  jobs: Job[];
}

const statusColors = {
  WISHLIST: "bg-zinc-500/15 text-zinc-300",
  APPLIED: "bg-blue-500/15 text-blue-300",
  INTERVIEW: "bg-yellow-500/15 text-yellow-300",
  OFFER: "bg-emerald-500/15 text-emerald-300",
  REJECTED: "bg-red-500/15 text-red-300",
  WITHDRAWN: "bg-zinc-700/20 text-zinc-400",
};

const priorityColors = {
  LOW: "text-emerald-400",
  MEDIUM: "text-amber-400",
  HIGH: "text-red-400",
};

export default function JobList({ jobs }: JobListProps) {
  if (!jobs.length) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0B1220] px-8 py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10">
          <span className="text-4xl">💼</span>
        </div>

        <h2 className="text-3xl font-semibold text-white">
          No applications found
        </h2>

        <p className="mt-3 max-w-lg text-zinc-400">
          Keep all your job applications in one place. Track interviews,
          offers, deadlines, and notes effortlessly.
        </p>
      </div>
    );
  }

  console.log("Jobs received:", jobs);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="overflow-hidden rounded-xl border border-white/10 bg-[#000816]/70 backdrop-blur-xl"
    >
      <div className="overflow-x-auto scrollbar-hidden">
        <table className="min-w-[1150px] w-full text-sm">
          <thead className="border-b border-white/10 bg-[#101726]">
            <tr className="text-left text-[13px] font-medium uppercase text-zinc-400">
              <th className="border-r border-white/10 px-3 py-2">Company</th>
              <th className="border-r border-white/10 px-3 py-2">Role</th>
              <th className="border-r border-white/10 px-3 py-2">Location</th>
              <th className="border-r border-white/10 px-3 py-2">Salary</th>
              <th className="border-r border-white/10 px-3 py-2">Type</th>
              <th className="border-r border-white/10 px-3 py-2">Mode</th>
              <th className="border-r border-white/10 px-3 py-2">Status</th>
              <th className="border-r border-white/10 px-3 py-2">Priority</th>
              <th className="border-r border-white/10 px-3 py-2">Applied</th>
              <th className="border-r border-white/10 px-3 py-2">Notes</th>
              <th className="w-20 px-3 py-2">Link</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="group h-16 align-middle transition-all duration-200 hover:bg-indigo-500/5 hover:shadow-[inset_3px_0_0_0_rgb(99_102_241)]"
              >
                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle font-medium text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.company}
                </td>

                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.role}
                </td>

                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.salaryMin || job.salaryMax ? (
                    <>
                      ₹{job.salaryMin?.toLocaleString() ?? "-"}
                      {job.salaryMax &&
                        ` - ₹${job.salaryMax.toLocaleString()}`}
                    </>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="h-16 border-r capitalize border-white/5 whitespace-nowrap px-2 py-2 align-middle text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.jobType?.toLowerCase().replaceAll("_", " ") ?? "-"}
                </td>

                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle capitalize text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.workMode?.toLowerCase() ?? "-"}
                </td>

                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 group-hover:scale-105 ${statusColors[job.status]}`}
                  >
                    {job.status.replace("_", " ")}
                  </span>
                </td>

                <td
                  className={`h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle font-medium transition-all duration-200 ${priorityColors[job.priority]}`}
                >
                  {job.priority}
                </td>

                <td className="h-16 border-r border-white/5 whitespace-nowrap px-2 py-2 align-middle text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  {job.appliedDate ? (
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="h-16 max-w-xs border-r border-white/5 px-2 py-2 align-middle text-sm text-zinc-300 transition-colors duration-200 group-hover:text-white">
                  <p className="line-clamp-1">{job.notes || "-"}</p>
                </td>

                <td className="h-16 border-r border-white/5 px-2 py-2 align-middle">
                  <div className="flex items-center gap-2">
                    {job.jobUrl ? (
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-300 transition-all duration-200 hover:scale-110 hover:bg-indigo-500/10 hover:text-indigo-300"
                      >
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="cursor-not-allowed rounded-lg p-2 text-zinc-500 opacity-50">
                        <ExternalLink size={16} />
                      </span>
                    )}

                    <div className="transition-transform duration-200 ">
                      <EditOptions job={job} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
