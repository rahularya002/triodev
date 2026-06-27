import type { ProcessStep } from "./types";

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  return (
    <section className="space-y-5">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">How we work</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">What happens after you hire us</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--muted)">
          A clear path from first conversation to a live product - and a partner
          who stays with you after launch.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="section-item rounded-3xl border border-(--primary)/16 bg-(--surface) p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--primary) text-xs font-medium text-[#f6f4ed]">
                0{index + 1}
              </span>
              <span className="h-px flex-1 bg-(--primary)/20 ml-4" />
            </div>
            <h3 className="text-xl font-medium">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-(--muted)">{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
