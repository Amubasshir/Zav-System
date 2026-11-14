import type { ReactNode } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { Eyebrow, Heading, Lead, Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";

const WITHOUT = "Just a website";
const WITH = "The ZAV System";

type Row = {
  moment: string;
  detail: string;
  without: string;
  with: ReactNode;
};

/** Highlighted words inside the ZAV column. */
function Hl({ children }: { children: ReactNode }) {
  return <em className="text-accent not-italic">{children}</em>;
}

const ROWS: Row[] = [
  {
    moment: "Someone searches",
    detail: "\"AC repair near me\"",
    without: "They land on a slow page and can't find your number.",
    with: "A fast site built for phones, with your number one tap away.",
  },
  {
    moment: "You miss a call",
    detail: "You are on a roof",
    without: "It rings out. They call the next company.",
    with: (
      <>
        They get a text from your business <Hl>within seconds.</Hl>
      </>
    ),
  },
  {
    moment: "A quote request comes in",
    detail: "At 9pm",
    without: "It sits in your inbox until morning.",
    with: (
      <>
        They get a text reply <Hl>right away,</Hl> even at night.
      </>
    ),
  },
  {
    moment: "A new lead arrives",
    detail: "While you are working",
    without: "You find out hours later, if at all.",
    with: "Your phone gets an alert with their name, number and what they need.",
  },
  {
    moment: "The job is finished",
    detail: "Happy customer",
    without: "You mean to ask for a review. You forget.",
    with: "A Google review request goes out for you, automatically.",
  },
];

/* Layout: one 3-column table from 861px up, one stacked card per row below.
   On desktop each row is display:contents so its cells sit in the table grid. */
const row =
  "mt-3.5 block overflow-hidden rounded-[18px] border border-cardline bg-card shadow-[0_1px_2px_rgba(12,17,22,.05),0_10px_24px_-14px_rgba(12,17,22,.16)] first:mt-0 min-[861px]:contents";
const cell =
  "flex min-w-0 flex-col justify-center p-[18px] min-[861px]:px-[26px] min-[861px]:py-6";
const headCell =
  "px-[26px] py-[18px] font-mono text-xs tracking-[0.08em] uppercase";
/* Column labels that only show in the stacked mobile cards. */
const tag =
  "mb-2 block font-mono text-[11px] tracking-[0.08em] uppercase min-[861px]:hidden";

export default function Compare() {
  return (
    <Section id="compare">
      <Eyebrow>Website vs. the ZAV System</Eyebrow>
      <Heading className="max-w-[820px]">
        Your website sits there.{" "}
        <span className="whitespace-nowrap">
          ZAV{" "}
          <span className="relative whitespace-nowrap text-accent after:absolute after:inset-x-0 after:bottom-[0.04em] after:h-[0.11em] after:rounded-md after:bg-current after:opacity-25 after:content-['']">
            answers.
          </span>
        </span>
      </Heading>
      <Lead className="max-w-[520px] text-muted">
        Same homeowner, same five moments. What changes is whether anything
        happens while you are on a job.
      </Lead>

      <div
        role="table"
        aria-label="What happens with just a website compared with the ZAV System"
        className="mt-8 min-[861px]:mt-12 min-[861px]:grid min-[861px]:grid-cols-[minmax(220px,1fr)_minmax(0,1.25fr)_minmax(0,1.45fr)] min-[861px]:overflow-hidden min-[861px]:rounded-[22px] min-[861px]:border min-[861px]:border-cardline min-[861px]:bg-card min-[861px]:shadow-[0_1px_2px_rgba(12,17,22,.05),0_18px_40px_-18px_rgba(12,17,22,.16)]"
      >
        <div role="row" className="hidden min-[861px]:contents">
          <div role="columnheader" className={`${headCell} text-muted`}>
            The moment
          </div>
          <div
            role="columnheader"
            className={`${headCell} border-l border-cardline text-muted`}
          >
            {WITHOUT}
          </div>
          <div
            role="columnheader"
            className={`${headCell} border-l border-white/10 bg-dark text-accent`}
          >
            {WITH}
          </div>
        </div>

        {ROWS.map((r) => (
          <div key={r.moment} role="row" className={row}>
            <div
              role="cell"
              className={`${cell} border-cardline min-[861px]:border-t`}
            >
              <p className="font-display text-[19px] leading-[1.2] font-bold tracking-[-0.02em] min-[861px]:text-xl">
                {r.moment}
                <span className="mt-1.5 block font-sans text-sm font-normal tracking-normal text-muted">
                  {r.detail}
                </span>
              </p>
            </div>

            <div
              role="cell"
              className={`${cell} border-t border-cardline leading-normal text-muted min-[861px]:border-l`}
            >
              <span className={`${tag} text-muted`}>{WITHOUT}</span>
              <p className="line-through decoration-[#DC2626]/55 decoration-[1.5px]">
                {r.without}
              </p>
            </div>

            <div
              role="cell"
              className={`${cell} border-t border-white/10 bg-dark text-[16.5px] leading-normal font-medium text-white min-[861px]:border-l`}
            >
              <span className={`${tag} text-accent`}>{WITH}</span>
              <p className="flex gap-3">
                <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-accent">
                  <CheckIcon className="size-3 text-white" strokeWidth={3.4} />
                </span>
                <span>{r.with}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-[18px] gap-y-4">
        <ButtonLink href="/#book" arrow>
          Book a 15-min demo
        </ButtonLink>
        <span className="font-mono text-xs tracking-[0.02em] text-muted">
          $199/month · No contract · Live in 7 days
        </span>
      </div>
    </Section>
  );
}
