import { CheckCircle2, Circle, Clock } from "lucide-react"
import type { ProjectPhase } from "@/lib/client/types"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/15" },
  "in-progress": { icon: Clock, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/15" },
  upcoming: { icon: Circle, color: "text-muted", bg: "bg-secondary border border-primary/10" },
}

interface PhaseTimelineProps {
  phases: ProjectPhase[]
}

export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="space-y-0">
      {phases.map((phase, i) => {
        const config = statusConfig[phase.status]
        const Icon = config.icon
        const isLast = i === phases.length - 1

        return (
          <div key={phase.id} className="flex gap-4 relative">
            {!isLast && (
              <div className="absolute top-10 left-4 bottom-0 w-px bg-primary/10" />
            )}
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10", config.bg)}>
              <Icon className={cn("w-3.5 h-3.5", config.color)} />
            </div>
            <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
              <div className="p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-sm text-foreground">{phase.label}</h4>
                  <span className="text-sm font-bold text-foreground">{phase.progress}%</span>
                </div>
                <Progress value={phase.progress} className="h-1.5 rounded-full mb-2" />
                <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-muted">
                  <span>Expected {format(parseISO(phase.expectedDate), "MMM d, yyyy")}</span>
                  {phase.endDate && (
                    <span>Completed {format(parseISO(phase.endDate), "MMM d")}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
