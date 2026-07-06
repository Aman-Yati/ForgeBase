import AddJob from "@/components/jobs/addjob";
import FilterJobs from "./filterjobs";

export default function JobsHeading() {
  return (
    <div className="mb-3 mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">

      {/* Right */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <FilterJobs />
      </div>
      <div>
        <AddJob />
      </div>
    </div>
  );
}