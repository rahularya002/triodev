import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText, Download, Eye, FileArchive, Image as ImageIcon, FileCode2 } from "lucide-react"

const files = [
  {
    name: "Triodev_Proposal_v2.pdf",
    type: "pdf",
    size: "2.4 MB",
    date: "Oct 12",
    icon: FileText,
    color: "text-red-500"
  },
  {
    name: "Brand_Assets.zip",
    type: "archive",
    size: "14.2 MB",
    date: "Oct 10",
    icon: FileArchive,
    color: "text-amber-500"
  },
  {
    name: "Dashboard_Wireframes.fig",
    type: "figma",
    size: "8.1 MB",
    date: "Oct 08",
    icon: ImageIcon,
    color: "text-purple-500"
  },
  {
    name: "API_Documentation.md",
    type: "code",
    size: "145 KB",
    date: "Oct 05",
    icon: FileCode2,
    color: "text-blue-500"
  }
]

export function RecentFiles() {
  return (
    <Card className="h-full flex flex-col border-primary/16 bg-surface">
      <CardHeader className="pb-3 border-b border-primary/10">
        <CardTitle className="text-xs font-bold font-mono tracking-[0.2em] text-muted uppercase flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-primary" />
          Recent Files
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
        <div className="divide-y divide-primary/10">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-secondary border border-primary/10">
                  <file.icon className={`w-4 h-4 ${file.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground truncate w-40 sm:w-56 leading-snug">
                    {file.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-muted mt-0.5">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-surface border border-transparent hover:border-primary/10 transition-colors cursor-pointer">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-muted hover:text-foreground rounded-full hover:bg-surface border border-transparent hover:border-primary/10 transition-colors cursor-pointer">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
