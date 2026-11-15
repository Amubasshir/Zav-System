import type { Metadata } from "next";
import DemoVideoSection from "@/components/DemoVideoSection";
import ZavCalculator from "@/components/ZavCalculator/ZavCalculator";
import ZavCompare from "@/components/ZavCompare/ZavCompare";
import ZavHero from "@/components/ZavHero/ZavHero";
import ZavHow from "@/components/ZavHow/ZavHow";
import ZavIncluded from "@/components/ZavIncluded/ZavIncluded";
import ZavPricing from "@/components/ZavPricing/ZavPricing";
import ZavReviews from "@/components/ZavReviews/ZavReviews";
import BookDemo from "@/components/sections/BookDemo";
import Compare from "@/components/sections/Compare";
import Faq from "@/components/sections/Faq";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Structured data for Google and AI search: who ZAV is, what it sells, the FAQ. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.svg`,
      slogan: site.tagline,
      description: site.description,
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "Service",
      "@id": `${site.url}/#service`,
      name: site.productName,
      serviceType: "Website and lead-response system for HVAC companies",
      description: site.description,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: { "@type": "Country", name: "United States" },
      offers: {
        "@type": "Offer",
        price: site.priceUsd,
        priceCurrency: "USD",
        url: `${site.url}/#pricing`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: site.priceUsd,
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ZavHero />
      <DemoVideoSection />
      <ZavIncluded />
      <Compare />
      <ZavReviews />
      <ZavCalculator />
      <ZavHow />
      <ZavCompare />
      <ZavPricing />
      <Faq />
      <BookDemo />
    </>
  );
}
