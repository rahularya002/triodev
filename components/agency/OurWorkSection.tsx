import type { WorkItem } from "./types";

type OurWorkSectionProps = {
  items: WorkItem[];
};

export function OurWorkSection({ items }: OurWorkSectionProps) {
  return (
    <section className="space-y-5">
      <div className="section-item flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Our Work</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Selected Product Builds</h2>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="section-item group overflow-hidden rounded-3xl border border-(--primary)/16 bg-(--surface)"
          >
            <div className="h-48 bg-(--bg) p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-(--muted) uppercase">
                  {item.category}
                </span>
                <span className="text-xs text-(--muted)">0{index + 1}</span>
              </div>
              <div className="h-full rounded-2xl border border-(--primary)/20 bg-(--primary)/20 p-3">
                <div className="h-2 w-24 rounded-full bg-(--primary)/50" />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-lg bg-(--primary)/18" />
                  <div className="h-16 rounded-lg bg-(--primary)/28" />
                </div>
                <div className="mt-2 h-6 rounded-full bg-(--primary)/36" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--muted)">{item.summary}</p>
              <p className="mt-3 text-xs tracking-[0.12em] text-(--primary) uppercase">
                {item.impact}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-(--primary)/20 px-3 py-1 text-[10px] tracking-[0.12em] text-(--muted) uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
