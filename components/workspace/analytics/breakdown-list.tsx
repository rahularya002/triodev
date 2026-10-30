import { Card } from "@/components/ui/card"
import type { BreakdownRow } from "@/lib/analytics/types"

interface BreakdownListProps {
  title: string
  rows: BreakdownRow[]
  emptyLabel: string
  formatLabel?: (label: string) => string
}

export function BreakdownList({ title, rows, emptyLabel, formatLabel }: BreakdownListProps) {
  const maxViews = rows.length > 0 ? Math.max(...rows.map((r) => r.views)) : 0

  return (
    <Card className="p-6 bg-surface border-primary/16">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">{title}</h3>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted/60">Views</span>
      </div>
      {rows.length === 0 ? (
        <p className="text-xs text-muted py-6 text-center">{emptyLabel}</p>
      ) : (
        <div className="space-y-1">
          {rows.slice(0, 8).map((row) => (
            <div key={row.label} className="relative flex items-center justify-between rounded-xl px-3 py-2 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-primary/10 rounded-xl"
                style={{ width: maxViews > 0 ? `${(row.views / maxViews) * 100}%` : "0%" }}
              />
              <span className="relative text-xs font-semibold text-foreground truncate pr-4">
                {formatLabel ? formatLabel(row.label) : row.label}
              </span>
              <span className="relative text-xs font-mono text-muted shrink-0">
                {row.views.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
