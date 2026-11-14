import { Eyebrow, Heading, Section } from "@/components/ui/Section";

const STEPS = [
  {
    label: "Day 0",
    title: "Book a 15-minute call",
    body: "We show you the system working on your own phone. If it fits, you sign up. There is no contract.",
  },
  {
    label: "Days 1 to 7",
    title: "We build it for you",
    body: "You tell us about your business. We build your website and set up your lead replies and review requests.",
  },
  {
    label: "Day 7",
    title: "You go live",
    body: "Your website and lead alerts are live. Every new lead reaches you the moment it comes in.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how">
      <Eyebrow>How it works</Eyebrow>
      <Heading>Live in 7 days. We do the work.</Heading>

      <ol className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
        {STEPS.map((step, index) => (
          <li key={step.title} className="relative">
            <div className="flex items-center gap-4">
              <span className="grid size-11 flex-none place-items-center rounded-full bg-ink font-display text-lg font-bold text-white">
                {index + 1}
              </span>
              {/* line to the next step, desktop only */}
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-line lg:block"
              />
            </div>
            <p className="mt-6 font-mono text-xs tracking-[0.06em] text-muted uppercase">
              {step.label}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
              {step.title}
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-12 rounded-2xl border border-cardline bg-card p-5 leading-relaxed text-muted sm:p-6">
        <strong className="font-semibold text-ink">A note on texting.</strong>{" "}
        US phone carriers make every business register before it can text
        customers. We file that for you. Your text replies switch on as soon as
        the carriers approve it.
      </p>
    </Section>
  );
}
