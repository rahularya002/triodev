import { Sidebar } from "@/components/workspace/sidebar"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background font-sans transition-colors duration-500">
      <Sidebar />
      <main className="pl-72 pr-6 py-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
