import { PageHeader } from "@/components/workspace/shared"
import { ClientProjectCard } from "@/components/client/shared"
import { clientProjects } from "@/lib/client/data"

export default function ClientProjectsPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Client Portal"
        title="My Projects"
        description="All projects belonging to your company, managed by the Triodev team."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientProjects.map((project) => (
          <ClientProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
