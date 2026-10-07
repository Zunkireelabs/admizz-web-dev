# Route2Uni raw imports

Manual, permission-based data drop. For each university:

1. In the Route2Uni portal (logged in), open the university.
2. In DevTools → Network, right-click the `…/api/universities/<id>?activeIntake=true`
   request → **Copy → Copy response**.
3. Save it here as `<id>.json` (e.g. `100034.json`).
4. Run `node scripts/import-route2uni.mjs` to regenerate the profiles.

The importer strips agent-only data (CAS deposits, internal "Consent Form", etc.)
and writes student-facing profiles to `src/lib/university-kb/universities/imported/`.

These raw files are git-ignored (they can contain signed URLs); only the
generated profiles are committed.
