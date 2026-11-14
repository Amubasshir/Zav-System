/**
 * Single source of truth for site-wide facts.
 *
 * Anything set to null is not decided or not provided yet (see CLAUDE.md
 * section 10). Components hide or show a setup note for null values. Never
 * fill these with guesses.
 */
export const site = {
  name: "ZAV",
  url: "https://getzav.com",
  productName: "The ZAV System for HVAC Companies",
  tagline: "Found first. Answered fast. Booked solid.",
  description:
    "A done-for-you website, instant replies to every missed call and web lead, and automatic Google review requests for HVAC companies. $199/month, no contract.",
  priceUsd: 199,

  /** GoHighLevel calendar link for the 15-minute demo. */
  bookingUrl: null as string | null,
  /** Link or form for the free Lead Leak Audit request. */
  auditUrl: null as string | null,
  /** Demo line: the owner calls it, hangs up, and gets a text back. E.164, e.g. "+12145550100". */
  demoPhone: null as string | null,
  /** How demoPhone is shown on the page, e.g. "(214) 555-0100". */
  demoPhoneDisplay: null as string | null,
  supportEmail: null as string | null,
};
