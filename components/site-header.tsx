"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

type SubItem = {
  label: string
  description: string
  href: string
}

type NavItem = {
  label: string
  href?: string
  children?: SubItem[]
}

const navItems: NavItem[] = [
  {
    label: "Platform",
    children: [
      {
        label: "CTI",
        description: "Cyber Threat Intelligence",
        href: "/platform/cti",
      },
      {
        label: "Attack Surface",
        description: "Monitor your external exposure",
        href: "/platform/attack-surface",
      },
      {
        label: "Exposure Management",
        description: "Prioritize what actually matters",
        href: "/platform/exposure",
      },
    ],
  },
  {
    label: "Solutions",
    children: [
      {
        label: "By Industry",
        description: "Tailored for your sector",
        href: "/solutions/industry",
      },
      {
        label: "By Role",
        description: "Built for security teams",
        href: "/solutions/role",
      },
      {
        label: "Integrations",
        description: "Connect your stack",
        href: "/solutions/integrations",
      },
    ],
  },
  {
    label: "Partners",
    children: [
      {
        label: "Become a Partner",
        description: "Join the Aegis network",
        href: "/partners/become",
      },
      {
        label: "Partner Directory",
        description: "Find a trusted partner",
        href: "/partners/directory",
      },
      {
        label: "Technology Alliance",
        description: "Integrate at the platform level",
        href: "/partners/alliance",
      },
    ],
  },
  {
    label: "Company",
    children: [
      {
        label: "About",
        description: "Our mission and team",
        href: "/company/about",
      },
      {
        label: "Careers",
        description: "Build the future of security",
        href: "/company/careers",
      },
      {
        label: "Newsroom",
        description: "Press and announcements",
        href: "/company/newsroom",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        label: "Blog",
        description: "Analysis and engineering notes",
        href: "/resources/blog",
      },
      {
        label: "Documentation",
        description: "Guides and API reference",
        href: "/resources/docs",
      },
      {
        label: "Reports",
        description: "Threat landscape research",
        href: "/resources/reports",
      },
    ],
  },
]

function NavDropdown({ item }: { item: NavItem }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 w-72 pt-3 opacity-0 transition-all duration-150 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="border-2 border-foreground bg-background shadow-[4px_4px_0_0_var(--foreground)]">
          <ul className="flex flex-col p-1">
            {item.children?.map((child) => (
              <li key={child.href}>
                <a
                  href={child.href}
                  className="group/item flex flex-col gap-0.5 border-2 border-transparent px-3 py-2 transition-colors hover:border-foreground hover:bg-lime hover:text-lime-foreground"
                >
                  <span className="flex items-center justify-between text-sm font-semibold">
                    {child.label}
                    <ChevronRight className="size-3.5 opacity-0 transition-opacity group-hover/item:opacity-100" />
                  </span>
                  <span className="text-xs text-muted-foreground group-hover/item:text-lime-foreground/80">
                    {child.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 ease-out",
        scrolled ? "px-3 pt-3 sm:px-4 sm:pt-4" : "px-0 pt-0",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between gap-4 transition-all duration-300 ease-out",
          scrolled
            ? "h-16 max-w-5xl rounded-none border-2 border-foreground bg-background/95 px-4 shadow-[4px_4px_0_0_var(--foreground)] backdrop-blur-md"
            : "h-16 max-w-full rounded-none border-b border-border bg-background/85 px-4 backdrop-blur md:px-8",
        )}
      >
        <div className="flex shrink-0 items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold tracking-tight">Aegis</span>
          </a>
        </div>

        <nav aria-label="Main" className="hidden shrink-0 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href="#" className="pixel-btn pixel-btn-ghost hidden sm:inline-flex">
            Sign in
            <ChevronRight className="size-3.5" />
          </a>
          <a href="#" className="pixel-btn pixel-btn-primary">
            Get started
            <ChevronRight className="size-3.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
