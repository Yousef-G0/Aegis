"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useRouter } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AegisLoader } from "@/components/aegis-loader"
import { ThemeToggle } from "@/components/theme-toggle"
import { EventList } from "@/components/event-list"
import {
  getToken,
  clearToken,
  getMe,
  getEvents,
  getIdentifiers,
  type UserOut,
  type EventItem,
  type Identifier,
} from "@/lib/api"

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
  const [user, setUser] = useState<UserOut | null>(null)
  const [events, setEvents] = useState<EventItem[]>([])
  const [identifiers, setIdentifiers] = useState<Identifier[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")

  const loadData = useCallback(
    async (opts: { initial?: boolean } = {}) => {
      const token = getToken()
      if (!token) {
        router.replace("/sign-in")
        return
      }
      if (opts.initial) setLoading(true)
      else setRefreshing(true)
      try {
        const [u, ev, idents] = await Promise.all([
          getMe(token),
          getEvents(token, { limit: 200 }),
          getIdentifiers(token),
        ])
        setUser(u)
        setEvents(ev)
        setIdentifiers(idents)
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
    },
    [router],
  )

  useEffect(() => {
    loadData({ initial: true })
  }, [loadData])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <AegisLoader label="Loading events…" />
      </main>
    )
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
      <AppSidebar
        user={user ? { name: user.email, email: user.email } : undefined}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Events</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <EventList
            events={events}
            identifiers={identifiers}
            onRefresh={() => loadData()}
            refreshing={refreshing}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
