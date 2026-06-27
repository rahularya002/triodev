import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Calendar, Clock, FileText } from "lucide-react"

export function UpcomingMeetings() {
  return (
    <Card className="h-full flex flex-col border-primary/16 bg-surface">
      <CardHeader className="pb-3 border-b border-primary/10 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Upcoming Meetings</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted hover:bg-secondary/50 rounded-full">
          <Calendar className="w-4 h-4 text-primary" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <div className="p-5 rounded-2xl border border-primary/10 bg-secondary/30 h-full flex flex-col justify-between">
          <div className="flex-1">
            <h4 className="font-bold text-foreground text-sm tracking-tight mb-2">
              Sprint Review & Planning
            </h4>
            
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Today, Oct 15</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>2:00 PM - 3:00 PM</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-muted mt-3 bg-surface p-3.5 rounded-xl border border-primary/10">
                <FileText className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                <span className="leading-relaxed">Agenda: Review authentication flow, demo new dashboard features, and plan sprint 5 priorities.</span>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-primary/10">
            <Button className="w-full gap-2 bg-primary hover:brightness-110 text-background shadow-none border-0">
              <Video className="w-4 h-4" />
              Join Google Meet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
