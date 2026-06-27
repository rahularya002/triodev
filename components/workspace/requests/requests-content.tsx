"use client"

import { useState } from "react"
import { PageHeader, MetricCard, FeatureCard, SearchBar, FilterBar } from "@/components/workspace/shared"
import { featureRequests as initialRequests } from "@/lib/workspace/data/feature-requests"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Lightbulb, Clock, CheckCircle2 } from "lucide-react"

export function RequestsContent() {
  const [requests, setRequests] = useState(initialRequests)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = requests.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleVote = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, votes: r.hasVoted ? r.votes - 1 : r.votes + 1, hasVoted: !r.hasVoted }
          : r
      )
    )
  }

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Feature Requests"
        description="Submit, vote on, and track feature requests for your projects."
        actions={
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 h-8 rounded-full px-4 text-[10px] font-semibold tracking-wider uppercase bg-primary text-background shadow-sm hover:brightness-110">
              <Lightbulb className="w-4 h-4" /> Create Request
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Feature Request</DialogTitle>
                <DialogDescription>Describe the feature you would like to see implemented.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Feature title" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the feature..." className="mt-2" rows={4} />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select id="priority" className="mt-2">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setCreateOpen(false)}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Total Requests" value={String(requests.length)} icon={Lightbulb} trend="All time" trendColor="text-muted" />
        <MetricCard label="In Development" value={String(requests.filter((r) => r.status === "in-development").length)} icon={Clock} trend="Active work" trendColor="text-primary" />
        <MetricCard label="Completed" value={String(requests.filter((r) => r.status === "completed").length)} icon={CheckCircle2} trend="Shipped" trendColor="text-emerald-600 dark:text-emerald-400" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search requests..." className="flex-1" />
        <FilterBar
          options={[
            { label: "All", value: "all" },
            { label: "Submitted", value: "submitted" },
            { label: "Under Review", value: "under-review" },
            { label: "In Development", value: "in-development" },
            { label: "Completed", value: "completed" },
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((request) => (
          <FeatureCard key={request.id} request={request} onVote={() => handleVote(request.id)} />
        ))}
      </div>
    </div>
  )
}
