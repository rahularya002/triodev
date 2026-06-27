import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import type { Invoice } from "@/lib/workspace/types"
import { format, parseISO } from "date-fns"
import { Download, CreditCard } from "lucide-react"

interface InvoiceCardProps {
  invoice: Invoice
  onView?: () => void
}

export function InvoiceCard({ invoice, onView }: InvoiceCardProps) {
  return (
    <Card className="border-primary/16 bg-surface flex flex-col h-full">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
            {invoice.number}
          </span>
          <StatusBadge status={invoice.status} />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground mb-1">{invoice.title}</h3>
        <div className="text-2xl font-bold text-foreground mt-3">
          ${invoice.amount.toLocaleString()}
        </div>
        <div className="flex items-center gap-4 mt-3 text-[10px] font-mono uppercase tracking-wider text-muted">
          <span>Issued {format(parseISO(invoice.issueDate), "MMM d")}</span>
          <span>Due {format(parseISO(invoice.dueDate), "MMM d")}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-primary/10 px-6 py-3 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={onView}>
          View Details
        </Button>
        {invoice.status === "pending" && (
          <Button size="sm" className="gap-1.5">
            <CreditCard className="w-3.5 h-3.5" /> Pay
          </Button>
        )}
        {invoice.status === "paid" && (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
