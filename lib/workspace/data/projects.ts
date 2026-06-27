import type { Project, TeamMember } from "../types"

export const teamMembers: TeamMember[] = [
  { id: "1", name: "John Doe", role: "Lead Developer", avatar: "https://i.pravatar.cc/150?u=1", email: "john@triodev.studio" },
  { id: "2", name: "Alice Smith", role: "Designer", avatar: "https://i.pravatar.cc/150?u=2", email: "alice@triodev.studio" },
  { id: "3", name: "Mike Kumar", role: "Backend Engineer", avatar: "https://i.pravatar.cc/150?u=3", email: "mike@triodev.studio" },
  { id: "4", name: "Sarah Chen", role: "Product Manager", avatar: "https://i.pravatar.cc/150?u=4", email: "sarah@triodev.studio" },
  { id: "5", name: "Tom Wilson", role: "DevOps", avatar: "https://i.pravatar.cc/150?u=5", email: "tom@triodev.studio" },
]

export const projects: Project[] = [
  {
    id: "triodev-ai",
    name: "Triodev AI Platform",
    description: "Core platform architecture and AI agent integrations for the studio workspace.",
    status: "active",
    progress: 68,
    sprint: "Sprint 4",
    team: teamMembers.slice(0, 4),
    startDate: "2025-05-01",
    estimatedCompletion: "2025-06-14",
    lastUpdated: "2 hours ago",
    environment: "Production",
    repository: "github.com/triodev/ai-platform",
    deployment: { version: "v1.2.4-beta", status: "Stable", deployedAt: "2 hours ago" },
  },
  {
    id: "client-portal",
    name: "Client Portal Redesign",
    description: "Modern client-facing portal with real-time project tracking and billing integration.",
    status: "active",
    progress: 42,
    sprint: "Sprint 2",
    team: teamMembers.slice(1, 4),
    startDate: "2025-05-15",
    estimatedCompletion: "2025-07-01",
    lastUpdated: "Yesterday",
    environment: "Staging",
    repository: "github.com/triodev/client-portal",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Real-time analytics and reporting dashboard with custom KPI widgets.",
    status: "completed",
    progress: 100,
    sprint: "Sprint 8",
    team: teamMembers.slice(0, 3),
    startDate: "2025-01-15",
    estimatedCompletion: "2025-04-30",
    lastUpdated: "2 weeks ago",
    environment: "Production",
  },
  {
    id: "mobile-app",
    name: "Mobile App MVP",
    description: "Cross-platform mobile application for iOS and Android.",
    status: "completed",
    progress: 100,
    sprint: "Sprint 6",
    team: teamMembers.slice(2, 5),
    startDate: "2024-11-01",
    estimatedCompletion: "2025-03-15",
    lastUpdated: "1 month ago",
  },
  {
    id: "legacy-migration",
    name: "Legacy System Migration",
    description: "Migration of legacy monolith to microservices architecture.",
    status: "archived",
    progress: 85,
    sprint: "Sprint 12",
    team: teamMembers.slice(0, 2),
    startDate: "2024-06-01",
    estimatedCompletion: "2024-12-01",
    lastUpdated: "3 months ago",
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((p) => p.status === status)
}
