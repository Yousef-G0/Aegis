"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { AuthShell } from "@/components/auth-shell"
import { cn } from "@/lib/utils"
import { login, setToken } from "@/lib/api"

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus-visible:border-foreground"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-foreground bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
    >
      {icon}
      {label}
    </button>
  )
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        or
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

export default function SignInPage() {
  const router = useRouter()
  const [isEmailExpanded, setIsEmailExpanded] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit() {
    setError("")
    if (!email || !password) {
      setError("Email and password are required.")
      return
    }
    setLoading(true)
    try {
      const token = await login(email, password)
      setToken(token.access_token)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Aegis workspace and pick up where you left off."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <a
            href="/sign-up"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Sign up
          </a>
        </>
      }
    >
      <div className="space-y-3">
        <SocialButton
          icon={<GoogleIcon />}
          label="Continue with Google"
          onClick={() => {
            window.location.href = "/auth/login/google"
          }}
        />
        <SocialButton
          icon={<GitHubIcon />}
          label="Continue with GitHub"
          onClick={() => {
            window.location.href = "/auth/login/github"
          }}
        />
      </div>

      <Divider />

      <button
        type="button"
        onClick={() => setIsEmailExpanded((v) => !v)}
        aria-expanded={isEmailExpanded}
        className="flex w-full items-center justify-between rounded-md border-2 border-foreground bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
      >
        Continue with Email
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-300 ease-in-out",
            isEmailExpanded && "rotate-180",
          )}
        />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isEmailExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "space-y-4 pt-4 transition-all duration-300 ease-in-out",
              isEmailExpanded
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0",
            )}
          >
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="pixel-btn pixel-btn-primary w-full justify-center text-xs disabled:opacity-70"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </AuthShell>
  )
}
