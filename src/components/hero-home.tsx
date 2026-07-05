import Image from "next/image";
import { headerImage } from "@/lib/images";
export default function HeroHome() {
  return (
    <section className=" pb-20 pt-20 lg:pt-20 text-white">
      <div className="mx-auto w-full max-w-[90rem] px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 ">

          {/* LEFT: Massive Typography */}
          <div>
            <h1 className="font-snasm pl-0 lg:pl-4 tracking-tight uppercase leading-[0.78] tracking-[-0.08em] text-[clamp(5rem,20vw,14rem)]">
              <span>FORGE</span><br/>
              <span>BASE</span>
              
            </h1>
          </div>

          {/* RIGHT: Minimal description */}
          <div className="w-full max-w-md lg:ml-auto mt-10 lg:mt-45 mr-0 lg:mr-4">

            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
              ✦
            </div>

            <h2 className="mb-4 font-snasm text-3xl uppercase leading-tight">
              ORGANIZE YOUR JOB SEARCH
            </h2>

            <p className="mb-8 text-white/55 leading-8">
              Track applications, interviews, offers, and rejections from one
              clean dashboard. Stay organized and focus on landing your next
              opportunity.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="border border-white/20 px-6 py-3 transition hover:border-white"
              >
                Start Tracking
              </a>
            </div>
          </div>
        </div>
      </div>
<div className="mt-16 flex justify-center px-6">
  <div className="relative w-full max-w-7xl">
    <Image
      src={headerImage}
      width={1104}
      height={384}
      alt="Home Illustration"
      className="h-auto w-full rounded-2xl"
      priority
    />
  </div>
</div>
    </section>
  );
}