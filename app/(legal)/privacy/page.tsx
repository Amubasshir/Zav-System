import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How ZAV collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <p>Last updated: [date]</p>

      <p>
        This policy explains what information ZAV ([legal entity name], &quot;ZAV&quot;,
        &quot;we&quot;) collects through getzav.com, how we use it, and the choices you
        have.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you give us.</strong> Your name, business name,
          phone number, email address and anything else you enter when you book
          a demo, ask for a Lead Leak Audit, or contact us.
        </li>
        <li>
          <strong>Information collected automatically.</strong> Basic technical
          data such as your browser type, device type, pages viewed and
          approximate location based on IP address.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your request and schedule your demo.</li>
        <li>To prepare and send the audit you asked for.</li>
        <li>To provide, maintain and improve our service.</li>
        <li>To send service messages about your account.</li>
        <li>To meet our legal obligations.</li>
      </ul>

      <h2>Text messages</h2>
      <p>
        If you give us your phone number and agree to receive texts, we will
        text you about your request. Message and data rates may apply. Reply
        STOP to opt out at any time. Reply HELP for help. See our{" "}
        <Link href="/sms-terms">SMS terms</Link> for details.
      </p>
      <p>
        <strong>
          We do not sell or share your mobile phone number or your text message
          consent with third parties or affiliates for their marketing
          purposes.
        </strong>
      </p>

      <h2>Who we share information with</h2>
      <p>
        We share information only with service providers who help us run our
        business, such as our customer relationship, scheduling, messaging and
        hosting providers. They may use it only to provide services to us. We
        may also share information when the law requires it. We do not sell
        your personal information.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your information for as long as we need it for the purposes
        above, or as the law requires. You can ask us to delete it sooner.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>You can ask for a copy of the information we hold about you.</li>
        <li>You can ask us to correct or delete it.</li>
        <li>You can opt out of texts by replying STOP.</li>
        <li>You can opt out of emails with the unsubscribe link.</li>
      </ul>

      <h2>Security</h2>
      <p>
        We use reasonable safeguards to protect your information. No system is
        perfectly secure, so we cannot guarantee absolute security.
      </p>

      <h2>Children</h2>
      <p>
        Our service is for businesses. It is not directed to children under 13,
        and we do not knowingly collect their information.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will post the new version here and update
        the date at the top.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: [support email]. Mailing address:
        [business address].
      </p>
    </>
  );
}
