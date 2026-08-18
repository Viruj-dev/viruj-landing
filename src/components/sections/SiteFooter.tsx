"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";

const navigation = {
  Product: ["Features", "Doctors", "Appointments", "Medical Records"],
  Company: ["About", "Contact", "Privacy", "Terms"],
  Resources: ["FAQ", "Support", "Careers", "Blog"],
};

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[var(--primary)] pt-28 text-[var(--on-primary)]">
      <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/brand/logo.png"
                alt="Viruj"
                width={52}
                height={52}
                className="rounded-2xl"
              />

              <div>
                <h3 className="text-xl font-semibold text-white">Viruj Health</h3>
                <p className="mt-1 text-[15px] text-white/70">
                  One connected healthcare journey.
                </p>
              </div>
            </div>

            <div className="mt-8 h-px w-24 bg-white/25" />

            <p className="mt-10 max-w-md text-[16px] leading-8 text-white/65">
              Viruj brings appointments, medical records, prescriptions, diagnostics
              and AI-powered care into one beautifully connected experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(navigation).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                  {title}
                </h4>

                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[15px] text-white/75 transition-all duration-300 hover:text-white hover:translate-x-1"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 h-px bg-white/25" />

        <div className="flex flex-col gap-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Viruj Health. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-medium">
            <Link href="#" className="transition-all duration-300 hover:text-white">
              LinkedIn
            </Link>
            <Link href="#" className="transition-all duration-300 hover:text-white">
              Instagram
            </Link>
            <Link href="#" className="transition-all duration-300 hover:text-white">
              X
            </Link>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none mt-6 overflow-hidden select-none">
        <h2 className="text-center font-sentient text-[clamp(4rem,18vw,18rem)] leading-[0.72] tracking-[-0.05em] text-white/[0.3] uppercase">
          VIRUJ
        </h2>
      </div>
    </footer>
  );
}
