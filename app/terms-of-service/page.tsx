import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/site/legal-page"
import { siteConfig } from "@/lib/site-config"

const updatedAt = "October 30, 2026"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for accessing the Triodev website and client portal.",
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: "Terms for accessing the Triodev website and client portal.",
    url: `${siteConfig.url}/terms-of-service`,
  },
}

const sections: LegalSection[] = [
  {
    title: "Agreement and scope",
    paragraphs: [
      `These terms apply when you access ${siteConfig.url} or use the Triodev client portal. By using those services, you agree to these terms. If you do not agree, do not use the site or portal. These terms cover the website and portal only; paid design, development, or consulting work is governed by the separate proposal, statement of work, or other agreement for that project.`,
    ],
  },
  {
    title: "Using the portal",
    bullets: [
      "Provide accurate information when creating or using an account, and keep your sign-in credentials secure.",
      "Use only accounts and organization areas you are authorized to access. You are responsible for activity carried out through your account and for telling us promptly if you suspect unauthorized access.",
      "Do not misuse the site, interfere with its operation, attempt unauthorized access, introduce malicious code, or use it in violation of applicable law.",
    ],
  },
  {
    title: "Your submissions",
    paragraphs: [
      "You retain your rights in project descriptions, messages, and other materials you submit. You confirm that you have the right to share those materials with us. You allow Triodev to use them to respond to your inquiry, provide requested portal or project services, and protect the site. Any ownership, license, confidentiality, or delivery terms for project work are set out in the applicable written project agreement.",
    ],
  },
  {
    title: "Our site and materials",
    paragraphs: [
      "The website’s design, text, graphics, and software are owned by Triodev or its licensors and are protected by applicable intellectual-property laws. These terms give you permission to use the site for its intended business purposes; they do not transfer ownership of the site or its materials. You may not copy, distribute, or commercially exploit site materials except as permitted by law or with our written permission.",
    ],
  },
  {
    title: "Third-party services",
    paragraphs: [
      "The portal may rely on third-party services, including Supabase and Google sign-in. Third-party services are subject to their own terms and policies. We are not responsible for services or websites that we do not operate.",
    ],
  },
  {
    title: "Availability and changes",
    paragraphs: [
      "We may update, suspend, or discontinue parts of the site or portal, including to maintain security or make improvements. We aim to keep the services available but do not guarantee uninterrupted or error-free operation. We may suspend or end access where reasonably necessary to protect the services, users, or our legal rights.",
    ],
  },
  {
    title: "Disclaimers and limits",
    paragraphs: [
      "To the extent permitted by applicable law, the website and portal are provided as available, without warranties that they will meet every requirement or remain uninterrupted. Nothing in these terms excludes rights or limits liability that cannot legally be excluded or limited. Project-specific warranties, service levels, fees, and remedies must be set out in the applicable written project agreement.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      `We may revise these terms as the site changes. The date at the top shows when they were last updated. Continued use after an update means you accept the revised terms to the extent permitted by law. For questions, contact us through the form linked below.`,
    ],
  },
]

export default function TermsOfServicePage() {
  return <LegalPage title="Terms of Service" description="Terms for visiting the Triodev website and using the client portal." updatedAt={updatedAt} sections={sections} />
}
