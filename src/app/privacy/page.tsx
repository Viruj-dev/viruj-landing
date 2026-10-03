import type { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Website Privacy | Viruj Health",
  description:
    "How information, waitlist submissions, and inquiries are handled on the Viruj Health website.",
};

export default function PrivacyPage() {
  return (
    <main className="wrap legal-page">
      <div className="legal-back-nav">
        <Link href="/">← Back to Viruj Health</Link>
      </div>
      <h1>Website Privacy Notice</h1>
      <p className="legal-meta">
        This notice specifically covers this website (virujhealth.com). For our mobile application and patient services data policy, please see our <Link href="/privacy-policy">App Privacy Policy</Link>.
      </p>

      <h2>1. Inquiries and Waitlist Submissions</h2>
      <p>
        When you submit an inquiry through our contact form or join the early-access waitlist, we collect your name,
        email address, and the details of your inquiry. This information is used strictly to respond to your request,
        provide product onboarding assistance, and notify you when service launches in your area.
      </p>

      <h2>2. Leave Private Medical Records Out</h2>
      <p>
        Please do not include sensitive medical records, prescription scans, or private health details in a general website inquiry.
        Direct medical consultations and records management are handled securely within the authenticated Viruj patient mobile app.
      </p>

      <h2>3. Screenshots and Product Previews</h2>
      <p>
        The mobile application screenshots featured on this website are illustrative previews using sample data.
        They do not contain any real patient records or confidential health data.
      </p>

      <h2>4. External Services &amp; Provider Portals</h2>
      <p>
        Links to our provider ERP workspace (erp.virujhealth.com) connect to authenticated enterprise portals governed by
        respective clinical agreements and organizational access rules.
      </p>

      <h2>5. Questions About Your Data</h2>
      <p>
        If you have any questions about your data or wish to request data updates/deletion, please contact us at:
        <br />
        Email: <a href={`mailto:${destinations.email}`}>{destinations.email}</a>
        <br />
        Phone: <a href={`tel:${destinations.phone}`}>{destinations.phone}</a>
      </p>

      <div className="legal-footer-links">
        <Link href="/privacy-policy">App Privacy Policy</Link> ·{" "}
        <Link href="/terms">Terms of Use</Link> ·{" "}
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
