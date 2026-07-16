"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { setToken } from "@/lib/api"
import { AegisLoader } from "@/components/aegis-loader"

export default function AuthDonePage() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) setToken(token)
    router.replace("/dashboard")
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AegisLoader label="Signing you in…" size={96} />
    </main>
  )
}
