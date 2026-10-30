import Link from "next/link"

export interface LegalSection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

interface LegalPageProps {
  title: string
  description: string
  updatedAt: string
  sections: LegalSection[]
}

export function LegalPage({ title, description, updatedAt, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 border-b border-primary/15 pb-8">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline">
            Triodev
          </Link>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Legal information · Updated {updatedAt}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{description}</p>
          <nav aria-label="Legal pages" className="mt-6 flex gap-5 text-sm">
            <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
          </nav>
        </header>

        <article className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-7 text-muted">{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-muted">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </article>

        <footer className="mt-14 border-t border-primary/15 pt-6 text-sm text-muted">
          Questions? Send a note through our <Link href="/#contact" className="text-primary hover:underline">contact form</Link>.
        </footer>
      </div>
    </main>
  )
}
