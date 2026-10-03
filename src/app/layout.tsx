import type { Metadata } from "next";
import "@/app/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Viruj Health | You and your care team, connected",
  description:
    "Find care, request a visit, and keep track. Viruj connects a patient app with a workspace for doctors, clinics, hospitals, and labs.",
  openGraph: {
    title: "Viruj Health | Less running around. More care.",
    description:
      "A patient app and a provider workspace. One connected booking journey.",
    type: "website",
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
