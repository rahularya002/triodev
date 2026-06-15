type ClosingCtaProps = {
  onStartProject: () => void;
};

export function ClosingCta({ onStartProject }: ClosingCtaProps) {
  return (
    <section className="section-item rounded-3xl border border-(--primary)/20 bg-(--primary) px-6 py-10 text-[#f6f4ed] md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-2">
          <p className="text-xs tracking-[0.2em] uppercase opacity-80">Ready when you are</p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Let us turn your product vision into a polished webapp.
          </h2>
          <p className="text-sm leading-relaxed opacity-90">
            Share your goals and timeline. We will respond within 24 hours with a
            clear project approach.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartProject}
          className="w-fit shrink-0 rounded-full border border-[#f6f4ed]/30 bg-[#f6f4ed] px-7 py-3 text-sm font-medium tracking-[0.14em] text-(--primary) uppercase transition hover:brightness-95"
        >
          Start a Project
        </button>
      </div>
    </section>
  );
}
