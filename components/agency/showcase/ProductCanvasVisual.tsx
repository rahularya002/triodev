"use client";

import { useState } from "react";

type LayoutBlock = "header" | "hero" | "features" | "footer";

export default function ProductCanvasVisual() {
  const [activeBlocks, setActiveBlocks] = useState<LayoutBlock[]>(["header", "hero"]);
  const [metricValue, setMetricValue] = useState(82);

  const toggleBlock = (block: LayoutBlock) => {
    setActiveBlocks((prev) =>
      prev.includes(block) ? prev.filter((b) => b !== block) : [...prev, block].sort()
    );
    // Randomize metric slightly on toggle to feel active
    setMetricValue(Math.floor(Math.random() * 20 + 75));
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        
        {/* Left Side: Browser Preview Window */}
        <div className="rounded-2xl bg-(--bg) p-3 border border-(--primary)/10 shadow-inner min-h-[200px] flex flex-col gap-2 transition-all duration-300">
          <div className="flex items-center gap-1.5 border-b border-(--primary)/5 pb-1.5 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-400/50" />
            <span className="h-2.5 w-24 rounded bg-(--primary)/10 ml-2" />
          </div>

          {/* Browser Content */}
          <div className="flex-1 space-y-2 text-center text-[7px] font-mono transition-all duration-500">
            {/* Header Block */}
            {activeBlocks.includes("header") ? (
              <div className="rounded border border-(--primary)/10 bg-(--surface) p-1.5 flex justify-between items-center animate-[slideDown_0.3s_ease-out]">
                <div className="h-1 w-6 bg-(--primary)/40 rounded" />
                <div className="flex gap-1">
                  <div className="h-1 w-4 bg-(--primary)/20 rounded" />
                  <div className="h-1 w-4 bg-(--primary)/20 rounded" />
                </div>
              </div>
            ) : (
              <div className="rounded border border-dashed border-(--primary)/5 p-1 text-(--muted)/40">
                [Header Empty]
              </div>
            )}

            {/* Hero Block */}
            {activeBlocks.includes("hero") ? (
              <div className="rounded border border-(--primary)/15 bg-gradient-to-br from-(--surface) to-(--primary)/5 p-3 flex flex-col items-center gap-1.5 animate-[fadeIn_0.4s_ease-out]">
                <div className="h-2 w-16 bg-(--primary) rounded" />
                <div className="h-1 w-24 bg-(--primary)/30 rounded" />
                <div className="h-3 w-10 bg-(--primary)/20 rounded mt-1" />
              </div>
            ) : (
              <div className="rounded border border-dashed border-(--primary)/5 p-2 text-(--muted)/40">
                [Hero Empty]
              </div>
            )}

            {/* Features Block */}
            {activeBlocks.includes("features") ? (
              <div className="grid grid-cols-2 gap-1.5 animate-[slideUp_0.3s_ease-out]">
                <div className="rounded border border-(--primary)/10 bg-(--surface) p-1.5 flex flex-col gap-1">
                  <div className="h-1.5 w-4 bg-(--primary)/50 rounded" />
                  <div className="h-1 w-8 bg-(--primary)/20 rounded" />
                </div>
                <div className="rounded border border-(--primary)/10 bg-(--surface) p-1.5 flex flex-col gap-1">
                  <div className="h-1.5 w-4 bg-(--primary)/50 rounded" />
                  <div className="h-1 w-8 bg-(--primary)/20 rounded" />
                </div>
              </div>
            ) : (
              <div className="rounded border border-dashed border-(--primary)/5 p-1 text-(--muted)/40">
                [Features Empty]
              </div>
            )}

            {/* Footer Block */}
            {activeBlocks.includes("footer") ? (
              <div className="rounded border border-(--primary)/10 bg-(--surface) p-1 flex justify-between items-center animate-[slideUp_0.2s_ease-out]">
                <div className="h-1 w-10 bg-(--primary)/20 rounded" />
                <div className="h-1 w-4 bg-(--primary)/40 rounded" />
              </div>
            ) : (
              <div className="rounded border border-dashed border-(--primary)/5 p-1 text-(--muted)/40">
                [Footer Empty]
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Component Composer Controls & Live Performance Stats */}
        <div className="rounded-2xl bg-(--bg) p-3 border border-(--primary)/10 flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="text-[7px] text-(--muted) uppercase tracking-wider font-mono">Block Config</span>
            <div className="mt-1.5 space-y-1.5">
              {(["header", "hero", "features", "footer"] as LayoutBlock[]).map((block) => {
                const isActive = activeBlocks.includes(block);
                return (
                  <button
                    key={block}
                    onClick={() => toggleBlock(block)}
                    className={`w-full flex items-center justify-between rounded px-2 py-1 text-[9px] font-mono capitalize transition-all border ${
                      isActive
                        ? "bg-(--surface) border-(--primary)/25 text-(--primary) shadow-sm"
                        : "bg-transparent border-transparent text-(--muted) hover:text-(--fg)"
                    }`}
                  >
                    <span>{block}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-(--primary) animate-pulse" : "bg-(--primary)/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-(--primary)/10 pt-2.5 mt-2">
            <div className="flex justify-between text-[7px] text-(--muted) uppercase tracking-wider font-mono mb-1">
              <span>LCP Score</span>
              <span className="font-bold text-(--primary)">{metricValue}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-(--primary)/10 overflow-hidden">
              <div
                style={{ width: `${metricValue}%` }}
                className="h-full rounded-full bg-(--primary) transition-all duration-500 ease-out"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
