"use client";

/**
 * ProductSection — responsive redesign pass
 *
 * Desktop (>=1024px): unchanged in spirit from the previous version — same
 * pinned + scrubbed ScrollTrigger, same continuous interpolation, same
 * timeline-beside-phone layout. Only wrapped in gsap.matchMedia() so it
 * properly tears down when crossing into the mobile/tablet breakpoint.
 *
 * Mobile + tablet (<1024px): a completely different interaction, not a
 * squeezed desktop layout. The section pins fullscreen; the phone fills
 * nearly the whole viewport; screens crossfade in place (the phone frame
 * never moves — no vertical track translation); step number/title/summary
 * overlay the bottom of the phone over a dark gradient. Scroll progress is
 * discretized into JOURNEY_STEPS.length equal segments and each segment
 * snaps a step fully in/out — deliberate, non-continuous editorial beats,
 * not a scrub.
 *
 * Both branches live under one gsap.matchMedia() inside a single useGSAP
 * call, so cleanup/resize/breakpoint-crossing is handled by useGSAP's
 * automatic revert — no manually tracked ScrollTrigger instances to leak.
 */

import { useRef, useState, type MutableRefObject, type ReactNode } from "react";
import Image from "next/image";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ----------------------------------------------------------------------------
// Journey data
// ----------------------------------------------------------------------------

type JourneyStep = {
  number: string;
  title: string;
  summary: string;
  screen: ReactNode;
};

function RealScreen({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes={sizes}
        className="select-none object-contain object-center pointer-events-none"
      />
    </div>
  );
}




const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: "01",
    title: "Discover Care",
    summary:
      "Find trusted specialists through personalized recommendations, availability and verified patient reviews.",
    screen: (
      <RealScreen
        src="/screens/discover-doctors.png"
        alt="Discover doctors"
        sizes="(max-width:1023px)100vw,420px"
      />
    ),
  },

  {
    number: "02",
    title: "Meet Your Doctor",
    summary:
      "Explore credentials, experience, reviews and availability before confirming your consultation.",
    screen: (
      <RealScreen
        src="/screens/doctor-profile.png"
        alt="Doctor profile"
        sizes="(max-width:1023px)100vw,420px"
      />
    ),
  },

  {
    number: "03",
    title: "Book Appointment",
    summary:
      "Choose the perfect time, consultation type and location in one seamless booking experience.",
    screen: (
      <RealScreen
        src="/screens/book-appointment.png"
        alt="Appointment booking"
        sizes="(max-width:1023px)100vw,420px"
      />
    ),
  },

  {
    number: "04",
    title: "Viruj AI",
    summary:
      "Understand reports, medications and symptoms with an intelligent healthcare companion available anytime.",
    screen: (
      <RealScreen
        src="/screens/ask-viruj.png"
        alt="Viruj AI"
        sizes="(max-width:1023px)100vw,420px"
      />
    ),
  },

  {
    number: "05",
    title: "Health Records",
    summary:
      "Every report, prescription and diagnostic stays organized in one secure medical timeline.",
    screen: (
      <RealScreen
        src="/screens/reports.png"
        alt="Reports"
        sizes="(max-width:1023px)100vw,420px"
      />
    ),
  },

  {
    number: "06",
    title: "Stay Connected",
    summary:
      "Medication reminders, health insights and emergency access keep care moving long after your visit.",
    screen: (
      <RealScreen
        src="/screens/health-dashboard.png"
        alt="Health dashboard"
        sizes="(max-width:1023px)100vw,420px"
      />
    ),
  },
];

function setArrayRef<T>(store: MutableRefObject<(T | null)[]>, index: number) {
  return (node: T | null) => {
    store.current[index] = node;
  };
}

function clampIndex(value: number) {
  return Math.max(0, Math.min(JOURNEY_STEPS.length - 1, value));
}

// ----------------------------------------------------------------------------
// Section
// ----------------------------------------------------------------------------

export function ProductSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Desktop refs
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const phoneShellRef = useRef<HTMLDivElement | null>(null);
  const phoneScreenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mobile/tablet refs
  const mobileStageRef = useRef<HTMLDivElement | null>(null);
  const mobileHeaderRef = useRef<HTMLDivElement | null>(null);
  const mobilePhoneRef = useRef<HTMLDivElement | null>(null);
  const mobileScreenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const mobileSummaryRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileActiveIndexRef = useRef(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();

      // ------------------------------------------------------------------
      // Desktop (>=1024px) — pinned, scrubbed, continuous interpolation
      // ------------------------------------------------------------------
      mm.add("(min-width: 1024px)", () => {
        const stage = stageRef.current;
        const ambientGlow = ambientGlowRef.current;
        const intro = introRef.current;
        const timeline = timelineRef.current;
        const phoneShell = phoneShellRef.current;

        const stepNodes = stepRefs.current.filter(Boolean) as HTMLButtonElement[];

        if (!stage || !ambientGlow || !intro || !timeline || !phoneShell || !stepNodes.length) {
          return;
        }

        if (prefersReducedMotion) {
          gsap.set([intro, timeline], { autoAlpha: 1, y: 0, filter: "none" });
          gsap.set(phoneShell, { scale: 1, y: 0, filter: "none" });

          activeIndexRef.current = 0;
          return;
        }

        gsap.set(ambientGlow, { autoAlpha: 0.5, scale: 0.85 });
        gsap.set(intro, { autoAlpha: 1, y: 22, });
        gsap.set(timeline, { autoAlpha: 1, y: 18 });
        gsap.set(stepNodes, { autoAlpha: 0.35, y: 8 });
        gsap.set(phoneShell, { scale: 0.94, y: 40, });


        const totalTravel = JOURNEY_STEPS.length - 1;
        const introStart = 0.06;
        const revealEnd = 0.26;
        const interactionStart = 0.32;
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

        const updateMotion = (progress: number) => {
          const revealProgress = gsap.utils.clamp(0, 1, (progress - introStart) / (revealEnd - introStart));
          const interactionProgress = gsap.utils.clamp(0, 1, (progress - interactionStart) / (1 - interactionStart));
          const nextIndex = clampIndex(
            Math.round(interactionProgress * totalTravel)
          );

          phoneScreenRefs.current.forEach((screen, index) => {
            if (!screen) return;

            gsap.to(screen, {
              autoAlpha: index === nextIndex ? 1 : 0,
              duration: 0.45,
              ease: "power2.out",
              overwrite: true,
            });
          });

          gsap.set(ambientGlow, {
            autoAlpha: gsap.utils.interpolate(0.5, 0.22, easeOutCubic(revealProgress)),
            scale: gsap.utils.interpolate(0.85, 1.08, revealProgress),
          });
          gsap.set(intro, {
            autoAlpha: easeOutCubic(revealProgress),
            y: gsap.utils.interpolate(22, 0, revealProgress),
          });
          gsap.set(timeline, {
            autoAlpha: easeOutCubic(revealProgress),
            y: gsap.utils.interpolate(18, 0, revealProgress),
          });
          gsap.set(phoneShell, {
            scale: gsap.utils.interpolate(0.94, 1, easeOutCubic(revealProgress)),
            y: gsap.utils.interpolate(40, 0, revealProgress),
          });


          stepNodes.forEach((node, index) => {
            const isPast = index < clampIndex(Math.round(interactionProgress * totalTravel));
            gsap.set(node, { autoAlpha: isPast ? 0.55 : 1, y: 0 });
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${Math.max(340, totalTravel * 82 + 70)}%`,
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            updateMotion(self.progress);
            const interactionProgress = gsap.utils.clamp(
              0,
              1,
              (self.progress - interactionStart) / (1 - interactionStart),
            );
            const nextIndex = clampIndex(Math.round(interactionProgress * totalTravel));

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        });

        updateMotion(0);

        return () => {
          trigger.kill();
        };
      });

      // ------------------------------------------------------------------
      // Mobile + tablet (<1024px) — fullscreen, discrete, crossfade
      // ------------------------------------------------------------------
      mm.add("(max-width: 1023.98px)", () => {
        const mobileStage = mobileStageRef.current;
        const header = mobileHeaderRef.current;
        const phone = mobilePhoneRef.current;
        const screens = mobileScreenRefs.current.filter(Boolean) as HTMLDivElement[];
        const numbers = mobileNumberRefs.current.filter(Boolean) as HTMLSpanElement[];
        const titles = mobileTitleRefs.current.filter(Boolean) as HTMLHeadingElement[];
        const summaries = mobileSummaryRefs.current.filter(Boolean) as HTMLParagraphElement[];

        if (
          !mobileStage ||
          !header ||
          !phone ||
          screens.length !== JOURNEY_STEPS.length ||
          numbers.length !== JOURNEY_STEPS.length ||
          titles.length !== JOURNEY_STEPS.length ||
          summaries.length !== JOURNEY_STEPS.length
        ) {
          return;
        }

        const stepCount = JOURNEY_STEPS.length;

        const applyStep = (index: number) => {
          screens.forEach((el, i) => gsap.set(el, { autoAlpha: i === index ? 1 : 0 }));
          numbers.forEach((el, i) => gsap.set(el, { autoAlpha: i === index ? 1 : 0, y: i === index ? 0 : 12 }));
          titles.forEach((el, i) => gsap.set(el, { autoAlpha: i === index ? 1 : 0, y: i === index ? 0 : 12 }));
          summaries.forEach((el, i) => gsap.set(el, { autoAlpha: i === index ? 1 : 0, y: i === index ? 0 : 12 }));
        };

        if (prefersReducedMotion) {
          gsap.set(header, { autoAlpha: 1, y: 0 });
          gsap.set(phone, { autoAlpha: 1, scale: 1 });
          applyStep(0);
          setMobileActiveIndex(0);
          mobileActiveIndexRef.current = 0;
          return;
        }

        gsap.set(header, { autoAlpha: 1, y: 16 });
        gsap.set(phone, { autoAlpha: 1, scale: 0.96 });
        applyStep(0);

        const crossfade = (nextIndex: number) => {
          const prevIndex = mobileActiveIndexRef.current;
          if (nextIndex === prevIndex) return;

          const dur = 0.5;
          const ease = "power2.out";

          gsap.to(screens[prevIndex], { autoAlpha: 0, duration: dur, ease });
          gsap.to(screens[nextIndex], { autoAlpha: 1, duration: dur, ease });

          [
            { prev: numbers[prevIndex], next: numbers[nextIndex] },
            { prev: titles[prevIndex], next: titles[nextIndex] },
            { prev: summaries[prevIndex], next: summaries[nextIndex] },
          ].forEach(({ prev, next }) => {
            gsap.to(prev, { autoAlpha: 0, y: -10, duration: dur * 0.7, ease });
            gsap.fromTo(next, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: dur, ease, delay: dur * 0.15 });
          });

          mobileActiveIndexRef.current = nextIndex;
          setMobileActiveIndex(nextIndex);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${stepCount * 100}%`,
            scrub: false,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value) => {
                // Snap to the nearest of (stepCount + 1) equal segments:
                // segment 0 is the header/phone reveal, segments 1..N map
                // to journey steps 0..N-1.
                const segments = stepCount + 1;
                return Math.round(value * (segments - 1)) / (segments - 1);
              },
              duration: 0.35,
              ease: "power1.inOut",
            },
            onUpdate(self) {
              const segments = stepCount + 1;
              const segment = gsap.utils.clamp(
                0,
                segments - 1,
                Math.round(
                  self.progress * (segments - 1)
                )
              );
              if (segment === 0) {
                if (mobileActiveIndexRef.current !== 0) {
                  crossfade(0);
                }
                return;
              }

              const stepIndex = clampIndex(segment - 1);
              crossfade(stepIndex);
            },
          },
        });

        tl.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }).to(
          phone,
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "<",
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="product"
      aria-labelledby="viruj-experience-heading"
      className="relative -mt-px isolate overflow-hidden bg-[var(--surface)] text-[var(--on-surface)]"
    >
      <div
        aria-hidden="true"
        ref={ambientGlowRef}
        className="
pointer-events-none
absolute
left-1/2
top-1/2
hidden
h-[38rem]
w-[38rem]
-translate-x-1/2
-translate-y-1/2
rounded-full
blur-[140px]
opacity-30
lg:block
"
        style={{
          background: "radial-gradient(circle, rgba(139,26,26,.12) 0%, rgba(139,26,26,.06) 35%, transparent 72%)",
        }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Desktop layout (>=1024px)                                       */}
      {/* ---------------------------------------------------------------- */}
      <Container className="relative z-10 hidden lg:block">
        <div
          ref={stageRef}
          className="grid min-h-[100svh] gap-10 py-20 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:items-center lg:gap-6 lg:py-24"
        >
          <div className="order-2 flex flex-col gap-14 lg:order-1">
            <div ref={introRef} className="max-w-lg will-change-transform">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--primary)]">
                Experience Viruj
              </p>
              <h2
                id="viruj-experience-heading"
                className="mt-5 text-[clamp(2.25rem,4.4vw,3.75rem)] font-sentient leading-[0.95] tracking-[-0.055em] text-[var(--on-surface)]"
              >
                One <span className="font-sentient text-[var(--primary)] font-medium">Journey</span>
                <br />
                Start to Finish
              </h2>
            </div>

            <div ref={timelineRef} className="will-change-transform">
              {JOURNEY_STEPS.map((step, index) => {
                const active = index === activeIndex;

                return (
                  <button
                    key={step.title}
                    ref={setArrayRef<HTMLButtonElement>(stepRefs, index)}
                    type="button"
                    className={cn(
                      "block w-full border-0 bg-transparent p-0 text-left transition-[padding] duration-500 ease-out",
                      active ? "py-3.5" : "py-1.5",
                    )}
                    aria-current={active ? "step" : undefined}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "font-mono text-[0.62rem] tracking-[0.16em] transition-colors duration-500",
                          active ? "text-[var(--primary)]" : "text-[var(--on-surface-variant)]/30",
                        )}
                      >
                        {step.number}
                      </span>
                      <span
                        className={cn(
                          "transition-all duration-500 ease-out",
                          active
                            ? "text-[1.5rem] font-semibold tracking-[-0.03em] text-[var(--primary)]"
                            : "text-[0.9rem] font-medium tracking-[-0.01em] text-[var(--on-surface-variant)]/40",
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "overflow-hidden pl-[2.1rem] text-sm leading-6 text-[var(--tertiary)] transition-all duration-500 ease-out",
                        active ? "mt-2 max-h-16 opacity-100" : "mt-0 max-h-0 opacity-0",
                      )}
                    >
                      {step.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div
              ref={phoneShellRef}
              className="
relative
aspect-[1500/2796]
w-full
max-w-[24rem]
2xl:max-w-[25rem]
"
            >
              <div className="absolute inset-0 rounded-[54px] bg-[var(--on-surface)] p-[3px] shadow-[0_0_100px_rgba(0,0,0,0.18)]">
                <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-[var(--on-surface)]" />
                <div className="h-full w-full overflow-hidden rounded-[50px] bg-[var(--surface)]">
                  <div className="relative h-full w-full">
                    {JOURNEY_STEPS.map((step, index) => (
                      <div
                        key={step.title}
                        ref={setArrayRef<HTMLDivElement>(
                          phoneScreenRefs,
                          index
                        )}
                        className="absolute inset-0"
                        style={{
                          opacity: index === 0 ? 1 : 0
                        }}
                      >
                        {step.screen}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/* Mobile + tablet layout (<1024px) — fullscreen crossfade          */}
      {/* ---------------------------------------------------------------- */}
      <div ref={mobileStageRef} className="relative block h-[100svh] w-full top-0 overflow-hidden lg:hidden">
        <div
          ref={mobileHeaderRef}
          className="pointer-events-none absolute inset-x-0 z-30 px-5  will-change-transform sm:px-8 sm:pt-10"
        >
          {/* <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/90">
            Experience Viruj
          </p> */}
          {/* <h2 className="mt-2 font-sentient text-[clamp(1.7rem,7vw,2.5rem)] leading-[0.98] tracking-[-0.04em] text-[var(--on-surface)]">
            One journey.
            <br />
            Start to finish.
          </h2> */}
        </div>

        <div ref={mobilePhoneRef} className="absolute inset-0 h-full w-full will-change-transform">
          {JOURNEY_STEPS.map((step, index) => (
            <div
              key={step.title}
              ref={setArrayRef<HTMLDivElement>(mobileScreenRefs, index)}
              className="absolute inset-0 h-full w-full"
              aria-hidden={index !== mobileActiveIndex}
            >
              {step.screen}
            </div>
          ))}

          {/* Readability gradient: transparent -> ~20% -> ~40% -> ~80% -> dark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.78) 20%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.16) 70%, rgba(10,10,10,0) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-9 sm:px-8 sm:pb-12">
            {JOURNEY_STEPS.map((step, index) => (
              <div key={step.title} className="relative">

                <span
                  ref={setArrayRef<HTMLSpanElement>(mobileNumberRefs, index)}
                  className={cn(
                    "absolute bottom-full left-0 mb-2 block font-mono text-[0.7rem] tracking-[0.18em] text-white/70 will-change-transform",
                    index !== 0 && "pointer-events-none",
                  )}
                  aria-hidden={index !== mobileActiveIndex}
                >
                  {step.number} / {String(JOURNEY_STEPS.length).padStart(2, "0")}
                </span>
              </div>
            ))}

            <div className="relative">
              {JOURNEY_STEPS.map((step, index) => (
                <h3
                  key={step.title}
                  ref={setArrayRef<HTMLHeadingElement>(mobileTitleRefs, index)}
                  className={cn(
                    "font-sentient text-[clamp(1.6rem,7.5vw,2.2rem)] leading-[1.02] tracking-[-0.03em] text-white will-change-transform",
                    index !== 0 && "absolute inset-x-0 top-0",
                  )}
                  aria-hidden={index !== mobileActiveIndex}
                >
                  {step.title}
                </h3>
              ))}
            </div>

            <div className="relative mt-3">
              {JOURNEY_STEPS.map((step, index) => (
                <p
                  key={step.title}
                  ref={setArrayRef<HTMLParagraphElement>(mobileSummaryRefs, index)}
                  className={cn(
                    "max-w-[32ch] text-[0.95rem] leading-6 text-white/80 will-change-transform",
                    index !== 0 && "absolute inset-x-0 top-0",
                  )}
                  aria-hidden={index !== mobileActiveIndex}
                >
                  {step.summary}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
