import type { ReactNode } from "react";

/** Page-width wrapper shared by every section, the header and the footer. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** dark: slate background with light text. */
  tone?: "light" | "dark" | "card";
  className?: string;
};

const tones = {
  light: "",
  card: "border-y border-line bg-card",
  dark: "bg-dark text-white",
};

export function Section({
  id,
  children,
  tone = "light",
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Small mono label above a heading. */
export function Eyebrow({
  children,
  className = "text-muted",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs font-medium tracking-[0.06em] uppercase ${className}`}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`mt-4 font-display text-[clamp(30px,4.4vw,52px)] leading-[1.04] font-bold tracking-[-0.035em] text-balance ${className}`}
    >
      {children}
    </h2>
  );
}

/** Intro paragraph under a section heading. */
export function Lead({
  children,
  className = "text-muted",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
