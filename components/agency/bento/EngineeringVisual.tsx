"use client";

import { useState, useRef, useEffect } from "react";

export default function EngineeringVisual() {
  const [isActive, setIsActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "info - Ready on port 3000",
    "event - Compiled client-side code successfully",
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-4), `event - [React] ${msg}`]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleToggle = () => {
    const nextState = !isActive;
    setIsActive(nextState);
    addLog(nextState ? "Component mounted with active=true" : "Component updated with active=false");
    setTimeout(() => {
      addLog(`Re-rendered 4 component nodes in ${(Math.random() * 2 + 0.5).toFixed(1)}ms`);
    }, 250);
  };

  return (
    <div className="relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-(--bg) p-4 transition-all duration-500">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-(--primary)/5 blur-2xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-3 font-mono">
        {/* Editor Code Header */}
        <div className="flex items-center justify-between rounded-lg border border-(--primary)/10 bg-(--surface)/75 p-3 backdrop-blur-sm">
          <div className="flex flex-col gap-1 text-[9px] text-(--muted) leading-relaxed">
            <div>
              <span className="text-purple-500 font-semibold">const</span> [active, setActive] ={" "}
              <span className="text-blue-500">useState</span>(<span className={isActive ? "text-green-600" : "text-amber-600"}>{isActive ? "true" : "false"}</span>);
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-(--fg)/60">Toggle state:</span>
              <button
                onClick={handleToggle}
                className={`relative inline-flex h-4 w-9 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  isActive ? "bg-(--primary)" : "bg-(--primary)/20"
                }`}
              >
                <span
                  className={`inline-block h-2.5 w-2.5 transform rounded-full bg-(--surface) transition-transform duration-300 ${
                    isActive ? "translate-x-5.5" : "translate-x-0.8"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Nodes Visual */}
        <div className="flex items-center justify-between rounded-lg border border-(--primary)/10 bg-(--surface)/40 p-2 text-[9px] text-(--muted)">
          <div className="flex w-full items-center justify-around relative px-2">
            {/* Connection Lines */}
            <div className="absolute left-1/4 right-1/4 top-1/2 h-[1px] -translate-y-1/2 bg-(--primary)/20" />
            
            {/* Root Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="h-6 w-6 rounded-full border border-(--primary)/25 bg-(--surface) flex items-center justify-center font-bold text-(--primary) shadow-sm">
                R
              </div>
              <span className="text-[7px]">App</span>
            </div>

            {/* Middle Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div
                className={`h-6 w-6 rounded-full border flex items-center justify-center font-bold shadow-sm transition-all duration-300 ${
                  isActive
                    ? "border-(--primary) bg-(--primary)/10 text-(--primary) scale-110 shadow-md shadow-(--primary)/10"
                    : "border-(--primary)/20 bg-(--surface) text-(--muted)"
                }`}
              >
                M
              </div>
              <span className="text-[7px]">Main</span>
            </div>

            {/* Child Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div
                className={`h-6 w-6 rounded-full border flex items-center justify-center font-bold shadow-sm transition-all duration-500 ${
                  isActive
                    ? "border-(--primary) bg-(--primary) text-(--surface) scale-115 shadow-lg shadow-(--primary)/30"
                    : "border-(--primary)/20 bg-(--surface) text-(--muted)"
                }`}
              >
                C
              </div>
              <span className="text-[7px]">Child</span>
            </div>
          </div>
        </div>

        {/* Real-time console logs */}
        <div className="rounded-md bg-black/95 p-2 text-[8px] leading-tight text-green-400 border border-white/5 shadow-inner">
          <div className="flex justify-between border-b border-white/10 pb-1 mb-1 text-white/40">
            <span>TERMINAL</span>
            <span>90 FPS</span>
          </div>
          <div ref={logContainerRef} className="h-14 overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
            {logs.map((log, idx) => (
              <div key={idx} className="truncate select-text">
                <span className="text-white/40">&gt;</span> {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
