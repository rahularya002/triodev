import {
  Palette,
  Code2,
  Smartphone,
  FileText,
  FileSignature,
  BarChart3,
  Image as ImageIcon,
  Download,
  Eye,
} from "lucide-react"
import type { Deliverable } from "@/lib/client/types"
import { cn } from "@/lib/utils"

const categoryIcons = {
  design: { icon: Palette, color: "text-purple-500" },
  source: { icon: Code2, color: "text-emerald-500" },
  apk: { icon: Smartphone, color: "text-blue-500" },
  document: { icon: FileText, color: "text-blue-600" },
  contract: { icon: FileSignature, color: "text-amber-500" },
  report: { icon: BarChart3, color: "text-red-500" },
  asset: { icon: ImageIcon, color: "text-primary" },
}

interface DeliverableCardProps {
  deliverable: Deliverable
  view?: "grid" | "list"
  onClick?: () => void
}

export function DeliverableCard({ deliverable, view = "grid", onClick }: DeliverableCardProps) {
  const config = categoryIcons[deliverable.category]
  const Icon = config.icon

  if (view === "list") {
    return (
      <div
        className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer rounded-xl group"
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
            <h4 className="text-sm font-semibold text-foreground">{deliverable.name}</h4>
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted mt-0.5">
              <span>{deliverable.size}</span>
              <span>•</span>
              <span>{deliverable.uploadedAt}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button type="button" className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-surface">
            <Eye className="w-4 h-4" />
          </button>
          <button type="button" className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-surface">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center p-5 rounded-2xl border border-primary/10 bg-secondary/30 hover:border-primary/20 hover:bg-secondary/50 transition-all text-center group w-full"
    >
      <div className="p-3 rounded-2xl bg-surface border border-primary/10 mb-3 group-hover:scale-105 transition-transform">
        <Icon className={cn("w-8 h-8", config.color)} />
      </div>
      <h4 className="text-xs font-semibold text-foreground truncate w-full">{deliverable.name}</h4>
      <span className="text-[10px] font-mono text-muted mt-1">{deliverable.size}</span>
    </button>
  )
}
