## Context

The "Why Alopit" section (`#rooms` in `src/components/LandingPage.tsx`, ~lines 852–927) is the conversion story's centerpiece. Today it pairs a sparse left column — a single static `ROOM_BOARD` card labelled *Live now* — with a 5-item feature grid on the right (Roman numerals I–V, identical `#080808` tiles, a lone orphan 5th card) and no CTA. It contradicts the brand's own DESIGN.md principles ("make the pulse visible", "every screen earns the click", "premium by restraint") and PRODUCT.md's differentiation argument.

This is a self-contained, presentation-only change to a single section. No backend, no new dependencies, no routing. Motion already exists (Framer Motion via `reveal(i)` / `viewReveal(i)`); copy is centralized in `src/lib/copy.ts` per-locale. The constraints are the design system (three-signal palette, notched corners via clip-path, tonal banding, glow reserved for CTAs/live signals, Bebas Neue / Fraunces / IBM Plex Mono roles) and the seven-locale i18n contract.

## Goals / Non-Goals

**Goals:**
- Make the section argue *why Alopit* (differentiation) rather than restate generic capabilities the hero/trust strip already cover.
- Deliver a genuinely "alive" left panel that honors "make the pulse visible" via a live-pulse dot + lightweight momentum signals.
- Achieve a balanced, rhythmically even feature grid with no orphan card.
- Add a section CTA so the section funnels toward register/deposit.
- Stay strictly inside the DESIGN.md vocabulary (notched corners, tri-color bar, three signals, font roles) and respect `prefers-reduced-motion`.
- Keep all seven locales (`en`, `th`, `ms`, `id`, `vi`, `es`, `hi`) in full parity and the build (`tsc --noEmit`) green.

**Non-Goals:**
- Wiring the live-room panel to a real data feed / backend (values are presentation-only/mock).
- Changing any other section (hero, payments, affiliate, beyond, sportsbook, final), header, or footer.
- Adding new third-party libraries or global styles/animations.
- Altering analytics event names elsewhere; only a new optional section-CTA analytics event may be introduced.
- Changing routing, the locale system, or the copy-object shape beyond additive keys under `why`.

## Decisions

**Decision 1 — Static card → mock "live room" panel (no backend).**
The left panel becomes a richer live-room card: live-pulse dot (`#d91f26` + `animate-ping` sibling per DESIGN.md "Live Pulse Dot"), "LIVE NOW" label, room name, and 2–3 lightweight momentum signals (e.g. a viewer count and a momentum bar). *Rationale:* honors "make the pulse visible" at near-zero risk. *Alternative considered:* a real WebSocket/polling feed — **rejected**: Non-Goal, out of scope, adds backend coupling and failure modes. Values are static/derived client-side to look alive (e.g. a slow animated momentum bar), gated on `prefers-reduced-motion`.

**Decision 2 — 5 features → 4, reordered to a differentiation arc; drop Roman numerals.**
Reduce to four features arranged as a *why-Alopit* arc (original feed → self-service money → reliability/trust → community/rewards) so the grid is even (2×2 on `sm`+, full-width stack on mobile) and the orphan-card gap disappears. Drop the I–V numerals because the section is **not** an ordered sequence (DESIGN.md "Don't number every section 01/02/03 unless genuinely an ordered sequence"). *Alternative considered:* keep 5 and stretch to a 6th — **rejected**: inventing a sixth pillar dilutes the argument and still risks layout imbalance; the 5th today ("exclusive community") folds cleanly into a community/rewards pillar.

**Decision 3 — Differentiate cards via tonal banding + accent, not new components.**
Cards keep the notched, flat, border-defined plane vocabulary but step between the Pit Black bands and let a single accent (gold label / red hover underline) carry differentiation. No new "icon tile" component (that is an explicit anti-reference, the Western SaaS/AI template). *Rationale:* stays inside the tonal-banding rule and the glow budget. *Alternative considered:* a per-feature icon from `lucide-react` — **rejected** as it leans toward the icon-tile-above-every-heading anti-pattern; reuse the existing numeral-less, type-led treatment instead.

**Decision 4 — Add one section CTA (red primary).**
Place a single Cockpit-Red register/login CTA at the end of the section body (left column) with a red CTA glow and the existing `capture(...)` analytics pattern. *Rationale:* satisfies "every screen earns the click". *Alternative considered:* a gold secondary CTA — **deferred**; one CTA keeps the section focused and within the glow budget.

**Decision 5 — Copy as data; additive keys only.**
Extend the `why` object in `src/lib/copy.ts` with new keys (e.g. `liveLabel`, `viewers`, `momentum`, `cta`, plus 4 feature pairs) and remove unused keys (`featureLabel`, the 5th feature). Keep the object shape additive so `LandingPage.tsx` types remain simple. All seven locales updated together to avoid partial translations.

**Decision 6 — Seal with the tri-color accent bar.**
Add the canonical `linear-gradient(to right, #1e4fa8, #f2c14e, #d91f26)` strip on the section's bottom edge, matching the hero/payments sections' signature full-stop. No fourth hue, no rounded corners.

## Risks / Trade-offs

- **Mock momentum signals could read as a cluttered-casino gimmick** → Mitigation: keep exactly 2–3 signals, rationed glow (gold halo on the pulse dot only), flat planes elsewhere; never animate numeric tickers that imply real wagering data.
- **Translation drift across 7 locales** → Mitigation: update every locale key in the same edit; run `tsc --noEmit`; keep new strings short and declarative to match existing voice.
- **Reducing 5 features → 4 removes the "multiple payment channels" pillar** → Mitigation: fold it into the self-service-money pillar's body so the capability is still asserted, just no longer a standalone tile.
- **`prefers-reduced-motion` users get a flat panel** → Acceptable: the static state must still read as "live now" via copy + the (non-animated) dot color, never by motion alone (DESIGN.md "avoid encoding state by color alone where a label can disambiguate" → keep the "LIVE NOW" label present).
- **Removed `featureLabel`/5th-feature copy keys** → Mitigation: safe internal removal (not a public API); update both `copy.ts` and the component in the same change so no dangling references remain.
