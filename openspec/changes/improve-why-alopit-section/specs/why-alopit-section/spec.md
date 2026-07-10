## ADDED Requirements

### Requirement: Section argues why Alopit, not generic capabilities
The section copy (eyebrow, headline, body, and each feature title/body) SHALL articulate Alopit-specific differentiation (original feeds, self-service money movement, reliability/trust, community/rewards) rather than restating generic capabilities already present in the hero and trust strip. The copy SHALL be provided for every supported locale.

#### Scenario: Differentiated feature pillars
- **WHEN** a visitor reads the feature grid
- **THEN** each feature title and body argues a distinct reason to choose Alopit, and no feature merely repeats a capability already named in the hero body or the trust strip.

#### Scenario: Full locale parity
- **WHEN** the locale is set to any of `en`, `th`, `ms`, `id`, `vi`, `es`, `hi`
- **THEN** the section eyebrow, headline, body, feature titles, feature bodies, live-panel labels, and CTA all render fully localized with no missing or fallback-to-English keys.

### Requirement: Live room panel conveys a live pulse
The left column SHALL present a live-room panel that includes a visible "LIVE NOW" text label, a live-pulse dot (Cockpit Red with a ping sibling), the room name, and a lightweight momentum signal (such as an animated momentum bar). The panel SHALL feel alive without resembling a cluttered online-casino tile wall.

#### Scenario: Live state is legible without motion
- **WHEN** `prefers-reduced-motion` is enabled (animations disabled)
- **THEN** the panel still communicates "live now" via the persistent text label and the pulse-dot color, and does not rely on animation to convey the live state.

#### Scenario: Animated momentum when motion is allowed
- **WHEN** `prefers-reduced-motion` is not enabled
- **THEN** the momentum signal animates gently and the pulse dot pings, using the existing Framer Motion easing and `prefers-reduced-motion` gating pattern.

### Requirement: Feature grid is balanced and unnumbered
The feature grid SHALL present exactly four features arranged in an even grid that leaves no orphan tile in any viewport, and SHALL NOT decorate features with ordered numerals (the section is not an ordered sequence). Cards SHALL be differentiated through tonal banding and the existing red hover underline rather than identical tiles.

#### Scenario: Even grid with no orphan card
- **WHEN** the section renders on small, medium, and large viewports
- **THEN** the feature tiles fill the grid evenly with no single tile occupying a row alone in a way that leaves a visible gap.

#### Scenario: No ordered numbering
- **WHEN** a visitor scans the feature tiles
- **THEN** no Roman or Arabic ordinal numerals are attached to features as decoration.

### Requirement: Section ends with a conversion CTA
The section SHALL end with a single primary CTA (Cockpit Red, notched corners, red CTA glow) that links to register/login and emits an analytics event on click, so the section funnels toward acquisition.

#### Scenario: CTA is clickable and tracked
- **WHEN** a visitor clicks the section CTA
- **THEN** the visitor is taken to the register/login destination and a `capture(...)` analytics call fires for that location.

### Requirement: Section conforms to the design system
The section SHALL use notched corners (clip-path polygon, no `border-radius`), the three-signal palette only (Pit Gold, Cockpit Red, Slate Blue, with Ember/Ember-Hot on hover only), the canonical font roles (Bebas Neue for headlines, Fraunces for body, IBM Plex Mono for labels), and SHALL reserve glow for the CTA and live signals only. The section SHALL be sealed at its bottom edge by the tri-color accent bar (`#1e4fa8 → #f2c14e → #d91f26`).

#### Scenario: Stays within the three-signal palette
- **WHEN** the section is inspected
- **THEN** no fourth saturated hue is introduced and all decorative color resolves to gold, red, blue, or neutral Pit Black shades.

#### Scenario: Signature accent bar present
- **WHEN** the section renders
- **THEN** a tri-color accent bar spans the section's bottom edge as the visual full-stop.

### Requirement: Build remains green with no new dependencies
The change SHALL introduce no new third-party dependencies and the TypeScript build (`tsc --noEmit`) SHALL pass with no dangling references after any removed copy keys are also removed from the component.

#### Scenario: Type-check passes after copy changes
- **WHEN** removed `why` keys (e.g. the ordinal `featureLabel` and the fifth feature) are deleted from `copy.ts`
- **THEN** `npm run build` (which runs `tsc --noEmit`) completes without type errors from dangling references in `LandingPage.tsx`.
