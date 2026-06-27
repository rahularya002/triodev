"use client"

import { useState } from "react"
import { PageHeader, SearchBar } from "@/components/workspace/shared"
import { DeliverableCard } from "@/components/client/shared"
import { deliverables } from "@/lib/client/data"
import type { Deliverable } from "@/lib/client/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Eye, Grid, List } from "lucide-react"

const categories = [
  { value: "all", label: "All" },
  { value: "design", label: "Design" },
  { value: "source", label: "Source Code" },
  { value: "apk", label: "APKs" },
  { value: "document", label: "Documents" },
  { value: "contract", label: "Contracts" },
  { value: "report", label: "Reports" },
  { value: "asset", label: "Assets" },
]

export default function ClientDeliverablesPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [preview, setPreview] = useState<Deliverable | null>(null)

  const filtered = (category: string) =>
    deliverables.filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "all" || d.category === category
      return matchesSearch && matchesCategory
    })

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="Deliverables"
        description="Access design files, source code, documents, and project assets."
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search deliverables..." className="flex-1" />
        <div className="flex gap-2">
          <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 flex-wrap">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value}>{cat.label}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            {view === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered(cat.value).map((d) => (
                  <DeliverableCard key={d.id} deliverable={d} view="grid" onClick={() => setPreview(d)} />
                ))}
              </div>
            ) : (
              <Card className="border-primary/16 bg-surface divide-y divide-primary/10">
                {filtered(cat.value).map((d) => (
                  <DeliverableCard key={d.id} deliverable={d} view="list" onClick={() => setPreview(d)} />
                ))}
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        {preview && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{preview.name}</DialogTitle>
            </DialogHeader>
            {preview.previewUrl && (
              <img src={preview.previewUrl} alt={preview.name} className="w-full rounded-2xl border border-primary/10" />
            )}
            {!preview.previewUrl && (
              <div className="h-48 rounded-2xl border border-primary/10 bg-secondary/30 flex items-center justify-center text-muted text-sm">
                Preview not available
              </div>
            )}
            <div className="flex gap-4 text-xs text-muted font-mono">
              <span>{preview.size}</span>
              <span>Uploaded {preview.uploadedAt}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="gap-2"><Download className="w-4 h-4" /> Download</Button>
              <Button variant="outline" size="sm" className="gap-2"><Eye className="w-4 h-4" /> Preview</Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
