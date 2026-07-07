import DashTop from "@/components/dashboard/dashtop";
import RecentlyAppliedJobs from "@/components/dashboard/recentjobs";
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
    take: 5,
  });


  return (
    <div>
      <DashTop/>
      <RecentlyAppliedJobs jobs={jobs}/>
    </div>
  );
}