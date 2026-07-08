"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  jobs: {
    createdAt: Date;
  }[];
}

export default function ApplicationTrend({ jobs }: Props) {
  const [range, setRange] = useState<"week" | "month">("week");

  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - i));

      const count = jobs.filter((job) => {
        const d = new Date(job.createdAt);
        d.setHours(0, 0, 0, 0);

        return d.getTime() === date.getTime();
      }).length;

      return {
        label: days[date.getDay()],
        applications: count,
      };
    });
  }, [jobs]);

  const monthlyData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (29 - i));

      const count = jobs.filter((job) => {
        const d = new Date(job.createdAt);
        d.setHours(0, 0, 0, 0);

        return d.getTime() === date.getTime();
      }).length;

      return {
        label: date.getDate().toString(),
        applications: count,
      };
    });
  }, [jobs]);

  const data = range === "week" ? weeklyData : monthlyData;

  const totalApplications = data.reduce(
    (sum, item) => sum + item.applications,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-white/10 bg-[#101726] p-6 mt-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Applications Over Time
          </h2>

          <p className="mt-1 text-sm text-white/45">
            Track your application activity over time
          </p>
        </div>

        <div className="flex rounded-xl border border-white/10 bg-black/20 p-1">
          <button
            onClick={() => setRange("week")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              range === "week"
                ? "bg-violet-500 text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            Week
          </button>

          <button
            onClick={() => setRange("month")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              range === "month"
                ? "bg-violet-500 text-white"
                : "text-white/55 hover:text-white"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="mt-8 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              stroke="#71717a"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#8b5cf6",
                strokeOpacity: 0.3,
              }}
              contentStyle={{
                background: "#101726",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="applications"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/40">
            Applications
          </p>

          <p className="mt-1 text-3xl font-bold text-white">
            {totalApplications}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-white/40">
            Period
          </p>

          <p className="mt-1 text-lg font-semibold text-violet-400">
            {range === "week" ? "Last 7 Days" : "Last 30 Days"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}