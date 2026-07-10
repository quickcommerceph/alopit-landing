## 1. Copy data model (foundation)

- [x] 1.1 In `src/lib/copy.ts`, restructure the `why` object for the `en` locale: rewrite eyebrow/headline/body to argue why-Alopit differentiation; replace the 5-feature arrays with 4 differentiated features (original feed → self-service money → reliability/trust → community/rewards); add live-panel keys (`liveLabel`, `viewers`, `momentum`, etc.) and a `cta` key; remove the ordinal `featureLabel` key and the fifth feature.
- [x] 1.2 Replicate the new `why` shape and translated copy across `th`, `ms`, `id`, `vi`, `es`, `hi`, keeping voice and no missing keys.
- [x] 1.3 Verify every locale's `why` object has the exact same keys (parity check) and no dangling references to removed keys.

## 2. Component scaffolding

- [x] 2.1 In `src/components/LandingPage.tsx`, delete the static `ROOM_BOARD` constant (or repurpose it) and remove any now-unused imports.
- [x] 2.2 Update the `#rooms` section type usages to match the new `why` shape (4 features, new live-panel keys, `cta`).

## 3. Live room panel (left column)

- [x] 3.1 Build the live-room panel: persistent "LIVE NOW" IBM Plex Mono label, Cockpit-Red pulse dot with an `animate-ping` sibling, and the room name.
- [x] 3.2 Add 2–3 lightweight momentum/viewer signals (e.g. viewer count + a momentum bar) using derived/static values; gate all animation on `usePrefersReducedMotion()` and the existing Framer Motion easing pattern.
- [x] 3.3 Ensure the panel reads as "live now" without motion (label + dot color) and stays a flat, notched, border-defined plane (no casino-tile clutter, glow on the pulse dot only).

## 4. Feature grid (right column)

- [x] 4.1 Rebuild the grid to render exactly 4 features in an even layout (full-width stack on mobile, 2×2 on `sm`+) with no orphan tile.
- [x] 4.2 Remove the I–V Roman numerals; keep the type-led treatment (Bebas Neue headline + Fraunces body).
- [x] 4.3 Differentiate tiles via tonal banding + the existing red hover underline; confirm no per-feature icon tiles and no fourth saturated hue.

## 5. Conversion CTA + signature bar

- [x] 5.1 Add a single Cockpit-Red primary CTA (notched corners, red CTA glow) linking to the register/login URL; wire `capture(...)` analytics for the section location.
- [x] 5.2 Seal the section's bottom edge with the tri-color accent bar (`#1e4fa8 → #f2c14e → #d91f26`).

## 6. Verification

- [x] 6.1 Run `npm run build` (runs `tsc --noEmit`) and resolve any type errors from removed/added copy keys.
- [x] 6.2 Visually verify the section on mobile and desktop, with and without `prefers-reduced-motion`, and switch through representative locales to confirm parity and no English fallback.
- [x] 6.3 Confirm the section conforms to DESIGN.md (notched corners, three-signal palette, font roles, glow budget, tri-color bar) and introduces no new dependencies in `package.json`.
