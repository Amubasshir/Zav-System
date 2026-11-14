"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import s from "./ZavHow.module.css";

/* Edit copy here. Times follow the onboarding process: 15-min demo, one form, 20-min kickoff call, live on day 7. */
const STEPS = [
  {
    pill: "15 min",
    title: "Demo call",
    text: "You call our demo line and hang up. A text lands on your own phone in seconds. If it fits, you sign up. No contract.",
    we: "Live demo, straight answer on fit",
    you: "Bring your phone and your questions",
  },
  {
    pill: "6 days",
    title: "We build your system",
    text: "You fill out one form and join a 20-minute kickoff call. We build your website, write your text replies and set up your review requests.",
    we: "Website, lead replies, alerts, business number, texting registration",
    you: "One form, plus logo and job photos if you have them",
  },
  {
    pill: "Day 7",
    title: "You go live",
    text: "Your website is on your domain and every new lead reaches your phone. Text replies switch on once the phone carriers approve your registration.",
    we: "Live test, go-live, ongoing upkeep",
    you: "Tap one button when a job is done",
  },
];

export default function ZavHow() {
  const ref = useRef<HTMLElement>(null);

  /* Plays once when the section scrolls into view. Without JS, or with reduced
     motion, everything is simply visible. The classes are set on the element
     directly (as in the HTML preview), so nothing re-renders. */
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }
    el.classList.add(s.anim); // anim = hide things so they can animate in
    const io = new IntersectionObserver(
      ([e]) => {
        el.classList.toggle(s.idle, !e.isIntersecting); // idle = off screen, stripes paused
        if (e.intersectionRatio >= 0.2) el.classList.add(s.in); // in = the section has scrolled into view
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={s.root}>
      <section ref={ref} id="how" className={s.how}>
        <div className={s.inner}>
          <div className={s.eyebrow}>How it works</div>
          <h2>About an hour of your time. Seven days later, you&apos;re live.</h2>
          <p className={s.lede}>Two short calls and one form. Everything between them is on us.</p>

          <div className={s.timeline} aria-hidden="true">
            <div className={s.tl}><span>Day 0</span><span className={`${s.seg} ${s.s1}`} /></div>
            <div className={s.tl}><span>Days 1 to 6</span><span className={`${s.seg} ${s.s2}`} /></div>
            <div className={s.tl}><span>Live</span><span className={`${s.seg} ${s.s3}`} /></div>
          </div>

          <ol className={s.steps}>
            {STEPS.map((st, k) => (
              <li key={st.title} className={s.step} style={{ "--i": k } as CSSProperties}>
                <div className={s.head}>
                  <span className={s.num}>{String(k + 1).padStart(2, "0")}</span>
                  <span className={s.pill}>{st.pill}</span>
                </div>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
                <div className={s.split}>
                  <div className={s.who}><b>We do</b>{st.we}</div>
                  <div className={s.who}><b>You do</b>{st.you}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
