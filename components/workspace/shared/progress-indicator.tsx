import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  label?: string
  value: number
  startLabel?: string
  endLabel?: string
}

export function ProgressIndicator({ label, value, startLabel, endLabel }: ProgressIndicatorProps) {
  return (
    <div>
      {(label || value !== undefined) && (
        <div className="flex justify-between items-end mb-2.5">
          {label && (
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-muted">
              {label}
            </span>
          )}
          <span className="text-sm font-bold text-foreground">{value}%</span>
        </div>
      )}
      <Progress value={value} className="h-2 rounded-full" />
      {(startLabel || endLabel) && (
        <div className="flex justify-between items-center mt-2.5 text-xs text-muted font-medium">
          {startLabel && <span>{startLabel}</span>}
          {endLabel && <span>{endLabel}</span>}
        </div>
      )}
    </div>
  )
}
