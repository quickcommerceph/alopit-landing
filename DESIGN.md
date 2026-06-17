---
name: Alopit
description: Premium E-Sabong live-streaming landing — the ringside pulse, distilled.
colors:
  pit-gold: "#f2c14e"
  cockpit-red: "#d91f26"
  slate-blue: "#1e4fa8"
  pit-black: "#050505"
  pit-black-700: "#070707"
  pit-black-800: "#080808"
  pit-black-900: "#090909"
  ink: "#f5f5f5"
  prose: "#d7d7d7"
  ember: "#ff7a00"
  ember-hot: "#ff3a2f"
typography:
  display:
    fontFamily: '"Bebas Neue", "IBM Plex Mono", monospace'
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
  body:
    fontFamily: '"Fraunces", serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: '"IBM Plex Mono", monospace'
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "0.14em"
    lineHeight: 1.4
rounded:
  none: "0px"
components:
  button-primary:
    backgroundColor: "{colors.cockpit-red}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    padding: "12px 28px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.ember-hot}"
  button-gold:
    backgroundColor: "{colors.pit-gold}"
    textColor: "{colors.pit-black}"
    typography: "{typography.label}"
    padding: "12px 28px"
    height: "48px"
  button-gold-hover:
    backgroundColor: "{colors.ember}"
    textColor: "#ffffff"
  eyebrow:
    textColor: "{colors.pit-gold}"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.pit-black-800}"
    textColor: "{colors.ink}"
    padding: "32px"
---

# Design System: Alopit

## 1. Overview

**Creative North Star: "The Ringside Pulse"**

Alopit is the electricity of the live cockfighting pit, condensed into a phone
screen. The system is a near-black canvas scored by three saturated signals —
gold, red, and blue — that fire like arena lights against the dark. Everything
exists to make the visitor feel that something is happening *right now*, and
that the next CTA is the way in.

Density is deliberate, not maximal. The page achieves intensity through
contrast, type, and motion rather than through clutter: big Bebas Neue display
lines hit and step out of the way; Fraunces serif prose carries the argument at
a readable 65–75ch; IBM Plex Mono labels — tiny, bold, tracked, uppercase —
stitch the sections together like ringside signage. The signature moves are
**notched corners** (a single top-left + bottom-right cut via `clip-path`
polygon, never `border-radius`), the **tri-color accent bar**
(blue → gold → red) that seals every section, and **tonal banding** where depth
is built from stacked near-black shades rather than shadows.

This system explicitly rejects, by name: **cheap cluttered online-casino** looks
(neon spam, blinking banners, busy tile walls), **generic corporate fintech**
sterility, the **Western SaaS / AI template** (Inter, purple-to-blue gradients,
cream cards, icon-tile-above-every-heading), and **cartoonish mascot gambling**
(rooster mascots, cartoon chips). The sport is treated with weight, not
caricature; premium by restraint, not by gloss.

**Key Characteristics:**
- Near-black, layer-banded canvas (`#050505` → `#090909`) — depth without shadows.
- Three saturated signals only: Pit Gold, Cockpit Red, Slate Blue.
- Notched corners (clip-path polygon), never rounded.
- Tri-color accent bar (blue → gold → red) seals every section.
- Display type shouts (Bebas Neue); prose argues (Fraunces); labels signpost (IBM Plex Mono).
- Glow is rationed — reserved for CTAs and live signals, never decorative.

## 2. Colors

A disciplined three-signal palette on a near-black field. Each accent has one
job; none are decorative.

### Primary
- **Pit Gold** (`#f2c14e`): the brand voice. Eyebrows, labels, hover/tier
  accents, secondary CTAs, and the middle of the tri-color bar. The color that
  says "premium" without saying "luxury cliché".
- **Cockpit Red** (`#d91f26`): urgency and action. Primary register/deposit
  CTAs, the live-pulse dot, and the right end of the tri-color bar. The color of
  "happening now".

### Secondary
- **Slate Blue** (`#1e4fa8`): the cool counter-weight. The left end of the
  tri-color bar, secondary structural accents, and ambient hero glow. Keeps the
  warm gold/red duo from going feverish.

### Tertiary (interaction heat)
- **Ember** (`#ff7a00`) / **Ember Hot** (`#ff3a2f`): hover escalation only. Red
  CTAs warm to `#ff3a2f`; gold CTAs and borders warm to `#ff7a00`. Never used at
  rest.

### Neutral
- **Pit Black** (`#050505`): the hero/footer base and the darkest band.
- **Pit Black 700** (`#070707`), **Pit Black 800** (`#080808`), **Pit Black 900**
  (`#090909`): the tonal layering steps. Sections alternate these to build depth.
- **Ink** (`#f5f5f5`): display headings.
- **Prose** (`#d7d7d7`): Fraunces body copy. White-with-opacity
  (`white/70`, `white/32`, `white/8`) is used only for muted/caption text — never
  a muddy gray.

### Named Rules
**The Three-Signal Rule.** Gold, red, and blue are the only saturated hues on
any screen. Ember/ember-hot appear on hover only. No fourth accent, no
gradients between signals except the canonical tri-color bar.

**The Tonal-Banding Rule.** Depth comes from stepping between `#050505`,
`#070707`, `#080808`, and `#090909` across adjacent sections — not from drop
shadows. Glow shadows are reserved for CTAs and live signals.

## 3. Typography

**Display Font:** Bebas Neue (fallback IBM Plex Mono, monospace)
**Body Font:** Fraunces (fallback serif)
**Label/Mono Font:** IBM Plex Mono

**Character:** A high-contrast trio. Bebas Neue is the arena announcer — tall,
condensed, all-caps, unstoppable. Fraunces is the analyst — a warm contemporary
serif that keeps the page feeling premium and human, not arcade. IBM Plex Mono
is the signage — technical, tracked, unfussy, stitching the UI together. No two
families compete; each owns its register.

### Hierarchy
- **Display** (Bebas Neue, 400, clamp up to ~96px, line-height 1): hero and
  section headlines. The only place Bebas Neue appears. Two-line treatment with
  the gold accent on the second line (`meets the pulse.`).
- **Headline** (Bebas Neue, 400, ~2.5–3rem, line-height 1): large in-section
  titles, e.g. room board, feature, payment headers.
- **Body** (Fraunces, 400, 16–18px, line-height 1.75): all prose. Cap line
  length at 65–75ch.
- **Label** (IBM Plex Mono, 700, 10px, letter-spacing 0.14–0.18em, UPPERCASE):
  eyebrows, CTAs, nav, metadata, payment chips. The connective tissue of the page.

### Named Rules
**The Announcer Rule.** Bebas Neue is reserved for headlines — display and
headline roles only. Never set body copy, labels, or buttons in Bebas Neue; the
moment it stops being special, it stops being the announcer.

**The Label Floor.** Labels are never below 10px and always uppercase + tracked
(≥0.14em). Anything smaller or untracked reads as a mistake, not a design.

## 4. Elevation

Depth is conveyed by **tonal layering + rationed glow**, not by a shadow scale.
Adjacent sections step between Pit Black shades (`#050505` → `#090909`) so the
page reads as stacked planes on a single dark field. Cards sit as flat
border-defined planes; they do not float.

Glow is a state signal, not decoration. It marks two things only: primary CTAs
(red, with a deep ambient red glow) and live/momentum signals (gold, with a
tight gold halo).

### Shadow Vocabulary
- **CTA glow** (`box-shadow: 0 22px 60px rgba(217,31,38,0.35)`): under primary
  red CTAs. Large, diffuse, low-opacity — heat radiating from the action.
- **Gold CTA glow** (`box-shadow: 0 22px 60px rgba(242,193,78,0.22)`): softer,
  under gold secondary CTAs.
- **Live halo** (`box-shadow: 0 0 14px rgba(242,193,78,0.65)`): tight, on the
  active carousel dot / live indicators. Small radius, higher opacity.
- **Hero display shadow** (`text-shadow: 0 0 30px rgba(217,31,38,0.42), 0 18px 60px rgba(0,0,0,0.55)`): on the Bebas Neue hero, for legibility over imagery.

### Named Rules
**The Glow Budget Rule.** If it isn't a CTA or a live signal, it doesn't glow.
Cards, borders, images, and backgrounds stay flat. Glow spent on decoration is
glow stolen from urgency.

## 5. Components

### Buttons
- **Shape:** Notched via clip-path polygon — one cut top-left + one cut
  bottom-right (`polygon(Npx 0, 100% 0, 100% calc(100% - Npx), calc(100% - Npx)
  100%, 0 100%, 0 Npx)`), N = 10–12px for CTAs, 8px for small nav buttons. No
  border-radius anywhere.
- **Primary (Register/Deposit):** Cockpit Red (`#d91f26`) fill, white IBM Plex
  Mono 14px bold uppercase, border `#ff7a00` at 60% opacity, `px-7 py-3`,
  min-height 48–56px, red CTA glow. Hover: lift `-translate-y-0.5` + fill warms
  to Ember Hot (`#ff3a2f`). Active: `scale-[0.98]`. 300ms transition.
- **Secondary (Gold):** Pit Gold (`#f2c14e`) fill, Pit Black text, border
  `#f2c14e`/60, gold CTA glow. Hover: fill warms to Ember (`#ff7a00`), text goes
  white.
- **Small nav CTA:** `px-4 py-2`, 10px bold uppercase tracking 0.14em, gold fill,
  8px notch.

### Eyebrow / Label
- **Style:** IBM Plex Mono 10px, 700, uppercase, Pit Gold, letter-spacing
  0.14–0.18em. Sits above section titles as the ringside signpost.
- **Don't** put an eyebrow above every section reflexively — vary the cadence;
  one named kicker system is voice, a reflexive eyebrow on every block is AI grammar.

### Cards / Containers
- **Corner:** Notched (10px standard).
- **Background:** A Pit Black band (`#070707`/`#080808`), flat — no card shadow.
- **Border:** 1px Pit Gold at low opacity (`/16`–`/24`). Hover lightens the
  border (toward `white/16` or `gold/28`) and may tint the fill (`gold/[0.04]`).
- **Internal padding:** generous (`p-8`, `px-7 pt-8 pb-6`).

### Tri-Color Accent Bar (signature)
- **Style:** A 1px-to-4px horizontal gradient strip,
  `linear-gradient(to right, #1e4fa8, #f2c14e, #d91f26)`, pinned to the bottom
  edge of a section or card. The visual full-stop of the system.

### Live Pulse Dot
- **Style:** A 2px red dot (`#d91f26`) wrapped in an `animate-ping` sibling at
  75% opacity. The "happening now" signal. Pair with an uppercase "LIVE NOW"
  label.

### Marquee
- **Style:** A `#090909` strip, IBM Plex Mono uppercase phrases scrolling on a
  36s linear loop. Punctuation-only separators; no icons.

### Navigation
- **Style:** Fixed, transparent-to-black, IBM Plex Mono 10px bold uppercase,
  tracked 0.18em. Links `#f5f5f5`/75 → hover Pit Gold. Logo + gold nav CTA right.

## 6. Do's and Don'ts

### Do:
- **Do** build depth by stepping adjacent sections between `#050505`, `#070707`,
  `#080808`, and `#090909` — tonal banding, not shadows.
- **Do** notch corners with a clip-path polygon (top-left + bottom-right cuts,
  8–14px by scale) and leave `border-radius` at 0 everywhere.
- **Do** seal sections with the tri-color accent bar
  (`#1e4fa8 → #f2c14e → #d91f26`).
- **Do** reserve glow for primary CTAs (`0 22px 60px rgba(217,31,38,0.35)`) and
  live signals only.
- **Do** keep body copy in Fraunces at 65–75ch, body color `#d7d7d7` or darker —
  verify ≥4.5:1 contrast against the near-black bands.
- **Do** gate every Framer Motion animation on `prefers-reduced-motion`
  (reuse `reveal(i)` / `viewReveal(i)` with ease `[0.16, 1, 0.3, 1]` and
  `i * 0.08` stagger).

### Don't:
- **Don't** introduce a fourth saturated hue — Gold, Red, Blue are the only
  signals (Ember/Ember-Hot are hover-only).
- **Don't** look like **cheap cluttered online-casino**: no neon spam, blinking
  banners, or busy tile walls.
- **Don't** look like **generic corporate fintech**: no sterile blue-chip banking
  sterility that erases the sport's grit.
- **Don't** look like the **Western SaaS / AI template**: no Inter, no
  purple-to-blue gradients, no cream cards, no rounded-square icon tile above
  every heading, no `background-clip: text` gradient headlines.
- **Don't** look like **cartoonish / mascot gambling**: no rooster mascots,
  cartoon chips, or childish iconography.
- **Don't** use `border-radius`; corners are notched or square.
- **Don't** nest cards inside cards, or use side-stripe (`border-left/right` >1px)
  accents.
- **Don't** put a tracked uppercase eyebrow above every section by reflex, or
  number every section `01/02/03` unless the section is genuinely an ordered
  sequence.
- **Don't** use bounce/elastic easing — ease out with `[0.16, 1, 0.3, 1]`.
