"use client";

import type { CSSProperties } from "react";
import { useRef, useState, useEffect } from "react";
import { BackgroundArt } from "../components/agency/BackgroundArt";
import { ClosingCta } from "../components/agency/ClosingCta";
import { ContactFormSection } from "../components/agency/ContactFormSection";
import { FaqSection } from "../components/agency/FaqSection";
import { Footer } from "../components/agency/Footer";
import { Header } from "../components/agency/Header";
import { HeroSection } from "../components/agency/HeroSection";
import { MetricsStrip } from "../components/agency/MetricsStrip";
import { OurWorkSection } from "../components/agency/OurWorkSection";
import { ProcessSection } from "../components/agency/ProcessSection";
import { ServicesBentoGrid } from "../components/agency/ServicesBentoGrid";
import { TeamSection } from "../components/agency/TeamSection";
import { TrustSection } from "../components/agency/TrustSection";
import { VisualShowcase } from "../components/agency/VisualShowcase";
import {
  faqs,
  metrics,
  palettes,
  processSteps,
  teamMembers,
  trustPoints,
  workItems,
  services,
} from "../components/agency/data";
import { useAgencyAnimations } from "../components/agency/hooks/useAgencyAnimations";
import { useSmoothScroll } from "../components/agency/hooks/useSmoothScroll";
import type { ThemeMode } from "../components/agency/types";

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const pageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const lenis = useSmoothScroll();

  useAgencyAnimations({ pageRef, ctaRef, lenis });

  // Sync with HTML class applied by layout.tsx script
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const palette = palettes[theme];
  const darkMode = theme === "dark";
  const onThemeToggle = () => {
    const root = document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setTheme(newTheme);
  };
  const onStartProject = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={pageRef}
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
        <Header />

        <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 pb-20 md:px-10">
          <HeroSection ctaRef={ctaRef} onStartProject={onStartProject} />
          <MetricsStrip items={metrics} />
          <OurWorkSection items={workItems} />
          <VisualShowcase />
          <ServicesBentoGrid items={services} />
          <ProcessSection steps={processSteps} />
          <TrustSection items={trustPoints} />
          <TeamSection members={teamMembers} />
          <ContactFormSection />
          <FaqSection items={faqs} />
          <ClosingCta onStartProject={onStartProject} />
        </main>

        <Footer darkMode={darkMode} onThemeToggle={onThemeToggle} />
      </div>
  );
}
