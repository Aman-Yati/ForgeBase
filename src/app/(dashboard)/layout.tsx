import DashboardNavbar from "@/components/ui/dashboardnav";
import Sidebar from "@/components/ui/sidebar";
import { syncUser } from "@/lib/syncuser";
import { getCurrentUser } from "@/lib/getuser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await syncUser(); // runs once when dashboard layout loads

  const user = await getCurrentUser();

  return (
    <div>
      <Sidebar />
      <DashboardNavbar name={user?.name} />

      <main className="lg:ml-60 pt-16 min-h-screen bg-[#000810] p-6">
        {children}
      </main>
    </div>
  );
}