"use client"

import { useState, useMemo } from "react"
import { PageHeader, MetricCard, SearchBar, FilterBar, ProjectListCard, EmptyState } from "@/components/workspace/shared"
import { projects } from "@/lib/workspace/data"
import { FolderKanban, CheckCircle2, Archive } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function ProjectsContent() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || p.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const activeCount = projects.filter((p) => p.status === "active").length
  const completedCount = projects.filter((p) => p.status === "completed").length
  const archivedCount = projects.filter((p) => p.status === "archived").length

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Manage and track all your active, completed, and archived projects."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Active Projects" value={String(activeCount)} icon={FolderKanban} trend="On track" trendColor="text-primary" />
        <MetricCard label="Completed" value={String(completedCount)} icon={CheckCircle2} trend="All delivered" trendColor="text-emerald-600 dark:text-emerald-400" />
        <MetricCard label="Archived" value={String(archivedCount)} icon={Archive} trend="Historical" trendColor="text-muted" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." className="flex-1" />
        <FilterBar
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Completed", value: "completed" },
            { label: "Archived", value: "archived" },
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archivedCount})</TabsTrigger>
        </TabsList>

        {(["active", "completed", "archived"] as const).map((status) => (
          <TabsContent key={status} value={status}>
            {filtered.filter((p) => p.status === status).length === 0 ? (
              <EmptyState
                icon={FolderKanban}
                title={`No ${status} projects`}
                description={`There are no ${status} projects matching your search.`}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.filter((p) => p.status === status).map((project) => (
                  <ProjectListCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
