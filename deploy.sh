#!/bin/bash
set -e

ENV=${1:-dev}

if [ "$ENV" != "dev" ] && [ "$ENV" != "prod" ]; then
    echo "Usage: ./deploy.sh [dev|prod]" && exit 1
fi

# ── Docker deploy only (no build) ──────────────────────────────────────────
deploy_container() {
    local env=$1
    local compose_file url

    if [ "$env" == "prod" ]; then
        compose_file="docker-compose.yml"
        url="admizzeducation.com"
    else
        compose_file="docker-compose.dev.yml"
        url="dev-web.admizzeducation.com"
    fi

    echo "[$env] Building Docker image..."
    docker compose -f "$compose_file" build

    echo "[$env] Restarting container..."
    docker compose -f "$compose_file" down 2>/dev/null || true
    docker compose -f "$compose_file" up -d

    echo "[$env] Live: https://$url"
}

# ── Step 1: Install deps ────────────────────────────────────────────────────
echo "1. Installing deps..."
npm install --legacy-peer-deps

# ── Step 2: Build Next.js (runs once regardless of env count) ───────────────
echo "2. Building Next.js static export..."
# Remove all of .next, not just the cache: stale .next/dev/types from earlier runs
# reference deleted pages and fail the type check ("Cannot find module ... page.js").
rm -rf out .next
npm run build
chmod -R g+rwX .next node_modules 2>/dev/null || true

[ ! -d out ] && echo "ERROR: out/ not produced" && exit 1

# ── Step 3: Deploy containers ───────────────────────────────────────────────
echo "3. Deploying to $ENV..."
deploy_container "$ENV"
