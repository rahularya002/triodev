import type { RefObject } from "react";
import HeroSandboxVisual from "./hero/HeroSandboxVisual";

type HeroSectionProps = {
  ctaRef: RefObject<HTMLButtonElement | null>;
  onStartProject: () => void;
};

export function HeroSection({ ctaRef, onStartProject }: HeroSectionProps) {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] py-8">
      <div className="space-y-8">
        <p className="hero-chip max-w-sm rounded-full border border-(--primary)/25 bg-(--surface) px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-(--muted)">
          Design + develop webapps for bold brands
        </p>
        <h1 className="hero-title text-5xl leading-[0.92] font-semibold tracking-tight text-balance md:text-7xl">
          We shape
          <span className="text-(--primary)"> digital products </span>
          that feel alive.
        </h1>
        <p className="hero-copy max-w-xl text-base leading-relaxed text-(--muted) md:text-lg">
          Triodev is a creative engineering studio building expressive,
          high-performance web applications with clean systems, sharp UX, and
          motion that guides attention.
        </p>
        <div className="hero-cta space-y-4">
          <button
            ref={ctaRef}
            type="button"
            onClick={onStartProject}
            className="rounded-full bg-(--primary) px-7 py-3 text-sm font-medium tracking-[0.14em] text-[#f6f4ed] uppercase shadow-[0_16px_32px_-18px_rgba(20,28,18,0.8)] transition hover:brightness-110 cursor-pointer"
          >
            Start a Project
          </button>
          <p className="max-w-md text-xs leading-relaxed tracking-[0.08em] text-(--muted) uppercase">
            Trusted by product teams at Pulse Labs, Nexa Finance, and Astra
            Commerce. Built with Next.js, React, and GSAP.
          </p>
        </div>
      </div>

      {/* Interactive physics sandbox panel */}
      <div data-parallax="0.25" className="hero-panel w-full">
        <HeroSandboxVisual />
      </div>
    </section>
  );
}
