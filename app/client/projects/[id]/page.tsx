import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader, ProgressIndicator, StatusBadge } from "@/components/workspace/shared"
import { PhaseTimeline } from "@/components/client/shared"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getClientProjectById, getPhasesByProject } from "@/lib/client/data"
import { format, parseISO } from "date-fns"
import { ArrowLeft } from "lucide-react"

interface Props {
  params: Promise<{ id: string }>
}

const phaseLabels: Record<string, string> = {
  discovery: "Discovery",
  design: "Design",
  development: "Development",
  testing: "Testing",
  deployment: "Deployment",
  maintenance: "Maintenance",
}

export default async function ClientProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = getClientProjectById(id)
  if (!project) notFound()

  const phases = getPhasesByProject(id)

  return (
    <div className="pb-20">
      <Link href="/client/projects" className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to My Projects
      </Link>

      <PageHeader
        eyebrow={phaseLabels[project.currentPhase]}
        title={project.name}
        description={project.description}
        actions={<StatusBadge status={project.status === "active" ? "in-progress" : project.status} />}
      />

      <Card className="mb-8 border-primary/16 bg-surface">
        <CardContent className="p-6">
          <ProgressIndicator
            label="Project Progress"
            value={project.progress}
            startLabel={`Started ${format(parseISO(project.startDate), "MMM d, yyyy")}`}
            endLabel={`Est. ${format(parseISO(project.estimatedCompletion), "MMM d, yyyy")}`}
          />
          <div className="mt-6 p-5 rounded-2xl border border-primary/10 bg-secondary/30">
            <div className="text-xs font-bold font-mono tracking-wider text-muted uppercase mb-3">Latest Update</div>
            <p className="text-sm text-foreground">{project.latestUpdate}</p>
          </div>
          <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl border border-primary/10 bg-secondary/30">
            <Avatar className="w-10 h-10">
              <AvatarImage src={project.teamContact.avatar} />
              <AvatarFallback>{project.teamContact.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">{project.teamContact.name}</div>
              <div className="text-[10px] font-mono text-muted uppercase">{project.teamContact.role} — Your Team Contact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {phases.length > 0 && (
        <Card className="border-primary/16 bg-surface">
          <CardHeader className="border-b border-primary/10">
            <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Project Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <PhaseTimeline phases={phases} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
