"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ZavHero.module.css";
import { StarGlyph } from "@/components/ui/glyphs";

/** Time each message stays up. Matches the dot fill animation in the CSS module. */
const STEP_MS = 2600;
/** Delay before the "Job booked" chip pops in. */
const CHIP_MS = 600;

type Message = {
  iconBg: string;
  icon: ReactNode;
  title: string;
  body: ReactNode;
  chip?: string;
};

const MESSAGES: Message[] = [
  {
    iconBg: "#FEE2E2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3" />
        <path d="m16 2 6 6M22 2l-6 6" />
      </svg>
    ),
    title: "Missed call · tech on a rooftop unit",
    body: "(214) 555-0182 · 9:14 PM",
  },
  {
    iconBg: "#DCFCE7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Text sent automatically in 5s",
    body: "\"Sorry we missed you! Is your AC not cooling?\"",
  },
  {
    iconBg: "#DBEAFE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: "Homeowner replied · you confirmed",
    body: "AC repair · Tomorrow, 9:00 AM",
    chip: "Job booked",
  },
  {
    iconBg: "#FEF3C7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5B301">
        <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
      </svg>
    ),
    title: "Job done · review request sent",
    body: (
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <StarGlyph key={i} />
        ))}{" "}
        New Google review
      </>
    ),
  },
];

/**
 * Live mini-demo: one fixed card shell, the content swaps inside it.
 * The first message is in the server HTML, so the card is never empty.
 */
export default function HeroDemoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  // tick counts every swap, so each pass through the loop is unique
  const [tick, setTick] = useState(0);
  const [chipTick, setChipTick] = useState(-1);

  const current = tick % MESSAGES.length;
  const prev = tick === 0 ? -1 : (tick - 1) % MESSAGES.length;

  // Cycle only while the card is on screen.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let timer: number | undefined;
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return stop();
      if (timer === undefined) {
        timer = window.setInterval(() => setTick((t) => t + 1), STEP_MS);
      }
    });
    observer.observe(card);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  // Pop the chip shortly after its message lands.
  useEffect(() => {
    if (!MESSAGES[tick % MESSAGES.length].chip) return;
    const timeout = window.setTimeout(() => setChipTick(tick), CHIP_MS);
    return () => window.clearTimeout(timeout);
  }, [tick]);

  return (
    <>
      <div className={styles.stage}>
        <div ref={cardRef} className={styles.card} data-wire-card>
          {MESSAGES.map((m, k) => (
            <div
              key={m.title}
              className={[
                styles.msg,
                k === current ? styles.on : "",
                k === prev ? styles.prev : "",
              ].join(" ")}
            >
              <div className={styles.ico} style={{ background: m.iconBg }}>
                {m.icon}
              </div>
              <div className={styles.txt}>
                <div className={styles.t}>{m.title}</div>
                <div className={styles.b}>{m.body}</div>
              </div>
              <span className={styles.time}>now</span>
              {m.chip && (
                <span
                  className={`${styles.chip} ${
                    k === current && chipTick === tick ? styles.on : ""
                  }`}
                >
                  {m.chip}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots} aria-hidden="true">
        {MESSAGES.map((m, k) => (
          <i key={m.title} className={k === current ? styles.on : undefined} />
        ))}
      </div>
    </>
  );
}
