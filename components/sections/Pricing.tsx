import ButtonLink from "@/components/ui/ButtonLink";
import { Eyebrow, Heading, Lead, Section } from "@/components/ui/Section";
import { CheckIcon, XIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

const INCLUDED = [
  "A fast, mobile-first HVAC website",
  "Tap-to-call and a quote form at the top",
  "Pages for your services and service areas",
  "Set up for Google and AI search",
  "Text back to every missed call",
  "Instant text reply to every website lead",
  "Instant alert to you for every new lead",
  "Google review request after every job",
  "Setup and upkeep done for you",
];

/* CLAUDE.md section 3: never promise these at $199. */
const NOT_INCLUDED = [
  "Custom features or integrations",
  "Ongoing SEO or blog writing",
  "Backlinks",
  "Google Business Profile management",
  "Paid ads",
  "AI voice receptionist",
];

export default function Pricing() {
  return (
    <Section id="pricing" tone="card">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Pricing</Eyebrow>
        <Heading>One plan. One price.</Heading>
        <Lead className="mx-auto text-muted">
          No tiers to compare and no contract to sign.
        </Lead>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-3xl border border-cardline bg-white shadow-[0_1px_2px_rgba(12,17,22,.06),0_14px_34px_-8px_rgba(12,17,22,.14)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col bg-dark p-8 text-white sm:p-10">
          <p className="font-mono text-xs tracking-[0.06em] text-accent uppercase">
            The ZAV System
          </p>
          <p className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-7xl leading-none font-bold tracking-[-0.05em]">
              ${site.priceUsd}
            </span>
            <span className="text-lg text-white/70">/month</span>
          </p>
          <ul className="mt-8 space-y-3 font-mono text-sm text-white/80">
            {["No contract", "Cancel anytime", "Live in 7 days"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckIcon className="size-4 flex-none text-green" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 leading-relaxed text-white/70">
            You own your website content, your leads, and your data.
          </p>
          <div className="mt-auto pt-10">
            <ButtonLink href="/#book" variant="light" arrow className="w-full">
              Book a 15-min demo
            </ButtonLink>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h3 className="font-semibold">What you get</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon className="mt-1 size-4 flex-none text-green" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 border-t border-line pt-8 font-semibold">
            Not part of this plan
          </h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 text-muted sm:grid-cols-2">
            {NOT_INCLUDED.map((item) => (
              <li key={item} className="flex gap-3">
                <XIcon className="mt-1 size-4 flex-none" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            One standard system, no custom work. That is how the price stays at
            $199.
          </p>
        </div>
      </div>
    </Section>
  );
}
