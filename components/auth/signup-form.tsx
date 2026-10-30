"use client"

import { useActionState } from "react"
import Link from "next/link"
import { signUpWithEmail } from "@/app/auth/actions"
import { AuthLayout } from "@/components/auth/auth-layout"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; notice?: string } | null, formData: FormData) => {
      return (await signUpWithEmail(formData)) ?? null
    },
    null
  )

  return (
    <AuthLayout
      title="Create your account"
      description="Register your company to start working with Triodev."
    >
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="email">Work Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" required minLength={8} className="mt-2" />
        </div>
        {state?.error && (
          <p className="text-xs text-red-600 dark:text-red-400">{state.error}</p>
        )}
        {state?.notice && (
          <p className="text-xs text-primary">{state.notice}</p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-3 text-[10px] font-mono uppercase tracking-wider text-muted">
          Or
        </span>
      </div>

      <GoogleAuthButton />

      <p className="text-center text-xs text-muted mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
