import Image from "next/image";
import {
  pageIllustration,
  blurredShapeGray,
  blurredShape,
} from "@/lib/images";

export default function PageIllustration({
  multiple = false,
}: {
  multiple?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Main Illustration */}
      <div className="absolute left-1/2 top-0 -translate-x-1/4">
        <Image
          src={pageIllustration}
          width={846}
          height={594}
          alt="Page illustration"
          className="block max-w-none"
          priority
        />
      </div>

      {multiple && (
        <>
          {/* Gray Blur */}
          <div className="absolute left-1/2 top-[400px] -mt-20 -translate-x-full opacity-50">
            <Image
              src={blurredShapeGray}
              width={760}
              height={668}
              alt="Blurred shape"
              className="block max-w-none"
            />
          </div>

          {/* Purple Blur */}
          <div className="absolute left-1/2 top-[440px] -translate-x-1/3">
            <Image
              src={blurredShape}
              width={760}
              height={668}
              alt="Blurred shape"
              className="block max-w-none"
            />
          </div>
        </>
      )}
    </div>
  );
}