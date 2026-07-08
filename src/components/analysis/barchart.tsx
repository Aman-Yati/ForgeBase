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
    status: string;
  }[];
}

const COLORS = [
  "#DDD6FE", // Lavender
  "#C4B5FD", // Light Violet
  "#A78BFA", // Soft Purple
  "#8B5CF6", // Primary Purple
  "#6D28D9", // Deep Purple // Wishlist
  "#71717a",
];

export default function StatusBarChart({ jobs }: Props) {
  const data = [
    {
      status: "Applied",
      value: jobs.filter((job) => job.status === "APPLIED").length,
    },
    {
      status: "Interview",
      value: jobs.filter((job) => job.status === "INTERVIEW").length,
    },
    {
      status: "Offer",
      value: jobs.filter((job) => job.status === "OFFER").length,
    },
    {
      status: "Rejected",
      value: jobs.filter((job) => job.status === "REJECTED").length,
    },
    {
      status: "Wishlist",
      value: jobs.filter((job) => job.status === "WISHLIST").length,
    },
    {
      status: "Withdrawn",
      value: jobs.filter((job) => job.status === "WITHDRAWN").length,
    },
  ].filter((item) => item.value > 0);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-white/10 bg-[#101726] p-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-white">
          Application Status
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Distribution of your job applications
        </p>
      </div>
<div className="mt-8 h-[360px]">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      data={data}
      margin={{
        top: 30,
        right: 10,
        left: -25,
        bottom: 0,
      }}
    >
      <CartesianGrid
        vertical={false}
        stroke="rgba(255,255,255,.05)"
      />

      <XAxis
        dataKey="status"
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
          background: "#0B1220",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 14,
        }}
        labelStyle={{
          color: "#fff",
        }}
      />

      <Bar
        dataKey="value"
        radius={[10, 10, 0, 0]}
        maxBarSize={55}
        animationDuration={900}
      >
        <LabelList
          dataKey="value"
          position="top"
          fill="#fff"
          fontSize={14}
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

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-lg font-semibold text-white">
          {total} Total Applications
        </p>

        <p className="mt-1 text-sm text-white/40">
          Based on all tracked applications
        </p>
      </div>
    </motion.div>
  );
}