~import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/site/legal-page"
import { siteConfig } from "@/lib/site-config"

const updatedAt = "October 30, 2026"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Triodev collects, uses, and protects information when you visit our website or use our client portal.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: "How Triodev handles information from website visitors and portal users.",
    url: `${siteConfig.url}/privacy-policy`,
  },
}

const sections: LegalSection[] = [
  {
    title: "Who this policy covers",
    paragraphs: [
      `This policy describes how Triodev (“we,” “us,” or “our”) handles information when you visit ${siteConfig.url}, send us a project inquiry, or use the Triodev client portal. It applies to this website and portal; a separate written agreement may describe how we handle information for a particular client project.`,
    ],
  },
  {
    title: "Information we collect",
    bullets: [
      "Contact inquiries: your name, email address, optional budget, and project brief. The form’s hidden website field is used as a spam honeypot and is not stored as an inquiry.",
      "Portal accounts: email address and, when provided by you or your identity provider, your name and profile image. We also process account role, organization, and membership information needed to operate the portal.",
      "Public website analytics: page path, referring website domain, country-level location when supplied by hosting infrastructure, and coarse device, browser, and operating-system categories derived from the browser request.",
      "Request and session data: the server receives technical request information such as IP address and user-agent. For page-view analytics, the application stores a daily rotating pseudonymous hash derived from the IP address and user-agent rather than storing those raw values in the analytics record. A random session identifier is held in your browser’s session storage and sent with public page views.",
      "Site preferences: the site stores your light or dark theme choice in local storage. Supabase authentication uses cookies to maintain portal sessions.",
    ],
  },
  {
    title: "How we use information",
    bullets: [
      "Respond to project inquiries and follow up about requested services.",
      "Create and secure portal accounts, authenticate users, and provide organization and project features.",
      "Understand aggregate public-site traffic and improve the site. We exclude portal, authentication, and API paths from the page-view tracking beacon.",
      "Protect the site, prevent abuse, troubleshoot errors, and comply with applicable legal obligations.",
    ],
  },
  {
    title: "Service providers and sharing",
    paragraphs: [
      "We use service providers to operate the site and deliver its features. Supabase provides authentication and database services; Google processes sign-in when you choose Google sign-in; and Resend sends contact-inquiry notifications. These providers process information as needed to provide their services under their own terms and privacy practices.",
      "We do not sell personal information. We may disclose information where needed to provide a service you request, protect rights and security, or meet a legal obligation. We do not use the current site analytics beacon for advertising profiles.",
    ],
  },
  {
    title: "Retention and security",
    paragraphs: [
      "We retain inquiry, account, and analytics records for as long as reasonably needed for the purposes described here, to operate the portal, and to meet legal or security needs. Retention may differ by record type; we do not publish a fixed deletion schedule. You can request account or inquiry deletion using the contact form, subject to information we must retain for legitimate operational or legal reasons.",
      "We use service-provider security features and access controls intended to protect information. No website or storage system can be guaranteed completely secure.",
    ],
  },
  {
    title: "Your choices and requests",
    paragraphs: [
      "You may decline to submit an inquiry, change your theme preference, or choose not to use Google sign-in. You can ask us to access, correct, or delete information associated with you by sending a request through the contact form. We may need to verify your identity before acting. Depending on where you live, additional privacy rights may apply under local law.",
    ],
  },
  {
    title: "Children and third-party sites",
    paragraphs: [
      "This site and portal are intended for business use and are not designed for children. Links to third-party sites are provided for convenience; their privacy practices are governed by their own policies.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      `We may update this policy as the site or our practices change. The date at the top shows when it was last revised. For privacy questions or requests, use the contact form linked below and include “Privacy request” in your message.`,
    ],
  },
]

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" description="What information Triodev handles when you browse the site, contact us, or use the client portal." updatedAt={updatedAt} sections={sections} />
}
