"use client";

import { motion } from "framer-motion";
import AddJob from "@/components/jobs/addjob";
import FilterJobs from "./filterjobs";

export default function JobsHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-3 mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between"
    >
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col gap-5 sm:flex-row sm:items-center"
      >
        <FilterJobs />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AddJob />
      </motion.div>
    </motion.div>
  );
}