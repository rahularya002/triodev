import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 md:px-10">
      <div className="flex items-center gap-2.5">
        <Logo className="h-6 w-auto text-(--primary)" />
        <span className="text-sm font-semibold tracking-[0.2em] text-(--primary) uppercase font-mono">
          triodev
        </span>
        <span className="hidden text-[10px] tracking-[0.18em] text-(--muted) uppercase sm:inline">
          / Product Engineering Studio
        </span>
      </div>
      <a
        href="#contact"
        className="rounded-full border border-(--primary)/35 bg-(--surface) px-4 py-2 text-xs tracking-[0.2em] uppercase transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/60"
      >
        Book a call
      </a>
    </header>
  );
}
