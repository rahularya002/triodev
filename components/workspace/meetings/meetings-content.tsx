"use client"

import { useState } from "react"
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns"
import { PageHeader, MetricCard, MeetingCard, SectionHeader } from "@/components/workspace/shared"
import { upcomingMeetings, pastMeetings, meetings } from "@/lib/workspace/data/meetings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Video, Calendar, ChevronLeft, ChevronRight, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function MeetingsContent() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1))
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const meetingDates = meetings.map((m) => parseISO(m.date))

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Meetings"
        description="Schedule, join, and review meeting notes and action items."
        actions={
          <Button size="sm" className="gap-2">
            <Calendar className="w-4 h-4" /> Book Meeting
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Upcoming" value={String(upcomingMeetings.length)} icon={Video} trend="Next: Today 2PM" trendColor="text-primary" />
        <MetricCard label="Past Meetings" value={String(pastMeetings.length)} icon={Calendar} trend="With recordings" trendColor="text-muted" />
        <MetricCard label="Action Items" value="2" icon={Link2} trend="Pending review" trendColor="text-amber-600 dark:text-amber-400" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming ({upcomingMeetings.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({pastMeetings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-6">
                {pastMeetings.map((meeting) => (
                  <div key={meeting.id}>
                    <MeetingCard meeting={meeting} />
                    {meeting.notes && (
                      <div className="mt-3 p-4 rounded-2xl border border-primary/10 bg-secondary/30">
                        <SectionHeader title="Meeting Notes" />
                        <p className="text-xs text-muted leading-relaxed">{meeting.notes}</p>
                      </div>
                    )}
                    {meeting.recordingUrl && (
                      <Button variant="outline" size="sm" className="mt-3 gap-2">
                        <Video className="w-3.5 h-3.5" /> View Recording
                      </Button>
                    )}
                    {meeting.actionItems && (
                      <div className="mt-3">
                        <SectionHeader title="Action Items" />
                        {meeting.actionItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 bg-secondary/30 mb-2">
                            <Checkbox
                              checked={checkedItems[item.id] ?? item.completed}
                              onCheckedChange={(checked) => setCheckedItems((prev) => ({ ...prev, [item.id]: checked }))}
                            />
                            <span className={cn("text-xs flex-1", (checkedItems[item.id] ?? item.completed) && "line-through text-muted")}>
                              {item.text}
                            </span>
                            {item.assignee && <span className="text-[10px] font-mono text-muted">{item.assignee}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Calendar</CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-xs font-bold font-mono text-center mb-3">{format(currentMonth, "MMMM yyyy")}</div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                  const hasMeeting = meetingDates.some((d) => isSameDay(d, day))
                  return (
                    <div
                      key={day.toISOString()}
                      className={cn(
                        "aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold",
                        hasMeeting ? "bg-primary/15 text-primary border border-primary/30" : "text-muted"
                      )}
                    >
                      {format(day, "d")}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Calendar Integration</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-4 rounded-2xl border border-primary/10 bg-secondary/30 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Google Calendar</div>
                  <div className="text-[10px] font-mono text-muted">Connected</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <Button variant="outline" size="sm" className="w-full">Connect Outlook</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
