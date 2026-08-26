const CONTACT_TO = "contacto@brusan.ar";
const CONTACT_FROM = "contacto@brusan.ar";
const CONTACT_FROM_NAME = "BRUSAN";
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

  const subject = `Consulta web — ${name}`;
  const text = [
    "Nueva consulta desde brusan.ar",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    phone ? `Teléfono: ${phone}` : "Teléfono: —",
    "",
    "Mensaje:",
    message,
  ].join("\n");

  const html = [
    `<p><strong>Nueva consulta desde brusan.ar</strong></p>`,
    `<p><strong>Nombre:</strong> ${escapeHtml(name)}<br>`,
    `<strong>Email:</strong> ${escapeHtml(email)}<br>`,
    `<strong>Teléfono:</strong> ${escapeHtml(phone || "—")}</p>`,
    `<p><strong>Mensaje:</strong></p>`,
    `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  ].join("");

  try {
    const sent = await sendContactEmail(env, { name, email, subject, text, html });
    return json({ ok: true, needsConfirm: Boolean(sent && sent.needsConfirm) });
  } catch (error) {
    if (error && error.code === "email_not_configured") {
      console.error(JSON.stringify({ event: "contact_email_unbound" }));
      return json({ ok: false, error: "email_not_configured" }, 503);
    }
    const detail = sanitizeSendDetail(error);
    console.error(
      JSON.stringify({
        event: "contact_email_failed",
        code: error && error.code,
        detail,
      }),
    );
    return json({ ok: false, error: "send_failed", detail }, 502);
  }
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

async function sendContactEmail(env, { name, email, subject, text, html }) {
  if (env.EMAIL && typeof env.EMAIL.send === "function") {
    try {
      await env.EMAIL.send({
        to: CONTACT_TO,
        from: { email: CONTACT_FROM, name: CONTACT_FROM_NAME },
        replyTo: { email, name },
        subject,
        text,
        html,
      });
      return { needsConfirm: false };
    } catch (error) {
      try {
        const { EmailMessage } = await import("cloudflare:email");
        await env.EMAIL.send(
          new EmailMessage(
            CONTACT_FROM,
            CONTACT_TO,
            buildRawMime({
              fromName: CONTACT_FROM_NAME,
              fromEmail: CONTACT_FROM,
              to: CONTACT_TO,
              replyName: name,
              replyEmail: email,
              subject,
              text,
              html,
            }),
          ),
        );
        return { needsConfirm: false };
      } catch {
        // Pages cannot use send_email; use the free form mailbox instead.
      }
    }
  }

  return sendViaFormSubmit({ name, email, subject, text });
}

async function sendViaFormSubmit({ name, email, subject, text }) {
  const res = await fetch(
    "https://formsubmit.co/ajax/" + encodeURIComponent(CONTACT_TO),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message: text,
        _subject: subject,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    },
  );
  const data = await res.json().catch(() => ({}));
  const ok = data.success === true || data.success === "true";
  if (!res.ok || !ok) {
    const failed = new Error("formsubmit_failed");
    failed.code = "formsubmit_failed";
    failed.cfStatus = res.status;
    failed.cfErrors = data.message ? [{ message: String(data.message).slice(0, 180) }] : [];
    throw failed;
  }
  const message = String(data.message || "").toLowerCase();
  return {
    needsConfirm: message.includes("confirm") || message.includes("activat"),
  };
}

function sanitizeSendDetail(error) {
  const first =
    error &&
    Array.isArray(error.cfErrors) &&
    error.cfErrors.find((item) => item && (item.message || item.code));
  if (first) {
    const code = first.code != null ? String(first.code) : "";
    const message = first.message ? String(first.message).slice(0, 180) : "";
    return [code, message].filter(Boolean).join(": ");
  }
  if (error && error.cfStatus) return "http_" + error.cfStatus;
  if (error && error.code) return String(error.code);
  return "send_failed";
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function encodeHeader(value) {
  const text = oneLine(value);
  if (/^[\x20-\x7E]*$/.test(text)) return text;
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return `=?UTF-8?B?${btoa(bin)}?=`;
}

function buildRawMime({
  fromName,
  fromEmail,
  to,
  replyName,
  replyEmail,
  subject,
  text,
  html,
}) {
  const boundary = `brusan_${crypto.randomUUID().replace(/-/g, "")}`;
  return [
    `From: ${encodeHeader(fromName)} <${fromEmail}>`,
    `To: <${to}>`,
    `Reply-To: ${encodeHeader(replyName)} <${replyEmail}>`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");
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
