import { headers } from "next/headers"
import { siteConfig } from "@/lib/site-config"

/**
 * Canonical site origin for OAuth redirects and post-auth navigation.
 * Prefer NEXT_PUBLIC_SITE_URL in production — `Origin` is often missing on
 * server actions, and request.url can reflect an internal host behind a proxy.
 */
export async function getSiteOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (configured) return configured

  const h = await headers()
  const forwardedHost = h.get("x-forwarded-host")
  const host = forwardedHost ?? h.get("host")
  const proto = h.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https")

  if (host) return `${proto}://${host}`

  const origin = h.get("origin")
  if (origin) return origin.replace(/\/$/, "")

  return siteConfig.url.replace(/\/$/, "")
}

/** Resolve origin from a request URL, preferring configured site URL + proxy headers. */
export function getRequestOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (configured) return configured

  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost ?? request.headers.get("host")
  const proto =
    request.headers.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https")

  if (host) return `${proto}://${host}`

  return new URL(request.url).origin
}
