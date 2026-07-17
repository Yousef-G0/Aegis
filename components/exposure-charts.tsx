"use client"

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ExposureScore } from "@/lib/api"

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#3b82f6",
  info: "#71717a",
}

const SEVERITY_ORDER = ["critical", "high", "medium", "low", "info"] as const

export function SeverityDonut({ exposure }: { exposure: ExposureScore }) {
  const data = SEVERITY_ORDER.map((s) => ({
    name: s[0].toUpperCase() + s.slice(1),
    key: s,
    value: exposure[`${s}_count` as keyof ExposureScore] as number,
  })).filter((d) => d.value > 0)

  const total = data.reduce((a, b) => a + b.value, 0)

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Events by severity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No events yet.
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <div className="size-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={70}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {data.map((d) => (
                      <Cell key={d.key} fill={SEVERITY_COLORS[d.key]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      fontSize: 12,
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex flex-1 flex-col gap-1.5 text-sm">
              {data.map((d) => (
                <li key={d.key} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: SEVERITY_COLORS[d.key] }}
                    />
                    {d.name}
                  </span>
                  <span className="font-medium tabular-nums">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function SourceBar({ counts }: { counts: Record<string, number> }) {
  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Events by source
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No events yet.
          </p>
        ) : (
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                  }}
                />
                <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
