import type { ServiceItem } from "./types";
import BrandIdentityVisual from "./bento/BrandIdentityVisual";
import DashboardVisual from "./bento/DashboardVisual";
import EngineeringVisual from "./bento/EngineeringVisual";
import MotionVisual from "./bento/MotionVisual";
import ConversionVisual from "./bento/ConversionVisual";
import DesignOpsVisual from "./bento/DesignOpsVisual";

type ServicesBentoGridProps = {
  items: ServiceItem[];
};

export function ServicesBentoGrid({ items }: ServicesBentoGridProps) {
  const desktopSpans = [
    "lg:col-span-8 lg:row-span-2", // Index 0: Digital Identity (Brand)
    "lg:col-span-4 lg:row-span-1", // Index 1: Web App Design (UX/UI)
    "lg:col-span-4 lg:row-span-1", // Index 2: Engineering (Build)
    "lg:col-span-6 lg:row-span-1", // Index 3: Motion Systems (GSAP)
    "lg:col-span-3 lg:row-span-1", // Index 4: Conversion Optimization (Growth)
    "lg:col-span-3 lg:row-span-1", // Index 5: Design Ops (System)
  ];

  const renderVisual = (index: number) => {
    switch (index) {
      case 0:
        return <BrandIdentityVisual />;
      case 1:
        return <DashboardVisual />;
      case 2:
        return <EngineeringVisual />;
      case 3:
        return <MotionVisual />;
      case 4:
        return <ConversionVisual />;
      case 5:
        return <DesignOpsVisual />;
      default:
        return null;
    }
  };

  return (
    <section className="space-y-8 py-12">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase font-mono font-semibold">What we build</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
          Software that solves real business problems
        </h2>
        <p className="mt-3 text-sm text-(--muted) max-w-xl">
          Whether you're launching an MVP, modernizing operations, or scaling a SaaS product, we build the software that gets you there.
        </p>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[minmax(380px,auto)] lg:auto-rows-[minmax(330px,auto)]">
        {items.map((service, index) => {
          const sizeClass = desktopSpans[index] ?? "lg:col-span-4 lg:row-span-1";
          const isFeatured = index === 0;
          const isWide = index === 3;

          return (
            <article
              key={service.title}
              className={[
                "section-item group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-(--primary)/16 bg-(--surface) p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/40 hover:shadow-lg hover:shadow-(--primary)/5",
                sizeClass,
              ].join(" ")}
            >
              {/* Card background blurred accents */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-(--primary)/8 blur-[60px]" />
                <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-(--primary)/5 blur-[60px]" />
              </div>

              {/* Main Card Content Layout */}
              {isFeatured ? (
                <div className="relative z-10 flex h-full flex-col lg:flex-row gap-6 justify-between">
                  <div className="flex flex-col justify-between flex-1 max-w-sm">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-[10px] tracking-[0.2em] text-(--primary) font-mono uppercase font-bold">
                          {service.tag ?? "Service"}
                        </span>
                        <span className="h-2 w-2 rounded-full bg-(--primary) animate-pulse" />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-(--muted)">
                        {service.detail}
                      </p>
                    </div>

                    {service.outcome && (
                      <div className="mt-6 border-t border-(--primary)/15 pt-4">
                        <p className="text-[9px] font-mono uppercase tracking-widest text-(--muted)">Expected Outcome</p>
                        <p className="mt-1 text-sm font-medium text-(--primary)">
                          {service.outcome}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side visual panel */}
                  <div className="w-full lg:w-3/5 h-64 lg:h-auto flex items-center justify-center rounded-2xl overflow-hidden bg-(--bg)/20 border border-(--primary)/10 shadow-inner">
                    {renderVisual(index)}
                  </div>
                </div>
              ) : isWide ? (
                <div className="relative z-10 flex h-full flex-col md:flex-row gap-6 justify-between w-full">
                  <div className="flex flex-col justify-between flex-1 max-w-sm">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-[10px] tracking-[0.2em] text-(--primary) font-mono uppercase font-bold">
                          {service.tag ?? "Service"}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-(--primary)/50" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-(--muted)">
                        {service.detail}
                      </p>
                    </div>

                    {service.outcome && (
                      <div className="mt-4 border-t border-(--primary)/10 pt-3">
                        <p className="text-[8px] font-mono uppercase tracking-widest text-(--muted)">Outcome</p>
                        <p className="mt-0.5 text-xs font-medium text-(--primary)">
                          {service.outcome}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right/Bottom side visual panel */}
                  <div className="w-full md:w-1/2 h-44 md:h-auto flex items-center justify-center rounded-2xl overflow-hidden bg-(--bg)/20 border border-(--primary)/10 shadow-inner">
                    {renderVisual(index)}
                  </div>
                </div>
              ) : (
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.2em] text-(--primary) font-mono uppercase font-bold">
                        {service.tag ?? "Service"}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-(--primary)/50" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">{service.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-(--muted) max-w-md">
                      {service.detail}
                    </p>
                    {service.outcome && (
                      <p className="mt-2 text-[10px] tracking-[0.04em] text-(--primary) font-medium">
                        Outcome: {service.outcome}
                      </p>
                    )}
                  </div>

                  {/* Bottom visual widget */}
                  <div className="mt-4 h-40 w-full flex items-center justify-center rounded-2xl overflow-hidden bg-(--bg)/20 border border-(--primary)/10 shadow-inner">
                    {renderVisual(index)}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
