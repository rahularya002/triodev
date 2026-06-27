import type { Milestone } from "../types"

export const milestones: Milestone[] = [
  {
    id: "m1",
    title: "Authentication System",
    description: "Complete OAuth2 and SSO integration with multi-factor authentication.",
    status: "completed",
    dueDate: "2025-05-10",
    completedDate: "2025-05-08",
    projectId: "triodev-ai",
    sprint: "Sprint 3",
  },
  {
    id: "m2",
    title: "Dashboard UI",
    description: "Build responsive dashboard with real-time metrics and activity feed.",
    status: "completed",
    dueDate: "2025-05-20",
    completedDate: "2025-05-18",
    projectId: "triodev-ai",
    dependencies: ["m1"],
    sprint: "Sprint 3",
  },
  {
    id: "m3",
    title: "AI Agent Integration",
    description: "Integrate AI agents for automated task management and reporting.",
    status: "in-progress",
    dueDate: "2025-06-05",
    projectId: "triodev-ai",
    dependencies: ["m2"],
    sprint: "Sprint 4",
  },
  {
    id: "m4",
    title: "API Gateway",
    description: "Deploy API gateway with rate limiting and authentication middleware.",
    status: "in-progress",
    dueDate: "2025-06-10",
    projectId: "triodev-ai",
    dependencies: ["m1"],
    sprint: "Sprint 4",
  },
  {
    id: "m5",
    title: "Production Deployment",
    description: "Full production deployment with monitoring and alerting.",
    status: "upcoming",
    dueDate: "2025-06-14",
    projectId: "triodev-ai",
    dependencies: ["m3", "m4"],
    sprint: "Sprint 5",
  },
  {
    id: "m6",
    title: "Client Portal Wireframes",
    description: "Complete wireframes and user flow documentation.",
    status: "completed",
    dueDate: "2025-05-25",
    completedDate: "2025-05-24",
    projectId: "client-portal",
    sprint: "Sprint 1",
  },
  {
    id: "m7",
    title: "Billing Integration",
    description: "Stripe billing integration with subscription management.",
    status: "upcoming",
    dueDate: "2025-06-20",
    projectId: "client-portal",
    dependencies: ["m6"],
    sprint: "Sprint 3",
  },
]

export function getMilestonesByProject(projectId: string): Milestone[] {
  return milestones.filter((m) => m.projectId === projectId)
}
