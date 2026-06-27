import type { SupportTicket } from "../types"

export const supportTickets: SupportTicket[] = [
  {
    id: "tk1",
    title: "Dashboard not loading on mobile",
    description: "The dashboard page shows a blank screen when accessed from mobile Safari on iOS 17.",
    type: "bug",
    priority: "high",
    status: "in-progress",
    createdAt: "2025-06-25",
    updatedAt: "2025-06-26",
    messages: [
      { id: "m1", author: "Rahul Client", text: "The dashboard page shows a blank screen when accessed from mobile Safari.", createdAt: "2025-06-25" },
      { id: "m2", author: "John Doe", text: "Thanks for reporting this. We're investigating the Safari rendering issue.", createdAt: "2025-06-25", isStaff: true },
      { id: "m3", author: "John Doe", text: "Found the issue - it's related to CSS grid fallback. Fix is in progress.", createdAt: "2025-06-26", isStaff: true },
    ],
  },
  {
    id: "tk2",
    title: "Add CSV export to reports",
    description: "Would like to export analytics reports as CSV files in addition to PDF.",
    type: "change",
    priority: "medium",
    status: "open",
    createdAt: "2025-06-20",
    updatedAt: "2025-06-20",
    messages: [
      { id: "m4", author: "Rahul Client", text: "Would like to export analytics reports as CSV files.", createdAt: "2025-06-20" },
      { id: "m5", author: "Sarah Chen", text: "Added to the feature request backlog. We'll evaluate for Sprint 5.", createdAt: "2025-06-21", isStaff: true },
    ],
  },
  {
    id: "tk3",
    title: "Production API down",
    description: "Critical: Production API returning 503 errors since 2:00 AM.",
    type: "emergency",
    priority: "urgent",
    status: "resolved",
    createdAt: "2025-06-10",
    updatedAt: "2025-06-10",
    messages: [
      { id: "m6", author: "Rahul Client", text: "Production API is down! Getting 503 errors.", createdAt: "2025-06-10 02:00" },
      { id: "m7", author: "Tom Wilson", text: "On it. Investigating the load balancer configuration.", createdAt: "2025-06-10 02:05", isStaff: true },
      { id: "m8", author: "Tom Wilson", text: "Resolved. Load balancer was misconfigured after last deployment. All services restored.", createdAt: "2025-06-10 02:45", isStaff: true },
    ],
  },
  {
    id: "tk4",
    title: "Login redirect loop",
    description: "After logging in, users are redirected back to the login page in an infinite loop.",
    type: "bug",
    priority: "urgent",
    status: "closed",
    createdAt: "2025-05-28",
    updatedAt: "2025-05-29",
    messages: [
      { id: "m9", author: "Rahul Client", text: "Login keeps redirecting back to login page.", createdAt: "2025-05-28" },
      { id: "m10", author: "John Doe", text: "Fixed in v1.2.3. Cookie domain mismatch was the cause.", createdAt: "2025-05-29", isStaff: true },
    ],
  },
]
