"use client"

import { useState } from "react"
import { PageHeader, MetricCard } from "@/components/workspace/shared"
import { ApprovalCard } from "@/components/client/shared"
import { approvals as initialApprovals } from "@/lib/client/data"
import type { Approval } from "@/lib/client/types"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export default function ClientApprovalsPage() {
  const [items, setItems] = useState<Approval[]>(initialApprovals)

  const handleApprove = (id: string) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status: "approved" as const } : a)))
  }

  const handleRevision = (id: string, comment: string) => {
    setItems((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "revision-requested" as const,
              comments: [
                ...a.comments,
                { id: `c-${Date.now()}`, author: "Rahul Client", text: comment, createdAt: "Just now" },
              ],
            }
          : a
      )
    )
  }

  const pending = items.filter((a) => a.status === "pending").length
  const approved = items.filter((a) => a.status === "approved").length
  const revision = items.filter((a) => a.status === "revision-requested").length

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="Approvals"
        description="Review and approve designs, features, deployments, and final deliverables."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Pending" value={String(pending)} icon={Clock} trend="Awaiting review" trendColor="text-amber-600 dark:text-amber-400" />
        <MetricCard label="Approved" value={String(approved)} icon={CheckCircle2} trend="Completed" trendColor="text-emerald-600 dark:text-emerald-400" />
        <MetricCard label="Revisions" value={String(revision)} icon={AlertCircle} trend="Changes requested" trendColor="text-muted" />
      </div>

      <div className="space-y-4">
        {items.map((approval) => (
          <ApprovalCard
            key={approval.id}
            approval={approval}
            onApprove={handleApprove}
            onRequestRevision={handleRevision}
          />
        ))}
      </div>
    </div>
  )
}
