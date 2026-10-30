import { LoginForm } from "@/components/auth/login-form"

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams
  return <LoginForm next={next} authError={error} />
}
