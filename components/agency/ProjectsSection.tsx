type ProjectsSectionProps = {
  items: string[];
};

export function ProjectsSection({ items }: ProjectsSectionProps) {
  return (
    <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="section-item rounded-3xl border border-(--primary)/16 bg-(--surface) p-7">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">
          Why Triodev
        </p>
        <p className="mt-4 text-2xl leading-tight">
          Built like a studio.
          <br />
          Operated like a product squad.
        </p>
      </div>
      <div className="space-y-3">
        {items.map((project, index) => (
          <div
            key={project}
            className="section-item rounded-2xl border border-transparent bg-(--surface) p-5 transition duration-300 hover:border-(--primary)/35"
          >
            <p className="text-xs tracking-[0.16em] text-(--muted) uppercase">
              0{index + 1}
            </p>
            <p className="mt-2 text-lg">{project}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
