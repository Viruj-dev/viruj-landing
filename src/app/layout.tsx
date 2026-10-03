import type { Metadata } from "next";
import "@/app/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Urbanist } from "next/font/google";

const fontUrbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://virujhealth.com"
  ),
  title: {
    default: "Viruj Health | Healthcare Platform for Patients & Providers",
    template: "%s | Viruj Health",
  },
  description:
    "Viruj connects patients with doctors, clinics, and hospitals for streamlined appointment scheduling, digital medical records, and unified healthcare workflows.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Viruj Health | Your care. All together.",
    description:
      "Find care, request a visit, and keep track. Viruj connects a patient app with a workspace for doctors, clinics, hospitals, and labs.",
    url: "/",
    siteName: "Viruj Health",
    locale: "en_IN",
    type: "website",
    images: [
      {
        // TODO: Ensure a 1200x630px Open Graph banner is placed at public/og-image.png
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viruj Health | Connected Healthcare Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viruj Health | Your care. All together.",
    description:
      "Find care, request a visit, and keep track. One connected healthcare platform.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/brand/logo.png",
    shortcut: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontUrbanist.variable}>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
