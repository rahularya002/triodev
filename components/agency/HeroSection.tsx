import type { RefObject } from "react";

type HeroSectionProps = {
  ctaRef: RefObject<HTMLButtonElement | null>;
  onStartProject: () => void;
};

export function HeroSection({ ctaRef, onStartProject }: HeroSectionProps) {
  return (
    <section className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
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
        <button
          ref={ctaRef}
          type="button"
          onClick={onStartProject}
          className="hero-cta rounded-full bg-(--primary) px-7 py-3 text-sm font-medium tracking-[0.14em] text-[#f6f4ed] uppercase shadow-[0_16px_32px_-18px_rgba(20,28,18,0.8)] transition hover:brightness-110"
        >
          Start a Project
        </button>
      </div>

      <div className="hero-panel grid gap-4">
        <div className="rounded-3xl border border-(--primary)/18 bg-(--surface) p-7">
          <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">
            Current approach
          </p>
          <p className="mt-4 text-2xl leading-tight">
            Minimal layers.
            <br />
            Maximum intent.
          </p>
        </div>
        <div className="rounded-3xl bg-(--primary) p-7 text-[#f6f4ed]">
          <p className="text-xs tracking-[0.2em] uppercase opacity-80">
            Collaboration model
          </p>
          <p className="mt-4 text-sm leading-relaxed opacity-95">
            Strategy, UI system, prototype, production build - one compact loop
            with weekly shipping.
          </p>
        </div>
      </div>
    </section>
  );
}
