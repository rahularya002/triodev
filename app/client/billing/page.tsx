"use client"

import { useState } from "react"
import { PageHeader, MetricCard, InvoiceCard, StatusBadge } from "@/components/workspace/shared"
import { invoices, transactionHistory } from "@/lib/client/data"
import type { Invoice } from "@/lib/client/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { format, parseISO } from "date-fns"
import { Receipt, CreditCard, AlertTriangle, Download } from "lucide-react"

export default function ClientBillingPage() {
  const [selected, setSelected] = useState<Invoice | null>(null)

  const totalPending = invoices.filter((i) => i.status === "pending").reduce((s, i) => s + i.amount, 0)
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0)
  const totalOverdue = invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.amount, 0)

  return (
    <div className="pb-20">
      <PageHeader eyebrow="Client Portal" title="Billing & Invoices" description="View invoice history, payment status, and download receipts." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Pending" value={`$${totalPending.toLocaleString()}`} icon={Receipt} trend="Due soon" trendColor="text-amber-600 dark:text-amber-400" />
        <MetricCard label="Paid" value={`$${totalPaid.toLocaleString()}`} icon={CreditCard} trend="All settled" trendColor="text-emerald-600 dark:text-emerald-400" />
        <MetricCard label="Overdue" value={`$${totalOverdue.toLocaleString()}`} icon={AlertTriangle} trend="Action required" trendColor="text-red-600 dark:text-red-400" />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>
        {(["all", "pending", "paid", "overdue"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invoices.filter((i) => tab === "all" || i.status === tab).map((inv) => (
                <InvoiceCard key={inv.id} invoice={inv} onView={() => setSelected(inv)} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8 border-primary/16 bg-surface">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-primary/10">
          {transactionHistory.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
              <div>
                <div className="text-sm font-semibold">{tx.description}</div>
                <div className="text-[10px] font-mono text-muted">{tx.date}</div>
              </div>
              <div className={`text-sm font-bold ${tx.type === "payment" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}>
                {tx.type === "payment" ? "-" : "+"}${Math.abs(tx.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{selected.title}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-muted">{selected.number}</span>
                <StatusBadge status={selected.status} />
              </div>
              <div className="text-3xl font-bold">${selected.amount.toLocaleString()}</div>
              <div className="flex gap-4 text-xs text-muted font-mono">
                <span>Issued {format(parseISO(selected.issueDate), "MMM d, yyyy")}</span>
                <span>Due {format(parseISO(selected.dueDate), "MMM d, yyyy")}</span>
              </div>
              {selected.items.map((item, i) => (
                <div key={i} className="flex justify-between p-3 rounded-xl border border-primary/10 bg-secondary/30 text-sm">
                  <span>{item.description}</span>
                  <span className="font-semibold">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" className="gap-2"><Download className="w-4 h-4" /> Download PDF</Button>
              {selected.status === "pending" && <Button size="sm" className="gap-2"><CreditCard className="w-4 h-4" /> Pay Now</Button>}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
