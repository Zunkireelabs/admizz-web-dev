#!/bin/bash
set -e

# Usage: ./deploy.sh [dev|prod]
ENV=${1:-dev}

if [ "$ENV" == "prod" ]; then
    COMPOSE_FILE="docker-compose.yml"
    URL="admizzeducation.com"
    echo "PRODUCTION DEPLOYMENT to $URL"
    echo "Root password required to proceed."
    su -c "echo 'Root access verified.'" root
    echo "Proceeding with production deployment..."
elif [ "$ENV" == "dev" ]; then
    COMPOSE_FILE="docker-compose.dev.yml"
    URL="dev-web.admizzeducation.com"
    echo "DEVELOPMENT DEPLOYMENT to $URL"
else
    echo "Usage: ./deploy.sh [dev|prod]"
    exit 1
fi

echo "1. Installing dependencies..."
npm install

echo "2. Building Next.js app..."
npm run build

if [ ! -d "out" ]; then
    echo "Build failed. 'out' directory not found."
    exit 1
fi

echo "3. Building Docker image..."
docker compose -f "$COMPOSE_FILE" build --no-cache

echo "4. Restarting container..."
docker compose -f "$COMPOSE_FILE" down 2>/dev/null || true
docker compose -f "$COMPOSE_FILE" up -d

echo "Deployment complete: $URL"
