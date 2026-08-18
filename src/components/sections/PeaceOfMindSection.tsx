"use client";

import { useRef, type ReactNode } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function CardFrame({
  className,
  kind,
  children,
}: {
  className?: string;
  kind: "hero" | "privacy" | "ai" | "insights" | "emergency" | "journey";
  children: ReactNode;
}) {
  return (
    <article
      data-peace-card
      data-peace-kind={kind}
      className={cn(
        "group relative min-w-0 overflow-hidden rounded-[30px]",
        "border border-[var(--outline-variant)]/55 bg-[var(--surface-container-lowest)]",
        "shadow-[0_14px_38px_rgba(64,42,40,0.05)]",
        "transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-0.5",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.68),transparent_36%),radial-gradient(circle_at_82%_20%,rgba(139,26,26,0.07),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--outline-variant) 1px, transparent 1px), linear-gradient(to bottom, var(--outline-variant) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        data-peace-glow
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--focus-x, 50%) var(--focus-y, 50%), rgba(255, 225, 213, 0.22), transparent 44%)",
        }}
      />

      <div
        data-peace-media
        className="relative h-full w-full will-change-transform"
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/40"
      />
    </article>
  );
}

function SecondaryPanel({
  align = "bottom",
  className,
  children,
}: {
  align?: "top" | "bottom";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-peace-panel
      className={cn(
        "absolute inset-[clamp(0.9rem,1.1vw,1rem)] z-10 flex pointer-events-none opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ease-out",
        "group-hover:opacity-100 group-hover:translate-y-0",
        align === "top" ? "items-start" : "items-end",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PeaceOfMindSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const eyebrow = eyebrowRef.current;
      const subline = sublineRef.current;
      const headlineLines = Array.from(
        section?.querySelectorAll<HTMLElement>("[data-peace-headline]") ?? [],
      );
      const cards = Array.from(
        section?.querySelectorAll<HTMLElement>("[data-peace-card]") ?? [],
      );
      const paths = Array.from(
        section?.querySelectorAll<SVGPathElement>("[data-peace-path]") ?? [],
      );

      if (!section || !eyebrow || headlineLines.length !== 2 || !subline || !cards.length) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      type CardKind = "hero" | "privacy" | "ai" | "insights" | "emergency" | "journey";
      type CardMeta = {
        kind: CardKind;
        card: HTMLElement;
        media: HTMLElement | null;
        image: HTMLImageElement | null;
        panel: HTMLElement | null;
        glow: HTMLElement | null;
        paths: SVGPathElement[];
        nodes: SVGCircleElement[];
        ring: HTMLElement | null;
        pulse: HTMLElement | null;
        status: HTMLElement | null;
        timelineNodes: SVGCircleElement[];
      };

      const cardMetas: CardMeta[] = cards.map((card) => {
        const kind = (card.dataset.peaceKind ?? "hero") as CardKind;

        return {
          kind,
          card,
          media: card.querySelector<HTMLElement>("[data-peace-media]"),
          image: card.querySelector<HTMLImageElement>("[data-peace-image]"),
          panel: card.querySelector<HTMLElement>("[data-peace-panel]"),
          glow: card.querySelector<HTMLElement>("[data-peace-glow]"),
          paths: Array.from(card.querySelectorAll<SVGPathElement>("[data-peace-path]")),
          nodes: Array.from(card.querySelectorAll<SVGCircleElement>("[data-peace-node]")),
          ring: card.querySelector<HTMLElement>("[data-peace-ring]"),
          pulse: card.querySelector<HTMLElement>("[data-peace-pulse]"),
          status: card.querySelector<HTMLElement>("[data-peace-status]"),
          timelineNodes: Array.from(
            card.querySelectorAll<SVGCircleElement>("[data-peace-timeline-node]"),
          ),
        };
      });
      const heroPanel = cardMetas.find((meta) => meta.kind === "hero")?.panel ?? null;

      const resetPaths = () => {
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            autoAlpha: 1,
            strokeDasharray: length,
            strokeDashoffset: 0,
          });
        });
      };

      if (reduceMotion) {
        gsap.set([eyebrow, subline], { autoAlpha: 1, y: 0 });
        gsap.set(headlineLines, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(
          cardMetas.flatMap((meta) => [
            meta.media,
            meta.image,
            meta.panel,
            meta.glow,
            meta.ring,
            meta.pulse,
            meta.status,
          ]).filter(Boolean),
          { clearProps: "transform,filter,opacity" },
        );
        if (heroPanel) {
          gsap.set(heroPanel, { clearProps: "transform,opacity" });
        }
        resetPaths();
        return;
      }

      gsap.set(eyebrow, { autoAlpha: 0, y: 10 });
      gsap.set(headlineLines, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(subline, { autoAlpha: 0, y: 12 });
      gsap.set(cards, { autoAlpha: 0, y: 24, scale: 0.98 });
      gsap.set(
        cardMetas.flatMap((meta) => [
          meta.media,
          meta.image,
          meta.glow,
          meta.ring,
          meta.pulse,
          meta.status,
          ...meta.nodes,
          ...meta.timelineNodes,
        ]).filter(Boolean),
        { x: 0, y: 0, scale: 1, autoAlpha: 1 },
      );
      if (heroPanel) {
        gsap.set(heroPanel, { autoAlpha: 0.88, y: 10, scale: 0.99 });
      }
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          autoAlpha: 0,
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(eyebrow, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      })
        .to(
          headlineLines,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.75,
            stagger: 0.12,
          },
          "-=0.2",
        )
        .to(
          subline,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.35",
        )
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            stagger: 0.09,
          },
          "-=0.1",
        );
      if (heroPanel) {
        tl.to(
          heroPanel,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
          },
          "-=0.45",
        );
      }
      tl.to(
        paths,
        {
          autoAlpha: 1,
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.55",
      );

      const hoverCleanups: Array<() => void> = [];

      const resetCard = (meta: CardMeta) => {
        gsap.to(meta.card, {
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });

        if (meta.media) {
          gsap.to(meta.media, {
            x: 0,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: true,
          });
        }

        if (meta.image) {
          gsap.to(meta.image, {
            scale: 1,
            filter: "saturate(0.98) contrast(0.99)",
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });
        }

        if (meta.kind === "hero" && meta.panel) {
          gsap.to(meta.panel, {
            autoAlpha: 0.92,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        }

        if (meta.glow) {
          gsap.to(meta.glow, {
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (meta.paths.length) {
          gsap.to(meta.paths, {
            strokeOpacity: meta.kind === "hero" ? 0.62 : 0.55,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (meta.nodes.length) {
          gsap.to(meta.nodes, {
            autoAlpha: 0.9,
            scale: 1,
            duration: 0.25,
            stagger: 0.03,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (meta.ring) {
          gsap.to(meta.ring, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (meta.pulse) {
          gsap.to(meta.pulse, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (meta.status) {
          gsap.to(meta.status, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }

        if (meta.timelineNodes.length) {
          gsap.to(meta.timelineNodes, {
            autoAlpha: 0.9,
            scale: 1,
            duration: 0.25,
            stagger: 0.04,
            ease: "power2.out",
            overwrite: true,
          });
        }
      };

      if (canHover) {
        cardMetas.forEach((meta) => {
          const quickX = gsap.quickTo(meta.media ?? meta.card, "x", {
            duration: 0.55,
            ease: "power3.out",
          });
          const quickY = gsap.quickTo(meta.media ?? meta.card, "y", {
            duration: 0.55,
            ease: "power3.out",
          });

          let pulseTimeline: gsap.core.Timeline | null = null;

          const onMove = (event: PointerEvent) => {
            const rect = meta.card.getBoundingClientRect();
            const relX = (event.clientX - rect.left) / rect.width;
            const relY = (event.clientY - rect.top) / rect.height;

            meta.card.style.setProperty("--focus-x", `${relX * 100}%`);
            meta.card.style.setProperty("--focus-y", `${relY * 100}%`);

            quickX((relX - 0.5) * 5.5);
            quickY((relY - 0.5) * 4.5);
          };

          const onEnter = () => {
            pulseTimeline?.kill();

            gsap.to(meta.card, {
              y: -2,
              duration: 0.42,
              ease: "power3.out",
              overwrite: true,
            });

            if (meta.image) {
              gsap.to(meta.image, {
                scale:
                  meta.kind === "hero"
                    ? 1.022
                    : meta.kind === "journey"
                      ? 1.018
                      : 1.016,
                filter: "saturate(1.04) contrast(1.02)",
                duration: 0.5,
                ease: "power3.out",
                overwrite: true,
              });
            }

            if (meta.kind === "hero" && meta.panel) {
              gsap.to(meta.panel, {
                autoAlpha: 1,
                y: -4,
                duration: 0.38,
                ease: "power3.out",
                overwrite: true,
              });
            }

            if (meta.glow) {
              gsap.to(meta.glow, {
                autoAlpha: 1,
                duration: 0.35,
                ease: "power2.out",
                overwrite: true,
              });
            }

            if (meta.paths.length) {
              gsap.to(meta.paths, {
                strokeOpacity:
                  meta.kind === "hero"
                    ? 0.9
                    : meta.kind === "journey"
                      ? 0.95
                      : 0.88,
                duration: 0.28,
                ease: "power2.out",
                overwrite: true,
              });
            }

            if (meta.nodes.length) {
              gsap.to(meta.nodes, {
                autoAlpha: 1,
                scale: 1.05,
                duration: 0.24,
                stagger: 0.03,
                ease: "power2.out",
                overwrite: true,
              });
            }

            if (meta.ring) {
              gsap.to(meta.ring, {
                scale: 1.03,
                duration: 0.32,
                ease: "power2.out",
                overwrite: true,
              });
            }

            if (meta.kind === "ai" && meta.pulse) {
              pulseTimeline = gsap.timeline({ defaults: { overwrite: true } }).to(meta.pulse, {
                scale: 1.16,
                opacity: 1,
                duration: 0.18,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
              });
            }

            if (meta.kind === "emergency" && meta.status) {
              pulseTimeline = gsap.timeline({ defaults: { overwrite: true } }).to(meta.status, {
                scale: 1.08,
                opacity: 1,
                duration: 0.18,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
              });
            }

            if (meta.kind === "journey" && meta.timelineNodes.length) {
              pulseTimeline = gsap.timeline({ defaults: { overwrite: true } }).to(meta.timelineNodes, {
                autoAlpha: 1,
                scale: 1.08,
                duration: 0.2,
                stagger: 0.06,
                ease: "power2.out",
              });
            }
          };

          const onLeave = () => {
            pulseTimeline?.kill();
            resetCard(meta);
          };

          meta.card.addEventListener("pointermove", onMove);
          meta.card.addEventListener("pointerenter", onEnter);
          meta.card.addEventListener("pointerleave", onLeave);
          hoverCleanups.push(() => {
            meta.card.removeEventListener("pointermove", onMove);
            meta.card.removeEventListener("pointerenter", onEnter);
            meta.card.removeEventListener("pointerleave", onLeave);
            pulseTimeline?.kill();
            resetCard(meta);
          });
        });
      }

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="peace-of-mind"
      aria-labelledby="peace-of-mind-heading"
      className="relative isolate overflow-hidden bg-[var(--surface)] py-16 text-[var(--on-surface)] sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 42% at 50% 18%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.35) 45%, transparent 76%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--outline-variant) 1px, transparent 1px), linear-gradient(to bottom, var(--outline-variant) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p
            ref={eyebrowRef}
            className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--primary)]"
          >
            Peace of Mind
          </p>

          <h2
            id="peace-of-mind-heading"
            className="mt-6 text-[clamp(2.2rem,4.7vw,3.9rem)] font-sentient leading-[1.04] tracking-[-0.05em] text-[var(--on-surface)]"
          >
            <span className="block overflow-hidden">
              <span
                data-peace-headline
                className="block"
              >
                Everything about your healthcare
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-peace-headline
                className="block"
              >
                stays{" "}
                <span className="font-telma font-medium text-[var(--primary)]">
                  connected
                </span>
                .
              </span>
            </span>
          </h2>

          <p
            ref={sublineRef}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--tertiary)] sm:text-lg sm:leading-9"
          >
            Appointments, records, summaries, privacy, and emergency details move
            as one calm system, so nothing needs rebuilding at the next visit.
          </p>
        </div>

        <div
          className="
            mt-10 grid gap-3
            lg:grid-cols-12
            lg:auto-rows-[minmax(13rem,auto)]
          "
        >
          <CardFrame
            kind="hero"
            className="min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] lg:col-span-7 lg:row-span-2 lg:min-h-[38rem]"
          >
            <Image
              src="/images/peaceofmind/unified-records.png"
              alt="Unified Records"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 58vw"
              data-peace-image
              className="object-cover object-top transition-[transform,filter] duration-500 ease-out"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_44%,rgba(24,16,15,0.18)_76%,rgba(24,16,15,0.52)_100%)]" />

            <div
              data-peace-panel
              className="absolute inset-x-4 bottom-4 z-10 max-w-[22rem] rounded-[22px] border border-white/40 bg-[rgba(255,249,244,0.62)] p-4 text-left shadow-[0_10px_22px_rgba(73,46,42,0.05)] backdrop-blur-[12px] transition-[transform,opacity,box-shadow,border-color,background-color,backdrop-filter] duration-500 ease-out sm:inset-x-6 sm:bottom-6 sm:max-w-[24rem] sm:p-5"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[var(--primary)]">
                Unified Records
              </p>
              <h3 className="mt-3 max-w-[15ch] font-sentient text-[clamp(1.55rem,3.2vw,2.3rem)] leading-[1.02] tracking-[-0.05em] text-[var(--on-surface)]">
                Every part of your care. Finally together.
              </h3>
            </div>
          </CardFrame>

          <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:col-span-5 lg:row-span-2 lg:grid-cols-2">
            <CardFrame
              kind="privacy"
              className="min-h-[16rem] md:min-h-[17rem] lg:min-h-[14rem]"
            >
              <Image
                src="/images/peaceofmind/privacy-controls.png"
                alt="Privacy"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 21vw"
                data-peace-image
                className="object-cover object-top transition-[transform,filter] duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_38%,rgba(43,27,25,0.12)_78%,rgba(43,27,25,0.42)_100%)]" />

              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  data-peace-path
                  d="M18 34 C 34 34, 40 50, 50 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.84)"
                  strokeLinecap="round"
                  strokeWidth="0.9"
                />
                <path
                  data-peace-path
                  d="M82 24 C 68 30, 60 44, 50 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeLinecap="round"
                  strokeWidth="0.9"
                />
                <path
                  data-peace-path
                  d="M80 72 C 68 64, 60 58, 50 50"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeLinecap="round"
                  strokeWidth="0.9"
                />
                <circle data-peace-node cx="50" cy="50" r="2" fill="rgba(139,26,26,0.95)" />
                <circle data-peace-node cx="18" cy="34" r="2.3" fill="rgba(255,255,255,0.9)" />
                <circle data-peace-node cx="82" cy="24" r="2.3" fill="rgba(255,255,255,0.9)" />
                <circle data-peace-node cx="80" cy="72" r="2.3" fill="rgba(255,255,255,0.9)" />
              </svg>

              <SecondaryPanel align="top">
                <div className="max-w-[8.5rem] rounded-[18px] border border-white/40 bg-[rgba(255,249,244,0.62)] p-3 text-left shadow-[0_10px_22px_rgba(73,46,42,0.05)] backdrop-blur-[12px] transition-[transform,opacity,box-shadow,border-color,background-color,backdrop-filter] duration-500 ease-out">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--primary)]/90">
                    Privacy
                  </p>
                  <p className="mt-2 text-sm leading-5 text-[var(--on-surface)]">
                    Only the right people see what you choose.
                  </p>
                </div>
              </SecondaryPanel>
            </CardFrame>

            <CardFrame
              kind="ai"
              className="min-h-[16rem] md:min-h-[17rem] lg:min-h-[14rem]"
            >
              <Image
                src="/images/peaceofmind/ai-summary.png"
                alt="AI Summary"
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 21vw"
                data-peace-image
                className="object-cover object-top transition-[transform,filter] duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_36%,rgba(38,26,25,0.1)_74%,rgba(38,26,25,0.4)_100%)]" />

              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <path
                  data-peace-path
                  d="M29 69 C 42 63, 49 56, 58 47"
                  fill="none"
                  stroke="rgba(139,26,26,0.72)"
                  strokeLinecap="round"
                  strokeWidth="0.9"
                />
              </svg>

              <SecondaryPanel align="bottom">
                <div className="rounded-[20px] border border-white/40 bg-[rgba(255,249,244,0.62)] p-3 text-left shadow-[0_10px_22px_rgba(73,46,42,0.05)] backdrop-blur-[12px] transition-[transform,opacity,box-shadow,border-color,background-color,backdrop-filter] duration-500 ease-out">
                  <div className="flex items-center gap-2">
                    <span
                      data-peace-pulse
                      className="h-2 w-2 rounded-full bg-[var(--primary)]/90"
                    />
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--primary)]/90">
                      AI Summary
                    </p>
                  </div>
                  <p className="mt-3 max-w-[16ch] text-sm leading-5 text-[var(--on-surface)]">
                    Your health looks good overall.
                  </p>
                </div>
              </SecondaryPanel>
            </CardFrame>

            <CardFrame
              kind="insights"
              className="min-h-[17rem] md:min-h-[18rem] md:col-span-2 lg:col-span-1"
            >
              <Image
                src="/images/peaceofmind/health-insights.png"
                alt="Health Insights"
                fill
                sizes="(max-width: 1023px) 100vw, 21vw"
                data-peace-image
                className="object-cover object-top transition-[transform,filter] duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_34%,rgba(34,22,20,0.1)_76%,rgba(34,22,20,0.4)_100%)]" />

              <SecondaryPanel align="bottom">
                <div className="rounded-[22px] border border-white/40 bg-[rgba(255,249,244,0.62)] p-4 shadow-[0_10px_22px_rgba(73,46,42,0.05)] backdrop-blur-[12px] transition-[transform,opacity,box-shadow,border-color,background-color,backdrop-filter] duration-500 ease-out">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--primary)]/90">
                        Health Insights
                      </p>
                      <p className="mt-2 text-xs text-[var(--tertiary)]">Health score</p>
                      <p className="font-sentient text-[1.9rem] leading-none tracking-[-0.06em] text-[var(--on-surface)]">
                        82
                      </p>
                    </div>
                    <div
                      data-peace-ring
                      className="relative flex h-14 w-14 items-center justify-center rounded-full"
                      style={{
                        background:
                          "conic-gradient(rgba(139,26,26,0.9) 0 82%, rgba(139,26,26,0.12) 82% 100%)",
                      }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-container-lowest)] text-[0.7rem] font-semibold text-[var(--on-surface)]">
                        82
                      </div>
                    </div>
                  </div>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 28"
                    className="mt-4 h-8 w-full"
                  >
                    <path
                      data-peace-path
                      d="M3 21 C 14 21, 18 8, 29 11 C 40 14, 43 22, 53 18 C 64 13, 71 6, 83 10 C 89 12, 93 16, 97 15"
                      fill="none"
                      stroke="rgba(139,26,26,0.9)"
                      strokeLinecap="round"
                      strokeWidth="1.15"
                    />
                  </svg>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-[0.72rem] text-[var(--tertiary)]">
                    <div>
                      <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                        Next appt
                      </p>
                      <p className="mt-1 text-[var(--on-surface)]">May 24</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                        BP
                      </p>
                      <p className="mt-1 text-[var(--on-surface)]">120/80</p>
                    </div>
                    <div>
                      <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                        Sleep
                      </p>
                      <p className="mt-1 text-[var(--on-surface)]">7h 45m</p>
                    </div>
                  </div>
                </div>
              </SecondaryPanel>
            </CardFrame>

            <CardFrame
              kind="emergency"
              className="min-h-[17rem] md:min-h-[18rem] md:col-span-2 lg:col-span-1"
            >
              <Image
                src="/images/peaceofmind/emergency-id.png"
                alt="Emergency ID"
                fill
                sizes="(max-width: 1023px) 100vw, 21vw"
                data-peace-image
                className="object-cover object-top transition-[transform,filter] duration-500 ease-out"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_40%,rgba(36,24,22,0.12)_76%,rgba(36,24,22,0.42)_100%)]" />

              <SecondaryPanel align="top">
                <div className="max-w-[11rem] rounded-[20px] border border-white/40 bg-[rgba(255,249,244,0.62)] p-3 shadow-[0_10px_22px_rgba(73,46,42,0.05)] backdrop-blur-[12px] transition-[transform,opacity,box-shadow,border-color,background-color,backdrop-filter] duration-500 ease-out">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--primary)]/90">
                    Emergency ID
                  </p>
                  <p className="mt-2 text-sm leading-5 text-[var(--on-surface)]">
                    Medical information available when it matters.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[0.72rem] text-[var(--tertiary)]">
                    <span
                      data-peace-status
                      className="h-2 w-2 rounded-full bg-[var(--success)]/80"
                    />
                    Ready for offline access
                  </div>
                </div>
              </SecondaryPanel>
            </CardFrame>
          </div>

          <CardFrame
            kind="journey"
            className="min-h-[19rem] md:min-h-[21rem] lg:col-span-12 lg:min-h-[15rem]"
          >
            <Image
              src="/images/peaceofmind/health-journey.png"
              alt="Health Journey"
              fill
              sizes="100vw"
              data-peace-image
              className="object-cover object-center transition-[transform,filter] duration-500 ease-out"
            />

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0)_34%,rgba(33,21,20,0.1)_72%,rgba(33,21,20,0.42)_100%)]" />

            <SecondaryPanel align="bottom">
              <div className="rounded-[24px] border border-white/40 bg-[rgba(255,249,244,0.62)] p-4 shadow-[0_10px_22px_rgba(73,46,42,0.05)] backdrop-blur-[12px] transition-[transform,opacity,box-shadow,border-color,background-color,backdrop-filter] duration-500 ease-out sm:px-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--primary)]/90">
                      Health Journey
                    </p>
                    <p className="mt-2 max-w-[28ch] text-sm leading-6 text-[var(--on-surface)]">
                      Appointment, diagnosis, prescription, follow-up.
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[var(--tertiary)]">
                    Connected path
                  </p>
                </div>

                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 18"
                  className="mt-4 h-5 w-full"
                >
                  <path
                    data-peace-timeline-line
                    data-peace-path
                    d="M3 9 H97"
                    fill="none"
                    stroke="rgba(139,26,26,0.8)"
                    strokeLinecap="round"
                    strokeWidth="0.9"
                  />
                  <circle data-peace-timeline-node cx="9" cy="9" r="1.8" fill="rgba(139,26,26,0.95)" />
                  <circle data-peace-timeline-node cx="36" cy="9" r="1.8" fill="rgba(139,26,26,0.95)" />
                  <circle data-peace-timeline-node cx="64" cy="9" r="1.8" fill="rgba(139,26,26,0.95)" />
                  <circle data-peace-timeline-node cx="90" cy="9" r="1.8" fill="rgba(139,26,26,0.95)" />
                </svg>

                <div className="mt-3 grid grid-cols-4 gap-2 text-[0.72rem] text-[var(--tertiary)]">
                  <div>
                    <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                      Appointment
                    </p>
                    <p className="mt-1 text-[var(--on-surface)]">May 20</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                      Diagnosis
                    </p>
                    <p className="mt-1 text-[var(--on-surface)]">May 21</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                      Rx
                    </p>
                    <p className="mt-1 text-[var(--on-surface)]">May 22</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.22em] text-[var(--primary)]/70">
                      Follow-up
                    </p>
                    <p className="mt-1 text-[var(--on-surface)]">June 10</p>
                  </div>
                </div>
              </div>
            </SecondaryPanel>
          </CardFrame>
        </div>
      </Container>
    </section>
  );
}
