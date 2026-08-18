"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PARAGRAPHS = [
  "Your appointments should remember the context of the last one.",
  "Doctors, diagnostics, and records should meet in one place.",
  "Your health history should travel with you quietly.",
  "Nothing should feel rebuilt at the next visit.",
];

function setIndexedRef<T>(store: { current: Array<T | null> }, index: number) {
  return (node: T | null) => {
    store.current[index] = node;
  };
}

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageFrameRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const imageFrame = imageFrameRef.current;
      const eyebrow = eyebrowRef.current;
      const cta = ctaRef.current;
      const headlineLines = headlineLineRefs.current.filter(
        Boolean,
      ) as HTMLSpanElement[];
      const paragraphLines = paragraphRefs.current.filter(
        Boolean,
      ) as HTMLParagraphElement[];

      if (
        !section ||
        !imageFrame ||
        !eyebrow ||
        !cta ||
        headlineLines.length !== 4 ||
        paragraphLines.length !== PARAGRAPHS.length
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const resetToFinalState = () => {
        gsap.set(imageFrame, { autoAlpha: 1, y: 0 });
        gsap.set(eyebrow, { autoAlpha: 1, y: 0 });
        gsap.set(headlineLines, { autoAlpha: 1, y: 0 });
        gsap.set(paragraphLines, { autoAlpha: 1, y: 0 });
        gsap.set(cta, { autoAlpha: 1, y: 0 });
      };

      if (reduceMotion) {
        resetToFinalState();
        return;
      }

      const headlineRevealOrder = [
        headlineLines[0],
        headlineLines[1],
        headlineLines[3],
        headlineLines[2],
      ];

      gsap.set(imageFrame, {
        autoAlpha: 0,
        y: 24,
      });
      gsap.set(eyebrow, { autoAlpha: 0, y: 12 });
      gsap.set(headlineLines, { autoAlpha: 0, y: 32 });
      gsap.set(paragraphLines, { autoAlpha: 0, y: 18 });
      gsap.set(cta, { autoAlpha: 0, y: 14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(imageFrame, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
      })
        .to(
          eyebrow,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          1.1,
        )
        .to(
          headlineRevealOrder,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            stagger: 0.12,
          },
          1.28,
        )
        .to(
          paragraphLines,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
          },
          2.02,
        )
        .to(
          cta,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
          },
          2.42,
        );

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      aria-labelledby="ecosystem-heading"
      className="relative -mt-px isolate overflow-hidden bg-[var(--primary)] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[6%] top-1/2 h-[48rem] w-[48rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,248,238,0.12)_0%,transparent_70%)] blur-3xl opacity-45" />
      </div>

      <Container className="relative z-10">
        <div className="grid min-h-[100svh] items-center gap-14 py-16 sm:py-20 md:gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24 lg:py-24 xl:gap-28">
          <div className="relative mx-auto w-full max-w-[980px] lg:pr-4 xl:pr-8">
            <div
              ref={imageFrameRef}
              className="relative overflow-hidden rounded-[36px] border border-white/12 bg-white/[0.04] p-4 shadow-[0_40px_100px_rgba(8,12,20,.16)]"
            >
              <Image
                src="/images/ecosystem.png"
                alt="Viruj Healthcare Ecosystem"
                width={920}
                height={920}
                priority
                sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 50vw, 100vw"
                className="
h-auto
w-full
rounded-[28px]
object-contain
transition-transform
duration-700
group-hover:scale-[1.015]
"
              />
            </div>
          </div>

          <div className="relative mx-auto max-w-[33rem] lg:mx-0 lg:max-w-[31rem] lg:pl-2 xl:pl-6">
            <p
              ref={eyebrowRef}
              className="mb-5 text-[0.66rem] font-semibold uppercase tracking-[0.46em] text-white/50"
            >
              Healthcare Ecosystem
            </p>

            <h2
              id="ecosystem-heading"
              className="text-[clamp(2.7rem,7.4vw,5.15rem)] font-sentient leading-[0.92] tracking-[-0.07em] text-white"
            >
              <span ref={setIndexedRef(headlineLineRefs, 0)} className="block">
                Healthcare
              </span>
              <span ref={setIndexedRef(headlineLineRefs, 1)} className="block">
                should
              </span>
              <span
                ref={setIndexedRef(headlineLineRefs, 2)}
                className="block font-telma font-medium text-[var(--primary-fixed)] text-[clamp(3.15rem,7.8vw,5.7rem)] leading-[0.9]"
              >
                Revolve
              </span>
              <span
                ref={setIndexedRef(headlineLineRefs, 3)}
                className="block text-[clamp(2.1rem,5.4vw,3.35rem)] italic tracking-[-0.05em] text-[var(--primary-fixed)]"
              >
                around you.
              </span>
            </h2>

            <div className="mt-10 max-w-[26rem] space-y-1 text-[1rem] leading-[1.95] text-white/70 sm:text-[1.05rem]">
              {PARAGRAPHS.map((line, index) => (
                <p key={line} ref={setIndexedRef(paragraphRefs, index)}>
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-14">
              <Link
                ref={ctaRef}
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-6 py-3 text-sm font-medium text-white/88 transition-colors duration-300 hover:bg-white/12 hover:text-white"
              >
                Explore the Ecosystem
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
