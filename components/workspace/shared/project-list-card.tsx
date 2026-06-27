import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import { AvatarGroup } from "./avatar-group"
import { ProgressIndicator } from "./progress-indicator"
import type { Project } from "@/lib/workspace/types"
import { format, parseISO } from "date-fns"
import { ArrowRight } from "lucide-react"

interface ProjectListCardProps {
  project: Project
}

export function ProjectListCard({ project }: ProjectListCardProps) {
  return (
    <Card className="overflow-hidden border-primary/16 bg-surface flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <StatusBadge status={project.status === "active" ? "in-progress" : project.status} />
          <span className="text-[10px] font-bold font-mono tracking-widest text-muted uppercase">
            {project.sprint}
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground">{project.name}</h3>
        <p className="text-xs text-muted mt-1 line-clamp-2">{project.description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ProgressIndicator
          label="Progress"
          value={project.progress}
          startLabel={`Started ${format(parseISO(project.startDate), "MMM d")}`}
          endLabel={`Est. ${format(parseISO(project.estimatedCompletion), "MMM d")}`}
        />
        <div className="flex items-center justify-between mt-4">
          <AvatarGroup members={project.team} max={3} size="sm" />
          <span className="text-[10px] font-mono text-muted">Updated {project.lastUpdated}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-primary/10 pt-4">
        <Link href={`/admin/projects/${project.id}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full gap-2">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
