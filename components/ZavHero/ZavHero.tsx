import type { ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import HeroDemoCard from "./HeroDemoCard";
import HeroWires from "./HeroWires";
import styles from "./ZavHero.module.css";

type Tile = {
  label: string;
  color: string;
  position: string;
  icon: ReactNode;
};

/* 3D tool icons (generic, no brand logos). Left three first, then right three. */
const TILES: Tile[] = [
  {
    label: "Missed calls",
    color: styles.green,
    position: styles.i1,
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </svg>
    ),
  },
  {
    label: "Your website",
    color: styles.sky,
    position: styles.i2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19M12 2.5a14.5 14.5 0 0 0 0 19" />
      </svg>
    ),
  },
  {
    label: "Google & AI search",
    color: styles.slate,
    position: styles.i3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m20.5 20.5-5.2-5.2" />
      </svg>
    ),
  },
  {
    label: "Instant replies",
    color: styles.sky,
    position: styles.i4,
    icon: (
      <svg viewBox="0 0 24 24">
        <path fill="#fff" d="M5 3h14a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H9.2l-4.5 3.6A1 1 0 0 1 3 20.3V17.2A3 3 0 0 1 2 15V6a3 3 0 0 1 3-3z" />
        <g fill="#0E9FE3">
          <circle cx="7.8" cy="10.3" r="1.3" />
          <circle cx="12" cy="10.3" r="1.3" />
          <circle cx="16.2" cy="10.3" r="1.3" />
        </g>
      </svg>
    ),
  },
  {
    label: "Booked jobs",
    color: styles.slate,
    position: styles.i5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4.5" width="18" height="17" rx="3.5" fill="#fff" />
        <path d="M8 2.5v4M16 2.5v4" stroke="#fff" strokeWidth="2.4" />
        <path d="M3.5 10h17" stroke="#16212A" strokeWidth="1.6" />
        <path d="m8.8 15.3 2.3 2.3 4.3-4.3" stroke="#16212A" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    label: "5-star reviews",
    color: styles.amber,
    position: styles.i6,
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round">
        <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4-4.7-4.6 6.5-.9z" />
      </svg>
    ),
  },
];

/**
 * Home page hero. Server Component: the headline, copy and CTAs ship as plain
 * HTML. Only the rotating demo card and the connector lines hydrate.
 * Design is final (see CLAUDE.md section 8), do not restyle.
 */
export default function ZavHero() {
  return (
    <section className={`${styles.root} ${styles.hero}`}>
      <HeroWires />

      {TILES.map((tile) => (
        <div
          key={tile.label}
          className={`${styles.icon} ${tile.color} ${tile.position}`}
          data-wire-icon
        >
          {tile.icon}
          <span className={styles.lbl}>{tile.label}</span>
        </div>
      ))}

      <div className={styles.center}>
        <span className={styles.pill}>
          <b>
            <Logo variant="word" className={styles.pillLogo} />
          </b>{" "}
          Built for HVAC companies
        </span>

        <h1>
          <span className={styles.nw}>Book more HVAC jobs</span>
          <br />
          <span className={styles.hl}>this season.</span>
        </h1>

        <HeroDemoCard />

        <p className={styles.sub}>
          A website that gets you found, instant replies to every missed call
          and web lead, and more Google reviews, all done for you.{" "}
          <strong>$199/month, no contract.</strong>
        </p>

        <div className={styles.ctas}>
          <a className={`${styles.btn} ${styles.primary}`} href="#included">
            Watch it book a job{" "}
            <span className={styles.arr} aria-hidden="true">
              ↗
            </span>
          </a>
          <a className={`${styles.btn} ${styles.secondary}`} href="#demo">
            Watch the demo
          </a>
          <a className={`${styles.btn} ${styles.secondary}`} href="#book">
            Book a 15-min demo
          </a>
        </div>
        <div className={styles.trust}>
          <span>Live in 7 days</span>
          <span>Cancel anytime</span>
          <span>You own your site &amp; leads</span>
        </div>
      </div>
    </section>
  );
}
