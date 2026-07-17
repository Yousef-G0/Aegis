"use client"

import { AppPageShell } from "@/components/app-page-shell"
import { Card, CardContent } from "@/components/ui/card"
import { FileTextIcon } from "lucide-react"

const REPORTS = [
  { title: "Weekly exposure summary", cadence: "Every Monday" },
  { title: "Critical & high only", cadence: "Daily" },
  { title: "Executive briefing", cadence: "Monthly" },
  { title: "Compliance attestation", cadence: "Quarterly" },
]

export default function Page() {
  return (
    <AppPageShell title="Reports">
      <p className="text-sm text-muted-foreground">
        Scheduled PDF and CSV exports of your exposure posture. Connect a
        delivery channel (email, Slack, webhook) to start receiving reports.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((r) => (
          <Card key={r.title}>
            <CardContent className="flex h-full items-center gap-3 p-5">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileTextIcon className="size-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{r.title}</h3>
                <p className="text-xs text-muted-foreground">{r.cadence}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppPageShell>
  )
}
