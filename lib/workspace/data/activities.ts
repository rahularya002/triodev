import type { Activity } from "../types"

export const activities: Activity[] = [
  { id: "a1", title: "Authentication finished", time: "2 hours ago", type: "success" },
  { id: "a2", title: "Design approved", time: "4 hours ago", type: "info" },
  { id: "a3", title: "New deployment: v1.2.4-beta", time: "Yesterday", type: "info" },
  { id: "a4", title: "Invoice generated", time: "Yesterday", type: "default" },
  { id: "a5", title: "Dashboard setup completed", time: "Oct 12", type: "default" },
  { id: "a6", title: "Sprint 3 retrospective completed", time: "May 20", type: "success" },
  { id: "a7", title: "API rate limiting deployed", time: "May 18", type: "info" },
  { id: "a8", title: "Mobile bug reported", time: "May 15", type: "warning" },
]
