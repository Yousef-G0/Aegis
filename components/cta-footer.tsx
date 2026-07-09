// import { ChevronRight, Lock, Server, EyeOff, BadgeCheck } from "lucide-react"
// import { Logo } from "@/components/logo"

// function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
//       <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
//     </svg>
//   )
// }

// function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
//       <path d="M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.063-6.932Zm-1.29 19.494h2.039L6.486 3.24H4.298L17.61 20.647Z" />
//     </svg>
//   )
// }

// function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
//       <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
//     </svg>
//   )
// }

// const badges = [
//   { icon: Lock, label: "End-to-end encryption" },
//   { icon: Server, label: "Isolated GPU infrastructure" },
//   { icon: EyeOff, label: "Zero data retention" },
//   { icon: BadgeCheck, label: "SOC 2 Type II" },
// ]

// const footerLinks = [
//   "Pipeline Builder",
//   "Pricing",
//   "Docs",
//   "Research",
//   "News",
//   "Contact",
// ]

// const legalLinks = ["Security", "DPA", "AUP", "Cookies", "Terms", "Privacy"]

// export function CtaFooter() {
//   return (
//     <>
//       <section className="border-b border-border">
//         <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
//           <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
//             <div>
//               <Logo className="scale-125" />
//               <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
//                 Deploy your first optimized model, measured before you ship
//               </h2>
//               <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
//                 Describe the goal. Aegis builds and optimizes the stack.
//               </p>
//               <div className="mt-6 flex flex-wrap gap-3">
//                 <a
//                   href="#"
//                   className="flex items-center gap-1 rounded-md bg-lime px-4 py-2.5 text-sm font-semibold text-lime-foreground transition-opacity hover:opacity-90"
//                 >
//                   Start Building <ChevronRight className="size-4" />
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center gap-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
//                 >
//                   View Pricing
//                 </a>
//               </div>
//             </div>
//             <div className="grid gap-3 sm:grid-cols-2">
//               {badges.map(({ icon: Icon, label }) => (
//                 <div
//                   key={label}
//                   className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
//                 >
//                   <Icon className="size-5 text-muted-foreground" />
//                   <span className="text-sm font-medium">{label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="mx-auto max-w-6xl px-4 py-14">
//         <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
//           <div>
//             <div className="flex items-center gap-2">
//               <Logo />
//               <span className="text-lg font-semibold">Aegis</span>
//               <span className="text-xs text-muted-foreground">by RightNow</span>
//             </div>
//             <p className="mt-4 text-sm text-muted-foreground">
//               © 2026 Aegis. All rights reserved.
//             </p>
//             <div className="mt-4 flex items-center gap-3 text-muted-foreground">
//               <a href="#" aria-label="GitHub" className="hover:text-foreground">
//                 <GithubIcon className="size-5" />
//               </a>
//               <a href="#" aria-label="X" className="hover:text-foreground">
//                 <TwitterIcon className="size-5" />
//               </a>
//               <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
//                 <LinkedinIcon className="size-5" />
//               </a>
//             </div>
//             <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
//               <span className="size-2 rounded-full bg-lime" />
//               All systems operational
//             </p>
//           </div>

//           <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
//             {footerLinks.map((l) => (
//               <a
//                 key={l}
//                 href="#"
//                 className="text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 {l}
//               </a>
//             ))}
//           </nav>
//         </div>

//         <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
//           <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
//             {legalLinks.map((l) => (
//               <a key={l} href="#" className="hover:text-foreground">
//                 {l}
//               </a>
//             ))}
//           </div>
//           <p className="flex items-center gap-2">
//             Backed by
//             <span className="inline-flex size-4 items-center justify-center rounded-sm bg-[#ff6600] text-[10px] font-bold text-white">
//               Y
//             </span>
//             Combinator
//           </p>
//         </div>
//       </footer>
//     </>
//   )
// }

import { ChevronRight, Lock, ShieldHalf, EyeOff, Radar } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932 6.063-6.932Zm-1.29 19.494h2.039L6.486 3.24H4.298L17.61 20.647Z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const badges = [
  { icon: Lock, label: "End-to-end encryption" },
  { icon: Radar, label: "Continuous surface scanning" },
  { icon: EyeOff, label: "Zero data retention" },
]

const footerLinks = ["Exposure Scan", "Threat Intel", "Pricing", "Docs", "Contact"]
const legalLinks = ["Security", "DPA", "Terms", "Privacy"]

export function CtaFooter() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <ShieldHalf className="size-8 text-lime" strokeWidth={2.2} />
              <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Run your first scan before someone else does
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Free exposure report in minutes. No credit card, no agent to
                install.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center gap-1 rounded-md bg-lime px-4 py-2.5 text-sm font-semibold text-lime-foreground transition-opacity hover:opacity-90"
                >
                  Start scanning <ChevronRight className="size-4" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  View pricing
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-1">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <Icon className="size-5 shrink-0 text-muted-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
        Fixed layout: everything lives in normal document flow (flex/grid),
        nothing is position:absolute, so nothing can overlap or clip
        regardless of viewport width or content length.
      */}
      <footer className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShieldHalf className="size-5 text-lime" strokeWidth={2.2} />
              <span className="text-lg font-semibold">Aegis</span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 Aegis. All rights reserved.
            </p>

            <div className="flex items-center gap-3 text-muted-foreground">
              <a href="#" aria-label="GitHub" className="hover:text-foreground">
                <GithubIcon className="size-5" />
              </a>
              <a href="#" aria-label="X" className="hover:text-foreground">
                <TwitterIcon className="size-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
                <LinkedinIcon className="size-5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent-secondary" />
                All systems operational
              </span>
              <ThemeToggle />
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-2">
            {footerLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalLinks.map((l) => (
              <a key={l} href="#" className="hover:text-foreground">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
