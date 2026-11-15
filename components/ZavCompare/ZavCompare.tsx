import type { CSSProperties } from "react";
import CompareReveal from "./CompareReveal";
import s from "./ZavCompare.module.css";

/* Edit copy here. */
const BEFORE = [
  "Website company",
  "Call tracking",
  "Texting app",
  "Lead forms",
  "CRM",
  "Follow-up software",
  "Review software",
  "SEO agency",
];

const AFTER = [
  "A fast website that gets you found",
  "Instant text back on every missed call",
  "Website leads answered in 60 seconds",
  "Every new lead sent straight to your phone",
  "Google review requests after every job",
  "Calls, texts and forms in one inbox",
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/* Server Component: the HTML ships fully rendered. Only CompareReveal runs on the client. */
export default function ZavCompare() {
  return (
    <CompareReveal id="one-system" labelledBy="one-system-title">
      <div className={s.wrap}>
        <div className={s.head}>
          <p className={s.eyebrow}>One system</p>
          <h2 id="one-system-title" className={s.title}>
            Stop paying eight companies <span className={s.hl}>to do one job.</span>
          </h2>
          <p className={s.sub}>
            Most contractors piece this together from different vendors. ZAV builds it,
            connects it and runs it for you.
          </p>
        </div>

        <div className={s.grid}>
          <div className={`${s.panel} ${s.before}`}>
            <div className={s.top}>
              <span className={s.label}>Before</span>
              <span className={s.chip}>8 vendors</span>
            </div>
            <h3 className={s.name}>The usual patchwork</h3>
            <ul className={s.list}>
              {BEFORE.map((t, n) => (
                <li key={t} className={s.item} style={i(n)}>
                  <span className={s.dash} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className={s.foot}>
              <div className={s.rule} />
              <p className={s.pain}>
                Eight bills. Eight logins.
                <br />
                Nobody owns the result.
                <br />
                <span className={s.bad}>Leads slip through the cracks.</span>
              </p>
            </div>
          </div>

          <div className={`${s.panel} ${s.after}`}>
            <span className={s.glow} aria-hidden="true" />
            <div className={s.top}>
              <span className={s.label}>After</span>
              <span className={s.chip}>1 system</span>
            </div>
            <h3 className={s.name}>The ZAV System</h3>
            <ul className={s.list}>
              {AFTER.map((t, n) => (
                <li key={t} className={s.item} style={i(n + 2)}>
                  <svg className={s.check} viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
            <div className={s.foot}>
              <div className={s.rule} />
              <p className={s.connected}>Everything connected.</p>
              <p className={s.price}>
                <span className={s.amount}>$199</span>
                <span className={s.per}>/month</span>
              </p>
              <p className={s.terms}>No contract. Live in 7 days. You own your leads and data.</p>
              <a className={s.cta} href="#book">
                See it work in 15 minutes
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </CompareReveal>
  );
}
