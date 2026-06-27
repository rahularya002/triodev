import type { Deliverable } from "../types"

export const deliverables: Deliverable[] = [
  {
    id: "d1",
    projectId: "client-portal",
    name: "Portal_Wireframes_v3.fig",
    category: "design",
    size: "12.4 MB",
    uploadedAt: "2025-06-10",
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    id: "d2",
    projectId: "client-portal",
    name: "Design_System_Guide.pdf",
    category: "design",
    size: "3.2 MB",
    uploadedAt: "2025-06-05",
  },
  {
    id: "d3",
    projectId: "mobile-app",
    name: "mobile-app-source-v1.2.zip",
    category: "source",
    size: "45.8 MB",
    uploadedAt: "2025-06-15",
  },
  {
    id: "d4",
    projectId: "mobile-app",
    name: "AcmeApp-v0.8-beta.apk",
    category: "apk",
    size: "28.6 MB",
    uploadedAt: "2025-06-18",
  },
  {
    id: "d5",
    projectId: "client-portal",
    name: "Service_Agreement_2025.pdf",
    category: "contract",
    size: "890 KB",
    uploadedAt: "2025-05-01",
  },
  {
    id: "d6",
    projectId: "analytics-dashboard",
    name: "Sprint_8_Report.pdf",
    category: "report",
    size: "1.4 MB",
    uploadedAt: "2025-04-30",
  },
  {
    id: "d7",
    projectId: "client-portal",
    name: "API_Documentation_v1.pdf",
    category: "document",
    size: "2.1 MB",
    uploadedAt: "2025-06-01",
  },
  {
    id: "d8",
    projectId: "mobile-app",
    name: "Brand_Assets_Pack.zip",
    category: "asset",
    size: "18.2 MB",
    uploadedAt: "2025-05-20",
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
  },
]

export function getDeliverablesByCategory(category: Deliverable["category"]) {
  return deliverables.filter((d) => d.category === category)
}
