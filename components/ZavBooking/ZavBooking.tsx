import { site } from "@/lib/site";
import BookingCard from "./BookingCard";

/**
 * Booking section (#book). Every booking button on the page links here.
 * Design provided by Mubasshir, do not redesign.
 *
 * Server Component: the left column and Q&A ship as plain HTML. Only BookingCard
 * (tabs, Cal.com iframe, audit form) is client JS.
 *
 * SELF-CONTAINED ON PURPOSE: all styling lives in the CSS string below under the
 * "zb-" prefix. Do not convert it to Tailwind utility classes.
 */

const FACTS = ["15-minute call", "Live test, not slides", "No contract"];

const STEPS: [string, string][] = [
  ["You test it live.", "Call our demo line and hang up. A text lands on your own phone in seconds."],
  ["You see what your customers see.", "The website and the review request, right on your phone."],
  ["You get a straight answer.", "If it fits, it's $199 a month with no contract. If it doesn't, we'll tell you."],
];

const ANSWERS: [string, string][] = [
  ["Is this a sales pitch?", "No. Most of the 15 minutes is you testing it on your own phone. If ZAV isn't right for your business, we'll say so."],
  ["Do I need to prepare anything?", "No. Just have your phone with you. A link to your website or Google listing helps, but it isn't needed."],
  ["What if I need to reschedule?", "Use the link in your confirmation email. You don't need to call anyone."],
];

/** Cal.com booking page as an embeddable URL, or null until calLink is set. */
function calEmbedUrl(link: string | null) {
  if (!link) return null;
  const url = new URL(link.startsWith("http") ? link : `https://cal.com/${link}`);
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "light");
  url.searchParams.set("layout", "month_view");
  return url.toString();
}

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function ZavBooking() {
  const email = site.supportEmail;

  return (
    <section id="book" className="zb">
      <style>{CSS}</style>
      <div className="zb-wrap">
        <div className="zb-grid">
          {/* ---------- Left: what the call is ---------- */}
          <div>
            <p className="zb-eyebrow">Book a call</p>
            <h2 className="zb-h2">
              See it work on <span>your own phone.</span>
            </h2>

            <ul className="zb-facts">
              {FACTS.map((f) => (
                <li key={f}>
                  <Check />
                  {f}
                </li>
              ))}
            </ul>

            <ol className="zb-steps">
              {STEPS.map(([title, body], i) => (
                <li key={title}>
                  <span className="zb-num">{i + 1}</span>
                  <p>
                    <b>{title}</b> {body}
                  </p>
                </li>
              ))}
            </ol>

            {site.hostName && (
              <div className="zb-host">
                <b>You&apos;ll talk with {site.hostName}.</b> No sales script and no pressure.
              </div>
            )}

            {email && (
              <p className="zb-mail">
                Prefer email? <a href={`mailto:${email}`}>{email}</a>
              </p>
            )}
          </div>

          {/* ---------- Right: calendar or audit form ---------- */}
          <BookingCard calUrl={calEmbedUrl(site.calLink)} email={email} />
        </div>

        {/* ---------- Bottom: three answers about the call ---------- */}
        <div className="zb-qa">
          {ANSWERS.map(([q, a]) => (
            <div key={q}>
              <b>{q}</b>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CSS = `
.zb{--zb-sky:#1ea7ec;--zb-ink:#11131a;scroll-margin-top:80px;padding:112px 20px;color:#fff;text-align:left;
  background-color:#0d1620;
  background-image:radial-gradient(760px 520px at 88% 12%,rgba(30,167,236,.22),transparent 70%),radial-gradient(620px 420px at 0% 100%,rgba(30,167,236,.10),transparent 70%),linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
  background-size:auto,auto,56px 56px,56px 56px}
.zb *,.zb *::before,.zb *::after{box-sizing:border-box}
.zb p,.zb h2,.zb h3,.zb ul,.zb ol{margin:0;padding:0}
.zb ul,.zb ol{list-style:none}
.zb-wrap{max-width:1152px;margin:0 auto}
.zb-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.12fr);gap:64px;align-items:start}
.zb-eyebrow{font-family:var(--font-mono,ui-monospace,SFMono-Regular,Menlo,monospace);font-size:14px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--zb-sky)}
.zb-h2{margin-top:20px!important;font-size:60px;line-height:1.05;font-weight:700;letter-spacing:-2px;color:#fff}
.zb-h2 span{display:block;color:var(--zb-sky);text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:8px;text-decoration-color:rgba(30,167,236,.35)}
.zb-facts{display:flex;flex-wrap:wrap;gap:10px;margin-top:32px!important}
.zb-facts li{display:flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);border-radius:999px;padding:8px 16px;font-size:16px;font-weight:500;color:#f3f4f6}
.zb-facts svg{width:16px;height:16px;fill:none;stroke:var(--zb-sky);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.zb-steps{margin-top:36px!important}
.zb-steps li{display:flex;gap:16px;margin-bottom:24px}
.zb-steps p{font-size:18px;line-height:28px;color:#d1d5db}
.zb-steps b{color:#fff;font-weight:600}
.zb-num{flex:none;width:36px;height:36px;border-radius:50%;background:var(--zb-sky);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono,ui-monospace,monospace);font-size:14px;font-weight:700;box-shadow:0 0 0 6px rgba(30,167,236,.16)}
.zb-host{margin-top:36px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.05);border-radius:16px;padding:20px;font-size:16px;line-height:28px;color:#d1d5db}
.zb-host b{color:#fff;font-weight:600}
.zb-mail{margin-top:28px!important;font-size:16px;color:#9ca3af}
.zb-mail a{color:#fff;text-decoration:underline;text-underline-offset:4px}

.zb-card{border-radius:24px;overflow:hidden;background:#f7f8fa;color:var(--zb-ink);box-shadow:0 40px 90px -30px rgba(30,167,236,.55),0 0 0 1px rgba(255,255,255,.08)}
.zb-tabs{display:flex;gap:4px;background:#e3e8ee;padding:10px}
.zb-tabs button{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;border:0;cursor:pointer;border-radius:16px;padding:14px;background:transparent;font:inherit;font-size:18px;font-weight:600;color:#5b6472}
.zb-tabs button.zb-on{background:#fff;color:var(--zb-ink);box-shadow:0 2px 8px rgba(17,19,26,.12)}
.zb-tabs svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.zb-tabs .zb-on svg{stroke:var(--zb-sky)}
.zb-cal{display:block;width:100%;min-height:680px;border:0;background:#f7f8fa}
.zb-soon{padding:56px 32px;text-align:center}
.zb-soon strong{display:block;font-size:22px;font-weight:700;color:var(--zb-ink)}
.zb-soon p{margin-top:10px!important;font-size:16px;line-height:26px;color:#4b5563}
.zb-note{padding:12px 24px 24px!important;text-align:center;font-size:14px;line-height:22px;color:#6b7280}
.zb-note a{color:var(--zb-ink);font-weight:500;text-decoration:underline}

.zb-form{padding:32px}
.zb-form h3{font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-.8px;color:var(--zb-ink)}
.zb-lead{margin-top:12px!important;font-size:18px;line-height:28px;color:#4b5563}
.zb-fields{margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.zb-fields label{display:block;font-size:16px;font-weight:600;color:var(--zb-ink)}
.zb-fields em{font-style:normal;font-weight:400;color:#6b7280}
.zb-wide{grid-column:1/-1}
.zb-fields input,.zb-fields textarea{display:block;width:100%;margin-top:8px;border:1px solid #d1d5db;border-radius:12px;background:#fff;padding:14px 16px;font:inherit;font-size:16px;font-weight:400;color:var(--zb-ink);outline:none}
.zb-fields textarea{resize:vertical;min-height:92px}
.zb-fields ::placeholder{color:#9ca3af}
.zb-fields input:focus,.zb-fields textarea:focus{border-color:var(--zb-sky);box-shadow:0 0 0 3px rgba(30,167,236,.22)}
.zb-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}
.zb-consent{display:flex;gap:12px;margin-top:20px;font-size:14px;line-height:24px;font-weight:400;color:#4b5563}
.zb-consent input{flex:none;width:20px;height:20px;margin:3px 0 0;accent-color:var(--zb-sky)}
.zb-consent a{color:var(--zb-ink);font-weight:500;text-decoration:underline}
.zb-btn{margin-top:24px;width:100%;display:flex;align-items:center;justify-content:space-between;border:0;cursor:pointer;border-radius:999px;padding:10px 10px 10px 28px;background:var(--zb-ink);color:#fff;font:inherit;font-size:18px;font-weight:600;box-shadow:0 14px 28px -12px rgba(17,19,26,.7);transition:filter .15s}
.zb-btn:hover{filter:brightness(1.35)}
.zb-btn:disabled{opacity:.6;cursor:default}
.zb-btn span{width:44px;height:44px;border-radius:50%;background:var(--zb-sky);display:flex;align-items:center;justify-content:center}
.zb-btn svg{width:20px;height:20px;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.zb-err{margin-top:12px!important;text-align:center;font-size:14px;color:#dc2626}
.zb-fine{margin-top:16px!important;text-align:center;font-size:14px;color:#6b7280}

.zb-qa{margin-top:80px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.zb-qa div{border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);border-radius:16px;padding:24px}
.zb-qa b{font-size:18px;font-weight:600;color:#fff}
.zb-qa p{margin-top:8px!important;font-size:16px;line-height:28px;color:#9ca3af}

@media (max-width:1023px){
  .zb{padding:80px 20px}
  .zb-grid{grid-template-columns:minmax(0,1fr);gap:48px}
  .zb-qa{grid-template-columns:minmax(0,1fr);margin-top:56px}
}
@media (max-width:639px){
  .zb-h2{font-size:40px;letter-spacing:-1.2px}
  .zb-steps p{font-size:17px}
  .zb-tabs button{font-size:15px;padding:12px 8px;gap:6px}
  .zb-form{padding:24px 20px}
  .zb-form h3{font-size:24px}
  .zb-lead{font-size:16px;line-height:26px}
  .zb-fields{grid-template-columns:1fr}
}
`;
