import type { Metadata } from "next";
import "@/app/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://virujhealth.com"
  ),
  title: "Viruj Health | Your care. All together.",
  description:
    "Find care, request a visit, and keep track. Viruj connects a patient app with a workspace for doctors, clinics, hospitals, and labs.",
  openGraph: {
    title: "Viruj Health | Your care. All together.",
    description:
      "A patient app and a provider workspace. One connected booking journey.",
    url: "https://virujhealth.com",
    siteName: "Viruj Health",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viruj Health | Your care. All together.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viruj Health | Your care. All together.",
    description:
      "A patient app and a provider workspace. One connected booking journey.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/brand/logo.png",
    shortcut: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
