export type ProjectStatus = "active" | "completed" | "archived"
export type TaskStatus = "backlog" | "todo" | "in-progress" | "review" | "done"
export type TaskPriority = "low" | "medium" | "high" | "urgent"
export type InvoiceStatus = "paid" | "pending" | "overdue"
export type TicketStatus = "open" | "in-progress" | "resolved" | "closed"
export type TicketType = "bug" | "change" | "emergency"
export type FeatureRequestStatus = "submitted" | "under-review" | "in-development" | "completed" | "declined"
export type MilestoneStatus = "completed" | "in-progress" | "upcoming" | "overdue"

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  email?: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  progress: number
  sprint: string
  team: TeamMember[]
  startDate: string
  estimatedCompletion: string
  lastUpdated: string
  environment?: string
  repository?: string
  deployment?: { version: string; status: string; deployedAt: string }
}

export interface Milestone {
  id: string
  title: string
  description: string
  status: MilestoneStatus
  dueDate: string
  completedDate?: string
  projectId: string
  dependencies?: string[]
  sprint?: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  labels: string[]
  dueDate?: string
  assignee?: TeamMember
  projectId: string
  comments: number
  attachments: number
  createdAt: string
}

export interface FileItem {
  id: string
  name: string
  type: "pdf" | "image" | "video" | "document" | "archive" | "code" | "folder"
  size: string
  uploadedAt: string
  uploadedBy: string
  folderId?: string
  shared: boolean
  versions?: { version: number; uploadedAt: string; uploadedBy: string }[]
  previewUrl?: string
}

export interface Meeting {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  agenda: string
  notes?: string
  recordingUrl?: string
  meetUrl?: string
  attendees: TeamMember[]
  actionItems?: { id: string; text: string; completed: boolean; assignee?: string }[]
  isPast: boolean
}

export interface FeatureRequest {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: FeatureRequestStatus
  assignedDeveloper?: TeamMember
  votes: number
  hasVoted?: boolean
  comments: { id: string; author: string; text: string; createdAt: string }[]
  timeline: { id: string; event: string; date: string }[]
  attachments?: number
  createdAt: string
}

export interface Conversation {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  lastMessageAt: string
  unread: number
  online?: boolean
  pinned?: boolean
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  type: "text" | "file" | "image" | "code"
  createdAt: string
  pinned?: boolean
}

export interface Invoice {
  id: string
  number: string
  title: string
  amount: number
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  paidDate?: string
  items: { description: string; amount: number }[]
  paymentHistory?: { date: string; amount: number; method: string }[]
}

export interface SupportTicket {
  id: string
  title: string
  description: string
  type: TicketType
  priority: TaskPriority
  status: TicketStatus
  createdAt: string
  updatedAt: string
  messages: { id: string; author: string; text: string; createdAt: string; isStaff?: boolean }[]
}

export interface DocCategory {
  id: string
  name: string
  icon: string
  articles: DocArticle[]
}

export interface DocArticle {
  id: string
  title: string
  content: string
  categoryId: string
  updatedAt: string
}

export interface Activity {
  id: string
  title: string
  time: string
  type: "success" | "info" | "warning" | "default"
}
