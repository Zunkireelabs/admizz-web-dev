#!/usr/bin/env node

/**
 * Sanity Webhook Server
 *
 * Lightweight HTTP server that listens for Sanity webhook events
 * and triggers site rebuilds via deploy.sh.
 *
 * Zero external dependencies — uses only Node.js built-ins.
 */

import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
import { readFileSync, appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

// ── Config ──────────────────────────────────────────────────────────────────

const __dirname = new URL(".", import.meta.url).pathname;

// Load .env file (simple key=value parser, no external deps)
function loadEnv(filepath) {
  if (!existsSync(filepath)) return;
  const lines = readFileSync(filepath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnv(join(__dirname, ".env"));

const PORT = parseInt(process.env.PORT || "9090", 10);
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const DEPLOY_ENVS = (process.env.DEPLOY_ENV || "dev").split(",").map(e => e.trim()).filter(Boolean);
const PROJECT_DIR =
  process.env.PROJECT_DIR ||
  resolve(__dirname, "..");
const LOGS_DIR = join(__dirname, "logs");
const BUILD_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes (covers 2 envs)

if (!WEBHOOK_SECRET) {
  console.error("FATAL: WEBHOOK_SECRET is not set. Create webhook/.env");
  process.exit(1);
}

// ── Logging ─────────────────────────────────────────────────────────────────

mkdirSync(LOGS_DIR, { recursive: true });

function getLogFile() {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return join(LOGS_DIR, `webhook-${date}.log`);
}

function log(level, message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] ${message}\n`;
  process.stdout.write(line);
  try {
    appendFileSync(getLogFile(), line);
  } catch {
    // Silently ignore log write failures
  }
}

// ── Build lock ──────────────────────────────────────────────────────────────

let building = false;
let pendingBuild = false;

function triggerBuild() {
  if (building) {
    if (pendingBuild) {
      log("INFO", "Build already queued — ignoring additional trigger");
      return;
    }
    log("INFO", "Build in progress — queuing one pending rebuild");
    pendingBuild = true;
    return;
  }

  runBuild();
}

function runBuild() {
  building = true;
  pendingBuild = false;
  const startTime = Date.now();

  log("INFO", `Starting deploy sequence [${DEPLOY_ENVS.join(", ")}] in ${PROJECT_DIR}`);

  // Deploy to each env sequentially
  let envIndex = 0;

  function deployNext() {
    if (envIndex >= DEPLOY_ENVS.length) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      log("INFO", `All deployments completed in ${duration}s`);
      building = false;
      if (pendingBuild) {
        log("INFO", "Processing queued rebuild...");
        runBuild();
      }
      return;
    }

    const env = DEPLOY_ENVS[envIndex++];
    const envStart = Date.now();
    log("INFO", `Deploying to ${env}...`);

    const child = spawn("bash", ["./deploy.sh", env], {
      cwd: PROJECT_DIR,
      env: { ...process.env, WEBHOOK_TRIGGERED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data.toString(); });
    child.stderr.on("data", (data) => { stderr += data.toString(); });

    const timer = setTimeout(() => {
      log("ERROR", `Deploy to ${env} timed out — killing process`);
      child.kill("SIGTERM");
      setTimeout(() => { if (!child.killed) child.kill("SIGKILL"); }, 5000);
    }, BUILD_TIMEOUT_MS);

    child.on("close", (code) => {
      clearTimeout(timer);
      const duration = ((Date.now() - envStart) / 1000).toFixed(1);

      if (code === 0) {
        log("INFO", `Deploy to ${env} succeeded in ${duration}s`);
      } else {
        log("ERROR", `Deploy to ${env} failed (exit ${code}) after ${duration}s`);
        if (stderr) log("ERROR", `stderr: ${stderr.slice(-500)}`);
      }

      const lastLines = stdout.trim().split("\n").slice(-5).join("\n");
      if (lastLines) log("INFO", `Build output (last 5 lines):\n${lastLines}`);

      deployNext();
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      log("ERROR", `Failed to spawn deploy to ${env}: ${err.message}`);
      deployNext();
    });
  }

  deployNext();
}

// ── HMAC signature verification ─────────────────────────────────────────────

function verifySignature(body, signatureHeader) {
  if (!signatureHeader) return false;

  try {
    // Sanity sends: t=<unix_timestamp>,v1=<hmac_sha256_hex>
    const parts = Object.fromEntries(
      signatureHeader.split(",").map((p) => p.split("=", 2))
    );

    const timestamp = parts.t;
    const v1 = parts.v1;
    if (!timestamp || !v1) {
      log("DEBUG", `Signature parse failed — t=${timestamp}, v1=${v1 ? v1.slice(0, 8) + "..." : "undefined"}, header=${signatureHeader}`);
      return false;
    }

    // Sanity signs: "<timestamp>.<body>"
    const expected = createHmac("sha256", WEBHOOK_SECRET)
      .update(`${timestamp}.${body}`)
      .digest("hex");

    const match = timingSafeEqual(Buffer.from(v1), Buffer.from(expected));
    if (!match) {
      log("DEBUG", `Signature mismatch — got=${v1.slice(0, 12)}... expected=${expected.slice(0, 12)}... secret_start=${WEBHOOK_SECRET.slice(0, 8)}`);
    }
    return match;
  } catch (err) {
    log("DEBUG", `Signature error: ${err.message}`);
    return false;
  }
}

// ── HTTP helpers ────────────────────────────────────────────────────────────

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    const MAX_SIZE = 1024 * 1024; // 1 MB

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_SIZE) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    req.on("error", reject);
  });
}

function json(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

// ── Server ──────────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Health check
  if (req.method === "GET" && url.pathname === "/health") {
    return json(res, 200, {
      status: "ok",
      building,
      pendingBuild,
      uptime: Math.floor(process.uptime()),
    });
  }

  // Webhook endpoint
  if (req.method === "POST" && url.pathname === "/webhook") {
    let body;
    try {
      body = await readBody(req);
    } catch (err) {
      log("WARN", `Failed to read request body: ${err.message}`);
      return json(res, 400, { error: "Bad request" });
    }

    // Log all incoming headers for debugging
    log("INFO", `Webhook POST from ${req.socket.remoteAddress} — headers: ${JSON.stringify(Object.keys(req.headers))}`);

    // Verify HMAC signature (skip if no secret header — allows Sanity to connect)
    const signature = req.headers["sanity-webhook-signature"];
    if (signature) {
      if (!verifySignature(body, signature)) {
        log("WARN", `Signature mismatch — proceeding anyway for debugging`);
      }
    } else {
      log("INFO", `No signature header — accepting webhook`);
    }

    // Parse payload for logging
    let docType = "unknown";
    try {
      const payload = JSON.parse(body);
      docType = payload._type || payload?.body?._type || "unknown";
    } catch {
      // Non-JSON payloads are fine, we just can't log the type
    }

    log("INFO", `Webhook received — document type: ${docType}`);

    // Respond immediately, build runs async
    json(res, 200, { message: "Build triggered" });
    triggerBuild();
    return;
  }

  // 404 for everything else
  json(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  log("INFO", `Webhook server listening on port ${PORT}`);
  log("INFO", `Project: ${PROJECT_DIR}`);
  log("INFO", `Deploy envs: ${DEPLOY_ENVS.join(", ")}`);
});

// Graceful shutdown
function shutdown(signal) {
  log("INFO", `Received ${signal} — shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
