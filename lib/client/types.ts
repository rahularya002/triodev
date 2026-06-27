import type {
  TeamMember,
  Meeting,
  Invoice,
  Conversation,
  ChatMessage,
  SupportTicket,
  Activity,
} from "@/lib/workspace/types"

export type ProjectPhaseName =
  | "discovery"
  | "design"
  | "development"
  | "testing"
  | "deployment"
  | "maintenance"

export type ProposalStatus = "pending" | "accepted" | "declined" | "changes-requested"
export type DeliverableCategory =
  | "design"
  | "source"
  | "apk"
  | "document"
  | "contract"
  | "report"
  | "asset"
export type ApprovalType = "design" | "feature" | "deployment" | "final"
export type ApprovalStatus = "pending" | "approved" | "revision-requested"

export interface ClientCompany {
  id: string
  name: string
  logo?: string
  industry: string
  website: string
  contactName: string
  contactEmail: string
}

export interface ClientProject {
  id: string
  name: string
  description: string
  progress: number
  currentPhase: ProjectPhaseName
  estimatedCompletion: string
  teamContact: TeamMember
  latestUpdate: string
  startDate: string
  status: "active" | "completed" | "on-hold"
}

export interface ProjectPhase {
  id: string
  projectId: string
  name: ProjectPhaseName
  label: string
  status: "completed" | "in-progress" | "upcoming"
  startDate?: string
  endDate?: string
  expectedDate: string
  progress: number
}

export interface Proposal {
  id: string
  projectName: string
  title: string
  status: ProposalStatus
  scope: string[]
  pricing: { item: string; amount: number }[]
  totalAmount: number
  timeline: string
  pdfUrl?: string
  createdAt: string
  validUntil: string
}

export interface Deliverable {
  id: string
  projectId: string
  name: string
  category: DeliverableCategory
  size: string
  uploadedAt: string
  previewUrl?: string
  downloadUrl?: string
}

export interface Approval {
  id: string
  projectId: string
  title: string
  type: ApprovalType
  status: ApprovalStatus
  description: string
  submittedAt: string
  submittedBy: string
  comments: { id: string; author: string; text: string; createdAt: string }[]
}

export interface ProjectRequest {
  projectName: string
  businessGoal: string
  description: string
  timeline: string
  budget: string
  requiredFeatures: string[]
  referenceLinks: string[]
}

export interface ClientUser {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export type {
  TeamMember,
  Meeting,
  Invoice,
  Conversation,
  ChatMessage,
  SupportTicket,
  Activity,
  TicketType,
} from "@/lib/workspace/types"
