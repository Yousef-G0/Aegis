"use client"

import { useEffect, useState } from "react"
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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  type UserOut,
  type ExposureScore,
  type EventItem,
} from "@/lib/api"
import {
  AlertTriangle,
  Activity,
  ShieldHalf,
  ExternalLink,
  ScrollTextIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const severityStyles: Record<string, string> = {
  critical: "border-destructive/50 bg-destructive/10 text-destructive",
  high: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  medium:
    "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  low: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  info: "border-border bg-muted text-muted-foreground",
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
      <SheetHeader>
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
  const router = useRouter()
  const [user, setUser] = useState<UserOut | null>(null)
  const [exposure, setExposure] = useState<ExposureScore | null>(null)
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selected, setSelected] = useState<EventItem | null>(null)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace("/sign-in")
      return
    }
    Promise.all([
      getMe(token),
      getExposure(token),
      getEvents(token, { limit: 100 }),
    ])
      .then(([u, exp, ev]) => {
        setUser(u)
        setExposure(exp)
        setEvents(ev)
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard",
        )
        if (err instanceof Error && /40[13]/.test(err.message)) {
          clearToken()
          router.replace("/sign-in")
        }
      })
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading dashboard…</p>
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
    <SidebarProvider>
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
                <CardContent className="flex items-center justify-between p-4">
                  <div>
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
                  <s.icon className="size-4 text-muted-foreground" />
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
            </div>

            {events.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-sm text-muted-foreground">
                  No events yet.
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
                    <Card className="transition-colors hover:border-foreground/40 hover:bg-muted/50">
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
          className="w-full gap-0 overflow-y-auto sm:max-w-xl"
        >
          {selected && <EventDetail event={selected} />}
        </SheetContent>
      </Sheet>
    </SidebarProvider>
  )
}
