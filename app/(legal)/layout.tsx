import type { Metadata } from "next";
import { Container } from "@/components/ui/Section";

/* Drafts stay out of search results until a US attorney has reviewed them. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LegalLayout({ children }: LayoutProps<"/">) {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <p className="mb-10 rounded-xl border border-dashed border-amber bg-amber/10 px-4 py-3 font-mono text-xs leading-relaxed">
        DRAFT. This page has not been reviewed by a US attorney yet and is not
        final. Items in [brackets] are not decided.
      </p>
      <article className="leading-relaxed text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h1]:font-display [&_h1]:text-[clamp(32px,5vw,48px)] [&_h1]:leading-tight [&_h1]:font-bold [&_h1]:tracking-[-0.035em] [&_h1]:text-ink [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </article>
    </Container>
  );
}
