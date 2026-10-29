# FACTS.md — single source of truth for claims on admizzeducation.com

Every number, rating, promise or contact detail shown on the website must come from this file.
If a fact is not here (or is not marked **Confirmed**), it must not appear on a page.

> **Status: in progress.** Sections 1–2 have interim values (see notes). Everything else is still
> a template. Fill in each row with the client, mark it **Confirmed**, then update the pages to match.

> **In code:** company claims (currently students placed) live in
> `src/lib/admizz-stats.ts`. Every page reads from that file. Change the value here first, then there.
> Never hardcode these numbers on a page.

---

## How to use this file

1. **Before writing copy** that contains a number, rating, year, name or promise, look it up here.
2. **If it is missing**, add a row with status `Needs confirmation`, ask the client, and do not use it on a page until it is `Confirmed`.
3. **When a fact changes**, change it here first, then update every page listed under *Used on*.
4. **One value per fact.** If two pages show different values for the same fact, this file decides which is right.

### Status values
| Status | Meaning |
|---|---|
| `Confirmed` | Client has approved this value. Safe to use. |
| `Needs confirmation` | Value is unknown or unverified. Do not use on pages. |
| `Retired` | No longer true. Remove from pages. |

### Row format
`Fact` · `Value` · `Status` · `Source / who confirmed` · `Last checked (date)` · `Used on`

---

## 1. Company track record
| Fact | Value | Status | Source | Last checked | Used on |
|---|---|---|---|---|---|
| Students placed / enrolled (total) | 1,500+ (interim) | Needs confirmation | Site previously showed both 1500+ and 2,000+. Lower value used until confirmed. Need: value + since which year. | 2026-10-29 | `ADMIZZ_STATS.studentsPlaced` — homepage, about, register, all country pages, SEO landing pages, city pages, events, campaign-uk, destination quiz, alumni section, affiliate referral message |
| Years of experience / year founded | _TBD_ | Needs confirmation | | | |
| Partner universities (count) | _TBD_ | Needs confirmation | | | |
| Countries served (count) | _TBD_ | Needs confirmation | | | |
| Offices / branches (count and cities) | _TBD_ | Needs confirmation | | | |

## 2. Outcomes
| Fact | Value | Status | Source | Last checked | Used on |
|---|---|---|---|---|---|
| Visa approval rate | _Removed from site_ | Needs confirmation | Removed from every page on 2026-10-29 until confirmed. Site previously showed 95% and 97% (UK-from-Nepal). Need: value + which years / basis. Client flagged it as a strong claim (2026-10-29). | 2026-10-29 | None (stat slots now show “Free first consultation”) |
| Scholarships secured for students (total) | _Removed from site_ | Needs confirmation | Removed from every page on 2026-10-29 until confirmed. Site previously showed $2M+, £3M+ (UK-from-Nepal) and $5M+ (USA-from-Nepal). Need: value + currency + since when. Client flagged it as a strong claim (2026-10-29). | 2026-10-29 | None (stat slots now show “ICEF accredited”) |

## 3. Service promises
| Fact | Value | Status | Source | Last checked | Used on |
|---|---|---|---|---|---|
| Reply time after an enquiry | _TBD_ | Needs confirmation | | | |
| Initial consultation is free | Yes (shown on site) | Needs confirmation | Site CTA everywhere says “free consultation”. Now also a stat block (“Free first consultation”). | | Stat blocks site-wide, all CTAs |
| Services included (application, visa, scholarship, pre-departure) | _TBD_ | Needs confirmation | | | |
| ICEF accredited agency | Yes (shown on site) | Needs confirmation | Replaces the visa/scholarship stats. Check the listing on icef.com and note the expiry date. | | Stat blocks site-wide, event trust bars, register page |

## 4. Ratings and reviews
| Fact | Value | Status | Source | Last checked | Used on |
|---|---|---|---|---|---|
| Google rating | _TBD_ | Needs confirmation | | | |
| Number of Google reviews | _TBD_ | Needs confirmation | | | |

## 5. Contact details
| Fact | Value | Status | Source | Last checked | Used on |
|---|---|---|---|---|---|
| Main email | _TBD_ | Needs confirmation | | | |
| Main phone / WhatsApp | _TBD_ | Needs confirmation | | | |
| Office addresses | _TBD_ | Needs confirmation | | | |

## 6. Per-country facts
Facts that belong to a single destination (tuition ranges, number of universities, intakes,
visa fees, blocked-account amounts, post-study work rules) live in each country's page data
(`src/app/study-in-*/page.tsx`). They change often and must be re-checked against official sources.

| Country | Last reviewed | Reviewed by | Notes |
|---|---|---|---|
| Australia | | | |
| Canada | | | |
| Denmark | | | |
| Finland | | | |
| France | | | |
| Germany | | | |
| India | | | |
| Nepal | | | |
| New Zealand | | | |
| South Korea | | | |
| UAE | | | |
| UK | 2026-10-29 | Claude (client review) | Graduate visa 18 months from 1 Jan 2027 (PhD 3 yrs), IHS £776/yr, living funds £1,529/month London and £1,171/month elsewhere (up to 9 months), eVisa replaces BRP, work 20 hrs degree level / 10 hrs below — all from GOV.UK. 685,000+ international students (HESA 2024/25). 165+ universities. Same facts applied to `study-in-uk-from-nepal`. |
| USA | | | |

---

## Change log
| Date | Change | By |
|---|---|---|
| 2026-10-28 | File created as an empty template. No facts entered yet. | |
| 2026-10-29 | Added interim values for students placed, visa approval rate and scholarships (lowest value that was on the site). All pages now read them from `src/lib/admizz-stats.ts`. UK per-country facts reviewed against GOV.UK and HESA. | Claude |
| 2026-10-29 | Removed visa approval rate and scholarship total from every page until Admizz confirms them. Slots replaced with “Free first consultation” and “ICEF accredited”. | Claude |
