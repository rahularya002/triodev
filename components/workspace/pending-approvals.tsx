import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

const approvals = [
  {
    id: 1,
    title: "Approve Dashboard UI",
    type: "Design",
    requestedBy: "Design Team",
    date: "Today",
    urgent: true
  },
  {
    id: 2,
    title: "Authentication API Specs",
    type: "Development",
    requestedBy: "Backend Team",
    date: "Yesterday",
    urgent: false
  }
]

export function PendingApprovals() {
  return (
    <Card className="h-full flex flex-col border-primary/16 bg-surface">
      <CardHeader className="pb-3 border-b border-primary/10">
        <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-primary" />
          Pending Approvals
          <span className="ml-auto bg-primary/10 text-primary text-[9px] font-mono py-0.5 px-2 rounded-full font-bold">
            2 Items
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-4">
          {approvals.map((approval) => (
            <div key={approval.id} className="p-4 rounded-2xl border border-primary/10 bg-secondary/30 shadow-sm transition-all duration-300 hover:border-primary/20">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {approval.urgent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    )}
                    <h4 className="font-bold text-sm text-foreground">
                      {approval.title}
                    </h4>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted">
                    {approval.type} • Req by {approval.requestedBy}
                  </p>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-muted/80">
                  {approval.date}
                </span>
              </div>
              
              <div className="flex gap-2 mt-4 pt-3 border-t border-primary/10">
                <Button size="sm" className="flex-1 gap-1.5 h-8 text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" className="flex-1 gap-1.5 h-8 bg-surface text-[10px]">
                  <XCircle className="w-3.5 h-3.5" />
                  Changes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
