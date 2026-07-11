import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { Logo } from "@/components/logo"

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <main className="relative z-0 min-h-screen">
      <SiteHeader />
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl lg:grid-cols-2">
        {/* Form side */}
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-2">
              <Logo />
              <span className="text-xl font-semibold tracking-tight">Aegis</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {footer}
            </p>
          </div>
        </div>

        {/* Photo side */}
        <div className="relative hidden border-l border-border lg:block">
          <img
            src="/cti.png"
            alt="Aegis cyber threat intelligence"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        </div>
      </div>
    </main>
  )
}
