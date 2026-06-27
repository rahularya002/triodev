import type { ClientProject } from "../types"
import { teamMembers } from "@/lib/workspace/data/projects"

export const clientProjects: ClientProject[] = [
  {
    id: "client-portal",
    name: "Client Portal Redesign",
    description: "Modern client-facing portal with real-time project tracking and billing integration.",
    progress: 42,
    currentPhase: "design",
    estimatedCompletion: "2025-07-01",
    teamContact: teamMembers[3],
    latestUpdate: "Wireframes approved, moving to high-fidelity design",
    startDate: "2025-05-15",
    status: "active",
  },
  {
    id: "mobile-app",
    name: "Mobile App MVP",
    description: "Cross-platform mobile application for iOS and Android with offline support.",
    progress: 78,
    currentPhase: "development",
    estimatedCompletion: "2025-08-15",
    teamContact: teamMembers[0],
    latestUpdate: "Authentication module completed, starting core features",
    startDate: "2025-04-01",
    status: "active",
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Real-time analytics and reporting dashboard with custom KPI widgets.",
    progress: 100,
    currentPhase: "maintenance",
    estimatedCompletion: "2025-04-30",
    teamContact: teamMembers[2],
    latestUpdate: "Project delivered and in maintenance phase",
    startDate: "2025-01-15",
    status: "completed",
  },
]

export function getClientProjectById(id: string): ClientProject | undefined {
  return clientProjects.find((p) => p.id === id)
}

export const activeClientProjects = clientProjects.filter((p) => p.status === "active")
