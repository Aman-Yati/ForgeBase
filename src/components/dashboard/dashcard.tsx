import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

interface DashCardProps {
  title: string;
  value: string;
  percentage: string;
  icon: LucideIcon;
  iconBg?: string;
  positive?: boolean;
}

export default function DashCard({
  title,
  value,
  percentage,
  icon: Icon,
  iconBg = "bg-emerald-500",
  positive = true,
}: DashCardProps) {
  return (
    
    <div className="w-full rounded-2xl mb-0 bg-[#000816] p-6 shadow-lg transition-all duration-300 border border-white/10">
      <div
        className={`flex h-12 w-16 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>

      <h2 className="mt-8 text-4xl font-bold tracking-tight text-white">
        {value}
      </h2>

      <div className="mt-1 flex items-end justify-between">
        <p className="text-base text-zinc-500">{title}</p>

        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            positive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {percentage}
          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
        </div>
      </div>
    </div>
  );
}
