import type { ServiceItem } from "./types";

type ServicesSectionProps = {
  items: ServiceItem[];
};

export function ServicesSection({ items }: ServicesSectionProps) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {items.map((service) => (
        <article
          key={service.title}
          className="section-item group rounded-3xl border border-(--primary)/16 bg-(--surface) p-6 transition duration-300 hover:-translate-y-1 hover:border-(--primary)/40"
        >
          <h2 className="text-lg font-medium">{service.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {service.detail}
          </p>
          <div className="mt-6 h-px w-0 bg-(--primary) transition-all duration-300 group-hover:w-full" />
        </article>
      ))}
    </section>
  );
}
