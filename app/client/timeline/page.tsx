"use client"

import { useState } from "react"
import { PageHeader } from "@/components/workspace/shared"
import { PhaseTimeline } from "@/components/client/shared"
import { clientProjects, getPhasesByProject } from "@/lib/client/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function ClientTimelinePage() {
  const [projectId, setProjectId] = useState(clientProjects[0]?.id ?? "")
  const phases = getPhasesByProject(projectId)
  const project = clientProjects.find((p) => p.id === projectId)

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="Timeline"
        description="Track project milestones from discovery through maintenance."
      />

      <div className="mb-6 max-w-xs">
        <Label htmlFor="project">Select Project</Label>
        <Select id="project" value={projectId} onChange={(e) => setProjectId(e.target.value)} className="mt-2">
          {clientProjects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </Select>
      </div>

      <Card className="border-primary/16 bg-surface">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">
            {project?.name} — Phase Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          {phases.length > 0 ? (
            <PhaseTimeline phases={phases} />
          ) : (
            <p className="text-sm text-muted text-center py-8">No timeline data for this project.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
