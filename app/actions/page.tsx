"use client"

import { AppPageShell } from "@/components/app-page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZapIcon, ArrowRight } from "lucide-react"
import Link from "next/link"

const ACTIONS = [
  {
    title: "Request takedown",
    desc: "Ask a source to remove a published exposure. Requires a connected remediation provider.",
  },
  {
    title: "Escalate to triage",
    desc: "Route a critical event to your security team's queue for immediate review.",
  },
  {
    title: "Add remediation note",
    desc: "Attach internal context (ticket ID, owner, status) to any event.",
  },
  {
    title: "Suppress false positive",
    desc: "Mark low-confidence matches as ignored so they no longer count toward your score.",
  },
]

export default function Page() {
  return (
    <AppPageShell title="Actions">
      <p className="text-sm text-muted-foreground">
        Respond to exposures across your attack surface. Automated playbooks and
        one-click remediations will live here.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {ACTIONS.map((a) => (
          <Card key={a.title}>
            <CardContent className="flex h-full flex-col gap-3 p-5">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <ZapIcon className="size-4" />
              </div>
              <h3 className="text-sm font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-auto w-fit gap-1.5"
                disabled
              >
                Coming soon <ArrowRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Looking for a specific exposure? Browse all detected events on the{" "}
        <Link href="/events" className="font-medium text-primary hover:underline">
          Events
        </Link>{" "}
        page.
      </p>
    </AppPageShell>
  )
}
