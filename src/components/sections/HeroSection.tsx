"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Badge, Container } from "@/components/ui";
import { primaryButton, secondaryButton } from "./sectionStyles";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const scrollDotRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const spotlight = spotlightRef.current;
      const badge = badgeRef.current;
      const title = titleRef.current;
      const description = descriptionRef.current;
      const buttons = buttonsRef.current;
      const scrollDot = scrollDotRef.current;

      if (
        !section ||
        !spotlight ||
        !badge ||
        !title ||
        !description ||
        !buttons ||
        !scrollDot
      ) {
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = SplitText.create(title, {
        type: "lines",
        linesClass: "hero-line",
      });

      const resetMotion = () => {
        gsap.set([badge, description, buttons], { autoAlpha: 1, y: 0 });
        gsap.set(split.lines, { autoAlpha: 1, y: 0, filter: "none" });
        gsap.set(spotlight, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
        gsap.set(scrollDot, { y: 0, opacity: 1 });
      };

      if (reduceMotion) {
        resetMotion();
        return () => {
          split.revert();
        };
      }

      gsap.set([badge, description, buttons], { autoAlpha: 0, y: 18 });
      gsap.set(split.lines, { autoAlpha: 0, y: 34, filter: "blur(10px)" });
      gsap.set(spotlight, { autoAlpha: 1 });
      gsap.set(scrollDot, { y: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(
          split.lines,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.1",
        )
        .to(description, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.25")
        .to(buttons, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.18");

      gsap.to(spotlight, {
        x: 36,
        y: -18,
        scale: 1.06,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(scrollDot, {
        y: 18,
        opacity: 0.2,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      return () => {
        tl.kill();
        split.revert();
      };
    },
    { scope: sectionRef },
  );

  const scrollToSection = (selector: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector<HTMLElement>(selector);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerShell = document.getElementById("navbar-shell");
    const headerOffset = headerShell?.getBoundingClientRect().height ?? 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset - 16;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="
    relative
    flex
    min-h-screen
    w-full
    max-w-full
    overflow-hidden
    bg-[var(--surface)]
    text-[var(--on-surface)]
  "
    >
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="
    pointer-events-none
    absolute
    left-1/2
    top-[42%]
    h-[42rem]
    w-[42rem]
    max-w-none
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    blur-[120px]
    opacity-60
  "
        style={{
          background:
            "radial-gradient(circle, rgba(139,26,26,.08) 0%, rgba(139,26,26,.04) 35%, transparent 72%)",
        }}
      />

      <Container
        className="
    relative
    flex
    min-h-[100svh]
    w-full
    max-w-full
    flex-col
    items-center
    justify-center
    overflow-hidden
    px-4
    text-center
    sm:px-6
  "
      >        <div ref={badgeRef} className="relative z-10 mb-8">
          <Badge
            variant="normal"
            className="rounded-full border border-[color:var(--outline-variant)] bg-white/70 px-5 py-2 backdrop-blur-xl"
          >
            Connected Healthcare Ecosystem
          </Badge>
        </div>

        <h1
          ref={titleRef}
          className="relative z-10 mx-auto max-w-[12ch] text-[clamp(2.8rem,10vw,7rem)] font-sentient leading-[0.88] tracking-[-0.065em]"
        >
          Healthcare,
          <br />
          Finally Working
          <br />
          <span className="font-telma font-medium text-[var(--primary)]">
            together.
          </span>
        </h1>

        <Link
          href="#product"
          onClick={scrollToSection("#product")}
          className="relative z-10 mt-8 max-w-2xl text-lg leading-8 text-[var(--on-surface-variant)] lg:text-xl"
        >
          <span className="font-medium text-[var(--primary)]">Viruj</span>{" "}
          brings patients, doctors, diagnostics, medical records and AI
          together into one connected healthcare ecosystem designed to make
          care
          <span className="font-medium italic text-[var(--primary)]">
            {" "}
            simpler, faster & more human.
          </span>
        </Link>

        <div ref={buttonsRef} className="relative z-10 mt-12 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="#product"
            onClick={scrollToSection("#product")}
            className={`${primaryButton} w-full group shadow-[0_18px_50px_rgba(139,26,26,0.18)] sm:w-auto`}
          >
            Explore Platform
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="#cta"
            onClick={scrollToSection("#cta")}
            className={`${secondaryButton} w-full border-[var(--primary)] bg-transparent hover:bg-white/60 sm:w-auto`}
          >
            Watch Demo
          </Link>
        </div>

        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-[color:var(--outline-variant)] p-1">
            <span
              ref={scrollDotRef}
              className="h-2 w-2 rounded-full bg-[var(--primary)]"
            />
          </div>
        </div>
      </Container>

    </section>
  );
}
