"use client"

import { useEffect, useState, useCallback, useMemo, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { SeverityDonut, SourceBar } from "@/components/exposure-charts"
import { EventList } from "@/components/event-list"
import {
  getToken,
  clearToken,
  getMe,
  getExposure,
  getEvents,
  getIdentifiers,
  type UserOut,
  type ExposureScore,
  type EventItem,
  type Identifier,
} from "@/lib/api"
import {
  AlertTriangle,
  Activity,
  ShieldHalf,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <AegisLoader label="Loading dashboard…" />
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const identifierId = searchParams.get("identifier")
  const [user, setUser] = useState<UserOut | null>(null)
  const [exposure, setExposure] = useState<ExposureScore | null>(null)
  const [events, setEvents] = useState<EventItem[]>([])
  const [identifiers, setIdentifiers] = useState<Identifier[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const e of events) counts[e.source] = (counts[e.source] ?? 0) + 1
    return counts
  }, [events])

  const recentEvents = useMemo(() => events.slice(0, 6), [events])

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
        const [u, exp, ev, idents] = await Promise.all([
          getMe(token),
          getExposure(token),
          getEvents(token, {
            limit: 100,
            ...(identifierId ? { identifier_id: identifierId } : {}),
          }),
          getIdentifiers(token),
        ])
        setUser(u)
        setExposure(exp)
        setEvents(ev)
        setIdentifiers(idents)
        setError("")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard")
        if (err instanceof Error && /40[13]/.test(err.message)) {
          clearToken()
          router.replace("/sign-in")
        }
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [router, identifierId],
  )

  useEffect(() => {
    loadData({ initial: true })
  }, [loadData])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <AegisLoader label="Loading dashboard…" />
      </main>
    )
  }

  const stats = exposure
    ? [
        {
          label: "Total events",
          value: exposure.total_events,
          icon: Activity,
        },
        {
          label: "Critical",
          value: exposure.critical_count,
          icon: AlertTriangle,
          tone: "critical" as const,
        },
        { label: "High", value: exposure.high_count, icon: AlertTriangle, tone: "high" as const },
        {
          label: "Exposure score",
          value: exposure.exposure_score,
          icon: ShieldHalf,
        },
        {
          label: "New (30d)",
          value: exposure.new_events_last_30_days,
          icon: Activity,
        },
      ]
    : []

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
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p
                      className={cn(
                        "mt-1 text-2xl font-bold",
                        s.tone === "critical" && "text-destructive",
                        s.tone === "high" &&
                          "text-orange-600 dark:text-orange-400",
                      )}
                    >
                      {s.value}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground",
                      s.tone === "critical" && "bg-destructive/10 text-destructive",
                      s.tone === "high" &&
                        "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                    )}
                  >
                    <s.icon className="size-4" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SeverityDonut exposure={exposure!} />
            <SourceBar counts={sourceCounts} />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Recent events</h2>
              <Link
                href="/events"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "ml-auto gap-1 text-muted-foreground",
                )}
              >
                View all <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <EventList
              events={recentEvents}
              identifiers={identifiers}
              onRefresh={() => loadData()}
              refreshing={refreshing}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
