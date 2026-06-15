import ProductCanvasVisual from "./showcase/ProductCanvasVisual";
import MobileFlowVisual from "./showcase/MobileFlowVisual";
import MotionPrincipleVisual from "./showcase/MotionPrincipleVisual";

export function VisualShowcase() {
  return (
    <section className="space-y-6 py-12">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase font-mono font-semibold">Studio Craft</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
          Design systems that ship with confidence
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-(--muted)">
          We prototype interaction patterns early, validate flows with real
          users, and translate the result into production-ready components your
          team can scale.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        
        {/* Left Card: Product Canvas */}
        <div className="section-item group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-(--primary)/16 bg-(--surface) p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/40 hover:shadow-lg hover:shadow-(--primary)/5">
          {/* Card background blurred accents */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-(--primary)/6 blur-[60px]" />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.2em] text-(--primary) font-mono uppercase font-bold">
                Product Canvas
              </p>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-(--primary)/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-(--primary)/20" />
              </div>
            </div>
            
            <p className="text-sm font-medium text-(--fg) leading-relaxed">
              Design layouts in high-fidelity directly in browser preview, compiling clean code configurations.
            </p>

            <div className="mt-2">
              <ProductCanvasVisual />
            </div>
          </div>
        </div>

        {/* Right Stack: Mobile Flow & Motion Principle */}
        <div className="section-item grid gap-5">
          
          {/* Top Stack: Mobile Flow */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-(--primary)/16 bg-(--surface) p-6 transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/40 hover:shadow-lg hover:shadow-(--primary)/5">
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute -left-8 -bottom-8 h-40 w-40 rounded-full bg-(--primary)/6 blur-[60px]" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-5 items-center justify-between">
              <div className="flex flex-col justify-between max-w-[170px] self-start md:self-auto gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-(--primary) font-mono uppercase font-bold">
                    Mobile Flow
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-(--muted)">
                    Validate interaction triggers and navigation flow states before code handoff.
                  </p>
                </div>
                
                <div className="text-[8px] font-mono text-(--muted) uppercase tracking-wider">
                  Status: <span className="text-green-600 font-bold">Interactive</span>
                </div>
              </div>

              {/* Mobile screen container */}
              <div className="w-full md:w-auto flex items-center justify-center">
                <MobileFlowVisual />
              </div>
            </div>
          </div>

          {/* Bottom Stack: Motion Principle */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-(--primary) p-6 text-[#f6f4ed] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-(--primary)/10">
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/20 blur-[50px]" />
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-80 font-mono font-semibold">Motion Principle</p>
                <p className="mt-2.5 text-sm leading-relaxed opacity-95">
                  Every transition serves hierarchy: reveal, focus, then action. Nothing decorative without purpose.
                </p>
              </div>

              <div className="mt-1">
                <MotionPrincipleVisual />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
