import { Building2, CalendarDays, ExternalLink, MapPin } from "lucide-react";

type JobCardProps = {
  company: string;
  role: string;
  status: string;
  priority: string;
  location: string | null;
  appliedDate: Date | string | null;
};

export default function JobCard({
  company,
  role,
  status,
  priority,
  location,
  appliedDate,
}: JobCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1220]/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{role}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
            <Building2 size={16} />
            <span>{company}</span>
          </div>
        </div>

        <button className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white">
          <ExternalLink size={18} />
        </button>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3 text-sm text-zinc-400">
        {location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        )}

        {appliedDate && (
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>Applied {new Date(appliedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-300">
          {status}
        </span>

        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
          {priority} Priority
        </span>
      </div>
    </div>
  );
}