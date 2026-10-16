# UK Universities — January 2027 Intake Import: Full Report

Prepared 2026-10-13. Branch: `feature/university-knowledge-base-stage` (synced to `origin/stage`). **Status: committed on this branch (3 commits), not pushed to `stage` yet.**

Source: `Copy of UK-January-2027.xlsx` (client partner sheet, last updated 12 Oct 2026). Client instruction (WhatsApp, 13 Oct 2026): update only the universities with a **January 2027 intake**, and the sheet's **Course Finder** tab would help the team if it were on the website.

## Files in this folder

| File | What it is |
|---|---|
| `UK-JAN-2027-REPORT.md` | This report |
| `UK-JAN-2027-DATA.csv` | All the data in one table, 905 rows. Filter the **Record type** column (see below) |

**`UK-JAN-2027-DATA.csv` record types**

| Record type | Rows | What each row is |
|---|---|---|
| `SHEET_ROW` | 75 | Each of the 75 sheet rows, and what we did with it |
| `COLLEGE_ADDED` | 17 | One row per college added |
| `COLLEGE_NOT_ADDED` | 13 | Each skipped college, why, and what is needed to add it |
| `COURSE` | 772 | Each course added (the course name is in the Notes column) |
| `ISSUE` | 28 | Each conflict, decision, data gap, sheet inconsistency and assumption (filter Status / action: Resolved, Decision, Data gap, Sheet inconsistency, Assumption, Info, Not imported, Data cleanup) |

Cells that don't apply to a record type are blank. Per-college detail (full English score breakdowns, entry requirements, application steps) is in this report only.

## 1. Scope rules we agreed

1. **Add only.** New colleges become new profiles. Existing profiles are not replaced or updated.
2. **January 2027 intake only.** The Nov 2026 tab is out of scope.
3. **Skip "Info pending" and "Closed" colleges** (no data / not accepting applications).
4. **Pathway colleges get their own profiles.** (The 3 pathway colleges of universities already on the site were skipped at first, then added in a second pass — see section 4b.)
5. **The Course Finder is a search feature on the existing explore pages, not a new page.**
6. **Work locally first**, push to `stage` only after review.

## 2. Where all 75 sheet rows ended up

Sheet header: Open 59 · Info pending 14 · Closed 2 · Total 75. The actual rows show **59 Open, 13 Info pending, 3 Closed** (Coventry is "Closed" and also "info pending", so the header counts it as pending).

| What we did | Rows |
|---|---|
| ADDED | 17 |
| ALREADY ON SITE – not changed | 43 |
| ALREADY ON SITE – January 2027 intake REMOVED (closed in sheet) | 2 |
| SKIPPED – no data in sheet (Info pending) | 13 |

Row-by-row detail: the `SHEET_ROW` records in `UK-JAN-2027-DATA.csv`.

## 3. The 17 colleges added

772 courses in total. Pages are at `/explore-universities/uk/<slug>`.

| College | Route | Cities | Courses (F / UG / PG) | Card fee | Logo |
|---|---|---|---|---|---|
| Abertay University | Direct | Dundee | 18 (0 / 0 / 18) | £18,950–£19,950 | real |
| Anglia Ruskin University (ARU) | Pathway | Cambridge, Chelmsford | 103 (78 / 0 / 25) | £9,100–£16,200 | real |
| Aston University – OnCampus (UG pathway) | Pathway | Birmingham | 12 (12 / 0 / 0) | £13,460–£17,000 | real |
| Bangor University International College (BUIC) | Pathway | Bangor | 48 (39 / 0 / 9) | £11,755–£17,845 | real |
| Bangor University | Direct | Bangor | 42 (0 / 5 / 37) | £19,000–£20,500 | real |
| BPP University | Direct | London | 10 (0 / 0 / 10) | £10,000 | real |
| Canterbury Christ Church University (CCCU) | Direct | Canterbury | 4 (0 / 0 / 4) | £17,000 | real |
| Edinburgh Napier University International College (ENUIC) | Pathway | Edinburgh | 54 (30 / 13 / 11) | £9,445–£16,475 | PLACEHOLDER |
| London South Bank University (LSBU) | Pathway | London | 46 (46 / 0 / 0) | £12,400 | real |
| University of Bradford International College | Pathway | Bradford | 88 (55 / 1 / 32) | £9,025–£15,955 | real |
| University of Dundee – International College of Dundee (ICD) | Pathway | Dundee, Kirkcaldy | 87 (62 / 4 / 21) | £11,195–£20,195 | PLACEHOLDER |
| University of Greenwich International College | Pathway | London | 47 (39 / 0 / 8) | £10,390–£17,715 | real |
| University of Huddersfield | Direct | London | 8 (0 / 0 / 8) | £18,700 | real |
| University of Hull – OnCampus (UG pathway) | Pathway | Hull | 18 (18 / 0 / 0) | £11,450 | real |
| University of Kent International College | Pathway | Canterbury | 67 (57 / 0 / 10) | £10,395–£18,595 | PLACEHOLDER |
| University of Portsmouth – International College Portsmouth (ICP) | Pathway | Portsmouth | 106 (86 / 0 / 20) | £9,400–£16,500 | real |
| University of the West of England (UWE Bristol) | Direct | Bristol | 14 (0 / 1 / 13) | £17,000–£18,000 | real |

F = Foundation-level (pathway entry: Foundation / Year Zero / Year One / Stage 1), UG = Undergraduate (direct or Stage 2 / Year Two), PG = Postgraduate (direct or Pre-Master's route).

### Abertay University

- **Slug / URL:** `abertay-university` — `/explore-universities/uk/abertay-university`
- **Cities:** Dundee  ·  **Website:** https://www.abertay.ac.uk  ·  **Logo:** `/images/universities/imported/abertay-university.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Abertay University in Dundee, Scotland offers postgraduate programmes with direct entry for the January 2027 intake, including a Global MBA and MSc courses in business, engineering and environmental subjects.
- **Courses:** 18 (postgraduate 18). Top subjects: Business & Management 6, Health & Medicine 3, Engineering 3, Finance & Economics 2, Science 2, Marketing 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Tuition fee | £19,950 | total |  | 1 |
| Tuition fee | £18,950 | total |  | 17 |

**Highlights shown on site:**
- Course duration: 1 year
- CAS deposit: 50% of tuition

**Scholarships:** 
- Postgraduate scholarship: **£5,000** — Net fee after scholarship: Global MBA £14,950; MSc £13,950

**Deposits:** PCI deposit £500

**English requirements (headline):** {"ielts":6,"pte":59,"duolingo":105}

- *Postgraduate:* IELTS 6.0 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 105 overall (95 in each component) — Waiver/MOI: MOI accepted from Tribhuvan, Pokhara, Purbanchal and Kathmandu universities; UK degree (within a 5-year gap)

**Entry requirements:**
- *Postgraduate:* 2.6 GPA or 60% (4-year degree)

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Deadlines: not yet announced.
- Duration '1 year' is stated in the sheet (the only direct college where it is).

---

### Anglia Ruskin University (ARU)

- **Slug / URL:** `anglia-ruskin-university` — `/explore-universities/uk/anglia-ruskin-university`
- **Cities:** Cambridge, Chelmsford  ·  **Website:** https://www.aru.ac.uk  ·  **Logo:** `/images/universities/imported/anglia-ruskin-university.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Anglia Ruskin University offers pathway routes for the January 2027 intake: Foundation and International Year One into ARU degrees, plus a Pre-Master's leading to MSc, MBA, MA and LLM programmes.
- **Courses:** 103 (foundation 78, postgraduate 25). Top subjects: Business & Management 21, Law 16, Engineering 11, Science 8, Finance & Economics 7, Data Science 7.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Foundation year | £16,000 | year | £13,000 after £3,000 scholarship | 39 |
| International Year One | £16,200 | year | £14,000 after £2,200 scholarship (business courses) | 39 |
| Pre-Master's (1 semester) | £9,100 | total | Then Master's year £17,500–£21,200 | 22 |
| Pre-Master's (1 semester) | £9,100 | total | Then Master's year £21,200 | 3 |

**Highlights shown on site:**
- Campus (Cambridge or Chelmsford) is not stated on the partner flyer — confirm with your counsellor

**Scholarships:** 
- Foundation scholarship: **£3,000** — All foundation courses; plus a £1,000 progression scholarship
- International Year One scholarship: **£2,200** — Stated for business courses — check for other courses; plus a £1,000 progression scholarship

**Deposits:** none as a fixed amount

**English requirements (headline):** {"ielts":5.5,"pte":59,"duolingo":100}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 100 overall (100 in each component) — Waiver/MOI: Grade B / 55% in Grade 12 English, followed by an ELPT test
- *Postgraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 100 overall (100 in each component)

**Entry requirements:**
- *Undergraduate:* Foundation: 50% or 2.0 GPA; International Year One: 2.4 GPA — Gap: Up to 3 years
- *Postgraduate:* Bachelor's degree pass (4-year degree only) — Gap: Up to 4–5 years

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Campus not stated on the flyer.
- IY1 scholarship stated for business courses only; PG scholarship not stated.
- PG English scores were filled from the UG flyers (sheet note).
- Flyer typo 'MSc Band Management' published as 'MSc Brand Management'.
- Foundation and IY1 share one course list, so each of the 39 degrees appears twice (one per route).

---

### Aston University – OnCampus (UG pathway)

- **Slug / URL:** `aston-university-oncampus` — `/explore-universities/uk/aston-university-oncampus`
- **Cities:** Birmingham  ·  **Website:** not set  ·  **Logo:** `/images/universities/imported/aston-university-oncampus.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Aston OnCampus is a pathway route into Aston University for the January 2027 intake: International Year One (with integrated CAS) into undergraduate degrees in business, computing, law and engineering. Direct-entry Aston University postgraduate courses are a separate profile.
- **Courses:** 12 (foundation 12). Top subjects: Engineering 4, Computer Science 3, Business & Management 2, Finance & Economics 1, Marketing 1, Law 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| International Year One | £13,460 | year | After £6,500 scholarship + £450 registration (total £13,910) | 4 |
| International Year One | £17,000 | year | After £6,500 scholarship + £450 registration (total £17,450) | 2 |
| (none — 'Ask a counsellor') | — | — | Fee not stated in sheet | 6 |

**Highlights shown on site:**
- After International Year One: Year 2 £18,000–£19,000 (after £4,500 scholarship); Year 3 £22,500–£23,500 (Computer / Business)
- Optional placement year after Year 2 — students can earn up to £20,000
- No pre-CAS interview
- Triple Crown university; 5 years of career support after graduation
- Fees for the engineering and law courses are not stated in the sheet — ask a counsellor

**Scholarships:** 
- International Year One scholarship: **£6,500**
- Year 2 scholarship: **£4,500**

**Deposits:** none as a fixed amount

**English requirements (headline):** {"ielts":5.5,"pte":59,"duolingo":100}

- *Undergraduate:* IELTS 5.5; PTE 59; Duolingo 100 — Waiver/MOI: Nepal: overall B in Class 12; Indian boards: 70 in English

**Entry requirements:**
- *Undergraduate:* International Year One: 2.4 GPA (2.2–2.3 may be considered with case approval and full fees); 4-year degree: 2.0 GPA; Accounting & Finance, Computer Science and Cybersecurity: maths C/4 in Year 12 or 60% in Year 11 — Gap: Up to 3 years (2023 pass-outs onwards)

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Only two IY1 fees are given ('Business' £13,460, 'Computer' £17,000). Law and the 5 engineering courses show 'Ask a counsellor'.
- Fees are quoted 'after scholarship + £450 registration'; the totals (£13,910 / £17,450) are in the fee note.
- Deposit not stated.
- Triple Crown / career-support claims are the client's wording.
- Direct-entry Aston University (PG) is a separate, existing profile. Not on the shared process map, so the standard 7-step flow is used.

---

### Bangor University International College (BUIC)

- **Slug / URL:** `bangor-university-international-college` — `/explore-universities/uk/bangor-university-international-college`
- **Cities:** Bangor  ·  **Website:** not set  ·  **Logo:** `/images/universities/imported/bangor-university-international-college.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Bangor University International College is a pathway route into Bangor University for the January 2027 intake: International Year Zero or Year One into undergraduate degrees, and a two-term Pre-Master's into MBA, MA and MSc programmes.
- **Courses:** 48 (foundation 39, postgraduate 9). Top subjects: Finance & Economics 9, Computer Science 8, Business & Management 8, Psychology 8, Marketing 3, Law 3.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Pathway year | £17,845 | year | £12,845 after £5,000 pathway scholarship | 39 |
| Pre-Master's – Term 1 entry | from £11,755 | total | Term 2 entry £15,195 | 9 |

**Highlights shown on site:**
- University years after the pathway: UG £18,000–£21,000 per year; PG £19,000–£20,500
- Standard application process shared with the other international colleges (see the How to Apply tab)

**Scholarships:** 
- Pathway scholarship: **£5,000** — Undergraduate pathway year
- Pre-Master's scholarship: **Up to £6,000** — £5,500 (Term 1 entry); £6,000 (Term 2 entry)
- Progression scholarship: **£4,000 per year** — University years. The maximum total is being confirmed — ask your counsellor

**Deposits:** none as a fixed amount

**English requirements (headline):** {"ielts":5.5,"pte":43,"duolingo":100}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 43 overall (43 in each component); Duolingo 100 overall (100 in each component) — Waiver/MOI: English waiver available (subject to eligibility)
- *Postgraduate:* IELTS (Term 1) 6.0 overall (5.5 in each component); PTE (Term 1) 56 overall (51 in each component); IELTS (Term 2) 5.5 overall (5.5 in each component); PTE (Term 2) 43 overall (43 in each component) — Waiver/MOI: English waiver available (subject to eligibility)

**Entry requirements:**
- *Undergraduate:* Year Zero: Grade 12, 50% overall; Year One: Grade 12, 50–59% overall, or a 3-year diploma — Gap: Up to 5 years
- *Postgraduate:* Term 1: Bachelor's degree (minimum 3 years), 50%+; Term 2: Level 5 / HND equivalent — Gap: Up to 7 years

**Application process (10 steps):** 1. Application Submission → 2. Conditional Offer Letter → 3. Join student for Mock → 4. CAS Shield link received → 5. Unconditional offer letter received → 6. Final Interview (recorded through CAS Shield) → 7. Tuition fee payment → 8. CAS request → 9. CAS issued → 10. Visa Application

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Progression scholarship cap conflicts (£6,000 vs £2,000) — £2,000 not published.
- Computing IY1 programmes are 'new' (from an earlier message).
- Nov 2026 data exists separately (not imported).
- On the shared process map.

---

### Bangor University

- **Slug / URL:** `bangor-university` — `/explore-universities/uk/bangor-university`
- **Cities:** Bangor  ·  **Website:** https://www.bangor.ac.uk  ·  **Logo:** `/images/universities/imported/bangor-university.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Bangor University in Wales offers direct-entry undergraduate and postgraduate programmes for the January 2027 intake across business, computing, law, history and social sciences.
- **Courses:** 42 (undergraduate 5, postgraduate 37). Top subjects: Business & Management 10, Arts & Humanities 7, Finance & Economics 6, Data Science 5, Law 5, Computer Science 3.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Tuition fee | £19,000 | year |  | 5 |
| Tuition fee | £20,500 | total |  | 25 |
| Tuition fee | £19,000 | total |  | 12 |

**Highlights shown on site:**
- CAS deposit: 50% of tuition
- Net fee after scholarship: UG £12,500–£15,000; PG £14,500–£16,500

**Scholarships:** 
- Bangor scholarship: **Up to £6,000** — £4,000 for eligible students; £6,000 for GPA 3.00 / 75%+ (every year). UG and PG
- Early payment discount: **£500** — Full payment before enrolment

**Deposits:** none as a fixed amount

**English requirements (headline):** {"ielts":6,"pte":56,"duolingo":105}

- *Undergraduate:* IELTS 6.0 overall (5.5 in each component); PTE 56 overall (51 in each component) — Waiver/MOI: Grade B in Grade 12 English
- *Postgraduate:* IELTS 6.0 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 105 (100); Oxford ELLT Accepted — Waiver/MOI: Grade B in Grade 12 English

**Entry requirements:**
- *Undergraduate:* 2.6 GPA; 60% overall — Gap: Up to 5 years
- *Postgraduate:* 4-year degree: 50%; 3-year degree: 65% — Gap: Up to 5 years

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Deadlines: not yet announced.
- PG tuition depends on subject group (£20,500 or £19,000); each course gets its group's fee.

---

### BPP University

- **Slug / URL:** `bpp-university` — `/explore-universities/uk/bpp-university`
- **Cities:** London  ·  **Website:** https://www.bpp.com  ·  **Logo:** `/images/universities/uk/BPP-University.webp`
- **Intake:** January 2027 — note: "Onshore (UK-to-UK) students. The intake month isn't printed on the partner flyer — confirm with your counsellor."  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** BPP University offers postgraduate programmes for students already in the UK (UK-to-UK / onshore applicants), including MSc programmes in management, AI, accounting and healthcare leadership.
- **Courses:** 10 (postgraduate 10). Top subjects: Business & Management 4, Engineering 1, Finance & Economics 1, Data Science 1, Marketing 1, Health & Medicine 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| 12-month programme | £10,000 | total | 18-month with PDP £12,500 · Alumni £9,000 / £11,500 | 10 |

**Highlights shown on site:**
- For UK-to-UK (onshore) students only
- CAS issued within a day; financial and medical documents and the credibility interview are not required as standard
- No third Master's degree is accepted

**Scholarships:** none stated

**Deposits:** Initial deposit £3,000 (Balance paid in instalments)

**English requirements (headline):** {}

**Entry requirements:**
- *Postgraduate:* Level 6 to Level 7: simple progression, no extra documents; Level 7 to Level 7: progression form required; A third Master's is not accepted

**Application process (8 steps):** 1. Application Submission → 2. Pre-Conditional Offer Letter Issued → 3. Provisional Offer Letter Issued → 4. Tuition Fee Payment & CAS Request → 5. Final CAS Issued → 6. Visa Lodged → 7. Visa Received → 8. University Enrolment

**Required documents:** Passport; Degree certificate; Consolidated mark sheet / original degree (CMM / OD); Statement of purpose; CV; MOI; UK visa copy, BRP card, eVisa and share code; UK degree certificate and transcript; Previous UK Master's CAS letter; PSW eVisa; Experience letter (optional); Gap explanation (optional); Immigration history (visa copies, stamps, entry and exit) (optional)

**Flags from the sheet / our notes:**
- Intake month not printed on the flyer.
- UK-to-UK (onshore) students only.
- English requirement not stated.
- No scholarship.
- 18-month PDP versions exist; the card shows the 12-month fee with the PDP fee in its note.
- 'CMM / OD' kept as written in the sheet's checklist.

---

### Canterbury Christ Church University (CCCU)

- **Slug / URL:** `canterbury-christ-church-university` — `/explore-universities/uk/canterbury-christ-church-university`
- **Cities:** Canterbury  ·  **Website:** https://www.canterbury.ac.uk  ·  **Logo:** `/images/universities/imported/canterbury-christ-church-university.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Canterbury Christ Church University offers postgraduate programmes for the January 2027 intake, including an international MBA and MSc courses in business, global security and public health.
- **Courses:** 4 (postgraduate 4). Top subjects: Business & Management 2, Arts & Humanities 1, Health & Medicine 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Tuition fee | £17,000 | total |  | 4 |

**Highlights shown on site:**
- Net fee after scholarship: £15,500 (£14,500 with the early bird discount)

**Scholarships:** 
- Postgraduate scholarship: **£1,500**
- Early bird discount: **£1,000** — On paying a £10,000 tuition deposit

**Deposits:** CAS deposit £5,000

**English requirements (headline):** {"ielts":6,"pte":59}

- *Postgraduate:* IELTS 6.0 overall (5.5 in each component); PTE 59 overall (59 in each component)

**Entry requirements:**
- *Postgraduate:* 60% / 2.50 GPA in Bachelor's degree — Gap accepted

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Deadlines: not yet announced.
- Gap accepted, limit not stated.

---

### Edinburgh Napier University International College (ENUIC)

- **Slug / URL:** `edinburgh-napier-university-international-college` — `/explore-universities/uk/edinburgh-napier-university-international-college`
- **Cities:** Edinburgh  ·  **Website:** not set  ·  **Logo:** PLACEHOLDER (needs file)
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Edinburgh Napier University International College is a pathway route into Edinburgh Napier University for the January 2027 intake: International Foundation Year, Stage 1 or Stage 2 into undergraduate degrees, and a Pre-Master's into postgraduate programmes.
- **Courses:** 54 (foundation 30, undergraduate 13, postgraduate 11). Top subjects: Computer Science 15, Hospitality & Tourism 11, Health & Medicine 6, Business & Management 5, Finance & Economics 5, Engineering 4.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| (none — 'Ask a counsellor') | — | — | Fee not stated in sheet | 1 |
| Pathway – Stage 1 | from £15,785 | year | £15,785–£17,955 depending on course | 29 |
| Pathway – Stage 2 | from £16,475 | year | £16,475–£16,875 depending on course | 13 |
| Pre-Master's – Term 1 entry | from £9,445 | total | £9,445–£10,075 depending on course; Term 2 entry £12,385–£12,670 | 11 |

**Highlights shown on site:**
- University years after the pathway: £17,520–£21,430 per year (UG and PG)
- Standard application process shared with the other international colleges (see the How to Apply tab)

**Scholarships:** 
- Undergraduate pathway scholarship: **£4,500** — Stage 1 and Stage 2
- Pre-Master's scholarship: **Up to £6,000** — £5,500 (Term 1 entry); £6,000 (Term 2 entry)

**Deposits:** CAS deposit £4,000 (Full fees payable after the visa is granted)

**English requirements (headline):** {"ielts":5.5}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component)
- *Postgraduate:* IELTS (Term 1) 6.0 overall (no band below 5.5); IELTS (Term 2) 5.5 overall (no band below 5.5)

**Entry requirements:**
- *Undergraduate:* Stage 1: Grade 12, 50% or 2.0 GPA overall; Stage 2: Grade 12, 55% or 2.2 GPA overall — Gap: Up to 3 years
- *Postgraduate:* Term 1 and Term 2: pass in Bachelor's degree (minimum 3 years) — Gap: Up to 5 years

**Application process (10 steps):** 1. Application Submission → 2. Conditional Offer Letter → 3. Join student for Mock → 4. CAS Shield link received → 5. Unconditional offer letter received → 6. Final Interview (recorded through CAS Shield) → 7. Tuition fee payment → 8. CAS request → 9. CAS issued → 10. Visa Application

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Nov 2026 data exists separately (not imported).
- 'Stage 1 (also standalone)' wording ignored; Stage 1 courses listed once.
- Nursing International Foundation Year has no stated pathway fee.
- CAS deposit £4,000 is from the Nov 2026 info.
- On the shared process map.

---

### London South Bank University (LSBU)

- **Slug / URL:** `london-south-bank-university` — `/explore-universities/uk/london-south-bank-university`
- **Cities:** London  ·  **Website:** https://www.lsbu.ac.uk  ·  **Logo:** `/images/universities/imported/london-south-bank-university.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** London South Bank University offers the LSBU OnCampus pathway for the January 2027 intake: International Year One or the Undergraduate Foundation Programme into degrees in business, engineering, computing, health and design.
- **Courses:** 46 (foundation 46). Top subjects: Business & Management 8, Computer Science 8, Engineering 7, Finance & Economics 6, Marketing 6, Architecture & Construction 5.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| International Year One | £12,400 | year | After £5,500 scholarship + £450 registration | 31 |
| (none — 'Ask a counsellor') | — | — | Fee not stated in sheet | 15 |

**Highlights shown on site:**
- Placement year available — students can earn up to £20,000
- After International Year One: Year 2 £12,500 (after £5,000 scholarship); Year 3 £17,500

**Scholarships:** 
- International Year One scholarship: **£5,500**
- Year 2 scholarship: **£5,000**

**Deposits:** Deposit before CAS (60% of fee) £7,440

**English requirements (headline):** {"ielts":5.5,"pte":59,"duolingo":105}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 105 (no section below 105) — Waiver/MOI: CBSE: 65 in English; Other Indian boards: 70 in English

**Entry requirements:**
- *Undergraduate:* International Year One: 2.3 GPA; 4-year degree (Foundation route): 2.0 GPA; Maths is not required in Class 11/12 for Computer Science — Gap: Up to 3 years (2023 pass-outs onwards)

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Foundation Programme fee not stated (15 courses show 'Ask a counsellor').
- Fee wording kept as in the sheet ('£12,400 after £5,500 scholarship + £450 registration').
- Placement year available (earn up to £20,000).

---

### University of Bradford International College

- **Slug / URL:** `university-of-bradford-international-college` — `/explore-universities/uk/university-of-bradford-international-college`
- **Cities:** Bradford  ·  **Website:** not set  ·  **Logo:** `/images/universities/imported/university-of-bradford-international-college.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** University of Bradford International College is a pathway route into the University of Bradford for the January 2027 intake: International Foundation, Year Zero, Year One or Year Two into undergraduate degrees, and a Pre-Master's into postgraduate programmes.
- **Courses:** 88 (foundation 55, undergraduate 1, postgraduate 32). Top subjects: Health & Medicine 20, Engineering 13, Business & Management 10, Law 10, Computer Science 8, Finance & Economics 6.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Pathway year | from £15,955 | year | £15,955–£16,475 depending on course | 56 |
| Pre-Master's – Term 1 entry | from £9,025 | total | Term 2 entry £12,280 | 32 |

**Highlights shown on site:**
- University years after the pathway: UG £16,100–£16,890 per year; PG £15,700–£19,500
- Standard application process shared with the other international colleges (see the How to Apply tab)

**Scholarships:** 
- Undergraduate pathway scholarship: **£5,000** — Progression scholarship to be confirmed
- Pre-Master's scholarship: **Up to £6,000** — £5,500 (Term 1 entry); £6,000 (Term 2 entry)

**Deposits:** none as a fixed amount

**English requirements (headline):** {"ielts":5.5,"pte":59,"duolingo":100}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 100 overall (100 in each component)
- *Postgraduate:* IELTS (Term 1) 6.0 overall (5.5 in each component); PTE (Term 1) 62 overall (59 in each component); IELTS (Term 2) 5.5 overall (5.5 in each component); PTE (Term 2) 59 overall (59 in each component)

**Entry requirements:**
- *Undergraduate:* Year Zero: Grade 12, 50% or 2.0 GPA; Year One: Grade 12, 55% or 2.2 GPA — Gap: Up to 3 years
- *Postgraduate:* Term 1 and Term 2: pass in Bachelor's degree (minimum 3 years) — Gap: Up to 5 years

**Application process (10 steps):** 1. Application Submission → 2. Conditional Offer Letter → 3. Join student for Mock → 4. CAS Shield link received → 5. Unconditional offer letter received → 6. Final Interview (recorded through CAS Shield) → 7. Tuition fee payment → 8. CAS request → 9. CAS issued → 10. Visa Application

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Progression scholarship 'TBC'.
- Direct-entry University of Bradford (PG) is a separate, existing profile.
- On the shared process map.

---

### University of Dundee – International College of Dundee (ICD)

- **Slug / URL:** `university-of-dundee-international-college` — `/explore-universities/uk/university-of-dundee-international-college`
- **Cities:** Dundee, Kirkcaldy  ·  **Website:** not set  ·  **Logo:** PLACEHOLDER (needs file)
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** The International College of Dundee is a pathway route into the University of Dundee for the January 2027 intake: International Stage One or Stage Two into undergraduate degrees, and a Pre-Master's into postgraduate programmes. Nursing is also taught at Kirkcaldy.
- **Courses:** 87 (foundation 62, undergraduate 4, postgraduate 21). Top subjects: Science 22, Finance & Economics 16, Business & Management 14, Marketing 6, Computer Science 6, Health & Medicine 6.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Pathway – Stage One | from £18,995 | year | £18,995–£19,895 depending on course | 62 |
| Pathway – Stage Two | £20,195 | year |  | 4 |
| Pre-Master's – Term 1 entry | from £11,195 | total | Term 2 entry £15,195 | 21 |

**Highlights shown on site:**
- University years after the pathway: UG £23,150–£25,750 per year; PG £23,000
- Standard application process shared with the other international colleges (see the How to Apply tab)

**Scholarships:** 
- Undergraduate pathway scholarship: **£6,000**
- Pre-Master's scholarship: **Up to £6,000** — £5,500 (Term 1 entry); £6,000 (Term 2 entry)
- Progression scholarship: **£6,500 first year** — Plus £4,000 for each remaining year. UG and PG progressing to Dundee

**Deposits:** CAS deposit £4,000 (Full fees payable after the visa is granted)

**English requirements (headline):** {"ielts":5.5,"pte":59}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component) — Waiver/MOI: IELTS waiver if Grade 12 English is B or above
- *Postgraduate:* IELTS (Term 1) 6.0 overall (5.5 in each component); PTE (Term 1) 59 overall (59 in each component); IELTS (Term 2) 5.5 overall (5.5 in each component); PTE (Term 2) 59 overall (59 in each component) — Waiver/MOI: IELTS waiver if Grade 12 English is B or above

**Entry requirements:**
- *Undergraduate:* Stage One: Grade 12, 50%, with 2.0 GPA in each subject; Stage Two: Grade 12, 50% / 2.0 GPA overall — Gap: Up to 5 years
- *Postgraduate:* Term 1: Bachelor's degree (4 years or more), 45%; Term 2: Bachelor's degree (3 years), 60% — Gap: Up to 7 years (evidence and SOP required)

**Application process (10 steps):** 1. Application Submission → 2. Conditional Offer Letter → 3. Join student for Mock → 4. CAS Shield link received → 5. Unconditional offer letter received → 6. Final Interview (recorded through CAS Shield) → 7. Tuition fee payment → 8. CAS request → 9. CAS issued → 10. Visa Application

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Nursing is also taught at Kirkcaldy.
- CAS deposit £4,000 is from the Nov 2026 info.
- On the shared process map.

---

### University of Greenwich International College

- **Slug / URL:** `university-of-greenwich-international-college` — `/explore-universities/uk/university-of-greenwich-international-college`
- **Cities:** London  ·  **Website:** not set  ·  **Logo:** `/images/universities/imported/university-of-greenwich-international-college.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** University of Greenwich International College is a pathway route into the University of Greenwich for the January 2027 intake: International Year Zero or Year One into undergraduate degrees, and a Pre-Master's into postgraduate programmes.
- **Courses:** 47 (foundation 39, postgraduate 8). Top subjects: Business & Management 11, Computer Science 9, Health & Medicine 5, Marketing 4, Finance & Economics 3, Hospitality & Tourism 3.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Pathway – Year Zero | £16,995 | year |  | 36 |
| Pathway – Year One | £17,715 | year |  | 3 |
| Pre-Master's – Term 1 entry | from £10,390 | total | Term 2 entry £12,995 | 8 |

**Highlights shown on site:**
- University years after the pathway: UG £17,975 per year; PG £19,450

**Scholarships:** 
- Undergraduate pathway scholarship: **£4,500** — Plus a £3,500 progression scholarship
- Pre-Master's scholarship: **Up to £6,000** — £5,500 (Term 1 entry); £6,000 (Term 2 entry). Plus a £3,500 progression scholarship

**Deposits:** CAS deposit £4,000

**English requirements (headline):** {"ielts":5.5,"pte":51,"duolingo":95}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 51 overall (51 in each component); Duolingo 95 overall (95 in each component)
- *Postgraduate:* IELTS 5.5 overall (5.5 in each component); PTE 51 overall (51 in each component); Duolingo 95 overall (95 in each component)

**Entry requirements:**
- *Undergraduate:* Year Zero: 1.8 GPA in Year 11 and 12, 35% in Grade 12; Year One: 2.2 GPA in Year 11 and 12 — Gap: Up to 5 years
- *Postgraduate:* Term 1: Bachelor's degree, 50%+; Term 2: Bachelor's degree, 35%+ — Gap: Up to 5 years

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- PG pathway scholarship also shown as £4,500 in the portal.
- CAS deposit £4,000 is from the Nov 2026 info.
- Not on the shared process map, so the standard 7-step flow is used.
- Direct-entry University of Greenwich is 'Info pending' (not added).

---

### University of Huddersfield

- **Slug / URL:** `university-of-huddersfield` — `/explore-universities/uk/university-of-huddersfield`
- **Cities:** London  ·  **Website:** https://www.hud.ac.uk  ·  **Logo:** `/images/universities/imported/university-of-huddersfield.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** The University of Huddersfield offers postgraduate programmes at its London campus for the January 2027 intake, including MSc courses in management, international business, computing, accounting and finance, and fintech.
- **Courses:** 8 (postgraduate 8). Top subjects: Business & Management 4, Finance & Economics 2, Marketing 1, Computer Science 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Tuition fee | £18,700 | total |  | 8 |

**Highlights shown on site:**
- No interview
- Net fee after scholarship: £17,200

**Scholarships:** 
- Postgraduate scholarship: **£1,500**

**Deposits:** CAS deposit £4,260

**English requirements (headline):** {"ielts":6,"pte":59}

- *Postgraduate:* IELTS 6.0 overall (5.5 minimum); ELLT 6 overall (5 minimum); PTE 59 in all components — Waiver/MOI: Grade B in Grade 12 English (2022 pass-outs) with 2.8 GPA / 60% / B overall

**Entry requirements:**
- *Postgraduate:* 55%+ in a 3- or 4-year Bachelor's degree

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- London campus PG only; main-campus UG has Nov 2026 info only.
- No interview.

---

### University of Hull – OnCampus (UG pathway)

- **Slug / URL:** `university-of-hull-oncampus` — `/explore-universities/uk/university-of-hull-oncampus`
- **Cities:** Hull  ·  **Website:** not set  ·  **Logo:** `/images/universities/imported/university-of-hull-oncampus.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** Hull OnCampus is a pathway route into the University of Hull for the January 2027 intake: International Year One (with integrated CAS) into undergraduate degrees in business, economics, accounting and engineering. Direct-entry University of Hull postgraduate courses are a separate profile.
- **Courses:** 18 (foundation 18). Top subjects: Business & Management 10, Engineering 3, Marketing 2, Finance & Economics 2, Health & Medicine 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| International Year One | £11,450 | year | After £5,980 scholarship + £450 registration | 18 |

**Highlights shown on site:**
- After International Year One: Year 2 and Year 3 £16,945 (Arts) / £19,520 (Science); £2,000 Year 2 scholarship applies
- Placement year available for selected courses (for example BSc Biomedical Science)

**Scholarships:** 
- Year 1 scholarship: **£5,980** — Extra £1,000 if the full first-year fee is paid
- Year 2 scholarship: **£2,000**

**Deposits:** Deposit before CAS (60% of fee) £6,870 (Remaining fee paid after enrolment, before the 2nd semester)

**English requirements (headline):** {"ielts":5.5,"pte":59}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component) — Waiver/MOI: A Level General English: grade C; Indian boards: 70 in English

**Entry requirements:**
- *Undergraduate:* International Year One: 2.8 GPA; 4-year degree: 2.0 GPA — Gap: Up to 3 years (2023 pass-outs onwards)

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Year 2 and Year 3 fees differ for Arts (£16,945) and Science (£19,520) courses; shown in the highlights.
- Extra £1,000 scholarship if the full first-year fee is paid.
- Direct-entry University of Hull (PG) is a separate, existing profile. Standard 7-step flow used.

---

### University of Kent International College

- **Slug / URL:** `university-of-kent-international-college` — `/explore-universities/uk/university-of-kent-international-college`
- **Cities:** Canterbury  ·  **Website:** not set  ·  **Logo:** PLACEHOLDER (needs file)
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** University of Kent International College is a pathway route into the University of Kent for the January 2027 intake: International Foundation, Year Zero or Year One into undergraduate degrees, and a Pre-Master's into postgraduate programmes.
- **Courses:** 67 (foundation 57, postgraduate 10). Top subjects: Computer Science 16, Business & Management 9, Creative & Media 8, Arts & Humanities 8, Finance & Economics 7, Law 5.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Pathway year | £18,595 | year |  | 57 |
| Pre-Master's – Term 1 entry | from £10,395 | total | Term 2 entry £12,995 | 10 |

**Highlights shown on site:**
- University years after the pathway: £20,700–£24,700 per year
- Standard application process shared with the other international colleges (see the How to Apply tab)

**Scholarships:** 
- Undergraduate pathway scholarship: **£6,000**
- Pre-Master's scholarship: **Up to £6,000** — £5,500 (Term 1 entry); £6,000 (Term 2 entry)

**Deposits:** CAS deposit £5,500 (Full fees payable after the visa is granted)

**English requirements (headline):** {"ielts":5.5,"pte":59,"duolingo":100}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 100 overall (95 in each component)
- *Postgraduate:* IELTS (Term 1) 6.0 overall (5.5 in each component); PTE (Term 1) 63 overall (59 in each component); Duolingo (Term 1) 110 overall (110 in each component); IELTS (Term 2) 5.5 overall (5.5 in each component); PTE (Term 2) 59 overall (59 in each component)

**Entry requirements:**
- *Undergraduate:* Year Zero: 1.8 GPA in Grade 12 (Nepal Education Board); Year One: Grade 12 pass with 60% in best 4 subjects — Gap: Up to 3 years
- *Postgraduate:* Term 1: Bachelor's degree pass (minimum 4 years); Term 2: Bachelor's degree pass (minimum 3 years) — Gap: Up to 5 years

**Application process (10 steps):** 1. Application Submission → 2. Conditional Offer Letter → 3. Join student for Mock → 4. CAS Shield link received → 5. Unconditional offer letter received → 6. Final Interview (recorded through CAS Shield) → 7. Tuition fee payment → 8. CAS request → 9. CAS issued → 10. Visa Application

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- One pathway fee (£18,595) for Year Zero and Year One, applied to Foundation as well.
- On the shared process map.

---

### University of Portsmouth – International College Portsmouth (ICP)

- **Slug / URL:** `university-of-portsmouth-international-college-portsmouth` — `/explore-universities/uk/university-of-portsmouth-international-college-portsmouth`
- **Cities:** Portsmouth  ·  **Website:** not set  ·  **Logo:** `/images/universities/imported/university-of-portsmouth-international-college-portsmouth.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** International College Portsmouth is a pathway route into the University of Portsmouth for the January 2027 intake: Foundation or International Year One into undergraduate degrees, and a Pre-Master's into postgraduate programmes. Direct-entry University of Portsmouth courses are a separate profile.
- **Courses:** 106 (foundation 86, postgraduate 20). Top subjects: Business & Management 15, General 13, Science 13, Arts & Humanities 13, Computer Science 8, Health & Medicine 7.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Foundation year | from £9,400 | year | £9,400–£17,700 depending on course | 74 |
| International Year One | from £16,500 | year | £16,500–£18,200 depending on course | 12 |
| (none — 'Ask a counsellor') | — | — | Fee not stated in sheet | 20 |

**Highlights shown on site:**
- Portsmouth is about 1 hr 30 min by train from London
- Pre-Master's fees are available on request; Pre-Master's can be paid in 6 instalments each year
- Free PVT English test available; a free Duolingo code for deserving students

**Scholarships:** 
- Foundation scholarship: **£3,000**
- Pre-Master's progression scholarship: **£2,500** — One-time, after progressing to the University

**Deposits:** none as a fixed amount

**English requirements (headline):** {"ielts":5.5,"pte":59,"duolingo":100}

- *Undergraduate:* IELTS 5.5 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 100 overall (95 in each component)
- *Postgraduate:* IELTS 6.0 overall (5.5 in each component); PTE 62 overall (59 in each component); Duolingo 100 overall (95 in each component)

**Entry requirements:**
- *Undergraduate:* Foundation: 2.0 GPA; International Year One (Business, Accounting & Law): 2.4 GPA, or CTEVT Diploma 50% (CTEVT 65%); International Year One (Science, Engineering & Computing): 2.6 GPA, or CTEVT Diploma 65% — Gap: Up to 5–10 years (case by case)
- *Postgraduate:* 3-year Bachelor's degree: 50%; 4-year Bachelor's degree: pass — Gap: Up to 5–10 years (case by case)

**Application process (7 steps):** 1. Application initiated → 2. Application submitted → 3. Conditional offer received → 4. Unconditional offer received → 5. Deposit paid → 6. CAS issued → 7. Visa applied

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Pre-Master's fee is 'available on request', so those courses show 'Ask a counsellor'; IY1 scholarship not stated.
- Foundation £9,400–£17,700 and IY1 £16,500–£18,200 depend on the course, so cards show 'from' prices.
- The sheet's 'also …' lines are split into separate courses (106 here vs 91 rows in the Course Finder tab).
- Gap rule 'up to 5–10 years (case by case, new changes)' published as 'case by case'.
- Direct-entry University of Portsmouth is a separate, existing profile. Standard 7-step flow used.

---

### University of the West of England (UWE Bristol)

- **Slug / URL:** `university-of-the-west-of-england` — `/explore-universities/uk/university-of-the-west-of-england`
- **Cities:** Bristol  ·  **Website:** https://www.uwe.ac.uk  ·  **Logo:** `/images/universities/imported/university-of-the-west-of-england.png`
- **Intake:** January 2027  ·  **Last verified:** 2026-10-12
- **Overview shown on site:** UWE Bristol offers a direct-entry undergraduate business degree and postgraduate programmes in business, law, engineering, computing and data science for the January 2027 intake.
- **Courses:** 14 (undergraduate 1, postgraduate 13). Top subjects: Business & Management 4, Law 2, Architecture & Construction 2, Computer Science 2, Data Science 2, Science 1.

**Tuition shown on course cards**

| Fee label | Amount | Per | Note | Courses |
|---|---|---|---|---|
| Tuition fee | £17,000 | year |  | 1 |
| Tuition fee | £17,000 | total |  | 4 |
| Tuition fee | £17,250 | total |  | 1 |
| Tuition fee | £17,500 | total |  | 4 |
| Tuition fee | £18,000 | total |  | 4 |

**Highlights shown on site:**
- Internal English test available
- Net fee after scholarship: UG £14,500; PG £14,500–£15,500

**Scholarships:** 
- UWE scholarship: **£2,500** — Apply by email

**Deposits:** CAS deposit £8,500

**English requirements (headline):** {"ielts":6,"pte":59,"duolingo":105}

- *Undergraduate:* IELTS 6.0 overall (5.5 in each component); PTE 59 overall (59 in each component); Duolingo 105 overall (100 in each component) — Waiver/MOI: CBSE / ICSE: 70% in English
- *Postgraduate:* IELTS 6.5 overall (5.5 in each component); PTE 62 overall (59 in each component); Duolingo 120 overall (105 in each component) — Waiver/MOI: MOI accepted from Tribhuvan University (within a 5-year gap, 2022 onwards)

**Entry requirements:**
- *Undergraduate:* 2.6 GPA or 60% in Grade 12 — Gap: 3 years
- *Postgraduate:* 55% in a 3- or 4-year Bachelor's degree — Gap: Up to 10 years

**Application process (12 steps):** 1. Application via portal → 2. Conditional Offer Letter → 3. Conditional documents submitted in portal → 4. Unconditional Offer Letter → 5. Apply for the scholarship through mail → 6. Interview recorded through CAS Shield → 7. Payment → 8. Submit CAS documents in CAS Shield → 9. CAS Letter → 10. Visa applied → 11. Visa received → 12. Enrolment

**Required documents:** All academic documents; CV; Letters of recommendation (LOR); Passport; Statement of purpose; English language certificate (optional); Medium of instruction (MOI) letter (optional)

**Flags from the sheet / our notes:**
- Scholarship by email application.
- Internal English test available.
- Has its own process map (12 steps).

---

## 4. Colleges NOT added

### 4a. "Info pending" — no data in the sheet (13)

The Jan 2027 row is empty for each: 0 courses, no fees, no requirements, and no rows in the Course Finder tab.

| College | Campus | Level & intake | Route | Sheet note |
|---|---|---|---|---|
| De Montfort University (DMU) | Leicester | Jan 2027 | Direct | Jan 2027 info pending |
| De Montfort University International College (DMUIC) | Leicester | Jan 2027 | Pathway | Jan 2027 info pending |
| Leeds Beckett University | Leeds | Jan 2027 | Direct | Jan 2027 info pending |
| Lincoln Bishop University (formerly BGU) | Lincoln | Jan 2027 | Direct | Jan 2027 info pending. Formerly Bishop Grosseteste University. On shared process map |
| Liverpool John Moores University (LJMU) | Liverpool | UG · Jan 2027 | Pathway (International Year One) | Jan 2027 info pending (only Nov 2026 IY1 info available – see Nov 2026 Intake tab) |
| Northeastern University London | London | Jan 2027 | Route not stated | Jan 2027 info pending |
| Teesside University | not stated | Jan 2027 | Direct | Jan 2027 info pending |
| University of Derby | Derby | Jan 2027 | Direct | Jan 2027 info pending |
| University of East Anglia (UEA) | Norwich | PG · Jan 2027 | Direct | Jan 2027 info pending |
| University of Exeter | Exeter | UG + PG · Jan 2027 | Route not stated | Jan 2027 info pending |
| University of Greenwich | London | UG · Jan 2027 | Direct | Jan 2027 info pending (original row duplicated the International College's Nov 2026 data) |
| University of Leicester | Leicester | PG · Jan 2027 | Direct | Jan 2027 info pending |
| University of Sussex | Brighton | UG + PG · Jan 2027 | Route not stated | Jan 2027 info pending |

**To add them:** the client must send Jan 2027 courses, fees, scholarships and requirements. Then add an entry in `scripts/excel-uk/universities.mjs` and re-run the importer.

### 4b. Pathway colleges of existing universities — added in a second pass (3)

These were skipped at first because their parent universities were already on the site. They are separate colleges with their own course lists, so they now have their own profiles (consistent with Bangor IC, ARU, ENUIC and the rest).

| Pathway college | Parent (already on site) | Courses added | Sheet rows (Course Finder) |
|---|---|---|---|
| Aston University – OnCampus (UG pathway) | Aston University | 12 | 12 |
| University of Hull – OnCampus (UG pathway) | University of Hull | 18 | 18 |
| University of Portsmouth – International College Portsmouth (ICP) | University of Portsmouth | 106 | 91 |

### 4c. Already on the site (45 sheet rows)

Not changed, except for the 2 "Closed" rows whose January 2027 intake was hidden (see 5b). Listed in the `SHEET_ROW` records of the data CSV with the matching site profile.

## 5. Conflict audit

### 5a. Conflicts between the new colleges and existing profiles — NONE

| Check | Result |
|---|---|
| Duplicate `country/slug` IDs across all 61 profiles | 0 |
| Duplicate college names across all profiles | 0 |
| Duplicate course slugs or names inside any new profile | 0 |
| Courses with more than one fee (card would show mixed fees) | 0 — fixed during the audit (see section 7) |
| Bad levels, durations (6–60 months), intakes or fee amounts | 0 |
| Stray `undefined` / `NaN` / `;` / "also" in names or data | 0 |
| Logo files referenced but missing from disk | 0 |
| Existing profile files modified | 0 (the two closed intakes are hidden by a code override, not by editing the files) |
| Generated static pages | 61 UK pages (44 existing + 17 new) |

Similar names (separate institutions, each has its own page): Bangor University ↔ Bangor University International College; Edinburgh Napier University ↔ its International College; University of Bradford ↔ its International College.

### 5b. Conflicts between EXISTING site profiles and the sheet — 2 found, FIXED

| College | Site said | Sheet says | What we did |
|---|---|---|---|
| Buckinghamshire New University | January 2027 intake | Jan 2027 **CLOSED** (portal sheet, 11 Oct 2026) | January 2027 hidden |
| University for the Creative Arts | January 2027 intake | Jan 2027 **CLOSED** (portal sheet, 11 Oct 2026) | January 2027 hidden |

**How it was fixed:** a small `CLOSED_INTAKES` list in `src/lib/university-kb/index.ts` removes the closed intake from those two profiles (and from each of their courses) when the site loads. The generated profile files are untouched, so re-running the Route2Uni importer cannot bring it back. **To reopen an intake, delete its entry in `CLOSED_INTAKES`.** On the site, both pages now show "Intake dates for this university are being confirmed", and their course cards show "Ask a counsellor" for intake. They no longer appear under the January intake filter.

Also: Coventry (Closed in the sheet) and Liverpool Hope (not in this sheet) have no intakes listed on the site at all — no conflict, but students see no intake for them. All 40 existing profiles the sheet marks Open already list January 2027 (checked against the corrected row-to-profile mapping).

### 5c. Inconsistencies inside the sheet itself

See the `ISSUE` records in `UK-JAN-2027-DATA.csv` (type "Sheet inconsistency"): BUIC progression scholarship cap, Greenwich IC PG scholarship, BPP intake month and campus, ARU campus and IY1 scholarship scope, Huddersfield UG (Nov only).

## 6. What changed in the code

### New files
| Path | Purpose |
|---|---|
| `scripts/extract-excel-uk.py` | Reads the .xlsx (stdlib only) -> `scripts/excel-raw/uk-jan2027.json` (git-ignored) |
| `scripts/import-excel-uk.mjs` | Generates the profile files |
| `scripts/excel-uk/parse-courses.mjs` | Parses the sheet's UG/PG course cells (handles headings, route prefixes, "also" variants, degree-prefix inheritance) and assigns subjects |
| `scripts/excel-uk/universities.mjs` | Hand-transcribed fees, scholarships, deposits, English scores, entry requirements for the 17 colleges |
| `src/lib/university-kb/universities/excel/` | 17 generated profiles + `index.ts` (kept apart from `imported/` so the Route2Uni importer, which rewrites that folder's index, can never drop them) |
| `public/images/universities/imported/*.png` (13 files) | Logos (see Logo sources) |
| `docs/uk-jan2027-import/` | This report and the data CSV |

### Modified files
| Path | Change |
|---|---|
| `src/lib/university-kb/index.ts` | Merges `excelProfiles` into `universityProfiles`; `UniversityCard.courseNames` replaced by `courses` (name, subject, level); new `CLOSED_INTAKES` override that hides closed intakes (BNU, UCA) |
| `src/components/university-kb/UniversityExplorer.tsx` | **Course search:** all typed words must match (e.g. "msc data"); level filter also applies to courses; each card lists the matching courses (first 3 + "+N more") |
| `src/components/university-kb/UniversityPanels.tsx` | Now displays `highlights`, deposit notes and intake notes (fields existed in the type but were never shown), and shows 'Ask a counsellor' when a course has no open intake. No existing profile uses the first three, so existing pages are unchanged |
| `.gitignore` | Ignores `scripts/excel-raw/*.json` |

### Logo sources

| College | Source | Note |
|---|---|---|
| Anglia Ruskin | ARU's own website (official SVG) | yellow on white (brand colour) |
| Bangor University, Canterbury Christ Church, UWE Bristol | Each university's own website (SVG, rendered to PNG) | |
| BPP University | Already on the site (`/images/universities/uk/BPP-University.webp`) | reused |
| Abertay, Huddersfield | Wikipedia infobox logos | Huddersfield includes its tagline |
| London South Bank | Wikimedia Commons | lsbu.ac.uk blocks automated requests |
| BUIC, Bradford IC, Greenwich IC, Aston OnCampus, Hull OnCampus, ICP | ApplyBoard school listings (third-party hosted) | The colleges' own marks (e.g. "International College", "ONCAMPUS"), but only about 200 px wide |
| **Edinburgh Napier IC, Dundee ICD, Kent IC** | **No college-specific logo found online** | Only the parent university's logo or crest exists (Edinburgh Napier's coat of arms, Dundee's shield, a "University of Kent" mark). Not used; **placeholder kept** |

Rules followed: no parent-university logo used as a substitute for a pathway college; each logo was viewed on a white card before saving; Huddersfield's website logo (white-on-white) was rejected. Six of the pathway colleges are run by Oxford International Education Group, whose own pages carry only the group logo. The ApplyBoard logos are third-party hosted and low resolution; replace them with files from the colleges if you have better ones. Logos are the colleges' trademarks, shown to identify partner universities.

### Not ours
`web-chayce-properties/` was already untracked before this work. `public/sitemap.xml` is rewritten by every build; it was restored each time.

## 7. Bugs found and fixed during the audit

1. **Mixed fees on course cards.** The card joins every fee item with " / " and shows only the first item's note, so pathway courses with 2–3 fee items would read like "£17,845 / £18,000". Fixed: one fee per course (cost to start), follow-on costs in the note or highlights.
2. **Hidden information.** `highlights`, deposit notes and intake notes were never rendered, so BPP's "UK-to-UK students only" and the university-year fees would have been invisible. Fixed in `UniversityPanels.tsx`.
3. **Subject misclassification** (a Marketing course tagged Engineering; Hospitality never matched; 4 courses "General"). Fixed in the subject rules.
4. **Logos:** Huddersfield's website logo was white-on-white (invisible) and was discarded. Two ApplyBoard logos had an opaque white background, so the standard trim missed them and the text rendered tiny; they were cropped to their content.
5. **Name matching:** an early row-to-profile matcher treated 'Winchester' as 'Chester'; fixed and every row re-checked.
6. **Wrong tab name:** a highlight pointed students to an 'Application Process' tab; the tab is called 'How to Apply'.

## 8. Verification performed

- `npx tsc --noEmit` — clean. `eslint` on the changed folders — clean.
- `npm run build` (static export) — passed every time it was run; all 17 new pages generated (61 UK pages in total).
- Course lists compared with the sheet's Course Finder tab: identical for every direct-entry college; pathway colleges differ only because that tab keeps raw unsplit lines.
- Every £ figure in each Fees cell appears in its profile (one deliberate omission: BUIC's £2,000).
- Every number in each Requirements cell appears in its profile.
- Dev server (`localhost:3001`): all new pages return 200; the logo files load.
- Second pass (Aston OnCampus, Hull OnCampus, ICP): course names compared with the Course Finder tab (Aston and Hull identical; ICP differs only by the split 'also' variants), every £ figure and requirement number present.
- BNU and UCA: built pages contain no 'January 2027'; the Intakes tab shows the 'being confirmed' message.
- **Not done:** I could not click through the course search in a browser — please try it.

## 9. How to reproduce / extend

```bash
python3 scripts/extract-excel-uk.py "<path to .xlsx>"   # sheet -> JSON
node scripts/import-excel-uk.mjs                         # JSON + config -> profiles
```
To add a college: add its entry to `scripts/excel-uk/universities.mjs` (match = exact name in the sheet's University column) and re-run. Drop a logo at `public/images/universities/imported/<slug>.png` and re-run to pick it up.

## 10. Status and what is still open

**Done in the second pass:** the 3 pathway colleges were added (17 colleges in total), and January 2027 was hidden for BNU and UCA.

**Still needs you / the client:**
1. Send logos for Edinburgh Napier IC, Dundee ICD and Kent IC (no college-specific logo exists online), and confirm you are happy with the Wikipedia / ApplyBoard-sourced logos for the others (see Logo sources).
2. Chase the client for the 13 "Info pending" colleges.
3. Show pathway degrees under "Undergraduate" as well as "Foundation"? (currently Foundation only, as with the existing profiles)
4. Verify the inferred durations, assumed fees, cities and website links (the `ISSUE` records of type "Assumption" in the data CSV).
5. Confirm the BUIC and Greenwich IC scholarship figures, BPP's intake month, the Aston Law/engineering fees and ICP's Pre-Master's fee.
6. Is the Nov 2026 tab out of scope?
7. Review everything locally (`http://localhost:3001/explore-universities`), then push to `stage`.
