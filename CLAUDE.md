# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc --noEmit (typecheck) THEN vite build
npm run preview  # Serve the production build locally
```

There is no test runner, linter, or CI config. `npm run build` is the only quality gate — it fails on type errors. TypeScript is strict with `noUnusedLocals` and `noUnusedParameters`, so unused imports/vars break the build.

## What this is

A single-page marketing landing site for **Alopit**, a premium E-Sabong (cockfighting) live-streaming product. Stack: Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + lucide-react. The entire site is one component (`src/components/LandingPage.tsx`); `App.tsx` just renders it. Despite git history mentioning "variants" and "routes," there is no router — those were design iterations that were collapsed into the single page now in `main`.

## Architecture & conventions

**Data-driven sections.** All page copy lives in `const` arrays at the top of `LandingPage.tsx` (`HERO_STATS`, `TRUST`, `PILLARS`, `FEATURES`, `STEPS`, `ROOM_BOARD`, `PROMOS`, `MARQUEE`). Sections `.map()` over these. To change content, edit these arrays — don't touch the JSX.

**Two separate color systems — know which one applies.**
- `src/index.css` defines a *light* theme via Tailwind v4's CSS-first `@theme` block (`--color-bg: #f6f8fc`, etc.) and applies it to `<body>`. Utilities like `bg-bg`, `text-primary` come from here.
- `LandingPage.tsx` overrides all of this with an inline *dark* "pit" aesthetic via `style={{ backgroundColor: "#050505", ... }}` and hardcoded hex colors throughout. The signature palette is gold `#f2c14e`, red `#d91f26`, blue `#1e4fa8` on near-black `#050505`/`#070707`/`#080808`. New UI in the landing page should use these inline hexes, not the `@theme` tokens.

**Fonts** are loaded in `index.html` (Google Fonts) and applied per-element via inline `fontFamily`: `"Bebas Neue"` for display headings, `"Fraunces"` (serif) for body prose, `"IBM Plex Mono"` for the default UI font set on the root container. (Note: `--font-sans` in `index.css` references "Geist," which is not loaded — it's unused by the landing page.)

**Animations are gated on reduced-motion.** `usePrefersReducedMotion()` (`src/lib/`) returns a `reduced` flag. Every Framer Motion animation branches on it. Two reusable helpers in the component define the standard entrance motion:
- `reveal(i)` — on-mount staggered fade/slide-up (hero).
- `viewReveal(i)` — same effect triggered on scroll-into-view (`whileInView`, `once: true`).

Both use the easing curve `[0.16, 1, 0.3, 1]` and an `i * 0.08` stagger delay. Reuse these rather than writing new motion props, and always handle the `reduced` case.

**Recurring visual motifs:** "notched" corners via inline `clipPath` polygon on buttons/cards, and a tri-color bottom accent bar `from-[#1e4fa8] via-[#f2c14e] to-[#d91f26]`. The promo carousel uses an `AnimatePresence` + custom-direction `promoVariants` pattern with a `[index, direction]` state tuple.

**External links** (login/register) come from `src/lib/constants.ts` (`LOGIN_URL`, `REGISTER_URL` → `alopit.club`). They open in new tabs with `rel="noopener noreferrer"`. Use these constants rather than hardcoding URLs.

**Static assets** live in `public/images/` and are referenced by absolute path (e.g. `/images/hero-img.svg`).
