import type { Approval } from "../types"

export const approvals: Approval[] = [
  {
    id: "ap1",
    projectId: "client-portal",
    title: "Dashboard UI — High Fidelity Mockups",
    type: "design",
    status: "pending",
    description: "Final high-fidelity mockups for the client portal dashboard including all responsive breakpoints.",
    submittedAt: "2025-06-25",
    submittedBy: "Alice Smith",
    comments: [
      { id: "c1", author: "Alice Smith", text: "Please review the mobile and tablet layouts carefully.", createdAt: "2025-06-25" },
    ],
  },
  {
    id: "ap2",
    projectId: "client-portal",
    title: "Authentication Flow — Feature Spec",
    type: "feature",
    status: "pending",
    description: "OAuth2 and SSO authentication flow with Google and Microsoft providers.",
    submittedAt: "2025-06-22",
    submittedBy: "John Doe",
    comments: [],
  },
  {
    id: "ap3",
    projectId: "mobile-app",
    title: "Staging Deployment — v0.8-beta",
    type: "deployment",
    status: "revision-requested",
    description: "Staging deployment of mobile app v0.8-beta for client testing.",
    submittedAt: "2025-06-18",
    submittedBy: "Tom Wilson",
    comments: [
      { id: "c2", author: "Rahul Client", text: "Login screen has layout issues on iPhone SE.", createdAt: "2025-06-19" },
      { id: "c3", author: "John Doe", text: "Fix in progress for small screen layouts.", createdAt: "2025-06-20" },
    ],
  },
  {
    id: "ap4",
    projectId: "analytics-dashboard",
    title: "Final Deliverables Package",
    type: "final",
    status: "approved",
    description: "Complete analytics dashboard with source code, documentation, and deployment guide.",
    submittedAt: "2025-04-28",
    submittedBy: "Sarah Chen",
    comments: [
      { id: "c4", author: "Rahul Client", text: "Approved. Excellent work!", createdAt: "2025-04-30" },
    ],
  },
]

export const pendingApprovals = approvals.filter((a) => a.status === "pending")
