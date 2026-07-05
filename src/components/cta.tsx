import Image from "next/image";
import { blurredShape } from "@/lib/images";

export default function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={blurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/50 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              className=" bg-clip-text pb-8 font-snasm text-3xl font-semibold md:text-4xl"
            >
              ForgeBase — track job applications smarter
            </h2>

            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <a
                  href="#0"
                  className="border border-white/20 px-6 py-3 transition hover:border-white btn group inline-flex h-12 w-[200px] items-center justify-center color-black"
                >
                  <span className="relative inline-flex items-center">
                    Get Started
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}