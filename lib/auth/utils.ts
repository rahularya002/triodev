import type { Profile } from "./types"

export function slugifyOrganizationName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)

  const suffix = Math.random().toString(36).slice(2, 8)
  return `${base || "org"}-${suffix}`
}

export function getRedirectPathForProfile(
  profile: Profile,
  hasOrganization: boolean
): string {
  if (profile.role === "triodev_staff") {
    return "/admin"
  }
  if (!hasOrganization) {
    return "/auth/onboarding"
  }
  return "/client"
}

export function getDisplayName(profile: Profile | null): string {
  if (!profile) return "User"
  return profile.full_name || profile.email.split("@")[0] || "User"
}
