import ButtonLink from "@/components/ui/ButtonLink";
import { Container, Eyebrow, Heading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

/**
 * Final call to action. The buttons read their links from lib/site.ts.
 * Until the GoHighLevel calendar and audit links are provided, a setup note
 * is rendered in their place so nothing links to a dead end.
 */
export default function BookDemo() {
  return (
    <section
      id="book"
      className="bg-[linear-gradient(rgba(12,17,22,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(12,17,22,.035)_1px,transparent_1px)] bg-[size:56px_56px] py-16 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl rounded-3xl border border-cardline bg-white p-8 text-center shadow-[0_1px_2px_rgba(12,17,22,.06),0_14px_34px_-8px_rgba(12,17,22,.14)] sm:p-14">
          <Eyebrow>Book a demo</Eyebrow>
          <Heading>See it work on your own phone.</Heading>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            A 15-minute call. You call our demo line, hang up, and get a text
            back in seconds. Then you decide.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            {site.bookingUrl ? (
              <ButtonLink href={site.bookingUrl} arrow>
                Book a 15-min demo
              </ButtonLink>
            ) : (
              <SetupNote>
                Booking calendar link not set. Add bookingUrl in lib/site.ts.
              </SetupNote>
            )}
          </div>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
            {["$199/month", "No contract", "Live in 7 days"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="size-3.5 text-green" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-line pt-8">
            <h3 className="font-semibold">Not ready for a call?</h3>
            <p className="mx-auto mt-2 max-w-lg leading-relaxed text-muted">
              Get a free Lead Leak Audit. It is a 3 to 5 minute video, made for
              your business, that shows where you are losing leads.
            </p>
            <div className="mt-5 flex justify-center">
              {site.auditUrl ? (
                <ButtonLink href={site.auditUrl} variant="secondary">
                  Get my free audit
                </ButtonLink>
              ) : (
                <SetupNote>
                  Audit request link not set. Add auditUrl in lib/site.ts.
                </SetupNote>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Visible only while a link is missing. Must be gone before launch. */
function SetupNote({ children }: { children: string }) {
  return (
    <p className="rounded-xl border border-dashed border-amber bg-amber/10 px-4 py-3 font-mono text-xs text-ink">
      {children}
    </p>
  );
}
