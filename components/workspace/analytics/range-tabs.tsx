"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import type { AnalyticsRange } from "@/lib/analytics/types"

const RANGES: { value: AnalyticsRange; label: string }[] = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
]

export function RangeTabs({ active }: { active: AnalyticsRange }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setRange = (range: AnalyticsRange) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("range", range)
    router.push(`/admin/analytics?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-1.5 p-1 bg-secondary/50 rounded-full border border-primary/10">
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => setRange(r.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-widest transition-colors",
            active === r.value
              ? "bg-primary text-background shadow-sm"
              : "text-muted hover:text-foreground"
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
