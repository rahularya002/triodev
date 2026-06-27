import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2, Paintbrush, Rocket, FileText, Settings } from "lucide-react"

const activities = [
  {
    title: "Authentication finished",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Design approved",
    time: "4 hours ago",
    icon: Paintbrush,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "New deployment: v1.2.4-beta",
    time: "Yesterday",
    icon: Rocket,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    title: "Invoice generated",
    time: "Yesterday",
    icon: FileText,
    iconBg: "bg-secondary border border-primary/10",
    iconColor: "text-muted"
  },
  {
    title: "Dashboard setup completed",
    time: "Oct 12",
    icon: Settings,
    iconBg: "bg-secondary border border-primary/10",
    iconColor: "text-muted"
  }
]

export function ActivityFeed() {
  return (
    <Card className="h-full flex flex-col border-primary/16 bg-surface">
      <CardHeader className="pb-3 border-b border-primary/10">
        <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-5">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-4 mb-6 last:mb-0 relative">
              {i !== activities.length - 1 && (
                <div className="absolute top-8 left-4 bottom-[-16px] w-px bg-primary/10" />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${activity.iconBg}`}>
                <activity.icon className={`w-3.5 h-3.5 ${activity.iconColor}`} />
              </div>
              <div className="pt-1 flex-1">
                <p className="text-xs font-semibold text-foreground leading-normal">
                  {activity.title}
                </p>
                <p className="text-[10px] font-mono text-muted mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
