import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressIndicator } from "@/components/workspace/shared/progress-indicator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/workspace/shared/status-badge"
import type { ClientProject } from "@/lib/client/types"
import { format, parseISO } from "date-fns"
import { ArrowRight } from "lucide-react"

const phaseLabels: Record<string, string> = {
  discovery: "Discovery",
  design: "Design",
  development: "Development",
  testing: "Testing",
  deployment: "Deployment",
  maintenance: "Maintenance",
}

interface ClientProjectCardProps {
  project: ClientProject
}

export function ClientProjectCard({ project }: ClientProjectCardProps) {
  return (
    <Card className="overflow-hidden border-primary/16 bg-surface flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <StatusBadge status={project.status === "active" ? "in-progress" : project.status} />
          <span className="text-[10px] font-bold font-mono tracking-widest text-muted uppercase">
            {phaseLabels[project.currentPhase]}
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground">{project.name}</h3>
        <p className="text-xs text-muted mt-1 line-clamp-2">{project.description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ProgressIndicator
          label="Progress"
          value={project.progress}
          endLabel={`Est. ${format(parseISO(project.estimatedCompletion), "MMM d, yyyy")}`}
        />
        <div className="mt-4 p-3 rounded-2xl border border-primary/10 bg-secondary/30">
          <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-2">Team Contact</div>
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7">
              <AvatarImage src={project.teamContact.avatar} />
              <AvatarFallback>{project.teamContact.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">{project.teamContact.name}</div>
              <div className="text-[10px] font-mono text-muted">{project.teamContact.role}</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted mt-3 line-clamp-2">
          <span className="font-semibold text-foreground">Latest: </span>
          {project.latestUpdate}
        </p>
      </CardContent>
      <CardFooter className="border-t border-primary/10 pt-4">
        <Link href={`/client/projects/${project.id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full gap-2">
            View Project <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
