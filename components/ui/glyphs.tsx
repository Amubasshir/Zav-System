import type { CSSProperties } from "react";

/**
 * Star, arrow and check drawn as inline SVG instead of the text characters
 * (★ ↗ → ✓).
 *
 * Why: those characters are not in the Inter / Space Grotesk / IBM Plex Mono
 * files the site ships, so the browser had to go and load three system font
 * files for every place one appeared. That was the slowest part of laying out
 * the page. An SVG costs nothing and looks the same on every phone.
 *
 * Each one is sized in "em", so it follows the font-size of the element it sits
 * in, and takes the text color (currentColor), exactly like the character did.
 * No hooks, so they work in Server and Client Components.
 */

type Props = { style?: CSSProperties; className?: string };

const inline: CSSProperties = { display: "inline-block", flex: "none" };

/** Replaces ★ */
export function StarGlyph({ style, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={{ ...inline, width: "1em", height: "1em", verticalAlign: "-0.14em", ...style }}
    >
      <path d="m12 2.2 3 6.2 6.8 1-4.9 4.8 1.2 6.8L12 17.8 5.9 21l1.2-6.8-4.9-4.8 6.8-1z" />
    </svg>
  );
}

const arrow = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Replaces ↗ */
export function ArrowUpRightGlyph({ style, className }: Props) {
  return (
    <svg {...arrow} className={className} style={{ ...inline, width: "0.95em", height: "0.95em", ...style }}>
      <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
    </svg>
  );
}

/** Replaces → */
export function ArrowRightGlyph({ style, className }: Props) {
  return (
    <svg {...arrow} className={className} style={{ ...inline, width: "1em", height: "1em", ...style }}>
      <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  );
}
