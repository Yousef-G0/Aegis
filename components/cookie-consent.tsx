"use client"

import {
  getConsent,
  saveConsent,
  type CookieConsent as Consent,
} from "@/lib/cookie-consent"
import { Cookie, Settings2, Check, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const CATEGORIES: {
  key: keyof Omit<Consent, "decidedAt">
  label: string
  description: string
  locked?: boolean
}[] = [
  {
    key: "necessary",
    label: "Strictly necessary",
    description:
      "Required for core functionality such as authentication and security. These cannot be disabled.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    description:
      "Help us understand how the product is used so we can improve it. Anonymous and aggregated.",
  },
  {
    key: "personalization",
    label: "Personalization",
    description:
      "Remembers your preferences (theme, filters) to tailor your experience.",
  },
]

export function CookieConsent() {
  const [open, setOpen] = useState(false) // customize modal
  const [prefs, setPrefs] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = getConsent()
    setPrefs(stored)
    setReady(true)
  }, [])

  function decide(next: Omit<Consent, "decidedAt">) {
    const consent: Consent = { ...next, decidedAt: new Date().toISOString() }
    saveConsent(consent)
    setPrefs(consent)
  }

  function acceptAll() {
    decide({ necessary: true, analytics: true, personalization: true })
  }

  function rejectAll() {
    decide({ necessary: true, analytics: false, personalization: false })
  }

  if (!ready || prefs) {
    // Already decided: only (optionally) mount analytics once consent is known.
    return prefs && prefs.analytics && process.env.NODE_ENV === "production" ? (
      <Analytics />
    ) : null
  }

  return (
    <>
      {/* Bottom banner */}
      <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Cookie className="size-4" />
            </span>
            <p className="text-sm text-muted-foreground">
              We use cookies to secure your session and understand how Aegis is
              used. You can accept all, reject non-essential, or choose which
              categories to allow. See our policy for details.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(true)}
              className="gap-1.5"
            >
              <Settings2 className="size-3.5" />
              Customize
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={rejectAll}
              className="gap-1.5"
            >
              <X className="size-3.5" />
              Reject
            </Button>
            <Button size="sm" onClick={acceptAll} className="gap-1.5">
              <Check className="size-3.5" />
              Accept all
            </Button>
          </div>
        </div>
      </div>

      {/* Customize modal */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full gap-0 overflow-y-auto p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <Cookie className="size-4 text-primary" />
              Cookie preferences
            </SheetTitle>
            <SheetDescription>
              Choose which categories of cookies you allow. Strictly necessary
              cookies are always on.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-3 p-4">
            {CATEGORIES.map((cat) => {
              const checked = cat.locked ? true : (prefs?.[cat.key] ?? false)
              return (
                <div
                  key={cat.key}
                  className="rounded-xl border border-border p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{cat.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                    <Switch
                      checked={checked}
                      disabled={cat.locked}
                      onCheckedChange={(v) =>
                        setPrefs((prev) => ({
                          ...(prev ?? {
                            necessary: true,
                            analytics: false,
                            personalization: false,
                            decidedAt: "",
                          }),
                          [cat.key]: v,
                        }))
                      }
                      aria-label={`Toggle ${cat.label}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-auto flex items-center gap-2 border-t border-border p-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={rejectAll}
            >
              Reject all
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                if (prefs) decide(prefs)
                else acceptAll()
              }}
            >
              Save preferences
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
