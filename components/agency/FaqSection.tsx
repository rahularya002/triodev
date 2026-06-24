"use client";

import { useState } from "react";
import type { FaqItem } from "./types";

type FaqSectionProps = {
  items: FaqItem[];
};

export function FaqSection({ items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="space-y-8">
      <div className="section-item max-w-2xl">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">FAQs</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Questions, answered</h2>
        <p className="mt-3 text-sm leading-relaxed text-(--muted)">
          The things people usually ask before working with us. Still curious?
          Reach out and we will be happy to help.
        </p>
      </div>

      <div className="section-item mx-auto grid w-full gap-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-(--primary)/16 bg-(--surface) transition hover:border-(--primary)/35"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <span className="text-base font-medium md:text-lg">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-(--primary)/30 text-(--primary) transition-transform duration-300",
                    isOpen ? "rotate-45" : "rotate-0",
                  ].join(" ")}
                >
                  +
                </span>
              </button>
              <div
                className={[
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-(--muted) md:px-6 md:pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
