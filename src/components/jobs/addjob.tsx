import { Plus } from "lucide-react";

export default function AddJob() {
  return (
    <button className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-95 sm:w-auto">
      <Plus size={18} />
      <span>Add Job</span>
    </button>
  );
}