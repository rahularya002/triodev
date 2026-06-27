import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/workspace/shared/status-badge"
import type { Proposal } from "@/lib/client/types"
import { format, parseISO } from "date-fns"
import { Download, CheckCircle2, MessageSquare } from "lucide-react"

interface ProposalCardProps {
  proposal: Proposal
  onView?: () => void
}

export function ProposalCard({ proposal, onView }: ProposalCardProps) {
  return (
    <Card className="border-primary/16 bg-surface flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
            {proposal.projectName}
          </span>
          <StatusBadge status={proposal.status === "changes-requested" ? "under-review" : proposal.status} />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">{proposal.title}</h3>
        <div className="text-2xl font-bold text-foreground mb-3">
          ${proposal.totalAmount.toLocaleString()}
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-muted">
          <span>{proposal.timeline}</span>
          <span>Valid until {format(parseISO(proposal.validUntil), "MMM d")}</span>
        </div>
        <ul className="mt-4 space-y-1">
          {proposal.scope.slice(0, 3).map((item, i) => (
            <li key={i} className="text-xs text-muted flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              {item}
            </li>
          ))}
          {proposal.scope.length > 3 && (
            <li className="text-[10px] font-mono text-muted">+{proposal.scope.length - 3} more items</li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="border-t border-primary/10 px-6 py-3 flex gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={onView}>
          Review Scope
        </Button>
        {proposal.status === "pending" && (
          <>
            <Button size="sm" className="gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Accept
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
            </Button>
          </>
        )}
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Download className="w-3.5 h-3.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
