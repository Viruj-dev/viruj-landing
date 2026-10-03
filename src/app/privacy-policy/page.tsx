import type { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Privacy Policy | Viruj Health App",
  description:
    "Privacy Policy for the Viruj Health Patient App and Services, detailing data protection, medical record privacy, and user rights.",
};

export default function AppPrivacyPolicyPage() {
  return (
    <main className="wrap legal-page">
      <div className="legal-back-nav">
        <Link href="/">← Back to Viruj Health</Link>
      </div>

      <h1>Viruj Health App Privacy Policy</h1>
      <p className="legal-meta">
        <strong>Last Updated:</strong> October 2026 · Effective for Viruj Mobile App & Patient Services
      </p>

      <section>
        <h2>1. Our Commitment to Privacy</h2>
        <p>
          At Viruj Health, your privacy and health data confidentiality are of paramount importance.
          This Privacy Policy explains how Viruj Health (&ldquo;Viruj&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects,
          uses, stores, and protects your personal and health-related information when you use the Viruj Health
          mobile application, patient portal, and associated care coordination services.
        </p>
      </section>

      <section>
        <h2>2. Consent and Governance</h2>
        <p>
          By creating an account, downloading, or using Viruj Health, you consent to the collection, storage, and
          processing of your information in accordance with this Privacy Policy, India&apos;s Digital Personal Data Protection
          Act (DPDP Act 2023), the Information Technology Act 2000, and applicable healthcare data regulations. If you do not
          agree with these terms, please do not access or use the app.
        </p>
      </section>

      <section>
        <h2>3. Information We Collect</h2>
        <p>We collect only the information necessary to provide seamless healthcare access and appointment management:</p>
        <ul>
          <li>
            <strong>Personal Identification Information:</strong> Full name, email address, phone number, age, date of birth,
            gender, and residential city/address.
          </li>
          <li>
            <strong>Health &amp; Medical Details:</strong> Self-reported symptoms, appointment visit notes, medical records,
            uploaded test reports or doctor prescriptions, vitals, and consultation history.
          </li>
          <li>
            <strong>Device &amp; App Interactions:</strong> Device model, operating system, diagnostic logs, and approximate location
            (with explicit device permission) solely to locate nearby clinics, hospitals, and doctors.
          </li>
          <li>
            <strong>Permissions:</strong> Camera and photo storage permissions are requested only when you choose to upload medical
            documents, prescription slips, or profile photos.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. How We Use Your Information</h2>
        <p>Your data is used strictly for legitimate healthcare facilitation purposes:</p>
        <ul>
          <li>Facilitating appointment booking, confirmations, and reminders with your chosen doctors, clinics, and hospitals.</li>
          <li>Providing you with access to your digital health timeline, past consultations, and uploaded medical records.</li>
          <li>Enabling plain-language AI-assisted symptom queries and visit preparation (AI features operate with strict data safeguards and do not provide medical diagnosis).</li>
          <li>Sending critical transactional alerts, appointment status updates, and security notices.</li>
        </ul>
      </section>

      <section>
        <h2>5. Sharing of Information &amp; Clinical Confidentiality</h2>
        <p>
          We do <strong>not</strong> sell, rent, or monetize your personal or health data to advertisers or third-party marketers.
          Information is shared only under strict safeguards:
        </p>
        <ul>
          <li>
            <strong>Authorized Healthcare Providers:</strong> When you request an appointment, your relevant booking details and
            health complaint are shared with the selected clinician or facility to prepare for your consultation.
          </li>
          <li>
            <strong>Infrastructure Partners:</strong> Secure cloud and database hosting providers bound by strict confidentiality and
            data processing agreements.
          </li>
          <li>
            <strong>Legal Requirements:</strong> Disclosures mandated by applicable law, court order, or national regulatory authority.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Data Security &amp; Encryption</h2>
        <p>
          We employ industry-standard technical and organizational security controls, including end-to-end TLS encryption in
          transit, encrypted data storage at rest, strict role-based access limits, and regular security assessments to safeguard
          sensitive medical information against unauthorized access or alteration.
        </p>
      </section>

      <section>
        <h2>7. User Rights &amp; Account Deletion</h2>
        <p>Under applicable privacy laws, you hold full control over your personal data:</p>
        <ul>
          <li><strong>Access &amp; Review:</strong> Inspect your profile information and health history at any time within the app.</li>
          <li><strong>Data Correction:</strong> Update outdated or inaccurate contact and profile details.</li>
          <li>
            <strong>Account &amp; Data Deletion:</strong> You have the right to request deletion of your account and associated
            personal data. You can initiate account deletion within the app profile settings or by emailing{" "}
            <a href={`mailto:${destinations.email}`}>{destinations.email}</a> with the subject &ldquo;Account Deletion Request&rdquo;.
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Contact &amp; Grievance Officer</h2>
        <p>
          If you have any questions, concerns, or grievances regarding this Privacy Policy or how your health data is handled,
          please contact our team:
        </p>
        <p>
          <strong>Viruj Health Grievance Office</strong>
          <br />
          Email: <a href={`mailto:${destinations.email}`}>{destinations.email}</a>
          <br />
          Phone: <a href={`tel:${destinations.phone}`}>{destinations.phone}</a>
          <br />
          Location: Noida, Uttar Pradesh, India
        </p>
      </section>

      <div className="legal-footer-links">
        <Link href="/terms">Terms of Use</Link> ·{" "}
        <Link href="/privacy">Website Privacy Notice</Link> ·{" "}
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
