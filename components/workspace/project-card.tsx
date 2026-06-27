import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, GitBranch, Globe, GitPullRequest } from "lucide-react"

export function ProjectCard() {
  return (
    <Card className="mb-8 overflow-hidden relative border-primary/16 bg-surface">
      {/* Decorative gradient background matching brand */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="success" className="px-3 py-1 font-mono uppercase text-[9px] tracking-wider rounded-full">
                In Progress
              </Badge>
              <span className="text-[10px] font-bold font-mono tracking-widest text-muted uppercase">
                Sprint 4
              </span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Triodev AI Platform
            </CardTitle>
            <CardDescription className="mt-1.5 text-sm text-muted max-w-xl">
              Core platform architecture and AI agent integrations.
            </CardDescription>
          </div>
          
          <div className="flex items-center -space-x-2">
            <Avatar className="border-2 border-surface w-8 h-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=1" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-surface w-8 h-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=2" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <Avatar className="border-2 border-surface w-8 h-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=3" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-surface bg-secondary text-[10px] font-bold z-10 text-muted">
              +2
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2.5">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-muted">
              Sprint Progress
            </span>
            <span className="text-sm font-bold text-foreground">68%</span>
          </div>
          <Progress value={68} className="h-2 rounded-full" />
          <div className="flex justify-between items-center mt-2.5 text-xs text-muted font-medium">
            <span>Started May 1</span>
            <span>Est. Delivery: May 14</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-primary/10 bg-secondary/30">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold font-mono tracking-wider text-muted uppercase">
              <GitPullRequest className="w-3.5 h-3.5 text-primary" />
              Latest Deployment
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-foreground">v1.2.4-beta</div>
                <div className="text-xs text-muted mt-1 font-mono">Deployed 2 hours ago</div>
              </div>
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 rounded-full px-2.5">
                Stable
              </Badge>
            </div>
          </div>
          
          <div className="p-5 rounded-2xl border border-primary/10 bg-secondary/30">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold font-mono tracking-wider text-muted uppercase">
              <Globe className="w-3.5 h-3.5 text-primary" />
              Environment
            </div>
            <div className="flex items-center justify-between">
              <div className="font-semibold text-sm text-foreground">Production</div>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-3">
                View <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-secondary/20 border-t border-primary/10 px-6 py-4 flex justify-between items-center relative z-10">
        <Button variant="outline" size="sm" className="gap-2">
          <GitBranch className="w-3.5 h-3.5 text-primary" />
          Repository
        </Button>
        <Button size="sm">
          View Project Details
        </Button>
      </CardFooter>
    </Card>
  )
}
