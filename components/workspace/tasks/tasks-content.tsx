"use client"

import { useState, useCallback } from "react"
import { PageHeader, StatusBadge } from "@/components/workspace/shared"
import { tasks as initialTasks } from "@/lib/workspace/data/tasks"
import type { Task, TaskStatus } from "@/lib/workspace/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { MessageSquare, Paperclip, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const columns: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "Todo" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
]

const priorityColors = {
  low: "border-l-muted",
  medium: "border-l-blue-500",
  high: "border-l-amber-500",
  urgent: "border-l-red-500",
}

export function TasksContent() {
  const [tasks, setTasks] = useState(initialTasks)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleDragStart = (taskId: string) => setDraggedTask(taskId)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const handleDrop = useCallback((status: TaskStatus) => {
    if (!draggedTask) return
    setTasks((prev) => prev.map((t) => (t.id === draggedTask ? { ...t, status } : t)))
    setDraggedTask(null)
  }, [draggedTask])

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Tasks"
        description="Manage your Kanban board. Drag tasks between columns to update status."
      />

      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id)
          return (
            <div
              key={col.id}
              className="flex-shrink-0 w-72"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
            >
              <Card className="border-primary/16 bg-surface h-full">
                <CardHeader className="pb-3 border-b border-primary/10">
                  <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase flex items-center justify-between">
                    {col.label}
                    <span className="bg-primary/10 text-primary text-[9px] py-0.5 px-2 rounded-full">{colTasks.length}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 space-y-3 min-h-[400px]">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task.id)}
                      onClick={() => setSelectedTask(task)}
                      className={cn(
                        "p-4 rounded-2xl border border-primary/10 bg-secondary/30 cursor-grab active:cursor-grabbing hover:border-primary/20 transition-all border-l-4",
                        priorityColors[task.priority],
                        draggedTask === task.id && "opacity-50"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {task.labels.map((label) => (
                          <span key={label} className="text-[9px] font-mono uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {label}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">{task.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {task.assignee && (
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                            </Avatar>
                          )}
                          {task.dueDate && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-muted">
                              <Calendar className="w-3 h-3" /> {task.dueDate}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted">
                          {task.comments > 0 && (
                            <span className="flex items-center gap-0.5"><MessageSquare className="w-3 h-3" />{task.comments}</span>
                          )}
                          {task.attachments > 0 && (
                            <span className="flex items-center gap-0.5"><Paperclip className="w-3 h-3" />{task.attachments}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        {selectedTask && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask.title}</DialogTitle>
              <DialogDescription>{selectedTask.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <StatusBadge status={selectedTask.status} />
                <StatusBadge status={selectedTask.priority} />
              </div>
              {selectedTask.assignee && (
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedTask.assignee.avatar} />
                    <AvatarFallback>{selectedTask.assignee.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{selectedTask.assignee.name}</span>
                </div>
              )}
              <div className="flex gap-4 text-xs text-muted">
                <span>{selectedTask.comments} comments</span>
                <span>{selectedTask.attachments} attachments</span>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
