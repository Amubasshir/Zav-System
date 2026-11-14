# ZAV: full project brief

Source of truth: "ZAV Standard Operating Procedures v2" (Oct 11, 2026). If anything here conflicts with a newer decision from Mubasshir, ask him before building.

## 1. What ZAV is

ZAV (getzav.com) sells one done-for-you system to US HVAC companies for **$199/month, no contract**: a website that gets them found, instant replies to every lead and missed call, and automatic Google review requests.

- **Product name:** the ZAV System. Full name: "The ZAV System for HVAC Companies".
- **Tagline:** Found first. Answered fast. Booked solid.
- **Core promise:** no lead goes unanswered.
- **Founder:** Mubasshir Ahmed (solo for now, based in Bangladesh, selling to the US).
- **Goal:** $10k MRR, which is about 51 clients at $199.
- **Operating rule until $10k MRR:** one product, one price, no custom work. HVAC is the only niche.
- **Test for every task:** does this help get or keep HVAC customers right now? If not, say so.

## 2. Who the customer is

| Attribute | Target |
| --- | --- |
| Industry | Residential HVAC (repair, install, maintenance) |
| Location | United States only (Canada, then Australia later) |
| Size | Owner-operators up to about 15 technicians |
| Decision maker | Owner or general manager |
| Pain | Calls go to voicemail, missed calls get no callback, slow replies to web forms, few or old Google reviews, outdated or slow website |
| Poor fit | Franchises with corporate marketing, companies on a full ServiceTitan marketing stack, anyone wanting custom development |

The reader is a busy owner, often on a phone between jobs. He is not technical.

## 3. The offer (three pillars)

| Pillar | What the client gets |
| --- | --- |
| Get Found | A fast, mobile-first HVAC website with click-to-call, a quote form above the fold, local service pages, and AI-search basics (schema, FAQ content, consistent business details) |
| Get Answered | Missed-call text-back within seconds, instant SMS reply to every website lead, instant owner alert for every new lead |
| Get Booked | Automatic Google review request to every customer after a completed job |

**Price:** $199/month. No contract, cancel anytime. Setup fee: not decided yet, do not state one.

**Promises on the site:** live in 7 days; you own your website content, your leads and your data; cancel anytime.

**Not included at $199 (never promise these):** custom features or integrations, ongoing SEO or blog content, backlinks, Google Business Profile management, paid ads, AI voice receptionist. Add-ons come later and have no prices yet.

**Offer ladder:** free Lead Leak Audit (a personalized 3 to 5 minute video) -> ZAV System at $199/month -> add-ons later.

## 4. Messaging rules

- Sell outcomes: more jobs booked, more calls answered, faster replies, more reviews. The chosen hero headline is "Book more HVAC jobs this season."
- Do not lead with AI, GoHighLevel, automation or technology. The client never needs to know what runs the system.
- Say the price openly. $199 with no contract is a selling point.
- Plain, short sentences an HVAC owner understands in one read. No jargon.
- Never use em dashes in any copy.
- Never mention Digital Monk (Mubasshir's dev agency) on ZAV material.
- Never invent results, numbers, logos, reviews or testimonials. There are no clients yet. Leave a testimonial section out, or build it as an empty slot, until real ones exist with written permission.
- "Too cheap, what's the catch?" answer: one standard system built from a proven template, no custom work.

### Approved sales page copy

```
The ZAV System for HVAC Companies
Found first. Answered fast. Booked solid.

A complete website and lead-response system that helps HVAC companies turn more searches, calls, and quote requests into booked jobs.

Get Found: a fast HVAC website that shows up on Google and in AI search, with your number one tap away.
Get Answered: missed a call on a job? The caller gets a text from your business within seconds. Website leads get a reply instantly, even at 9pm.
Get Booked: every customer gets a Google review request after the job, automatically.

$199/month. No contract. Live in 7 days.
You own your website content, your leads, and your data. Cancel anytime.
```

## 5. How the system is delivered (context, not for the site)

- Client systems run on GoHighLevel: one sub-account per client from one ZAV HVAC snapshot. Client websites are built in GHL from a template.
- Texting needs carrier registration (A2P 10DLC) per client. Website and alerts go live in 7 days; text features switch on when registration is approved.
- Review requests go to every customer equally. No filtering by sentiment, no incentives.
- The sales demo: the owner calls a demo number, hangs up, and gets a text back on his own phone within seconds.

## 6. This repo: getzav.com

ZAV's own marketing site. It stays on Next.js (chosen for speed), not GHL.

**Job of the site:** get an HVAC owner to book a 15-minute demo or ask for the free audit.

**Stack:** Next.js latest (App Router), TypeScript. Hero uses a CSS module, no animation library.

**Logo:** `components/ui/Logo.tsx` (inline SVG traced from Mubasshir's artwork; `variant="mark"` for the Z alone). Use it wherever the ZAV logo appears. `app/icon.svg` is the favicon, `public/logo.svg` is the standalone file.

**Sections the home page needs**
1. Hero (already built, see section 8)
2. Compare (`#compare`): just a website vs. the ZAV System, five moments side by side
3. What's included (`#included`): seven things the system does, in `components/ZavIncluded/` (design provided by Mubasshir, do not redesign)
4. How it works: sign up, 7-day build, go live
5. Google reviews (`#reviews`): the review request story, in `components/ZavReviews/` (design provided by Mubasshir, do not redesign). The old `#demo` section is gone; the hero's "Watch it book a job" button points to `#included`
   - Missed-call calculator (`#calculator`), between reviews and pricing, in `components/ZavCalculator/` (design provided by Mubasshir, do not redesign). Its output is an estimate from the visitor's own numbers and must stay labeled that way.
6. Pricing: one plan, $199/month, what is included and what is not
7. FAQ: ownership, cancelling, the 7 days, texting registration, "what's the catch"
8. Book a demo (`#book`): 15-minute call

**Other pages:** privacy policy, terms, SMS terms.

**Integrations (ask Mubasshir for the details before wiring):**
- Demo booking: GoHighLevel calendar embed or link.
- Lead form and any phone number: ZAV's own GHL sub-account, so ZAV runs on its own product.
- Never show or send from tryzav.com or hellozav.com; those are for outreach only.

**Site standards (same bar ZAV sells to clients)**
- Mobile first, fast on a phone over 4G.
- CTA visible without scrolling on every screen size.
- LocalBusiness or Organization schema and an FAQ section with FAQ schema.
- Consent text next to every phone field, linked to the privacy policy and SMS terms.

## 7. Compliance for anything customer-facing

- No fake, AI-written or bought reviews or testimonials.
- No claims ZAV has not proven. Any "jobs recovered" figure must be labeled as an estimate or an example.
- Any form that collects a phone number needs consent wording and opt-out language ("Reply STOP to opt out") in the texts that follow.
- Legal pages need review by a US attorney before the first paying client. Flag this, do not write them as final.

## 8. Hero section (done, do not redesign)

Files provided: `ZavHero.tsx`, `ZavHero.module.css`. `zav-hero.html` is the visual reference only.

- Both live in `components/ZavHero/` and `<ZavHero />` renders at the top of `app/page.tsx`. `ZavHero.tsx` is a Server Component; only `HeroDemoCard.tsx` (rotating card) and `HeroWires.tsx` (connector lines) are client components.
- Other sections are Server Components in `components/sections/`, styled with Tailwind v4 using the palette tokens in `app/globals.css`. Undecided links and numbers live in `lib/site.ts` as `null`.
- `next.config.ts` excludes `*.module.css` from the Tailwind loader rule. Do not remove that, or every CSS module class becomes `undefined`.
- Fonts via `next/font/google` in `app/layout.tsx`, exposed as CSS variables: Inter -> `--font-inter`, Space Grotesk (500, 700) -> `--font-grotesk`, IBM Plex Mono (400, 500) -> `--font-mono`.
- The connector lines are measured from the DOM with a `ResizeObserver`; keep that. Beam settings are in the `BEAM` object.
- "$199/month, no contract." must stay on one line at every width.

**Theme:** background `#F3F4F1`, ink `#0C1116`, muted `#5E656C`, card `#FBFBF9`, line `#DADDD6`, accent blue `#1FB2F5`, darker blue `#0E9FE3`, green `#16A34A`, amber `#F5A301`. Build every other section from these.

## 9. Competitors (for positioning, never name them on the site)

- Resold GoHighLevel agencies are the most common rival in sales calls. ZAV's edge: one simple package, open price, no contract, client owns the site and leads.
- AI phone receptionists (Rosie, Sameday, Avoca, NextPhone, Smith.ai) answer calls only. ZAV is website plus replies plus reviews.
- Closest full bundles: MyBusinessFlow, Topline Pro, Podium.

## 10. Still undecided (use placeholders, do not guess)

Setup fee, add-on prices, support email and phone, support hours, referral reward, target states.
