import JobList from "@/components/jobs/joblist";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  ApplicationStatus,
  JobType,
  Priority,
  Prisma,
  WorkMode,
} from "@prisma/client";

export default async function Jobs({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: ApplicationStatus;
    priority?: Priority;
    jobType?: JobType;
    workMode?: WorkMode;
  }>;
}) {
  const { userId } = await auth();

  if (!userId) return null;

  const params = await searchParams;

  const where: Prisma.JobWhereInput = {
    userId,
  };

  if (params.search) {
    where.OR = [
      {
        company: {
          contains: params.search,
          mode: "insensitive",
        },
      },
      {
        role: {
          contains: params.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (params.status) where.status = params.status;

  if (params.priority) where.priority = params.priority;

  if (params.jobType) where.jobType = params.jobType;

  if (params.workMode) where.workMode = params.workMode;

  const jobs = await prisma.job.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });

  return <JobList jobs={jobs} />;
}