import type { RefObject } from "react";

type HeroSectionProps = {
  ctaRef: RefObject<HTMLButtonElement | null>;
  onStartProject: () => void;
};

export function HeroSection({ ctaRef, onStartProject }: HeroSectionProps) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-16 text-center">
      <p className="hero-chip rounded-full border border-(--primary)/25 bg-(--surface) px-4 py-2 text-[11px] tracking-[0.2em] uppercase text-(--muted)">
        Product Engineering Studio
      </p>
      <h1 className="hero-title max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-balance md:text-7xl">
        We build software that helps businesses
        <span className="text-(--primary)"> move faster.</span>
      </h1>
      <p className="hero-copy max-w-2xl text-base leading-relaxed text-(--muted) md:text-lg">
        Triodev designs and builds SaaS platforms, AI products, dashboards, and
        modern websites for startups and growing businesses that need to launch
        fast and scale with confidence.
      </p>
      <div className="hero-cta flex flex-col items-center gap-4">
        <button
          ref={ctaRef}
          type="button"
          onClick={onStartProject}
          className="cursor-pointer rounded-full bg-(--primary) px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-[#f6f4ed] uppercase shadow-[0_16px_32px_-18px_rgba(20,28,18,0.8)] transition hover:brightness-110"
        >
          Book a discovery call
        </button>
        <p className="max-w-md text-xs leading-relaxed tracking-[0.08em] text-(--muted) uppercase">
          From MVPs to live SaaS - built with Next.js, React, Supabase, and AI.
        </p>
      </div>
    </section>
  );
}
