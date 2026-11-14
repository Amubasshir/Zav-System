"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./ZavPricing.module.css";

const PRICE = 199; // per month

/* Only things the $199 ZAV System really includes */
const FEATURES = [
  "Fast HVAC website",
  "Missed-call text-back",
  "Instant reply to web leads",
  "Lead alerts on your phone",
  "Google review requests",
  "Service and area pages",
  "Set up for Google and AI search",
  "Setup and upkeep done for you",
];
const TERMS = ["No contract", "Cancel anytime", "Live in 7 days"];

const JOB = { min: 100, max: 2000, step: 25, start: 350 };
const PRICE_COUNT_MS = 1400;

/* A number that counts smoothly to its new value */
function Count({ value, format, ms = 420 }: { value: number; format: (n: number) => string; ms?: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    /* reduced motion: jump straight to the new value on the next frame */
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : ms;
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const draw = (now: number) => {
      const p = dur ? Math.min(1, (now - start) / dur) : 1;
      const n = a + (value - a) * (1 - Math.pow(1 - p, 3));
      from.current = n;
      setShown(n);
      if (p < 1) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);

  return <>{format(shown)}</>;
}

export default function ZavPricing() {
  const ref = useRef<HTMLElement>(null);
  const [job, setJob] = useState(JOB.start);
  /* The real price is the starting value, so the server HTML (and anyone
     without JavaScript, including search engines) always reads $199. */
  const [price, setPrice] = useState(PRICE);

  /* Quiet entrance plus the price count-up, once, when the section scrolls
     into view. The entrance classes are set on the element directly (as in
     the HTML preview). Without JS or with reduced motion nothing is hidden. */
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }
    let raf = 0;
    el.classList.add(s.anim); // anim = hide things so they can animate in
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.classList.add(s.in); // in = the section has scrolled into view
        const start = performance.now();
        const draw = (now: number) => {
          const p = Math.min(1, (now - start) / PRICE_COUNT_MS);
          setPrice(Math.round(PRICE * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const jobsToBreakEven = Math.ceil(PRICE / job);
  const share = Math.min(100, (PRICE / job) * 100);
  const delay = (d: number) => ({ "--d": d }) as CSSProperties;

  return (
    <div className={s.root}>
      <section ref={ref} id="pricing" className={s.pricing}>
        <div className={s.inner}>
          <div>
            <div className={`${s.eyebrow} ${s.rise}`}>Pricing</div>
            <h2 className={s.rise} style={delay(0.06)}>Priced so one job pays for the month.</h2>
            <p className={`${s.lede} ${s.rise}`} style={delay(0.14)}>
              One monthly price for the whole system. No contract and no lock-in. If it stops paying for itself, you cancel.
            </p>
            <ul className={s.feats}>
              {FEATURES.map((f, k) => (
                <li key={f} style={{ "--i": k } as CSSProperties}>{f}</li>
              ))}
            </ul>
            {/* Full list from CLAUDE.md section 3: never promise these at $199. */}
            <p className={`${s.not} ${s.rise}`} style={delay(0.5)}>
              Not part of this plan: paid ads, ongoing SEO or blog writing, backlinks, Google Business Profile management, an
              AI voice receptionist, and custom features or integrations.
            </p>
          </div>

          <div className={s.card}>
            <div className={s.top}>
              <div className={s.price}>
                {/* counts up from $0 once, when the section first comes into view */}
                <span>${price}</span>
                <span className={s.per}>/month</span>
              </div>
              <div className={s.terms}>
                {TERMS.map((t) => <span key={t} className={s.term}>{t}</span>)}
              </div>
            </div>
            <div className={s.math}>
              <h3>Do the math on one job.</h3>
              <label className={s.label} htmlFor="zav-price-job">
                Your average job value <b>${job.toLocaleString("en-US")}</b>
              </label>
              <input
                id="zav-price-job"
                className={s.range}
                type="range"
                min={JOB.min}
                max={JOB.max}
                step={JOB.step}
                value={job}
                onChange={(e) => setJob(Number(e.target.value))}
                style={{ "--pct": `${((job - JOB.min) / (JOB.max - JOB.min)) * 100}%` } as CSSProperties}
              />
              <div className={s.stats} aria-live="polite">
                <div className={s.stat}>
                  <span>Jobs a month to break even</span>
                  <b><Count value={jobsToBreakEven} format={(n) => `${Math.round(n)}`} /></b>
                </div>
                <div className={s.stat}>
                  <span>Share of one job</span>
                  <b><Count value={share} format={(n) => `${Math.round(n)}%`} /></b>
                </div>
              </div>
              <p className={s.fine}>Simple arithmetic on your number, not a promise of results.</p>
              <a className={s.cta} href="#book">
                Book a 15-min demo <span className={s.arr}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
