-- ============================================================================
-- 002_rls_and_auth.sql — Lock down the affiliate system
-- ============================================================================
-- Run this after 001_admin_fix.sql in the Supabase SQL Editor.
--
-- BEFORE you run it, you must:
--   1. Create at least one admin user in Supabase Auth → Users → Add user
--   2. Note that user's email (will be used for admin login)
--   3. Set user_metadata role = "admin" via:
--        Auth → Users → click user → Raw user meta data →
--        { "role": "admin" }
--      OR run this AFTER user creation (replace the email):
--        update auth.users set raw_user_meta_data = jsonb_set(
--          coalesce(raw_user_meta_data,'{}'::jsonb),
--          '{role}', '"admin"'
--        ) where email = 'YOUR-ADMIN@EMAIL.COM';
--
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Enable RLS on all sensitive affiliate tables
-- ----------------------------------------------------------------------------
alter table affiliates             enable row level security;
alter table affiliate_referrals    enable row level security;
alter table affiliate_leads        enable row level security;
alter table affiliate_clicks       enable row level security;
alter table register_leads         enable row level security;

-- Drop any pre-existing policies to start clean
do $$
declare r record;
begin
  for r in
    select schemaname, tablename, policyname
    from pg_policies
    where tablename in ('affiliates','affiliate_referrals','affiliate_leads','affiliate_clicks','register_leads')
  loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

-- ----------------------------------------------------------------------------
-- 2. Anon-role INSERT policies — forms still need to write
-- ----------------------------------------------------------------------------
-- AffiliateRefCapture inserts here. Validated downstream by record_affiliate_click RPC,
-- but raw inserts also remain allowed for backwards compatibility while the
-- frontend transitions to the RPC. Limit by NOT exposing SELECT.
create policy "anon_insert_clicks"
  on affiliate_clicks for insert to anon
  with check (true);

-- Forms create the underlying lead row
create policy "anon_insert_register_leads"
  on register_leads for insert to anon
  with check (true);

-- Affiliate-program application form
create policy "anon_insert_affiliate_leads"
  on affiliate_leads for insert to anon
  with check (true);

-- Event/spin dual-write needs this; the RPC will eventually replace it
create policy "anon_insert_affiliate_referrals"
  on affiliate_referrals for insert to anon
  with check (true);

-- ----------------------------------------------------------------------------
-- 3. Admin (authenticated) — full read/write access
-- ----------------------------------------------------------------------------
-- An authenticated user is considered admin if their JWT has role=admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() -> 'user_metadata' ->> 'role', '') = 'admin';
$$;

grant execute on function public.is_admin() to anon, authenticated;

create policy "admin_all_affiliates"
  on affiliates for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_affiliate_referrals"
  on affiliate_referrals for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_affiliate_leads"
  on affiliate_leads for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_affiliate_clicks"
  on affiliate_clicks for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin_all_register_leads"
  on register_leads for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ----------------------------------------------------------------------------
-- 4. Public leaderboard view — only safe, non-PII columns
-- ----------------------------------------------------------------------------
create or replace view affiliate_leaderboard_public as
select
  id,
  full_name,
  city,
  total_referrals,
  tier
from affiliates
where status = 'active'
order by total_referrals desc
limit 50;

grant select on affiliate_leaderboard_public to anon, authenticated;

-- ----------------------------------------------------------------------------
-- 5. SECURITY DEFINER RPCs — affiliate dashboard data fetching
-- ----------------------------------------------------------------------------
-- These run with elevated privileges, validate the caller's credentials
-- (email + referral_code), and return only that affiliate's own data.

create or replace function public.affiliate_login(p_email text, p_code text)
returns affiliates
language plpgsql
security definer
set search_path = public
as $$
declare
  result affiliates;
begin
  select * into result
  from affiliates
  where lower(email) = lower(trim(p_email))
    and upper(referral_code) = upper(trim(p_code))
    and status = 'active'
  limit 1;
  return result;
end;
$$;

grant execute on function public.affiliate_login(text, text) to anon;

create or replace function public.affiliate_self_referrals(p_email text, p_code text)
returns setof affiliate_referrals
language plpgsql
security definer
set search_path = public
as $$
declare
  aff_id uuid;
begin
  select id into aff_id
  from affiliates
  where lower(email) = lower(trim(p_email))
    and upper(referral_code) = upper(trim(p_code))
    and status = 'active'
  limit 1;

  if aff_id is null then
    return;
  end if;

  return query
    select * from affiliate_referrals
    where affiliate_id = aff_id
    order by created_at desc;
end;
$$;

grant execute on function public.affiliate_self_referrals(text, text) to anon;

create or replace function public.affiliate_self_clicks(p_email text, p_code text, p_limit int default 200)
returns setof affiliate_clicks
language plpgsql
security definer
set search_path = public
as $$
declare
  aff_code text;
begin
  select referral_code into aff_code
  from affiliates
  where lower(email) = lower(trim(p_email))
    and upper(referral_code) = upper(trim(p_code))
    and status = 'active'
  limit 1;

  if aff_code is null then
    return;
  end if;

  return query
    select * from affiliate_clicks
    where upper(code) = upper(aff_code)
    order by created_at desc
    limit greatest(1, least(1000, p_limit));
end;
$$;

grant execute on function public.affiliate_self_clicks(text, text, int) to anon;

-- ----------------------------------------------------------------------------
-- 6. Validated click capture — rejects unknown codes silently
-- ----------------------------------------------------------------------------
-- AffiliateRefCapture should call this instead of inserting directly.
-- Returns true if the click was recorded, false if the code wasn't valid.

create or replace function public.record_affiliate_click(
  p_code         text,
  p_landing_page text,
  p_referrer     text default null,
  p_utm_source   text default null,
  p_utm_medium   text default null,
  p_utm_campaign text default null,
  p_user_agent   text default null
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  valid_code text;
begin
  -- Only insert if the code corresponds to an active affiliate
  select referral_code into valid_code
  from affiliates
  where upper(referral_code) = upper(trim(p_code))
    and status = 'active'
  limit 1;

  if valid_code is null then
    return false;
  end if;

  insert into affiliate_clicks (code, landing_page, referrer, utm_source, utm_medium, utm_campaign, user_agent)
  values (valid_code, p_landing_page, p_referrer, p_utm_source, p_utm_medium, p_utm_campaign, p_user_agent);

  return true;
end;
$$;

grant execute on function public.record_affiliate_click(text, text, text, text, text, text, text) to anon;

-- ----------------------------------------------------------------------------
-- 7. Drop direct INSERT on affiliate_clicks to enforce RPC usage
-- ----------------------------------------------------------------------------
-- After all clients are updated to use record_affiliate_click(),
-- uncomment the line below to remove the raw INSERT path entirely.
--
-- drop policy if exists "anon_insert_clicks" on affiliate_clicks;
