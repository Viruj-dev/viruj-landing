import type { Metadata } from "next";
import "@/app/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Viruj Health | Integrated Health Platform",
  description:
    "Viruj is an AI-powered healthcare ecosystem connecting patients, doctors, diagnostics, and medical records.",
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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] antialiased">
        {children}
      </body>
    </html>
  );
}
