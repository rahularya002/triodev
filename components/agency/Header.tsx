export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 md:px-10">
      <div className="hero-chip text-xs tracking-[0.24em] text-(--primary) uppercase">
        triodev agency
      </div>
      <a
        href="#contact"
        className="rounded-full border border-(--primary)/35 bg-(--surface) px-4 py-2 text-xs tracking-[0.2em] uppercase transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/60"
      >
        Contact
      </a>
    </header>
  );
}
