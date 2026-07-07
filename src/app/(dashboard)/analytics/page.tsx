import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {prisma} from "@/lib/prisma";
import BreakdownCard from "@/components/analysis/breakdowncard";

export default async function Analytics() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const jobs = await prisma.job.findMany({
    where: {
      userId,
    },
    select: {
      workMode: true,
      location: true,
      jobType: true,
    },
  });


const locationMap = new Map<string, number>();

  jobs.forEach((job) => {
    if (!job.location) return;

    locationMap.set(
      job.location,
      (locationMap.get(job.location) ?? 0) + 1
    );
  });

  const topLocationsData = [...locationMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, value]) => ({
      label,
      value,
    }));

  const workModeData = [
    {
      label: "Remote",
      value: jobs.filter((job) => job.workMode === "REMOTE").length,
    },
    {
      label: "Hybrid",
      value: jobs.filter((job) => job.workMode === "HYBRID").length,
    },
    {
      label: "On-site",
      value: jobs.filter((job) => job.workMode === "ONSITE").length,
    },
  ];

  const jobTypeData = [
    {
      label: "Full Time",
      value: jobs.filter((job) => job.jobType === "FULL_TIME").length,
    },
    {
      label: "Part Time",
      value: jobs.filter((job) => job.jobType === "PART_TIME").length,
    },
    {
      label: "Contract",
      value: jobs.filter((job) => job.jobType === "CONTRACT").length,
    },
    {
      label: "Internship",
      value: jobs.filter((job) => job.jobType === "INTERNSHIP").length,
    },
  ];

  return (
    <div className="space-y-6">

      <div className="grid gap-6 lg:grid-cols-4">
        <BreakdownCard
          title="Work Mode"
          subtitle="Distribution of work preferences"
          data={workModeData}
        />

        <BreakdownCard
          title="Job Type"
          subtitle="Distribution of job types"
          data={jobTypeData}
        />

        <BreakdownCard
          title="Top Locations"
          subtitle="Top locations you've applied to"
          data={topLocationsData}
        />
      </div>
    </div>
  );
}