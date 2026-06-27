import { WelcomeHeader } from "@/components/workspace/welcome-header"
import { ProjectCard } from "@/components/workspace/project-card"
import { ActivityFeed } from "@/components/workspace/activity-feed"
import { UpcomingMeetings } from "@/components/workspace/upcoming-meetings"
import { PendingApprovals } from "@/components/workspace/pending-approvals"
import { RecentFiles } from "@/components/workspace/recent-files"
import { QuickActions } from "@/components/workspace/quick-actions"
import { AIAssistantFab } from "@/components/workspace/ai-assistant-fab"

export default function WorkspaceDashboard() {
  return (
    <div className="pb-20 relative">
      <WelcomeHeader />
      
      <QuickActions />

      <ProjectCard />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <div className="h-[400px]">
            <ActivityFeed />
          </div>
          <div className="h-[400px]">
            <UpcomingMeetings />
          </div>
        </div>
        
        <div className="xl:col-span-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 h-[400px] xl:h-auto">
          <div className="h-[400px] xl:h-[300px]">
            <PendingApprovals />
          </div>
          <div className="h-[400px] xl:h-[300px]">
            <RecentFiles />
          </div>
        </div>
      </div>
      
      <AIAssistantFab />
    </div>
  )
}
