import { AegisLoader } from "@/components/aegis-loader"

export function RouteLoader({ label }: { label?: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AegisLoader label={label} size={96} />
    </main>
  )
}
