"use client";

import { useState } from "react";

export default function DashboardVisual() {
  const [activeTab, setActiveTab] = useState<"analytics" | "users">("analytics");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const chartData = [
    { x: 10, y: 80, val: "2.4k" },
    { x: 50, y: 45, val: "4.8k" },
    { x: 90, y: 65, val: "3.9k" },
    { x: 130, y: 20, val: "7.1k" },
    { x: 170, y: 35, val: "6.2k" },
    { x: 210, y: 10, val: "9.4k" },
  ];

  return (
    <div className="relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-(--bg) p-4 transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-(--primary)/10 blur-xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-3">
        {/* Mock Window Header */}
        <div className="flex items-center justify-between border-b border-(--primary)/10 pb-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/60" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
            <span className="h-2 w-2 rounded-full bg-green-400/60" />
          </div>
          {/* Tabs */}
          <div className="flex gap-1 bg-(--primary)/5 p-0.5 rounded-md">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`rounded px-2 py-0.5 text-[9px] font-medium transition-all ${
                activeTab === "analytics"
                  ? "bg-(--surface) text-(--fg) shadow-sm"
                  : "text-(--muted) hover:text-(--fg)"
              }`}
            >
              Metric
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`rounded px-2 py-0.5 text-[9px] font-medium transition-all ${
                activeTab === "users"
                  ? "bg-(--surface) text-(--fg) shadow-sm"
                  : "text-(--muted) hover:text-(--fg)"
              }`}
            >
              Users
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="min-h-24 rounded-lg bg-(--surface)/50 p-3 border border-(--primary)/10 backdrop-blur-sm">
          {activeTab === "analytics" ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-(--muted) uppercase tracking-wider">Active Conversion</span>
                <span className="text-sm font-bold text-(--primary) animate-pulse">4.8% (+1.2%)</span>
              </div>

              {/* SVG Sparkline chart */}
              <div className="relative mt-2 h-14 w-full">
                <svg className="h-full w-full" viewBox="0 0 220 90" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="220" y2="20" stroke="var(--color-background)" strokeWidth="0.5" strokeDasharray="3" />
                  <line x1="0" y1="50" x2="220" y2="50" stroke="var(--color-background)" strokeWidth="0.5" strokeDasharray="3" />
                  <line x1="0" y1="80" x2="220" y2="80" stroke="var(--color-background)" strokeWidth="0.5" strokeDasharray="3" />

                  {/* Gradient fill path */}
                  <path
                    d={`M 10 90 L ${chartData.map((d) => `${d.x} ${d.y}`).join(" L ")} L 210 90 Z`}
                    fill="url(#sparkline-grad)"
                    opacity="0.25"
                    className="transition-all duration-500"
                  />

                  {/* Glow effect filter */}
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Main Line path */}
                  <path
                    d={`M ${chartData.map((d) => `${d.x} ${d.y}`).join(" L ")}`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                  />

                  {/* Interactive Nodes */}
                  {chartData.map((d, i) => (
                    <circle
                      key={i}
                      cx={d.x}
                      cy={d.y}
                      r={hoveredPoint === i ? 5 : 3.5}
                      fill="var(--surface)"
                      stroke="var(--primary)"
                      strokeWidth="2.5"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className="cursor-pointer transition-all duration-200"
                    />
                  ))}
                </svg>

                {/* Tooltip Overlay */}
                {hoveredPoint !== null && (
                  <div
                    style={{
                      position: "absolute",
                      left: `${chartData[hoveredPoint].x / 2.2}%`,
                      top: `${chartData[hoveredPoint].y / 1.5 - 15}px`,
                    }}
                    className="pointer-events-none rounded bg-(--primary) px-1.5 py-0.5 text-[8px] font-bold text-(--surface) shadow"
                  >
                    {chartData[hoveredPoint].val}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-(--muted) uppercase tracking-wider">Recent Signups</span>
              <div className="space-y-1.5">
                {[
                  { name: "Alex Rivers", role: "Product Manager", time: "Just now" },
                  { name: "Sarah Chen", role: "Tech Lead", time: "2m ago" },
                ].map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded bg-(--background)/40 p-1.5 border border-(--primary)/5 transition duration-300 hover:bg-(--background)/80"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-(--primary)/20 flex items-center justify-center text-[9px] font-bold text-(--primary)">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium leading-none">{user.name}</span>
                        <span className="text-[8px] text-(--muted) leading-none mt-0.5">{user.role}</span>
                      </div>
                    </div>
                    <span className="text-[8px] text-(--muted)">{user.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
