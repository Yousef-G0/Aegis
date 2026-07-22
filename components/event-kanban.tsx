"use client"

import { useState, useCallback, useMemo } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  GripVertical,
  AlertTriangle,
  GitBranch,
  FileSearch,
  ClipboardList,
  BadgeCheck,
  KeyRound,
  Send,
  Globe,
  Search,
  Filter,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ExternalLink,
  Flag,
  Archive,
  CheckCircle2,
  Eye,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { EventItem } from "@/lib/api"
import { updateEventStatus } from "@/lib/api"

const STATUS_COLUMNS = [
  { id: "new", label: "New", icon: Flag, color: "border-destructive/40 bg-destructive/10 text-destructive" },
  { id: "reviewed", label: "Reviewing", icon: Eye, color: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { id: "resolved", label: "Resolved", icon: CheckCircle2, color: "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400" },
  { id: "ignored", label: "Ignored", icon: Archive, color: "border-muted bg-muted text-muted-foreground" },
] as const

type StatusId = (typeof STATUS_COLUMNS)[number]["id"]

const SOURCE_META: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  github: { label: "GitHub", icon: GitBranch, className: "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  psbdmp: { label: "Psbdmp", icon: FileSearch, className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  pastebin: { label: "Pastebin", icon: ClipboardList, className: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  crtsh: { label: "crt.sh", icon: BadgeCheck, className: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  leaks: { label: "Leak repos", icon: KeyRound, className: "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  telegram: { label: "Telegram", icon: Send, className: "border-sky-500/40 bg-sky-500/10 text-sky-600 dark:text-sky-400" },
}

function sourceMeta(source: string) {
  return SOURCE_META[source] ?? {
    label: source ? source[0].toUpperCase() + source.slice(1) : "Unknown",
    icon: Globe,
    className: "border-border bg-muted text-muted-foreground",
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    critical: "border-destructive/40 bg-destructive/10 text-destructive",
    high: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    low: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    info: "border-border bg-muted text-muted-foreground",
  }
  return (
    <Badge variant="outline" className={cn("gap-1", styles[severity] ?? styles.info)}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  )
}

interface KanbanCardProps {
  event: EventItem
  onClick: () => void
  isDragging: boolean
}

function KanbanCard({ event, onClick, isDragging }: KanbanCardProps) {
  const meta = sourceMeta(event.source)
  const SourceIcon = meta.icon

  return (
    <div
      className={cn(
        "group cursor-pointer transition-all duration-200",
        isDragging && "rotate-1 shadow-xl ring-2 ring-primary/50 scale-[1.02] z-50"
      )}
      onClick={onClick}
    >
      <Card className={cn("overflow-hidden", isDragging ? "border-primary/50" : "hover:border-foreground/20")}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <SeverityBadge severity={event.severity} />
                <Badge variant="outline" className={cn("gap-1", meta.className)}>
                  <SourceIcon className="size-3" />
                  {meta.label}
                </Badge>
                {typeof event.confidence === "number" && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "gap-1 text-[10px] px-1.5",
                      event.confidence >= 0.7
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : event.confidence >= 0.5
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "border-border bg-muted text-muted-foreground"
                    )}
                    title="Match confidence — lower scores are more likely false positives"
                  >
                    {Math.round(event.confidence * 100)}%
                  </Badge>
                )}
              </div>
              <p className="font-medium text-sm truncate">{event.title || event.preview || "(no title)"}</p>
              <p className="mt-1 text-xs text-muted-foreground truncate">
                {event.source_type.replace(/_/g, " ")}
              </p>
            </div>
            <GripVertical className="text-muted-foreground/50 group-hover:text-muted-foreground size-4 shrink-0" />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{formatDate(event.first_seen_at)}</span>
            {event.source_url && (
              <a
                href={event.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="size-3" />
                Source
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface KanbanColumnProps {
  status: StatusId
  events: EventItem[]
  onEventClick: (event: EventItem) => void
  onDragEnd: (event: DragEndEvent) => void
  updatingIds: Set<string>
}

function KanbanColumn({ status, events, onEventClick, onDragEnd, updatingIds }: KanbanColumnProps) {
  const columnMeta = STATUS_COLUMNS.find((c) => c.id === status)!
  const Icon = columnMeta.icon

  return (
    <div
      id={status}
      data-status={status}
      role="list"
      aria-label={`${columnMeta.label} (${events.length})`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex size-7 items-center justify-center rounded-md",
              columnMeta.color
            )}
          >
            <Icon className="size-4" />
          </div>
          <span className="font-semibold text-sm">{columnMeta.label}</span>
          <Badge variant="secondary" className="text-xs">
            {events.length}
          </Badge>
        </div>
      </div>

      <SortableContext
        items={events.map((e) => e.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 min-h-[200px] p-1 rounded-lg transition-colors bg-muted/30">
          {events.map((event) => (
            <KanbanCard
              key={event.id}
              event={event}
              onClick={() => onEventClick(event)}
              isDragging={updatingIds.has(event.id)}
            />
          ))}
          {events.length === 0 && (
            <div className="h-24 flex flex-col items-center justify-center text-muted-foreground/50 border-dashed border-2 border-border rounded-lg">
              <span className="text-xs">Drop events here</span>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

interface EventDetailSheetProps {
  event: EventItem | null
  onClose: () => void
  onStatusChange: (eventId: string, status: StatusId) => void
}

function EventDetailSheet({ event, onClose, onStatusChange }: EventDetailSheetProps) {
  if (!event) return null

  const meta = sourceMeta(event.source)
  const SourceIcon = meta.icon

  const severityStyles: Record<string, string> = {
    critical: "border-destructive/40 bg-destructive/10 text-destructive",
    high: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    low: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    info: "border-border bg-muted text-muted-foreground",
  }

  return (
    <Sheet open={!!event} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full max-w-2xl p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className={cn(severityStyles[event.severity] ?? "")}>
                  {event.severity}
                </Badge>
                <Badge variant="outline" className={cn("gap-1", meta.className)}>
                  <SourceIcon className="size-3" />
                  {meta.label}
                </Badge>
                <span
                  className={cn(
                    "text-xs font-medium uppercase px-2 py-0.5 rounded",
                    event.status === "new" && "text-destructive bg-destructive/10",
                    event.status === "reviewed" && "text-blue-600 dark:text-blue-400 bg-blue-500/10",
                    event.status === "resolved" && "text-green-600 dark:text-green-400 bg-green-500/10",
                    event.status === "ignored" && "text-muted-foreground bg-muted"
                  )}
                >
                  {event.status}
                </span>
                {typeof event.confidence === "number" && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "gap-1 text-[10px] px-1.5",
                      event.confidence >= 0.7
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : event.confidence >= 0.5
                        ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "border-border bg-muted text-muted-foreground"
                    )}
                  >
                    {Math.round(event.confidence * 100)}% match
                  </Badge>
                )}
              </div>
              <SheetTitle className="text-lg font-medium truncate">
                {event.title || event.preview || "(no title)"}
              </SheetTitle>
              <SheetDescription className="truncate">{event.source}</SheetDescription>
            </div>
          </div>
	  </SheetHeader>

          <div className="p-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs text-muted-foreground">Source</label>
                <p className="font-medium">{event.source}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Source type</label>
                <p className="font-medium capitalize">{event.source_type.replace(/_/g, " ")}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Severity</label>
                <p className="font-medium capitalize">{event.severity}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Status</label>
                <p className="font-medium capitalize">{event.status}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-muted-foreground">Identifier</label>
                <p className="font-medium font-mono text-sm">{event.identifier_id ?? "—"}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">First seen</label>
                <p className="font-medium">{formatDate(event.first_seen_at)}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Last seen</label>
                <p className="font-medium">{formatDate(event.last_seen_at)}</p>
              </div>
              {typeof event.confidence === "number" && (
                <div>
                  <label className="text-xs text-muted-foreground">Confidence</label>
                  <p className="font-medium">
                    {Math.round(event.confidence * 100)}%
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <label className="text-xs text-muted-foreground">Content preview</label>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.preview || "No content preview available."}
              </p>
            </div>

            {event.source_url && (
              <div className="pt-2">
                <a
                  href={event.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <ExternalLink className="size-4" />
                  Open source
                </a>
              </div>
            )}

            <Separator />

            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground mr-auto">Change status</label>
              <Select
                value={event.status}
                onValueChange={(value) => onStatusChange(event.id, value as StatusId)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_COLUMNS.map((col) => (
                    <SelectItem key={col.id} value={col.id} className="capitalize flex items-center gap-2">
                      <col.icon className="size-4" />
                      {col.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
    </Sheet>
  )
}

export function EventKanban({
  events: initialEvents,
  onRefresh,
  refreshing = false,
}: {
  events: EventItem[]
  onRefresh?: () => void
  refreshing?: boolean
}) {
  const [events, setEvents] = useState<EventItem[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [query, setQuery] = useState("")
  const [sourceFilter, setSourceFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set())

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      if (sourceFilter !== "all" && e.source !== sourceFilter) return false
      if (severityFilter !== "all" && e.severity !== severityFilter) return false
      if (q) {
        const hay = `${e.title ?? ""} ${e.preview ?? ""} ${e.source} ${e.source_type}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [events, query, sourceFilter, severityFilter])

  const columns = useMemo(() => {
    const grouped: Record<StatusId, EventItem[]> = {
      new: [],
      reviewed: [],
      resolved: [],
      ignored: [],
    }
    for (const e of filteredEvents) {
      if (e.status in grouped) {
        grouped[e.status as StatusId].push(e)
      } else {
        grouped.new.push(e)
      }
    }
    return grouped
  }, [filteredEvents])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const newStatus = over.id as StatusId
      const eventId = active.id as string

      setUpdatingIds((prev) => new Set(prev).add(eventId))

      try {
        await updateEventStatus(eventId, newStatus)
        setEvents((prev) =>
          prev.map((e) => (e.id === eventId ? { ...e, status: newStatus } : e))
        )
      } catch (error) {
        console.error("Failed to update status:", error)
      } finally {
        setUpdatingIds((prev) => {
          const next = new Set(prev)
          next.delete(eventId)
          return next
        })
      }
    },
    []
  )

  const handleEventClick = useCallback((event: EventItem) => {
    setSelectedEvent(event)
  }, [])

  const handleStatusChange = useCallback(async (eventId: string, status: StatusId) => {
    setUpdatingIds((prev) => new Set(prev).add(eventId))
    try {
      await updateEventStatus(eventId, status)
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status } : e))
      )
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev)
        next.delete(eventId)
        return next
      })
    }
  }, [])

  const sourceCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const e of events) counts[e.source] = (counts[e.source] ?? 0) + 1
    return counts
  }, [events])

  const availableSources = useMemo(
    () => Object.keys(sourceCounts).sort(),
    [sourceCounts]
  )

  const activeFilterCount =
    (sourceFilter !== "all" ? 1 : 0) +
    (severityFilter !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <GitBranch className="size-4" />
            </div>
            <h2 className="text-lg font-semibold">Event Triage</h2>
            <Badge variant="secondary" className="text-xs">
              {filteredEvents.length} / {events.length}
            </Badge>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center w-full lg:w-auto">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events…"
                className="pl-8"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger size="sm" className="w-[140px]">
                  <Filter className="size-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex flex-wrap items-center gap-1.5">
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

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("")
                    setSourceFilter("all")
                    setSeverityFilter("all")
                  }}
                  className="gap-1 text-muted-foreground"
                >
                  <X className="size-3.5" />
                  Clear ({activeFilterCount})
                </Button>
              )}

              {onRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  disabled={refreshing}
                  className="gap-1.5"
                >
                  <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} />
                  {refreshing ? "Refreshing…" : "Refresh"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full flex">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-1 h-full">
              {STATUS_COLUMNS.map((col) => (
                <div key={col.id} className="flex flex-col min-w-0">
                  <KanbanColumn
                    status={col.id}
                    events={columns[col.id]}
                    onEventClick={handleEventClick}
                    onDragEnd={handleDragEnd}
                    updatingIds={updatingIds}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <EventDetailSheet
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </DndContext>
  )
}

function SourcePill({
  active,
  onClick,
  label,
  count,
  icon,
  activeClassName,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
  icon?: React.ReactNode
  activeClassName?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
        active
          ? cn("border-primary bg-primary/10 text-foreground shadow-sm", activeClassName)
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] leading-none tabular-nums",
          active ? "bg-background/60" : "bg-muted"
        )}
      >
        {count}
      </span>
    </button>
  )
}
