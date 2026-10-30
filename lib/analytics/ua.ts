// Lightweight user-agent parsing for first-party analytics.
// Intentionally coarse — we only need device class, browser family, and OS
// family for dashboard breakdowns, not precise version fingerprinting.
//
// Note: country geo comes from the `x-vercel-ip-country` header, which is
// populated when hosted on Vercel. Other hosts record "unknown".

export interface ParsedUserAgent {
  device: "desktop" | "mobile" | "tablet"
  browser: string
  os: string
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  const lower = ua.toLowerCase()

  let device: ParsedUserAgent["device"] = "desktop"
  if (/ipad|tablet|(android(?!.*mobile))/.test(lower)) {
    device = "tablet"
  } else if (/mobi|iphone|ipod|android/.test(lower)) {
    device = "mobile"
  }

  let browser = "Other"
  if (lower.includes("edg/") || lower.includes("edge/")) browser = "Edge"
  else if (lower.includes("opr/") || lower.includes("opera")) browser = "Opera"
  else if (lower.includes("samsungbrowser")) browser = "Samsung Internet"
  else if (lower.includes("firefox/")) browser = "Firefox"
  else if (lower.includes("chrome/") || lower.includes("crios/")) browser = "Chrome"
  else if (lower.includes("safari/")) browser = "Safari"

  let os = "Other"
  if (lower.includes("windows")) os = "Windows"
  else if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ios")) os = "iOS"
  else if (lower.includes("mac os") || lower.includes("macintosh")) os = "macOS"
  else if (lower.includes("android")) os = "Android"
  else if (lower.includes("linux")) os = "Linux"

  return { device, browser, os }
}

export function isBot(ua: string): boolean {
  return /bot|crawler|spider|crawling|headless|lighthouse|preview|scan|fetch|monitor/i.test(ua)
}

export function extractReferrerDomain(referrer: string | null | undefined, ownHost: string): string | null {
  if (!referrer) return null
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "")
    if (!host || host === ownHost.replace(/^www\./, "")) return null
    return host
  } catch {
    return null
  }
}
