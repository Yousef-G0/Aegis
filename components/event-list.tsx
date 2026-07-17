"use client"

import { useState, useMemo, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ExternalLink,
  ScrollTextIcon,
  X,
  Search,
  SlidersHorizontal,
  AlertTriangle,
  Activity,
  ShieldHalf,
  GitBranch,
  FileSearch,
  BadgeCheck,
  ClipboardList,
  KeyRound,
  Send,
  Globe,
  RefreshCw,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EventItem, Identifier } from "@/lib/api"

const severityStyles: Record<string, string> = {
  critical: "rounded-md border-destructive/40 bg-destructive/10 text-destructive",
  high: "rounded-md border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  medium: "rounded-md border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
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

type SourceMeta = { label: string; icon: LucideIcon; className: string }

const SOURCE_META: Record<string, SourceMeta> = {
  github: { label: "GitHub", icon: GitBranch, className: "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  psbdmp: { label: "Psbdmp", icon: FileSearch, className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  pastebin: { label: "Pastebin", icon: ClipboardList, className: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  crtsh: { label: "crt.sh", icon: BadgeCheck, className: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  leaks: { label: "Leak repos", icon: KeyRound, className: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  telegram: { label: "Telegram", icon: Send, className: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
}

function sourceMeta(source: string): SourceMeta {
  return (
    SOURCE_META[source] ?? {
      label: source ? source[0].toUpperCase() + source.slice(1) : "Unknown",
      icon: Globe,
      className: "border-border bg-muted text-muted-foreground",
    }
  )
}

const SEVERITY_OPTIONS = ["critical", "high", "medium", "low", "info"] as const
const STATUS_OPTIONS = ["new", "reviewed", "resolved", "ignored"] as const

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] truncate font-medium">{value}</span>
    </div>
  )
}

function EventDetail({ event }: { event: EventItem }) {
  const meta = sourceMeta(event.source)
  const SourceIcon = meta.icon
  return (
    <div className="flex flex-1 flex-col">
      <SheetHeader className="pr-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn(severityStyles[event.severity] ?? "")}>
            {event.severity}
          </Badge>
          <Badge variant="outline" className={cn("gap-1 rounded-md", meta.className)}>
            <SourceIcon className="size-3" />
            {meta.label}
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
          <Badge variant="outline" className={cn(severityStyles[event.severity] ?? "")}>
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

type SourcePillProps = {
  active: boolean
  onClick: () => void
  label: string
  count: number
  icon?: React.ReactNode
  activeClassName?: string
}

function SourcePill({ active, onClick, label, count, icon, activeClassName }: SourcePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
        active
          ? cn("border-primary bg-primary/10 text-foreground shadow-sm", activeClassName)
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {icon}
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] leading-none tabular-nums",
          active ? "bg-background/60" : "bg-muted",
        )}
      >
        {count}
      </span>
    </button>
  )
}

export function EventList({
  events,
  identifiers = [],
  onRefresh,
  refreshing = false,
}: {
  events: EventItem[]
  identifiers?: Identifier[]
  onRefresh?: () => void
  refreshing?: boolean
}) {
  const [selected, setSelected] = useState<EventItem | null>(null)
  const [query, setQuery] = useState("")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const e of events) counts[e.source] = (counts[e.source] ?? 0) + 1
    return counts
  }, [events])

  const availableSources = useMemo(
    () => Object.keys(sourceCounts).sort(),
    [sourceCounts],
  )

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      if (sourceFilter !== "all" && e.source !== sourceFilter) return false
      if (severityFilter !== "all" && e.severity !== severityFilter) return false
      if (statusFilter !== "all" && e.status !== statusFilter) return false
      if (q) {
        const hay =
          `${e.title ?? ""} ${e.preview ?? ""} ${e.source} ${e.source_type}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [events, query, sourceFilter, severityFilter, statusFilter])

  const activeFilterCount =
    (sourceFilter !== "all" ? 1 : 0) +
    (severityFilter !== "all" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0)

  const clearFilters = useCallback(() => {
    setQuery("")
    setSourceFilter("all")
    setSeverityFilter("all")
    setStatusFilter("all")
  }, [])

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <ScrollTextIcon className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Events</h2>
        <span className="text-sm text-muted-foreground">
          {activeFilterCount > 0
            ? `(${filteredEvents.length} of ${events.length})`
            : `(${events.length})`}
        </span>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} />
            {refreshing ? "Refreshing…" : "Refresh"}
          </Button>
        )}
      </div>

      {events.length > 0 && (
        <div className="mb-3 rounded-xl border border-border bg-card/50 p-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events…"
                className="pl-8"
              />
            </div>

            <div className="flex items-center gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger size="sm" className="w-[130px]">
                  <SlidersHorizontal className="size-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All severities</SelectItem>
                  {SEVERITY_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger size="sm" className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1 text-muted-foreground lg:ml-auto"
              >
                <X className="size-3.5" />
                Clear ({activeFilterCount})
              </Button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <SourcePill
              active={sourceFilter === "all"}
              onClick={() => setSourceFilter("all")}
              label="All sources"
              count={events.length}
            />
            {availableSources.map((src) => {
              const meta = sourceMeta(src)
              const Icon = meta.icon
              return (
                <SourcePill
                  key={src}
                  active={sourceFilter === src}
                  onClick={() =>
                    setSourceFilter(sourceFilter === src ? "all" : src)
                  }
                  label={meta.label}
                  count={sourceCounts[src]}
                  icon={<Icon className="size-3.5" />}
                  activeClassName={meta.className}
                />
              )
            })}
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
            {identifiers.length === 0 ? (
              <>
                <ScrollTextIcon className="size-8 text-muted-foreground" />
                <p className="max-w-sm text-sm text-muted-foreground">
                  No identifiers yet. Add a domain, keyword, or email on the{" "}
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
                <p className="text-sm text-muted-foreground">
                  No events found yet. Results will appear here as they are discovered.
                </p>
                {onRefresh && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={onRefresh}
                    disabled={refreshing}
                  >
                    <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} />
                    Check again
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ) : filteredEvents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <Search className="size-7 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No events match your filters.
            </p>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={clearFilters}>
              <X className="size-3.5" />
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {filteredEvents.map((e) => {
            const meta = sourceMeta(e.source)
            const SourceIcon = meta.icon
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => setSelected(e)}
                className="block w-full text-left"
              >
                <Card className="transition-all hover:ring-foreground/20">
                  <CardContent className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(severityStyles[e.severity] ?? "")}
                        >
                          {e.severity}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn("gap-1 rounded-md", meta.className)}
                        >
                          <SourceIcon className="size-3" />
                          {meta.label}
                        </Badge>
                        <span
                          className={cn(
                            "text-xs font-medium uppercase",
                            statusStyles[e.status] ?? "text-muted-foreground",
                          )}
                        >
                          {e.status}
                        </span>
                        {typeof e.confidence === "number" && (
                          <span
                            className={cn(
                              "rounded-md border px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                              e.confidence >= 0.7
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : e.confidence >= 0.5
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                  : "border-border bg-muted text-muted-foreground",
                            )}
                            title="Match confidence — lower scores are more likely false positives"
                          >
                            {Math.round(e.confidence * 100)}% match
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 truncate text-sm font-medium">
                        {e.title || e.preview || "(no title)"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {e.source_type.replace(/_/g, " ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(e.first_seen_at)}
                    </span>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>
      )}

      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <SheetContent side="right" className="w-full overflow-y-auto p-4 sm:max-w-xl">
          {selected && <EventDetail event={selected} />}
        </SheetContent>
      </Sheet>
    </div>
  )
}
