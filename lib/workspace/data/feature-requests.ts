import type { FeatureRequest } from "../types"
import { teamMembers } from "./projects"

export const featureRequests: FeatureRequest[] = [
  {
    id: "fr1",
    title: "Dark mode for client portal",
    description: "Add a dark mode toggle to the client portal with system preference detection and persistent user choice.",
    priority: "high",
    status: "in-development",
    assignedDeveloper: teamMembers[0],
    votes: 12,
    hasVoted: true,
    comments: [
      { id: "c1", author: "Rahul Client", text: "This would be great for late-night reviews.", createdAt: "2025-05-10" },
      { id: "c2", author: "John Doe", text: "Working on this for Sprint 4.", createdAt: "2025-05-15" },
    ],
    timeline: [
      { id: "tl1", event: "Request submitted", date: "2025-05-08" },
      { id: "tl2", event: "Approved for development", date: "2025-05-12" },
      { id: "tl3", event: "Development started", date: "2025-05-15" },
    ],
    attachments: 1,
    createdAt: "2025-05-08",
  },
  {
    id: "fr2",
    title: "Export reports to PDF",
    description: "Allow users to export analytics reports and project summaries as PDF documents.",
    priority: "medium",
    status: "under-review",
    votes: 8,
    comments: [
      { id: "c3", author: "Sarah Chen", text: "Evaluating PDF generation libraries.", createdAt: "2025-05-18" },
    ],
    timeline: [
      { id: "tl4", event: "Request submitted", date: "2025-05-14" },
      { id: "tl5", event: "Under review", date: "2025-05-16" },
    ],
    createdAt: "2025-05-14",
  },
  {
    id: "fr3",
    title: "Slack integration",
    description: "Integrate with Slack for real-time notifications on project updates, task assignments, and meeting reminders.",
    priority: "low",
    status: "submitted",
    votes: 5,
    comments: [],
    timeline: [{ id: "tl6", event: "Request submitted", date: "2025-05-20" }],
    createdAt: "2025-05-20",
  },
  {
    id: "fr4",
    title: "Custom dashboard widgets",
    description: "Allow clients to customize their dashboard with drag-and-drop widgets for metrics they care about.",
    priority: "high",
    status: "completed",
    assignedDeveloper: teamMembers[1],
    votes: 15,
    comments: [
      { id: "c4", author: "Alice Smith", text: "Shipped in v1.2.0!", createdAt: "2025-05-01" },
    ],
    timeline: [
      { id: "tl7", event: "Request submitted", date: "2025-04-01" },
      { id: "tl8", event: "Development started", date: "2025-04-10" },
      { id: "tl9", event: "Completed", date: "2025-05-01" },
    ],
    createdAt: "2025-04-01",
  },
  {
    id: "fr5",
    title: "Multi-language support",
    description: "Add i18n support for English, Spanish, and French.",
    priority: "low",
    status: "declined",
    votes: 3,
    comments: [
      { id: "c5", author: "Sarah Chen", text: "Not in scope for current phase.", createdAt: "2025-05-05" },
    ],
    timeline: [
      { id: "tl10", event: "Request submitted", date: "2025-04-20" },
      { id: "tl11", event: "Declined", date: "2025-05-05" },
    ],
    createdAt: "2025-04-20",
  },
]
