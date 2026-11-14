"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./ZavHero.module.css";

/**
 * Beam settings. The left three wires flow INTO the card, the right three
 * flow OUT of it, slightly staggered.
 */
const BEAM = {
  /** animation-delay per wire, in seconds */
  delays: [0, 0.3, 0.6, 1.9, 2.2, 2.5],
  /** vertical offset of each wire where it meets the card, in px */
  spread: [-10, 0, 10, -10, 0, 10],
  /** how far behind the card edge each wire ends, in px */
  inset: 24,
  /** horizontal pull of the bezier handles (0 = straight, 0.5 = soft S) */
  curve: 0.5,
} as const;

const LAYERS = ["rail", "glow", "tail", "mid", "head"] as const;

/**
 * Connector lines between the six icon tiles and the demo card. The paths are
 * measured from the real DOM positions, so they always line up. The icons and
 * the card are found by data attributes inside the parent hero section, which
 * keeps the rest of the hero a Server Component.
 */
export default function HeroWires() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const hero = svg?.parentElement;
    if (!svg || !hero) return;

    const icons = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-wire-icon]"),
    );
    const card = hero.querySelector<HTMLElement>("[data-wire-card]");
    const groups = Array.from(svg.querySelectorAll("g"));
    if (!card || icons.length === 0) return;

    const layout = () => {
      if (!icons[0].offsetParent) return; // hidden on mobile

      // Read every rect first, then write, so the browser lays out once.
      const h = hero.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const rects = icons.map((el) => el.getBoundingClientRect());
      const cy = c.top - h.top + c.height / 2;

      rects.forEach((r, k) => {
        const ix = r.left - h.left + r.width / 2;
        const iy = r.top - h.top + r.height / 2;
        const left = k < icons.length / 2;
        const cx = (left ? c.left + BEAM.inset : c.right - BEAM.inset) - h.left;
        const y = cy + BEAM.spread[k];
        const [x1, y1, x2, y2] = left ? [ix, iy, cx, y] : [cx, y, ix, iy];
        const dx = (x2 - x1) * BEAM.curve;
        const d = `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
        groups[k]?.querySelectorAll("path").forEach((p) => p.setAttribute("d", d));
      });
    };

    const resize = new ResizeObserver(layout);
    resize.observe(hero);
    document.fonts?.ready.then(layout);
    layout();

    // Stop animating the beams while the hero is off screen.
    const visibility = new IntersectionObserver(([entry]) => {
      svg.classList.toggle(styles.paused, !entry.isIntersecting);
    });
    visibility.observe(hero);

    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <svg ref={svgRef} className={styles.wires} aria-hidden="true">
      {BEAM.delays.map((delay, k) => (
        <g key={k}>
          {LAYERS.map((layer) => (
            <path
              key={layer}
              className={
                layer === "rail"
                  ? styles.rail
                  : `${styles.beam} ${styles[layer]}`
              }
              pathLength={1}
              style={{ "--d": `${delay}s` } as CSSProperties}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
