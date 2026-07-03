-- ============================================================================
-- 007_affiliate_auth_status.sql
-- ============================================================================
-- Adds get_affiliate_auth_statuses() RPC.
-- Returns email_confirmed_at + last_sign_in_at from auth.users for every
-- affiliate, so the admin panel can show activation status per affiliate.
--
-- SECURITY: SECURITY DEFINER so the function can read auth.users.
--           Raises an exception if the caller is not an admin.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_affiliate_auth_statuses()
RETURNS TABLE (
  email               text,
  email_confirmed_at  timestamptz,
  last_sign_in_at     timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  -- Restrict to admin callers only.
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  RETURN QUERY
    SELECT
      u.email::text,
      u.email_confirmed_at,
      u.last_sign_in_at
    FROM auth.users u
    WHERE u.id IN (
      SELECT a.auth_user_id
      FROM public.affiliates a
      WHERE a.auth_user_id IS NOT NULL
    );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_affiliate_auth_statuses() TO authenticated;

SELECT 'get_affiliate_auth_statuses() created' AS message;
