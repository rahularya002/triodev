import type { ServiceItem } from "./types";

type ServicesBentoGridProps = {
  items: ServiceItem[];
};

export function ServicesBentoGrid({ items }: ServicesBentoGridProps) {
  const desktopSpans = [
    "lg:col-span-8 lg:row-span-2",
    "lg:col-span-4 lg:row-span-1",
    "lg:col-span-4 lg:row-span-1",
    "lg:col-span-6 lg:row-span-1",
    "lg:col-span-3 lg:row-span-1",
    "lg:col-span-3 lg:row-span-1",
  ];

  return (
    <section className="space-y-5">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Services</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Design and development stack</h2>
      </div>

      <div className="grid auto-rows-[minmax(230px,auto)] gap-4 lg:auto-rows-[minmax(210px,auto)] lg:grid-cols-12">
      {items.map((service, index) => {
        const sizeClass = desktopSpans[index] ?? "lg:col-span-4 lg:row-span-1";
        const isFeatured = index === 0;

        return (
          <article
            key={service.title}
            className={[
              "section-item group h-full overflow-hidden rounded-3xl border border-(--primary)/16 bg-(--surface) p-6 transition duration-300 hover:-translate-y-1 hover:border-(--primary)/40",
              sizeClass,
            ].join(" ")}
          >
            <div className="flex h-full flex-col">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.2em] text-(--muted) uppercase">
                  {service.tag ?? "Service"}
                </span>
                <span className="h-2 w-2 rounded-full bg-(--primary)/50" />
              </div>
              <h3 className="text-xl font-medium">{service.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-(--muted)">
                {service.detail}
              </p>
              {service.outcome ? (
                <p className="mt-3 text-xs tracking-[0.08em] text-(--primary)">
                  Outcome: {service.outcome}
                </p>
              ) : null}

              <div
                className={[
                  "mt-auto rounded-2xl bg-(--bg) p-3",
                  isFeatured ? "min-h-32" : "min-h-24",
                ].join(" ")}
              >
                <div className="h-2 w-20 rounded-full bg-(--primary)/35" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-10 rounded-md bg-(--primary)/20" />
                  <div className="h-10 rounded-md bg-(--primary)/14" />
                  <div className="h-10 rounded-md bg-(--primary)/28" />
                </div>
                {isFeatured ? (
                  <div className="mt-2 h-4 rounded-full bg-(--primary)/18" />
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
      </div>
    </section>
  );
}
