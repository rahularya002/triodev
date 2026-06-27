import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "./status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { FeatureRequest } from "@/lib/workspace/types"
import { ChevronUp, MessageSquare, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  request: FeatureRequest
  onVote?: () => void
}

export function FeatureCard({ request, onVote }: FeatureCardProps) {
  return (
    <Card className="border-primary/16 bg-surface">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onVote}
            className={cn(
              "flex flex-col items-center justify-center w-12 h-16 rounded-2xl border shrink-0 transition-colors",
              request.hasVoted
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-secondary/30 border-primary/10 text-muted hover:border-primary/20"
            )}
          >
            <ChevronUp className="w-4 h-4" />
            <span className="text-sm font-bold">{request.votes}</span>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <StatusBadge status={request.status} />
              <StatusBadge status={request.priority} />
            </div>
            <h4 className="font-bold text-sm text-foreground mb-1">{request.title}</h4>
            <p className="text-xs text-muted line-clamp-2 mb-3">{request.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {request.assignedDeveloper && (
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={request.assignedDeveloper.avatar} />
                      <AvatarFallback>{request.assignedDeveloper.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-mono text-muted">{request.assignedDeveloper.name}</span>
                  </div>
                )}
                <span className="flex items-center gap-1 text-[10px] font-mono text-muted">
                  <MessageSquare className="w-3 h-3" /> {request.comments.length}
                </span>
                {request.attachments && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted">
                    <Paperclip className="w-3 h-3" /> {request.attachments}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-muted">{request.createdAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
