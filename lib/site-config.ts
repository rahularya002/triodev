export const siteConfig = {
  name: "Triodev",
  title: "Triodev - Product Engineering Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://triodev.in",
  description:
    "Triodev is a product engineering studio. We design and build SaaS platforms, AI products, dashboards, internal tools, and high-converting websites for startups and growing businesses.",
  shortDescription:
    "We build software that helps businesses move faster - SaaS platforms, AI products, dashboards, and modern websites for startups and growing businesses.",
  keywords: [
    "product engineering studio",
    "software development agency",
    "SaaS development",
    "AI product development",
    "web development studio",
    "Next.js agency",
    "custom dashboards",
    "internal tools",
    "startup software development",
  ],
  ogImage: "/opengraph-image",
  locale: "en_US",
} as const
