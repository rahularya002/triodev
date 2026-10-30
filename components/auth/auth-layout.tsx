import { Logo } from "@/components/agency/Logo"
import Link from "next/link"

interface AuthLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

export function AuthLayout({ title, description, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-6 w-auto text-primary mb-4" />
          <span className="text-[10px] tracking-[0.2em] text-primary font-mono uppercase font-bold">
            Triodev Portal
          </span>
        </div>
        <div className="rounded-3xl border border-primary/16 bg-surface p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-1">{title}</h1>
          <p className="text-sm text-muted mb-6">{description}</p>
          {children}
        </div>
        <nav aria-label="Legal" className="mt-5 flex justify-center gap-5 text-xs text-muted">
          <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link>
        </nav>
      </div>
    </div>
  )
}
