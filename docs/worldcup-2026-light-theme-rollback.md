# WC2026 Light Theme — Rollback Reference

Created: 2026-06-11 (before light theme migration)
Pre-migration commit: `a199faf`

---

## Layer 1 — Git Tag

```bash
# Restore all WC2026 files to dark theme
git checkout wc2026-dark-theme-backup -- \
  public/events/css/worldcup-2026.css \
  src/lib/wc2026/tokens.ts \
  src/components/wc2026/

# Diff against current
git diff wc2026-dark-theme-backup -- public/events/css/worldcup-2026.css

# View the tag
git show wc2026-dark-theme-backup
```

---

## Layer 2 — File-Level `.dark-backup` Files

20 files backed up:
- `public/events/css/worldcup-2026.css.dark-backup`
- `src/lib/wc2026/tokens.ts.dark-backup`
- `src/components/wc2026/sections/*.tsx.dark-backup` (10 files)
- `src/components/wc2026/shared/*.tsx.dark-backup` (8 files)

```bash
# Restore a single file
cp public/events/css/worldcup-2026.css.dark-backup public/events/css/worldcup-2026.css

# Restore all CSS
cp public/events/css/worldcup-2026.css.dark-backup public/events/css/worldcup-2026.css

# Restore all components
for f in src/components/wc2026/sections/*.tsx.dark-backup; do cp "$f" "${f%.dark-backup}"; done
for f in src/components/wc2026/shared/*.tsx.dark-backup; do cp "$f" "${f%.dark-backup}"; done

# Restore tokens
cp src/lib/wc2026/tokens.ts.dark-backup src/lib/wc2026/tokens.ts
```

---

## Layer 3 — Docker Image Tag

Tagged: `admizz-edu-web-dev-admizz-edu-web-dev:dark-backup`

```bash
# Revert live dev site to dark version (no rebuild needed)
docker tag admizz-edu-web-dev-admizz-edu-web-dev:dark-backup admizz-edu-web-dev-admizz-edu-web-dev:latest
docker compose -f docker-compose.dev.yml up -d

# Verify
docker logs admizz-edu-web-dev -f --tail 20
```

---

## Cleanup (After Light Theme Approved)

Wait ~1 week of dev stability before running:

```bash
# Remove all .dark-backup files
find . -name "*.dark-backup" -delete

# Remove Docker backup tag
docker rmi admizz-edu-web-dev-admizz-edu-web-dev:dark-backup

# Keep the git tag forever (zero cost)
```

---

## Files Being Modified in Migration

CSS (heaviest):
- `public/events/css/worldcup-2026.css`

Tokens:
- `src/lib/wc2026/tokens.ts`

Section components (class swaps + minor inline style updates):
- All files in `src/components/wc2026/sections/`
- Selected files in `src/components/wc2026/shared/`

**Untouched:**
- ESPN data layer (`src/lib/wc2026/espn/*`)
- LiveProvider
- Page + layout (`src/app/events/worldcup-2026/`)
- Build config, Docker config, nginx config
