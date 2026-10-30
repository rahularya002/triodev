"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { TimeseriesPoint } from "@/lib/analytics/types"

function formatDay(day: string): string {
  return new Date(day).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

interface TooltipPayloadEntry {
  name: string
  value: number
  color: string
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-2xl border border-primary/16 bg-surface px-4 py-3 shadow-md">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted mb-1.5">
        {label ? formatDay(label) : ""}
      </p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs font-semibold text-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export function VisitorsChart({ data }: { data: TimeseriesPoint[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="day"
            tickFormatter={formatDay}
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
            minTickGap={32}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "var(--muted)" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="views"
            name="Views"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#viewsGradient)"
          />
          <Area
            type="monotone"
            dataKey="visitors"
            name="Visitors"
            stroke="var(--primary)"
            strokeOpacity={0.5}
            strokeWidth={2}
            strokeDasharray="4 4"
            fill="url(#visitorsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
