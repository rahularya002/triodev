import Image from "next/image";
import type { WorkItem } from "./types";

type ProjectCardProps = {
  item: WorkItem;
  index: number;
};

export function ProjectCard({ item, index }: ProjectCardProps) {
  return (
    <article className="section-item group flex h-full flex-col overflow-hidden rounded-3xl border border-(--primary)/16 bg-(--surface)">
      <div className="relative h-52 overflow-hidden bg-(--bg)">
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3">
          <span className="rounded-full border border-(--primary)/20 bg-(--surface)/90 px-3 py-1 text-[10px] tracking-[0.2em] text-(--muted) uppercase backdrop-blur-sm">
            {item.category}
          </span>
          <span className="rounded-full bg-(--surface)/90 px-2 py-1 text-xs text-(--muted) backdrop-blur-sm">
            0{index + 1}
          </span>
        </div>

        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover object-top transition duration-500 group-hover:scale-105 group-hover:blur-sm"
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#141c12]/35 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-[#f6f4ed] px-6 py-3 text-xs font-medium tracking-[0.16em] text-[#141c12] uppercase opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Visit Site
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-medium">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-(--muted)">{item.summary}</p>
        <p className="mt-3 text-xs tracking-[0.12em] text-(--primary) uppercase">{item.impact}</p>
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
  );
}
