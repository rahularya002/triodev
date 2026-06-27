import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://triodev.studio"),
  title: {
    default: "Triodev - Product Engineering Studio",
    template: "%s | Triodev",
  },
  description:
    "Triodev is a product engineering studio. We design and build SaaS platforms, AI products, dashboards, internal tools, and high-converting websites for startups and growing businesses.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Triodev - Product Engineering Studio",
    description:
      "We build software that helps businesses move faster - SaaS platforms, AI products, dashboards, and modern websites for startups and growing businesses.",
    url: "https://triodev.studio",
    siteName: "Triodev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triodev - Product Engineering Studio",
    description:
      "Custom software for startups and growing businesses - SaaS, AI products, dashboards, internal tools, and websites that convert.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
