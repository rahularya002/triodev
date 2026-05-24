"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      overscroll: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        lenis.stop();
      } else {
        lenis.start();
        lenis.resize();
      }
    };

    const onWindowFocus = () => {
      lenis.start();
      lenis.resize();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onWindowFocus);
    window.addEventListener("resize", onWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onWindowFocus);
      window.removeEventListener("resize", onWindowFocus);
      lenis.destroy();
    };
  }, []);
}
