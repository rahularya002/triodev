import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning"

const statusMap: Record<string, { label: string; variant: StatusVariant }> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  archived: { label: "Archived", variant: "secondary" },
  "in-progress": { label: "In Progress", variant: "success" },
  "in-development": { label: "In Development", variant: "success" },
  "under-review": { label: "Under Review", variant: "warning" },
  submitted: { label: "Submitted", variant: "outline" },
  declined: { label: "Declined", variant: "destructive" },
  upcoming: { label: "Upcoming", variant: "outline" },
  overdue: { label: "Overdue", variant: "destructive" },
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  open: { label: "Open", variant: "warning" },
  resolved: { label: "Resolved", variant: "success" },
  closed: { label: "Closed", variant: "secondary" },
  done: { label: "Done", variant: "success" },
  todo: { label: "To Do", variant: "outline" },
  review: { label: "Review", variant: "warning" },
  backlog: { label: "Backlog", variant: "secondary" },
  bug: { label: "Bug", variant: "destructive" },
  design: { label: "Design", variant: "outline" },
  feature: { label: "Feature", variant: "outline" },
  deployment: { label: "Deployment", variant: "warning" },
  final: { label: "Final", variant: "default" },
  "revision-requested": { label: "Revision Requested", variant: "warning" },
  "on-hold": { label: "On Hold", variant: "secondary" },
  accepted: { label: "Accepted", variant: "success" },
  "changes-requested": { label: "Changes Requested", variant: "warning" },
  change: { label: "Change", variant: "outline" },
  emergency: { label: "Emergency", variant: "destructive" },
  low: { label: "Low", variant: "secondary" },
  medium: { label: "Medium", variant: "outline" },
  high: { label: "High", variant: "warning" },
  urgent: { label: "Urgent", variant: "destructive" },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusMap[status] ?? { label: status, variant: "outline" as StatusVariant }
  return (
    <Badge
      variant={config.variant}
      className={cn("px-3 py-1 font-mono uppercase text-[9px] tracking-wider rounded-full", className)}
    >
      {config.label}
    </Badge>
  )
}
