import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  trendColor?: string
}

export function MetricCard({ label, value, icon: Icon, trend, trendColor = "text-muted" }: MetricCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between h-36 bg-surface border-primary/10 shadow-sm hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
      <div className="flex justify-between items-start">
        <span className="text-xs font-mono uppercase tracking-widest text-muted">{label}</span>
        <div className="p-2 bg-secondary rounded-2xl border border-primary/10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        {trend && (
          <div className={cn("text-[10px] tracking-wider font-semibold uppercase mt-1", trendColor)}>
            {trend}
          </div>
        )}
      </div>
    </Card>
  )
}
