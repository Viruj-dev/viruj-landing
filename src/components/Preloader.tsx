"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  onReady: () => void;
}

const INTRO_TEXT = "Viruj";
const INTRO_CHAR_DELAY = 0.075;
const PRELOADER_TIMEOUT_MS = 9000;

export default function Preloader({ onReady }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const image = imageRef.current;
    const navbarShell = document.getElementById("navbar-shell");
    const navbarLogo = document.getElementById("navbar-logo-anchor");
    const navbarTitle = document.getElementById("navbar-title");
    const navItems = gsap.utils.toArray<HTMLElement>(".nav-item");
    const navbarCta = document.getElementById("navbar-cta");
    const heroRoot = document.getElementById("hero");

    if (
      !root ||
      !stage ||
      !video ||
      !image ||
      !navbarShell ||
      !navbarLogo ||
      !navbarTitle ||
      !heroRoot
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let completed = false;
    let exitStarted = false;
    let timeline: gsap.core.Timeline | null = null;
    let timeoutId: number | NodeJS.Timeout | null = null;

    const clearTimeoutIfNeeded = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId as unknown as number);
        timeoutId = null;
      }
    };

    const revealFallbackState = () => {
      gsap.set(image, { autoAlpha: 1 });
      gsap.set(video, { autoAlpha: 0 });
    };

    const applyMainVisibleState = () => {
      revealFallbackState();
      gsap.set(navbarShell, {
        autoAlpha: 1,
        filter: "blur(0px)",
        pointerEvents: "auto",
      });
      navbarTitle.textContent = INTRO_TEXT;
      navbarTitle.style.opacity = "1";
      if (navItems.length > 0) {
        gsap.set(navItems, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }
      if (navbarCta) {
        gsap.set(navbarCta, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }
      gsap.set(heroRoot, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
      });
    };

    const completeFallbackExit = () => {
      if (completed) {
        return;
      }

      completed = true;
      clearTimeoutIfNeeded();
      root.style.transition = "opacity 350ms ease, visibility 0s linear 350ms";
      root.style.opacity = "0";
      root.style.visibility = "hidden";
      root.style.pointerEvents = "none";

      setTimeout(() => {
        onReady();
      }, 375);
    };

    const setInitialState = () => {
      gsap.set(root, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      gsap.set(stage, {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "50% 50%",
      });

      gsap.set(video, {
        autoAlpha: 1,
      });

      gsap.set(image, {
        autoAlpha: 0,
      });

      gsap.set(navbarShell, {
        autoAlpha: 0,
        filter: "blur(14px)",
        pointerEvents: "none",
      });

      gsap.set(navbarTitle, {
        autoAlpha: 0,
        width: 0,
      });

      if (navItems.length > 0) {
        gsap.set(navItems, {
          autoAlpha: 0,
          y: 8,
          filter: "blur(6px)",
        });
      }

      if (navbarCta) {
        gsap.set(navbarCta, {
          autoAlpha: 0,
          y: 8,
          filter: "blur(6px)",
        });
      }

      gsap.set(heroRoot, {
        autoAlpha: 0,
        y: 16,
        filter: "blur(12px)",
      });
    };

    const finish = () => {
      if (completed) {
        return;
      }

      completed = true;
      clearTimeoutIfNeeded();
      onReady();
    };

    const revealIntro = () => {
      if (timeline) {
        return;
      }

      const start = stage.getBoundingClientRect();
      const target = navbarLogo.getBoundingClientRect();

      if (!start.width || !start.height || !target.width || !target.height) {
        applyMainVisibleState();
        completeFallbackExit();
        return;
      }

      const startCenterX = start.left + start.width / 2;
      const startCenterY = start.top + start.height / 2;
      const targetCenterX = target.left + target.width / 2;
      const targetCenterY = target.top + target.height / 2;

      const translateX = targetCenterX - startCenterX;
      const translateY = targetCenterY - startCenterY;
      const scale = target.width / start.width;
      timeline = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: finish,
      });

      timeline.set(image, {
        autoAlpha: 1,
      });

      timeline.to(
        video,
        {
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.out",
        },
        0,
      );

      timeline
        .to(stage, {
          x: translateX,
          y: translateY,
          scale,
          duration: 1.15,
          ease: "power3.inOut",
        })
        .to(stage, {
          scale: scale * 1.04,
          duration: 0.12,
          ease: "power2.out",
        })
        .to(stage, {
          scale,
          duration: 0.14,
          ease: "power2.inOut",
        });

      timeline.to(
        navbarShell,
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          delay: 0.7,
          duration: 0.7,
          ease: "power2.out",
          onStart: () => {
            navbarShell.style.pointerEvents = "auto";
          },
        },
        0.28,
      );

      timeline.call(() => {
        navbarTitle.textContent = "";
        gsap.set(navbarTitle, {
          autoAlpha: 1,
          width: "auto",
        });

        INTRO_TEXT.split("").forEach((char, index) => {
          gsap.delayedCall(index * INTRO_CHAR_DELAY, () => {
            navbarTitle.textContent += char;
          });
        });
      });

      if (navItems.length > 0) {
        timeline.to(
          navItems,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.06,
            duration: 0.42,
            ease: "power2.out",
          },
          1.02,
        );
      }

      if (navbarCta) {
        timeline.to(
          navbarCta,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.42,
            ease: "power2.out",
          },
          1.1,
        );
      }

      timeline.to(
        heroRoot,
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power2.out",
        },
        1.15,
      );

      timeline.to(
        root,
        {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        1.8,
      );
    };

    const startExitSequence = (useFallbackState = false) => {
      if (exitStarted) {
        return;
      }

      exitStarted = true;
      clearTimeoutIfNeeded();

      if (useFallbackState || prefersReducedMotion) {
        applyMainVisibleState();
        completeFallbackExit();
        return;
      }

      revealIntro();
    };

    const handleVideoFailure = () => {
      startExitSequence(true);
    };

    const handleVideoReady = () => {
      playVideo();
      startExitSequence(false);
    };

    setInitialState();

    timeoutId = setTimeout(() => {
      startExitSequence(true);
    }, PRELOADER_TIMEOUT_MS);

    if (prefersReducedMotion) {
      window.requestAnimationFrame(() => {
        startExitSequence(true);
      });
    }

    const playVideo = () => {
      video.play().catch(() => {
        // Muted autoplay should normally succeed. If it doesn't, the timeout
        // and error handlers still keep the intro path moving.
      });
    };

    video.addEventListener("error", handleVideoFailure);
    video.addEventListener("abort", handleVideoFailure);
    video.addEventListener("stalled", handleVideoFailure);
    video.addEventListener("emptied", handleVideoFailure);

    if (video.readyState >= 2) {
      handleVideoReady();
    } else {
      video.addEventListener("loadeddata", handleVideoReady, { once: true });
      video.addEventListener("canplay", handleVideoReady, { once: true });
    }

    return () => {
      timeline?.kill();
      clearTimeoutIfNeeded();
      video.removeEventListener("error", handleVideoFailure);
      video.removeEventListener("abort", handleVideoFailure);
      video.removeEventListener("stalled", handleVideoFailure);
      video.removeEventListener("emptied", handleVideoFailure);
      video.removeEventListener("loadeddata", handleVideoReady);
      video.removeEventListener("canplay", handleVideoReady);
    };
  }, [onReady]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[var(--surface)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />

      <div className="absolute inset-0 flex items-center justify-center bg-white">
        <div
          ref={stageRef}
          className="relative h-[220px] w-[220px] will-change-transform"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-contain"
          >
            <source src="/brand/intro-logo.mp4" type="video/mp4" />
          </video>

          <div ref={imageRef} className="absolute inset-0 h-full w-full">
          <Image
            src="/brand/logo.png"
            alt="Viruj logo"
            fill
            priority
            sizes="220px"
            className="object-contain"
          />
          </div>
        </div>
      </div>
    </div>
  );
}
