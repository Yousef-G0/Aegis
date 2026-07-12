"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
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
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
    isActive: true,
    items: [{ title: "Identifiers", url: "/identifiers" }],
  },
  {
    title: "Actions",
    url: "#",
    icon: <ZapIcon />,
  },
  {
    title: "Events",
    url: "#",
    icon: <ScrollTextIcon />,
  },
  {
    title: "Identifiers",
    url: "/identifiers",
    icon: <FingerprintIcon />,
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
          <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
           {/* <ShieldHalf className="size-4" /> */}
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
