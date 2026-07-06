import DashCard from "./dashcard";

import {
  Eye,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
} from "lucide-react";

export default function DashTop() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 pt-6">
      <DashCard
        title="Total Views"
        value="3.5K"
        percentage="0.43%"
        icon={Eye}
        iconBg="bg-emerald-500"
      />

      <DashCard
        title="Applications"
        value="248"
        percentage="12.6%"
        icon={BriefcaseBusiness}
        iconBg="bg-violet-500"
      />

      <DashCard
        title="Interviews"
        value="18"
        percentage="4.3%"
        icon={CalendarDays}
        iconBg="bg-amber-500"
      />

      <DashCard
        title="Resumes"
        value="32"
        percentage="1.2%"
        icon={FileText}
        iconBg="bg-sky-500"
        positive={false}
      />
    </section>
  );
}