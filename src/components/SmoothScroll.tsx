"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Applies document-level inertia scrolling unless the user prefers reduced motion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [allowSmoothScroll, setAllowSmoothScroll] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncPreference() {
      setAllowSmoothScroll(!media.matches);
    }

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => {
      media.removeEventListener("change", syncPreference);
    };
  }, []);

  if (!allowSmoothScroll) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        autoRaf: true,
        anchors: {
          offset: -110,
          duration: 1.25,
        },
        prevent: (node: HTMLElement) => node.closest("dialog") !== null,
      }}
    >
      {children}
    </ReactLenis>
  );
}
