"use client";

import type { Job } from "@prisma/client";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DeleteJob from "./deletejob";
import JobForm from "./jobform";

export default function EditOptions({ job }: { job: Job }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"view" | "edit">("view");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  function openView() {
    setFormMode("view");
    setFormOpen(true);
    setMenuOpen(false);
  }


  function openEdit() {
    setFormMode("edit");
    setFormOpen(true);
    setMenuOpen(false);
  }


  return (
    <div className="relative" ref={menuRef}>

      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="rounded-lg p-2 text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
      >
        <MoreHorizontal size={17} />
      </button>


      {menuOpen && (
        <div
          className="absolute right-0 top-11 z-50 w-48 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] animate-in fade-in zoom-in-95 duration-150"
        >

          <button
            onClick={openView}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Eye size={17} className="text-indigo-400" />
            View Details
          </button>


          <button
            onClick={openEdit}
            className="flex w-full items-center gap-3 border-t border-white/5 px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Pencil size={17} className="text-amber-400" />
            Update
          </button>


          <button
            onClick={() => {
              setDeleteOpen(true);
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-3 border-t border-white/5 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/30 hover:text-red-300"
          >
            <Trash2 size={17} />
            Delete
          </button>


        </div>
      )}



      <JobForm
        open={formOpen}
        mode={formMode}
        job={job}
        onClose={() => setFormOpen(false)}
      />



      <DeleteJob
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        jobId={job.id}
      />


    </div>
  );
}