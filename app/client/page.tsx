import { PageHeader, MetricCard, ActivityItem } from "@/components/workspace/shared"
import { ClientProjectCard } from "@/components/client/shared"
import {
  clientCompany,
  activeClientProjects,
  pendingApprovals,
  upcomingMeetings,
  invoices,
  activities,
} from "@/lib/client/data"
import { FolderKanban, TrendingUp, Video, CheckCircle2, Receipt, PlusCircle, FileText, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

const quickActions = [
  { name: "Request Project", href: "/client/request", icon: PlusCircle },
  { name: "View Proposals", href: "/client/proposals", icon: FileText },
  { name: "Send Message", href: "/client/messages", icon: MessageSquare },
  { name: "Book Meeting", href: "/client/meetings", icon: Calendar },
]

export default function ClientHomePage() {
  const avgProgress = Math.round(
    activeClientProjects.reduce((s, p) => s + p.progress, 0) / activeClientProjects.length
  )
  const pendingInvoice = invoices.find((i) => i.status === "pending")
  const nextMeeting = upcomingMeetings[0]

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title={`Welcome Back, ${clientCompany.contactName.split(" ")[0]}`}
        description={`${clientCompany.name} — Here is an overview of your projects with Triodev.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard label="Active Projects" value={String(activeClientProjects.length)} icon={FolderKanban} trend="In progress" trendColor="text-primary" />
        <MetricCard label="Project Progress" value={`${avgProgress}%`} icon={TrendingUp} trend="Average across projects" trendColor="text-primary" />
        <MetricCard label="Upcoming Meeting" value={nextMeeting ? "1" : "0"} icon={Video} trend={nextMeeting ? "Today at 2:00 PM" : "None scheduled"} trendColor="text-blue-600 dark:text-blue-400" />
        <MetricCard label="Pending Approval" value={String(pendingApprovals.length)} icon={CheckCircle2} trend="Requires your review" trendColor="text-amber-600 dark:text-amber-400" />
        <MetricCard label="Outstanding Invoice" value={pendingInvoice ? `$${pendingInvoice.amount.toLocaleString()}` : "$0"} icon={Receipt} trend={pendingInvoice ? "Due soon" : "All paid"} trendColor="text-muted" />
      </div>

      <div className="mb-8">
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted font-mono mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/20 bg-surface text-xs font-semibold tracking-wider uppercase hover:scale-[1.02] hover:bg-secondary hover:border-primary/45 transition-all duration-200 shadow-[0_4px_12px_-6px_rgba(0,0,0,0.03)] text-foreground"
            >
              <action.icon className="w-3.5 h-3.5 text-primary" />
              {action.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted font-mono mb-4">Active Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeClientProjects.map((project) => (
              <ClientProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted font-mono mb-4">Recent Activity</h3>
          <div className="rounded-3xl border border-primary/16 bg-surface p-5">
            {activities.slice(0, 6).map((a, i) => (
              <ActivityItem key={a.id} activity={a} isLast={i === 5} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
