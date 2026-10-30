import { redirect } from "next/navigation"
import { OnboardingForm } from "@/components/auth/onboarding-form"
import { getAuthContext } from "@/lib/auth/session"

export default async function OnboardingPage() {
  const { user, profile, hasOrganization } = await getAuthContext()

  if (!user) redirect("/auth/login")
  if (!profile || profile.role !== "client") redirect("/admin")
  if (hasOrganization) redirect("/client")

  return <OnboardingForm />
}
