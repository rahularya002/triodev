"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type UseAgencyAnimationsArgs = {
  pageRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLButtonElement | null>;
};

export function useAgencyAnimations({ pageRef, ctaRef }: UseAgencyAnimationsArgs) {
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          ".hero-chip, .hero-title, .hero-copy, .hero-cta, .hero-panel, .section-item, .footer-item",
          {
            opacity: 1,
            y: 0,
          }
        );
        return;
      }

      gsap.fromTo(
        ".hero-chip, .hero-title, .hero-copy, .hero-cta, .hero-panel, .section-item, .footer-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      const cta = ctaRef.current;
      if (!cta) return;

      const onMove = (event: PointerEvent) => {
        const rect = cta.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(cta, {
          x: x * 0.16,
          y: y * 0.2,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(cta, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" });
      };

      cta.addEventListener("pointermove", onMove);
      cta.addEventListener("pointerleave", onLeave);

      return () => {
        cta.removeEventListener("pointermove", onMove);
        cta.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: pageRef }
  );
}
