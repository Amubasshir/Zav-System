import { Eyebrow, Heading, Lead, Section } from "@/components/ui/Section";
import { PlusIcon } from "@/components/ui/icons";
import { faqs } from "@/lib/faq";

/**
 * Native <details> accordion: works with no JavaScript, and every answer is
 * in the HTML for Google and AI search. The FAQPage schema is in app/page.tsx.
 * name="faq" makes it one-open-at-a-time natively. Open/close motion lives in
 * globals.css (.faq-item).
 */
export default function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <Heading>
            Straight <span className="text-accent-dark">answers.</span>
          </Heading>
          <Lead>The questions HVAC owners ask us before they sign up.</Lead>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              name="faq"
              open={i === 0}
              className="faq-item group rounded-2xl border border-line bg-white/50 transition-[background-color,box-shadow] duration-300 hover:bg-white/80 open:bg-white open:shadow-[0_18px_40px_-26px_rgba(12,17,22,0.3)] motion-reduce:transition-none"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-5 py-5 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="w-6 flex-none font-mono text-xs font-normal text-muted transition-colors duration-300 group-open:text-accent-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{faq.question}</span>
                <span className="grid size-8 flex-none place-items-center rounded-full border border-line text-muted transition duration-300 group-hover:border-accent group-hover:text-accent-dark group-open:rotate-45 group-open:border-transparent group-open:bg-accent group-open:text-ink motion-reduce:transition-none">
                  <PlusIcon className="size-4" />
                </span>
              </summary>
              <p className="faq-answer max-w-2xl pb-6 pl-[3.75rem] pr-6 leading-relaxed text-muted sm:pl-16">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
