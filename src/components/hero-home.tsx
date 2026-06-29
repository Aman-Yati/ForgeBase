export default function HeroHome() {
  return (
    <section className="min-h-screen flex items-center text-white">
      <div className="mx-auto w-full max-w-7xl px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT: Massive Typography */}
          <div className="leading-[0.85]">
            <h1 className="text-[clamp(15rem,10vw,10rem)] font-bold tracking-tight">
              JOB
              <br />
              HIVE
            </h1>

            <p className="mt-6 text-white/40 text-sm tracking-wide">
              JOB APPLICATION TRACKER
            </p>
          </div>

          {/* RIGHT: Minimal description */}
          <div className="md:pl-10">
            <div className="mb-6 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
              ✦
            </div>

            <h2 className="text-lg font-medium mb-4">
              UI VISUAL SYSTEM FOR JOB SEEKERS
            </h2>

            <p className="text-white/50 leading-relaxed mb-8">
              Track applications, interviews, and outcomes in one minimal system.
              Built for clarity, not complexity.
            </p>

            {/* CTA (very minimal like portfolio sites) */}
            <div className="flex gap-4">
              <a
                href="#"
                className="px-5 py-2 border border-white/20 hover:border-white/60 transition"
              >
                Join
              </a>

              <a
                href="#"
                className="px-5 py-2 text-white/50 hover:text-white transition"
              >
                View Dashboard
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}