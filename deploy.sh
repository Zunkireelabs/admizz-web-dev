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
rm -rf out .next/cache
npm run build
chmod -R g+rwX .next node_modules 2>/dev/null || true

[ ! -d out ] && echo "ERROR: out/ not produced" && exit 1

# ── Step 3: Deploy containers ───────────────────────────────────────────────
if [ "$WEBHOOK_TRIGGERED" == "1" ]; then
    # Webhook: deploy dev + prod simultaneously using the same out/
    echo "3. Deploying to dev and prod in parallel..."
    deploy_container dev &
    PID_DEV=$!
    deploy_container prod &
    PID_PROD=$!
    wait $PID_DEV
    wait $PID_PROD
    echo "All deployments complete — dev and prod are live"
else
    # Manual deploy: single env only
    echo "3. Deploying to $ENV..."
    deploy_container "$ENV"
fi
