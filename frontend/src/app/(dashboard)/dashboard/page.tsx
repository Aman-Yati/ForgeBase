import DashTop from "@/components/dashboard/dashtop";
import RecentlyAppliedJobs from "@/components/dashboard/recentjobs";
import AnalysisPieChart from "@/components/dashboard/piechart";
import StatusBarChart from "@/components/dashboard/barchart";
import { api } from "@/lib/api";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) return null;

  const jobs = await api.getJobsByUser(user.id);

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