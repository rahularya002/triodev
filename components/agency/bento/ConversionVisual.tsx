"use client";

import { useState } from "react";

export default function ConversionVisual() {
  const [variant, setVariant] = useState<"A" | "B">("A");

  const data = {
    A: { rate: "2.1%", progress: 42, label: "Control Flow" },
    B: { rate: "4.8%", progress: 96, label: "Smart Checkout" },
  };

  return (
    <div className="relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-(--bg) p-4 transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-(--primary)/10 blur-xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-3">
        {/* Toggle Head */}
        <div className="flex items-center justify-between border-b border-(--primary)/10 pb-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-(--muted)">A/B Split Test</span>
          
          <div className="flex gap-1 bg-(--primary)/10 p-0.5 rounded-full">
            <button
              onClick={() => setVariant("A")}
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold transition-all ${
                variant === "A"
                  ? "bg-(--muted) text-(--surface)"
                  : "text-(--muted) hover:text-(--fg)"
              }`}
            >
              Ver A
            </button>
            <button
              onClick={() => setVariant("B")}
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold transition-all ${
                variant === "B"
                  ? "bg-(--primary) text-(--surface) shadow"
                  : "text-(--muted) hover:text-(--fg)"
              }`}
            >
              Ver B
            </button>
          </div>
        </div>

        {/* Funnel/Card Area */}
        <div className="rounded-xl border border-(--primary)/10 bg-(--surface)/40 p-3 backdrop-blur-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[7px] text-(--muted) uppercase tracking-wider">Conversion rate</p>
                <h4 className="text-xl font-black text-(--fg) tracking-tight transition-all duration-300">
                  {data[variant].rate}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-[7px] text-(--muted) uppercase tracking-wider">Flow Type</p>
                <p className="text-[9px] font-bold text-(--primary) transition-all duration-300">
                  {data[variant].label}
                </p>
              </div>
            </div>

            {/* Simulated Funnel / Bar Chart */}
            <div className="space-y-2 mt-1">
              <div>
                <div className="flex justify-between text-[8px] text-(--muted) mb-1 font-mono">
                  <span>Signups</span>
                  <span>{variant === "A" ? "42%" : "96%"}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-(--primary)/10 overflow-hidden">
                  <div
                    style={{ width: `${data[variant].progress}%` }}
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      variant === "B" ? "bg-(--primary)" : "bg-(--muted)"
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[8px] text-(--muted) mb-1 font-mono">
                  <span>Activation</span>
                  <span>{variant === "A" ? "18%" : "54%"}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-(--primary)/10 overflow-hidden">
                  <div
                    style={{ width: `${variant === "A" ? 18 : 54}%` }}
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      variant === "B" ? "bg-(--primary)" : "bg-(--muted)"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Spark Indicator */}
            {variant === "B" && (
              <div className="mt-1 flex items-center gap-1.5 animate-bounce">
                <span className="h-1.5 w-1.5 rounded-full bg-(--primary) animate-ping" />
                <span className="text-[8px] text-(--primary) font-semibold uppercase tracking-wider">
                  +128% Increase in conversions!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
