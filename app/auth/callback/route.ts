import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getRedirectPathForProfile } from "@/lib/auth/utils"
import type { Profile } from "@/lib/auth/types"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next")

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  let cookieResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookieResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { count } = await supabase
    .from("organization_members")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const hasOrganization = (count ?? 0) > 0
  const profileData = profile as Profile | null

  // Google OAuth is enabled for client authentication only. Clear the newly
  // issued session if an existing staff account attempts this flow.
  if (!profileData || profileData.role !== "client") {
    await supabase.auth.signOut()
    const error = profileData ? "google_client_only" : "auth_callback_failed"
    const deniedResponse = NextResponse.redirect(`${origin}/auth/login?error=${error}`)
    cookieResponse.cookies.getAll().forEach((cookie) => {
      deniedResponse.cookies.set(cookie.name, cookie.value, cookie)
    })
    return deniedResponse
  }

  let destination = getRedirectPathForProfile(profileData, hasOrganization)
  if (next && (next === "/client" || next.startsWith("/client/"))) {
    destination = hasOrganization ? next : "/auth/onboarding"
  }

  const redirectResponse = NextResponse.redirect(`${origin}${destination}`)
  cookieResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
  })

  return redirectResponse
}
