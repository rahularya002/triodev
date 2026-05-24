const bars = [72, 45, 88, 59, 67];

export function VisualShowcase() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="section-item rounded-3xl border border-(--primary)/16 bg-(--surface) p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-(--primary)/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-(--primary)/35" />
            <span className="h-2.5 w-2.5 rounded-full bg-(--primary)/18" />
          </div>
          <p className="text-[10px] tracking-[0.2em] text-(--muted) uppercase">
            Product Canvas
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl bg-(--bg) p-4">
            <div className="mb-3 h-2 w-24 rounded-full bg-(--primary)/35" />
            <div className="h-40 rounded-xl bg-(--primary)/20" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="h-12 rounded-lg bg-(--primary)/15" />
              <div className="h-12 rounded-lg bg-(--primary)/10" />
              <div className="h-12 rounded-lg bg-(--primary)/20" />
            </div>
          </div>
          <div className="rounded-2xl bg-(--bg) p-4">
            <div className="mb-3 h-2 w-20 rounded-full bg-(--primary)/30" />
            <div className="space-y-2">
              {bars.map((bar, index) => (
                <div key={index} className="h-6 rounded-md bg-(--primary)/10 px-1.5 py-1">
                  <div
                    className="h-full rounded-sm bg-(--primary)/45"
                    style={{ width: `${bar}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-item grid gap-4">
        <div className="rounded-3xl border border-(--primary)/16 bg-(--surface) p-5">
          <p className="text-[11px] tracking-[0.2em] text-(--muted) uppercase">Mobile Flow</p>
          <div className="mt-4 mx-auto w-44 rounded-[2rem] border border-(--primary)/25 bg-(--bg) p-3">
            <div className="h-2 w-14 rounded-full bg-(--primary)/30" />
            <div className="mt-3 h-20 rounded-xl bg-(--primary)/18" />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg bg-(--primary)/14" />
              <div className="h-10 rounded-lg bg-(--primary)/14" />
            </div>
            <div className="mt-2 h-7 rounded-full bg-(--primary)/50" />
          </div>
        </div>
        <div className="rounded-3xl bg-(--primary) p-5 text-[#f6f4ed]">
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-80">Motion Principle</p>
          <p className="mt-3 text-sm leading-relaxed opacity-95">
            Every transition serves hierarchy: reveal, focus, then action.
            Nothing decorative without purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
