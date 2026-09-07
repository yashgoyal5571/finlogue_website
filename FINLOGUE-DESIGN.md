---
version: alpha
name: Finlogue-design-system
description: |
  A dark financial archive rebuilt with modern restraint. Structural discipline (grid, section rhythm, motion restraint, alternating-surface dividers) is inherited from Apple's product-page system. Bold full-bleed headline lockups are inherited from Nike's campaign-tile pattern. Everything else — palette, typefaces, button shape, the paper-insert motif, and all 3D direction — is original to Finlogue; neither source brand covers archival material or WebGL rendering, so those are built from the brand brief, not borrowed.
---

## Source Attribution (read this first)

Every token and component below is tagged so nothing gets mistaken for a borrowed default. Three tags only:

- **[APPLE]** — structural pattern taken from the Apple system, retokened with Finlogue colors/type.
- **[NIKE]** — structural pattern taken from the Nike system, retokened with Finlogue colors/type.
- **[CUSTOM]** — original to Finlogue. Not in either source. This is where the "humanistic creativeness" lives — treat CUSTOM entries as the parts that make the site *not* look like a retexture of someone else's brand.

| Layer | Source | Note |
|---|---|---|
| Section alternation / dark-tile rhythm | **[APPLE]** | tile-1/tile-2/tile-3 micro-step concept, no dividers |
| Motion restraint (press-state only, no hover-everywhere) | **[APPLE]** | `scale(0.95)` active state |
| Section padding rhythm | **[APPLE]** | 80px Apple default, tightened for Finlogue |
| Campaign-style full-bleed headline lockup | **[NIKE]** | used only for Hero + Events flagship, never repeated site-wide |
| Nav collapse pattern (hamburger drawer, sub-nav breadcrumb) | **[NIKE]** | behavior only, chrome fully recolored |
| Footer column density | **[APPLE]** | relaxed dense-link leading for scannable columns |
| Color palette | **[CUSTOM]** | entirely original, from brand brief |
| Typography (serif display / sans body / mono metadata) | **[CUSTOM]** | neither source uses a serif or a mono layer |
| Button shape (rectangular, stamp-bordered) | **[CUSTOM]** | explicit deviation — both sources default to pill CTAs, which doesn't belong in an archive |
| Paper-insert component | **[CUSTOM]** | new component type, not present in either source |
| Case-file / ledger / dossier components | **[CUSTOM]** | built directly from brand brief, no source precedent |
| 3D hero rendering | **[CUSTOM]** | neither source has any 3D — see dedicated section below |

---

## Colors — **[CUSTOM]**, entirely original

```yaml
colors:
  bg-deep: "#0F1C2C"        # primary background, every page — navy, sampled from crest badge
  bg-secondary: "#16273A"   # alternating band, one step lighter navy [APPLE pattern, custom hex]
  paper: "#F0E9D8"          # signature paper-insert surface — unchanged, archival device
  paper-text: "#0F1C2C"     # text color when ON paper (navy ink, not olive)
  ivory: "#FEFBF8"          # body text on dark surfaces — near-white, sampled from crest wordmark
  parchment-muted: "#93A1B0"  # secondary/caption text on dark surfaces — cool grey-blue, reads on navy
  gold: "#C79F58"           # the ONE interactive color — sampled directly from the crest
  gold-dim: "#A9823F"       # gold at rest/disabled, ~15% darker
  burgundy: "#651F25"       # status stamps ONLY — never background, never CTA
  hairline-on-dark: "#22354A"  # 1px dividers on dark surfaces, used sparingly
```

## Typography — **[CUSTOM]** family choice, **[APPLE]** leading/tracking discipline

Three layers, matching your brief's "Institution / Modern generation / Data" structure. Font choices deliberately avoid the two most templated picks (Playfair Display for serif, JetBrains Mono for mono) in favor of ones with more character:

```yaml
typography:
  display-serif:              # [CUSTOM] — the institution voice
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 88px
    fontWeight: 480
    fontOpticalSize: 72
    fontVariationSettings: "'SOFT' 40, 'WONK' 1"   # Fraunces' variable axes — a slight
                                                     # ink-wonk imperfection, not a sterile
                                                     # display serif. This is the single
                                                     # biggest "humanistic" lever in the type system.
    lineHeight: 0.95
    letterSpacing: -0.5px
    textTransform: none        # [CUSTOM] deviation — brief's own microcopy examples
                               # use full sentences, not tracked-out caps; reserve caps
                               # for stamps/labels only, not headlines
  display-serif-sm:            # [CUSTOM] — section headers (Origin, What We Do, etc.)
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: 40px
    fontWeight: 460
    fontVariationSettings: "'SOFT' 30, 'WONK' 0"
    lineHeight: 1.05
    letterSpacing: -0.2px
  body:                         # [APPLE] leading discipline, [CUSTOM] family
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 17px              # Apple's "extra pixel" — not 16px
    fontWeight: 400
    lineHeight: 1.5             # airier than Apple's 1.47 — paper reads slower than a phone screen
    letterSpacing: 0
  body-strong:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    color: "{colors.parchment-muted}"
  metadata-mono:                # [CUSTOM] — file numbers, dates, ticker only
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: 13px
    fontWeight: 500
    letterSpacing: 0.02em
    lineHeight: 1.6
  stamp-label:                  # [CUSTOM] — the ONLY place uppercase tracking is allowed
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: 11px
    fontWeight: 600
    letterSpacing: 0.12em
    textTransform: uppercase
    color: "{colors.burgundy}"   # CONFIDENTIAL / CASE CLOSED / AUTHORIZED — nowhere else
```

**Don't** use `stamp-label` (uppercase tracked mono) for anything that isn't a literal stamp — nav links, buttons, and section headers stay sentence case. This is the guardrail against the generic "tracked-out ALL-CAPS eyebrow above every heading" tell.

## Spacing & Radius

```yaml
spacing:              # [APPLE]-inspired rhythm, tightened for a denser editorial page
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  section: 64px        # between Apple's 80px and Nike's 48px — Finlogue's own rhythm

rounded:               # [CUSTOM] — deviates from both sources' pill-default
  none: 0px            # cards, paper inserts, case files — archival material is rectangular
  sm: 2px               # input fields only — a document-form corner, not a UI-soft corner
  full: 9999px          # ONLY for perfectly circular elements: icon buttons, social icons,
                        # the custom cursor dot — never for a text button
```

## Components

### `section-band` — **[APPLE]**
Alternates `bg-deep` → `bg-secondary` between sections. No border, no shadow, no divider line — the color step *is* the divider, exactly as in Apple's tile system. This governs Home and Events page rhythm.

### `paper-insert` — **[CUSTOM]**
The signature device. Background `{colors.paper}`, text `{colors.paper-text}`, `rounded.none`, no shadow (a real page doesn't float), subtle 1–2° rotation on individual instances in a grid (Chronicle clippings, Case Files) so they read as scattered real documents, not a uniform card grid. Used for: Ledger stats, Case Files, Team dossiers (front face), Chronicle clippings, POTR stat row, investor/mentor dossier cards.

### `campaign-hero` — **[NIKE]**, retokened
Full-bleed section, headline in `display-serif` (not Nike's Futura uppercase — swap the font, keep the *device*: huge type burned directly into/over the visual, single CTA anchored bottom-left). Used exactly twice: Home hero (over the 3D scene) and Events page flagship header (Pitch on the Rocks). **Don't** reuse this device a third time — Nike's own rule applies: never repeat the same full-bleed lockup scale twice in the same viewport rhythm.

### `stamp-button` — **[CUSTOM]**
Replaces both sources' pill CTA. Rectangular, `rounded.sm` (2px, just enough to not look laser-cut), 1px solid `{colors.gold}` border, transparent or `bg-deep` fill, text in `gold`, `body-strong` type, padding 14px × 28px. Active/press state: `background-color` fills to `gold` at 12% opacity — **[APPLE]** press-state discipline (`scale(0.97)` also applies), but the visual result reads as a rubber-stamp press, not a soft button depress.

### `icon-circular-control` — **[APPLE]**
44×44px circular buttons for social icons, carousel controls, custom-cursor state. `rounded.full`, background `{colors.bg-secondary}` at 70% alpha over imagery, icon in `gold`.

### `case-file-card` — **[CUSTOM]**
`paper-insert` base + a `stamp-label` status line (`STATUS: CLOSED` / `STATUS: UPCOMING`) in burgundy — the *only* place burgundy appears. File number in `metadata-mono`. Title in `display-serif-sm`.

### `dossier-flip-card` — **[CUSTOM]**
Front: `paper-insert`, name in `body-strong`, role in `caption`, `AUTHORIZED` in `stamp-label` (note: `AUTHORIZED` is a neutral stamp, so it can use `gold` instead of `burgundy` — burgundy stays reserved for case-status only). Back: `bg-secondary`, focus statement in `body`, contact links in `gold` underlined text. Three size variants per the site-architecture doc's hierarchy: `dossier-flip-card--coordinator` (largest), `--head` (medium), `--core` (smallest, densest grid).

### `nav-bar` — **[NIKE]** collapse behavior, fully recolored
Desktop: logo left, centered links, `stamp-button`-style CTA right. Mobile: collapses to hamburger drawer exactly as Nike's pattern describes, but the drawer surface is `bg-deep` with `gold` link states, not Nike's white/black retail chrome.

### `footer` — **[APPLE]** column density
Four-column link layout with Apple's relaxed dense-link leading (so a column of many links stays scannable), recolored to `bg-secondary` background, `parchment-muted` link text, `gold` on hover.

### `market-ticker` — **[CUSTOM]**
Single-row horizontal scroll, `metadata-mono`, items separated by ` | `, e.g. `FINANCE ↑ | STRATEGY ↑ | CONSULTING ↑`. Symbolic only — brief explicitly says don't make it look like a real trading feed. Used in exactly one place (footer strip or Ledger section), not repeated per-section.

---

## 3D Rendering Guidelines — **[CUSTOM]**, no source precedent

Neither Apple nor Nike's system includes WebGL — Apple's "product render" is a static photograph with one fixed drop-shadow token, not a live 3D scene. Everything below is original direction, and it's where "humanistic" actually has to be designed in on purpose, because default Three.js output (glossy PBR materials, perfectly even studio lighting, a free-spinning camera) reads as generic tech-demo, not archive.

- **Materials:** matte, not glossy. Paper/certificate materials should have visible fiber grain and slightly uneven edges (displaced geometry or a normal map, not perfectly flat planes). Avoid `MeshStandardMaterial` with high metalness/low roughness defaults — keep roughness high (~0.7–0.9) everywhere except the brass/gold seal accents, which get a slight metalness bump (~0.3) so they're the one thing in the scene that catches light differently.
- **Lighting:** single warm key light (like a reading lamp over an archive desk, ~2700K color temp), soft fill, no cold blue rim light. Shadows should be soft-edged, not the crisp CG default.
- **Camera behavior:** slow, restrained, scroll-linked orbit or parallax drift — never a free-spinning idle animation, never mouse-follow rotation. Motion should feel like someone turning a page, not a product-configurator demo.
- **Imperfection is the humanizing device:** slight asymmetry in the certificate stack (not perfectly aligned edges), a faint paper-curl on one corner, subtle grain/noise post-process over the render. This is the direct antidote to the "sterile AI render" look — deliberately choose the less-perfect version of every parameter.
- **Performance:** low poly count, baked lighting where possible, simple primitives (thin extruded planes for documents/certificates) rather than complex geometry. This keeps it resume-demo-smooth on a mid-range laptop, not just visually restrained.

---

## Do's and Don'ts (merged)

### Do
- Use `gold` for every interactive signal, full stop — **[APPLE]** single-accent rule.
- Alternate `bg-deep`/`bg-secondary` for rhythm; drop to `paper` only when content is a literal record — **[APPLE]** alternation device, **[CUSTOM]** third surface.
- Reserve `campaign-hero` for exactly two moments site-wide — **[NIKE]** rule against repeating the same full-bleed scale twice in a row.
- Use `stamp-label` (uppercase mono) only on literal stamps — never as a decorative section eyebrow.
- Bake imperfection into the 3D scene on purpose.

### Don't
- Don't introduce a pill-shaped button anywhere — that vocabulary belongs to Apple/Nike's retail chrome, not an archive.
- Don't add drop shadows to paper-insert cards — real paper resting on a desk doesn't float; use the 1–2° rotation instead for depth.
- Don't let burgundy leak into anything but case-status stamps.
- Don't let the 3D hero free-spin or mouse-track — scroll-linked only.
- Don't use `display-serif` for body copy or captions, and don't use `body` (Inter) for the hero headline — the two-family boundary is fixed.

---

## Division of labor with FINLOGUE-SITE-ARCHITECTURE.md

This file governs **tokens and components** — what a color/type/component *is*. `FINLOGUE-SITE-ARCHITECTURE.md` governs **layout and content** — what goes on which page, in what order, with what copy and what links. Tell Antigravity to read both, and if the two ever conflict on a token value, this file wins; if they conflict on structure/content, the architecture doc wins.

## Iteration Guide

1. Build one component at a time; check its source tag before styling it — an `[APPLE]`-tagged component should feel structurally familiar but never re-introduce Apple's blue/pill/photography chrome.
2. New variants (`--coordinator`, `--head`, `--core`, `-active`) are separate entries, not prose asides.
3. Every color/type reference uses `{token.name}` — no inline hex in components.
4. When unsure whether a new UI need is `[CUSTOM]` or fits an existing tagged pattern, prefer reusing a tagged pattern before inventing a new one — the system's strength is a small, disciplined vocabulary, same as both source systems.
