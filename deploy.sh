#!/bin/bash
set -e

ENV=${1:-dev}

if [ "$ENV" == "prod" ]; then
    COMPOSE_FILE="docker-compose.yml"
    URL="admizzeducation.com"
elif [ "$ENV" == "dev" ]; then
    COMPOSE_FILE="docker-compose.dev.yml"
    URL="dev-web.admizzeducation.com"
else
    echo "Usage: ./deploy.sh [dev|prod]" && exit 1
fi

echo "1. Installing deps (npm ci)..."
# Use Python shutil for reliable node_modules cleanup (plain rm -rf fails on this system)
python3 -c "import shutil; shutil.rmtree('node_modules', ignore_errors=True)"
npm install --legacy-peer-deps

echo "2. Building Next.js static export..."
rm -rf out
npm run build
chmod -R g+rwX .next node_modules

[ ! -d out ] && echo "ERROR: out/ not produced" && exit 1

echo "3. Building Docker image..."
docker compose -f "$COMPOSE_FILE" build

echo "4. Restarting container..."
docker compose -f "$COMPOSE_FILE" down 2>/dev/null || true
docker compose -f "$COMPOSE_FILE" up -d

echo "Deployment complete: https://$URL"
