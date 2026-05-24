import type { TestimonialItem } from "./types";

type TestimonialsSectionProps = {
  items: TestimonialItem[];
};

export function TestimonialsSection({ items }: TestimonialsSectionProps) {
  return (
    <section className="space-y-5">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Testimonials</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">What clients say</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.name}
            className="section-item rounded-3xl border border-(--primary)/16 bg-(--surface) p-6"
          >
            <div className="mb-3 flex gap-1">
              <span className="h-1.5 w-5 rounded-full bg-(--primary)/50" />
              <span className="h-1.5 w-5 rounded-full bg-(--primary)/35" />
              <span className="h-1.5 w-5 rounded-full bg-(--primary)/20" />
            </div>
            <p className="text-(--primary)">&ldquo;</p>
            <p className="mt-2 text-sm leading-relaxed text-(--muted)">{item.quote}</p>
            <div className="mt-5 border-t border-(--primary)/16 pt-4">
              <p className="font-medium">{item.name}</p>
              <p className="text-xs tracking-[0.12em] text-(--muted) uppercase">{item.role}</p>
              <p className="mt-1 text-xs text-(--primary)/80">{item.company}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
