import DashTop from "@/components/dashboard/dashtop";
import RecentlyAppliedJobs from "@/components/dashboard/recentjobs";
import AnalysisPieChart from "@/components/analysis/piechart";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) return null;

  const jobs = await prisma.job.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return (
    <div className="space-y-6">
      <DashTop />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AnalysisPieChart />

        <RecentlyAppliedJobs jobs={jobs} />
      </div>
    </div>
  );
}