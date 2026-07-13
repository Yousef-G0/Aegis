"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getToken,
  clearToken,
  getMe,
  getIdentifiers,
  createIdentifier,
  deleteIdentifier,
  type UserOut,
  type Identifier,
  type IdentifierType,
} from "@/lib/api"
import { cn } from "@/lib/utils"
import {
  Info,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  Fingerprint,
} from "lucide-react"

const TYPE_OPTIONS: { label: string; value: IdentifierType }[] = [
  { label: "Domain", value: "domain" },
  { label: "Keyword", value: "keyword" },
  { label: "Email", value: "email" },
  { label: "IP Address", value: "ip" },
  { label: "Username", value: "username" },
]

const TYPE_LABEL: Record<string, string> = Object.fromEntries(
  TYPE_OPTIONS.map((o) => [o.value, o.label]),
)

const PLACEHOLDERS: Record<string, string> = {
  domain: "example.com",
  keyword: "acme",
  email: "user@example.com",
  ip: "8.8.8.8",
  username: "admin",
}

const SEVERITIES = ["info", "low", "medium", "high", "critical"] as const
type Severity = (typeof SEVERITIES)[number]

const SEVERITY_DOT: Record<Severity, string> = {
  info: "bg-slate-400",
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-500",
}

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Enabled", value: "enabled" },
  { label: "Disabled", value: "disabled" },
]

const TYPE_FILTER_OPTIONS = [
  { label: "All", value: "all" },
  ...TYPE_OPTIONS,
]

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return "—"
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        checked ? "bg-primary" : "bg-input",
      )}
    >
      <span
        className={cn(
          "inline-block size-4 rounded-full bg-background shadow transition-transform",
          checked ? "translate-x-4" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

function CreateIdentifierSheet({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => void
}) {
  const [tab, setTab] = useState("configuration")
  const [type, setType] = useState<IdentifierType>("domain")
  const [value, setValue] = useState("")
  const [enabled, setEnabled] = useState(true)
  const [sev, setSev] = useState<Record<Severity, boolean>>({
    info: true,
    low: true,
    medium: true,
    high: true,
    critical: true,
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState("")

  function reset() {
    setTab("configuration")
    setType("domain")
    setValue("")
    setEnabled(true)
    setSev({ info: true, low: true, medium: true, high: true, critical: true })
    setFormError("")
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset()
    onOpenChange(next)
  }

  async function handleSubmit() {
    if (!value.trim()) {
      setFormError("Value is required.")
      return
    }
    const token = getToken()
    if (!token) return
    setSubmitting(true)
    setFormError("")
    try {
      const selected = SEVERITIES.filter((s) => sev[s])
      const severity_filter =
        selected.length === SEVERITIES.length
          ? "all"
          : selected.join(",")
      await createIdentifier(token, {
        type,
        value: value.trim(),
        enabled,
        severity_filter,
      })
      handleOpenChange(false)
      onCreated()
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to create identifier",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Create Identifier</SheetTitle>
          <SheetDescription>
            Monitor an asset across the open, deep, and dark web.
          </SheetDescription>
        </SheetHeader>

        <Tabs
          value={tab}
          onValueChange={setTab}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="border-b border-border px-4">
            <TabsList className="h-10">
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent
            value="configuration"
            className="flex-1 space-y-5 overflow-y-auto p-4"
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Type</label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as IdentifierType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Value</label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={PLACEHOLDERS[type]}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severity filter</label>
              <div className="space-y-2 rounded-lg border border-border p-3">
                {SEVERITIES.map((s) => (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-2.5"
                  >
                    <Checkbox
                      checked={sev[s]}
                      onCheckedChange={(c) =>
                        setSev((prev) => ({ ...prev, [s]: c as boolean }))
                      }
                    />
                    <span
                      className={cn("size-2.5 rounded-full", SEVERITY_DOT[s])}
                    />
                    <span className="text-sm capitalize">{s}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Enabled</p>
                <p className="text-xs text-muted-foreground">
                  Start monitoring immediately after creation.
                </p>
              </div>
              <Switch checked={enabled} onChange={setEnabled} />
            </div>

            {formError && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}
          </TabsContent>

          <TabsContent
            value="logs"
            className="flex-1 overflow-y-auto p-4 text-sm text-muted-foreground"
          >
            <p>No activity yet. Logs will appear here once the identifier is created and starts collecting events.</p>
          </TabsContent>

          <div className="mt-auto flex items-center gap-2 border-t border-border p-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Creating…" : "Create Identifier"}
            </Button>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

export default function IdentifiersPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserOut | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [identifiers, setIdentifiers] = useState<Identifier[]>([])

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const [createOpen, setCreateOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    const token = getToken()
    if (!token) {
      router.replace("/sign-in")
      return
    }
    setLoading(true)
    try {
      const [u, list] = await Promise.all([
        getMe(token),
        getIdentifiers(token),
      ])
      setUser(u)
      setIdentifiers(list)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load identifiers",
      )
      if (err instanceof Error && /40[13]/.test(err.message)) {
        clearToken()
        router.replace("/sign-in")
      }
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return identifiers.filter((i) => {
      const name = (i.name ?? i.value ?? "").toLowerCase()
      if (q && !name.includes(q)) return false
      if (statusFilter !== "all") {
        const isEnabled = i.enabled
        if (statusFilter === "enabled" && !isEnabled) return false
        if (statusFilter === "disabled" && isEnabled) return false
      }
      if (typeFilter !== "all" && i.type !== typeFilter) return false
      return true
    })
  }, [identifiers, search, statusFilter, typeFilter])

  const allSelected =
    filtered.length > 0 && filtered.every((i) => selectedIds.has(i.id))
  const someSelected = filtered.some((i) => selectedIds.has(i.id))

  function toggleAll() {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allSelected) filtered.forEach((i) => next.delete(i.id))
      else filtered.forEach((i) => next.add(i.id))
      return next
    })
  }

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleDelete(id: string) {
    const token = getToken()
    if (!token) return
    setDeletingId(id)
    try {
      await deleteIdentifier(token, id)
      setIdentifiers((prev) => prev.filter((i) => i.id !== id))
      setSelectedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete identifier")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
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
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Identifiers</BreadcrumbPage>
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

          {/* Page header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">Identifiers</h1>
                <Info
                  className="size-4 text-muted-foreground"
                  aria-label="About identifiers"
                />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {identifiers.length.toLocaleString()} / 1,000,000 identifiers in
                use
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline">Bulk Import</Button>
              <Button variant="outline">Create Group</Button>
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="size-4" />
                Create Identifier
              </Button>
            </div>
          </div>

          <Tabs defaultValue="identifiers" className="flex-1">
            <TabsList>
              <TabsTrigger value="identifiers">Identifiers</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="discovery">Discovery</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>

            <TabsContent value="identifiers" className="mt-4 space-y-4">
              {/* Search + filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-56">
                  <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search identifiers…"
                    className="pl-8"
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_FILTER_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {identifiers.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
                  <Fingerprint className="size-8 text-muted-foreground" />
                  <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                    No identifiers yet. Click &lsquo;Create Identifier&rsquo; to
                    start monitoring your assets.
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  No identifiers match your filters.
                </div>
              ) : (
                <div className="rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="w-10">
                          <Checkbox
                            checked={allSelected}
                            indeterminate={someSelected && !allSelected}
                            onCheckedChange={toggleAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Creation Date</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((i) => (
                        <TableRow key={i.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.has(i.id)}
                              onCheckedChange={() => toggleOne(i.id)}
                              aria-label={`Select ${i.value}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {i.name ?? i.value}
                          </TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">
                              {TYPE_LABEL[i.type] ?? i.type}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(i.created_at)}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/dashboard?identifier=${encodeURIComponent(i.id)}`}
                              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              Events
                              <ExternalLink className="size-3" />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label={`Actions for ${i.value}`}
                                  />
                                }
                              >
                                <MoreHorizontal className="size-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="size-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => handleDelete(i.id)}
                                  disabled={deletingId === i.id}
                                >
                                  {deletingId === i.id ? (
                                    <Loader2 className="size-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="size-4" />
                                  )}
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recommended" className="mt-4">
              <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                Recommended identifiers based on your attack surface will appear
                here.
              </div>
            </TabsContent>
            <TabsContent value="discovery" className="mt-4">
              <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                Discovered assets and suggested monitors will appear here.
              </div>
            </TabsContent>
            <TabsContent value="policies" className="mt-4">
              <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                Alerting and remediation policies will appear here.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>

      <CreateIdentifierSheet
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={load}
      />
    </SidebarProvider>
  )
}
