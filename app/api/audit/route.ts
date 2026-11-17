import { NextResponse } from "next/server";

/**
 * Receives the Lead Leak Audit form and forwards it to ZAV's own GHL sub-account
 * (inbound webhook). The webhook URL stays server-side in AUDIT_WEBHOOK_URL.
 */

const LIMITS = { name: 100, business: 150, phone: 30, email: 200, challenge: 1000 } as const;

export async function POST(req: Request) {
  const webhook = process.env.AUDIT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Audit form is not connected yet." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot filled: pretend success so bots learn nothing.
  if (body.company_site) return NextResponse.json({ ok: true });

  const lead: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (value.length > max) return NextResponse.json({ error: `${key} too long` }, { status: 400 });
    lead[key] = value;
  }
  if (!lead.name || !lead.business || !lead.phone || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const smsConsent = body.sms_consent === "yes";

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      sms_consent: smsConsent,
      // Proof of consent: what they agreed to, when, and where.
      sms_consent_at: smsConsent ? new Date().toISOString() : null,
      source: "getzav.com audit form",
      submitted_at: new Date().toISOString(),
    }),
  }).catch(() => null);

  if (!res?.ok) return NextResponse.json({ error: "Could not save" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
