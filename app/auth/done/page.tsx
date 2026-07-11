"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/api"

export default function AuthDonePage() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) setToken(token)
    router.replace("/dashboard")
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </main>
  )
}
