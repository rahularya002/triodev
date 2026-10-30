import { createHash } from "crypto"
import { NextResponse, type NextRequest } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { parseUserAgent, isBot, extractReferrerDomain } from "@/lib/analytics/ua"

const PRIVATE_PREFIXES = ["/admin", "/client", "/auth", "/api"]

export async function POST(request: NextRequest) {
  let body: { path?: string; referrer?: string; session_id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const path = typeof body.path === "string" ? body.path : ""
  if (!path.startsWith("/") || PRIVATE_PREFIXES.some((p) => path.startsWith(p))) {
    return NextResponse.json({ ok: true })
  }

  const ua = request.headers.get("user-agent") ?? ""
  if (isBot(ua)) {
    return NextResponse.json({ ok: true })
  }

  const supabase = createServiceRoleClient()
  if (!supabase) {
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "0.0.0.0"

  // Daily-rotating anonymized visitor hash — no raw IP or UA is stored.
  const dayStamp = new Date().toISOString().slice(0, 10)
  const visitorHash = createHash("sha256").update(`${ip}|${ua}|${dayStamp}`).digest("hex").slice(0, 32)

  const { device, browser, os } = parseUserAgent(ua)
  const country = request.headers.get("x-vercel-ip-country") ?? "unknown"
  const ownHost = new URL(request.url).hostname

  const { error } = await (supabase as any).from("page_views").insert({
    path: path.slice(0, 512),
    referrer_domain: extractReferrerDomain(body.referrer, ownHost),
    country,
    device,
    browser,
    os,
    visitor_hash: visitorHash,
    session_id: typeof body.session_id === "string" ? body.session_id.slice(0, 64) : null,
  })

  if (error) {
    console.error("[track] insert failed:", error.message)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
