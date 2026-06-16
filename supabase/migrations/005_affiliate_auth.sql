-- ============================================================================
-- 005_affiliate_auth.sql — Supabase Auth integration for affiliate login
-- ============================================================================
--
-- WHAT THIS DOES:
--   1. Adds auth_user_id column to affiliates (links to Supabase auth.users)
--   2. Creates new RPCs that identify callers via auth.uid() — no email/code
--      credential params needed anymore
--   3. Old credential-based RPCs (from 002_rls_and_auth.sql) are left
--      completely untouched — old affiliates and the existing frontend keep
--      working during the transition
--
-- NON-BREAKING: run this at any time. Nothing is dropped or modified.
-- Existing affiliates, admin panel, and all current frontend code continue
-- to work exactly as before.
--
-- Run in Supabase SQL Editor AFTER 004_register_leads_city.sql.
-- ============================================================================


-- ── 1. Add auth_user_id to affiliates ─────────────────────────────────────
--
-- NULL  = existing affiliate, not yet migrated to Supabase Auth login
-- UUID  = approved affiliate who received an invite email and set a password
--
-- The UNIQUE constraint means one Supabase Auth user per affiliate row.
-- Nullable because existing rows have no auth user yet.

ALTER TABLE affiliates
  ADD COLUMN IF NOT EXISTS auth_user_id uuid REFERENCES auth.users(id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'affiliates_auth_user_id_key'
  ) THEN
    ALTER TABLE affiliates
      ADD CONSTRAINT affiliates_auth_user_id_key UNIQUE (auth_user_id);
  END IF;
END $$;


-- ── 2. affiliate_me() — fetch the authenticated affiliate's own row ─────────
--
-- Replaces affiliate_login(p_email, p_code) for new-auth affiliates.
-- Called on dashboard load: supabase.rpc("affiliate_me")
-- Returns the affiliates row for whoever is currently signed in.
-- Returns NULL if no matching active affiliate (e.g. admin user calls this).

CREATE OR REPLACE FUNCTION public.affiliate_me()
RETURNS affiliates
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result affiliates;
BEGIN
  SELECT * INTO result
  FROM affiliates
  WHERE auth_user_id = auth.uid()
    AND status = 'active'
  LIMIT 1;

  RETURN result;
END;
$$;

-- Only authenticated users (signed-in affiliates) can call this
GRANT EXECUTE ON FUNCTION public.affiliate_me() TO authenticated;


-- ── 3. affiliate_self_referrals() — credential-free version ───────────────
--
-- Alongside the old affiliate_self_referrals(p_email text, p_code text).
-- PostgreSQL overloads by parameter signature — both versions coexist safely.
-- New frontend calls supabase.rpc("affiliate_self_referrals") with no params.

CREATE OR REPLACE FUNCTION public.affiliate_self_referrals()
RETURNS SETOF affiliate_referrals
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  aff_id uuid;
BEGIN
  SELECT id INTO aff_id
  FROM affiliates
  WHERE auth_user_id = auth.uid()
    AND status = 'active'
  LIMIT 1;

  IF aff_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
    SELECT * FROM affiliate_referrals
    WHERE affiliate_id = aff_id
    ORDER BY created_at DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.affiliate_self_referrals() TO authenticated;


-- ── 4. affiliate_self_clicks() — credential-free version ──────────────────
--
-- Old version: affiliate_self_clicks(p_email text, p_code text, p_limit int)
-- New version: affiliate_self_clicks(p_limit int DEFAULT 200)
-- Different signatures — both coexist.

CREATE OR REPLACE FUNCTION public.affiliate_self_clicks(p_limit int DEFAULT 200)
RETURNS SETOF affiliate_clicks
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  aff_code text;
BEGIN
  SELECT referral_code INTO aff_code
  FROM affiliates
  WHERE auth_user_id = auth.uid()
    AND status = 'active'
  LIMIT 1;

  IF aff_code IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
    SELECT * FROM affiliate_clicks
    WHERE upper(code) = upper(aff_code)
    ORDER BY created_at DESC
    LIMIT greatest(1, least(1000, p_limit));
END;
$$;

GRANT EXECUTE ON FUNCTION public.affiliate_self_clicks(int) TO authenticated;


-- ── 5. affiliate_update_profile() — credential-free version ───────────────
--
-- Old version: affiliate_update_profile(p_email, p_code, p_full_name, p_phone)
-- New version: affiliate_update_profile(p_full_name, p_phone)
-- Different signatures — both coexist.

CREATE OR REPLACE FUNCTION public.affiliate_update_profile(
  p_full_name text,
  p_phone     text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  aff_id uuid;
BEGIN
  SELECT id INTO aff_id
  FROM affiliates
  WHERE auth_user_id = auth.uid()
    AND status = 'active'
  LIMIT 1;

  IF aff_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE affiliates
  SET
    full_name = trim(p_full_name),
    phone     = nullif(trim(coalesce(p_phone, '')), '')
  WHERE id = aff_id;

  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.affiliate_update_profile(text, text) TO authenticated;


-- ── 6. Customise Supabase Auth invite email template (reminder) ────────────
--
-- After running this SQL, go to:
--   Supabase Dashboard → Authentication → Email Templates → Invite User
--
-- Replace the subject and body with something like:
--
--   Subject: You're approved — Admizz Affiliate Program
--
--   Body:
--   Hi {{ .Email }},
--
--   Great news — your Admizz Affiliate application has been approved!
--
--   Click the button below to set your password and access your dashboard.
--   Your referral code will be visible once you log in.
--
--   {{ .ConfirmationURL }}
--
--   Welcome to the Admizz Affiliate Program.
--   — The Admizz Team
--
-- (The {{ .ConfirmationURL }} token is replaced by Supabase with the real link)
-- ============================================================================


-- ── 7. Verify ─────────────────────────────────────────────────────────────

SELECT
  '005_affiliate_auth.sql applied successfully' AS message,
  (SELECT COUNT(*)
     FROM affiliates)                                        AS total_affiliates,
  (SELECT COUNT(*)
     FROM affiliates WHERE auth_user_id IS NOT NULL)         AS with_auth_user_id,
  (SELECT COUNT(*)
     FROM affiliates WHERE auth_user_id IS NULL)             AS pending_migration;
