"use client";

import { useState, useEffect } from "react";

type BrandStyle = "kinetic" | "editorial" | "brutalist";

export default function BrandIdentityVisual() {
  const [style, setStyle] = useState<BrandStyle>("kinetic");

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle((prev) => {
        if (prev === "kinetic") return "editorial";
        if (prev === "editorial") return "brutalist";
        return "kinetic";
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-(--bg) p-4 transition-all duration-700">
      {/* Blurred background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-(--primary)/20 blur-2xl transition-all duration-1000" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-(--primary)/10 blur-3xl transition-all duration-1000" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center justify-between gap-4">
        {/* Style Selector Tabs */}
        <div className="flex gap-1.5 rounded-full border border-(--primary)/15 bg-(--surface)/85 p-1 backdrop-blur-md">
          {(["kinetic", "editorial", "brutalist"] as BrandStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`rounded-full px-3 py-1 text-[10px] font-medium tracking-wider uppercase transition-all duration-300 ${
                style === s
                  ? "bg-(--primary) text-(--surface)"
                  : "text-(--muted) hover:bg-(--primary)/10 hover:text-(--fg)"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Dynamic Canvas Area */}
        <div className="flex h-36 w-full items-center justify-center rounded-xl border border-(--primary)/10 bg-(--surface)/40 backdrop-blur-sm transition-all duration-500 hover:border-(--primary)/30">
          {style === "kinetic" && (
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Spinning and scaling lines */}
              <div className="absolute h-24 w-24 animate-[spin_12s_linear_infinite] will-change-transform rounded-full border-2 border-dashed border-(--primary)/30" />
              <div className="absolute h-16 w-16 animate-[spin_8s_linear_infinite_reverse] will-change-transform rounded-full border border-dashed border-(--primary)/50" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-(--primary) text-(--surface) shadow-lg shadow-(--primary)/20 transition-all duration-500 hover:scale-110">
                <svg className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          )}

          {style === "editorial" && (
            <div className="flex flex-col items-center justify-center p-4 text-center transition-all duration-500">
              <span className="font-serif text-3xl font-extrabold italic tracking-tight text-(--primary) transition-all duration-700">
                AURA
              </span>
              <span className="mt-1 text-[9px] font-light tracking-[0.3em] text-(--muted) uppercase">
                Established 2026
              </span>
              <div className="mt-3 h-[1px] w-16 bg-(--primary)/30" />
            </div>
          )}

          {style === "brutalist" && (
            <div className="grid grid-cols-2 gap-2 p-4 font-mono transition-all duration-500">
              <div className="border border-(--fg) bg-(--fg) px-3 py-2 text-center text-xs font-black text-(--bg) shadow-[2px_2px_0px_var(--primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_var(--primary)] transition-all">
                RAW
              </div>
              <div className="border border-(--fg) px-3 py-2 text-center text-xs font-black text-(--fg) hover:bg-(--fg) hover:text-(--bg) transition-all">
                GRID
              </div>
            </div>
          )}
        </div>

        {/* Tiny metadata block */}
        <div className="w-full text-center">
          <p className="font-mono text-[9px] text-(--muted) tracking-widest uppercase">
            Active Brand Token: <span className="font-bold text-(--primary)">{style}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
