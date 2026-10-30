"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createSupabaseServerClient, createServiceRoleClient } from "@/lib/supabase/server"
import { slugifyOrganizationName, getRedirectPathForProfile } from "@/lib/auth/utils"
import { userHasOrganization, getCurrentProfile } from "@/lib/auth/session"

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const next = String(formData.get("next") ?? "")

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  const profile = await getCurrentProfile()
  if (!profile) {
    return { error: "Profile not found. Please try again." }
  }

  const hasOrg = await userHasOrganization(profile.id)
  let destination = next && next.startsWith("/") ? next : getRedirectPathForProfile(profile, hasOrg)

  // Normalize legacy or invalid login sub-routes to avoid 404s and redirect loops
  if (destination === "/admin/login" || destination.startsWith("/auth/login")) {
    destination = profile.role === "triodev_staff" ? "/admin" : getRedirectPathForProfile(profile, hasOrg)
  } else if (destination === "/client/login") {
    destination = profile.role === "client" ? (hasOrg ? "/client" : "/auth/onboarding") : "/admin"
  }

  if (profile.role === "triodev_staff" && destination.startsWith("/client")) {
    redirect("/admin")
  }
  if (profile.role === "client" && destination.startsWith("/admin")) {
    redirect(getRedirectPathForProfile(profile, hasOrg))
  }

  redirect(destination)
}

export async function signUpWithEmail(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const companyName = String(formData.get("companyName") ?? "").trim()

  if (!fullName || !email || !password || !companyName) {
    return { error: "All fields are required." }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." }
  }

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (!data.user) {
    return { error: "Unable to create account." }
  }

  // Create the organization with the service-role client using the new user's
  // id. This works whether or not a session exists yet (email confirmation on),
  // unlike the auth.uid()-based RPC which requires an active session.
  const admin = createServiceRoleClient()
  if (!admin) {
    return { error: "Sign-up is not configured. Please contact support." }
  }

  const baseSlug = slugifyOrganizationName(companyName)
  let slug = baseSlug
  let orgId: string | null = null

  for (let attempt = 0; attempt < 3; attempt++) {
    const { data: org, error: orgError } = await (admin as any)
      .from("organizations")
      .insert({ name: companyName, slug })
      .select("id")
      .single()

    if (org && !orgError) {
      orgId = org.id
      break
    }

    // 23505 = unique_violation on slug; retry with a short suffix.
    if (orgError?.code === "23505") {
      slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
      continue
    }

    return { error: orgError?.message ?? "Unable to create organization." }
  }

  if (!orgId) {
    return { error: "Could not create your organization. Try a different company name." }
  }

  const { error: memberError } = await (admin as any)
    .from("organization_members")
    .insert({ organization_id: orgId, user_id: data.user.id, role: "owner" })

  if (memberError) {
    return { error: memberError.message }
  }

  // Session present (email confirmation disabled) -> straight into the portal.
  if (data.session) {
    redirect("/client")
  }

  // No session -> the project requires email confirmation.
  return {
    notice: "Account created. Check your email to confirm your address, then sign in.",
  }
}

export async function signInWithGoogle(next?: string) {
  if (next?.startsWith("/admin")) {
    return { error: "Google sign-in is only available for client accounts." }
  }

  const supabase = await createSupabaseServerClient()
  const origin = (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  const redirectTo = new URL("/auth/callback", origin)
  if (next) redirectTo.searchParams.set("next", next)

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.url) {
    redirect(data.url)
  }

  return { error: "Unable to start Google sign-in." }
}

export async function createOrganization(formData: FormData) {
  const companyName = String(formData.get("companyName") ?? "").trim()
  const industry = String(formData.get("industry") ?? "").trim() || null
  const website = String(formData.get("website") ?? "").trim() || null

  if (!companyName) {
    return { error: "Company name is required." }
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const slug = slugifyOrganizationName(companyName)
  const { error } = await (supabase as any).rpc("create_organization_for_user", {
    org_name: companyName,
    org_slug: slug,
    org_industry: industry,
    org_website: website,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/client")
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}
