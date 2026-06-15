"use client";

import { useState } from "react";

type Roundness = "square" | "rounded" | "pill";
type AccentColor = "green" | "gold" | "rose";

export default function DesignOpsVisual() {
  const [roundness, setRoundness] = useState<Roundness>("rounded");
  const [accent, setAccent] = useState<AccentColor>("green");

  const radiusStyles = {
    square: "rounded-none",
    rounded: "rounded-lg",
    pill: "rounded-full",
  };

  const accentStyles = {
    green: "bg-(--primary) hover:bg-(--primary)/90 text-(--surface) shadow-(--primary)/20",
    gold: "bg-[#d4af37] hover:bg-[#c29b28] text-black shadow-[#d4af37]/20",
    rose: "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20",
  };

  const borderStyles = {
    green: "border-(--primary)/30 text-(--primary)",
    gold: "border-[#d4af37]/40 text-[#c29b28]",
    rose: "border-rose-600/30 text-rose-600",
  };

  return (
    <div className="relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-(--bg) p-4 transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-(--primary)/10 blur-xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-2.5">
        {/* Token Controllers */}
        <div className="flex flex-col gap-1.5 border-b border-(--primary)/10 pb-2">
          <div className="flex items-center justify-between text-[8px] font-mono text-(--muted)">
            <span>TOKEN: --radius</span>
            <div className="flex gap-1">
              {(["square", "rounded", "pill"] as Roundness[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoundness(r)}
                  className={`rounded px-1 py-0.5 text-[8px] transition-all capitalize ${
                    roundness === r ? "bg-(--primary) text-(--surface)" : "hover:text-(--fg)"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[8px] font-mono text-(--muted)">
            <span>TOKEN: --color-accent</span>
            <div className="flex gap-1">
              {(["green", "gold", "rose"] as AccentColor[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className={`rounded px-1 py-0.5 text-[8px] transition-all capitalize ${
                    accent === c ? "bg-(--primary) text-(--surface)" : "hover:text-(--fg)"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic component preview */}
        <div className="rounded-xl border border-(--primary)/10 bg-(--surface)/40 p-3 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            {/* Mock Component */}
            <div
              className={`w-full max-w-[150px] border border-black/5 dark:border-white/5 bg-(--surface) p-2.5 shadow-sm transition-all duration-300 ${
                radiusStyles[roundness]
              }`}
            >
              <div className="flex gap-1.5 items-center">
                <div
                  className={`h-5 w-5 rounded-full transition-colors duration-300 ${
                    accent === "green" ? "bg-(--primary)/20" : accent === "gold" ? "bg-[#d4af37]/20" : "bg-rose-100 dark:bg-rose-950"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-10 bg-(--primary)/20 rounded-full" />
                  <div className="h-1 w-14 bg-(--primary)/10 rounded-full" />
                </div>
              </div>

              {/* Mock Actions */}
              <div className="mt-3 flex gap-1.5">
                <button
                  className={`flex-1 text-[8px] font-bold py-1 shadow-sm transition-all duration-300 ${
                    radiusStyles[roundness]
                  } ${accentStyles[accent]}`}
                >
                  Confirm
                </button>
                <button
                  className={`flex-1 text-[8px] font-bold py-1 border transition-all duration-300 ${
                    radiusStyles[roundness]
                  } ${borderStyles[accent]}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
