import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** primary: ink pill. secondary: card pill with a border. light: white pill for dark sections. */
  variant?: "primary" | "secondary" | "light";
  size?: "md" | "sm";
  /** Shows the blue arrow badge used on the hero's main button. */
  arrow?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,border-color] duration-200 ease-out-soft hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const variants = {
  primary:
    "bg-ink text-white shadow-[0_10px_24px_rgba(12,17,22,.18)] hover:shadow-[0_16px_30px_rgba(12,17,22,.24)]",
  secondary: "border border-line bg-card text-ink hover:border-accent",
  light: "bg-white text-ink shadow-[0_10px_24px_rgba(0,0,0,.25)]",
};

const sizes = {
  md: "h-14 px-[26px] text-[17px]",
  sm: "h-10 px-4 text-sm",
};

/** Same pill buttons as the hero, for every other section. */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: Props) {
  const classes = [
    base,
    variants[variant],
    sizes[size],
    arrow && size === "md" ? "pr-2.5" : "",
    className,
  ].join(" ");

  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="grid size-7 place-items-center rounded-full bg-accent text-sm text-white"
        >
          ↗
        </span>
      )}
    </>
  );

  // External links (booking calendar and so on) are plain anchors.
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
