import type {
  SiteCard,
  SiteFeature,
  SiteLink,
  SiteModule,
  SiteStat,
  SiteTrustPoint,
} from "@/types";

export const siteLinks: SiteLink[] = [
  { label: "Story", href: "#story" },
  { label: "Product", href: "#product" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Trust", href: "#trust" },
];

export const siteStats: SiteStat[] = [
  { label: "Connected modules", value: "10+", detail: "One platform for care, operations, and intelligence." },
  { label: "Audience", value: "Patients + doctors", detail: "Built for the people using the app and the teams running it." },
  { label: "Focus", value: "MVP-ready", detail: "Simple to navigate, easy to expand, and deliberate in structure." },
];

export const heroHighlights = [
  "Patient App",
  "Doctor ERP",
  "AI Assistant",
  "Diagnostics",
  "Medical Records",
];

export const storyPoints = [
  "Care should not feel fragmented across apps, inboxes, and PDFs.",
  "Viruj keeps every touchpoint in one coordinated healthcare system.",
  "The website simply explains the ecosystem and invites people into it.",
];

export const productCards: SiteCard[] = [
  {
    eyebrow: "Patient app",
    title: "A single place for care",
    description:
      "Appointments, reports, follow-ups, reminders, and records stay visible in one calm interface.",
  },
  {
    eyebrow: "Doctor ERP",
    title: "Operational clarity for clinicians",
    description:
      "A cleaner view of patients, appointments, diagnostics, and continuity without extra platform noise.",
  },
  {
    eyebrow: "AI assistant",
    title: "Plain-language support",
    description:
      "The assistant explains symptoms, summaries, and next steps without replacing clinical judgment.",
  },
];

export const features: SiteFeature[] = [
  {
    title: "Clinically grounded",
    description:
      "The interface feels trustworthy, not experimental, with a palette and layout that read like healthcare.",
  },
  {
    title: "Easy to navigate",
    description:
      "Each section has one job and one story so the product is simple to scan on desktop and mobile.",
  },
  {
    title: "Ready for shipping",
    description:
      "Minimal files, clear content ownership, and reusable primitives keep the team moving quickly.",
  },
  {
    title: "Built for expansion",
    description:
      "The architecture can grow into docs, product detail pages, or app entry points without rework.",
  },
];

export const ecosystemModules: SiteModule[] = [
  { name: "Authentication", description: "Secure access for patients and doctors." },
  { name: "Appointments", description: "Booking and scheduling in one flow." },
  { name: "Medical Records", description: "Documents, reports, and history." },
  { name: "Diagnostics", description: "Tests, results, and clinical context." },
  { name: "AI Assistant", description: "Explanation, triage, and guidance." },
  { name: "Doctor ERP", description: "A practical operations layer for care teams." },
  { name: "Hospital Discovery", description: "Find the right place for the right care." },
  { name: "Community", description: "A space for support and continuity." },
  { name: "Notifications", description: "Reminders and follow-through without clutter." },
];

export const trustPoints: SiteTrustPoint[] = [
  {
    label: "Security-first",
    description: "The product story emphasizes privacy, controlled access, and responsible handling of health data.",
  },
  {
    label: "Clear positioning",
    description: "The site explains what Viruj is today instead of trying to become a design showcase.",
  },
  {
    label: "Designed to scale",
    description: "One straightforward shell can support future pages without rebuilding the foundation.",
  },
];

export const ctaCopy = {
  title: "Show the platform. Not the complexity.",
  description:
    "Viruj can now be explained with a clean, clinical marketing site that matches the product and stays easy to maintain.",
};
