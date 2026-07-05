import DashboardNavbar from "@/components/ui/dashboardnav";
import Sidebar from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/getuser";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div>
      <Sidebar />
      <DashboardNavbar name={user?.name} />
      <main className="lg:ml-72 pt-16 min-h-screen bg-[#000810] p-6">
        {children}
      </main>
    </div>
  );
}