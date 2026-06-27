"use client"

import { useState } from "react"
import { PageHeader, SearchBar, FileCard, SectionHeader } from "@/components/workspace/shared"
import { files, recentFiles, sharedFiles } from "@/lib/workspace/data/files"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { FileItem } from "@/lib/workspace/types"
import { Upload, Grid, List, Download, Eye, ChevronRight, History } from "lucide-react"

export function FilesContent() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)

  const filtered = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchesFolder = currentFolder ? f.folderId === currentFolder : !f.folderId || f.type === "folder"
    return matchesSearch && (currentFolder ? matchesFolder : true)
  })

  const breadcrumbs = currentFolder
    ? [{ id: null, name: "All Files" }, { id: currentFolder, name: files.find((f) => f.id === currentFolder)?.name ?? "Folder" }]
    : [{ id: null, name: "All Files" }]

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Files"
        description="Manage project files, documents, and shared assets."
        actions={
          <Button size="sm" className="gap-2">
            <Upload className="w-4 h-4" /> Upload
          </Button>
        }
      />

      <div className="border-2 border-dashed border-primary/20 rounded-3xl p-8 mb-8 text-center bg-secondary/20 hover:border-primary/40 transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
        <p className="text-sm font-semibold text-foreground">Drop files here to upload</p>
        <p className="text-xs text-muted mt-1">Supports PDF, images, videos, documents up to 50MB</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search files..." className="flex-1" />
        <div className="flex gap-2">
          <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
            <Grid className="w-4 h-4" />
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.id ?? "root"} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="w-3 h-3 text-muted" />}
            <button
              type="button"
              onClick={() => setCurrentFolder(crumb.id)}
              className={i === breadcrumbs.length - 1 ? "text-primary font-bold" : "text-muted hover:text-foreground"}
            >
              {crumb.name}
            </button>
          </span>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  view="grid"
                  onClick={() => file.type === "folder" ? setCurrentFolder(file.id) : setPreviewFile(file)}
                />
              ))}
            </div>
          ) : (
            <Card className="border-primary/16 bg-surface divide-y divide-primary/10">
              {filtered.map((file) => (
                <FileCard key={file.id} file={file} onClick={() => file.type === "folder" ? setCurrentFolder(file.id) : setPreviewFile(file)} />
              ))}
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent">
          <Card className="border-primary/16 bg-surface divide-y divide-primary/10">
            {recentFiles.map((file) => (
              <FileCard key={file.id} file={file} onClick={() => setPreviewFile(file)} />
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="shared">
          <Card className="border-primary/16 bg-surface divide-y divide-primary/10">
            {sharedFiles.map((file) => (
              <FileCard key={file.id} file={file} onClick={() => setPreviewFile(file)} />
            ))}
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!previewFile} onOpenChange={(open) => !open && setPreviewFile(null)}>
        {previewFile && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{previewFile.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {previewFile.previewUrl && previewFile.type === "image" && (
                <img src={previewFile.previewUrl} alt={previewFile.name} className="w-full rounded-2xl border border-primary/10" />
              )}
              {previewFile.type === "pdf" && (
                <div className="h-64 rounded-2xl border border-primary/10 bg-secondary/30 flex items-center justify-center text-muted text-sm">
                  PDF Preview — {previewFile.name}
                </div>
              )}
              {previewFile.type === "video" && (
                <div className="h-64 rounded-2xl border border-primary/10 bg-secondary/30 flex items-center justify-center text-muted text-sm">
                  Video Preview — {previewFile.name}
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-muted font-mono">
                <span>{previewFile.size}</span>
                <span>Uploaded {previewFile.uploadedAt}</span>
                <span>By {previewFile.uploadedBy}</span>
              </div>
              {previewFile.versions && (
                <div>
                  <SectionHeader title="Version History" icon={<History className="w-3.5 h-3.5" />} />
                  {previewFile.versions.map((v) => (
                    <div key={v.version} className="flex justify-between p-3 rounded-xl border border-primary/10 bg-secondary/30 mb-2 text-xs">
                      <span>v{v.version} — {v.uploadedBy}</span>
                      <span className="text-muted">{v.uploadedAt}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" className="gap-2"><Download className="w-4 h-4" /> Download</Button>
                <Button variant="outline" size="sm" className="gap-2"><Eye className="w-4 h-4" /> Preview</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
