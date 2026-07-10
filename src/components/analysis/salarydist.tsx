"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

interface Props {
  jobs: {
    salaryMin: number | null;
    salaryMax: number | null;
  }[];
}

const COLORS = [
  "#DDD6FE",
  "#C4B5FD",
  "#A78BFA",
  "#8B5CF6",
  "#5834ce",
];

export default function SalaryDistribution({
  jobs,
}: Props) {
  const ranges = [
    {
      label: "<5L",
      min: 0,
      max: 500000,
    },
    {
      label: "5-10L",
      min: 500000,
      max: 1000000,
    },
    {
      label: "10-20L",
      min: 1000000,
      max: 2000000,
    },
    {
      label: "20-40L",
      min: 2000000,
      max: 4000000,
    },
    {
      label: "40L+",
      min: 4000000,
      max: Infinity,
    },
  ];

  const data = ranges.map((range) => ({
    range: range.label,
    jobs: jobs.filter((job) => {
      const salary = job.salaryMax ?? job.salaryMin;

      if (!salary) return false;

      return salary >= range.min && salary < range.max;
    }).length,
  }));

  const total = data.reduce((sum, item) => sum + item.jobs, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-white/10 bg-[#010a17] p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Salary Distribution
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Expected salary ranges across applications
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Jobs
          </p>

          <p className="mt-1 text-2xl font-bold text-white">
            {total}
          </p>
        </div>
      </div>

      <div className="mt-6 h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 25,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,.05)"
            />

            <XAxis
              dataKey="range"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#A1A1AA",
                fontSize: 13,
              }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#71717A",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(255,255,255,.03)",
              }}
              contentStyle={{
                background: "#010a17",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 14,
              }}
              labelStyle={{
                color: "#fff",
              }}
            />

            <Bar
              dataKey="jobs"
              radius={[10, 10, 0, 0]}
              maxBarSize={52}
              animationDuration={900}
            >
              <LabelList
                dataKey="jobs"
                position="top"
                fill="#fff"
                fontSize={13}
                fontWeight={600}
              />

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 md:grid-cols-5">
        {data.map((item, index) => (
          <div
            key={item.range}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <div
              className="mb-2 h-2 w-10 rounded-full"
              style={{
                backgroundColor: COLORS[index],
              }}
            />

            <p className="text-xs text-zinc-500">
              {item.range}
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {item.jobs}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
