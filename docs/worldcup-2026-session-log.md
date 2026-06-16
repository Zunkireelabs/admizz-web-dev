# FIFA World Cup 2026 — Session Log

**Last session:** 2026-06-09
**Current branch:** `deploy/static-export-migration`
**Live URL:** https://dev-web.admizzeducation.com/events/worldcup-2026
**Tournament starts:** 2026-06-11 (opening match: South Africa vs Mexico at Estadio Banorte)
**Tournament ends:** 2026-07-19 (Final at MetLife Stadium)

---

## Current State — What's Shipped

The page is a **complete tournament hub** built per the user's brief: "Build a premium digital tournament destination... feel like FIFA's official tournament hub, ESPN FC, FotMob, OneFootball." The prediction feature is integrated naturally — not the focus.

### Live Page Sections (top to bottom)
1. **Cinematic Hero** — full-bleed stadium photo, parallax, particles, host country badges (🇨🇦 🇺🇸 🇲🇽), Bebas Neue headline, live ESPN ticker tape at bottom, in-hero nav pill (centered, after host strip)
2. **Tournament Pulse** — 4 stat cards with `IntersectionObserver` count-up animations (Matches Played / Goals Scored / Top Scorer / Days to Final)
3. **Match of the Day** — broadcast scoreboard via shared `MatchScoreboard` component (stadium bg, big flag circles, form pills W/D/L, kickoff countdown, status pill). Below: 3 quick-pick tiles → opens modal
4. **Today's Schedule** — horizontal strips (Today / Tomorrow / This Week), live scores when matches are in progress
5. **Knockout Bracket** — trophy beacon at top with gold glow, 5-column grid (R32→F), meaningful TBD placeholders ("Winner A" / "Runner-up B"), gold-treated Final slot with "★" badge, mobile pill tabs
6. **Group Standings** — 12 group cards using **CSS Grid** (not tables — bulletproof column alignment). Top 2 = green left border, Best-8 third place = gold left border
7. **Golden Boot Race** — featured leader card on left (gold gradient, glowing trophy icon, big "01" rank, country flag) + leaderboard rows on right (#02 through #08, square avatar with initials, country pill, goals + assists inline)
8. **Prediction Center** — pure dashboard (no duplicate scoreboard). Accuracy ring (SVG progress), current/best streak, total predictions, recent history with ✅/❌/pending markers, achievement badges
9. **Admizz Story** — earned conversion moment with stadium bg, gold accent headline, 3 stat cards, single CTA

### Design Tokens (CSS variables)
- Primary red: `#C8102E` (World Cup red)
- Accent: `#FFCC00` (gold, restraint — only for #1 / qualified states / final slot)
- Background: `#0A0A0A`
- Surfaces: `#111111`, `#181818`, `#202020`, `#2A2A2A`
- Host nations: Canada `#D80021`, USA `#0A3161`, Mexico `#006847`
- Live indicator: `#FF1744`

### Typography
- **Display:** Bebas Neue (`var(--font-bebas)`)
- **UI:** Inter (`var(--font-inter)`)
- **Data:** JetBrains Mono (`var(--font-mono)`) — used for scores, times, standings numbers
- All loaded via `next/font/google` in `src/app/events/worldcup-2026/layout.tsx`

---

## Architecture

### Folder structure
```
src/
├── app/events/worldcup-2026/
│   ├── page.tsx                # Server component, metadata, JSON-LD
│   ├── layout.tsx              # Font loading (Bebas/Inter/Mono)
│   └── meta.json               # Auto-card on /events listing
├── components/wc2026/
│   ├── shared/
│   │   ├── Icons.tsx           # 14 custom SVG icons (Trophy, Football, Stadium, Timer, Goal, Chart, Arrow, Check, Lock, Pin, Calendar, Flame, Star, Podium)
│   │   ├── Flag.tsx            # Country flag w/ fitParent mode (uses CSS class for sizing inside frames)
│   │   ├── CountUp.tsx         # Animated counter (IntersectionObserver)
│   │   ├── Countdown.tsx       # Stable hydration (null until mount, then real Date.now)
│   │   ├── FloatingNav.tsx     # In-hero nav pill (NOT fixed/sticky — sits inline after Hosted-by strip)
│   │   ├── MatchScoreboard.tsx # Shared broadcast scoreboard (used by MOTD; available for other sections)
│   │   └── PredictionModal.tsx # Click-tile → modal popup w/ lead form. Mobile = bottom sheet
│   └── sections/
│       ├── HeroCinematic.tsx   # Parallax photo (clamped to hero height), particles, ticker
│       ├── TournamentPulse.tsx # 4 glass stat cards
│       ├── MatchOfTheDay.tsx   # Uses MatchScoreboard + InlinePredict
│       ├── InlinePredict.tsx   # 3 tiles → opens PredictionModal
│       ├── TodaySchedule.tsx   # Today/Tomorrow/This Week strips
│       ├── BracketViz.tsx      # 5-col bracket grid, mobile tabs, trophy beacon
│       ├── GroupStandings.tsx  # CSS Grid tables (NOT HTML tables — see "Standings" below)
│       ├── GoldenBoot.tsx      # Featured leader + leaderboard rows
│       ├── PredictionCenter.tsx# Dashboard ONLY (accuracy, history, achievements)
│       └── AdmizzStory.tsx     # Final conversion section
└── lib/wc2026/
    ├── espn/
    │   ├── scoreboard.ts       # /scoreboard endpoint, 60s cache
    │   ├── standings.ts        # /standings endpoint, 5min cache
    │   └── leaders.ts          # Aggregates goal scorers from /summary?event={id} calls
    ├── LiveProvider.tsx        # Single context, polls all 3 endpoints every 60s
    ├── tokens.ts               # Design tokens as TS constants
    ├── types.ts                # Match, Team, Score, StandingsEntry, TopScorer, BracketSlot, PredictionLead, etc.
    ├── seed.ts                 # 10 hardcoded fixtures for first-paint + ESPN-down fallback
    ├── bracket.ts              # Builds bracket structure with meaningful TBD placeholders
    ├── topScorers.ts           # Pre-tournament favourites list (Mbappé/Messi/Haaland/etc.)
    ├── predictions.ts          # localStorage CRUD + stats aggregation (accuracy, streak, achievements)
    └── format.ts               # NPT timezone formatting (date/time/weekday/day)

public/events/css/
└── worldcup-2026.css           # All section styles (~2400 lines). Lives in /public/ so NOT hot-reloaded by dev server — hard refresh required after CSS edits

docs/
├── worldcup-2026-campaign-plan.md     # Original campaign plan
└── worldcup-2026-session-log.md       # THIS file
```

### Data flow
```
LiveProvider (60s polling)
   ├─ ESPN /scoreboard → matches array (with seed.ts as fallback)
   ├─ ESPN /standings → 12 groups with entries
   └─ ESPN /summary?event=X (for each NEW FT match) → goal events → aggregator
        ↓
   Derives: nextMatch · liveMatches · upcomingMatches · recentMatches · pulse stats · topScorers
        ↓
   Consumed by all 9 sections via useLive() hook
```

### Hydration strategy
- Initial state uses **stable reference time** `2026-06-09T00:00:00Z` (not `Date.now()`)
- First useEffect tick immediately re-derives with real `Date.now()` + seed data
- Subsequent ticks fetch ESPN data
- Result: zero hydration mismatch warnings on static export

---

## Predict & Win Logic

- One match predictable at a time (the next upcoming, derived from `nextMatch`)
- Click any tile (MOTD or — was Prediction Center, now removed) → `PredictionModal` opens
- Modal: chosen pick header with team flag → form (name, email, phone, study destination) → submit
- POST to `/api/worldcup-lead-placeholder` (PLACEHOLDER — needs to be swapped to real CRM endpoint)
- Persists in `localStorage` under key `wc26-predictions`
- Auto-resolves when ESPN reports match as FT — accuracy ring + history reflect outcome
- Achievements: First Pick, Five Picks, Ten Picks, Hot Streak ×3, On Fire ×5, Sharp Eye 75%+
- Lead payload tagged `source: "worldcup-predict-win"`

---

## Key Decisions Made

| Decision | Reason |
|---|---|
| **No floating nav (removed sticky/fixed)** | Was overlapping the site's own header. Now sits **inline inside the hero**, centered, after Hosted-by strip. Scrolls with the hero. |
| **CSS Grid for standings, not HTML tables** | Tables had unreliable column widths per row (auto-sizing). Grid is deterministic — `1fr 36px 44px 44px`. |
| **ESPN scoreboard URL fixed to `?dates=20260611-20260720`** | All 104 matches in one request. Cached 60s. |
| **Seed.ts has 10 starter matches with real ESPN flag URLs** | Page renders fully on first paint, even before ESPN responds. Falls back if ESPN ever down. |
| **Stable reference time for initial state** | Eliminates SSR/client hydration mismatch on static export |
| **Top scorers: aggregate from `/summary?event={id}` per FT match** | ESPN doesn't expose a tournament-wide top scorers endpoint. We build it incrementally — each match processed once across tab lifetime |
| **5 min TTL for top scorers** | Less critical to be real-time than scoreboard. Reduces API pressure. |
| **Click tile → modal popup (not inline form)** | User explicitly asked for this. Modal becomes bottom-sheet on mobile. |
| **PredictionCenter is dashboard-ONLY** | Removed duplicate scoreboard. Predictions happen in MOTD; PC shows your tracking stats. |
| **Bracket TBD placeholders** | Use meaningful labels ("Winner A" / "Runner-up B" / "Best 3rd · 1") instead of "TBD" — feels alive before tournament starts |
| **Best-8 detection: search for `"best 8"` string** | ESPN's actual note text is "Best 8 advance", not "Best third". My initial detector missed this. |

---

## What's Done

- ✅ ESPN scoreboard integration (all 104 matches load)
- ✅ ESPN standings integration (12 group tables populate)
- ✅ ESPN top scorers integration (aggregator over `/summary` endpoints, incremental + cached)
- ✅ Stable hydration (no SSR mismatch)
- ✅ Seed data fallback (page never goes blank)
- ✅ Standings rewritten as CSS Grid (proper column alignment)
- ✅ Golden Boot rebuilt with featured leader + leaderboard rows + real flag PNGs
- ✅ Knockout Bracket rebuilt with trophy beacon, meaningful TBDs, gold final slot, mobile tabs
- ✅ Prediction modal popup (replaces inline form)
- ✅ Prediction Center trimmed to dashboard only (no duplicate scoreboard)
- ✅ Floating nav inline in hero (no header collision)
- ✅ Hero parallax clamped to hero height (no gap on scroll)
- ✅ Hero ticker tape with fade mask (no overlap with LIVE badge)
- ✅ Flag component sizing fixed (fitParent mode)
- ✅ Status mapping defaults to UPCOMING for unknown ESPN states (postponed/cancelled)
- ✅ Shootout penalties excluded from goal aggregation
- ✅ Best-8 third place detection fixed
- ✅ Deployed to dev: https://dev-web.admizzeducation.com/events/worldcup-2026

---

## What's NOT Done — Open Items

### Critical (before June 11 kickoff)
- [ ] **Real CRM endpoint** — Currently posts to `/api/worldcup-lead-placeholder` (404s silently). Needs to be swapped to the real CRM URL once the user provides it. Constant lives in `src/components/wc2026/shared/PredictionModal.tsx` (`CRM_ENDPOINT`)
- [ ] **Real prize copy** — Single prize hero card on the original page used placeholder "To Be Announced." Current redesign omitted prize section entirely; if needed, add back. User hasn't confirmed prize structure yet.
- [ ] **Smoke test on opening day** — June 11, watch for: status pill flips to LIVE, clock starts ticking, score updates, MOTD rolls to next match on FT, Tournament Pulse counters increment

### Nice to have
- [ ] **Uptime monitor** — cron pinging the dev URL every 5 min, Slack-alert on non-200. ~30 min to set up.
- [ ] **Goal scorer ticker** — Could pull recent scoring events from `/summary` and display in MOTD or as a hero ticker item
- [ ] **Standings page subdomain** — Currently only `/events/worldcup-2026`. No separate `/bracket` `/standings` etc. (single-page hub per user's spec)
- [ ] **Final prize tier card / Ts & Cs page** — If prizes get finalized

### Known limitations (acceptable, documented)
- Live score lag 30–90s (ESPN reporting + 60s polling)
- Top scorers refresh every 5 min (not real-time, by design)
- Own goals attribute scorer's team incorrectly (rare)
- No play-by-play commentary
- No extra-time/penalty score display (we show the final 90-min score; the WINNER is correct, just no "(4-3 pens)" suffix)

---

## How to Resume

```bash
cd /home/zunkireelabs/devprojects/websiteprojects/admizz-devs/admizz-edu-web-dev
git status
git log --oneline -10
# Local preview (existing dev server on port 3003):
# http://localhost:3003/events/worldcup-2026
# Build:
npm run build
# Deploy:
./deploy.sh dev
```

**Common task → file map:**

| Task | File(s) |
|---|---|
| Change a section's layout | `src/components/wc2026/sections/<Section>.tsx` |
| Change a section's styling | `public/events/css/worldcup-2026.css` (then **hard refresh** — not hot-reloaded) |
| Change ESPN endpoint or parsing | `src/lib/wc2026/espn/<scoreboard|standings|leaders>.ts` |
| Adjust polling interval | `src/lib/wc2026/LiveProvider.tsx` (currently 60s) |
| Adjust prediction CRM endpoint | `src/components/wc2026/shared/PredictionModal.tsx` (`CRM_ENDPOINT` constant) |
| Change seed data | `src/lib/wc2026/seed.ts` |
| Add a new section | New file in `sections/`, import in `page.tsx`, wrap with `LiveProvider` already in place |
| Change the bracket placeholder labels | `src/lib/wc2026/bracket.ts` (`R32_PLACEHOLDERS` array) |

---

## What the User Said They Want

- **Premium tournament hub** that football fans bookmark and return to daily — destination, not landing page
- **Visual references:** FIFA × ESPN FC × FotMob × OneFootball × Apple × Stripe × Linear
- **The prediction is a feature, not the product** — tournament experience comes first, Admizz earns the conversion
- **Two-color discipline (red + black + accent gold)** — restraint over decoration
- **Massive Bebas Neue, Inter UI, JetBrains Mono data** — broadcast feel
- **One animation per section** — purposeful, not flashy
- **Mobile-first** — 80% of Nepali traffic
- **Modal popup for the form** (clicked into being, not inline)
- **No duplicate sections** — one place to predict (MOTD top), one place to track (Prediction Center)
- **Live and real** — ESPN-driven, not human-updated

---

## Tomorrow's Likely Tasks

User said: "we will work on this from tomorrow." Open candidates based on the journey so far:

1. Polish individual sections that haven't been deeply iterated on yet (Tournament Pulse, Today's Schedule, Admizz Story)
2. Add motion (Framer Motion installed — currently used minimally)
3. Wire real CRM endpoint when user provides it
4. Smoke-test plan for June 11 opening match
5. Possibly: animated bracket connection lines (mentioned in brief but not implemented — SVG paths drawing themselves with `stroke-dasharray`)
6. Possibly: prize section if user has prize details

Ask: "Where do you want to start today?"
