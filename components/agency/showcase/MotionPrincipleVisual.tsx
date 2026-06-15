"use client";

import { useState, useEffect } from "react";

type MotionState = "idle" | "reveal" | "focus" | "action";

export default function MotionPrincipleVisual() {
  const [stage, setStage] = useState<MotionState>("idle");

  const runAnimation = () => {
    setStage("reveal");
  };

  useEffect(() => {
    if (stage === "reveal") {
      const timer = setTimeout(() => setStage("focus"), 1500);
      return () => clearTimeout(timer);
    }
    if (stage === "focus") {
      const timer = setTimeout(() => setStage("action"), 1500);
      return () => clearTimeout(timer);
    }
    if (stage === "action") {
      const timer = setTimeout(() => setStage("idle"), 2000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="relative w-full flex flex-col gap-4 select-none">
      {/* Top Controller */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 text-white font-mono">Principle Flow</span>
        <button
          onClick={runAnimation}
          disabled={stage !== "idle"}
          className={`rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider uppercase transition-all duration-300 border ${
            stage === "idle"
              ? "bg-[#f6f4ed] border-[#f6f4ed] text-(--primary) hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-transparent border-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          {stage === "idle" ? "Play Demo" : "Animating..."}
        </button>
      </div>

      {/* Play Area */}
      <div className="h-28 rounded-2xl bg-white/5 border border-white/10 p-3.5 flex flex-col justify-between items-center overflow-hidden relative">
        {stage === "idle" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-1.5 animate-pulse text-[#f6f4ed]/70 text-[9px]">
            <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
            <span>Click Play Demo to see motion hierarchy</span>
          </div>
        )}

        {stage !== "idle" && (
          <div className="flex-1 w-full flex justify-around items-center relative gap-2">
            {/* Box 1 (Fades out in focus) */}
            <div
              className={`h-11 w-11 rounded-xl bg-white/15 border border-white/10 flex flex-col items-center justify-center text-[8px] transition-all duration-500 ${
                stage === "reveal" ? "opacity-100 scale-100 translate-y-0" : ""
              } ${stage === "focus" ? "opacity-20 scale-90" : ""} ${stage === "action" ? "opacity-10 scale-80" : ""}`}
            >
              <div className="h-1.5 w-5 bg-white/30 rounded" />
            </div>

            {/* Box 2 (Primary focus target) */}
            <div
              className={`h-12 w-12 rounded-xl flex flex-col items-center justify-center text-[8px] transition-all duration-500 relative ${
                stage === "reveal" ? "bg-white/15 border border-white/10 opacity-100 scale-100 translate-y-0" : ""
              } ${
                stage === "focus"
                  ? "bg-white/25 border border-white/30 scale-120 shadow-lg shadow-black/10 z-10"
                  : ""
              } ${
                stage === "action"
                  ? "bg-white text-(--primary) scale-110 border-white shadow-xl shadow-black/20"
                  : ""
              }`}
            >
              {stage === "action" ? (
                <svg className="h-5 w-5 text-(--primary) animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className={`h-2 w-6 rounded transition-colors ${stage === "focus" ? "bg-white" : "bg-white/40"}`} />
              )}
            </div>

            {/* Box 3 (Fades out in focus) */}
            <div
              className={`h-11 w-11 rounded-xl bg-white/15 border border-white/10 flex flex-col items-center justify-center text-[8px] transition-all duration-500 ${
                stage === "reveal" ? "opacity-100 scale-100 translate-y-0" : ""
              } ${stage === "focus" ? "opacity-20 scale-90" : ""} ${stage === "action" ? "opacity-10 scale-80" : ""}`}
            >
              <div className="h-1.5 w-5 bg-white/30 rounded" />
            </div>
          </div>
        )}

        {/* Timeline Progress Bar */}
        {stage !== "idle" && (
          <div className="w-full flex flex-col gap-1 mt-2">
            <div className="flex justify-between text-[7px] font-mono text-white/50 tracking-wider">
              <span className={stage === "reveal" ? "text-white font-bold" : ""}>REVEAL</span>
              <span className={stage === "focus" ? "text-white font-bold" : ""}>FOCUS</span>
              <span className={stage === "action" ? "text-white font-bold" : ""}>ACTION</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#f6f4ed] transition-all duration-500 ease-out"
                style={{
                  width:
                    stage === "reveal"
                      ? "33%"
                      : stage === "focus"
                      ? "66%"
                      : stage === "action"
                      ? "100%"
                      : "0%",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
