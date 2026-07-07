"use client";

import { createJob, updateJob } from "@/app/actions/actions";
import type { Job } from "@prisma/client";
import {
  ApplicationStatus,
  JobType,
  Priority,
  WorkMode,
} from "@prisma/client";
import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";   


interface JobFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit" | "view";
  job?: Job;
}


export default function JobForm({
  open,
  onClose,
  mode,
  job,
}: JobFormProps) {

  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);


  if (!open) return null;


  const isView = mode === "view";


  async function handleSubmit(formData: FormData) {

    setError("");
    setIsPending(true);

    let result;

    if (mode === "create") {
      result = await createJob(formData);
    } else {
      result = await updateJob(formData);
    }


    setIsPending(false);


    if (!result.success) {
      setError(result.error);
      return;
    }


    onClose();
  }



  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-start justify-center p-4 py-10">
          <div
            onClick={(e)=>e.stopPropagation()}
            className="w-full max-w-6xl rounded-lg border border-white/10 bg-[#0B1220] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-2xl font-semibold text-white">
                {
                  mode === "create"
                  ? "Add New Job"
                  : mode === "edit"
                  ? "Update Job"
                  : "Job Details"
                }
              </h2>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
              >
                <X size={20}/>
              </button>
            </div>

            <form
              action={handleSubmit}
              className="px-6 py-4"
            >

              {
                mode === "edit" && job?.id && (
                  <input
                    type="hidden"
                    name="id"
                    value={job.id}
                  />
                )
              }

              {
                error && (
                  <p className="mb-4 rounded-lg border border-red-700/40 bg-red-900/30 px-4 py-2 text-sm text-red-300">
                    {error}
                  </p>
                )
              }
              
              <div className="grid gap-3 md:grid-cols-3">
                <Field
                  label="Company"
                  name="company"
                  defaultValue={job?.company ?? ""}
                  disabled={isView}
                />


                <Field
                  label="Role"
                  name="role"
                  defaultValue={job?.role ?? ""}
                  disabled={isView}
                />


                <Field
                  label="Location"
                  name="location"
                  defaultValue={job?.location ?? ""}
                  disabled={isView}
                />


                <Field
                  label="Job URL"
                  name="jobUrl"
                  type="url"
                  defaultValue={job?.jobUrl ?? ""}
                  disabled={isView}
                />


                <Field
                  label="Salary Min"
                  name="salaryMin"
                  type="number"
                  defaultValue={job?.salaryMin ?? ""}
                  disabled={isView}
                />


                <Field
                  label="Salary Max"
                  name="salaryMax"
                  type="number"
                  defaultValue={job?.salaryMax ?? ""}
                  disabled={isView}
                />



                <Field
                  label="Applied Date"
                  name="appliedDate"
                  type="date"
                  defaultValue={
                    job?.appliedDate
                    ? new Date(job.appliedDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                  }
                  disabled={isView}
                />



                <Dropdown
                  label="Job Type"
                  name="jobType"
                  options={Object.values(JobType)}
                  selected={job?.jobType}
                  disabled={isView}
                />



                <Dropdown
                  label="Work Mode"
                  name="workMode"
                  options={Object.values(WorkMode)}
                  selected={job?.workMode}
                  disabled={isView}
                />



                <Dropdown
                  label="Status"
                  name="status"
                  options={Object.values(ApplicationStatus)}
                  selected={job?.status}
                  disabled={isView}
                />



                <Dropdown
                  label="Priority"
                  name="priority"
                  options={Object.values(Priority)}
                  selected={job?.priority}
                  disabled={isView}
                />




                <div className="md:col-span-3">

                  <label className="mb-2 block text-sm text-zinc-300">
                    Notes
                  </label>


                  <textarea
                    name="notes"
                    rows={4}
                    disabled={isView}
                    defaultValue={job?.notes ?? ""}
                    className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2 text-white outline-none focus:border-indigo-500 disabled:opacity-50"
                  />

                </div>


              </div>





              <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-6">


                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 px-5 py-2.5 text-zinc-300 hover:bg-white/5"
                >
                  Close
                </button>



                {!isView && (

                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
                  >
                    {
                      isPending
                      ? "Saving..."
                      : mode === "create"
                      ? "Add Job"
                      : "Update Job"
                    }
                  </button>

                )}


              </div>


            </form>


          </div>

        </div>

      </div>


    </div>
  , document.body);
}





function Field({
  label,
  name,
  type="text",
  defaultValue,
  disabled,
}:{
  label:string;
  name:string;
  type?:string;
  defaultValue?:string | number;
  disabled?:boolean;
}){


  return (

    <div>

      <label className="mb-2 block text-sm text-zinc-300">
        {label}
      </label>


      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2 text-white outline-none focus:border-indigo-500 disabled:opacity-50"
      />

    </div>

  );

}





function Dropdown({
  label,
  name,
  options,
  selected,
  disabled,
}:{
  label:string;
  name:string;
  options:string[];
  selected?:string | null;
  disabled?:boolean;
}){


  return (

    <div>

      <label className="mb-2 block text-sm text-zinc-300">
        {label}
      </label>


      <select
        name={name}
        defaultValue={selected ?? ""}
        disabled={disabled}
        className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-2 text-white disabled:opacity-50"
      >

        {options.map((option)=>(
          <option
            key={option}
            value={option}
          >
            {option.replaceAll("_"," ")}
          </option>
        ))}

      </select>


    </div>

  );

}