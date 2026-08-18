"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";

export function CtaSection() {
  return (
    <section className="w-full overflow-hidden py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-[var(--primary)] bg-[var(--primary)] lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
          {/* IMAGE */}
          <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[30rem] lg:min-h-[42rem]">
            <Image
              src="/images/cta3.png"
              alt="Viruj healthcare platform"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(0,0,0,.08) 60%, rgba(0,0,0,.38) 100%)",
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="flex min-w-0 flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 lg:py-16">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/75">
              READY WHEN YOU ARE
            </p>

            <h2 className="mt-6 max-w-full font-sentient text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.92] tracking-[-0.065em] text-white">
              Ready to
              <br />
              experience
              <br />
              Viruj?
            </h2>

            <p className="mt-7 max-w-[34rem] text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              Download Viruj and experience healthcare where every appointment,
              prescription and report stays connected in one place.
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#"
                className="inline-flex min-h-14 w-full shrink-0 items-center justify-center rounded-full bg-white px-7 py-4 text-center text-base font-semibold text-[var(--primary)] transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
              >
                Download App
              </Link>

              <Link
                href="#product"
                className="inline-flex min-h-14 w-full shrink-0 items-center justify-center rounded-full border border-white/80 px-7 py-4 text-center text-base font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--primary)] sm:w-auto"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
