import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AvatarGroup } from "./avatar-group"
import type { Meeting } from "@/lib/workspace/types"
import { format, parseISO } from "date-fns"
import { Calendar, Clock, Video, FileText } from "lucide-react"

interface MeetingCardProps {
  meeting: Meeting
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <Card className="border-primary/16 bg-surface">
      <CardContent className="p-5">
        <h4 className="font-bold text-foreground text-sm tracking-tight mb-3">{meeting.title}</h4>
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{format(parseISO(meeting.date), "EEEE, MMM d")}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{meeting.startTime} - {meeting.endTime}</span>
          </div>
          {meeting.agenda && (
            <div className="flex items-start gap-2.5 text-xs text-muted mt-2 bg-secondary/30 p-3.5 rounded-xl border border-primary/10">
              <FileText className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <span className="leading-relaxed line-clamp-2">{meeting.agenda}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <AvatarGroup members={meeting.attendees} max={3} size="sm" />
          {!meeting.isPast && meeting.meetUrl && (
            <Button size="sm" className="gap-1.5">
              <Video className="w-3.5 h-3.5" /> Join
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
