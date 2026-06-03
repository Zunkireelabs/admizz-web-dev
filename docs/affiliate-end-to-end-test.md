# Affiliate System — End-to-End Test Walkthrough

Use this to verify the entire affiliate pipe (click → lead → referral → dashboard) is working on dev. ~3 minutes.

---

## Pre-flight (already done — just confirming)

- ✅ Supabase migrations 001, 002, 003 are run
- ✅ Admin user `admizzdotcom2020@gmail.com` exists with `role: admin` metadata
- ✅ Dev deployment is current (latest commit: link builder + RPC refactor)
- ✅ Test affiliate `TEST2026` (email `test@gmail.com`) exists in `affiliates` table

---

## Step 1 — Fresh incognito window

Open a brand-new incognito / private window. **Important:** must be fresh (no stale cookies from previous attempts).

- Chrome: `Cmd+Shift+N` (Mac) / `Ctrl+Shift+N` (Windows)
- Safari: `Cmd+Shift+N`
- Firefox: `Cmd+Shift+P` / `Ctrl+Shift+P`

## Step 2 — Land on the referral link

Copy/paste this exact URL into the incognito address bar:

```
https://dev-web.admizzeducation.com/register?ref=TEST2026
```

Press Enter. The `/register` page should load normally.

## Step 3 — Verify the cookie was set

1. Right-click anywhere on the page → **Inspect** (or `F12`)
2. In DevTools, click the **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Left sidebar → expand **Cookies** → click `https://dev-web.admizzeducation.com`
4. Look for a cookie named **`admizz_ref`** with value **`TEST2026`**

| ✅ Cookie present | ❌ Cookie missing |
|---|---|
| Proceed to Step 4 | Tell Claude — that means `AffiliateRefCapture` isn't firing on this page. Stop here. |

## Step 4 — Fill the form with these EXACT values

(Using known values makes the verification queries trivial — no need to remember random text.)

| Field | Value |
|---|---|
| First name | `End` |
| Last name | `Test` |
| Email | `endtest-final@test.local` |
| Phone | Any 10-digit number (e.g. `9800000000`) |
| Countries | Pick any (e.g. Canada or UK) |
| Intake / field / education / contact pref | Pick any — they don't affect the test |

Click **Submit / Continue** through any multi-step screens.

## Step 5 — Wait for the success screen

Do NOT close the tab yet. Wait for the "Thanks / All set / Done" confirmation. This is when the form actually sent the data — closing too early can cancel the in-flight request.

## Step 6 — Report back to Claude

Send: **"done — endtest-final@test.local"**

Claude will run 3 queries from his side and confirm:

| Check | Expected |
|---|---|
| `register_leads` has the row with that email | ✅ |
| `affiliate_referrals` has a new row with `lead_id` matching the lead | ✅ |
| `affiliates.TEST2026.total_referrals` ticked up from 3 → 4 | ✅ |
| `affiliates.TEST2026.tier` still `Starter` (need 5 for Rising Star) | ✅ |

## Step 7 — Verify in the dashboards (visual check)

### Affiliate dashboard
1. Open another incognito tab → `https://dev-web.admizzeducation.com/affiliate-dashboard`
2. Sign in: email `test@gmail.com`, code `TEST2026`
3. Confirm:
   - Total Referrals card shows 4 (was 3)
   - Funnel widget Registrations = 4
   - Activity Timeline shows `"End T. registered for ... · Consultation · Pending verification"` at the top
   - Referral Table shows the new row

### Admin dashboard
1. Another incognito tab → `https://dev-web.admizzeducation.com/affiliate-admin`
2. Sign in: `admizzdotcom2020@gmail.com` / `admizz@admin2026`
3. Click **Referrals** tab → find the new row
4. **Click the row** → expand → confirm full lead details show:
   - Full name: `End Test`
   - Email: `endtest-final@test.local`
   - Phone, Countries, etc.
   - **Email** and **WhatsApp** buttons present

If all of the above pass, the system is verified end-to-end and you can confidently add real affiliates.

---

## Failure modes & what they mean

| Symptom | Cause | Fix |
|---|---|---|
| Cookie not set in Step 3 | `AffiliateRefCapture` component not mounted or errored | Check browser console; possibly redeploy |
| Lead row appears but no referral row | `createReferralFromRegistration` RPC failed silently | Check Supabase RPC logs; verify `create_referral_for_registration` exists |
| Referral created but counters not updated | `recomputeAffiliateTotals` failed inside RPC | Check Postgres logs; manual recompute fallback |
| Affiliate dashboard shows old counts | Browser caching the affiliate session | Hard-refresh (`Cmd+Shift+R`) — auto-refresh re-fetches on load |
| Lead row missing entirely | Form submitted to wrong endpoint (e.g. `/register-v2` which uses iframe CRM) | Confirm you submitted on `/register`, not `/register-v2` |

---

## When you've finished the test

If everything passes → reply to Claude **"all tests passed"** and we can move on to:
- Production deployment plan (merge to main + `./deploy.sh prod`)
- OR the next outstanding follow-up (rate-limit on login, CRM iframe spec, etc.)

If anything fails → screenshot the failing step + paste the error message — Claude will diagnose.
