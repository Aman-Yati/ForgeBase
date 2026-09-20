import JobList from "@/components/jobs/joblist";
import { api } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";

import type { JobStatus, JobType, Priority, WorkMode } from "@/types/job";

export default async function Jobs({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: JobStatus;
    priority?: Priority;
    jobType?: JobType;
    workMode?: WorkMode;
  }>;
}) {
  const { userId } = await auth();

  if (!userId) return null;

  const params = await searchParams;

  const jobs = await api.getAllJobs({
    status: params.status,
    priority: params.priority,
    jobType: params.jobType,
    workMode: params.workMode,
    search: params.search,
  });

  return <JobList jobs={jobs} />;
}