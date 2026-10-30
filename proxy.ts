import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { getRedirectPathForProfile } from "@/lib/auth/utils"
import type { Profile } from "@/lib/auth/types"

const AUTH_PAGES = ["/auth/login", "/auth/signup"]

function isPublicStaticPath(pathname: string): boolean {
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname === "/" ||
    pathname.startsWith("/work") ||
    pathname === "/privacy-policy" ||
    pathname === "/terms-of-service" ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/track") ||
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.svg" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return true
  }
  return false
}

function hasSupabaseAuthCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    (c) => c.name.startsWith("sb-") && c.name.includes("-auth-token")
  )
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Instant pass-through for public static pages, images, and analytics beacons.
  // Avoids creating Supabase server clients and firing auth network calls on public traffic.
  if (isPublicStaticPath(pathname)) {
    return NextResponse.next({ request })
  }

  // 2. Convenience redirects for common user navigation patterns
  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/auth/login?next=/admin", request.url))
  }
  if (pathname === "/client/login") {
    return NextResponse.redirect(new URL("/auth/login?next=/client", request.url))
  }

  const hasAuthCookie = hasSupabaseAuthCookie(request)

  // 3. Fast-path unauthenticated requests to login/signup pages
  if (AUTH_PAGES.includes(pathname) && !hasAuthCookie) {
    return NextResponse.next({ request })
  }

  // 4. Fast-path unauthenticated requests to protected areas without hitting Supabase network
  if (!hasAuthCookie && (pathname.startsWith("/admin") || pathname.startsWith("/client"))) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 5. Allow other public auth routes (/auth/callback, /auth/signout, /auth/onboarding) to handle their own flow
  if (pathname.startsWith("/auth") && !AUTH_PAGES.includes(pathname)) {
    return NextResponse.next({ request })
  }

  // 6. Authenticated or potentially authenticated requests — initialize Supabase SSR client
  let supabaseResponse = NextResponse.next({ request })

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
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    const { data: { user } } = await supabase.auth.getUser()

    // If on login/signup and user has an active session, redirect to appropriate portal
    if (AUTH_PAGES.includes(pathname)) {
      if (user) {
        const profile = await fetchProfile(supabase, user.id)
        if (profile) {
          const hasOrg = await fetchHasOrganization(supabase, user.id)
          const dest = getRedirectPathForProfile(profile, hasOrg)
          return NextResponse.redirect(new URL(dest, request.url))
        }
      }
      return supabaseResponse
    }

    // Protected route check
    if (!user) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }

    const profile = await fetchProfile(supabase, user.id)
    if (!profile) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    const hasOrganization = await fetchHasOrganization(supabase, user.id)

    // Role-based route enforcement
    if (pathname.startsWith("/admin")) {
      if (profile.role !== "triodev_staff") {
        const dest = getRedirectPathForProfile(profile, hasOrganization)
        return NextResponse.redirect(new URL(dest, request.url))
      }
      return supabaseResponse
    }

    if (pathname.startsWith("/client")) {
      if (profile.role !== "client") {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      if (!hasOrganization && !pathname.startsWith("/auth/onboarding")) {
        return NextResponse.redirect(new URL("/auth/onboarding", request.url))
      }
      return supabaseResponse
    }

    return supabaseResponse
  } catch (error) {
    console.error("[proxy] auth check failed:", error)
    if (pathname.startsWith("/admin") || pathname.startsWith("/client")) {
      const loginUrl = new URL("/auth/login", request.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return supabaseResponse
  }
}

// Keep backwards-compatible default and named export
export default proxy

async function fetchProfile(
  supabase: ReturnType<typeof createServerClient>,
  userId: string
): Promise<Profile | null> {
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).single()
  return data as Profile | null
}

async function fetchHasOrganization(
  supabase: ReturnType<typeof createServerClient>,
  userId: string
): Promise<boolean> {
  const { count } = await supabase
    .from("organization_members")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
  return (count ?? 0) > 0
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
