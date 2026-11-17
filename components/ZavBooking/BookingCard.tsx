"use client";

import { useState } from "react";

/**
 * Right-hand card of the booking section: Cal.com calendar or the audit form.
 * The only client JS in the section. Styles live in ZavBooking.tsx (zb- prefix).
 */

type Tab = "time" | "audit";
type Props = {
  calUrl: string | null;
  email: string | null;
  defaultTab?: Tab;
};

export default function BookingCard({ calUrl, email, defaultTab = "time" }: Props) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    if (data.company_site) return; // honeypot: bots fill this hidden field
    setState("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="zb-card">
      <div role="tablist" className="zb-tabs">
        <button type="button" role="tab" id="zb-tab-time" aria-controls="zb-panel" aria-selected={tab === "time"} className={tab === "time" ? "zb-on" : ""} onClick={() => setTab("time")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM8 13h3" />
          </svg>
          Pick a time
        </button>
        <button type="button" role="tab" id="zb-tab-audit" aria-controls="zb-panel" aria-selected={tab === "audit"} className={tab === "audit" ? "zb-on" : ""} onClick={() => setTab("audit")}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-5 4v-4H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
          </svg>
          Send my details
        </button>
      </div>

      {tab === "time" && (
        <div role="tabpanel" id="zb-panel" aria-labelledby="zb-tab-time">
          {calUrl ? (
            <iframe className="zb-cal" src={calUrl} title="Pick a time for your 15-minute ZAV call" loading="lazy" />
          ) : (
            <div className="zb-soon">
              <strong>Online booking opens soon.</strong>
              <p>Use the &quot;Send my details&quot; tab and we&apos;ll get back to you by email.</p>
            </div>
          )}
          <p className="zb-note">
            Times show in your own time zone.
            {email && (
              <>
                {" "}Can&apos;t find one that works? <a href={`mailto:${email}`}>Email us</a> and we&apos;ll find one.
              </>
            )}
          </p>
        </div>
      )}

      {tab === "audit" && (
        <div role="tabpanel" id="zb-panel" aria-labelledby="zb-tab-audit" className="zb-form">
          {state === "sent" ? (
            <div className="zb-soon">
              <strong>Got it. Your audit is on the way.</strong>
              <p>Look for a short video in your inbox within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3>Get your free Lead Leak Audit</h3>
              <p className="zb-lead">Takes 30 seconds. We&apos;ll email you a short video, made for your business, within 2 business days.</p>

              <div className="zb-fields">
                <label>
                  Your name *
                  <input name="name" required maxLength={100} autoComplete="name" placeholder="Mike Johnson" />
                </label>
                <label>
                  Business name *
                  <input name="business" required maxLength={150} autoComplete="organization" placeholder="Johnson Heating & Air" />
                </label>
                <label>
                  Phone *
                  <input name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder="(555) 123-4567" />
                </label>
                <label>
                  Email *
                  <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" />
                </label>
                <label className="zb-wide">
                  <span>
                    Biggest challenge right now <em>(optional)</em>
                  </span>
                  <textarea name="challenge" rows={3} maxLength={1000} placeholder="e.g. We miss calls on jobs and forget to ask for reviews." />
                </label>
              </div>
              {/* honeypot */}
              <input name="company_site" tabIndex={-1} autoComplete="off" className="zb-hp" aria-hidden="true" />

              {/* Optional. Must stay unticked by default. Only text people who ticked it. */}
              <label className="zb-consent">
                <input name="sms_consent" type="checkbox" value="yes" />
                <span>
                  I agree to receive text messages from ZAV about my request. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to
                  opt out, HELP for help. Consent is not a condition of purchase. See our <a href="/privacy">Privacy Policy</a> and{" "}
                  <a href="/sms-terms">SMS Terms</a>.
                </span>
              </label>

              <button type="submit" className="zb-btn" disabled={state === "sending"}>
                {state === "sending" ? "Sending..." : "Get my free audit"}
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>

              {state === "error" && <p className="zb-err">That didn&apos;t go through. Please try again{email ? ` or email ${email}` : ""}.</p>}
              <p className="zb-fine">No spam and no obligation. Your details are never sold or shared.</p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
