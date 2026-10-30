import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/site-config"

export const alt = siteConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#111612",
          backgroundImage: "radial-gradient(circle at 20% 10%, rgba(127, 154, 113, 0.25), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#7f9a71",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111612",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#eef3ea",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Triodev
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#eef3ea",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Product Engineering Studio
          </div>
          <div style={{ fontSize: 30, color: "#b3c2b0", maxWidth: 880, lineHeight: 1.4 }}>
            SaaS platforms, AI products, dashboards, and websites that convert — built for startups and growing businesses.
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#7f9a71",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          triodev.studio
        </div>
      </div>
    ),
    { ...size }
  )
}
