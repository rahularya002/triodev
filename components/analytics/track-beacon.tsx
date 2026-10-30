"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const PRIVATE_PREFIXES = ["/admin", "/client", "/auth", "/api"]

function getSessionId(): string {
  const key = "triodev_session_id"
  try {
    let id = sessionStorage.getItem(key)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(key, id)
    }
    return id
  } catch {
    return "unknown"
  }
}

export function TrackBeacon() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || PRIVATE_PREFIXES.some((p) => pathname.startsWith(p))) return

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
      session_id: getSessionId(),
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }))
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  }, [pathname])

  return null
}
