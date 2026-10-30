import { Logo } from "./Logo";
import Link from "next/link";

type FooterProps = {
  darkMode: boolean;
  onThemeToggle: () => void;
};

export function Footer({ darkMode, onThemeToggle }: FooterProps) {
  return (
    <footer className="relative z-10 mx-auto mt-4 w-full max-w-7xl px-6 pb-8 md:px-10">
      <div className="footer-item flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-(--primary)/20 bg-(--surface) px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Logo className="h-5 w-auto text-(--muted)" />
          <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">
            triodev - design x development studio
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <nav aria-label="Legal" className="flex gap-4 text-xs text-(--muted)">
            <Link href="/privacy-policy" className="hover:text-(--primary)">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-(--primary)">Terms</Link>
          </nav>
          <button
            type="button"
            onClick={onThemeToggle}
            className="rounded-full border border-(--primary)/35 px-4 py-2 text-xs tracking-[0.2em] uppercase transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/60"
          >
            {darkMode ? "Light" : "Dark"} mode
          </button>
        </div>
      </div>
    </footer>
  );
}
