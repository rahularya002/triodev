import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader, StatusBadge, AvatarGroup, ProgressIndicator, TimelineCard, ActivityItem, FileCard } from "@/components/workspace/shared"
import { getProjectById } from "@/lib/workspace/data/projects"
import { getMilestonesByProject } from "@/lib/workspace/data/milestones"
import { activities } from "@/lib/workspace/data/activities"
import { files } from "@/lib/workspace/data/files"
import { format, parseISO } from "date-fns"
import { ArrowLeft, GitBranch, Globe, ExternalLink } from "lucide-react"

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params
  const project = getProjectById(id)
  if (!project) notFound()

  const milestones = getMilestonesByProject(id)
  const projectFiles = files.slice(0, 4)

  return (
    <div className="pb-20">
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <PageHeader
        eyebrow={project.sprint}
        title={project.name}
        description={project.description}
        actions={<StatusBadge status={project.status === "active" ? "in-progress" : project.status} />}
      />

      <Card className="mb-8 overflow-hidden border-primary/16 bg-surface relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <CardHeader className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <AvatarGroup members={project.team} />
            <span className="text-[10px] font-mono text-muted">Last updated {project.lastUpdated}</span>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <ProgressIndicator
            label="Project Progress"
            value={project.progress}
            startLabel={`Started ${format(parseISO(project.startDate), "MMM d, yyyy")}`}
            endLabel={`Est. ${format(parseISO(project.estimatedCompletion), "MMM d, yyyy")}`}
          />
          {(project.deployment || project.environment) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {project.deployment && (
                <div className="p-5 rounded-2xl border border-primary/10 bg-secondary/30">
                  <div className="text-xs font-bold font-mono tracking-wider text-muted uppercase mb-3">Latest Deployment</div>
                  <div className="font-semibold text-sm">{project.deployment.version}</div>
                  <div className="text-xs text-muted mt-1 font-mono">{project.deployment.deployedAt}</div>
                </div>
              )}
              {project.environment && (
                <div className="p-5 rounded-2xl border border-primary/10 bg-secondary/30">
                  <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-wider text-muted uppercase mb-3">
                    <Globe className="w-3.5 h-3.5 text-primary" /> Environment
                  </div>
                  <div className="font-semibold text-sm">{project.environment}</div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        {project.repository && (
          <CardFooter className="border-t border-primary/10 relative z-10">
            <Button variant="outline" size="sm" className="gap-2">
              <GitBranch className="w-3.5 h-3.5" /> Repository
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 ml-2">
              View Live <ExternalLink className="w-3 h-3" />
            </Button>
          </CardFooter>
        )}
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Milestones</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {milestones.map((m, i) => (
                <TimelineCard key={m.id} milestone={m} isLast={i === milestones.length - 1} />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Team</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {project.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 rounded-2xl border border-primary/10 bg-secondary/30">
                  <AvatarGroup members={[member]} max={1} />
                  <div>
                    <div className="text-sm font-semibold">{member.name}</div>
                    <div className="text-[10px] font-mono text-muted uppercase">{member.role}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {activities.slice(0, 5).map((a, i) => (
                <ActivityItem key={a.id} activity={a} isLast={i === 4} />
              ))}
            </CardContent>
          </Card>
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Files</CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-primary/10">
              {projectFiles.map((file) => (
                <FileCard key={file.id} file={file} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
