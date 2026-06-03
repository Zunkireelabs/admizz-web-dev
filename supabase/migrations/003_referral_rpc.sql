-- ============================================================================
-- 003_referral_rpc.sql — RPC for crediting referrals to affiliates
-- ============================================================================
-- Run this in the Supabase SQL Editor AFTER 002_rls_and_auth.sql.
--
-- WHY THIS EXISTS:
-- RLS in 002 blocked anon SELECT on the affiliates table. That broke the
-- conversion-attribution path because RegisterForm, event-form.js, and
-- spin-wheel-prod.js all needed to look up the affiliate by code, then insert
-- into affiliate_referrals + bump totals — all from anon context. Under RLS
-- the lookup returns nothing, so referrals silently never got created.
--
-- This RPC takes all the data the client has, validates the code server-side
-- under elevated privileges, creates the referral row, and recomputes totals.
-- Anon callers go through this single function instead of three separate
-- table operations.
-- ============================================================================

create or replace function public.create_referral_for_registration(
  p_code         text,
  p_lead_id      uuid,
  p_email        text,
  p_full_name    text,
  p_destination  text,
  p_flag_emoji   text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  aff_id          uuid;
  aff_code        text;
  first_name      text;
  last_initial    text;
  student_display text;
  refs_count      int;
begin
  -- 1. Validate code → active affiliate
  select id, referral_code
    into aff_id, aff_code
  from affiliates
  where upper(referral_code) = upper(trim(p_code))
    and status = 'active'
  limit 1;

  if aff_id is null then
    return false;
  end if;

  -- 2. Build display name "First L." (privacy-preserving)
  first_name   := split_part(trim(p_full_name), ' ', 1);
  last_initial := upper(left(split_part(trim(p_full_name), ' ', 2), 1));
  student_display := case
    when first_name = ''   then 'Anonymous'
    when last_initial = '' then first_name
    else first_name || ' ' || last_initial || '.'
  end;

  -- 3. Insert the referral row
  insert into affiliate_referrals (
    affiliate_id, affiliate_code, student_display, destination, flag_emoji,
    stage,          status,    commission,
    lead_id,        email
  ) values (
    aff_id, aff_code, student_display,
    coalesce(nullif(trim(p_destination), ''), 'Other'),
    coalesce(nullif(trim(p_flag_emoji), ''), '🌍'),
    'Consultation', 'pending', 0,
    p_lead_id,      lower(trim(p_email))
  );

  -- 4. Recompute totals + tier from source-of-truth (no counter drift)
  select count(*) into refs_count
  from affiliate_referrals
  where affiliate_id = aff_id;

  update affiliates
  set
    total_referrals = refs_count,
    total_converted = (
      select count(*) from affiliate_referrals
      where affiliate_id = aff_id and status in ('converted','paid')
    ),
    total_earned = (
      select coalesce(sum(commission), 0) from affiliate_referrals
      where affiliate_id = aff_id and status = 'paid'
    ),
    tier = case
      when refs_count >= 30 then 'Admizz Legend'
      when refs_count >= 15 then 'Elite Partner'
      when refs_count >=  5 then 'Rising Star'
      else                       'Starter'
    end
  where id = aff_id;

  return true;
end;
$$;

grant execute on function public.create_referral_for_registration(
  text, uuid, text, text, text, text
) to anon, authenticated;

-- ============================================================================
-- Once all clients (RegisterForm, event-form.js, spin-wheel-prod.js) call
-- this RPC instead of doing direct inserts, you can lock down the raw INSERT
-- by uncommenting the line below. (Keep it commented for now during the
-- transition so any laggy client still works.)
--
-- drop policy if exists "anon_insert_affiliate_referrals" on affiliate_referrals;
-- ============================================================================
