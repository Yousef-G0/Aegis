import {
  Database,
  Cpu,
  Gauge,
  Activity,
  MemoryStick,
  DollarSign,
  Boxes,
  Package,
} from "lucide-react"
import { DemoMock } from "@/components/demo-mock"

const metrics = [
  { icon: Database, label: "SERVING ENGINE", value: "Compared, not assumed" },
  { icon: Cpu, label: "GPU TARGET", value: "Sized to the model" },
  { icon: Gauge, label: "P95 LATENCY", value: "Benchmarked" },
  { icon: Activity, label: "THROUGHPUT", value: "Measured per GPU" },
  { icon: MemoryStick, label: "VRAM", value: "Checked for fit" },
  { icon: DollarSign, label: "COST", value: "Tracked per run" },
  { icon: Boxes, label: "GPU KERNELS", value: "Tuned where supported" },
  { icon: Package, label: "DEPLOYMENT KIT", value: "Run it or export it" },
]

export function ResultSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Every optimization ends with a{" "}
          <span className="highlight">result</span> you can inspect and run.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          You get a benchmark receipt and a runnable deployment kit. Nothing
          hidden.
        </p>

        <DemoMock className="mt-14 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="nl-reveal group border-b border-r border-border p-6 transition-colors hover:bg-muted/50"
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              <Icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <p className="mt-10 text-xs font-medium tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-lg font-semibold">{value}</p>
            </div>
          ))}
        </DemoMock>
      </div>
    </section>
  )
}
