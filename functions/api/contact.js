const MAX_BODY_BYTES = 12_000;
const MIN_FILL_MS = 800;
const MAX_FILL_MS = 1000 * 60 * 60 * 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestGet(context) {
  const siteKey = String((context.env && context.env.TURNSTILE_SITE_KEY) || "");
  return json({
    ok: true,
    turnstile: Boolean(siteKey),
    siteKey: siteKey || null,
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!isAllowedOrigin(request)) {
    return json({ ok: false, error: "forbidden" }, 403);
  }

  if (isAutomatedClient(request)) {
    return json({ ok: true });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "too_large" }, 413);
  }

  let raw;
  try {
    raw = await parseBody(request);
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  if (oneLine(raw.website) || oneLine(raw.company)) {
    return json({ ok: true });
  }

  if (!isHumanTiming(raw.started)) {
    return json({ ok: false, error: "too_fast" }, 403);
  }

  const name = oneLine(raw.name);
  const email = oneLine(raw.email).toLowerCase();
  const phone = oneLine(raw.phone);
  const message = String(raw.message || "").trim();

  if (name.length < 2 || name.length > 80) {
    return json({ ok: false, error: "invalid_name" }, 400);
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }
  if (phone.length > 40) {
    return json({ ok: false, error: "invalid_phone" }, 400);
  }
  if (message.length < 10 || message.length > 4000) {
    return json({ ok: false, error: "invalid_message" }, 400);
  }

  if (env.TURNSTILE_SECRET) {
    const token = String(raw.turnstileToken || raw["cf-turnstile-response"] || "");
    const passed = await verifyTurnstile(token, env.TURNSTILE_SECRET, request);
    if (!passed) {
      return json({ ok: false, error: "captcha" }, 403);
    }
  }

  return json({ ok: true });
}

export async function onRequest(context) {
  const method = context.request.method;
  if (method === "GET") return onRequestGet(context);
  if (method === "POST") return onRequestPost(context);
  return json({ ok: false, error: "method_not_allowed" }, 405);
}

async function parseBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await request.json();
    if (!data || typeof data !== "object") throw new Error("invalid_json");
    return data;
  }
  const form = await request.formData();
  return Object.fromEntries(form);
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    return (
      host === "brusan.ar" ||
      host === "www.brusan.ar" ||
      host.endsWith(".pages.dev") ||
      isLocalHostname(host)
    );
  } catch {
    return false;
  }
}

function isLocalHostname(host) {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".localhost")
  );
}

function isAutomatedClient(request) {
  const score = request.cf && request.cf.botManagement && request.cf.botManagement.score;
  return typeof score === "number" && score < 2;
}

function isHumanTiming(started) {
  const startedAt = Number(started);
  if (!Number.isFinite(startedAt)) return true;
  const elapsed = Date.now() - startedAt;
  if (elapsed < 0) return Math.abs(elapsed) < 60 * 1000;
  return elapsed >= MIN_FILL_MS && elapsed <= MAX_FILL_MS;
}

async function verifyTurnstile(token, secret, request) {
  if (!token || !secret) return false;
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = await res.json();
    return Boolean(data && data.success);
  } catch {
    return false;
  }
}

function oneLine(value) {
  return String(value || "")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
