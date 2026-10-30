import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from the Triodev portfolio — SaaS platforms, AI products, and websites we designed, built, and shipped for our clients.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: `Work | ${siteConfig.name}`,
    description:
      "Selected projects from the Triodev portfolio — SaaS platforms, AI products, and websites we designed, built, and shipped for our clients.",
    url: `${siteConfig.url}/work`,
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
