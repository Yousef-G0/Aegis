"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { AppShellLoader } from "@/components/app-shell-loader"
import { ThemeToggle } from "@/components/theme-toggle"
import { EventList } from "@/components/event-list"
import { X } from "lucide-react"
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
  const searchParams = useSearchParams()
  const activeIdentifier = searchParams.get("identifier") ?? ""
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
        const idForFilter = searchParams.get("identifier") ?? ""
        const [u, ev, idents] = await Promise.all([
          getMe(token),
          getEvents(token, {
            limit: 200,
            ...(idForFilter ? { identifier_id: idForFilter } : {}),
          }),
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
    [router, searchParams],
  )

  useEffect(() => {
    loadData({ initial: true })
  }, [loadData])

  const activeIdent = identifiers.find((i) => i.id === activeIdentifier)
  function clearIdentifierFilter() {
    router.push("/events")
  }

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

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 pt-6 sm:p-8">
          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {activeIdent && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtered by</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-sm">
                <span className="font-medium capitalize">
                  {activeIdent.type}
                </span>
                <span className="text-muted-foreground">
                  {activeIdent.name ?? activeIdent.value}
                </span>
                <button
                  type="button"
                  onClick={clearIdentifierFilter}
                  aria-label="Clear filter"
                  className="ml-0.5 flex size-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </span>
            </div>
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
