import type { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Terms of Use | Viruj Health",
  description:
    "Terms of Use and user agreements for the Viruj Health platform, mobile application, and provider services.",
};

export default function TermsOfUsePage() {
  return (
    <main className="wrap legal-page">
      <div className="legal-back-nav">
        <Link href="/">← Back to Viruj Health</Link>
      </div>

      <h1>Terms of Use</h1>
      <p className="legal-meta">
        <strong>Last Updated:</strong> October 2026 · Governing all Viruj platforms, apps, and services
      </p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Viruj Health website, mobile applications, doctor/provider ERP workspace, or any related
          services (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these
          terms, you may not access or use the Services.
        </p>
      </section>

      <section>
        <h2>2. Important Medical &amp; Emergency Disclaimer</h2>
        <p>
          <strong>Viruj Health does not provide emergency medical care.</strong> If you are experiencing a medical emergency,
          life-threatening symptoms, or severe injury, please contact local emergency services immediately (e.g., 112 / 102 in
          India) or proceed to the nearest hospital emergency department.
        </p>
        <p>
          Viruj Health is a healthcare technology platform designed to facilitate discovery, appointment scheduling, and
          communication between patients and licensed healthcare professionals. The platform itself does not practice medicine,
          give clinical diagnoses, or prescribe treatments. Any clinical decisions are solely between you and your attending healthcare provider.
        </p>
      </section>

      <section>
        <h2>3. AI Assistant Disclaimer</h2>
        <p>
          The Viruj AI assistant provides informational summaries and educational content intended to help you understand health
          concepts and prepare questions for your doctor. It is <strong>not a medical device</strong>, does not produce medical
          diagnoses, and must never be relied upon as a substitute for professional medical advice, diagnosis, or treatment.
        </p>
      </section>

      <section>
        <h2>4. User Accounts &amp; Responsibilities</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account login credentials and OTPs.</li>
          <li>You agree to provide accurate, truthful, and current information during registration and booking requests.</li>
          <li>You must not use the Services for any unlawful, fraudulent, abusive, or unauthorized purposes.</li>
        </ul>
      </section>

      <section>
        <h2>5. Appointment Booking &amp; Provider Confirmations</h2>
        <p>
          Submitting an appointment request through Viruj constitutes a booking request. Appointment confirmations, slot
          availability, consultation fees, and rescheduling policies are managed directly by the respective healthcare provider
          or clinic facility.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property &amp; Acceptable Use</h2>
        <p>
          All trademarks, software code, logos, visual designs, and content on the Viruj platform are the intellectual property
          of Viruj Health and its licensors. Unauthorized copying, reverse engineering, scraping, or redistribution is strictly
          prohibited.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Viruj Health and its operators shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising out of or related to your use of the Services,
          including consultations or medical advice received from independent healthcare providers listed on the platform.
        </p>
      </section>

      <section>
        <h2>8. Governing Law &amp; Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or
          connected with these terms shall be subject to the exclusive jurisdiction of the competent courts in Delhi NCR, India.
        </p>
      </section>

      <section>
        <h2>9. Contact Information</h2>
        <p>
          For questions regarding these Terms of Use, please reach out to:
          <br />
          Email: <a href={`mailto:${destinations.email}`}>{destinations.email}</a>
          <br />
          Phone: <a href={`tel:${destinations.phone}`}>{destinations.phone}</a>
        </p>
      </section>

      <div className="legal-footer-links">
        <Link href="/privacy-policy">App Privacy Policy</Link> ·{" "}
        <Link href="/privacy">Website Privacy Notice</Link> ·{" "}
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
