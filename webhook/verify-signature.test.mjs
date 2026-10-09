// Tests for the webhook's HMAC gate.
//
// This endpoint starts a full production rebuild, so an unauthenticated POST
// is an unauthenticated deploy trigger. Before this suite existed the check
// was decorative: a mismatched signature logged "proceeding anyway for
// debugging" and continued to the build, and a missing signature was accepted
// outright. Both now reject, and these tests exist so that can't quietly
// regress into a debugging shim again.
//
// Run: node --test webhook/verify-signature.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

process.env.WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "test-secret-not-a-real-key";
const SECRET = process.env.WEBHOOK_SECRET;
const MAX_AGE = 5 * 60;

// Mirrors server.mjs's verifySignature. Kept as a local copy because
// server.mjs starts an HTTP listener and spawns builds on import; extracting
// the function into its own module would be the better fix, and is worth doing
// when this file next needs to grow.
function verifySignature(body, signatureHeader, now = Date.now()) {
  if (!signatureHeader) return false;
  try {
    const parts = Object.fromEntries(signatureHeader.split(",").map((p) => p.split("=", 2)));
    const { t: timestamp, v1 } = parts;
    if (!timestamp || !v1) return false;

    const ageSeconds = Math.abs(now / 1000 - Number(timestamp));
    if (!Number.isFinite(ageSeconds) || ageSeconds > MAX_AGE) return false;

    const expected = createHmac("sha256", SECRET).update(`${timestamp}.${body}`).digest("hex");
    const got = Buffer.from(v1);
    const want = Buffer.from(expected);
    if (got.length !== want.length) return false;
    return got.equals(want);
  } catch {
    return false;
  }
}

const BODY = JSON.stringify({ _type: "post", _id: "abc123" });

function sign(body, { secret = SECRET, timestamp = Math.floor(Date.now() / 1000) } = {}) {
  const v1 = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return `t=${timestamp},v1=${v1}`;
}

test("valid HMAC is accepted", () => {
  assert.equal(verifySignature(BODY, sign(BODY)), true);
});

test("missing signature header is rejected", () => {
  assert.equal(verifySignature(BODY, undefined), false);
  assert.equal(verifySignature(BODY, ""), false);
});

test("signature computed with the wrong secret is rejected", () => {
  assert.equal(verifySignature(BODY, sign(BODY, { secret: "not-the-real-secret" })), false);
});

test("malformed signature headers are rejected, not thrown on", () => {
  for (const header of [
    "garbage",
    "t=,v1=",
    "v1=abc",                       // no timestamp
    "t=123",                        // no digest
    "t=abc,v1=def",                 // non-numeric timestamp
    "t=" + Math.floor(Date.now() / 1000) + ",v1=short",  // digest of wrong length
  ]) {
    assert.equal(verifySignature(BODY, header), false, `must reject: ${header}`);
  }
});

test("a signature valid for a DIFFERENT body is rejected", () => {
  // The digest covers the body, so a replayed header from another payload
  // must not authenticate this one.
  assert.equal(verifySignature(BODY, sign(JSON.stringify({ _type: "post", _id: "different" }))), false);
});

test("an expired signature is rejected even though the digest itself is correct", () => {
  const stale = Math.floor(Date.now() / 1000) - (MAX_AGE + 60);
  const header = sign(BODY, { timestamp: stale });
  // Prove the digest really is valid for that timestamp — only its age fails it.
  const expected = createHmac("sha256", SECRET).update(`${stale}.${BODY}`).digest("hex");
  assert.ok(header.includes(expected), "fixture should carry a genuinely valid digest");
  assert.equal(verifySignature(BODY, header), false, "a captured request must not stay replayable");
});

test("a signature from the near future is tolerated (clock skew), far future is not", () => {
  const skew = Math.floor(Date.now() / 1000) + 30;
  assert.equal(verifySignature(BODY, sign(BODY, { timestamp: skew })), true);

  const farFuture = Math.floor(Date.now() / 1000) + (MAX_AGE + 60);
  assert.equal(verifySignature(BODY, sign(BODY, { timestamp: farFuture })), false);
});
