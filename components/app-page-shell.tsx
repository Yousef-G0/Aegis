"use client"

import { useEffect, useState, type ReactNode } from "react"
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
import { getToken, clearToken, getMe, type UserOut } from "@/lib/api"

export function AppPageShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<UserOut | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace("/sign-in")
      return
    }
    getMe(token)
      .then(setUser)
      .catch(() => {
        clearToken()
        router.replace("/sign-in")
      })
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <AegisLoader label={`Loading ${title.toLowerCase()}…`} size={88} />
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
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
