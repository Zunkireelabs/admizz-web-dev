-- Add attribution columns to register_leads for affiliate and UTM tracking
ALTER TABLE register_leads ADD COLUMN IF NOT EXISTS ref_code text;
ALTER TABLE register_leads ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE register_leads ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE register_leads ADD COLUMN IF NOT EXISTS utm_campaign text;

CREATE INDEX IF NOT EXISTS idx_register_leads_ref_code ON register_leads(ref_code) WHERE ref_code IS NOT NULL;
