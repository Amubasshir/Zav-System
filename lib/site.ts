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

  /**
   * Cal.com event for the 15-minute demo, e.g. "zav/demo" or the full
   * "https://cal.com/zav/demo". Null shows a "booking opens soon" note.
   */
  calLink: null as string | null,
  /** Who takes the demo call, e.g. "Mubasshir, the founder". Null hides the card. */
  hostName: null as string | null,
  /* The audit form posts to /api/audit, which forwards to AUDIT_WEBHOOK_URL (env). */
  /** Demo line: the owner calls it, hangs up, and gets a text back. E.164, e.g. "+12145550100". */
  demoPhone: null as string | null,
  /** How demoPhone is shown on the page, e.g. "(214) 555-0100". */
  demoPhoneDisplay: null as string | null,
  supportEmail: null as string | null,
};
