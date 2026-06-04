# Affiliate × CRM Integration — Live State & Recovery Doc

> **Purpose:** Single source of truth for the in-flight affiliate-attribution work spanning
> the admizz website, admizz Supabase, and the lead-gen-crm (`dev-lead-crm.zunkireelabs.com`).
> If anything goes wrong, read this top-to-bottom and you can fully understand the state
> and recover any piece.
>
> **Last updated:** 2026-06-04 (end-to-end verified, all 9 steps + 3 bug-fixes complete)
> **Owner:** Daniel + Hardik
> **Read order:** Section 1 first (current state) → Section 1.a (bugs found) → Section 6 (rollback) if recovering.

---

## 1. Current state (what's done)

| # | Step | Status | Where |
|---|---|---|---|
| 1 | Affiliate detail page (admin drill-in becomes its own route) | ✅ DONE, deployed dev | admizz repo |
| 2 | `CRMFormEmbed` forwards `ref_code` + UTMs into iframe URL | ✅ DONE, deployed dev, verified | admizz repo |
| 3 | Supabase RPC `record_affiliate_conversion` created | ✅ DONE, in admizz Supabase | admizz Supabase |
| 4 | CRM Supabase: add `leads.ref_code` column + partial index | ✅ DONE 2026-06-04 | CRM Supabase |
| 5 | CRM `public-form.tsx`: read `?ref_code=` | ✅ DONE 2026-06-04 | CRM repo |
| 6 | CRM `/api/v1/leads` route: persist `ref_code`, call admizz RPC | ✅ DONE 2026-06-04 | CRM repo |
| 7 | New file `admizz-client.ts` in CRM | ✅ DONE 2026-06-04 | CRM repo |
| 8 | Add `ADMIZZ_*` env vars to CRM `.env.local` | ✅ DONE 2026-06-04 | CRM `.env.local` |
| 9 | End-to-end test (deploy CRM + form submission verification) | ✅ DONE 2026-06-04 | both |

**Confirmed via live testing on 2026-06-04:**
- `https://dev-web.admizzeducation.com/test-prep?ref=HARDIK2026` loads form correctly.
- DevTools console: `document.querySelector('iframe').src` returns `https://dev-lead-crm.zunkireelabs.com/form/admizz/test-prep?bg=F0ECF9&ref_code=HARDIK2026` ✓
- Admizz Supabase function created — SQL Editor result was "Success. No rows returned".
- React #418 errors on `/test-prep` confirmed pre-existing (also present on reverted version) — they originate from CRM iframe postMessage, unrelated to our work.
- **End-to-end success at 09:31 UTC**: form submitted at `?ref=HARDIK2026` →
  - CRM `leads` row created with `ref_code='HARDIK2026'` (leadId `72410ea2-5a57-404a-969b-c6e4b52f77f3`)
  - Admizz `register_leads` row created (id `05b6d539-d727-45c1-bf41-011b6a43f729`)
  - Admizz `affiliate_referrals` row created with `affiliate_code='HARDIK2026'`
  - Admizz `affiliates.total_referrals` incremented to `1` for HARDIK2026
  - CRM log: `"Admizz affiliate conversion recorded"` with `rpcData` populated

---

## 1.a Bugs found & fixed during end-to-end verification (2026-06-04)

These were **pre-existing** issues in the CRM and admizz DBs, surfaced only when our integration started writing through them. They're recorded here because if anyone restores from backups or rolls back, they should NOT undo these — they are independent fixes that benefit the system overall.

| # | Bug | Where | Fix applied | Why it matters |
|---|---|---|---|---|
| A | No `pipeline_stages.is_default = true` row for admizz tenant → form `/api/v1/leads` returned 422 "No matching pipeline stage" on every admizz submission, even before affiliate work | CRM Supabase | `UPDATE pipeline_stages SET is_default = TRUE WHERE id = (SELECT ps.id FROM pipeline_stages ps JOIN pipelines p ON ps.pipeline_id = p.id JOIN tenants t ON p.tenant_id = t.id WHERE t.slug='admizz' AND p.is_default=TRUE AND ps.slug='new-inquiry' LIMIT 1);` → `new-inquiry` ("New Lead") is now the default | Without this fix, NO admizz form submissions succeed |
| B | `register_leads.id` had no DEFAULT → RPC `record_affiliate_conversion` step 2 errored with `23502 null value in column "id" violates not-null` → transaction rolled back, neither `register_leads` nor `affiliate_referrals` got rows | Admizz Supabase | `ALTER TABLE register_leads ALTER COLUMN id SET DEFAULT gen_random_uuid();` | Without this fix, the RPC silently failed on every call |
| C | CRM route's RPC error swallowing: code used `await admizzAdminClient.rpc(...)` without destructuring `{data, error}` → log line said "recorded" even when the RPC errored | CRM repo `src/app/(main)/api/v1/leads/route.ts` | Both call sites now do `const { data: rpcData, error: rpcError } = await ...rpc(...)` and log `rpcError` separately. **Backups updated 2026-06-04 ~10:54** | Without this fix, future RPC failures would have been invisible in logs |

---

## 2. Key identifiers (memorize these)

### Admizz Supabase project
- **URL:** `https://ldsgsdjixzsljgkcktqu.supabase.co`
- **Project ID:** `ldsgsdjixzsljgkcktqu`
- **Org name in dashboard:** `hardik@zunkireelabs.com's Org`
- **Project name in dashboard:** `rku_leads` (misleading — this IS the admizz Supabase despite the name)

### CRM Supabase project
- **URL:** `https://pirhnklvtjjpuvbvibxf.supabase.co`
- **Project ID:** `pirhnklvtjjpuvbvibxf`

### Sites
- **Admizz web (dev):** `https://dev-web.admizzeducation.com`
- **CRM (dev):** `https://dev-lead-crm.zunkireelabs.com`
- **Admizz form widget URL pattern:** `https://dev-lead-crm.zunkireelabs.com/form/admizz/<formSlug>`

### Repos on this machine
- **Admizz web:** `/home/zunkireelabs/devprojects/websiteprojects/admizz-devs/admizz-edu-web-dev`
- **CRM:** `/home/zunkireelabs/devprojects/lead-gen-crm-dev`

### Affiliate test code
- `HARDIK2026` → affiliate "Hardik Phuel" — use for end-to-end testing

---

## 3. Files modified so far + backups

### Admizz repo — modified

| File | Purpose of change | Backup |
|---|---|---|
| `src/components/affiliate/admin/AffiliateDetail.tsx` | Extracted reusable detail view | `.bak` |
| `src/app/affiliate-admin/affiliate/page.tsx` | New route for full affiliate profile | `.bak` |
| `src/components/affiliate/admin/AffiliatesTab.tsx` | Row click → navigate to detail page (no inline expand) | `.bak` |
| `src/components/affiliate/admin/AdminShell.tsx` | Reads `?tab=` from URL to restore active tab on back | `.bak` |
| `src/components/ui/CRMFormEmbed.tsx` | Forwards `ref_code` + UTMs into iframe URL | `.bak` |

All `.bak` files are at the same path as the original, suffixed `.bak`.

### Admizz Supabase — added

```sql
-- Function: public.record_affiliate_conversion(
--   p_ref_code TEXT, p_full_name TEXT, p_email TEXT,
--   p_phone TEXT DEFAULT NULL, p_form_slug TEXT DEFAULT NULL,
--   p_countries TEXT DEFAULT NULL,
--   p_utm_source TEXT DEFAULT NULL, p_utm_medium TEXT DEFAULT NULL,
--   p_utm_campaign TEXT DEFAULT NULL, p_crm_lead_id TEXT DEFAULT NULL
-- ) RETURNS UUID
-- SECURITY DEFINER, search_path = public
-- GRANT EXECUTE TO service_role, anon, authenticated
```

Behavior:
1. Look up active affiliate by `UPPER(ref_code)`.
2. Insert into `register_leads` (`full_name`, `email`, `phone`, `countries`, `source`, `status='new'`).
3. If affiliate found: insert into `affiliate_referrals` (`stage='Consultation'`, `status='pending'`, `lead_id` linked, `email` set) + `UPDATE affiliates SET total_referrals = total_referrals + 1`.
4. Return new `register_leads.id`.

Saved query name in Supabase SQL Editor: **"Record CRM Lead and Affiliate Referral"**.

### CRM repo — not yet modified (planned)

| File | Planned change | Will back up to |
|---|---|---|
| `supabase/migrations/031_admizz_ref_code.sql` | ✅ APPLIED 2026-06-04 — `ALTER TABLE leads ADD COLUMN IF NOT EXISTS ref_code TEXT` + partial index `idx_leads_ref_code` (WHERE NOT NULL). Saved query name in CRM Supabase: "Add Reference Code Column and Index" | n/a (delete to remove file) |
| `src/components/form/public-form.tsx` | ✅ APPLIED 2026-06-04 — line 69 reads `?ref_code=` via useState lazy-init; lines 269 + 378 spread `ref_code` into savePartial + handleSubmit payloads | `.bak` at 09:28 |
| `src/app/(main)/api/v1/leads/route.ts` | ✅ APPLIED 2026-06-04 — line 314 persists `body.ref_code` to leadPayload; lines 379–397 (update path) + 456–474 (create path) call admizz RPC gated by `is_final && ref_code && tenant.slug==='admizz'`, wrapped in try/catch with logging | `.bak` at 09:33 |
| `src/lib/supabase/admizz-client.ts` | ✅ CREATED 2026-06-04 — Named export `admizzAdminClient`, uses `ADMIZZ_SUPABASE_URL` + `ADMIZZ_SUPABASE_SERVICE_ROLE_KEY`. Falls back to empty strings + console.warn if env vars missing. | n/a (delete to remove) |
| `.env.local` | ✅ APPLIED 2026-06-04 — Appended `ADMIZZ_SUPABASE_URL` + `ADMIZZ_SUPABASE_SERVICE_ROLE_KEY` (same values as existing `OLD_SUPABASE_*`). `OLD_*` keys preserved for `migrate-rku-leads.ts` script. | `.bak` at 09:43 |

---

## 4. Architecture summary

```
Student visits  https://dev-web.admizzeducation.com/test-prep?ref=HARDIK2026
       │
       │  (admizz site, Step 1 ✅)
       ├─ AffiliateRefCapture.tsx records click in admizz Supabase affiliate_clicks
       ├─ AffiliateRefCapture.tsx sets admizz_ref cookie (90d, first-touch)
       └─ CRMFormEmbed forwards ref_code into iframe src
              │
              ▼
       Iframe loads from CRM at /form/admizz/test-prep?ref_code=HARDIK2026
              │
              │  (CRM, Steps 5–8 NEXT)
              ├─ PublicForm reads ?ref_code= and ?utm_* from URL
              └─ User submits → POST /api/v1/leads
                     │
                     │  (CRM, Step 6 NEXT)
                     ├─ INSERT INTO leads (... ref_code) — primary save, source of truth
                     │
                     └─ IF tenant.slug==='admizz' AND lead.is_final AND lead.ref_code:
                            │
                            │  (cross-Supabase call, Step 6 NEXT)
                            └─ admizzAdminClient.rpc('record_affiliate_conversion', {...})
                                   │
                                   │  (admizz Supabase, Step 3 ✅ ready)
                                   ├─ INSERT INTO register_leads
                                   ├─ INSERT INTO affiliate_referrals
                                   └─ UPDATE affiliates SET total_referrals += 1
```

**Source-of-truth rule:** the CRM `leads` table is the primary lead store. Admizz Supabase is a secondary, attribution-only store. Admizz call failure NEVER blocks the CRM lead save (wrapped in try/catch).

---

## 5. Critical safety gates (do NOT remove)

The CRM call to admizz RPC must be gated by THREE conditions:

```ts
if (lead.is_final && lead.ref_code && tenant.slug === "admizz") {
  // call admizz RPC
}
```

Why each:
1. **`lead.is_final`** — `savePartial()` fires per step. Calling RPC on partials would multi-count.
2. **`lead.ref_code`** — direct (non-affiliate) traffic must not call the RPC.
3. **`tenant.slug === "admizz"`** — CRM is multi-tenant. RKU/other tenants must never reach admizz Supabase.

The admizz RPC call must be wrapped in try/catch **AND** destructure `{ data, error }` (supabase-js .rpc() does NOT throw on Postgres errors — it returns them in `error`):
```ts
try {
  const { data: rpcData, error: rpcError } = await admizzAdminClient.rpc(...);
  if (rpcError) {
    log.error({ rpcError, leadId, refCode }, "Admizz affiliate RPC returned error");
  } else {
    log.info({ leadId, refCode, rpcData }, "Admizz affiliate conversion recorded");
  }
} catch (err) {
  log.error({ err, leadId }, "Admizz affiliate RPC threw (lead still saved)");
  // DO NOT re-throw. DO NOT return error to client.
}
```

**Why both branches matter:** Bug C above is exactly what happens if you only do try/catch without checking `error`. The catch never fires for normal Postgres exceptions thrown by SECURITY DEFINER functions — they come back as `error` objects.

---

## 6. Rollback — how to revert each piece

### 6.1 Revert admizz repo (Steps 1 & 2)

Each `.bak` file can be restored with a single `mv`:

```bash
cd /home/zunkireelabs/devprojects/websiteprojects/admizz-devs/admizz-edu-web-dev
mv src/components/ui/CRMFormEmbed.tsx.bak                 src/components/ui/CRMFormEmbed.tsx
mv src/components/affiliate/admin/AffiliatesTab.tsx.bak   src/components/affiliate/admin/AffiliatesTab.tsx
mv src/components/affiliate/admin/AdminShell.tsx.bak      src/components/affiliate/admin/AdminShell.tsx
mv src/components/affiliate/admin/AffiliateDetail.tsx.bak src/components/affiliate/admin/AffiliateDetail.tsx
mv src/app/affiliate-admin/affiliate/page.tsx.bak         src/app/affiliate-admin/affiliate/page.tsx
./deploy.sh dev
```

If `AffiliateDetail.tsx` was a new file (which it is), also: `rm src/components/affiliate/admin/AffiliateDetail.tsx` (after restoring the others).
Same for `src/app/affiliate-admin/affiliate/page.tsx` (new route directory).

### 6.2 Revert admizz Supabase function (Step 3)

In Supabase SQL Editor:
```sql
DROP FUNCTION IF EXISTS public.record_affiliate_conversion(
  TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT
);
```

### 6.3 Revert CRM Supabase migration (Step 4 — when applied)

In CRM Supabase SQL Editor (project `pirhnklvtjjpuvbvibxf`):
```sql
DROP INDEX IF EXISTS idx_leads_ref_code;
ALTER TABLE leads DROP COLUMN IF EXISTS ref_code;
```

### 6.4 Revert CRM file changes (Steps 5, 6, 7 — when applied)

```bash
cd /home/zunkireelabs/devprojects/lead-gen-crm-dev
mv src/components/form/public-form.tsx.bak              src/components/form/public-form.tsx
mv "src/app/(main)/api/v1/leads/route.ts.bak"           "src/app/(main)/api/v1/leads/route.ts"
mv .env.local.bak                                        .env.local
rm src/lib/supabase/admizz-client.ts          # new file, no .bak
# Then rebuild + redeploy via the CRM's docker-compose
docker compose -f docker-compose.yml build && \
docker compose -f docker-compose.yml down && \
docker compose -f docker-compose.yml up -d
```

### 6.5 Full nuclear rollback (everything back to 2026-06-03 state)

Do 6.4 → 6.3 → 6.2 → 6.1 in that order (CRM first to stop calls into admizz, then admizz cleanup).

---

## 7. Verification commands

### Verify Step 2 (admizz iframe forwarding)
1. Incognito → `https://dev-web.admizzeducation.com/test-prep?ref=HARDIK2026`
2. DevTools console: `document.querySelector('iframe').src`
3. Expected: contains `&ref_code=HARDIK2026` ✓

### Verify Step 3 (admizz Supabase function)
In admizz Supabase SQL Editor:
```sql
SELECT proname, pronargs
FROM pg_proc
WHERE proname = 'record_affiliate_conversion';
-- Expected: 1 row, pronargs = 10
```

### Verify Step 4 (CRM column when added)
In CRM Supabase SQL Editor:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'leads' AND column_name = 'ref_code';
-- Expected: 1 row, text, YES
```

### Verify Step 5 (CRM form reads ref_code)
1. Load `https://dev-lead-crm.zunkireelabs.com/form/admizz/test-prep?ref_code=HARDIK2026`
2. DevTools → React DevTools → PublicForm component → check refCode state
3. Or after form submission, query CRM Supabase:
   ```sql
   SELECT id, email, ref_code FROM leads
   WHERE email = 'your-test-email@example.com'
   ORDER BY created_at DESC LIMIT 1;
   ```

### Verify end-to-end (Step 9)
1. Incognito → `https://dev-web.admizzeducation.com/test-prep?ref=HARDIK2026`
2. Submit form with unique test email (e.g. `e2e-test-<timestamp>@deleteme.test`)
3. Check CRM Supabase: `SELECT * FROM leads WHERE email = '<test email>'` → must have `ref_code = 'HARDIK2026'`
4. Check admizz Supabase: `SELECT * FROM register_leads WHERE email = '<test email>'` → must have 1 row
5. Check admizz Supabase: `SELECT * FROM affiliate_referrals WHERE email = '<test email>'` → must have 1 row, `affiliate_code = 'HARDIK2026'`
6. Open admizz admin → Affiliates tab → click HARDIK2026 → detail page should show the new referral

---

## 8. Known issues / non-blockers

### React #418 errors on `/test-prep` (and similar pages)
- **Status:** Pre-existing, not caused by our work.
- **Origin:** CRM iframe postMessage events parsed by React event system, format mismatch.
- **Impact:** DevTools console noise only. No user-facing impact. Form works normally.
- **Fix scope:** Out of scope for affiliate integration. Would require CRM iframe code change.

### `out/` size in admizz repo
- 200+ MB. Required (Docker build copies it). Do not add to `.dockerignore`.

### CRM Supabase `OLD_SUPABASE_*` env vars
- Currently used by `scripts/migrate-rku-leads.ts` (one-time migration script).
- Same Supabase project as `ADMIZZ_SUPABASE_*` will be (admizz / `ldsgsdjixzsljgkcktqu`).
- DO NOT delete `OLD_SUPABASE_*` — the migration script still references them.

---

## 9. Disk space note
On 2026-06-04, dev machine `/` was at 78% used (after npm cache + puppeteer cleanup). When ready to free more space: candidates are `node_modules` in inactive `devprojects/websiteprojects/*` projects (17GB) and `~/.vscode-server/cli` (2.9GB). Not blocking current work.

---

## 10. Decision log (only material decisions)

| Date | Decision | Reason |
|---|---|---|
| 2026-06-04 | Use query string (`?id=`) for affiliate detail route, not dynamic segment | Required by `output: "export"` static export — no runtime params for SSG |
| 2026-06-04 | `CRMFormEmbed` two-pass useState pattern (start with bare src, enrich on mount) | Avoids hydration mismatch; iframe loads correctly even if cookie/URL parse fails |
| 2026-06-04 | Admizz RPC writes both `register_leads` AND `affiliate_referrals` | Matches existing in-house RegisterForm code path so admin UI reads the same shape |
| 2026-06-04 | Gate admizz RPC call by `tenant.slug === 'admizz'` (not `industry_id === 'education_consultancy'`) | Future-proof: other education tenants must not call admizz |
| 2026-06-04 | Add new `ADMIZZ_*` env vars instead of reusing `OLD_SUPABASE_*` | Semantic clarity; `OLD_*` implies deprecated. Same underlying values. |
| 2026-06-04 | Keep both `.bak` files and migration files permanently until full end-to-end verified | Recovery safety > tidiness |
| 2026-06-04 | Always destructure `{ data, error }` from supabase-js `.rpc()` calls — don't rely on try/catch alone | Discovered via Bug C: RPC errors surface in `error`, not via throw; silent failures otherwise |
| 2026-06-04 | Apply `gen_random_uuid()` DEFAULT to `register_leads.id` instead of modifying the RPC to pass an id | Schema-level fix benefits all future inserts, RPC code stays small |
| 2026-06-04 | Set `new-inquiry` as default `pipeline_stages` for admizz tenant (not a different stage like `first-contact`) | Slug match path in route.ts uses `status=new`, fall-through to default must also be a valid landing stage |

---

## 11. What I (Claude) should do if recovering from this doc cold

1. Read Section 1 to identify current state.
2. Read Section 2 for IDs/URLs.
3. Read Section 3 to know what files have `.bak` siblings.
4. If user reports breakage: ask which behavior is broken, map to a step in Section 1, then follow Section 6 rollback for that step.
5. If user wants to continue: pick up at the first "⏭️ NEXT" step in Section 1.
6. Before any code change: re-confirm by reading the actual current file (not just the `.bak`), since user may have made changes outside this work.
7. NEVER apply changes without first re-stating an overview matching the structure in earlier conversation turns.

---

## 12. Conversation behavior notes (preferences confirmed in session)

- User wants **overview before any change**, every time.
- User wants **backups before any change**, every time.
- User wants **one-by-one step instructions**, not batched.
- User pauses frequently to verify; never assume permission to proceed beyond the explicitly approved step.
- User uses screenshots to share state. Read them carefully.
- User has access to: admizz repo, CRM repo, admizz Supabase, CRM Supabase, both dev sites.
