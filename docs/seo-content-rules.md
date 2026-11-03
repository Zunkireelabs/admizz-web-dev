# SEO / GEO / AEO content rules

Applies to every new blog post, answer page and comparison page. Enforced where possible by
`scripts/validate-content.mjs` (runs in `prebuild`, so CI and every build check it).

## Facts
- Every number, fee, date or rule comes from an official source (GOV.UK, IRCC, Home Affairs, DAAD, the embassy, the university). Link it in a **Sources** section.
- End the body with a "checked in <Month Year>" line. Fees and rules change, so say what to re-check and where.
- Never invent statistics, rankings, reviews or student counts. Use only figures already approved on the site (for example the Google rating on the accreditation page).
- Never make claims about named competitors. Comparison posts compare on criteria (licensing, fees in writing, visa refusal handling, university authorization, support after arrival), and Admizz is described honestly against those criteria.

## Structure (answer-first, so search and AI engines can quote it)
- `quickAnswer`: 1 to 3 sentences at the top that restate only facts already in the body.
- Visible FAQ (`faqItems`, 3 to 6 real questions). FAQPage schema is emitted only alongside the visible FAQ, never alone, and a page never gets two FAQs.
- H2 headings written as the question or topic people search. Short paragraphs, tables or lists for figures.
- Internal links: at least one to a sibling post and one to a hub (`/top-education-consultancy-in-nepal`, `/education-consultancy-in-kathmandu` or the destination page).

## Language and style (American English, site-wide)
- American spelling in all visible text: counseling/counselor, program, enrollment/enroll, center, recognized, personalized, organize, specialize, advisor, practice (verb), traveling, honor.
- "Nepali" (not "Nepalese") in visible text. Slugs and URLs never change, so existing slugs keep "Nepalese".
- Dates are month-first: November 30, 2026 (comma after the year when the sentence continues). Chips and tight labels may abbreviate: Nov 30, 2026.
- "master's" and "bachelor's" in lowercase inside sentences. "F-1", "H-1B", "J-1" with the hyphen. "US" in sentences; "USA" only in titles, menus and slugs. "FAQs".
- Money with a thousands comma: £6,000, $3,000.
- Keep official names as written: Confirmation of Enrolment (CoE), sponsor licence, Dependants (UK visa category), Visa Application Centre, Migration Health Assessment Centre, programme names such as Orange Knowledge Programme, university names.
- The validator rejects British spellings, "Nepalese" and day-first dates in repo-authored posts.

## Metadata
- Canonical is `https://admizzeducation.com/<slug>` with no trailing slash.
- Title under about 60 characters, description under about 160. Include the year and the Nepal angle where it is true (`-2027`, `nepali-students`).
- Slugs are lowercase and hyphenated.

## Adding a repo-authored post (checklist)
1. `src/app/<slug>/page.tsx` using `GeneratedBlogPost` (copy `uk-student-visa-cost-2027`).
2. Entry in `src/data/generated-posts.json` (same commit).
3. Image at `public/images/blog/<slug>.webp`. Categories must be real Sanity taxonomy slugs.
4. `npm run build` passes. Confirm the URL is in `public/sitemap.xml`.
5. Deploy to dev first (`./deploy.sh dev`). Production only on an explicit go-ahead.

## Legacy exemptions
`LEGACY_EXEMPT` in `scripts/validate-content.mjs` lists older posts that lack a quickAnswer or Sources section. Backfill them and remove them from the list. Never add a new post to it.
