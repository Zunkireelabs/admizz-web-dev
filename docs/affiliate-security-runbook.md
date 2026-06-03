# Affiliate Security Runbook

Companion to `supabase/migrations/002_rls_and_auth.sql`. Read end-to-end before deploying the affiliate system to production.

---

## Pre-flight checklist (must complete before deploying the RLS migration)

### 1. Create at least one admin user
- Open Supabase dashboard → **Authentication → Users → Add user → Create new user**
- Use a real admin email + a strong password (≥16 chars, store in 1Password/Vault)
- Note the email — you'll use it to sign into `/affiliate-admin`

### 2. Flag that user as admin (this is what unlocks the admin panel)
In the same dashboard, click the user → **Raw user meta data** → paste:
```json
{ "role": "admin" }
```
Save. The `is_admin()` Postgres function reads from this JWT claim.

Or run via SQL Editor (replace email):
```sql
update auth.users
set raw_user_meta_data = jsonb_set(
  coalesce(raw_user_meta_data, '{}'::jsonb),
  '{role}', '"admin"'
)
where email = 'YOUR-ADMIN@EMAIL.COM';
```

### 3. Run the migration
- Supabase dashboard → **SQL Editor → New query**
- Paste the contents of `supabase/migrations/002_rls_and_auth.sql`
- Click **Run** — expect "Success. No rows returned."

### 4. Smoke test
Verify the lockdown is actually in place:
```bash
# This should now return [] (RLS blocks anon SELECT):
curl 'https://ldsgsdjixzsljgkcktqu.supabase.co/rest/v1/affiliates?select=*&limit=1' \
  -H "apikey: <ANON_KEY>" -H "Authorization: Bearer <ANON_KEY>"
```

```bash
# This should still return rows (public leaderboard view):
curl 'https://ldsgsdjixzsljgkcktqu.supabase.co/rest/v1/affiliate_leaderboard_public?select=*' \
  -H "apikey: <ANON_KEY>" -H "Authorization: Bearer <ANON_KEY>"
```

```bash
# This should return false (unknown code rejected):
curl -X POST 'https://ldsgsdjixzsljgkcktqu.supabase.co/rest/v1/rpc/record_affiliate_click' \
  -H "apikey: <ANON_KEY>" -H "Authorization: Bearer <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"p_code":"DOESNTEXIST","p_landing_page":"/test"}'
```

---

## What the migration does (TL;DR)

1. **Enables RLS** on `affiliates`, `affiliate_referrals`, `affiliate_leads`, `affiliate_clicks`, `register_leads`.
2. **Anon (browser) can INSERT** into the form tables (so capture and form submits still work).
3. **Anon CANNOT SELECT** any of those tables directly — the raw data is no longer world-readable.
4. **Authenticated admin (via Supabase Auth + `user_metadata.role = "admin"`)** can do everything.
5. **Public leaderboard** is exposed via the `affiliate_leaderboard_public` view (no email/phone).
6. **Affiliate dashboard reads** go through SECURITY DEFINER RPCs that take `(email, code)` and return only that affiliate's own data: `affiliate_login`, `affiliate_self_referrals`, `affiliate_self_clicks`.
7. **Click capture** now uses `record_affiliate_click(code, ...)` which rejects unknown codes server-side. Stops spam against arbitrary codes.

---

## What this does NOT solve (yet — follow-up tasks)

| Gap | Mitigation |
|---|---|
| Affiliate login still uses email + referral code (no password) | Acceptable for v1. Move to magic-link or password in v2. |
| No rate limit on `affiliate_login` RPC | Wrap with a Postgres rate-limit table or use Supabase Edge Function with IP throttling. |
| Vanilla-JS event tracking still does direct `INSERT` into `affiliate_referrals` | Works because anon INSERT is allowed. Will be tightened when those files migrate to RPCs. |
| `record_affiliate_click` has no per-IP throttle | Add a `click_throttle` table + check in the RPC if abuse appears. |

---

## Rollback

If something goes wrong post-migration and you need to restore previous behavior:

```sql
alter table affiliates           disable row level security;
alter table affiliate_referrals  disable row level security;
alter table affiliate_leads      disable row level security;
alter table affiliate_clicks     disable row level security;
alter table register_leads       disable row level security;
```

The RPCs and view will continue to exist but won't be required — the old direct queries will start working again. (Affiliate data will be world-readable again, so this is an emergency-only rollback.)
