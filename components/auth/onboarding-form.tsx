"use client"

import { useActionState } from "react"
import { createOrganization } from "@/app/auth/actions"
import { AuthLayout } from "@/components/auth/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function OnboardingForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await createOrganization(formData)) ?? null
    },
    null
  )

  return (
    <AuthLayout
      title="Set up your company"
      description="Create your organization to access the client portal."
    >
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="industry">Industry (optional)</Label>
          <Input id="industry" name="industry" className="mt-2" />
        </div>
        <div>
          <Label htmlFor="website">Website (optional)</Label>
          <Input id="website" name="website" type="url" placeholder="https://" className="mt-2" />
        </div>
        {state?.error && (
          <p className="text-xs text-red-600 dark:text-red-400">{state.error}</p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating..." : "Continue to Portal"}
        </Button>
      </form>
    </AuthLayout>
  )
}
