import type { FileItem } from "../types"

export const files: FileItem[] = [
  {
    id: "f1",
    name: "Triodev_Proposal_v2.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2025-05-12",
    uploadedBy: "John Doe",
    shared: true,
    versions: [
      { version: 2, uploadedAt: "2025-05-12", uploadedBy: "John Doe" },
      { version: 1, uploadedAt: "2025-05-01", uploadedBy: "Alice Smith" },
    ],
  },
  {
    id: "f2",
    name: "Brand_Assets.zip",
    type: "archive",
    size: "14.2 MB",
    uploadedAt: "2025-05-10",
    uploadedBy: "Alice Smith",
    shared: false,
  },
  {
    id: "f3",
    name: "Dashboard_Wireframes.fig",
    type: "image",
    size: "8.1 MB",
    uploadedAt: "2025-05-08",
    uploadedBy: "Alice Smith",
    shared: true,
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    id: "f4",
    name: "API_Documentation.md",
    type: "code",
    size: "145 KB",
    uploadedAt: "2025-05-05",
    uploadedBy: "Mike Kumar",
    shared: true,
  },
  {
    id: "f5",
    name: "Sprint_Review_Recording.mp4",
    type: "video",
    size: "256 MB",
    uploadedAt: "2025-05-15",
    uploadedBy: "Sarah Chen",
    shared: true,
    previewUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800",
  },
  {
    id: "f6",
    name: "Project_Specs.docx",
    type: "document",
    size: "1.2 MB",
    uploadedAt: "2025-05-03",
    uploadedBy: "John Doe",
    shared: false,
  },
  {
    id: "f7",
    name: "Design System",
    type: "folder",
    size: "—",
    uploadedAt: "2025-05-01",
    uploadedBy: "Alice Smith",
    shared: true,
  },
  {
    id: "f8",
    name: "Logo_Primary.png",
    type: "image",
    size: "340 KB",
    uploadedAt: "2025-05-02",
    uploadedBy: "Alice Smith",
    folderId: "f7",
    shared: true,
    previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
  },
]

export const folders = files.filter((f) => f.type === "folder")
export const recentFiles = files.filter((f) => f.type !== "folder").slice(0, 5)
export const sharedFiles = files.filter((f) => f.shared && f.type !== "folder")
