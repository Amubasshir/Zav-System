import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that apply when you use ZAV.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of service</h1>
      <p>Last updated: [date]</p>

      <p>
        These terms apply to getzav.com and to the ZAV System provided by
        [legal entity name] (&quot;ZAV&quot;, &quot;we&quot;). By using the site or signing up,
        you agree to them.
      </p>

      <h2>The service</h2>
      <p>
        The ZAV System is a done-for-you service for HVAC companies. It
        includes a website, a text back to missed calls, instant text replies
        to website leads, new lead alerts, and Google review requests after
        completed jobs. It is one standard system. Custom features and
        integrations are not included.
      </p>

      <h2>Price and billing</h2>
      <ul>
        <li>The price is $199 per month.</li>
        <li>You are billed monthly in advance. [Billing details to confirm.]</li>
        <li>There is no long-term contract.</li>
      </ul>

      <h2>Cancelling</h2>
      <p>
        You can cancel at any time. Your service runs until the end of the
        month you have paid for. [Notice method and refund terms to confirm.]
      </p>

      <h2>What you own</h2>
      <p>
        You own your website content, your leads and your data. If you cancel,
        they are still yours. [Export and handover process to confirm.]
      </p>

      <h2>Timing</h2>
      <p>
        We aim to have your website and lead alerts live within 7 days of
        receiving the information we need from you. Text messaging starts once
        the phone carriers approve your business registration. Carrier approval
        time is outside our control.
      </p>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Give us accurate information about your business.</li>
        <li>
          Only text people who have agreed to hear from you, and follow the law
          on text messaging and consumer contact.
        </li>
        <li>
          Do not offer rewards for reviews, and do not ask us to filter who
          gets a review request. Requests go to every customer.
        </li>
      </ul>

      <h2>No guarantee of results</h2>
      <p>
        We do not guarantee a number of leads, jobs, reviews or search
        rankings. Any figures on our site are examples or estimates.
      </p>

      <h2>Limits of liability</h2>
      <p>[To be written by a US attorney.]</p>

      <h2>Governing law</h2>
      <p>[To be decided with a US attorney.]</p>

      <h2>Related policies</h2>
      <p>
        See our <Link href="/privacy">privacy policy</Link> and{" "}
        <Link href="/sms-terms">SMS terms</Link>.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms: [support email].</p>
    </>
  );
}
