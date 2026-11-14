import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SMS terms",
  description: "The terms for text messages from ZAV.",
  alternates: { canonical: "/sms-terms" },
};

export default function SmsTermsPage() {
  return (
    <>
      <h1>SMS terms</h1>
      <p>Last updated: [date]</p>

      <h2>What you are agreeing to</h2>
      <p>
        When you give ZAV your mobile number and agree to receive texts, you
        agree that we may text you about your demo, your audit request and your
        account. Consent is not a condition of buying anything.
      </p>

      <h2>How often</h2>
      <p>Message frequency varies with your request and your account.</p>

      <h2>Cost</h2>
      <p>
        We do not charge for texts. Message and data rates from your mobile
        carrier may apply.
      </p>

      <h2>How to stop</h2>
      <p>
        <strong>Reply STOP to opt out</strong> at any time. You will get one
        last text to confirm, and then no more.
      </p>

      <h2>How to get help</h2>
      <p>Reply HELP, or contact us at [support email] or [support phone].</p>

      <h2>Carriers</h2>
      <p>Mobile carriers are not liable for delayed or undelivered messages.</p>

      <h2>Your privacy</h2>
      <p>
        We do not sell or share your mobile number or your text message consent
        with third parties or affiliates for their marketing purposes. See our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </>
  );
}
