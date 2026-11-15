"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./ZavCompare.module.css";

/* The only client code in this section. The children are rendered on the
   server; this wrapper adds the reveal classes once the section scrolls into
   view. Without JS, or with reduced motion, everything is simply visible.
   Classes are set on the element directly, so nothing re-renders. */
export default function CompareReveal({
  id,
  labelledBy,
  children,
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }
    el.classList.add(s.anim); // anim = hide items so they can animate in
    const io = new IntersectionObserver(
      ([e]) => {
        el.classList.toggle(s.idle, !e.isIntersecting); // idle = off screen, glow paused
        if (e.intersectionRatio >= 0.25) el.classList.add(s.in); // in = scrolled into view
      },
      { threshold: [0, 0.25] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={s.root} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
