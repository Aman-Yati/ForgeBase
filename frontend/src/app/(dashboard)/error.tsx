"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "0 24px",
        textAlign: "center",
        backgroundColor: "#04070d",
        color: "#ffffff",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
        }}
      >
        <span
          className="pulse-ring"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            backgroundColor: "rgba(244, 63, 94, 0.2)",
          }}
        />
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "9999px",
            backgroundColor: "rgba(244, 63, 94, 0.15)",
            color: "#fb7185",
          }}
        >
          <AlertTriangle size={24} strokeWidth={2} />
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <p style={{ fontSize: "16px", fontWeight: 500, color: "#ffffff", margin: 0 }}>
          Something went wrong
        </p>
        <p
          style={{
            maxWidth: "380px",
            fontSize: "14px",
            color: "#71717a",
            margin: 0,
          }}
        >
          Your dashboard hit a snag loading. Try again, or come back in a moment.
        </p>
      </div>

      <button
        onClick={reset}
        style={{
          marginTop: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderRadius: "8px",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 500,
          padding: "10px 20px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
      >
        <RotateCcw size={15} />
        Try again
      </button>

      {error.digest && (
        <p style={{ marginTop: "4px", fontSize: "12px", color: "#3f3f46" }}>
          Error ID: {error.digest}
        </p>
      )}

      <style>{`
        .pulse-ring {
          animation: pulseRing 1.8s ease-out infinite;
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-ring { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  );
}