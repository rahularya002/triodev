"use client"

import { useState } from "react"
import { PageHeader, MetricCard, StatusBadge, SearchBar } from "@/components/workspace/shared"
import { supportTickets } from "@/lib/workspace/data/support"
import type { SupportTicket, TicketType } from "@/lib/workspace/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LifeBuoy, Bug, RefreshCw, AlertTriangle, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

export function SupportContent() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(supportTickets[0])
  const [search, setSearch] = useState("")
  const [ticketType, setTicketType] = useState<TicketType>("bug")

  const filtered = supportTickets.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  const typeIcons = { bug: Bug, change: RefreshCw, emergency: AlertTriangle }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Support"
        description="Report bugs, request changes, or get emergency support from the Triodev team."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Open Tickets" value={String(supportTickets.filter((t) => t.status === "open" || t.status === "in-progress").length)} icon={LifeBuoy} trend="Active" trendColor="text-primary" />
        <MetricCard label="Resolved" value={String(supportTickets.filter((t) => t.status === "resolved").length)} icon={Bug} trend="This month" trendColor="text-emerald-600 dark:text-emerald-400" />
        <MetricCard label="Avg Response" value="< 2h" icon={AlertTriangle} trend="Emergency: 15min" trendColor="text-muted" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">New Ticket</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <Tabs defaultValue="bug" onValueChange={(v) => setTicketType(v as TicketType)}>
                <TabsList className="w-full">
                  <TabsTrigger value="bug" className="flex-1">Bug</TabsTrigger>
                  <TabsTrigger value="change" className="flex-1">Change</TabsTrigger>
                  <TabsTrigger value="emergency" className="flex-1">Emergency</TabsTrigger>
                </TabsList>
              </Tabs>
              <div>
                <Label htmlFor="ticket-title">Title</Label>
                <Input id="ticket-title" placeholder="Brief description" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="ticket-desc">Description</Label>
                <Textarea id="ticket-desc" placeholder="Detailed description..." className="mt-2" rows={3} />
              </div>
              <div>
                <Label htmlFor="ticket-priority">Priority</Label>
                <Select id="ticket-priority" className="mt-2">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </Select>
              </div>
              <div className="border-2 border-dashed border-primary/20 rounded-2xl p-4 text-center cursor-pointer hover:border-primary/40 transition-colors">
                <Upload className="w-5 h-5 text-muted mx-auto mb-2" />
                <p className="text-[10px] font-mono uppercase text-muted">Upload Screenshot</p>
              </div>
              <Button className="w-full gap-2" size="sm">
                {ticketType === "emergency" ? <AlertTriangle className="w-4 h-4" /> : <Bug className="w-4 h-4" />}
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          <div>
            <SearchBar value={search} onChange={setSearch} placeholder="Search tickets..." className="mb-4" />
            <div className="space-y-2">
              {filtered.map((ticket) => {
                const Icon = typeIcons[ticket.type]
                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setSelectedTicket(ticket)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-colors",
                      selectedTicket?.id === ticket.id
                        ? "border-primary/30 bg-secondary/50"
                        : "border-primary/10 bg-surface hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <StatusBadge status={ticket.status} />
                      <StatusBadge status={ticket.priority} />
                    </div>
                    <div className="text-sm font-semibold">{ticket.title}</div>
                    <div className="text-[10px] font-mono text-muted mt-1">{ticket.updatedAt}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="xl:col-span-2">
          {selectedTicket && (
            <Card className="border-primary/16 bg-surface h-full">
              <CardHeader className="border-b border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={selectedTicket.status} />
                  <StatusBadge status={selectedTicket.priority} />
                  <StatusBadge status={selectedTicket.type} />
                </div>
                <CardTitle className="text-lg">{selectedTicket.title}</CardTitle>
                <p className="text-xs text-muted">{selectedTicket.description}</p>
              </CardHeader>
              <CardContent className="p-5">
                <div className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase mb-4">Conversation</div>
                <div className="space-y-4">
                  {selectedTicket.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "p-4 rounded-2xl border max-w-[85%]",
                        msg.isStaff
                          ? "bg-secondary/30 border-primary/10 ml-0"
                          : "bg-primary/5 border-primary/20 ml-auto"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold">{msg.author}</span>
                        <span className="text-[10px] font-mono text-muted">{msg.createdAt}</span>
                      </div>
                      <p className="text-sm text-foreground">{msg.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <Input placeholder="Reply to ticket..." className="flex-1" />
                  <Button size="sm">Send</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
