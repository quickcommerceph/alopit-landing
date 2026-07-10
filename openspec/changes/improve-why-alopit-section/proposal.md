## Why

The "Why Alopit" section (`#rooms`) is the page's core argument for choosing Alopit, yet it is the weakest delivery of the brand's own principles. Its left "room board" is a single static card that says *Live now* without any live energy — contradicting "make the pulse visible"; its five features restate generic capabilities already covered by the hero and trust strip rather than arguing *why Alopit*; the lone fifth card leaves an awkward bottom-row gap; and the section ends with no path to action, breaking "every screen earns the click." As the conversion story's centerpiece it underperforms.

## What Changes

- **Rewrite the section copy** (eyebrow, headline, body, feature titles + bodies) across all seven locales to argue sharp differentiation (original feeds, self-service money movement, trust-through-competence, Filipino-rooted premium finish) instead of restating generic capabilities.
- **Replace the static single-card room board** with an alive "live room" panel on the left: a live-pulse dot, live-now state, room name, and lightweight momentum/viewer signals (animated, `prefers-reduced-motion`-gated) — energy without clutter.
- **Rebuild the feature grid** to a balanced, rhythmically even layout that eliminates the orphan fifth card, removes the decorative Roman numerals (the section is not an ordered sequence), and differentiates cards via tonal banding + the red hover underline rather than five identical tiles.
- **Add a section CTA** so the section funnels toward register/deposit per Design Principle #5.
- **Seal the section with the tri-color accent bar** to match the system's signature full-stop and the other sections.

## Capabilities

### New Capabilities
- `why-alopit-section`: The marketing section that argues why a visitor should choose Alopit — its live-room panel, differentiated feature grid, copy, and conversion CTA.

### Modified Capabilities
<!-- No existing specs in openspec/specs/. None to modify. -->

## Impact

- **Code:** `src/components/LandingPage.tsx` — the `#rooms` `<section>` (currently lines ~852–927), the `ROOM_BOARD` constant, and any new presentation-only constants/derivations added for the live-room panel.
- **Content:** `src/lib/copy.ts` — the `why` object across all seven locales (`en`, `th`, `ms`, `id`, `vi`, `es`, `hi`), plus any new keys needed for the live-room panel and CTA.
- **Design fidelity:** Must conform to DESIGN.md (three-signal palette, notched corners, tonal banding, glow reserved for CTAs/live signals, Bebas Neue/Fraunces/IBM Plex Mono roles, tri-color bar) and honor `prefers-reduced-motion`.
- **No backend/API/dependency changes.** No new third-party libraries; motion reuses existing Framer Motion patterns (`reveal`/`viewReveal`).
- **i18n:** All new/changed strings must be provided for every locale; the build (`tsc --noEmit`) must pass.
