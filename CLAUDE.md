# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (there is a `pnpm-lock.yaml` and a `pnpm` override in `package.json`). `package-lock.json` is stale and should not be relied on.

- `pnpm dev` — start the Next.js dev server (`next dev`)
- `pnpm build` — production build (`next build`)
- `pnpm start` — serve the production build (`next start`)
- `pnpm lint` — lint with ESLint (`eslint .`)

There is **no test runner configured** and no test files. Do not invent test commands.

## Architecture

Single-page marketing/landing site built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript** (strict mode).

- `app/page.tsx` is the entire site. It composes the page vertically from section components in `components/` (`SiteHeader`, `Hero`, `ResultSection`, `HowItWorks`, `HardwareSection`, `OwnStack`, `Faq`, `CtaFooter`).
- `app/layout.tsx` sets metadata/viewport, loads Google fonts (Geist, Geist Mono, and the `Press_Start_2P` pixel font, exposed as CSS vars `--font-geist-sans` / `--font-geist-mono` / `--font-pixel`), and renders `@vercel/analytics` only in production.
- `components/` holds page sections; most are plain server components except interactive ones marked `"use client"` (e.g. `theme-toggle.tsx`, `hero.tsx`).

### Styling — Tailwind v4 + shadcn (base-nova)

- Tailwind CSS **v4** with **no `tailwind.config.js`**. The theme (colors, radii, fonts) is defined entirely in `app/globals.css` via `@import "tailwindcss"`, `@import "shadcn/tailwind.css"`, and an `@theme inline { … }` block mapping CSS variables to Tailwind tokens. Dark mode is enabled through `@custom-variant dark (&:is(.dark *))`.
- UI primitives follow the **shadcn "base-nova"** style (`components.json`, `style: "base-nova"`). Critically, primitives are built on **`@base-ui/react`**, *not* Radix. New UI components are added via the shadcn CLI; the existing primitive is `components/ui/button.tsx` (a styled `@base-ui/react/button`).
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — the standard class-merge helper used everywhere.
- Path alias `@/*` maps to the repo root (`tsconfig.json` `paths`).

### Theme

Dark mode is wired through **`next-themes`**. `components/theme-provider.tsx` wraps `next-themes`' `ThemeProvider`, and `components/theme-toggle.tsx` consumes `useTheme()`.

### `next.config.mjs` behavioral notes

- `typescript.ignoreBuildErrors: true` — TypeScript type errors do **not** fail the build.
- `images.unoptimized: true` — Next's image optimization is disabled; static imports from `/public` are used directly.

## Gotchas

- **Product narrative mismatch in `components/hero.tsx`:** the active `Hero` describes a security / external-attack-surface exposure-monitoring product, while a large block of *commented-out* code describes a different "optimize open models for production" product. Edit the active (uncommented) code, not the dead block.
- `ThemeProvider` (`components/theme-provider.tsx`) is defined but is **not currently mounted** in `app/layout.tsx`; `ThemeToggle` relies on a provider being present at runtime.
