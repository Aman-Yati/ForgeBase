import Jobsheading from "@/components/jobs/jobsheading";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="">
        <Jobsheading />
        {children}
      </main>
    </div>
  );
}