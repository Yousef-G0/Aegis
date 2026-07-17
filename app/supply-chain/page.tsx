"use client"

import { AppPageShell } from "@/components/app-page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldHalf, ArrowRight } from "lucide-react"
import Link from "next/link"

const SIGNALS = [
  {
    title: "Third-party domains",
    desc: "Monitor subsidiary and vendor domains for shadow IT and leaked assets.",
  },
  {
    title: "Vendor breach feed",
    desc: "Cross-reference your supplier list against known breach and leak dumps.",
  },
  {
    title: "Open-source dependencies",
    desc: "Flag exposed secrets committed inside your software supply chain.",
  },
]

export default function Page() {
  return (
    <AppPageShell title="Supply Chain">
      <p className="text-sm text-muted-foreground">
        Extend monitoring beyond your own perimeter to the vendors, contractors,
        and dependencies you rely on. Connect an identifier set to begin.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {SIGNALS.map((s) => (
          <Card key={s.title}>
            <CardContent className="flex h-full flex-col gap-3 p-5">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <ShieldHalf className="size-4" />
              </div>
              <h3 className="text-sm font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Start by adding the assets you want to watch on the{" "}
        <Link
          href="/identifiers"
          className="font-medium text-primary hover:underline"
        >
          Identifiers
        </Link>{" "}
        page.
      </p>
      <Button variant="outline" size="sm" className="w-fit gap-1.5" disabled>
        Configure supply-chain scan <ArrowRight className="size-3.5" />
      </Button>
    </AppPageShell>
  )
}
