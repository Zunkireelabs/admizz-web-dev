  # Next.js Static Export + Docker + Traefik Template

  > **Usage**: This is the standard template for all Zunkiree Labs website projects. Replace all `{{PLACEHOLDER}}` values with project-specific details.

  ---

  ## Placeholders to Replace

  | Placeholder | Description | Example |
  |-------------|-------------|---------|
  | `{{PROJECT_NAME}}` | Project/Container name (lowercase, hyphens) | `knsewa-web` |
  | `{{DOMAIN_PROD}}` | Production domain | `knsewa.com` |
  | `{{DOMAIN_DEV}}` | Development domain | `knsewa-dev.zunkireelabs.com` |
  | `{{CONTAINER_PORT}}` | Internal container port (usually 80) | `80` |
  | `{{NODE_VERSION}}` | Node.js version | `20-alpine` |

  ---

  ## 1. Technical Stack

  | Component | Technology | Reasoning |
  |-----------|------------|-----------|
  | **Framework** | Next.js 16 (Static Export) | Components, Fast Refresh, Modern Eco |
  | **Styling** | Tailwind CSS v4 | Performance, Rapid UI dev |
  | **Animations** | Framer Motion | Premium interactions |
  | **Icons** | Lucide React | Clean, consistent SVG icons |
  | **Server** | Nginx Alpine (Docker) | Lightweight, Production-grade serving |
  | **Proxy** | Traefik | Auto SSL, Routing |

  ---

  ## 2. Project Structure

  ```
  {{PROJECT_NAME}}/
  ├── .brain/                   # AI Context
  ├── docs/                     # Documentation
  ├── nginx/                    # Nginx Configs
  │   └── static.conf           # Serves content in container
  ├── public/                   # Static Assets
  │   ├── images/
  │   └── favicon.ico
  ├── src/
  │   ├── app/                  # App Router
  │   │   ├── layout.tsx
  │   │   ├── page.tsx
  │   │   └── globals.css
  │   ├── components/           # UI Components
  │   │   ├── ui/
  │   │   └── layout/
  │   ├── lib/                  # Utilities/Constants
  │   └── types/                # TS Types
  ├── Dockerfile                # Production Build
  ├── docker-compose.yml        # Production Orchestration
  ├── docker-compose.dev.yml    # Development (VPS Preview)
  ├── deploy.sh                 # Deployment Script
  ├── next.config.ts            # Next.js Config
  └── package.json
  ```

  ---

  ## 3. Configuration Files

  ### next.config.ts
  **Critical**: Enables static export mode.

  ```typescript
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    output: "export",        // <--- REQUIRED for Docker/Nginx
    trailingSlash: true,     // <--- Recommended for static hosting
    images: {
      unoptimized: true,     // <--- REQUIRED (Start with this)
    },
    eslint: {
      ignoreDuringBuilds: true, // Prevents build fail on minor lint errors
    },
  };

  export default nextConfig;
  ```

  ### Dockerfile
  Multi-stage build not needed if we build locally. Simple serving container:

  ```dockerfile
  FROM nginx:alpine

  # Remove default nginx config
  RUN rm /etc/nginx/conf.d/default.conf

  # Copy custom static config
  COPY nginx/static.conf /etc/nginx/conf.d/default.conf

  # Copy built assets (from local 'out' folder)
  COPY out/ /usr/share/nginx/html/

  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```

  ### nginx/static.conf

  ```nginx
  server {
      listen 80;
      server_name _;
      root /usr/share/nginx/html/;
      index index.html;

      # Cache Static Assets (1 Year)
      location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
          expires 1y;
          add_header Cache-Control "public, immutable";
      }

      # SPA Fallback (Everything else -> index.html)
      location / {
          try_files $uri $uri/ $uri.html /index.html;
      }

      # Gzip Compression
      gzip on;
      gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
  }
  ```

  ---

  ## 4. Docker Compose Templates

  ### docker-compose.yml (Production)

  ```yaml
  services:
    {{PROJECT_NAME}}-prod:
      build: .
      container_name: {{PROJECT_NAME}}-prod
      restart: unless-stopped
      networks:
        - hosting
      labels:
        - "traefik.enable=true"
        # Router
        - "traefik.http.routers.{{PROJECT_NAME}}-prod.rule=Host(`{{DOMAIN_PROD}}`) || Host(`www.{{DOMAIN_PROD}}`)"
        - "traefik.http.routers.{{PROJECT_NAME}}-prod.entrypoints=websecure"
        - "traefik.http.routers.{{PROJECT_NAME}}-prod.tls.certresolver=letsencrypt"
        # Service
        - "traefik.http.services.{{PROJECT_NAME}}-prod.loadbalancer.server.port=80"
        # Middleware: WWW Redirect (Optional)
        - "traefik.http.middlewares.{{PROJECT_NAME}}-www-redirect.redirectregex.regex=^https://www\\.{{DOMAIN_PROD}}/(.*)"
        - "traefik.http.middlewares.{{PROJECT_NAME}}-www-redirect.redirectregex.replacement=https://{{DOMAIN_PROD}}/$${1}"
        - "traefik.http.routers.{{PROJECT_NAME}}-prod.middlewares={{PROJECT_NAME}}-www-redirect"

  networks:
    hosting:
      external: true
  ```

  ### docker-compose.dev.yml (VPS Preview)

  ```yaml
  services:
    {{PROJECT_NAME}}-dev:
      build: .
      container_name: {{PROJECT_NAME}}-dev
      restart: unless-stopped
      networks:
        - hosting
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.{{PROJECT_NAME}}-dev.rule=Host(`{{DOMAIN_DEV}}`)"
        - "traefik.http.routers.{{PROJECT_NAME}}-dev.entrypoints=websecure"
        - "traefik.http.routers.{{PROJECT_NAME}}-dev.tls.certresolver=letsencrypt"
        - "traefik.http.services.{{PROJECT_NAME}}-dev.loadbalancer.server.port=80"

  networks:
    hosting:
      external: true
  ```

  ---

  ## 5. Deployment Script (deploy.sh)

  ```bash
  #!/bin/bash
  set -e

  # Usage: ./deploy.sh [dev|prod]
  ENV=${1:-dev}

  if [ "$ENV" == "prod" ]; then
      COMPOSE_FILE="docker-compose.yml"
      CONTAINER_NAME="{{PROJECT_NAME}}-prod"
      URL="{{DOMAIN_PROD}}"
      echo "⚠️  PRODUCTION DEPLOYMENT to $URL"
      read -p "Are you sure? (y/n): " confirm
      if [ "$confirm" != "y" ]; then exit 1; fi
  else
      COMPOSE_FILE="docker-compose.dev.yml"
      CONTAINER_NAME="{{PROJECT_NAME}}-dev"
      URL="{{DOMAIN_DEV}}"
      echo "🚧 DEVELOPMENT DEPLOYMENT to $URL"
  fi

  echo "1. Building Next.js App..."
  npm install
  npm run build
  # Check if output exists
  if [ ! -d "out" ]; then
      echo "❌ Build failed. 'out' directory not found."
      exit 1
  fi

  echo "2. Building Docker Image..."
  docker compose -f $COMPOSE_FILE build --no-cache

  echo "3. Restarting Container..."
  docker compose -f $COMPOSE_FILE down 2>/dev/null || true
  docker compose -f $COMPOSE_FILE up -d

  echo "✅ Deployment Success!"
  echo "👉 $URL"
  ```

  ## 6. How to Start a New Project

  1.  **Clone/Copy** this template structure.
  2.  **Install**: `npm install` (Make sure `package.json` matches the stack).
  3.  **Search & Replace**: Replace `{{PROJECT_NAME}}`, `{{DOMAIN_PROD}}`, etc.
  4.  **Dev**: Run `npm run dev` locally to code.
  5.  **Deploy**: Push `deploy.sh` and run on VPS.
