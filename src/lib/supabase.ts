import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// detectSessionInUrl is OFF on purpose. The affiliate-dashboard page owns the
// invite-flow handshake explicitly (sign out any stale session, then call
// setSession / exchangeCodeForSession with the tokens it reads from the URL).
// Letting supabase-js auto-detect created races where a stale localStorage
// session won and the invite tokens were silently dropped.
export const supabase = createClient(url, anonKey, {
  auth: {
    detectSessionInUrl: false,
    persistSession: true,
    autoRefreshToken: true,
    flowType: "implicit",
  },
});
