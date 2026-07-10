"use client";

import { Upload, FileText, RefreshCw } from "lucide-react";

type ResumeCardProps = {
  resumeUrl?: string;
  fileName?: string;
};

export default function ResumeCard({
  resumeUrl,
  fileName,
}: ResumeCardProps) {
  const hasResume = Boolean(resumeUrl);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Resume
        </h1>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#010a17]">
        <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="rounded-lg bg-indigo-500/10 p-2">
              <FileText size={20} className="text-indigo-400" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-white">
                {hasResume ? fileName : "Resume Preview"}
              </h2>

              <p className="text-sm text-zinc-500">
                {hasResume
                  ? "PDF Document"
                  : "Upload a PDF resume to preview it here"}
              </p>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#615fff] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 sm:w-auto">
            {hasResume ? (
              <>
                <RefreshCw size={16} />
                Change Resume
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload Resume
              </>
            )}
          </button>
        </div>

        {hasResume ? (
          <div className="bg-white">
            <iframe
              src={resumeUrl}
              title="Resume Preview"
              className="h-[450px] w-full sm:h-[650px] lg:h-[900px]"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10 sm:py-24">
            <div className="mb-6 rounded-full bg-indigo-500/10 p-5">
              <Upload size={38} className="text-indigo-400" />
            </div>

            <h3 className="text-2xl font-semibold text-white">
              No resume uploaded
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              Upload a PDF resume to preview it here. You can replace it
              anytime with a newer version.
            </p>

            <button className="mt-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-[#615fff] px-6 py-3 font-medium text-white transition hover:bg-indigo-500 sm:w-auto">
              <Upload size={18} />
              Upload Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
