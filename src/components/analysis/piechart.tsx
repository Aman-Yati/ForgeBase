"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";

const data = [
  {
    name: "Applied",
    value: 18,
  },
  {
    name: "Interview",
    value: 6,
  },
  {
    name: "Offer",
    value: 2,
  },
  {
    name: "Rejected",
    value: 9,
  },
  {
    name: "Ghosted",
    value: 5,
  },
];

const COLORS = [
  "#a855f7", // purple
  "#60a5fa", // blue
  "#4ade80", // green
  "#f87171", // red
  "#71717a", // gray
];

export default function AnalysisPieChart() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl border border-white/10 bg-[#101726] backdrop-blur-xl p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] max-w-151">
      <div>
        <h2 className="font-bold text-3xl text-white">
          Application Status
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Track where your applications stand
        </p>
      </div>


      <div className="my-8 h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Tooltip
              contentStyle={{
                background: "rgba(10,10,10,0.9)",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
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
              outerRadius={125}
              paddingAngle={4}
              stroke="none"
              animationDuration={900}
            >
              {data.map((item,index)=>(
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
        {data.map((item,index)=>(
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3 hover:border-white/40">

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

    </motion.div>
  );
}