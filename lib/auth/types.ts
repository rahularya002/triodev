export type UserRole = "triodev_staff" | "client"

export type OrgMemberRole = "owner" | "admin" | "member" | "viewer"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  industry: string | null
  website: string | null
}
