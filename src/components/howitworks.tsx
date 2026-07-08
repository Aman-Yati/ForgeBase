import {
  UserPlus,
  BriefcaseBusiness,
  BarChart3,
  Trophy,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Create Your Workspace",
    description:
      "Sign up in seconds and get your personal dashboard where every job application is organized in one place.",
    icon: UserPlus,
    color: "bg-violet-500",
  },
  {
    id: "02",
    title: "Add Your Applications",
    description:
      "Track every opportunity by saving company details, job roles, application status, interview dates, and notes.",
    icon: BriefcaseBusiness,
    color: "bg-blue-500",
  },
  {
    id: "03",
    title: "Monitor Your Progress",
    description:
      "Visual dashboards help you understand your application pipeline, interview rate, and overall job search performance.",
    icon: BarChart3,
    color: "bg-emerald-500",
  },
  {
    id: "04",
    title: "Land Your Dream Job",
    description:
      "Stay organized, never miss a follow-up, and focus on preparing for interviews instead of managing spreadsheets.",
    icon: Trophy,
    color: "bg-orange-500",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl pb-15 px-6 py-28"
    >
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                How It Works
              </span>
            </div>

            <h2 className="mt-2 bg-clip-text pb-4 font-snasm tracking-normal text-3xl font-semibold md:text-4xl">
          Your job search,
          <span className="text-indigo-500"> simplified.</span>
        </h2>

        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
          ForgeBase keeps everything organized—from applications and interviews
          to offers—so you can spend less time managing spreadsheets and more
          time getting hired.
        </p>
      </div>

      <div className="relative mt-20">

        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center gap-10 lg:flex-row ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full rounded-3xl border border-white/10 bg-[#121826] p-8 backdrop-blur-lg transition duration-300 hover:border-white hover:shadow-xl lg:w-[45%]">
                  <span className="text-sm font-semibold text-indigo-400">
                    STEP {step.id}
                  </span>

                  <h3 className="mt-3 text-3xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-8 text-zinc-400">
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-8 border-[#0B1120] bg-[#121826]">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${step.color}`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="hidden lg:block lg:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}