// import { ArrowUp, ChevronDown, Cpu, Boxes, Sparkles, Server } from "lucide-react"

// const configPills = [
//   { icon: Boxes, label: "Models" },
//   { icon: Sparkles, label: "Auto engine" },
//   { icon: Cpu, label: "Auto GPU" },
//   { icon: Server, label: "Runs on" },
// ]

// const examples = [
//   {
//     tag: "Compare engines",
//     lead: "Find the best serving engine for ",
//     highlight: "Qwen 2.5 7B",
//     trail: "",
//   },
//   {
//     tag: "Tune latency",
//     lead: "Optimize ",
//     highlight: "Qwen 2.5 7B",
//     trail: " for low latency",
//   },
//   {
//     tag: "Ship speech",
//     lead: "Deploy ",
//     highlight: "Whisper Large V3 Turbo",
//     trail: " with p95 and cost checks",
//   },
//   {
//     tag: "Scale retrieval",
//     lead: "Build ",
//     highlight: "BGE-M3",
//     trail: " embeddings with batch throughput metrics",
//   },
// ]

// export function Hero() {
//   return (
//     <section className="relative overflow-hidden border-b border-border">
//       <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
//       <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
//         <p className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
//           Backed by
//           <span className="inline-flex size-5 items-center justify-center rounded-sm bg-[#ff6600] text-[11px] font-bold text-white">
//             Y
//           </span>
//           Combinator
//         </p>

//         <h1 className="mx-auto max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
//           Optimize <span className="font-pixel text-3xl highlight sm:text-4xl md:text-5xl">any</span>{" "}
//           open model{" "}
//           <span className="font-pixel text-3xl text-muted-foreground sm:text-4xl md:text-5xl">
//             for
//           </span>{" "}
//           production
//         </h1>

//         <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
//           Paste a model. Aegis benchmarks the options and picks the winner.
//           Deploy it, or own the stack.
//         </p>

//         {/* Prompt box */}
//         <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-3 text-left shadow-sm">
//           <div className="min-h-20 rounded-lg px-3 py-2 text-[15px] text-muted-foreground">
//             Quantize Mistral 7B on TensorRT-LLM and cut serving cost&hellip;
//           </div>
//           <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-border pt-3">
//             {configPills.map(({ icon: Icon, label }) => (
//               <button
//                 key={label}
//                 type="button"
//                 className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted"
//               >
//                 <Icon className="size-3.5" />
//                 {label}
//                 <ChevronDown className="size-3 text-muted-foreground" />
//               </button>
//             ))}
//             <div className="ml-auto flex items-center gap-3">
//               <span className="flex items-center gap-1.5 text-xs font-medium">
//                 <span className="size-2 rounded-full bg-lime" />
//                 Optimize
//               </span>
//               <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
//                 Experiment
//               </span>
//               <button
//                 type="button"
//                 aria-label="Send message"
//                 className="flex size-9 items-center justify-center rounded-lg bg-lime text-lime-foreground transition-opacity hover:opacity-90"
//               >
//                 <ArrowUp className="size-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Examples */}
//         <p className="mt-10 text-sm font-medium text-muted-foreground">
//           Example workloads
//         </p>
//         <div className="mx-auto mt-4 grid max-w-3xl gap-3 sm:grid-cols-2">
//           {examples.map((ex) => (
//             <button
//               key={ex.tag}
//               type="button"
//               className="rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-foreground/30"
//             >
//               <span className="text-xs font-semibold uppercase tracking-wide text-lime-foreground">
//                 <span className="rounded bg-lime px-1.5 py-0.5">{ex.tag}</span>
//               </span>
//               <p className="mt-2 text-sm text-foreground/90">
//                 {ex.lead}
//                 <span className="font-medium">{ex.highlight}</span>
//                 {ex.trail}
//               </p>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Globe, Loader2 } from "lucide-react"
import { GridDecoration } from "@/components/grid-decoration"

const sampleFindings = [
  { label: "Exposed credentials", tone: "accent" as const },
  { label: "Leaked source repos", tone: "accent" as const },
  { label: "Stale subdomains", tone: "secondary" as const },
  { label: "Dark web mentions", tone: "accent" as const },
]

export function Hero() {
  const router = useRouter()
  const [domain, setDomain] = useState("")
  const [scanning, setScanning] = useState(false)

  function handleScan(e: React.FormEvent) {
    e.preventDefault()
    if (!domain.trim()) return
    setScanning(true)
    const params = new URLSearchParams({ domain: domain.trim() })
    router.push(`/sign-up?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      <GridDecoration />
      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent-secondary" />
          Attack Surface &amp; Exposure Management
        </p>

        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Know what attackers can see{" "}
          <span className="font-mono text-green-600 dark:text-blue-400">
            before they find it
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Every day your external attack surface grows — forgotten subdomains,
          leaked keys, exposed credentials. Aegis scans it all across the open,
          deep, and dark web, then tells you exactly what to fix first.
        </p>

        {/* Scan input */}
        <form
          onSubmit={handleScan}
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-xl border border-border bg-card p-2 text-left shadow-sm sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 px-3 py-2">
            <Globe className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yourcompany.com"
              className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            disabled={scanning}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-lime px-4 py-2.5 text-sm font-semibold text-lime-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            {scanning ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Scanning
              </>
            ) : (
              <>
                Scan for free
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {sampleFindings.map((f) => (
            <span
              key={f.label}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              <span
                className={
                  "mr-1.5 inline-block size-1.5 rounded-full " +
                  (f.tone === "accent" ? "bg-lime" : "bg-accent-secondary")
                }
              />
              {f.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
