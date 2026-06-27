import type { TrustPoint } from "./types";

type TrustSectionProps = {
  items: TrustPoint[];
};

export function TrustSection({ items }: TrustSectionProps) {
  return (
    <section className="space-y-5">
      <div className="section-item max-w-2xl">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Why teams work with us</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          A partner built for real products
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-(--muted)">
          We're a young studio, but we bring real range. Here's what you can
          count on when you build with Triodev.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((point, index) => (
          <article
            key={point.title}
            className="section-item flex gap-4 rounded-3xl border border-(--primary)/16 bg-(--surface) p-6"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--primary)/12 text-sm font-semibold text-(--primary)">
              0{index + 1}
            </span>
            <div>
              <h3 className="text-lg font-medium">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--muted)">{point.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
