"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

import { siteLinks } from "@/data/site";

const FLOATING_WIDTH = "min(94vw, 1180px)";
const SCROLL_DELTA = 2;
const HIDE_Y = -140;
const SHOW_DURATION = 0.52;
const MOBILE_PANEL_ID = "site-header-mobile-menu";
const OPEN_DURATION = 0.66;
const CLOSE_DURATION = 0.5;

const glassShellStyle = {
  backgroundColor: "rgba(255,255,255,0.58)",
  borderColor: "rgba(15,23,42,0.08)",
  boxShadow:
    "0 1px 0 rgba(255,255,255,0.72) inset, 0 14px 36px rgba(15,23,42,0.06)",
  backdropFilter: "blur(18px) saturate(140%)",
  WebkitBackdropFilter: "blur(18px) saturate(140%)",
} as const;

const menuLinks = [{ label: "Home", href: "/" }, ...siteLinks];

type ButtonRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function SiteHeader() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [buttonRect, setButtonRect] = useState<ButtonRect | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const isFloatingRef = useRef(false);
  const isHiddenRef = useRef(false);
  const openRef = useRef(false);
  const buttonRectRef = useRef<ButtonRect | null>(null);
  const bodyScrollLockRef = useRef({
    overflow: "",
    paddingRight: "",
    scrollbarGutter: "",
  });
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (pathname && openRef.current) {
      const frame = window.requestAnimationFrame(() => {
        setOpen(false);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }
  }, [pathname]);

  useEffect(() => {
    if (!open || !isMenuMounted) {
      return;
    }

    const body = document.body;
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    bodyScrollLockRef.current = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      scrollbarGutter: html.style.scrollbarGutter,
    };

    body.style.overflow = "hidden";
    body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
    html.style.scrollbarGutter = "stable";

    return () => {
      body.style.overflow = bodyScrollLockRef.current.overflow;
      body.style.paddingRight = bodyScrollLockRef.current.paddingRight;
      html.style.scrollbarGutter = bodyScrollLockRef.current.scrollbarGutter;
    };
  }, [open, isMenuMounted]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const surface = surfaceRef.current;
    const logo = logoRef.current;
    const navList = navListRef.current;
    const cta = ctaRef.current;
    const closeButton = closeButtonRef.current;

    if (!overlay || !surface || !logo || !navList || !cta || !closeButton || !isMenuMounted) {
      return;
    }

    const links = menuLinkRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const buttonRect = buttonRectRef.current;
    const originX =
      buttonRect?.left !== undefined ? buttonRect.left + buttonRect.width / 2 : window.innerWidth - 40;
    const originY =
      buttonRect?.top !== undefined ? buttonRect.top + buttonRect.height / 2 : 40;
    const radius =
      Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY),
      ) + 56;

    openTimelineRef.current?.kill();
    closeTimelineRef.current?.kill();
    gsap.killTweensOf([overlay, surface, logo, navList, cta, closeButton, ...links]);

    const finishClose = () => {
      overlay.style.pointerEvents = "none";
      setIsMenuMounted(false);
      window.requestAnimationFrame(() => {
        buttonRef.current?.focus({ preventScroll: true });
      });
    };

    if (open) {
      overlay.style.display = "block";
      overlay.style.pointerEvents = "auto";

      gsap.set(overlay, { autoAlpha: 1, visibility: "visible" });
      gsap.set(surface, {
        autoAlpha: 1,
        visibility: "visible",
        clipPath: reduceMotion ? "none" : `circle(0px at ${originX}px ${originY}px)`,
        WebkitClipPath: reduceMotion ? "none" : `circle(0px at ${originX}px ${originY}px)`,
      });
      gsap.set(logo, {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : -4,
      });
      gsap.set(closeButton, {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : -4,
      });
      gsap.set(navList, {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 14,
      });
      gsap.set(links, {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 12,
      });
      gsap.set(cta, {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 12,
      });

      if (reduceMotion) {
        closeButton.focus({ preventScroll: true });
        return;
      }

      openTimelineRef.current = gsap
        .timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            closeButton.focus({ preventScroll: true });
          },
        })
        .to(surface, {
          clipPath: `circle(${radius}px at ${originX}px ${originY}px)`,
          WebkitClipPath: `circle(${radius}px at ${originX}px ${originY}px)`,
          duration: OPEN_DURATION,
          ease: "power4.out",
        })
        .to(
          logo,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            ease: "power3.out",
          },
          0.14,
        )
        .to(
          closeButton,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.22,
            ease: "power3.out",
          },
          0.14,
        )
        .to(
          navList,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          0.22,
        )
        .to(
          links,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "power3.out",
          },
          0.24,
        )
        .to(
          cta,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: "power3.out",
          },
          0.34,
        );

      return;
    }

    if (reduceMotion) {
      finishClose();
      return;
    }

    closeTimelineRef.current = gsap
      .timeline({
        defaults: { overwrite: true },
        onComplete: finishClose,
      })
      .to(cta, {
        autoAlpha: 0,
        y: 8,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(
        links,
        {
          autoAlpha: 0,
          y: 10,
          duration: 0.14,
          stagger: 0.025,
          ease: "power2.out",
        },
        0.02,
      )
      .to(
        navList,
        {
          autoAlpha: 0,
          y: 8,
          duration: 0.14,
          ease: "power2.out",
        },
        0.04,
      )
      .to(
        logo,
        {
          autoAlpha: 0,
          y: -4,
          duration: 0.1,
          ease: "power2.out",
        },
        0.05,
      )
      .to(
        closeButton,
        {
          autoAlpha: 0,
          y: -4,
          duration: 0.1,
          ease: "power2.out",
        },
        0.05,
      )
      .to(
        surface,
        {
          clipPath: `circle(0px at ${originX}px ${originY}px)`,
          WebkitClipPath: `circle(0px at ${originX}px ${originY}px)`,
          duration: CLOSE_DURATION,
          ease: "power3.inOut",
        },
        0.08,
      );
  }, [open, isMenuMounted, reduceMotion]);

  useEffect(() => {
    const header = headerRef.current;
    const shell = shellRef.current;

    if (!header || !shell) {
      return;
    }

    const setFloatingChrome = (floating: boolean) => {
      const isMobile = window.innerWidth < 1024;

      header.style.position = "fixed";
      shell.style.width = isMobile ? "100%" : FLOATING_WIDTH;
      shell.style.maxWidth = "none";
      shell.style.borderRadius = isMobile ? "0" : "9999px";
      shell.style.borderWidth = isMobile ? "0" : "1px";
      shell.style.borderStyle = "solid";
      shell.style.backgroundColor = isMobile
        ? floating
          ? "rgba(255,255,255,0.42)"
          : "rgba(255,255,255,0.24)"
        : floating
          ? glassShellStyle.backgroundColor
          : "transparent";
      shell.style.borderColor = floating
        ? isMobile
          ? "rgba(255,255,255,0.14)"
          : glassShellStyle.borderColor
        : "transparent";
      shell.style.boxShadow = floating
        ? isMobile
          ? "none"
          : glassShellStyle.boxShadow
        : "none";
      shell.style.backdropFilter = floating
        ? isMobile
          ? "blur(14px) saturate(130%)"
          : glassShellStyle.backdropFilter
        : "none";
      shell.style.setProperty(
        "-webkit-backdrop-filter",
        floating
          ? isMobile
            ? "blur(14px) saturate(130%)"
            : glassShellStyle.WebkitBackdropFilter
          : "none",
      );
    };

    const animateShell = (yPercent: number) => {
      gsap.killTweensOf(shell);
      gsap.to(shell, {
        yPercent,
        duration: reduceMotion ? 0 : yPercent === 0 ? 0.45 : SHOW_DURATION,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const update = () => {
      const scrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      const delta = scrollY - previousScrollY;
      const shouldFloat = scrollY > 0;

      if (shouldFloat !== isFloatingRef.current) {
        isFloatingRef.current = shouldFloat;
        setFloatingChrome(shouldFloat);

        if (!shouldFloat) {
          isHiddenRef.current = false;
          animateShell(0);
        }
      }

      if (scrollY <= 0) {
        isHiddenRef.current = false;
        animateShell(0);
      } else if (!openRef.current) {
        if (delta > SCROLL_DELTA && !isHiddenRef.current) {
          isHiddenRef.current = true;
          animateShell(HIDE_Y);
        } else if (delta < -SCROLL_DELTA && isHiddenRef.current) {
          isHiddenRef.current = false;
          animateShell(0);
        }
      } else {
        isHiddenRef.current = false;
        animateShell(0);
      }

      lastScrollYRef.current = scrollY;
    };

    const onScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    const onResize = () => {
      update();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    };

    setFloatingChrome(false);
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!open || !isMenuMounted) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusables = [
        closeButtonRef.current,
        ...menuLinkRefs.current,
        ctaRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, isMenuMounted]);

  const toggleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const nextButtonRect = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
    buttonRectRef.current = nextButtonRect;
    setButtonRect(nextButtonRect);

    if (!open) {
      setIsMenuMounted(true);
      setOpen(true);
      return;
    }

    setOpen(false);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const closeButtonStyle = buttonRect
    ? {
        left: `${buttonRect.left}px`,
        top: `${buttonRect.top}px`,
        width: `${buttonRect.width}px`,
        height: `${buttonRect.height}px`,
      }
    : {
        right: "1rem",
        top: "1rem",
        width: "44px",
        height: "44px",
      };

  return (
    <header ref={headerRef} className=" rounded-xl fixed inset-x-0 top-0 z-[100]">
      <div className="mx-auto w-full max-w-[1180px] pt-3 sm:pt-4">
        <div
          ref={shellRef}
          id="navbar-shell"
          className="relative w-full overflow-visible border border-transparent"
          style={glassShellStyle}
        >
          <div className="grid min-h-[68px] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-5 lg:px-6">
            <Link href="/" className="relative z-20 flex min-w-0 items-center gap-3">
              <div
                id="navbar-logo-anchor"
                className="relative h-9 w-9 shrink-0"
              >
                <Image
                  src="/brand/logo.png"
                  alt="Viruj"
                  fill
                  priority
                  sizes="36px"
                  className="rounded-lg object-contain"
                />
              </div>
              <span id="navbar-title" className="sr-only">
                Viruj
              </span>
            </Link>

            <button
              ref={buttonRef}
              type="button"
              onClick={toggleMenu}
              className="relative z-[140] inline-flex h-11 w-11 shrink-0 items-center justify-center justify-self-end border-0 bg-transparent p-0 text-[var(--on-surface)] shadow-none transition-transform duration-300 hover:bg-transparent focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-fixed)]"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls={MOBILE_PANEL_ID}
            >
              <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
              <span
                className={[
                  "absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
                  open ? "translate-y-0 rotate-45" : "-translate-y-[6px]",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out motion-reduce:transition-none",
                  open ? "scale-x-0 opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out motion-reduce:transition-none",
                  open ? "translate-y-0 -rotate-45" : "translate-y-[6px]",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        {isMenuMounted ? (
          <div
            ref={overlayRef}
            id={MOBILE_PANEL_ID}
            className="fixed inset-0 z-[110] h-[100svh] w-full max-w-[100vw] overflow-hidden lg:h-[100dvh]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!open}
            style={{
              display: "none",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            <div
              ref={surfaceRef}
              className="absolute inset-0 bg-[var(--primary)]"
              style={{
                clipPath: "circle(0px at 100% 0px)",
                WebkitClipPath: "circle(0px at 100% 0px)",
                willChange: "clip-path",
              }}
            />

            <div className="relative z-10 flex h-full min-h-0 w-full flex-col overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-6 lg:px-8 lg:pb-8 lg:pt-[calc(env(safe-area-inset-top)+1.25rem)]">
              <div
                ref={logoRef}
                className="absolute left-4 top-[calc(env(safe-area-inset-top)+0.75rem)] z-[130] h-9 w-9 sm:left-6 sm:top-[calc(env(safe-area-inset-top)+1rem)] lg:left-6 lg:top-6"
              >
                <Image
                  src="/brand/logo.png"
                  alt="Viruj"
                  fill
                  priority
                  sizes="36px"
                  className="rounded-lg object-contain"
                />
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                className="fixed z-[150] inline-flex items-center justify-center border-0 bg-transparent p-0 text-[var(--primary-fixed)] transition-all duration-300 hover:bg-transparent focus-visible:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary-fixed)]/70"
                aria-label="Close navigation"
                style={closeButtonStyle}
              >
                <span className="sr-only">Close navigation</span>
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </span>
              </button>

              <div className="flex min-h-full w-full flex-1 flex-col">
                <div className="grid flex-1 min-h-0 gap-10 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-20">
                  <div className="flex min-h-0 flex-col">
                    <nav
                      ref={navListRef}
                      aria-label="Primary navigation"
                      className="group/nav flex flex-col gap-2 pt-[clamp(5rem,28svh,9rem)] lg:max-w-[620px] lg:pt-[clamp(6rem,18vh,9rem)]"
                    >
                      {menuLinks.map((link, index) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          ref={(node) => {
                            menuLinkRefs.current[index] = node;
                          }}
                          onClick={closeMenu}
                          className="group/item flex items-baseline gap-3 text-[var(--on-primary)] transition-opacity duration-300 ease-out hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-fixed)]/60 group-hover/nav:opacity-70"
                        >
                          <span className="w-9 shrink-0 text-[0.62rem] font-semibold tracking-[0.38em] text-[var(--primary-fixed)]/60 transition-transform duration-300 ease-out group-hover/item:translate-x-0.5 lg:w-11 lg:text-[0.68rem]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="relative min-w-0 flex-1">
                            <span className="block font-sentient text-[clamp(2.35rem,9vw,3.35rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[var(--on-primary)] transition-all duration-300 ease-out group-hover/item:translate-x-2 group-hover/item:text-[var(--primary-fixed)] lg:text-[clamp(3rem,5vw,4.5rem)] lg:group-hover/item:translate-x-3">
                              {link.label}
                            </span>
                            <span className="mt-2 block h-px w-0 bg-[var(--primary-fixed)]/80 transition-all duration-300 ease-out group-hover/item:w-full" />
                          </span>

                          <span className="ml-auto flex h-6 items-center overflow-hidden text-[var(--primary-fixed)]">
                            <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-[0.28em] opacity-0 transition-all duration-300 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100">
                              <span aria-hidden="true">-&gt;</span>
                            </span>
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="flex min-h-0 flex-col justify-end lg:items-end">
                    <div className="mt-auto flex flex-col gap-4 pt-10 lg:pt-0">
                      <Link
                        ref={ctaRef}
                        href="#cta"
                        onClick={closeMenu}
                        className="group/cta inline-flex w-full items-center justify-between gap-4 rounded-full bg-[var(--primary-fixed)] px-5 py-4 text-[1rem] font-semibold tracking-[-0.01em] text-[var(--primary)] shadow-[0_10px_24px_rgba(139,26,26,0.10)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(139,26,26,0.14)] active:scale-[0.98] sm:px-6 sm:py-[1.125rem] lg:min-w-[340px] lg:max-w-[380px] lg:px-7 lg:py-5"
                      >
                        <span className="font-sentient text-[1.08rem] font-medium tracking-[-0.03em] sm:text-[1.15rem] lg:text-[1.25rem]">
                          Get the App
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] transition-transform duration-300 ease-out group-hover/cta:translate-x-1">
                          <span aria-hidden="true">-&gt;</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
