"use client";

import { motion } from "framer-motion";

interface BreakdownItem {
  label: string;
  value: number;
}

interface BreakdownCardProps {
  title: string;
  subtitle?: string;
  data: BreakdownItem[];
}

export default function BreakdownCard({
  title,
  subtitle,
  data,
}: BreakdownCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl max-w-100 mt-6 border border-white/10 bg-[#101726]/70 p-6 backdrop-blur-xl"
    >
      <div className="mb-6">
        <h2 className="font-bold text-xl text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm text-white/40">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {data.map((item, index) => {
          const percentage =
            total === 0 ? 0 : (item.value / total) * 100;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-white/80">
                  {item.label}
                </span>

                <span className="text-sm font-medium text-white">
                  {item.value}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-white/80"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {total === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 py-10 text-center text-sm text-white/40">
          No data available
        </div>
      )}
    </motion.div>
  );
}