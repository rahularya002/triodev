"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/workspace/shared/status-badge"
import type { Approval } from "@/lib/client/types"
import { CheckCircle2, XCircle, MessageSquare } from "lucide-react"

interface ApprovalCardProps {
  approval: Approval
  onApprove?: (id: string) => void
  onRequestRevision?: (id: string, comment: string) => void
}

export function ApprovalCard({ approval, onApprove, onRequestRevision }: ApprovalCardProps) {
  const [comment, setComment] = useState("")
  const [showComment, setShowComment] = useState(false)

  return (
    <Card className="border-primary/16 bg-surface">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <StatusBadge status={approval.status === "revision-requested" ? "under-review" : approval.status} />
          <StatusBadge status={approval.type} />
        </div>
        <h4 className="font-bold text-sm text-foreground mb-1">{approval.title}</h4>
        <p className="text-xs text-muted mb-3">{approval.description}</p>
        <div className="text-[10px] font-mono text-muted mb-4">
          Submitted by {approval.submittedBy} • {approval.submittedAt}
        </div>

        {approval.comments.length > 0 && (
          <div className="space-y-2 mb-4">
            {approval.comments.map((c) => (
              <div key={c.id} className="p-3 rounded-xl border border-primary/10 bg-secondary/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold">{c.author}</span>
                  <span className="text-[10px] font-mono text-muted">{c.createdAt}</span>
                </div>
                <p className="text-xs text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {approval.status === "pending" && (
          <>
            {showComment && (
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="mb-3"
                rows={2}
              />
            )}
            <div className="flex gap-2 pt-3 border-t border-primary/10">
              <Button size="sm" className="flex-1 gap-1.5" onClick={() => onApprove?.(approval.id)}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 gap-1.5"
                onClick={() => {
                  if (!showComment) setShowComment(true)
                  else onRequestRevision?.(approval.id, comment)
                }}
              >
                <XCircle className="w-3.5 h-3.5" /> Request Revision
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowComment(!showComment)}>
                <MessageSquare className="w-3.5 h-3.5" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
