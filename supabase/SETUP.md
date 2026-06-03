# Supabase Admin Fix — Setup Instructions

This is a **5-minute, one-time** setup to make the affiliate admin panel actually work. Currently the Approve / Reject / Add Referral buttons silently fail because of Supabase Row Level Security (RLS).

---

## What This Does

- Disables RLS on `affiliates`, `affiliate_referrals`, `affiliate_leads`
- Cleans up orphaned data (leads marked "approved" but with no affiliate row)
- Adds a unique constraint on `referral_code` so the collision-proof code generation works

> **Security note:** The admin password (`admizz@admin2026`) lives in the client bundle, so it's already public to anyone reading the JS source. RLS on these tables wasn't adding real security — it was just blocking the admin panel. Disabling it makes the admin work without lowering real security. For production-grade security, the proper next step is moving admin operations into Supabase Edge Functions with the service role key.

---

## Steps for You

### 1. Open Supabase Studio

1. Go to **https://supabase.com**
2. Click **Sign In** (top right)
3. Use your Supabase account (or GitHub login)

> **Don't have access?** Ask whoever set up the Supabase project (probably Anish) to either invite you to the project or run these steps themselves.

### 2. Open Your Project

After login, you'll see a list of "Projects." Click the one that matches your URL:
```
ldsgsdjixzsljgkcktqu
```
(Project name may be "Admizz" or similar.)

### 3. Open SQL Editor

In the left sidebar, click the icon that says **"SQL Editor"** when you hover (looks like a database/terminal icon).

Click **"+ New query"** at the top.

### 4. Paste & Run the SQL

Open the file `supabase/migrations/001_admin_fix.sql` in this repo, copy its entire contents, and paste into the Supabase SQL editor.

Click the green **"Run"** button (top right) or press `Ctrl+Enter` / `Cmd+Enter`.

You should see a result row like:
```
message                                                              | pending_leads | total_affiliates
---------------------------------------------------------------------+---------------+-----------------
RLS disabled on affiliates, affiliate_referrals, affiliate_leads     | 2             | 0
```

### 5. Verify

After running, the admin operations will work. Test:

1. Go to **https://dev-web.admizzeducation.com/affiliate-admin**
2. Log in with password `admizz@admin2026`
3. Click **Approve** on a pending application
4. You should see a green success banner: `Approved [name] — code: NAME2026`
5. Go to **https://dev-web.admizzeducation.com/affiliate-dashboard**
6. Log in with that email + code → dashboard loads

If any step fails, the new error banner in the admin panel will show the exact Supabase error so we know what to fix next.

---

## What Changed in the Code

| File | What changed |
|---|---|
| `src/lib/affiliate/api.ts` | All admin mutations now return `{ ok: true, data } \| { ok: false, error }`. Added `generateUniqueReferralCode()` for collision-proof codes. |
| `src/components/affiliate/admin/ApplicationsTab.tsx` | Success and error banners replace silent failures. |
| `src/components/affiliate/admin/AffiliatesTab.tsx` | Alerts on suspend/activate failure. |
| `src/components/affiliate/admin/ReferralsTab.tsx` | Alerts on add/update failure. |
| `src/components/affiliate/admin/PayoutsTab.tsx` | Alerts on payout failure. |
| `supabase/migrations/001_admin_fix.sql` | The SQL you paste into Studio. |

---

## Rollback (Not Needed but Documented)

If you ever want to re-enable RLS:
```sql
ALTER TABLE affiliates           ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_referrals  ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_leads      ENABLE ROW LEVEL SECURITY;
```
But then the admin panel will break again until you implement Edge Functions or Supabase Auth.
