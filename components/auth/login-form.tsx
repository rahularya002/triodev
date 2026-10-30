"use client"

import { useActionState } from "react"
import Link from "next/link"
import { signInWithEmail } from "@/app/auth/actions"
import { AuthLayout } from "@/components/auth/auth-layout"
import { GoogleAuthButton } from "@/components/auth/google-auth-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface LoginFormProps {
  next?: string
  authError?: string
}

export function LoginForm({ next, authError }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await signInWithEmail(formData)) ?? null
    },
    null
  )

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to access your Triodev workspace."
    >
      {authError && (
        <p role="alert" className="mb-4 text-xs text-red-600 dark:text-red-400">
          {authError === "auth_callback_failed"
            ? "Google sign-in could not be completed. Please try again."
            : "Google sign-in is only available for client accounts."}
        </p>
      )}
      <form action={formAction} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2" />
        </div>
        {state?.error && (
          <p className="text-xs text-red-600 dark:text-red-400">{state.error}</p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {!next?.startsWith("/admin") && (
        <>
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-3 text-[10px] font-mono uppercase tracking-wider text-muted">
              Or
            </span>
          </div>
          <GoogleAuthButton next={next} />
        </>
      )}

      <p className="text-center text-xs text-muted mt-6">
        New client?{" "}
        <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
