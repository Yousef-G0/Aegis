"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  ExternalLink,
  ScrollTextIcon,
  X,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const severityStyles: Record<string, string> = {
  critical:
    "rounded-md border-destructive/40 bg-destructive/10 text-destructive",
  high: "rounded-md border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  medium:
    "rounded-md border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  low: "rounded-md border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  info: "rounded-md border-border bg-muted text-muted-foreground",
}

const statusStyles: Record<string, string> = {
  new: "text-destructive",
  reviewed: "text-blue-600 dark:text-blue-400",
  resolved: "text-green-600 dark:text-green-400",
  ignored: "text-muted-foreground",
}

const severityCopy: Record<string, string> = {
  critical:
    "Critical exposures should be remediated immediately — they are actively exploitable or publicly exposing sensitive assets.",
  high: "High severity exposures represent significant risk and should be prioritized within 24–48 hours.",
  medium:
    "Medium severity exposures are worth tracking and resolving during your regular remediation cycle.",
  low: "Low severity exposures are minor and can be batched into routine cleanup.",
  info: "Informational findings with little direct risk.",
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function EventDetail({ event }: { event: EventItem }) {
  return (
    <div className="flex flex-1 flex-col">
      <SheetHeader className="pr-8">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(severityStyles[event.severity] ?? "")}
          >
            {event.severity}
          </Badge>
          <span
            className={cn(
              "text-xs font-medium uppercase",
              statusStyles[event.status] ?? "text-muted-foreground",
            )}
          >
            {event.status}
          </span>
        </div>
        <SheetTitle className="text-base">
          {event.title || event.preview || "(no title)"}
        </SheetTitle>
        <SheetDescription className="truncate">{event.source}</SheetDescription>
      </SheetHeader>

      <Tabs defaultValue="summary" className="mt-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="takedown">Takedown</TabsTrigger>
          <TabsTrigger value="severity">Severity</TabsTrigger>
          <TabsTrigger value="ai">AI Assist</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-3 text-sm">
          <Field label="Source" value={event.source} />
          <Field label="Source type" value={event.source_type} />
          <Field label="Severity" value={event.severity} />
          <Field label="Status" value={event.status} />
          <Field label="Identifier" value={event.identifier_id ?? "—"} />
          <Field label="First seen" value={formatDate(event.first_seen_at)} />
          <Field label="Last seen" value={formatDate(event.last_seen_at)} />
        </TabsContent>

        <TabsContent value="content" className="space-y-3 text-sm">
          <p className="leading-relaxed text-muted-foreground">
            {event.preview || "No content preview is available for this event."}
          </p>
          {event.source_url && (
            <a
              href={event.source_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4"
            >
              Open source <ExternalLink className="size-3.5" />
            </a>
          )}
        </TabsContent>

        <TabsContent value="takedown" className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Request removal of this exposure from its source. Takedown requests
            require a connected remediation provider.
          </p>
          <Button disabled className="w-full">
            Request takedown
          </Button>
        </TabsContent>

        <TabsContent value="severity" className="space-y-3 text-sm">
          <Badge
            variant="outline"
            className={cn(severityStyles[event.severity] ?? "")}
          >
            {event.severity}
          </Badge>
          <p className="leading-relaxed text-muted-foreground">
            {severityCopy[event.severity] ??
              "No severity guidance is available for this event."}
          </p>
        </TabsContent>

        <TabsContent value="ai" className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Ask the assistant to summarize this exposure, draft a remediation
            plan, or assess business impact.
          </p>
          <textarea
            placeholder="e.g. What's the fastest way to remediate this?"
            className="min-h-24 w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus-visible:border-foreground"
          />
          <Button disabled className="w-full">
            Analyze with AI
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] truncate font-medium">{value}</span>
    </div>
  )
}

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
  const [activeIdentifier, setActiveIdentifier] = useState<Identifier | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState("")
  const [selected, setSelected] = useState<EventItem | null>(null)

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
        setActiveIdentifier(
          identifierId ? idents.find((i) => i.id === identifierId) ?? null : null,
        )
        setError("")
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard",
        )
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
        user={
          user ? { name: user.email, email: user.email } : undefined
        }
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
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

          {identifierId && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  Showing events for identifier:
                </span>
                <Badge variant="outline" className="rounded-md font-medium">
                  {activeIdentifier?.value ?? identifierId}
                </Badge>
              </div>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "h-7 gap-1 text-muted-foreground",
                )}
              >
                <X className="size-3.5" />
                Clear filter
              </Link>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {s.label}
                    </p>
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
                      s.tone === "critical" &&
                        "bg-destructive/10 text-destructive",
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

          <div>
            <div className="mb-3 flex items-center gap-2">
              <ScrollTextIcon className="size-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Events</h2>
              <span className="text-sm text-muted-foreground">
                ({events.length})
              </span>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1.5"
                onClick={() => loadData()}
                disabled={refreshing}
              >
                <RefreshCw
                  className={cn("size-3.5", refreshing && "animate-spin")}
                />
                {refreshing ? "Refreshing…" : "Refresh"}
              </Button>
            </div>

            {events.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
                  {identifiers.length === 0 ? (
                    <>
                      <ScrollTextIcon className="size-8 text-muted-foreground" />
                      <p className="max-w-sm text-sm text-muted-foreground">
                        No identifiers yet. Add a domain, keyword, or email on
                        the{" "}
                        <Link
                          href="/identifiers"
                          className="font-medium text-primary hover:underline"
                        >
                          Identifiers
                        </Link>{" "}
                        page to start monitoring for exposures.
                      </p>
                    </>
                  ) : (
                    <>
                      <AegisLoader label="Scanning for exposures…" />
                      <p className="max-w-md text-sm text-muted-foreground">
                        We&rsquo;re searching public sources (GitHub,
                        certificate logs, and more) for your identifiers. This
                        can take a few minutes — results will appear here as
                        they&rsquo;re found.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => loadData()}
                        disabled={refreshing}
                      >
                        <RefreshCw
                          className={cn(
                            "size-3.5",
                            refreshing && "animate-spin",
                          )}
                        />
                        Check again
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
                {events.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setSelected(e)}
                    className="block w-full text-left"
                  >
                    <Card className="transition-all hover:ring-foreground/20">
                      <CardContent className="flex items-start justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                severityStyles[e.severity] ?? "",
                              )}
                            >
                              {e.severity}
                            </Badge>
                            <span
                              className={cn(
                                "text-xs font-medium uppercase",
                                statusStyles[e.status] ??
                                  "text-muted-foreground",
                              )}
                            >
                              {e.status}
                            </span>
                          </div>
                          <p className="mt-1.5 truncate text-sm font-medium">
                            {e.title || e.preview || "(no title)"}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {e.source}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatDate(e.first_seen_at)}
                        </span>
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </SidebarInset>

      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-4 sm:max-w-xl"
      >
        {selected && <EventDetail event={selected} />}
      </SheetContent>
      </Sheet>
    </SidebarProvider>
  )
}
