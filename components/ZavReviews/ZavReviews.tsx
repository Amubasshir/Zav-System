"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import s from "./ZavReviews.module.css";
import { ArrowUpRightGlyph, StarGlyph } from "@/components/ui/glyphs";

/* Edit copy here. Keep it true: every customer gets the same request, and nothing is sent after a review or an opt-out. */
const STEPS = [
  { title: "You mark the job done", text: "One tap on your phone when you leave the house.", chip: "DONE 4:52 PM" },
  { title: "The customer gets a text", text: "From your business, by name, with your Google review link." },
  { title: "They tap the link", text: "It opens your Google review page. No searching for you." },
  { title: "A new review lands on Google", text: "The next homeowner who searches sees it." },
  { title: "The reminders stop", text: "Once they review or opt out, nothing more is sent." },
];

const LAST = STEPS.length - 1;
const STEP_MS = 2400; // time on each step
const HOLD_MS = 4200; // pause on the finished story before it loops

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 12.5 4 4 8-9" />
  </svg>
);

export default function ZavReviews() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    /* reduced motion: show the finished story and never start the loop */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStep(LAST));
      return () => cancelAnimationFrame(raf);
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* the story plays step by step and loops, only while the section is on screen */
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStep((n) => (n >= LAST ? 0 : n + 1)), step >= LAST ? HOLD_MS : STEP_MS);
    return () => clearTimeout(t);
  }, [step, visible]);

  const shown = (at: number) => `${s.ev} ${step >= at ? s.show : ""}`;

  return (
    <div className={s.root}>
      <section className={s.reviews} id="reviews" ref={sectionRef}>
        <div className={s.inner}>
          <div className={s.top}>
            <div>
              <div className={s.eyebrow}>
                <span className={s.tile}>
                  <svg viewBox="0 0 24 24" fill="#fff"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4-4.7-4.6 6.5-.9z" /></svg>
                </span>
                Google reviews
              </div>
              <h2>
                <span className={s.nw}>Finish the job.</span> The review request <span className={s.hl}>sends itself.</span>
              </h2>
              <p className={s.lede}>
                Mark the job done with one tap. Your customer gets a text from your business with your Google link. You do
                nothing else.
              </p>
            </div>
          </div>

          <div className={s.story}>
            <div className={s.panel}>
              <div className={s.panelhead}>
                <span>Review request</span>
                <span className={`${s.rating} ${step >= 3 ? s.bumped : ""}`}>
                  <span className={s.star}><StarGlyph /></span> 4.8 ·{" "}
                  <span className={s.flip}>
                    <span className={`${s.v} ${s.old}`}>38</span>
                    <span className={`${s.v} ${s.new}`}>39</span>
                  </span>{" "}
                  reviews
                </span>
              </div>
              <ol className={s.steps} style={{ "--p": step / LAST } as CSSProperties}>
                {STEPS.map((st, k) => {
                  const done = k < step || (k === step && step === LAST);
                  const now = k === step && step !== LAST;
                  return (
                    <li
                      key={st.title}
                      className={`${s.step} ${done ? s.done : ""} ${now ? s.now : ""}`}
                      onClick={() => setStep(k)}
                    >
                      <span className={s.dot}>
                        <b className={s.n}>{k + 1}</b>
                        <Check />
                      </span>
                      <div>
                        <h3>
                          {st.title} {st.chip && <span className={s.chip}>{st.chip}</span>}
                        </h3>
                        <p>{st.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className={s.panelfoot}>Example data, to show how it works.</div>
            </div>

            <div className={`${s.stage} ${step >= 3 ? s.got : ""}`} aria-hidden="true">
              <span className={s.badge}>
                <span className={s.bstar}><StarGlyph /></span> +1 Google review
              </span>
              <div className={s.phone}>
                <div className={s.screen}>
                  <div className={s.status}>
                    <span>4:52</span>
                    <span className={s.island} />
                    <span className={s.sysicons}>
                      <svg viewBox="0 0 18 12" fill="#0C1116"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
                      <svg viewBox="0 0 17 12" fill="none" stroke="#0C1116" strokeWidth={1.9} strokeLinecap="round"><path d="M1.5 4.2a10 10 0 0 1 14 0M4.2 7a6.2 6.2 0 0 1 8.6 0" /><circle cx="8.5" cy="10" r="1.1" fill="#0C1116" stroke="none" /></svg>
                      <svg viewBox="0 0 27 12" fill="none"><rect x=".6" y=".6" width="22.8" height="10.8" rx="3.2" stroke="#0C1116" strokeOpacity={0.45} strokeWidth={1.2} /><rect x="2.3" y="2.3" width="16" height="7.4" rx="1.8" fill="#0C1116" /><rect x="24.8" y="4" width="1.8" height="4" rx=".9" fill="#0C1116" fillOpacity={0.45} /></svg>
                    </span>
                  </div>
                  <div className={s.contact}>
                    <svg className={s.back} viewBox="0 0 11 19" fill="none" stroke="#0E9FE3" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M9 2 2 9.5 9 17" /></svg>
                    <span className={s.avatar}>HV</span>
                    <span className={s.cname}>
                      Your HVAC Company
                      <small>(214) 555-0182</small>
                    </span>
                  </div>
                  <div className={`${s.thread} ${step >= 2 ? s.tapped : ""} ${step === 2 ? s.tapping : ""}`}>
                    <div className={`${shown(0)} ${s.sys}`}>Job done · 4:52 PM</div>
                    <div className={`${shown(1)} ${s.bubble}`}>
                      Hi Dana, thanks for choosing Your HVAC Company! Would you take 30 seconds to leave us a Google review?
                      It helps a lot: <span className={s.link}>g.page/r/your-company</span>
                      <span className={s.stop}>Reply STOP to opt out.</span>
                    </div>
                    <div className={`${shown(3)} ${s.posted}`}>
                      <div>
                        <span className={s.stars}>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <span key={i} className={s.s} style={{ "--i": i } as CSSProperties}><StarGlyph /></span>
                          ))}
                        </span>
                        Review posted on your Google page
                      </div>
                    </div>
                    <div className={`${shown(4)} ${s.sys}`}>Reminders off</div>
                  </div>
                  <div className={s.composer}>
                    <span className={s.plus}>+</span>
                    <span className={s.field}>
                      Text message
                      <span className={s.send}>
                        <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" /></svg>
                      </span>
                    </span>
                  </div>
                  <span className={s.homebar} />
                </div>
              </div>
              <p className={s.stagecap}>Your customer&apos;s phone · Example</p>
            </div>
          </div>

          <div className={s.foot}>
            <a className={s.cta} href="#book">
              Book a 15-min demo <span className={s.arr}><ArrowUpRightGlyph /></span>
            </a>
            <span className={s.note}>Part of the ZAV System · $199/month</span>
          </div>
        </div>
      </section>
    </div>
  );
}
