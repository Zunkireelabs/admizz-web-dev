# FIFA World Cup 2026 — "Predict & Win" Campaign Plan

> **Status:** Approved, ready to build (Phase 1)
> **Route:** `/events/worldcup-2026`
> **Tournament window:** June 11 → July 19, 2026
> **Last updated:** 2026-06-09

---

## 1. The Concept

A campaign page that turns the 5-week World Cup window into a study-abroad lead engine for Admizz (Nepal).

**The hook — "Predict & Win":**
Visitors see the **next upcoming match** at the top of the page (flags, teams, kickoff time in Nepal time, live score when the match is on). Directly below, they predict the outcome — **Team A wins / Draw / Team B wins** — and submit their lead details (name, email, phone, study destination interest). Each prediction = one CRM lead tagged `worldcup-predict-win`.

**Only one match is predictable at a time.** Once it kicks off, predictions lock. When it ends, the next match takes the spotlight. This forces return visits throughout the tournament.

---

## 2. Why This Will Work

- Football is in every conversation in Nepal during this window
- One-match-at-a-time = users come back daily/weekly = repeat lead surface
- Live scores + flags + match clock = sports-app energy, much higher engagement than a marketing landing page
- Lead capture is dressed as a fan game, not a sales form
- Phased rollout — we can ship without final prizes/API/CRM and bolt those in

---

## 3. Decisions Locked

| Topic | Decision |
|---|---|
| **Page route** | `/events/worldcup-2026` (lives in the Events system) |
| **Lead capture** | New dedicated CRM form for this campaign (client side will set up CRM form; we wire the endpoint) |
| **Football data API** | TBD after stakeholder meeting. Built behind a swappable adapter; ships with hardcoded fixtures + manual scores in v1 |
| **Prediction lock rule** | Only the single next upcoming match is predictable. Locks at kickoff |
| **Duration** | June 11 → July 19, 2026 |
| **Prize structure** | Deferred — placeholder cards in v1 |

---

## 4. Design Ambition — "Shock the Client"

This is not a marketing landing page styled with footballs. It's a **mini sports app** that happens to capture leads.

- Cinematic full-bleed hero with stadium-night image, ken-burns zoom, animated trophy
- Stadium-grade display typography (e.g. Bebas Neue / Archivo Black) for team names + match clock
- Authentic World Cup palette — deep green, gold metallics for trophy/prize accents, dark stadium navy
- Real SVG flags for all 48 nations, not emoji
- Micro-interactions:
  - Pulsing LIVE indicator
  - Flip-animated score digits when scores update
  - Prediction buttons that ripple on hover + lock-in animation on select
  - Confetti burst on submit
- Skeleton shimmer for live-data states, no spinners
- Mobile-first — must feel native-app-tier on a phone (80% of Nepali traffic)
- `prefers-reduced-motion` respected
- Lighthouse target: Performance 90+, Accessibility 95+, SEO 100

---

## 5. Page Structure (top to bottom)

| # | Section | Description |
|---|---|---|
| 1 | **Cinematic Hero** | Full-bleed stadium bg, trophy glow, eyebrow chip "ADMIZZ × FIFA WORLD CUP 2026", H1 "Predict. Win. Study Abroad.", countdown to July 19 final, gold CTA scrolling to `#predict` |
| 2 | **Next Match Spotlight** | Scoreboard card: group/round badge, stadium, flags both sides, big flip-animated score, match clock (live) or kickoff countdown (upcoming), status pill (LIVE/UPCOMING/HT/FT) — refreshes every 30s when live |
| 3 | **Prediction Container** (`#predict`) | 3 tap tiles (Team A win / Draw / Team B win) → on select, lead form expands inline → POST to CRM → confetti success state. Locks at kickoff. At FT shows ✅/❌ result |
| 4 | **Upcoming Matches Rail** | Horizontal scroll (mobile) / 4-up grid (desktop) of next 5 fixtures. Only the immediate next one is unlocked, rest show 🔒 padlock + "Unlocks after [prev match]" |
| 5 | **How It Works** | 3 cards: Pick → Submit → Win |
| 6 | **Tournament Hype Strip** | Marquee with top scorers + latest results ticker + "Match of the Day" callout |
| 7 | **Prizes** | 3 cards on dark stadium gradient with gold trophy iconography (placeholder copy in v1) |
| 8 | **Why Admizz** | Reuse `WhyChooseAdmizz` with WC-themed wrapper ("From the stands to the campus") |
| 9 | **Stats Bar** | Reuse `Stats` |
| 10 | **Trusted Partners** | Reuse `TrustedPartners` (university logos marquee) |
| 11 | **FAQ** | Reuse `FAQ` with WC-tailored Q&A |
| 12 | **Footer CTA** | Reuse `CTAForm` (dark) — "Your goal isn't just to win the prediction — it's to study abroad." |

---

## 6. Architecture — Data Adapter Pattern

The football API is undecided, so the page consumes match data through a single adapter:

```
src/lib/worldcup/
├── fixtures.json       # All 64 matches: teams, group/round, kickoff ISO, NPT, stadium
├── teams.json          # 48 teams: name, code, flag, FIFA rank, manager
├── types.ts            # Match, Score, MatchStatus, Team
├── dataSource.ts       # Adapter: getNextMatch(), getUpcoming(), getLiveScore()
└── useMatchPolling.ts  # 30s polling hook (only when match is LIVE)
```

**v1:** `dataSource.ts` reads `fixtures.json`. Live scores return `null` (UPCOMING / FT badges only).
**v2:** Swap to chosen API. No component changes needed.

---

## 7. CRM Lead Payload

```json
{
  "name": "...",
  "email": "...",
  "phone": "+977...",
  "study_destination": "USA | Canada | UK | Australia | ...",
  "source": "worldcup-predict-win",
  "match_id": "wc2026-grp-a-m1",
  "match_label": "Argentina vs Brazil",
  "prediction": "team_a | draw | team_b",
  "submitted_at": "<ISO timestamp>"
}
```

POST'd client-side. Endpoint URL filled in once client provides it (placeholder constant in `dataSource.ts` for v1).

---

## 8. File Changes

### New files

**Page + meta:**
- `src/app/events/worldcup-2026/page.tsx`
- `src/app/events/worldcup-2026/layout.tsx`
- `src/app/events/worldcup-2026/meta.json` (auto-card on `/events`)
- `src/app/events/worldcup-2026/wc-theme.css`

**Components (`src/components/worldcup/`):**
- `CinematicHero.tsx` — full-bleed hero with countdown
- `NextMatchSpotlight.tsx` — scoreboard with flip-digit score + live clock
- `PredictionContainer.tsx` — bet-slip tiles + lead form + confetti
- `UpcomingMatchesList.tsx` — horizontal rail with lock states
- `HypeStrip.tsx` — marquee leaderboard + results ticker
- `CountdownToFinal.tsx` — countdown to July 19
- `MatchCard.tsx` — reusable card primitive
- `Flag.tsx` — SVG flag wrapper with drop shadow
- `ScoreDigits.tsx` — flip-counter
- `Confetti.tsx` — lightweight CSS confetti

**Data layer (`src/lib/worldcup/`):**
- `fixtures.json`, `teams.json`, `types.ts`, `dataSource.ts`, `useMatchPolling.ts`

**Assets:**
- `public/images/events/worldcup-2026/` (hero, trophy, OG image)
- `public/flags/` (SVG flags if not present)

### Modified files

| Path | Change |
|---|---|
| `scripts/generate-sitemap.mjs` | Add `{ path: "/events/worldcup-2026", priority: 0.7, freq: "weekly" }` |

### Not touched
- `next.config.ts`, Docker/nginx/Traefik configs, existing campaign pages, affiliate flow

---

## 9. SEO

- **Title:** "FIFA World Cup 2026 — Predict & Win | Admizz Education"
- **Description:** "Predict the next World Cup 2026 match for a chance to win prizes plus free study-abroad counselling. Open to residents of Nepal."
- **Canonical:** `https://admizzeducation.com/events/worldcup-2026` (no trailing slash)
- **OpenGraph:** custom OG image with WC creative
- **JSON-LD `Event` schema:** name, startDate (2026-06-11), endDate (2026-07-19), eventStatus, organizer
- **Sitemap entry** added

---

## 10. Phased Rollout

**Phase 1 — Now (this build):**
- Full page with all 12 sections
- Hardcoded fixtures (all 64 matches)
- Single-next-match lock working off system clock
- Prediction form POSTing to a placeholder CRM endpoint constant
- Placeholder prize cards
- Deploy to dev for stakeholder review

**Phase 2 — After client meeting:**
- Wire real CRM endpoint
- Plug chosen football API into `dataSource.ts`
- Verify end-to-end lead capture

**Phase 3 — After prize decisions:**
- Real prizes + T&Cs page

---

## 11. Verification

1. `npm run build` passes, `out/events/worldcup-2026/index.html` exists
2. Sitemap contains `/events/worldcup-2026`
3. `/events` shows the new card in Upcoming tab
4. Mock `Date.now()` → confirm spotlight rolls correctly across UPCOMING → LIVE → FT
5. Test prediction submission → correct payload in network tab
6. localStorage persists user's pick across refresh
7. Mobile responsive at 320px and 921px breakpoints
8. View source → canonical, OG, JSON-LD all present
9. `./deploy.sh dev` → verify at `dev-web.admizzeducation.com/events/worldcup-2026`

---

## 12. Open Items (not blocking Phase 1)

- Football data API choice
- CRM endpoint URL + auth
- Prize structure + T&Cs page
- Optional: public leaderboard of top predictors (Phase 4)
