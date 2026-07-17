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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getToken,
  clearToken,
  getMe,
  type UserOut,
} from "@/lib/api"
import {
  PencilIcon,
  UserIcon,
  LockIcon,
  ShieldIcon,
  BellIcon,
} from "lucide-react"

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <AegisLoader label="Loading profile…" />
        </main>
      }
    >
      <ProfileContent />
    </Suspense>
  )
}

function initialsFromEmail(email: string): string {
  const name = email.split("@")[0] ?? "U"
  const parts = name.split(/[.\-_]/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function ProfileContent() {
  const router = useRouter()
  const [user, setUser] = useState<UserOut | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    const token = getToken()
    if (!token) {
      router.replace("/sign-in")
      return
    }
    setLoading(true)
    try {
      const u = await getMe(token)
      setUser(u)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile")
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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <AegisLoader label="Loading profile…" />
      </main>
    )
  }

  const createdAt = user
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

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
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-4 pt-6 sm:p-8">
          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {/* 1. Profile Hero Card */}
          <Card className="rounded-2xl border-border shadow-sm">
            <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
              <Avatar className="size-20 shrink-0">
                <AvatarFallback className="text-2xl">
                  {user ? initialsFromEmail(user.email) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {user?.email}
                  </h2>
                  <Badge
                    variant={user?.role === "admin" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {user?.role}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user?.role === "admin" ? "Workspace admin" : "Member"}
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <span>{user?.email}</span>
                  <span className="text-border">•</span>
                  <span>Workspace {user?.tenant_id?.slice(0, 8)}</span>
                  <span className="text-border">•</span>
                  <span>Joined {createdAt}</span>
                </p>
              </div>
              <Button variant="outline" className="shrink-0 self-start sm:self-center" disabled>
                <PencilIcon className="size-4" />
                Edit
              </Button>
            </CardContent>
          </Card>

          {/* 2. Tab Navigation */}
          <Tabs defaultValue="profile">
            <TabsList className="flex h-12 w-full gap-1 rounded-xl bg-muted p-1.5">
              <TabsTrigger
                value="profile"
                className="h-full flex-1 gap-2 rounded-lg text-sm"
              >
                <UserIcon className="size-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="h-full flex-1 gap-2 rounded-lg text-sm"
              >
                <LockIcon className="size-4" />
                Password
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="h-full flex-1 gap-2 rounded-lg text-sm"
              >
                <ShieldIcon className="size-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="h-full flex-1 gap-2 rounded-lg text-sm"
              >
                <BellIcon className="size-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* 3. Content Card */}
            <TabsContent value="profile" className="mt-8">
              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl">Profile</CardTitle>
                  <CardDescription>
                    Update your account information. This information is private.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email ?? ""} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={user?.role ?? ""}
                      readOnly
                      className="capitalize"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-id">User ID</Label>
                    <Input id="user-id" value={user?.id ?? ""} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workspace-id">Workspace</Label>
                    <Input id="workspace-id" value={user?.tenant_id ?? ""} readOnly />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={4}
                      placeholder="Tell us a little about yourself"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus-visible:border-foreground"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t border-border p-6 sm:p-8">
                  <Button variant="outline" disabled>
                    Cancel
                  </Button>
                  <Button disabled>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-8">
              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl">Password</CardTitle>
                  <CardDescription>
                    Change your password. Requires your current password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                  <div className="space-y-2">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="confirm">Confirm new password</Label>
                    <Input id="confirm" type="password" placeholder="••••••••" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-border p-6 sm:p-8">
                  <Button disabled>Update password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl">Security</CardTitle>
                  <CardDescription>
                    Manage your session and sign-in activity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Active sessions</p>
                      <p className="text-xs text-muted-foreground">
                        You are currently signed in on this device.
                      </p>
                    </div>
                    <Button variant="outline" disabled>
                      Sign out all
                    </Button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Two-factor authentication</p>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-8">
              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader className="p-6 sm:p-8">
                  <CardTitle className="text-xl">Notifications</CardTitle>
                  <CardDescription>
                    Choose what updates you want to receive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Security alerts</p>
                      <p className="text-xs text-muted-foreground">
                        Critical exposure and credential leaks.
                      </p>
                    </div>
                    <Switch id="security-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Weekly digest</p>
                      <p className="text-xs text-muted-foreground">
                        A summary of new events each week.
                      </p>
                    </div>
                    <Switch id="weekly-digest" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Product updates</p>
                      <p className="text-xs text-muted-foreground">
                        New features and announcements.
                      </p>
                    </div>
                    <Switch id="product-updates" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-border p-6 sm:p-8">
                  <Button disabled>Save preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
