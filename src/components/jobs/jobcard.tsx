import { Job } from "@prisma/client";
import {
  Building2,
  CalendarDays,
  ExternalLink,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

interface JobCardProps {
  job: Job;
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
  LOW: "bg-emerald-500/15 text-emerald-300",
  MEDIUM: "bg-amber-500/15 text-amber-300",
  HIGH: "bg-red-500/15 text-red-300",
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0B1220]/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{job.role}</h3>

          <div className="mt-2 flex items-center gap-2 text-zinc-400">
            <Building2 size={16} />
            <span>{job.company}</span>
          </div>
        </div>

        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 space-y-3 text-sm text-zinc-400">
        {job.location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={16} />

          <span>
            {job.jobType ?? "—"} • {job.workMode ?? "—"}
          </span>
        </div>

        {job.appliedDate && (
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />

            <span>
              {new Date(job.appliedDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Salary */}
      {(job.salaryMin || job.salaryMax) && (
        <div className="mt-6 text-lg font-semibold text-white">
          ₹{job.salaryMin?.toLocaleString() ?? "—"}

          {job.salaryMax &&
            ` - ₹${job.salaryMax.toLocaleString()}`}
        </div>
      )}
      {/* Notes */}
      {job.notes && (
        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Notes
          </p>

          <p className="line-clamp-3 text-sm leading-6 text-zinc-300">
            {job.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[job.status]
          }`}
        >
          {job.status.replace("_", " ")}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            priorityColors[job.priority]
          }`}
        >
          {job.priority} Priority
        </span>
      </div>
    </div>
  );
}