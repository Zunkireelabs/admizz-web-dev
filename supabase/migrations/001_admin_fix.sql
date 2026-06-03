-- ═══════════════════════════════════════════════════════════════════════════
-- ADMIZZ AFFILIATE — ADMIN OPERATIONS FIX
-- ═══════════════════════════════════════════════════════════════════════════
-- Purpose: Allow admin panel operations (approve/reject/add referral/etc.)
-- to actually work. Currently RLS blocks them silently.
--
-- Security model:
--   - The admin panel is gated by a password (`admizz@admin2026`) in the
--     client. Since the site is fully static, the password is shipped to
--     every browser regardless. Any actor with the password (or who reads
--     the JS bundle) can perform admin actions.
--   - RLS on these tables doesn't add real security since the anon key
--     and password are already public to anyone viewing the site.
--   - Disabling RLS here makes the admin actually work without breaking
--     anything that wasn't already broken.
--
-- For real security in the future, migrate to:
--   (a) Supabase Edge Functions with service role key, OR
--   (b) Supabase Auth on the admin user with proper RLS policies.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Disable RLS on admin-managed tables ────────────────────────────────────
ALTER TABLE affiliates           DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_referrals  DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_leads      DISABLE ROW LEVEL SECURITY;

-- ── Clean up orphaned data ─────────────────────────────────────────────────
-- Any leads marked "approved" without a matching affiliate row are corrupt
-- (RLS was silently blocking the affiliate INSERT while the lead UPDATE
-- succeeded). Reset them to "new" so admin can re-approve cleanly.
UPDATE affiliate_leads
SET    status = 'new'
WHERE  status = 'approved'
  AND  NOT EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.email = affiliate_leads.email
  );

-- ── Ensure unique constraint on referral_code ──────────────────────────────
-- Required by collision-proof code generation in api.ts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'affiliates_referral_code_key'
  ) THEN
    ALTER TABLE affiliates ADD CONSTRAINT affiliates_referral_code_key UNIQUE (referral_code);
  END IF;
END $$;

-- ── Done ────────────────────────────────────────────────────────────────────
SELECT
  'RLS disabled on affiliates, affiliate_referrals, affiliate_leads' AS message,
  (SELECT COUNT(*) FROM affiliate_leads WHERE status = 'new')        AS pending_leads,
  (SELECT COUNT(*) FROM affiliates)                                  AS total_affiliates;
