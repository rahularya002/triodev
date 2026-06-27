import { Card } from "@/components/ui/card"
import { FolderKanban, Inbox, FileText, Calendar } from "lucide-react"

const stats = [
  {
    label: "Active Projects",
    value: "2",
    icon: FolderKanban,
    trend: "On track",
    trendColor: "text-primary"
  },
  {
    label: "Pending Requests",
    value: "4",
    icon: Inbox,
    trend: "2 require review",
    trendColor: "text-amber-600 dark:text-amber-400"
  },
  {
    label: "Open Invoices",
    value: "$12,400",
    icon: FileText,
    trend: "Due in 14 days",
    trendColor: "text-muted"
  },
  {
    label: "Upcoming Meetings",
    value: "1",
    icon: Calendar,
    trend: "Today at 2:00 PM",
    trendColor: "text-blue-600 dark:text-blue-400"
  }
]

export function WelcomeHeader() {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div>
        <span className="text-[10px] tracking-[0.2em] text-primary font-mono uppercase font-bold">
          Workspace Overview
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground mt-1">
          Good Morning, Rahul 👋
        </h1>
        <p className="text-sm text-muted mt-2 max-w-xl">
          Welcome back to your studio dashboard. Here is a summary of active work streams and pending items.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 flex flex-col justify-between h-36 bg-surface border-primary/10 shadow-sm hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                {stat.label}
              </span>
              <div className="p-2 bg-secondary rounded-2xl border border-primary/10">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className={`text-[10px] tracking-wider font-semibold uppercase mt-1 ${stat.trendColor}`}>
                {stat.trend}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
