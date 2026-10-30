import { cache } from "react"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Profile } from "./types"
import { getRedirectPathForProfile } from "./utils"

export const getCurrentUser = cache(async () => {
  const supabase = await createSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
})

export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const user = await getCurrentUser()
  if (!user) return null

  const supabase = await createSupabaseServerClient()
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return profile as Profile | null
})

export const userHasOrganization = cache(async (userId: string): Promise<boolean> => {
  const supabase = await createSupabaseServerClient()
  const { count } = await supabase
    .from("organization_members")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)

  return (count ?? 0) > 0
})

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/login")
  return user
}

export async function requireRole(role: Profile["role"]) {
  const profile = await getCurrentProfile()
  if (!profile) redirect("/auth/login")
  if (profile.role !== role) {
    const hasOrg = await userHasOrganization(profile.id)
    redirect(getRedirectPathForProfile(profile, hasOrg))
  }
  return profile
}

export const getAuthContext = cache(async () => {
  const user = await getCurrentUser()
  if (!user) return { user: null, profile: null, hasOrganization: false }

  const [profile, hasOrganization] = await Promise.all([
    getCurrentProfile(),
    userHasOrganization(user.id),
  ])

  return { user, profile, hasOrganization }
})

