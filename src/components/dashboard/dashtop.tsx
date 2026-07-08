import DashCard from "./dashcard";
import {
  Eye,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  X,
} from "lucide-react";

interface Props {
  jobs: {
    id: string;
    status: string;
  }[];
}

export default function DashTop({ jobs }: Props) {
  const totalApplications = jobs.length;

  const offers = jobs.filter(
    (job) => job.status === "OFFER"
  ).length;

  const interviews = jobs.filter(
    (job) => job.status === "INTERVIEW"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "REJECTED"
  ).length;

  return (
    <section className="grid gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-4">
      <DashCard
        title="Total Applications"
        value={totalApplications.toString()}
        percentage=""
        icon={BriefcaseBusiness}
        iconBg="bg-emerald-500"
      />

      <DashCard
        title="Total Offers"
        value={offers.toString()}
        percentage=""
        icon={FileText}
        iconBg="bg-violet-500"
      />

      <DashCard
        title="Total Interviews"
        value={interviews.toString()}
        percentage=""
        icon={CalendarDays}
        iconBg="bg-amber-500"
      />

      <DashCard
        title="Rejected"
        value={rejected.toString()}
        percentage=""
        icon={X}
        iconBg="bg-[#f87171]"
        positive={false}
      />
    </section>
  );
}