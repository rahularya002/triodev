import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
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
        {items.slice(0, 3).map((item, index) => (
          <ProjectCard key={item.title} item={item} index={index} />
        ))}
      </div>
      <div className="section-item flex justify-center pt-2">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-(--primary)/35 bg-(--surface) px-7 py-3 text-xs font-medium tracking-[0.16em] text-(--fg) uppercase transition hover:border-(--primary)/55 hover:bg-(--primary) hover:text-[#f6f4ed]"
        >
          View More Projects
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
