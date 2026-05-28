-- ============================================================
-- Admizz Affiliate System — DB Migration
-- Apply this in: https://supabase.com/dashboard → SQL Editor
-- ============================================================

-- 1. Add affiliate_code column to affiliate_leads
--    (tracks which affiliate referred this applicant)
ALTER TABLE affiliate_leads
  ADD COLUMN IF NOT EXISTS affiliate_code TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Affiliates table (approved affiliate accounts)
CREATE TABLE IF NOT EXISTS affiliates (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id  TEXT,
  full_name       TEXT        NOT NULL,
  email           TEXT        NOT NULL UNIQUE,
  phone           TEXT,
  city            TEXT,
  referral_code   TEXT        NOT NULL UNIQUE,
  tier            TEXT        NOT NULL DEFAULT 'Starter',
  status          TEXT        NOT NULL DEFAULT 'active',
  total_referrals INT         NOT NULL DEFAULT 0,
  total_converted INT         NOT NULL DEFAULT 0,
  total_earned    INT         NOT NULL DEFAULT 0,
  joined_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Affiliate referrals table (each student referred by an affiliate)
CREATE TABLE IF NOT EXISTS affiliate_referrals (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id    UUID        REFERENCES affiliates(id) ON DELETE CASCADE,
  affiliate_code  TEXT        NOT NULL,
  student_display TEXT        NOT NULL,
  destination     TEXT,
  flag_emoji      TEXT        DEFAULT '🌍',
  stage           TEXT        NOT NULL DEFAULT 'Consultation',
  status          TEXT        NOT NULL DEFAULT 'pending',
  commission      INT         NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Disable RLS on new tables (admin panel uses anon key, security at UI level)
ALTER TABLE affiliates         DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_referrals DISABLE ROW LEVEL SECURITY;

-- 5. Allow anon to update affiliate_leads status (for admin approve/reject)
--    Only needed if RLS is enabled on affiliate_leads
ALTER TABLE affiliate_leads DISABLE ROW LEVEL SECURITY;

-- 6. Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code   ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_affiliates_email           ON affiliates(email);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_aff_id ON affiliate_referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_code   ON affiliate_referrals(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_leads_status     ON affiliate_leads(status);
