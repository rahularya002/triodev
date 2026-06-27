import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { TeamMember } from "@/lib/workspace/types"

interface AvatarGroupProps {
  members: TeamMember[]
  max?: number
  size?: "sm" | "md"
}

export function AvatarGroup({ members, max = 4, size = "md" }: AvatarGroupProps) {
  const visible = members.slice(0, max)
  const remaining = members.length - max
  const sizeClass = size === "sm" ? "w-7 h-7" : "w-8 h-8"

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((member) => (
        <Avatar key={member.id} className={`border-2 border-surface ${sizeClass}`}>
          <AvatarImage src={member.avatar} />
          <AvatarFallback>{member.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div className={`flex items-center justify-center ${sizeClass} rounded-full border-2 border-surface bg-secondary text-[10px] font-bold z-10 text-muted`}>
          +{remaining}
        </div>
      )}
    </div>
  )
}
