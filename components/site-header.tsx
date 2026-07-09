"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Use cases", dropdown: true },
  { label: "Pricing", dropdown: false },
  { label: "Research", dropdown: false },
  { label: "Resources", dropdown: true },
  { label: "Contact", dropdown: false },
]

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
          <span className="text-xs text-muted-foreground">
          </span>
        </div>

        <nav aria-label="Main" className="hidden shrink-0 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
              {item.dropdown && (
                <ChevronDown className="size-3.5 text-muted-foreground" />
              )}
            </button>
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
