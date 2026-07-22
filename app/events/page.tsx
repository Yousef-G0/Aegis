"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppShellLoader } from "@/components/app-shell-loader"
import { AegisLoader } from "@/components/aegis-loader"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  getToken,
  clearToken,
  getMe,
  getEvents,
  type UserOut,
  type EventItem,
} from "@/lib/api"
import { EventKanban } from "@/components/event-kanban"
import { ArrowRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <AegisLoader label="Loading events…" />
        </main>
      }
    >
      <EventsContent />
    </Suspense>
  )
}

function EventsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<UserOut | null>(null)
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")

  const loadData = useCallback(async () => {
    const token = getToken()
    if (!token) {
      router.replace("/sign-in")
      return
    }
    setLoading(true)
    try {
      const [u, ev] = await Promise.all([
        getMe(token),
        getEvents(token, { limit: 200 }),
      ])
      setUser(u)
      setEvents(ev)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events")
      if (err instanceof Error && /40[13]/.test(err.message)) {
        clearToken()
        router.replace("/sign-in")
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [router])

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    loadData()
  }, [loadData])

  useEffect(() => {
    loadData()
  }, [loadData])

  if (loading) {
    return <AppShellLoader title="Events" />
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user ? { name: user.email, email: user.email } : undefined} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div
              className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary"
            >
              <Activity className="size-4" />
            </div>
            <h1 className="text-lg font-semibold">Events</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 pt-6 sm:p-8">
          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {events.length === 0 && (
            <Card className="rounded-2xl border-dashed border-border">
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Activity className="size-5" />
                </div>
                <div>
                  <p className="font-medium">No events yet</p>
                  <p className="mt-0.5 max-w-md text-sm text-muted-foreground">
                    Add identifiers to start monitoring. Events will appear here as
                    they are discovered.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/identifiers">Add your first identifier</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {events.length > 0 && (
            <div className="flex-1 min-h-0">
              <EventKanban events={events} onRefresh={handleRefresh} refreshing={refreshing} />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}