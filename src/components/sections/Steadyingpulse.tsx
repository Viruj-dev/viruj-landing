"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONFIG = {
  lineColorAnxious: "var(--primary)",
  lineColorCalm: "var(--primary)",
  textPrimary: "var(--on-surface)",
  textMuted: "var(--on-surface-variant)",
};

function buildPulsePath(progress: number, width: number, height: number): string {
  const points = 120;
  const midY = height / 2;
  const calmAmplitude = height * 0.09;
  const calmFrequency = (Math.PI * 2) / width;
  const anxiousWeight = 1 - progress;
  const anxiousAmplitude = height * 0.22 * anxiousWeight;
  const anxiousFrequency = calmFrequency * 6.5;
  const jitter = (x: number) => Math.sin(x * 0.017) * 0.6 + Math.sin(x * 0.041) * 0.4;

  let d = "";
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    const calmY = Math.sin(x * calmFrequency) * calmAmplitude;
    const anxiousY = Math.sin(x * anxiousFrequency + jitter(x) * 3) * anxiousAmplitude * jitter(x + 40);
    const y = midY + calmY + anxiousY;
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

export default function SteadyingPulse() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const headline = headlineRef.current;
    const subline = sublineRef.current;
    if (!section || !svg || !path || !headline || !subline) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const getDims = () => {
        const rect = svg.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      };

      const dims = getDims();
      path.setAttribute("d", buildPulsePath(0, dims.width, dims.height));
      path.setAttribute("stroke", CONFIG.lineColorAnxious);

      const finish = () => {
        const calmDims = getDims();
        path.setAttribute("d", buildPulsePath(1, calmDims.width, calmDims.height));
        path.setAttribute("stroke", CONFIG.lineColorCalm);
      };

      if (reduceMotion) {
        finish();
        gsap.set([headline, subline], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set([headline, subline], { autoAlpha: 0, y: 16 });
      gsap.set(path, { attr: { "stroke-dasharray": "1", "stroke-dashoffset": "1" } });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.to(path, {
        attr: { d: buildPulsePath(1, dims.width, dims.height) },
        stroke: CONFIG.lineColorCalm,
        duration: 1.1,
      })
        .to(headline, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.2")
        .to(subline, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4");

      return () => {
        tl.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--primary)] px-6"
      aria-label="Care finds its rhythm"
    >
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[28vh] w-full -translate-y-1/2 md:h-[22vh]"
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-4 text-center">
        <h2
          ref={headlineRef}
          className="text-3xl font-medium tracking-tight md:text-5xl"
          style={{ color: CONFIG.textPrimary }}
        >
          Something steadies.
        </h2>
        <p
          ref={sublineRef}
          className="text-base leading-relaxed md:text-lg"
          style={{ color: CONFIG.textMuted, opacity: 0.75 }}
        >
          Not because you kept track. Because something else did.
        </p>
      </div>
    </section>
  );
}
