"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { BackgroundArt } from "../../components/agency/BackgroundArt";
import { Footer } from "../../components/agency/Footer";
import { ProjectCard } from "../../components/agency/ProjectCard";
import { palettes, workItems } from "../../components/agency/data";
import type { ThemeMode } from "../../components/agency/types";

export default function WorkPage() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const palette = palettes[theme];
  const darkMode = theme === "dark";
  const onThemeToggle = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div
      style={
        {
          "--bg": palette.background,
          "--surface": palette.surface,
          "--fg": palette.foreground,
          "--muted": palette.muted,
          "--primary": palette.primary,
        } as CSSProperties
      }
      className="relative min-h-screen overflow-x-clip bg-(--bg) text-(--fg) transition-colors duration-500"
    >
      <BackgroundArt />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 md:px-10">
        <Link
          href="/"
          className="text-xs tracking-[0.24em] text-(--primary) uppercase"
        >
          triodev agency
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-(--primary)/35 bg-(--surface) px-4 py-2 text-xs tracking-[0.2em] uppercase transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/60"
        >
          <span aria-hidden="true">&larr;</span>
          Back home
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-20 md:px-10">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">All Projects</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            Work that ships and performs
          </h1>
          <p className="mt-4 text-base leading-relaxed text-(--muted)">
            A growing collection of products, platforms, and creative builds from the
            Triodev studio. Hover any project to visit it live.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item, index) => (
            <ProjectCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </main>

      <Footer darkMode={darkMode} onThemeToggle={onThemeToggle} />
    </div>
  );
}
