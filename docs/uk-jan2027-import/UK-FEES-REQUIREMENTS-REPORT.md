# Requirements + Fees tabs: change and data report

Prepared 2026-10-15. Branch: `feature/university-knowledge-base-stage`. **Status: local only, not committed or pushed.**

Source for data: `temp_ss/Copy of UK-January-2027.xlsx`, tab "Jan 2027 Intake", columns **Fees** (the "Deposit:" line) and **Requirements** (the "Gap:" line).

## 1. What changed on the university page

| Before | After |
|---|---|
| Tab "Entry Requirements" | Tab **Requirements** (same `#entry` link) with 3 sections: **Academic**, **English test**, **Gap** |
| Gap shown as a small line inside each academic box | Gap is its own section, one row per study level |
| Tuition only on course cards; scholarships at the bottom of the Courses tab; deposits in "More Info" | New tab **Fees** with 3 sections: **Tuition fees**, **Scholarship**, **CAS deposit** |

Rules:
- A section with no data is **hidden** (for example, no CAS deposit means no CAS section).
- If a university has no fee data at all, the Fees tab shows "Fee details for this university are being confirmed. Ask a counsellor".
- Tuition fees: a range per study level from the course list (falls back to the level summary).
- Scholarships still also show on the Courses tab. Deposits moved out of "More Info" so nothing shows twice.

Files: `UniversityTabs.tsx`, `UniversityPanels.tsx`, `types.ts` (a deposit can now be a fixed `amount` **or** a `value` text such as "50% of tuition fee"), and the new `scripts/fill-uk-deposits.mjs`.

## 2. Data fill

Add-only: existing values were not changed. A profile that already had `deposits` was skipped.

| | Profiles |
|---|---|
| Total UK profiles |       61 |
| Already had deposits | 11 |
| **Deposits added from the sheet** | **31** |
| Now with a CAS / deposit section | 42 |
| Still without (section hidden) | 19 |

**Gap:** nearly every profile already had gap data from the earlier import, so nothing needed filling. Three profiles have no gap data: Abertay, BPP and Huddersfield. The sheet has no gap entry for them either, so the Gap section is hidden on those pages.

### Added (31)
Arden, Aston, Bangor, Birmingham City, Cardiff Met, Harper Adams, Health Sciences University, Leeds Trinity, Middlesex, Ravensbourne, Regent College London, Staffordshire, Ulster (London/Birmingham/Manchester), Bedfordshire, Bradford, Brighton, Chester, East London, Hertfordshire, Hull, Lancashire, Law, Roehampton, Sunderland, West London, West of Scotland, Wales Trinity Saint David, Winchester, Wolverhampton, Worcester, York St John.

### Still no deposit (19): the sheet has none
- **Sheet says nothing:** Anglia Ruskin, Bangor International College, Bradford International College, Portsmouth International College, Bath Spa, Buckinghamshire New, Coventry, Edinburgh Napier, London Metropolitan, University College Birmingham, Creative Arts, Cumbria, Essex, Plymouth, Portsmouth, Salford, Surrey.
- **Sheet says "not stated":** Aston OnCampus.
- **Not in the sheet:** Liverpool Hope. The sheet may have removed or closed this college; it's still on the site. **Needs your decision.**

## 3. Assumptions and things to check

| # | Item | What I did |
|---|---|---|
| A1 | The sheet says only "CAS deposit 50%" for Bangor, Birmingham City, Harper Adams, Sunderland, York St John (it doesn't say 50% of what) | Shown as "50% of tuition fee". Please confirm. |
| A2 | Ulster has two sheet rows. London/Birmingham/Manchester says "PCI deposit £6,500"; Northern Ireland says "CAS deposit £4,000" | The site profile covers London/Birmingham/Manchester, so only the £6,500 PCI deposit was added, with a note. The Northern Ireland row is not on the site. |
| A3 | Wales Trinity Saint David has two sheet rows (Birmingham, Swansea), both "50% of total fees"; Swansea adds "DBA: full fee payment" | One entry added, with the DBA note. |
| A4 | Chester: sheet says "Deposit £1,500 + CAS deposit £3,500 (= £5,000 for CAS); £3,000+ / remaining tuition at enrolment" | Both amounts added; the £5,000 total and the enrolment note are in the CAS line's note. |
| A5 | Roehampton: £10,500 for UG & Adult Nursing, £8,500 for PG | Two rows. |
| A6 | Existing Abertay deposit shows only "PCI deposit £500"; the sheet also says "CAS deposit 50%" | Left as is (add-only). Can be updated if you want. |
| A7 | The sheet marks some values "verify" (for example Birmingham City and West London gap dates, Chester PTE score) | Not touched; the existing site values stay. |
| A8 | Percentage deposits show as text, not a pound amount, because the fee varies by course | By design. |

## 4. How to re-run
`node scripts/fill-uk-deposits.mjs --dry` previews; it skips any profile that already has deposits, so it is safe to run again.
