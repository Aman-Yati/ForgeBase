"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";


interface Props {
  jobs: {
    status: string;
  }[];
}

const COLORS = [
  "#DDD6FE",
  "#C4B5FD",
  "#A78BFA",
  "#8B5CF6",
  "#5128d9",
  "#71717a",
];

export default function AnalysisPieChart({ jobs }: Props) {
  const data = [
    {
      name: "Applied",
      value: jobs.filter((job) => job.status === "APPLIED").length,
    },
    {
      name: "Interview",
      value: jobs.filter((job) => job.status === "INTERVIEW").length,
    },
    {
      name: "Offer",
      value: jobs.filter((job) => job.status === "OFFER").length,
    },
    {
      name: "Rejected",
      value: jobs.filter((job) => job.status === "REJECTED").length,
    },
    {
      name: "Wishlist",
      value: jobs.filter((job) => job.status === "WISHLIST").length,
    },
    {
      name: "Withdrawn",
      value: jobs.filter((job) => job.status === "WITHDRAWN").length,
    },
  ].filter((item) => item.value > 0);
const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full rounded-2xl border border-white/10 bg-[#101726] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <div>
        <h2 className="text-3xl font-bold text-white">
          Application Status
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Track where your applications stand
        </p>
      </div>

      <div className="my-8 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,10,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                backdropFilter: "blur(12px)",
              }}
              itemStyle={{
                color: "#fff",
              }}
            />

<Pie
  data={data}
  dataKey="value"
  nameKey="name"
  innerRadius={90}
  outerRadius={130}
  paddingAngle={4}
  stroke="none"
  onMouseEnter={(_, index) => setActiveIndex(index)}
  onMouseLeave={() => setActiveIndex(null)}
  shape={(props) => {
    const { index, outerRadius } = props;

    return (
      <Sector
        {...props}
        outerRadius={
          activeIndex === index ? outerRadius + 10 : outerRadius
        }
      />
    );
  }}
>
  {data.map((item, index) => (
    <Cell
      key={item.name}
      fill={COLORS[index]}
    />
  ))}
</Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3 transition hover:border-white/40"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-sm text-white/60">
                {item.name}
              </span>
            </div>

            <span className="text-sm font-semibold text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-white/10 py-8 text-center text-sm text-white/40">
          No application data available
        </div>
      )}
    </motion.div>
  );
}