import { createBrowserClient } from "@supabase/ssr"

function getBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

let browserClient: ReturnType<typeof getBrowserClient> | undefined

export function createClient() {
  if (typeof window === "undefined") {
    return getBrowserClient()
  }
  return (browserClient ??= getBrowserClient())
}
