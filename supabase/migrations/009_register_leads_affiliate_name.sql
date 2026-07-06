-- Store the referring affiliate's display name on each lead for quick CRM visibility
ALTER TABLE register_leads ADD COLUMN IF NOT EXISTS affiliate_name text;
