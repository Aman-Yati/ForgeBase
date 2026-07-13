"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { blurredShapeGray, blurredShape, featuresImage } from '@/lib/images'

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const features = [
  {
    icon: (
      <>
        <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
        <path
          fillOpacity=".48"
          d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z"
        />
      </>
    ),
    title: "Application Tracking",
    desc: "Track every application from wishlist to offer with clear status updates and a centralized dashboard.",
  },
  {
    icon: (
      <>
        <path fillOpacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
        <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
      </>
    ),
    title: "Interview Pipeline",
    desc: "Organize interview rounds, upcoming schedules, and recruiter conversations without losing track.",
  },
  {
    icon: (
      <>
        <path d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z" />
        <path
          fillOpacity=".48"
          d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z"
        />
      </>
    ),
    title: "Powerful Search",
    desc: "Instantly find any application using company names, job titles, locations, or custom tags.",
  },
  {
    icon: (
      <>
        <path
          fillOpacity=".48"
          d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z"
        />
        <path d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z" />
        <path
          d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z"
          opacity=".48"
        />
        <path d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z" />
      </>
    ),
    title: "Analytics Dashboard",
    desc: "Visualize your application success rate, interview performance, and overall job search progress.",
  },
  {
    icon: (
      <>
        <path
          fillOpacity=".48"
          d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
        />
        <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
      </>
    ),
    title: "Custom Organization",
    desc: "Create personalized tags, notes, priorities, and workflows that match your own application process.",
  },
  {
    icon: (
      <>
        <path
          fillOpacity=".48"
          d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z"
        />
        <path d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z" />
      </>
    ),
    title: "Career Timeline",
    desc: "View your complete job search history in one timeline, from your first application to your final offer.",
  },
];

export default function Features() {
  return (
    <section className="relative pb-15 overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          src={blurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
          className="block"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          src={blurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
          className="block"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div>
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-32 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-32 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </div>
            <h2 className="mt-2 bg-clip-text pb-4 font-snasm tracking-normal text-3xl font-semibold md:text-4xl">
              Built for the modern job search
            </h2>
            <p className="text-lg text-indigo-200/65">
              Manage applications, interviews, offers, and rejections from one
              beautiful dashboard. Stay organized and focus on landing your
              next role.
            </p>
            </div>
          

          <Reveal delay={100} className="flex justify-center pb-4 md:pb-12">
            <Image
              src={featuresImage}
              width={1004}
              height={284}
              alt="Features"
              className="h-auto w-full max-w-[900px]"
            />
          </Reveal>

          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 80}>
                <article>
                  <svg
                    className="mb-3 fill-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    {feature.icon}
                  </svg>
                  <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                    {feature.title}
                  </h3>
                  <p className="text-indigo-200/65">{feature.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}