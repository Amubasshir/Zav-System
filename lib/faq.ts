export type FaqItem = { question: string; answer: string };

/**
 * Used by the FAQ section and by the FAQPage schema, so the visible answers
 * and the structured data can never drift apart. Plain text only.
 */
export const faqs: FaqItem[] = [
  {
    question: "What do I get for $199 a month?",
    answer:
      "A fast website built for HVAC, a text back to every missed call within seconds, an instant text reply to every website lead, an alert to you for every new lead, and a Google review request to every customer after a job. We set it all up and run it for you.",
  },
  {
    question: "Is there a contract?",
    answer: "No. It is month to month. You can cancel anytime.",
  },
  {
    question: "Who owns the website and the leads?",
    answer:
      "You do. You own your website content, your leads and your data. If you cancel, they are still yours.",
  },
  {
    question: "How fast can I be live?",
    answer:
      "Your website and lead alerts go live in 7 days. Text replies switch on as soon as the phone carriers approve your business registration.",
  },
  {
    question: "Why does texting need a registration?",
    answer:
      "US phone carriers require every business to register before it can text customers. We file it for you. Approval time is up to the carriers, so texting can start a little after your website goes live.",
  },
  {
    question: "$199 sounds cheap. What's the catch?",
    answer:
      "No catch. It is one standard system built from a proven template, with no custom work. That is what keeps the price low.",
  },
  {
    question: "What is not included?",
    answer:
      "Custom features or integrations, ongoing SEO or blog writing, backlinks, Google Business Profile management, paid ads, and an AI voice receptionist. The $199 plan is one system that does three jobs well.",
  },
  {
    question: "Do I need to be good with technology?",
    answer: "No. We build it and we run it. You just answer your leads.",
  },
  {
    question: "Who gets a review request?",
    answer:
      "Every customer, after every completed job. We do not pick and choose who gets asked, and we never offer rewards for reviews.",
  },
  {
    question: "Is ZAV only for HVAC?",
    answer:
      "Yes. ZAV is built only for residential HVAC companies in the United States.",
  },
];
