# FINLOGUE — Site Architecture, Layout & Color System
*Reference doc for Antigravity. Read this alongside your merged DESIGN.md (Apple grid/motion discipline + Nike editorial headline blocks, retokened to Finlogue's archival palette). This doc is the layer above tokens: where each section goes, what it contains, what's clickable, and which colors apply where.*

---

## 0. Sitemap — 3 pages, shared nav + footer

```
NAV:  FINLOGUE (crest, links home)   HOME   EVENTS   TEAM & CONTACT   [ENTER THE HOUSE →]
```

| Page | URL | Role |
|---|---|---|
| **Home** | `/` | Brand story, what we do, proof (ledger stats), entry point to everything else |
| **Events** | `/events` | Case-file grid + the flagship deep-dive: Pitch on the Rocks |
| **Team & Contact** | `/team` | Dossiers of the people running it + how to reach them |

Three pages, not five — Consulting Room and Chronicle are folded in as **sections**, not standalone pages (see below), so you're not maintaining five thin pages.

---

## 1. Color System — one dark archive, one paper accent, one interactive color

Restraint rule: this is **not** a different color per section. It's one dark room, one paper insert, one interactive gold. That's it.

| Role | Hex | Where it's used |
|---|---|---|
| `bg-deep` | `#0F1C2C` | Default page background, every page |
| `bg-secondary` | `#16273A` | Alternating band — the *only* way sections separate on dark backgrounds (Apple's tile-1/tile-2 trick, no dividers, no shadows) |
| `paper` | `#F0E9D8` | The **signature move**: any section styled as an actual physical document — Ledger stats, Case Files, Team dossiers, Chronicle clippings. Text on paper flips to dark (`#0F1C2C`), not ivory. |
| `parchment-muted` | `#93A1B0` | Secondary/caption text on dark backgrounds |
| `gold` | `#C79F58` | The single interactive color — every link, CTA border, hover state, active nav underline. Nothing else is clickable-looking. |
| `burgundy` | `#651F25` | Reserved for exactly one thing: status stamps (`CASE CLOSED`, `CONFIDENTIAL`). Never a background, never a CTA. |

**Do:** alternate `bg-deep` → `bg-secondary` for rhythm, drop a `paper` section in when content is literally a record (stat, file, dossier, clipping), keep gold as the only "click me" signal.
**Don't:** give Events a blue theme and Team a green theme — that's the generic SaaS-per-section trap. One system, everywhere.

Typography stays the three-layer stack from your brief: serif display (headlines) / sans body (paragraphs) / mono (file numbers, dates, ticker only — not every label).

---

## 2. Page 1 — HOME

### 2.1 Hero
`bg-deep` · headline `paper`-white · CTA `gold`

```
┌─────────────────────────────────────────────┐
│  [nav — transparent, solidifies on scroll]    │
│                                                │
│         (3D: slow-rotating certificate         │
│          stack / vault door, R3F)              │
│                                                │
│   WE DIDN'T INHERIT THE HOUSE.                 │
│   WE BUILT IT.                                 │
│   Finance. Strategy. Consulting. Built from     │
│   a campus that wasn't supposed to be one.      │
│                                                │
│   [ ENTER THE HOUSE ]   [ VIEW CASE FILES ]     │
└─────────────────────────────────────────────┘
```
- Primary CTA `ENTER THE HOUSE` → smooth-scrolls to §2.2 (Origin).
- Secondary `VIEW CASE FILES` → navigates to `/events`.
- Content slot: `hero.headline`, `hero.subline`, `hero.3dModel` (swap the certificate-stack asset here only).

### 2.2 The Origin — `bg-secondary`
Chronological timeline (numbering justified — it's literally sequential): CAMPUS → CURIOUS MINDS → FINLOGUE → THE HOUSE GROWS. One line of copy per beat, scroll-triggered fragment-to-document animation per your brief. No CTA here — pure narrative beat.

### 2.3 What We Do — `bg-deep`, cards in `paper`
Four file cards, asymmetric grid (not a 4-up identical SaaS grid — vary widths, e.g. 2 large + 2 small):
```
┌───────────────┐ ┌──────┐
│ FILE 01        │ │FILE 02│
│ FINANCE        │ │CONSUL-│
│ Markets,        │ │TING   │
│ investing...    │ │       │
│ [VIEW FILE →]   │ │[→]    │
└───────────────┘ └──────┘
┌──────┐ ┌───────────────┐
│FILE 03│ │ FILE 04        │
│COMPE- │ │ COMMUNITY      │
│TITION │ │ People, ...    │
│ [→]   │ │ [VIEW FILE →]  │
└──────┘ └───────────────┘
```
Each `VIEW FILE →` expands the card in place (accordion, not a new route) — keeps you at 3 pages.
Content slot: `pillars[]` — array of `{id, title, blurb, icon}`, map over it. Add a 5th pillar later by pushing one object, nothing else changes.

### 2.4 The Ledger — `paper` background, full-bleed band
Stat block styled as an open ledger page, dark text on paper. Numbers count up on scroll-into-view.
```
EVENTS        MINDS ENGAGED     CASES DISSECTED   COLLABORATIONS
026           1,200+            042               0XX
```
Content slot: `ledgerStats[]` — `{label, value}`. Pull live numbers here later without touching layout.

### 2.5 The Chronicle (teaser) — `bg-secondary`
Three newspaper-clipping cards (`paper` insert, slightly rotated/overlapping like real clippings tossed on a desk), latest 3 articles only. Each clipping is clickable → expands full article in a lightbox/modal (no separate blog page, keeps page count down).
Content slot: `chronicleArticles[]` — `{headline, category, excerpt, image, fullText}`.

### 2.6 Closing CTA — `bg-deep`
`TAKE THE CASE` → `/events`. One line, one button, nothing else.

---

## 3. Page 2 — EVENTS (`/events`)

### 3.1 Page header — `bg-deep`
Small header, drawer/archive-cabinet visual. "CASE FILES" as page title, not "Events" — matches your voice.

### 3.2 Flagship — PITCH ON THE ROCKS — `bg-secondary`, stat row in `paper`
This is the deep-dive using your brochure content directly:
- About paragraph (from brochure "ABOUT POTR", trimmed to ~60 words for web, not the full brochure block).
- Stat row (paper insert): `4 JUDGES · 5 ACTIVE INVESTORS · 25+ STARTUPS · ₹25CR+ DISCUSSED`
- **Esteemed Investors & Mentors** — dossier grid (paper cards, headshot + name + one-line credential), 7 people from your brochure (Aman Tekriwal, Krishna Dev Pathak, Sidharth Pandey, Siddhant Gupta, Vartul Jain, Garima Seth, Ninad Karpe). Not clickable individually (no LinkedIn URLs given) — static credibility wall.
- **Startup Portfolio** — logo wall (paper tiles, small, dense grid), the 8 logos from your brochure (SensoVision, AugAid, CIT-Peels, Cubicles.com, Lokachakra, Vzeya, Eventz Book, Drivomate). Leave `url` field empty in content config for now — add links later without touching the grid component.

### 3.3 Other Case Files — `bg-deep`
Grid of case-file cards (not full brochure detail — this is for *other/future* events):
```
CASE FILE 026          CASE FILE 027
THE SNAPDEAL DILEMMA   CONSULTANTS GOT TALENT
STATUS: CLOSED         STATUS: UPCOMING     <- burgundy stamp text, only place burgundy appears
CATEGORY: STRATEGY     CATEGORY: CONSULTING
[OPEN CASE →]          [OPEN CASE →]
```
Click → in-place expand (accordion), same pattern as What We Do cards. Content slot: `caseFiles[]` — `{fileNumber, title, status, category, description}`. Add an event by pushing one object.

### 3.4 Footer

---

## 4. Page 3 — TEAM & CONTACT (`/team`)

### 4.1 Header — `bg-deep`
"THE PEOPLE BEHIND THE HOUSE"

### 4.2 Team Dossiers — `bg-secondary`, cards in `paper`, three ranked tiers
This is an organizational hierarchy, not a flat grid — card size and position should say "seniority" the way a real financial house's letterhead would (partners → senior staff → associates). Don't give all three tiers identical card sizes; that flattens the hierarchy your brief is built on.

```
                    COORDINATORS
        ┌─────────────┐┌─────────────┐┌─────────────┐
        │ ADITYA        ││ ARYAN        ││ AKSHAT       │  ← largest cards,
        │ TIWARI        ││ MITTAL       ││ THADANI      │    centered 3-up row,
        │ COORDINATOR   ││ COORDINATOR  ││ COORDINATOR  │    [AUTHORIZED] stamp
        └─────────────┘└─────────────┘└─────────────┘

                       HEADS · BATCH Y24
   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐        ← medium cards,
   │ NAME  │  │ NAME  │  │ NAME  │  │ NAME  │  │ NAME  │        4–5 up grid
   │ HEAD, │  │ HEAD, │  │ HEAD, │  │ HEAD, │  │ HEAD, │
   │ <dept>│  │ <dept>│  │ <dept>│  │ <dept>│  │ <dept>│
   └──────┘  └──────┘  └──────┘  └──────┘  └──────┘

                      CORE TEAM · BATCH Y25
        ┌───────────────────────────────────────┐
        │                                         │
        │        (single full-width group          │  ← ONE photo, not
        │         photograph, paper-insert           │    individual cards.
        │         frame, slight rotation for the      │    Batch shown as a
        │         "scattered document" texture)       │    collective, matching
        │                                         │    "we only want a pic
        │   CORE TEAM · BATCH Y25                  │    of everyone" — no
        └───────────────────────────────────────┘    per-person data needed.
```

Flip-card interaction applies to **Coordinators and Heads only**. Front (paper): name, role, `FINLOGUE` mono stamp, `AUTHORIZED` micro-stamp. Back (dark, on hover/tap): focus area + short statement, plus `mailto:`/`tel:` if that person has given contact info.

- **Coordinators (3, official):** Aditya Tiwari, Aryan Mittal, Akshat Thadani. Real names — wire in directly. These are the only three who should read as "the club's official leadership" on the page.
- **Heads (Batch Y24):** senior members, one level below coordinators. Known so far: Krishna Khairnar, Abhinav Sharma. **Count still open** — this is an array, so it renders whatever's confirmed and grows without any layout change once the rest of the roster is finalized.
- **Core Team (Batch Y25):** **not individual dossiers** — a single group photograph, styled as a `paper-insert` with the same slight-rotation texture as the Chronicle clippings, section-labeled "CORE TEAM · BATCH Y25" beneath it. No per-person cards, no individual flip interaction, no name list required.

Note: the four names on the POTR brochure (Mihir Chakravarthy, Abhinav Sharma, Krishna Khairnar, Aditya Tiwari) were that event's specific contact list, not necessarily this year's coordinator roster. Resolved: Krishna and Abhinav are current Heads (above); Mihir is an **ex-coordinator** — not part of the current org chart, so leave him out of the Team page entirely unless you later add an alumni/legacy section (not in scope for this 3-page build).

### 4.3 Contact — `paper` band, styled as an intake slip
Simple form: Name / Email / Message, submit styled as a document stamp (`SUBMIT FOR REVIEW`, not "Send"). Beside/below it: direct socials as icon row:
- Instagram → `https://www.instagram.com/finlogue.lnmiit/`
- LinkedIn → `https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all`
- Email → `mailto:finlogue@licai.lnmiit.ac.in`

### 4.4 Footer (large, closing)
```
FINLOGUE
FINANCE × STRATEGY × CONSULTING
BUILT FROM THE GROUND UP.

[Instagram → instagram.com/finlogue.lnmiit]  [LinkedIn → linkedin.com/company/entrepreneuria-lnmiit]  [Email → mailto:finlogue@licai.lnmiit.ac.in]     Home · Events · Team & Contact

FINLOGUE — EST. [YEAR]          DOCUMENT STATUS: ACTIVE
```
Nav links repeat here (real anchors, not decorative). `EST. [YEAR]` and `DOCUMENT STATUS: ACTIVE` are static text, not links.

---

## 5. Making images/content iterable in one go

Don't hardcode copy or image paths inside components. One config object per page, components just map over it:

```ts
// content/home.ts
export const home = {
  hero: { headline: "...", subline: "...", model: "/assets/3d/certificate-stack.glb" },
  pillars: [ { id: "finance", title: "FINANCE", blurb: "...", icon: "/assets/icons/finance.svg" }, ... ],
  ledgerStats: [ { label: "EVENTS", value: 26 }, ... ],
  chronicleArticles: [ { headline: "...", image: "/assets/chronicle/01.jpg", ... } ],
};
```
Same pattern for `content/events.ts` and `content/team.ts`:

```ts
// content/team.ts
export const team = {
  coordinators: [
    { name: "Aditya Tiwari", role: "Coordinator", focus: "...", email: null, phone: null },
    { name: "Aryan Mittal", role: "Coordinator", focus: "...", email: null, phone: null },
    { name: "Akshat Thadani", role: "Coordinator", focus: "...", email: null, phone: null },
  ],
  heads: [
    { name: "Krishna Khairnar", role: "Head, <dept>", batch: "Y24", focus: "...", email: null, phone: null },
    { name: "Abhinav Sharma", role: "Head, <dept>", batch: "Y24", focus: "...", email: null, phone: null },
    // remaining Y24 heads go here once confirmed — count is intentionally open
  ],
  coreTeam: {
    // NOT an array of people — a single group photo, per batch
    photo: "/assets/team/core-team-y25.jpg",
    caption: "CORE TEAM · BATCH Y25",
  },
};
```
Swapping an image, adding a pillar, adding a case file, adding a new core-team member, or updating a stat is a one-line edit in these files — the layout components never change; the Coordinators/Heads/Core Team grids just render whatever's in each array, in order. Tell Antigravity explicitly: *"read content/*.ts as the single source of truth, never hardcode strings/images inside section components."*

---

## 6. Clickable/link inventory (so nothing gets missed)

| Element | Destination |
|---|---|
| Nav: HOME / EVENTS / TEAM & CONTACT | route to `/`, `/events`, `/team` |
| Nav CTA "ENTER THE HOUSE" | scroll to Origin on home; scrolls to top if already home |
| Hero secondary CTA "VIEW CASE FILES" | `/events` |
| What We Do "VIEW FILE →" ×4 | in-place accordion expand |
| Chronicle clippings ×3 | modal/lightbox with full article |
| Closing CTA "TAKE THE CASE" | `/events` |
| Other Case Files "OPEN CASE →" | in-place accordion expand |
| Team dossier back-face email/phone (all 3 tiers) | `mailto:` / `tel:` where provided, else omitted (no fake contact info) |
| Contact form submit | form POST / mailto fallback |
| Footer socials | Instagram: `https://www.instagram.com/finlogue.lnmiit/` · LinkedIn: `https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all` · Email: `mailto:finlogue@licai.lnmiit.ac.in` |
| Footer nav repeat | same 3 routes as top nav |
| Startup portfolio logos | left empty (`url: null`) until you have links — don't fake them |

---

## 7. What NOT to do (guardrails, from your own brief + design discipline)

- No second accent color. Gold is the only interactive color, full stop.
- No card shadows, no gradients, no rounded-pill buttons — buttons are rectangular with a 1px gold border, like a stamped document action, not a Nike/Apple pill (a pill doesn't belong in an archive).
- Burgundy appears in exactly one place: status stamps. Never a button, never a background.
- Don't invent a 5-page site. Consulting Room and Chronicle stay as sections, not routes.
- Don't add numbered eyebrows/labels to sections that aren't sequences (Ledger stats, Team dossiers) — only Origin and file numbers earn numbering, because they're genuinely ordered/indexed.
