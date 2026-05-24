type FooterProps = {
  darkMode: boolean;
  onThemeToggle: () => void;
};

export function Footer({ darkMode, onThemeToggle }: FooterProps) {
  return (
    <footer className="mx-auto mt-4 w-full max-w-7xl px-6 pb-8 md:px-10">
      <div className="footer-item flex items-center justify-between rounded-3xl border border-(--primary)/20 bg-(--surface) px-5 py-4">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">
          triodev - design x development studio
        </p>
        <button
          type="button"
          onClick={onThemeToggle}
          className="rounded-full border border-(--primary)/35 px-4 py-2 text-xs tracking-[0.2em] uppercase transition hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/60"
        >
          {darkMode ? "Light" : "Dark"} mode
        </button>
      </div>
    </footer>
  );
}
