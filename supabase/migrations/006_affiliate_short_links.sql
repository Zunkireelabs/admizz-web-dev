-- ============================================================================
-- 006_affiliate_short_links.sql — Bitly-style short links per affiliate
-- ============================================================================
--
-- WHAT THIS DOES (additive only — touches no existing object):
--   1. New table `affiliate_short_links` — one row per
--      (affiliate, destination_path, channel) tuple, keyed by a 6-char code.
--   2. RPC `affiliate_create_short_link(destination, channel)` — called from
--      the dashboard. Idempotent: returns the same code for the same tuple,
--      otherwise allocates a fresh random base62 code.
--   3. RPC `affiliate_resolve_short_link(code)` — called by the public /r
--      redirect page. Returns destination + owner's referral_code, and bumps
--      the click counter atomically.
--
-- NON-BREAKING: no existing table, RPC, or policy is modified.
-- Run AFTER 005_affiliate_auth.sql in the Supabase SQL Editor.
-- Safe to re-run (everything uses if-not-exists / create-or-replace).
-- ============================================================================


-- ── 1. Table ──────────────────────────────────────────────────────────────
create table if not exists public.affiliate_short_links (
  code                 text        primary key,
  owner_affiliate_id   uuid        not null references public.affiliates(id) on delete cascade,
  destination_path     text        not null,
  channel              text        null,
  click_count          int         not null default 0,
  created_at           timestamptz not null default now(),
  last_clicked_at      timestamptz null
);

-- One stable short code per (affiliate, destination, channel) tuple.
-- COALESCE so NULL channel still uniqueness-checks.
create unique index if not exists affiliate_short_links_uniq_tuple
  on public.affiliate_short_links (owner_affiliate_id, destination_path, coalesce(channel, ''));

alter table public.affiliate_short_links enable row level security;

-- Owners (authenticated affiliates) can read their own short links.
drop policy if exists "owner_select_own_short_links" on public.affiliate_short_links;
create policy "owner_select_own_short_links"
  on public.affiliate_short_links
  for select to authenticated
  using (
    owner_affiliate_id in (
      select id from public.affiliates where auth_user_id = auth.uid()
    )
  );

-- Admin staff can see all — uses the existing public.is_admin() helper
-- from 002_rls_and_auth.sql (checks JWT user_metadata.role = 'admin').
drop policy if exists "admin_all_short_links" on public.affiliate_short_links;
create policy "admin_all_short_links"
  on public.affiliate_short_links
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- ── 2. affiliate_create_short_link(destination, channel) ──────────────────
-- Idempotent: returns existing code for the same (affiliate, dest, channel)
-- tuple, or inserts a fresh base62 6-char code on first call.
create or replace function public.affiliate_create_short_link(
  p_destination_path text,
  p_channel          text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_aff_id   uuid;
  v_existing text;
  v_code     text;
  v_alphabet text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; -- no 0/O/1/I/l
  v_attempts int := 0;
  v_norm_ch  text := nullif(trim(p_channel), '');
begin
  -- Caller must be a signed-in active affiliate.
  select id into v_aff_id
  from public.affiliates
  where auth_user_id = auth.uid()
    and status = 'active'
  limit 1;

  if v_aff_id is null then
    raise exception 'Not an active affiliate';
  end if;

  if p_destination_path is null or btrim(p_destination_path) = '' then
    raise exception 'destination_path required';
  end if;

  -- Reuse existing code for this tuple if any.
  select code into v_existing
  from public.affiliate_short_links
  where owner_affiliate_id = v_aff_id
    and destination_path   = p_destination_path
    and coalesce(channel, '') = coalesce(v_norm_ch, '')
  limit 1;

  if v_existing is not null then
    return v_existing;
  end if;

  -- Generate a unique 6-char base62 code (retry on the rare PK collision).
  loop
    v_attempts := v_attempts + 1;
    v_code := '';
    for i in 1..6 loop
      v_code := v_code || substr(v_alphabet, 1 + floor(random() * length(v_alphabet))::int, 1);
    end loop;
    begin
      insert into public.affiliate_short_links (code, owner_affiliate_id, destination_path, channel)
      values (v_code, v_aff_id, p_destination_path, v_norm_ch);
      return v_code;
    exception when unique_violation then
      if v_attempts > 8 then
        raise exception 'Could not allocate a unique short code';
      end if;
      -- try again
    end;
  end loop;
end;
$$;

grant execute on function public.affiliate_create_short_link(text, text) to authenticated;


-- ── 3. affiliate_resolve_short_link(code) — public ────────────────────────
-- Returns destination_path + owner's referral_code; bumps click_count.
-- Callable anonymously so the /r?c=… redirect page works for the public.
create or replace function public.affiliate_resolve_short_link(
  p_code text
)
returns table(destination_path text, owner_ref_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := trim(p_code);
begin
  if v_code is null or v_code = '' then
    return;
  end if;

  return query
  with bumped as (
    update public.affiliate_short_links sl
       set click_count     = sl.click_count + 1,
           last_clicked_at = now()
     where sl.code = v_code
    returning sl.destination_path, sl.owner_affiliate_id
  )
  select b.destination_path, a.referral_code
    from bumped b
    join public.affiliates a on a.id = b.owner_affiliate_id;
end;
$$;

grant execute on function public.affiliate_resolve_short_link(text) to anon;
grant execute on function public.affiliate_resolve_short_link(text) to authenticated;
