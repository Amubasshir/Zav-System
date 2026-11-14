"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import s from "./ZavIncluded.module.css";

type Tone = "sky" | "slate" | "green" | "amber";
type Item = {
  icon: string;
  tone: Tone;
  title: string;
  text: string;
  link?: { label: string; href: string };
  /* example shown on the phone card: [small line, main line]. Illustrations only, not real customer data. */
  ex: [string, string];
};

/* Edit copy here. Every item must be something the $199 ZAV System really includes. */
const ITEMS: Item[] = [
  {
    icon: "globe",
    tone: "sky",
    title: "A website that gets you calls",
    text: "A fast HVAC site built for phones. Your number is one tap away and the quote form is at the top.",
    ex: ["Call from your website", "Tapped \"Call now\" · (214) 555-0182"],
  },
  {
    icon: "search",
    tone: "slate",
    title: "Set up to be found",
    text: "A page for each service and area you cover, written so Google and AI search can read who you are and what you do.",
    ex: ["Your service page", "AC repair · Plano, TX"],
  },
  {
    icon: "phone",
    tone: "green",
    title: "A text back for every missed call",
    text: "You are on a job and can't pick up. The caller gets a text from your business within seconds, before they call someone else.",
    ex: ["Missed call · texted back in 5s", "(214) 555-0182"],
  },
  {
    icon: "chat",
    tone: "sky",
    title: "An instant reply to every web lead",
    text: "A quote request at 9pm gets a text reply right away, not the next morning.",
    ex: ["Text reply sent · 9:02 PM", "\"Thanks for reaching out about your AC.\""],
  },
  {
    icon: "bell",
    tone: "slate",
    title: "Every lead on your phone",
    text: "You get an alert the moment a lead comes in, with their name, number and what they need.",
    ex: ["New lead", "Furnace not heating · wants a call today"],
  },
  {
    icon: "star",
    tone: "amber",
    title: "More Google reviews",
    text: "After each finished job, the customer gets a review request with your Google link. Every customer gets the same ask.",
    ex: ["Review request sent", "After today's furnace repair"],
  },
  {
    icon: "check",
    tone: "green",
    title: "Built and looked after for you",
    text: "We set everything up and keep it running. Live in 7 days, and you own your website content, your leads and your data.",
    ex: ["Your site is live", "Day 7 · all set up for you"],
  },
];

const two = (n: number) => String(n).padStart(2, "0");

function Glyph({ name }: { name: string }): ReactNode {
  switch (name) {
    case "globe":
      return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19M12 2.5a14.5 14.5 0 0 0 0 19" /></svg>;
    case "search":
      return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20.5 20.5-5.2-5.2" /></svg>;
    case "phone":
      return <svg viewBox="0 0 24 24" fill="#fff"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>;
    case "chat":
      return <svg viewBox="0 0 24 24"><path fill="#fff" d="M5 3h14a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H9.2l-4.5 3.6A1 1 0 0 1 3 20.3V17.2A3 3 0 0 1 2 15V6a3 3 0 0 1 3-3z" /><g fill="#0E9FE3"><circle cx="7.8" cy="10.3" r="1.3" /><circle cx="12" cy="10.3" r="1.3" /><circle cx="16.2" cy="10.3" r="1.3" /></g></svg>;
    case "bell":
      return <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5v3.6l-1.8 3.1A1.2 1.2 0 0 0 4.7 17.5h14.6a1.2 1.2 0 0 0 1-1.8l-1.8-3.1V9A6.5 6.5 0 0 0 12 2.5z" /><path d="M9.6 19.3a2.5 2.5 0 0 0 4.8 0z" /></svg>;
    case "star":
      return <svg viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4-4.7-4.6 6.5-.9z" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.8 4.6 4.6L19.5 7" /></svg>;
  }
}

export default function ZavIncluded() {
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  /* the row closest to the middle of the screen is the active one */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const pick = () => {
      if (hovering.current) return;
      const mid = window.innerHeight * 0.45;
      let best = 0;
      let dist = Infinity;
      rowRefs.current.forEach((r, k) => {
        if (!r) return;
        const b = r.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - mid);
        if (d < dist) {
          dist = d;
          best = k;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    /* performance: only measure on scroll while this section is on screen */
    const visibility = new IntersectionObserver(([entry]) => {
      stop();
      if (!entry.isIntersecting) return;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    });
    visibility.observe(section);
    return () => {
      visibility.disconnect();
      stop();
    };
  }, []);

  /* the glowing line runs down to the active row's icon */
  useEffect(() => {
    const measure = () => {
      const row = rowRefs.current[active];
      const rail = railRef.current;
      const tile = row?.firstElementChild as HTMLElement | null | undefined;
      if (!row || !rail || !tile) return;
      setFill(Math.max(0, row.offsetTop + tile.offsetTop + tile.offsetHeight / 2 - rail.offsetTop));
    };
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className={s.root}>
      <section className={s.included} id="included" ref={sectionRef}>
        <div className={s.inner}>
          <div className={s.aside}>
            <div className={s.eyebrow}>What&apos;s included</div>
            <h2>
              What ZAV does <span className={s.hl}>for you.</span>
            </h2>
            <p className={s.lede}>
              No tech talk. Seven things that change in your business for <strong>$199 a month.</strong>
            </p>

            <div className={s.phone} aria-hidden="true">
              <div className={s.phonebar}>
                <span>
                  Your phone · <span className={s.count}>{two(active + 1)}</span> / {two(ITEMS.length)}
                </span>
                <b>Example</b>
              </div>
              <div className={s.scenes}>
                {ITEMS.map((it, k) => (
                  <div key={it.title} className={`${s.scene} ${k === active ? s.on : ""}`}>
                    <span className={`${s.tile} ${s[it.tone]}`}>
                      <Glyph name={it.icon} />
                    </span>
                    <div>
                      <div className={s.t}>{it.ex[0]}</div>
                      <div className={s.b}>{it.ex[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={s.bar}>
                {ITEMS.map((it, k) => (
                  <i key={it.title} className={k <= active ? s.on : ""} />
                ))}
              </div>
            </div>
            <p className={s.caption}>Every lead reaches the phone in your pocket.</p>
          </div>

          <div className={s.listwrap}>
            <div className={s.rail} ref={railRef}>
              <span className={s.fill} style={{ "--fill": `${fill}px` } as CSSProperties} />
            </div>
            <ol
              className={s.list}
              onMouseLeave={() => {
                hovering.current = false;
              }}
            >
              {ITEMS.map((it, k) => (
                <li
                  key={it.title}
                  ref={(el) => {
                    rowRefs.current[k] = el;
                  }}
                  className={`${s.item} ${k === active ? s.on : ""}`}
                  onMouseEnter={() => {
                    hovering.current = true;
                    setActive(k);
                  }}
                >
                  <span className={`${s.tile} ${s[it.tone]}`}>
                    <Glyph name={it.icon} />
                  </span>
                  <div>
                    <span className={s.num}>{two(k + 1)}</span>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                    {it.link && (
                      <a className={s.more} href={it.link.href}>
                        {it.link.label} →
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className={s.foot}>
              <a className={s.cta} href="#book">
                See it on your own phone <span className={s.arr}>↗</span>
              </a>
              <span className={s.note}>$199/month · No contract</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
