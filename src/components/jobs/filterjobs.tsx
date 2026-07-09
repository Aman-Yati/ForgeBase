"use client";

import {
  ApplicationStatus,
  JobType,
  Priority,
  WorkMode,
} from "@prisma/client";

import { ChevronDown, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterJobs() {
  const router = useRouter();
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("search") ?? "");

  function update(key: string, value: string) {
    const query = new URLSearchParams(params);

    if (value) query.set(key, value);
    else query.delete(key);

    router.push(`/jobs?${query.toString()}`);
  }

  function clearFilters() {
    setSearch("");
    router.push("/jobs");
  }
  const hasFilters =
  params.toString().length > 0;

 const selectClass =
  "h-11 w-full appearance-none rounded-lg border border-white/10 bg-[#101726] px-3 pr-9 text-sm text-zinc-300 outline-none transition-all duration-200 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer sm:w-[150px]";
  return (
    <div className="flex flex-wrap items-center gap-3 py-3 xl:flex-nowrap">
      {/* Search */}
      <div className="relative w-full md:flex-1 xl:max-w-sm">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") update("search", search);
          }}
          placeholder="Search company or role..."
          className="h-11 w-full rounded-lg border border-white/10 bg-[#101726] pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 hover:border-white/20 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Status */}
      <div className="relative w-full sm:w-[180px] xl:w-auto">
        <select
          className={selectClass}
          value={params.get("status") ?? ""}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="">Status</option>

          {Object.values(ApplicationStatus).map((status) => (
            <option key={status} value={status}>
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>

      {/* Priority */}
      <div className="relative w-full sm:w-[180px] xl:w-auto">
        <select
          className={selectClass}
          value={params.get("priority") ?? ""}
          onChange={(e) => update("priority", e.target.value)}
        >
          <option value="">Priority</option>

          {Object.values(Priority).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>

      {/* Job Type */}
      <div className="relative w-full sm:w-[180px] xl:w-auto">
        <select
          className={selectClass}
          value={params.get("jobType") ?? ""}
          onChange={(e) => update("jobType", e.target.value)}
        >
          <option value="">Job Type</option>

          {Object.values(JobType).map((type) => (
            <option key={type} value={type}>
              {type.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>

      {/* Work Mode */}
      <div className="relative w-full sm:w-[180px] xl:w-auto">
        <select
          className={selectClass}
          value={params.get("workMode") ?? ""}
          onChange={(e) => update("workMode", e.target.value)}
        >
          <option value="">Work Mode</option>

          {Object.values(WorkMode).map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>

      {/* Clear */}
{hasFilters && (
  <button
    onClick={clearFilters}
    className="flex h-11 w-full sm:w-[110px] items-center justify-center gap-2 rounded-lg text-sm text-zinc-400 hover:text-white uppercase transition"
  >
    Clear filters
  </button>
)}
    </div>
  );
}