import { FileText, FileArchive, Image as ImageIcon, FileCode2, Film, Folder, File } from "lucide-react"
import type { FileItem } from "@/lib/workspace/types"
import { cn } from "@/lib/utils"

const fileIcons = {
  pdf: { icon: FileText, color: "text-red-500" },
  image: { icon: ImageIcon, color: "text-purple-500" },
  video: { icon: Film, color: "text-blue-500" },
  document: { icon: File, color: "text-blue-600" },
  archive: { icon: FileArchive, color: "text-amber-500" },
  code: { icon: FileCode2, color: "text-emerald-500" },
  folder: { icon: Folder, color: "text-primary" },
}

interface FileCardProps {
  file: FileItem
  view?: "grid" | "list"
  onClick?: () => void
}

export function FileCard({ file, view = "list", onClick }: FileCardProps) {
  const config = fileIcons[file.type]
  const Icon = config.icon

  if (view === "grid") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col items-center p-5 rounded-2xl border border-primary/10 bg-secondary/30 hover:border-primary/20 hover:bg-secondary/50 transition-all text-center group"
      >
        <div className="p-3 rounded-2xl bg-surface border border-primary/10 mb-3 group-hover:scale-105 transition-transform">
          <Icon className={cn("w-8 h-8", config.color)} />
        </div>
        <h4 className="text-xs font-semibold text-foreground truncate w-full">{file.name}</h4>
        <span className="text-[10px] font-mono text-muted mt-1">{file.size}</span>
      </button>
    )
  }

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors group cursor-pointer rounded-xl"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-2xl bg-secondary border border-primary/10">
          <Icon className={cn("w-4 h-4", config.color)} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-xs">{file.name}</h4>
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted mt-0.5">
            <span>{file.size}</span>
            <span>•</span>
            <span>{file.uploadedAt}</span>
            {file.shared && <span>• Shared</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
