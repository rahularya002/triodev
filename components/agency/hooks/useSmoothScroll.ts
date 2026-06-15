"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      overscroll: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });

    setLenis(instance);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        instance.stop();
      } else {
        instance.start();
        instance.resize();
      }
    };

    const onWindowFocus = () => {
      instance.start();
      instance.resize();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("focus", onWindowFocus);
    window.addEventListener("resize", onWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("focus", onWindowFocus);
      window.removeEventListener("resize", onWindowFocus);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return lenis;
}
