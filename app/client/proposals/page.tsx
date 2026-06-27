"use client"

import { useState } from "react"
import { PageHeader } from "@/components/workspace/shared"
import { ProposalCard } from "@/components/client/shared"
import { proposals } from "@/lib/client/data"
import type { Proposal } from "@/lib/client/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/workspace/shared"
import { format, parseISO } from "date-fns"
import { Download, CheckCircle2, MessageSquare } from "lucide-react"

export default function ClientProposalsPage() {
  const [selected, setSelected] = useState<Proposal | null>(null)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="Proposals"
        description="Review project proposals, scope, and pricing from the Triodev team."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} onView={() => setSelected(proposal)} />
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusBadge status={selected.status === "changes-requested" ? "under-review" : selected.status} />
                <span className="text-2xl font-bold">${selected.totalAmount.toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted font-mono">
                Timeline: {selected.timeline} • Valid until {format(parseISO(selected.validUntil), "MMM d, yyyy")}
              </div>
              <div>
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-muted mb-2">Scope</div>
                <ul className="space-y-2">
                  {selected.scope.map((item, i) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-primary">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold font-mono uppercase tracking-wider text-muted mb-2">Pricing Breakdown</div>
                {selected.pricing.map((p, i) => (
                  <div key={i} className="flex justify-between p-3 rounded-xl border border-primary/10 bg-secondary/30 mb-2 text-sm">
                    <span>{p.item}</span>
                    <span className="font-semibold">${p.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Download PDF</Button>
              {selected.status === "pending" && (
                <>
                  <Button variant="outline" size="sm" className="gap-2"><MessageSquare className="w-4 h-4" /> Request Changes</Button>
                  <Button size="sm" className="gap-2"><CheckCircle2 className="w-4 h-4" /> Accept Proposal</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
