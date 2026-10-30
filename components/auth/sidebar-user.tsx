"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { getDisplayName } from "@/lib/auth/utils"
import type { Profile } from "@/lib/auth/types"

interface SidebarUserProps {
  subtitle?: string
}

export function SidebarUser({ subtitle }: SidebarUserProps) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      const user = data?.user
      if (!user || !isMounted) return

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (isMounted && profileData) {
        setProfile(profileData as Profile | null)
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [])

  const displayName = getDisplayName(profile)
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-between rounded-2xl px-2 py-1.5">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-semibold leading-none text-foreground">{displayName}</span>
            <span className="text-[10px] text-muted mt-1 leading-none">
              {subtitle ?? profile?.email ?? "Loading..."}
            </span>
          </div>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted" />
      </div>
    </div>
  )
}
