import Image from "next/image";
import Link from "next/link";
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
<Link
    href="/sign-up"
    className="group relative inline-flex items-center justify-center overflow-hidden border border-white px-20 py-3 uppercase transition-colors duration-300 hover:text-black"
  >
    <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-300 ease-out group-hover:scale-y-100" />

    <span className="relative block h-5 overflow-hidden leading-5">
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span>Get Started</span>
        <span>Get Started</span>
      </span>
    </span>
  </Link>        
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}