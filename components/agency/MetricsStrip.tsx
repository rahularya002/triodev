import type { MetricItem } from "./types";

type MetricsStripProps = {
  items: MetricItem[];
};

export function MetricsStrip({ items }: MetricsStripProps) {
  return (
    <section className="section-item grid gap-3 rounded-3xl border border-(--primary)/16 bg-(--surface) p-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-(--primary)/12 bg-(--bg) px-4 py-5"
        >
          <p className="text-[11px] tracking-[0.2em] text-(--muted) uppercase">
            {metric.label}
          </p>
          <p className="mt-2 text-2xl font-medium text-(--primary)">{metric.value}</p>
        </div>
      ))}
    </section>
  );
}
