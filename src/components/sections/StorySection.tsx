"use client";

import { Activity, FlaskConical, FolderOpen, Stethoscope } from "lucide-react";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Container } from "@/components/ui";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STORY_CARDS = [
  {
    icon: Activity,
    label: "Patients",
    stat: "50K+",
    sub: "Active on Viruj",
  },
  {
    icon: Stethoscope,
    label: "Doctors",
    stat: "800+",
    sub: "Verified specialists",
  },
  {
    icon: FlaskConical,
    label: "Diagnostics",
    stat: "200+",
    sub: "Tests & imaging",
  },
  {
    icon: FolderOpen,
    label: "Medical Records",
    stat: "1M+",
    sub: "Documents managed",
  },
] as const;

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paragraphLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const eyebrow = eyebrowRef.current;
      const headlineLines = headlineLineRefs.current.filter(
        Boolean,
      ) as HTMLSpanElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const paragraphLines = paragraphLineRefs.current.filter(
        Boolean,
      ) as HTMLSpanElement[];

      if (
        !section ||
        !eyebrow ||
        headlineLines.length !== 3 ||
        paragraphLines.length !== 3 ||
        cards.length !== STORY_CARDS.length
      ) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set([eyebrow, ...paragraphLines, ...cards], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        gsap.set(headlineLines, { clipPath: "inset(0 0% 0 0)" });
        return;
      }

      gsap.set(eyebrow, { autoAlpha: 0, y: 14 });
      gsap.set(headlineLines, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(paragraphLines, {
        autoAlpha: 0,
        clipPath: "inset(0 100% 0 0)",
        y: 20,
      });
      gsap.set(cards, { autoAlpha: 0, y: 22, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(
          headlineLines,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.05",
        )
        .to(paragraphLines, {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          stagger: 0.15,
        })
        .to(
          cards,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08 },
          "-=0.1",
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
      id="story"
      aria-labelledby="story-heading"
      className="relative overflow-hidden bg-[var(--primary)] py-24 text-white sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.16), transparent 52%)",
        }}
      />

      <Container className="relative grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55"
          >
            The Reality
          </p>

          <h2
            id="story-heading"
            className="mt-6 text-[clamp(3.2rem,8vw,6.4rem)] font-sentient leading-[0.9] tracking-[-0.06em]"
          >
            <span className="block overflow-hidden">
              <span
                ref={(node) => {
                  headlineLineRefs.current[0] = node;
                }}
                className="block"
              >
                Healthcare wasn&apos;t
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={(node) => {
                  headlineLineRefs.current[1] = node;
                }}
                className="block font-telma text-[var(--primary-fixed)] font-medium"
              >
                designed
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={(node) => {
                  headlineLineRefs.current[2] = node;
                }}
                className="block italic text-[var(--primary-fixed)] text-[clamp(2.4rem,5vw,4.5rem)]"
              >
                to work this way.
              </span>
            </span>
          </h2>

          <p className="mt-10 max-w-xl text-lg leading-[1.8] text-white/72 sm:text-xl">
            {[
              "Every appointment starts over.",
              "Every report and prescription ends up somewhere else.",
              "Care should not depend on how much you can hold in your head.",
            ].map((line, index) => (
              <span key={index} className="block overflow-hidden">
                <span
                  ref={(node) => {
                    paragraphLineRefs.current[index] = node;
                  }}
                  className="block"
                >
                  {line}
                </span>
              </span>
            ))}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {STORY_CARDS.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="rounded-3xl border border-white/10 bg-white/8 p-5 shadow-[0_24px_48px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-4 w-4 text-white/85" strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-light tracking-[-0.04em] text-white">
                  {card.stat}
                </p>
                <p className="mt-1 text-sm font-medium text-white/90">
                  {card.label}
                </p>
                <p className="mt-1 text-xs text-white/50">{card.sub}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
