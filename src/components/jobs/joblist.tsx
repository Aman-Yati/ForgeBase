import { Job } from "@prisma/client";
import {
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";
import EditOptions from "./editoptions";

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
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#000816]/70 backdrop-blur-xl">
      <div className="overflow-x-auto scrollbar-hidden">
        <table className="min-w-[1150px] w-full text-sm">
          <thead className="border-b border-white/10 bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#111827]">
  <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
    <th className="border-r border-white/10 px-3 py-1">Company</th>
    <th className="border-r border-white/10 px-3 py-1">Role</th>
    <th className="border-r border-white/10 px-3 py-1">Location</th>
    <th className="border-r border-white/10 px-3 py-1">Salary</th>
    <th className="border-r border-white/10 px-3 py-1">Job Type</th>
    <th className="border-r border-white/10 px-3 py-1">Work Mode</th>
    <th className="border-r border-white/10 px-3 py-1">Status</th>
    <th className="border-r border-white/10 px-3 py-1">Priority</th>
    <th className="border-r border-white/10 px-3 py-1">Applied</th>
    <th className="border-r border-white/10 px-3 py-1">Notes</th>
    <th className="px-3 py-1 w-20">Link</th>
  </tr>
</thead>

          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-white/5 transition hover:bg-white/[0.03]"
              >
                {/* Company */}
                <td className="border-r border-white/5 px-2 py-2 font-medium text-zinc-300 whitespace-nowrap">
                  {job.company}
                </td>

                {/* Role */}
                <td className="border-r border-white/5 px-2 py-2 text-zinc-300 whitespace-nowrap">
                  {job.role}
                </td>

                {/* Location */}
                <td className="border-r border-white/5 px-2 py-2 text-zinc-300 whitespace-nowrap">
                  {job.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {job.location}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Salary */}
                <td className="border-r border-white/5 px-2 py-2 whitespace-nowrap text-zinc-300">
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

                {/* Job Type */}
                <td className="border-r border-white/5 px-2 py-2 whitespace-nowrap text-zinc-300">
                  {job.jobType ?? "-"}
                </td>

                {/* Work Mode */}
                <td className="border-r border-white/5 px-2 py-2 whitespace-nowrap text-zinc-300">
                  {job.workMode ?? "-"}
                </td>

                {/* Status */}
                <td className="border-r border-white/5 px-2 py-2 whitespace-nowrap">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusColors[job.status]
                    }`}
                  >
                    {job.status.replace("_", " ")}
                  </span>
                </td>

                {/* Priority */}
                <td
                  className={`border-r border-white/5 px-2 py-2 whitespace-nowrap font-medium ${
                    priorityColors[job.priority]
                  }`}
                >
                  {job.priority}
                </td>

                {/* Applied Date */}
                <td className="border-r border-white/5 px-2 py-2 whitespace-nowrap text-zinc-300">
                  {job.appliedDate ? (
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} />
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Notes */}
                <td className="border-r border-white/5 max-w-xs px-2 py-2 text-sm text-zinc-300">
                  <p className="line-clamp-2">
                    {job.notes || "-"}
                  </p>
                </td>

                {/* Actions */}
                <td className="border-r border-white/5 px-2 py-2">
                  <div className="flex items-center gap-2">
                    {job.jobUrl ? (
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-zinc-300 transition hover:bg-white/5 hover:text-white"
                      >
                        <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="rounded-lg p-2 text-zinc-300 transition hover:bg-white/5 hover:text-white cursor-not-allowed opacity-50">
                        <ExternalLink size={16} />
                      </span>
                    )}
                    <EditOptions job={job} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}