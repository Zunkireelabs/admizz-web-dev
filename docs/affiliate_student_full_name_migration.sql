-- ============================================================
-- Admizz Affiliate — Show full student name to referring affiliate
-- Apply this in: https://supabase.com/dashboard → SQL Editor
--
-- Problem: affiliate_referrals.student_display was being written as
-- "first L." (privacy-masked), which made the affiliate dashboard
-- look inconsistent — the affiliate referred the student, they
-- should see the full name.
--
-- This migration:
--   1. Redefines create_referral_for_registration to store the full
--      name as-is in student_display.
--   2. Backfills existing rows by joining to register_leads.full_name.
-- ============================================================

-- 1. Update the RPC to store full name (not masked) on new referrals.
--    SECURITY DEFINER so anon callers can insert via RLS.
CREATE OR REPLACE FUNCTION create_referral_for_registration(
  p_code        TEXT,
  p_lead_id     UUID,
  p_email       TEXT,
  p_full_name   TEXT,
  p_destination TEXT,
  p_flag_emoji  TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_affiliate     affiliates%ROWTYPE;
  v_display       TEXT;
  v_total         INT;
  v_converted     INT;
  v_earned        INT;
  v_tier          TEXT;
BEGIN
  -- Lookup affiliate by code; must exist and be active
  SELECT * INTO v_affiliate
  FROM affiliates
  WHERE UPPER(referral_code) = UPPER(p_code)
    AND status = 'active'
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Use the full name as-is. Fallback to "Anonymous" if empty.
  v_display := NULLIF(TRIM(COALESCE(p_full_name, '')), '');
  IF v_display IS NULL THEN
    v_display := 'Anonymous';
  END IF;

  -- Insert the referral row
  INSERT INTO affiliate_referrals (
    affiliate_id, affiliate_code, student_display,
    destination,  flag_emoji,     stage,  status,
    lead_id,      email,          commission
  ) VALUES (
    v_affiliate.id, v_affiliate.referral_code, v_display,
    COALESCE(p_destination, 'Other'),
    COALESCE(p_flag_emoji,  '🌍'),
    'Consultation', 'pending',
    p_lead_id, p_email, 0
  );

  -- Recompute affiliate totals + tier
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE status IN ('converted','paid')),
    COALESCE(SUM(commission) FILTER (WHERE status = 'paid'), 0)
  INTO v_total, v_converted, v_earned
  FROM affiliate_referrals
  WHERE affiliate_id = v_affiliate.id;

  v_tier := CASE
    WHEN v_total >= 30 THEN 'Admizz Legend'
    WHEN v_total >= 15 THEN 'Elite Partner'
    WHEN v_total >= 5  THEN 'Rising Star'
    ELSE 'Starter'
  END;

  UPDATE affiliates
  SET total_referrals = v_total,
      total_converted = v_converted,
      total_earned    = v_earned,
      tier            = v_tier
  WHERE id = v_affiliate.id;

  RETURN TRUE;
END;
$$;

-- Permissions: anon + authenticated must be able to call it
GRANT EXECUTE ON FUNCTION create_referral_for_registration(TEXT, UUID, TEXT, TEXT, TEXT, TEXT)
  TO anon, authenticated;

-- 2. Backfill: copy the full name from register_leads into
--    student_display for existing rows that were stored as "first L."
UPDATE affiliate_referrals AS ar
SET    student_display = TRIM(rl.full_name)
FROM   register_leads AS rl
WHERE  ar.lead_id = rl.id
  AND  rl.full_name IS NOT NULL
  AND  TRIM(rl.full_name) <> '';
