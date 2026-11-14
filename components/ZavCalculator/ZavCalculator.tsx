"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./ZavCalculator.module.css";

const PRICE = 199; // ZAV per month

type Key = "calls" | "miss" | "job" | "close" | "win";

/* Sliders. Defaults are kept modest on purpose; the visitor sets their own numbers. */
const FIELDS: { key: Key; label: string; hint?: string; min: number; max: number; step: number; start: number; show: (v: number) => string }[] = [
  { key: "calls", label: "Calls from new customers each month", min: 20, max: 400, step: 5, start: 100, show: (v) => `${v}` },
  { key: "miss", label: "Calls you miss", hint: "On a job, after hours, or on another call.", min: 5, max: 60, step: 1, start: 25, show: (v) => `${v}%` },
  { key: "job", label: "Average job value", min: 100, max: 2000, step: 25, start: 350, show: (v) => `$${v.toLocaleString("en-US")}` },
  { key: "close", label: "Calls that turn into jobs", min: 10, max: 80, step: 1, start: 40, show: (v) => `${v}%` },
  { key: "win", label: "Missed callers a fast text wins back", hint: "Your guess. Set it as low as you like.", min: 5, max: 60, step: 1, start: 20, show: (v) => `${v}%` },
];

const START = Object.fromEntries(FIELDS.map((f) => [f.key, f.start])) as Record<Key, number>;
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/* A number that counts smoothly to its new value when it changes */
function Count({ value, format }: { value: number; format: (n: number) => string }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    /* reduced motion: jump straight to the new value on the next frame */
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450;
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
  }, [value]);

  return <>{format(shown)}</>;
}

export default function ZavCalculator() {
  const [v, setV] = useState(START);

  const missed = (v.calls * v.miss) / 100;
  const jobs = (missed * v.close) / 100;
  const lostMonth = jobs * v.job;
  const lostYear = lostMonth * 12;
  const wonYear = (lostYear * v.win) / 100;
  const costYear = PRICE * 12;
  const top = Math.max(lostYear, costYear);
  const jobsToCover = Math.ceil(PRICE / v.job);
  const times = wonYear / costYear;
  const bar = (n: number) => ({ "--w": `${(n / top) * 100}%` }) as CSSProperties;

  return (
    <div className={s.root}>
      <section className={s.calc} id="calculator">
        <div className={s.inner}>
          <div className={s.eyebrow}>
            <span className={s.tile}>
              <svg viewBox="0 0 24 24" fill="#fff"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
            </span>
            Missed-call calculator
          </div>
          <h2>
            What are missed calls <span className={s.hl}>costing you?</span>
          </h2>
          <p className={s.lede}>Move the sliders to match your business. The math uses your numbers, not ours.</p>

          <div className={s.box}>
            <div className={s.inputs}>
              <div className={s.inputshead}>Your numbers</div>
              {FIELDS.map((f) => (
                <div key={f.key} className={s.field}>
                  <label htmlFor={`zav-calc-${f.key}`}>
                    {f.label} <span className={s.val}>{f.show(v[f.key])}</span>
                  </label>
                  <input
                    id={`zav-calc-${f.key}`}
                    className={s.range}
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={v[f.key]}
                    onChange={(e) => setV((old) => ({ ...old, [f.key]: Number(e.target.value) }))}
                    style={{ "--pct": `${((v[f.key] - f.min) / (f.max - f.min)) * 100}%` } as CSSProperties}
                  />
                  {f.hint && <p className={s.hint}>{f.hint}</p>}
                </div>
              ))}
            </div>

            <div className={s.result} aria-live="polite">
              <div className={s.rlabel}>Walking away each year</div>
              <div className={s.big}><Count value={lostYear} format={money} /></div>
              <div className={s.bigsub}><Count value={lostMonth} format={money} /> every month</div>

              <div className={s.stats}>
                <div className={s.stat}>
                  <b><Count value={missed} format={(n) => `${Math.round(n)}`} /></b>
                  <span>missed calls a month</span>
                </div>
                <div className={s.stat}>
                  <b><Count value={jobs} format={(n) => n.toFixed(1)} /></b>
                  <span>jobs lost a month</span>
                </div>
              </div>

              <div className={s.bars}>
                <div className={s.barrow}>
                  <div className={s.barhead}><span>Lost to missed calls</span><b><Count value={lostYear} format={money} /></b></div>
                  <div className={s.track}><span className={`${s.fill} ${s.lost}`} style={bar(lostYear)} /></div>
                </div>
                <div className={s.barrow}>
                  <div className={s.barhead}><span>A fast text could win back</span><b><Count value={wonYear} format={money} /></b></div>
                  <div className={s.track}><span className={`${s.fill} ${s.won}`} style={bar(wonYear)} /></div>
                </div>
                <div className={s.barrow}>
                  <div className={s.barhead}><span>ZAV for a year</span><b>{money(costYear)}</b></div>
                  <div className={s.track}><span className={`${s.fill} ${s.cost}`} style={bar(costYear)} /></div>
                </div>
              </div>

              <p className={s.verdict}>
                <b>{jobsToCover} recovered {jobsToCover > 1 ? "jobs" : "job"} a month</b> {jobsToCover > 1 ? "cover" : "covers"} ZAV at ${PRICE}.
                {times >= 1.5 && (
                  <> On these numbers, the text back alone could return about <b>{times.toFixed(1)}×</b> what ZAV costs.</>
                )}
              </p>
              <p className={s.fine}>An estimate from the numbers you entered, not a promise of results.</p>
              <a className={s.cta} href="#book">
                See it on your own phone <span className={s.arr}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
