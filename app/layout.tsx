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
    default: "Triodev - Design and Development Agency",
    template: "%s | Triodev",
  },
  description:
    "Triodev designs and develops modern web applications with product-first UX and performance-focused engineering.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Triodev - Design and Development Agency",
    description:
      "Design-led web app studio for ambitious products. Strategy, UX/UI, motion, and Next.js engineering.",
    url: "https://triodev.studio",
    siteName: "Triodev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triodev - Design and Development Agency",
    description:
      "We design and develop high-performance web applications with premium interaction design.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
