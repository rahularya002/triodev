"use client"

import { useState } from "react"
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns"
import { PageHeader, MetricCard, MeetingCard, SectionHeader } from "@/components/workspace/shared"
import { upcomingMeetings, pastMeetings, meetings } from "@/lib/client/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Video, Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ClientMeetingsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1))
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const meetingDates = meetings.map((m) => parseISO(m.date))

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="Meetings"
        description="View upcoming meetings, past notes, and request new sessions with your team."
        actions={
          <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
            <DialogTrigger className="inline-flex items-center justify-center gap-2 h-8 rounded-full px-4 text-[10px] font-semibold tracking-wider uppercase bg-primary text-background shadow-sm hover:brightness-110">
              <Plus className="w-4 h-4" /> Schedule Meeting
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Meeting Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div><Label htmlFor="meeting-title">Topic</Label><Input id="meeting-title" placeholder="Meeting topic" className="mt-2" /></div>
                <div><Label htmlFor="meeting-date">Preferred Date</Label><Input id="meeting-date" type="date" className="mt-2" /></div>
                <div><Label htmlFor="meeting-notes">Notes</Label><Textarea id="meeting-notes" placeholder="What would you like to discuss?" className="mt-2" rows={3} /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" size="sm" onClick={() => setScheduleOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setScheduleOpen(false)}>Send Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <MetricCard label="Upcoming" value={String(upcomingMeetings.length)} icon={Video} trend="Next: Today 2PM" trendColor="text-primary" />
        <MetricCard label="Past Meetings" value={String(pastMeetings.length)} icon={Calendar} trend="With recordings" trendColor="text-muted" />
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
                {upcomingMeetings.map((m) => <MeetingCard key={m.id} meeting={m} />)}
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
                    {meeting.actionItems && (
                      <div className="mt-3">
                        <SectionHeader title="Action Items" />
                        {meeting.actionItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-primary/10 bg-secondary/30 mb-2">
                            <Checkbox checked={checkedItems[item.id] ?? item.completed} onCheckedChange={(c) => setCheckedItems((p) => ({ ...p, [item.id]: c }))} />
                            <span className={cn("text-xs flex-1", (checkedItems[item.id] ?? item.completed) && "line-through text-muted")}>{item.text}</span>
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
        <Card className="border-primary/16 bg-surface h-fit">
          <CardHeader className="border-b border-primary/10 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Calendar</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft className="w-3.5 h-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight className="w-3.5 h-3.5" /></Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-xs font-bold font-mono text-center mb-3">{format(currentMonth, "MMMM yyyy")}</div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const hasMeeting = meetingDates.some((d) => isSameDay(d, day))
                return (
                  <div key={day.toISOString()} className={cn("aspect-square rounded-lg flex items-center justify-center text-[10px] font-semibold", hasMeeting ? "bg-primary/15 text-primary border border-primary/30" : "text-muted")}>
                    {format(day, "d")}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
