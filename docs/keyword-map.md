# Keyword map (one primary page per target)

Source: Google Search Console for admizzeducation.com, Aug 30 – Oct 9, 2026 (analytics site 8862),
plus the page titles in `src/app`. Positions are impression-weighted averages. Re-pull the data and
update this file when pages change. Rule: **one primary page per keyword**. Every other page that
ranks for it links to the primary page and does not try to win the same query.

## Primary pages

| Target keyword | Primary page | Position now | Impressions (40 days) |
|---|---|---|---|
| study abroad from nepal | `/study-abroad-from-nepal` | 21.7–31.9 | 166 |
| study abroad consultancy in nepal | `/top-education-consultancy-in-nepal` (`/study-abroad-consultancy-in-nepal` now 301-redirects here) | 3.6 (old URL) | 130 |
| top / best education consultancy in nepal | `/top-education-consultancy-in-nepal` | 5.1 | 292 |
| best study abroad consultants | `/best-study-abroad-consultants-in-nepal-how-to-choose-the-right-one-for-your-future` | 13.7–26 | 90 |
| study in uk from nepal | `/study-in-uk-from-nepal` | 54.5 | 179 |
| uk student visa from nepal | `/uk-student-visa-from-nepal` | 58.3 | 56 |
| study in usa / america from nepal | `/study-in-usa-from-nepal` | 34.6 | 178 |
| study in canada from nepal | `/study-in-canada-from-nepal` | 53.7 | 3 |
| study in australia from nepal | `/study-in-australia-from-nepal` (new) | not ranking yet | 0 |
| australia student visa (subclass 500) | `/australia-student-visa-subclass-500` | 78.8 | 91 |
| study in south korea / korea from nepal | `/study-in-south-korea-from-nepal` | 25.2 | 98 |
| study in new zealand from nepal | `/study-in-newzealand-from-nepal` | 75 | 10 |
| study in india from nepal | `/study-in-india-from-nepal` | 19.2 | 29 |
| noc.moest.gov.np / NOC for study abroad | `/how-to-get-your-noc-from-nepal-for-study-abroad` | 6.7–7.2 | 217 |
| compex scholarship 2026 (exam date, form, syllabus) | `/compex-scholarship-2026-complete-guide-for-nepalese-students-to-study-in-india` | 9.7 | 4,791 |
| chevening scholarship nepal | `/chevening-scholarship-complete-guide-for-nepali-students` | 9.6 | 267 |
| fulbright scholarship nepal | `/fulbright-scholarship-for-nepal-complete-application-guide` | 12.8 | 68 |
| gks scholarship nepal | `/study-in-south-korea-from-nepal-your-complete-guide-to-gks-scholarship-tech-opportunities` | 10.2 | 69 |
| kiit courses | `/top-courses-to-study-at-kiit-university` | 11.1 | 107 |
| australia assessment level nepal | `/australia-assessment-level-3-nepal-2026` | 29.8 | 13 |
| ielts score for canada university | `/minimum-ielts-requirement-for-canadian-universities` | 48.6 | 21 |
| study abroad visa costs / which country is cheapest (UK, USA, Canada, Australia) | `/study-abroad-visa-costs-compared-uk-usa-canada-australia-2026` (new) | not ranking yet | 0 |
| proof of funds for study abroad from nepal | `/proof-of-funds-study-abroad-nepal-2026` (new) | not ranking yet | 0 |
| work after study / post-study work (UK, Canada, USA, Australia) | `/post-study-work-options-uk-canada-usa-australia-nepali-students-2026` (new) | not ranking yet | 0 |
| brand: admizz, admizz education | `/` | 2.6–2.9 | 1,400+ |

## What the data says

1. **Brand is fine, everything else is below page 1.** Brand queries sit at position 2–3. The country
   and visa pages are at 25–80. The scholarship and NOC pages are at 6–12, so they are close.
2. **Page 1 but almost no clicks.** COMPEX (4,791 impressions at ~9.7) and Chevening (267 at 9.6)
   get 16 and 1 clicks. They sit at the bottom of page 1. Moving them to the top 5 is the fastest
   traffic gain on the site. Titles already carry the year and date terms; next is a clearer
   answer-first block and fresher dates.
3. **Our own pages compete with each other** (self-cannibalization). For one query, several pages
   rank, so none gets strong:
   - "study in uk from nepal": 6 pages (`/study-in-uk-from-nepal`, `/study-in-the-uk-from-nepal-2026-complete-guide`,
     `/studying-in-the-uk-from-nepal-2025`, `/study-in-the-uk-after-2-from-nepal-complete-2025-guide`,
     `/ielts-requirement-for-studying-in-the-uk-from-nepal`, `/why-choose-the-uk-for-higher-education-...`)
   - "study in usa from nepal": 5 pages (`/study-in-usa-from-nepal`,
     `/study-in-the-usa-for-nepali-students-f-1-visa-scholarships-work-opportunities`,
     `/study-in-usa-with-scholarship-from-nepal-a-complete-guide`,
     `/why-study-in-the-usa-from-nepal-benefits-opportunities-and-global-exposure`, `/study-abroad-from-nepal`)
   - "uk student visa from nepal": 4 pages. "study in korea from nepal": 2 pages.
   **Done on 2026-10-13:** 5 duplicates are 301-redirected in `nginx/static.conf` and removed from the sitemap,
   `llms` files and queries (`src/data/retired-posts.json`): UK `study-in-the-uk-from-nepal-2026-complete-guide`,
   `studying-in-the-uk-from-nepal-2025`, `study-in-the-uk-after-2-from-nepal-complete-2025-guide` go to
   `/study-in-uk-from-nepal`; USA `study-in-usa-with-scholarship-from-nepal-a-complete-guide` and
   `study-in-the-usa-for-nepali-students-f-1-visa-scholarships-work-opportunities` go to `/study-in-usa-from-nepal`.
   Kept as distinct angles, linking up to the primary page: `ielts-requirement-for-studying-in-the-uk-from-nepal`,
   `why-choose-the-uk-for-higher-education-...`, `why-study-in-the-usa-from-nepal-...`. The redirects take effect
   when the image is rebuilt. Watch the UK page: the old 2026 guide ranked better (33) than the country page (55).
4. **Several pages are old duplicates by year** (`...-2025`, `...-2026-complete-guide`). Merge them
   into the primary page rather than adding more years.
5. **Gaps filled in this branch:** `/study-in-australia-from-nepal` is new, and
   `/study-in-canada-from-nepal` now has a quick answer, 2026 permit fees and funds, a comparison
   table and an official-sources list. Both are now in the sitemap.
6. **Remaining gaps:** no dedicated "study in germany from nepal" primary page
   (`/study-in-germany-from-nepal-costs-intakes-visa-2026` exists but the query "study in germany
   from nepal" currently lands on `/study-in-europe-from-nepal`); `/study-in-newzealand-from-nepal`
   ranks at 75.

## For ChatGPT, Perplexity and Google AI Overviews

AI engines quote pages that answer the question in the first lines and cite an official source.
Every primary page above should have: a `quickAnswer` of 1–3 sentences, a visible FAQ with FAQPage
schema, figures linked to GOV.UK / IRCC / Home Affairs / US State Department, a "checked in <Month
Year>" line. The country pages for the UK, USA, Canada and Australia now meet this. `llms.txt` lists the country pages, now includes Australia, and has a "Key Facts for Nepali Students" block
with the sourced fees and funds. `robots.txt` already allows GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
ClaudeBot and Google-Extended. Next: South Korea, India, New Zealand, Germany.

## Next steps, in order

1. UK and USA duplicates merged (see above). Still to do: re-angle `ielts-requirement...` and `why-study-in-the-usa...` so they stop targeting the same query.
2. Done (2026-10-13): COMPEX and Chevening intros are answer-first, with the closed status and dates in the first lines.
3. Done (2026-10-13): South Korea, India and New Zealand "from Nepal" pages have a quick answer, sources and checked figures (Immigration NZ, Study in Korea, Korean Embassy Nepal).
4. Done (2026-10-13): homepage title and description name the consultancy and Nepal, and the country cards point to the "from Nepal" primary pages. No new homepage sections were added.
5. After deploy: submit the sitemap in Search Console and request indexing for the new posts and `/study-in-australia-from-nepal`.
6. Re-pull Search Console about 4 weeks after deploy and update the Position column.
