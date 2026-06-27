import { Plus, Upload, Calendar, Bug, BookOpen } from "lucide-react"

const actions = [
  { name: "New Request", icon: Plus, color: "text-primary" },
  { name: "Upload File", icon: Upload, color: "text-primary" },
  { name: "Book Meeting", icon: Calendar, color: "text-primary" },
  { name: "Report Bug", icon: Bug, color: "text-primary" },
  { name: "Documentation", icon: BookOpen, color: "text-primary" }
]

export function QuickActions() {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted font-mono mb-4">
        Quick Actions
      </h3>
      <div className="flex flex-wrap gap-3">
        {actions.map((action, i) => (
          <button 
            key={i}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/20 bg-surface text-xs font-semibold tracking-wider uppercase hover:scale-[1.02] hover:bg-secondary hover:border-primary/45 transition-all duration-200 cursor-pointer shadow-[0_4px_12px_-6px_rgba(0,0,0,0.03)] text-foreground"
          >
            <action.icon className="w-3.5 h-3.5 text-primary" />
            {action.name}
          </button>
        ))}
      </div>
    </div>
  )
}
