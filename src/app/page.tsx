import LandingPage from "@/components/LandingPage";

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://virujhealth.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Viruj Health",
        "url": siteUrl,
        "logo": `${siteUrl}/brand/logo.png`,
        "sameAs": [],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+917982958828",
            "contactType": "customer support",
            "email": "help@virujhealth.com",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Viruj Health",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "description":
          "Healthcare technology platform connecting patients with doctors, clinics, and hospital workspaces.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPage />
    </>
  );
}

