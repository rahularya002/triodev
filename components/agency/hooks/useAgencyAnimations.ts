"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type UseAgencyAnimationsArgs = {
  pageRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLButtonElement | null>;
  lenis: Lenis | null;
};

function setupLenisScrollTrigger(lenis: Lenis) {
  lenis.on("scroll", ScrollTrigger.update);

  return () => {
    lenis.off("scroll", ScrollTrigger.update);
  };
}

export function useAgencyAnimations({ pageRef, ctaRef, lenis }: UseAgencyAnimationsArgs) {
  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        gsap.set(
          ".hero-chip, .hero-title, .hero-copy, .hero-cta, .hero-panel, .section-item, [data-parallax]",
          {
            opacity: 1,
            y: 0,
            clearProps: "transform",
          }
        );
        gsap.set(".footer-item", { opacity: 1, y: 0 });
        return;
      }

      let teardownLenis: (() => void) | undefined;
      if (lenis) {
        teardownLenis = setupLenisScrollTrigger(lenis);
      }

      gsap.fromTo(
        ".hero-chip, .hero-title, .hero-copy, .hero-cta, .hero-panel",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      gsap.set(".section-item", { opacity: 0, y: 30 });

      ScrollTrigger.batch(".section-item", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          });
        },
        once: true,
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const speed = Number(element.dataset.parallax ?? 0.3);
        const distance = 40 + speed * 60;

        gsap.fromTo(
          element,
          { y: -distance * 0.35 },
          {
            y: distance * 0.65,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      const cta = ctaRef.current;
      let onMove: ((event: PointerEvent) => void) | undefined;
      let onLeave: (() => void) | undefined;

      if (cta) {
        onMove = (event: PointerEvent) => {
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

        onLeave = () => {
          gsap.to(cta, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.4)" });
        };

        cta.addEventListener("pointermove", onMove);
        cta.addEventListener("pointerleave", onLeave);
      }

      ScrollTrigger.refresh();

      return () => {
        teardownLenis?.();
        if (cta && onMove && onLeave) {
          cta.removeEventListener("pointermove", onMove);
          cta.removeEventListener("pointerleave", onLeave);
        }
      };
    },
    { scope: pageRef, dependencies: [lenis], revertOnUpdate: true }
  );
}
