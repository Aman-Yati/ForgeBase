export default function Loading() {
  return (
    <div
      className=" min-h-screen flex flex-col items-center justify-center gap-5 text-white"
      style={{ backgroundColor: "#04070d" }}
    >
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-indigo-500 dot" style={{ animationDelay: "0s" }} />
        <span className="h-3 w-3 rounded-full bg-indigo-500 dot" style={{ animationDelay: "0.15s" }} />
        <span className="h-3 w-3 rounded-full bg-indigo-500 dot" style={{ animationDelay: "0.3s" }} />
      </div>

      <p className="text-sm font-medium text-zinc-400">Loading…</p>

      <style>{`
        .dot {
          animation: bounce 1s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .dot { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}