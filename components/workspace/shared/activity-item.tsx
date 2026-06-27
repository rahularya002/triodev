import { CheckCircle2, Rocket, Settings, AlertCircle } from "lucide-react"
import type { Activity } from "@/lib/workspace/types"
import { cn } from "@/lib/utils"

const activityConfig = {
  success: { icon: CheckCircle2, iconBg: "bg-emerald-500/15", iconColor: "text-emerald-600 dark:text-emerald-400" },
  info: { icon: Rocket, iconBg: "bg-purple-500/15", iconColor: "text-purple-600 dark:text-purple-400" },
  warning: { icon: AlertCircle, iconBg: "bg-amber-500/15", iconColor: "text-amber-600 dark:text-amber-400" },
  default: { icon: Settings, iconBg: "bg-secondary border border-primary/10", iconColor: "text-muted" },
}

interface ActivityItemProps {
  activity: Activity
  isLast?: boolean
}

export function ActivityItem({ activity, isLast }: ActivityItemProps) {
  const config = activityConfig[activity.type]
  const Icon = config.icon

  return (
    <div className="flex gap-4 mb-6 last:mb-0 relative">
      {!isLast && (
        <div className="absolute top-8 left-4 bottom-[-16px] w-px bg-primary/10" />
      )}
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10", config.iconBg)}>
        <Icon className={cn("w-3.5 h-3.5", config.iconColor)} />
      </div>
      <div className="pt-1 flex-1">
        <p className="text-xs font-semibold text-foreground leading-normal">{activity.title}</p>
        <p className="text-[10px] font-mono text-muted mt-0.5">{activity.time}</p>
      </div>
    </div>
  )
}
