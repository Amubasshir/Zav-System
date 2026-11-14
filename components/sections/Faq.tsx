import { Eyebrow, Heading, Lead, Section } from "@/components/ui/Section";
import { PlusIcon } from "@/components/ui/icons";
import { faqs } from "@/lib/faq";

/**
 * Native <details> accordion: works with no JavaScript, and every answer is
 * in the HTML for Google and AI search. The FAQPage schema is in app/page.tsx.
 */
export default function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <Heading>Straight answers.</Heading>
          <Lead>
            The questions HVAC owners ask us before they sign up.
          </Lead>
        </div>

        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <PlusIcon className="size-5 flex-none text-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
