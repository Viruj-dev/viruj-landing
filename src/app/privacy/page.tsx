import type { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Website privacy | Viruj Health",
  description:
    "How contact drafts and screenshots are handled on the Viruj landing page.",
};

export default function PrivacyPage() {
  return (
    <main className="wrap legal-page">
      <Link href="/">← Back to Viruj</Link>
      <h1>Website privacy</h1>
      <p>
        This notice covers this landing page. Ask the Viruj team for the
        policies that apply to the patient app or your provider workspace before
        sharing health information.
      </p>
      <h2>Contact drafts stay in your browser.</h2>
      <p>
        The contact form prepares an email draft. It does not submit your name,
        email, or message to a Viruj server. Your email app sends the message
        only when you choose to send it. The copy button copies the draft to
        your clipboard.
      </p>
      <h2>Leave private health details out.</h2>
      <p>
        Please do not include medical records, reports, or private health
        details in a landing-page enquiry. Contact us first to ask for the
        appropriate support channel.
      </p>
      <h2>Screenshots use sample data.</h2>
      <p>
        The mobile screenshots on this page were captured from the app’s
        sample-data preview. They do not show real patient records.
      </p>
      <h2>Other websites have their own policies.</h2>
      <p>
        Opening the provider portal takes you to a separate service. Its account
        and data policies apply there. This landing page does not read your
        provider account.
      </p>
      <h2>Questions about your data?</h2>
      <p>
        Email <a href={`mailto:${destinations.email}`}>{destinations.email}</a>{" "}
        to ask about data access, retention, or the policies for the product you
        use.
      </p>
    </main>
  );
}
