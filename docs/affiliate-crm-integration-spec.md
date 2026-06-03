# Affiliate Attribution — CRM Integration Spec

**Status:** Draft for discussion with the CRM (lead-crm.zunkireelabs.com) team
**Owner (Admizz web):** Hardik / Daniel
**Owner (CRM):** _TBD_
**Last updated:** 2026-06-03

---

## TL;DR

The Admizz website now has a working affiliate program with click-tracking and conversion attribution **for forms that live on admizzeducation.com**. But four high-traffic forms are rendered via an iframe pointing at `dev-lead-crm.zunkireelabs.com`. Browser security rules mean the affiliate's cookie cannot reach inside that iframe — so when a student submits one of those forms, **the affiliate gets no credit**.

This document specifies a small contract between the two systems so that ref codes (and UTMs) survive the iframe boundary and get credited correctly.

---

## Affected forms (4)

| Admizz page | CRM endpoint / form |
|---|---|
| `/test-prep` | `dev-lead-crm.zunkireelabs.com/form/admizz` |
| `/register-v2` | same |
| `/register-preview` | same |
| `/campaign-uk` | same |

All four use the `<CRMFormEmbed>` React component (`src/components/ui/CRMFormEmbed.tsx`), which renders:

```html
<iframe src="https://dev-lead-crm.zunkireelabs.com/form/admizz?bg=F0ECF9" />
```

---

## Why this matters

- **Admizz web** captures affiliate clicks on every page via `?ref=CODE` and stores them in Supabase (`affiliate_clicks` table). This works for the iframe pages too — the click is captured the moment the student lands on `/test-prep?ref=HARDIK2026`.
- **But the conversion** (form submit) happens inside the iframe, which is on a different origin. The cookie `admizz_ref=HARDIK2026` set on `admizzeducation.com` is inaccessible to JavaScript running on `dev-lead-crm.zunkireelabs.com`.
- Result: the dashboard shows the affiliate "5 clicks · 0 registrations" even when those 5 clicks all converted. The affiliate sees no return on their effort and disengages.

---

## What the Admizz side will do (already in scope, low effort)

Update `CRMFormEmbed.tsx` to append the following query parameters to the iframe `src` whenever they are present on the parent page (read from cookie `admizz_ref` and the `?ref=` / `utm_*` query string of the parent URL):

```
ref_code      — string, the affiliate referral code (e.g. "HARDIK2026")
utm_source    — string, e.g. "instagram"
utm_medium    — string, e.g. "social"
utm_campaign  — string (rarely set today)
```

The final iframe URL would look like:

```
https://dev-lead-crm.zunkireelabs.com/form/admizz?bg=F0ECF9
  &ref_code=HARDIK2026
  &utm_source=instagram
  &utm_medium=social
```

All four params are **optional**. Forms loaded without them work exactly as today.

**Status on our side:** ready to ship as a 30-minute change. We're holding it until this contract is agreed so the data doesn't sit unused.

---

## What we need from the CRM team

### 1. Schema additions on the CRM lead record

Add four optional columns to the existing lead/contact table:

| Column | Type | Notes |
|---|---|---|
| `ref_code` | string (up to 50 chars), nullable | The affiliate referral code |
| `utm_source` | string (up to 100 chars), nullable | |
| `utm_medium` | string (up to 100 chars), nullable | |
| `utm_campaign` | string (up to 100 chars), nullable | Often null in practice |

All nullable. No constraints. No validation on the CRM side — Admizz will validate the code exists in our `affiliates` table before crediting.

### 2. Form behavior

When the form is loaded with `?ref_code=…&utm_source=…` etc. in the URL, the CRM form should:
- Read those query params on load
- Store them as hidden fields in the form
- Include them in the lead record on submit (in the four columns above)

If a form is loaded without those params (most direct traffic), all four fields remain null. No change to existing behavior.

### 3. Returning the data to Admizz — pick ONE integration

We need to see those new fields back on our side so we can credit affiliates and link conversions. Three options, in increasing order of integration depth:

#### Option A — Webhook (recommended for long term)
After a lead is created, the CRM POSTs to a public Admizz endpoint:

```
POST https://admizzeducation.com/api/affiliate/crm-conversion
Authorization: Bearer <shared-secret>
Content-Type: application/json

{
  "lead_id":      "crm-lead-uuid-or-id",
  "full_name":    "Rajesh Khanal",
  "email":        "rajesh@example.com",
  "phone":        "+977 9812345678",
  "form_slug":    "admizz",           // or "uk-education-expo-2026" etc
  "ref_code":     "HARDIK2026",
  "utm_source":   "instagram",
  "utm_medium":   "social",
  "utm_campaign": null,
  "submitted_at": "2026-06-03T07:29:42Z"
}
```

Admizz then writes to `register_leads` + `affiliate_referrals`, bumps the affiliate's tier.

**Pro:** real-time, no polling, clean separation of concerns.
**Con:** needs an HTTPS endpoint on our side + signature verification + retry handling on the CRM side.

#### Option B — Polling
We pull new leads from a CRM REST endpoint every 15 minutes:

```
GET https://dev-lead-crm.zunkireelabs.com/api/admizz/leads
  ?since=2026-06-03T07:00:00Z
  &form=admizz
Authorization: Bearer <api-key>
```

Returns an array of leads created since the cursor, including the four ref/utm fields.

**Pro:** simple, no public webhook needed.
**Con:** up to 15-minute lag. Needs a scheduled job on the Admizz side.

#### Option C — Shared Supabase (largest change)
CRM stops writing leads to its own DB and writes directly into our `register_leads` Supabase table. No sync needed.

**Pro:** single source of truth, real-time, no integration to maintain.
**Con:** biggest CRM architectural change. Probably not the right first step.

**Our recommendation:** Option B for v1 (fast to ship, get the data flowing). Migrate to Option A in v2 once both sides have load.

### 4. Test scenarios we want to cover together

| Scenario | Expected outcome |
|---|---|
| Student lands on `/test-prep?ref=HARDIK2026`, submits the iframe form | Admizz creates an `affiliate_referrals` row crediting HARDIK2026. `total_referrals` for HARDIK2026 increments. |
| Student lands on `/test-prep` directly (no ref), submits | No ref_code stored. No affiliate credit. Existing behavior. |
| Student visits `/study-in-uk?ref=HARDIK2026` first (cookie set), then later visits `/test-prep` without `?ref=` and submits | Admizz appends the cookie value to the iframe URL → CRM stores HARDIK2026 → conversion credits HARDIK2026. |
| Student visits with `?ref=NOTREAL`, submits | Admizz looks up "NOTREAL" → not found → no referral row created. Lead still saved to register_leads. No error to user. |
| Duplicate submit (student submits twice in 10 minutes) | One referral row per submission for now (acceptable for v1). De-dup logic added later if needed. |

---

## Schema reference (Admizz side)

For context — these are the tables on our side. CRM team does NOT need to touch these.

```sql
affiliates           -- the affiliate accounts (id, referral_code, total_referrals, tier, status)
affiliate_clicks     -- every ?ref= visit (code, landing_page, utm_*, created_at)
affiliate_referrals  -- a registration credited to an affiliate
                     -- (affiliate_id, lead_id, email, destination, stage, status, commission)
register_leads       -- the underlying student lead (full_name, email, phone, countries, source)
```

Linking column added in this scope: `affiliate_referrals.lead_id` → `register_leads.id`.

---

## Open questions for the CRM team

1. Do you already have a webhook system, or would Option B (polling) be easier as v1?
2. Is the API key shared per-form (one for `admizz`, one for `uk-education-expo`, etc) or per-tenant?
3. Are there any sensitive fields you'd like NOT to send via webhook (e.g. phone)?
4. Estimated effort on your side for the four schema columns + read query params logic?
5. Is there a staging CRM environment we should test against first?

---

## Out of scope (for this contract)

- Multi-touch attribution (last-click vs first-click). Admizz uses first-touch via 90-day cookie. CRM doesn't need to know.
- Commission calculation. Lives entirely on the Admizz side.
- Real-time dashboard updates. Polling option introduces minutes of lag; acceptable for v1.
- Anti-fraud (self-referrals, click-spam). Separate concern, handled on Admizz side.

---

## Decision log

| Question | Decision | Date |
|---|---|---|
| Integration option (A/B/C) | _TBD_ | |
| Webhook secret / API key rotation policy | _TBD_ | |
| Production CRM endpoint (move off dev-) | _TBD_ | |
| Test environment | _TBD_ | |
