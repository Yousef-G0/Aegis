"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ZapIcon,
  ScrollTextIcon,
  FingerprintIcon,
  PlugIcon,
  BellIcon,
  UsersIcon,
  KeyRoundIcon,
  BookOpenIcon,
  LifeBuoyIcon,
  FileTextIcon,
  ShieldHalf,
} from "lucide-react"

const mainNav = [
  {
    title: "Main",
    url: "#",
    icon: <LayoutDashboardIcon />,
    isActive: true,
    items: [
      { title: "Dashboard", url: "/dashboard" },
      { title: "Identifiers", url: "/identifiers" },
      { title: "Events", url: "/events" },
      { title: "Actions", url: "/actions" },
      { title: "Reports", url: "/reports" },
      { title: "Supply Chain", url: "/supply-chain" },
    ],
  },
]

const configureNav = [
  {
    title: "Integrations",
    url: "#",
    icon: <PlugIcon />,
  },
  {
    title: "Alerts",
    url: "#",
    icon: <BellIcon />,
  },
  {
    title: "Team",
    url: "#",
    icon: <UsersIcon />,
  },
  {
    title: "API Keys",
    url: "#",
    icon: <KeyRoundIcon />,
  },
]

const helpNav = [
  {
    title: "Documentation",
    url: "#",
    icon: <BookOpenIcon />,
  },
  {
    title: "Support",
    url: "#",
    icon: <LifeBuoyIcon />,
  },
  {
    title: "Changelog",
    url: "#",
    icon: <FileTextIcon />,
  },
]

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user?: { name: string; email: string; avatar?: string }
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="flex size-7 items-center justify-center overflow-hidden rounded-md bg-primary/10">
            <Logo className="size-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Aegis
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNav} label="Main" />
        <NavMain items={configureNav} label="Configure" />
        <NavMain items={helpNav} label="Help" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={
            user ?? {
              name: "Aegis User",
              email: "you@company.com",
              avatar: "",
            }
          }
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
