import DashTop from "@/components/dashboard/dashtop";
import RecentlyAppliedJobs from "@/components/dashboard/recentjobs";
import AnalysisPieChart from "@/components/dashboard/piechart";
import StatusBarChart from "@/components/analysis/barchart";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
// intentionally throw for testing

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
  });


  return (
    <div className="space-y-6">
      <DashTop jobs={jobs} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-8">
          <AnalysisPieChart jobs={jobs} />
          <StatusBarChart jobs={jobs} />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <RecentlyAppliedJobs jobs={jobs.slice(0, 7)} />
        </div>
      </div>
    </div>
  );
}