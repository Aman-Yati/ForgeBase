"use client";

import { deleteJob } from "@/app/actions/actions";
import { AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";

interface DeleteJobProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

export default function DeleteJob({
  open,
  onClose,
  jobId,
}: DeleteJobProps) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  async function handleDelete() {
    await deleteJob(jobId);
    onClose();
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Alert */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-md rounded-2xl border border-white/10 bg-[#0B1220] p-6 shadow-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15">
          <AlertTriangle className="text-red-400" size={28} />
        </div>

        <h2 className="text-center text-2xl font-semibold text-white">
          Delete Job
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-zinc-400">
          Are you sure you want to delete this job application?
          <br />
          This action cannot be undone.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 py-3 text-zinc-300 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}