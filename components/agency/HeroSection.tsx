import type { RefObject } from "react";

type HeroSectionProps = {
  ctaRef: RefObject<HTMLButtonElement | null>;
  onStartProject: () => void;
};

export function HeroSection({ ctaRef, onStartProject }: HeroSectionProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-16 text-center">
      <p className="hero-chip rounded-full border border-(--primary)/25 bg-(--surface) px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-(--muted)">
        Design + develop webapps for bold brands
      </p>
      <h1 className="hero-title max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-balance md:text-7xl">
        We shape
        <span className="text-(--primary)"> digital products </span>
        that feel alive.
      </h1>
      <p className="hero-copy max-w-2xl text-base leading-relaxed text-(--muted) md:text-lg">
        Triodev is a creative engineering studio building expressive,
        high-performance web applications with clean systems, sharp UX, and
        motion that guides attention.
      </p>
      <div className="hero-cta flex flex-col items-center gap-4">
        <button
          ref={ctaRef}
          type="button"
          onClick={onStartProject}
          className="cursor-pointer rounded-full bg-(--primary) px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-[#f6f4ed] uppercase shadow-[0_16px_32px_-18px_rgba(20,28,18,0.8)] transition hover:brightness-110"
        >
          Start a Project
        </button>
        <p className="max-w-md text-xs leading-relaxed tracking-[0.08em] text-(--muted) uppercase">
          Trusted by product teams at Pulse Labs, Nexa Finance, and Astra
          Commerce. Built with Next.js, React, and GSAP.
        </p>
      </div>
    </section>
  );
}
