"use client";

import { deleteJob } from "@/app/actions/actions";
import { AlertTriangle } from "lucide-react";
import { createPortal } from "react-dom";
import { useState } from "react";

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
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open || typeof document === "undefined") {
    return null;
  }

  async function handleDelete() {
    if (isPending) return;

    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const res = await deleteJob(jobId);

      if (!res.success) {
        setError(res.error);
        return;
      }

      setSuccess("Job deleted successfully");
      setTimeout(() => onClose(), 700);
    } finally {
      setIsPending(false);
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        onClick={!isPending ? onClose : undefined}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-[90%] rounded-2xl border border-white/10 bg-[#0B1220] p-6 shadow-2xl sm:max-w-md">
        {error && (
          <p className="mb-3 rounded-lg border border-red-500/30 bg-red-900/20 px-4 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-3 rounded-lg border border-emerald-500/30 bg-emerald-900/10 px-4 py-2 text-sm text-emerald-400">
            {success}
          </p>
        )}

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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-xl border border-white/10 py-3 text-zinc-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className={`flex-1 rounded-xl py-3 font-medium text-white transition ${
              isPending
                ? "cursor-wait bg-red-600/70"
                : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}