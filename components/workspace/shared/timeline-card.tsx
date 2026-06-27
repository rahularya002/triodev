import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"
import type { Milestone } from "@/lib/workspace/types"
import { format, parseISO } from "date-fns"
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineCardProps {
  milestone: Milestone
  isLast?: boolean
}

const statusIcons = {
  completed: { icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/15" },
  "in-progress": { icon: Clock, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/15" },
  upcoming: { icon: Circle, color: "text-muted", bg: "bg-secondary border border-primary/10" },
  overdue: { icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-500/15" },
}

export function TimelineCard({ milestone, isLast }: TimelineCardProps) {
  const config = statusIcons[milestone.status]
  const Icon = config.icon

  return (
    <div className="flex gap-4 relative">
      {!isLast && (
        <div className="absolute top-10 left-4 bottom-0 w-px bg-primary/10" />
      )}
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10", config.bg)}>
        <Icon className={cn("w-3.5 h-3.5", config.color)} />
      </div>
      <Card className="flex-1 mb-4 border-primary/10 bg-surface hover:border-primary/20 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-bold text-sm text-foreground">{milestone.title}</h4>
            <StatusBadge status={milestone.status} />
          </div>
          <p className="text-xs text-muted mb-3">{milestone.description}</p>
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-muted">
            <span>Due {format(parseISO(milestone.dueDate), "MMM d, yyyy")}</span>
            {milestone.sprint && <span>{milestone.sprint}</span>}
            {milestone.dependencies && milestone.dependencies.length > 0 && (
              <span>{milestone.dependencies.length} dependencies</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
