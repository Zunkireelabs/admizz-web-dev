-- Allow authenticated users (affiliate dashboard, logged-in users) to insert register_leads.
-- Previously only anon could insert, which blocked form submissions when an affiliate
-- (or anyone with an active Supabase session) filled the consultation form.
-- Symptom: 403 Forbidden on POST /register_leads → cascading FK error on affiliate_referrals.
CREATE POLICY "authenticated_insert_register_leads"
  ON public.register_leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
