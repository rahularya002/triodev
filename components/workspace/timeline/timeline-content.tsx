"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns"
import { PageHeader, MetricCard, TimelineCard } from "@/components/workspace/shared"
import { milestones } from "@/lib/workspace/data/milestones"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProgressIndicator } from "@/components/workspace/shared"
import { Target, Calendar, ChevronLeft, ChevronRight, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function TimelineContent() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 1))

  const completed = milestones.filter((m) => m.status === "completed").length
  const inProgress = milestones.filter((m) => m.status === "in-progress").length
  const upcoming = milestones.filter((m) => m.status === "upcoming").length

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const milestoneDates = milestones.map((m) => parseISO(m.dueDate))

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Timeline"
        description="Track milestones, sprint progress, deadlines, and project dependencies."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Completed" value={String(completed)} icon={Target} trend="On schedule" trendColor="text-emerald-600 dark:text-emerald-400" />
        <MetricCard label="In Progress" value={String(inProgress)} icon={Target} trend="Sprint 4" trendColor="text-primary" />
        <MetricCard label="Upcoming" value={String(upcoming)} icon={Calendar} trend="Next 30 days" trendColor="text-muted" />
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="mb-6">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
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
                  <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">Sprint Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <ProgressIndicator label="Sprint 4" value={68} startLabel="May 1" endLabel="Jun 14" />
                </CardContent>
              </Card>
              <Card className="border-primary/16 bg-surface">
                <CardHeader className="border-b border-primary/10">
                  <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase flex items-center gap-2">
                    <Link2 className="w-3.5 h-3.5" /> Dependencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {milestones.filter((m) => m.dependencies?.length).map((m) => (
                    <div key={m.id} className="p-3 rounded-2xl border border-primary/10 bg-secondary/30">
                      <div className="text-sm font-semibold">{m.title}</div>
                      <div className="text-[10px] font-mono text-muted mt-1">
                        Depends on {m.dependencies!.length} milestone{m.dependencies!.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="border-primary/16 bg-surface">
            <CardHeader className="border-b border-primary/10 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase">
                {format(currentMonth, "MMMM yyyy")}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-[10px] font-mono uppercase tracking-wider text-muted py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {days.map((day) => {
                  const hasMilestone = milestoneDates.some((d) => isSameDay(d, day))
                  const dayMilestones = milestones.filter((m) => isSameDay(parseISO(m.dueDate), day))
                  return (
                    <div
                      key={day.toISOString()}
                      className={cn(
                        "aspect-square rounded-xl border p-1 text-center transition-colors",
                        isSameMonth(day, currentMonth) ? "border-primary/10 bg-secondary/20" : "opacity-30",
                        hasMilestone && "border-primary/30 bg-primary/5"
                      )}
                    >
                      <span className="text-xs font-semibold">{format(day, "d")}</span>
                      {dayMilestones.slice(0, 1).map((m) => (
                        <div key={m.id} className="text-[8px] font-mono text-primary truncate mt-0.5">{m.title.split(" ")[0]}</div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
