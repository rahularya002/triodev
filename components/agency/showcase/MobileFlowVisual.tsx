"use client";

import { useState } from "react";

type FlowStep = "product" | "checkout" | "success";

export default function MobileFlowVisual() {
  const [step, setStep] = useState<FlowStep>("product");

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-2 select-none">
      {/* Mobile Phone Mockup */}
      <div className="w-40 rounded-[2.2rem] border border-(--primary)/25 bg-(--bg) p-2.5 shadow-lg border-t-2 border-b-2">
        {/* Dynamic Mobile Screen Container */}
        <div className="relative h-48 w-full overflow-hidden rounded-[1.6rem] bg-(--surface) p-3 flex flex-col justify-between text-[9px] leading-tight border border-(--primary)/5">
          {step === "product" && (
            <div className="flex-1 flex flex-col justify-between animate-[fadeIn_0.3s_ease-out]">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[7px] text-(--muted) uppercase tracking-widest font-mono">Store</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                </div>
                <div className="h-18 rounded-lg bg-(--bg) flex items-center justify-center p-2 border border-(--primary)/5">
                  <svg className="h-8 w-8 text-(--primary)/50 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-(--fg) mt-1.5">Orbit Speaker</h4>
                <p className="text-[7px] text-(--muted) mt-0.5 leading-none">Spatial sound projection system.</p>
              </div>

              <button
                onClick={() => setStep("checkout")}
                className="w-full rounded-full bg-(--primary) py-1.5 font-bold text-center text-(--surface) shadow-sm hover:bg-(--primary)/90 active:scale-95 transition-all mt-1"
              >
                Add to Cart
              </button>
            </div>
          )}

          {step === "checkout" && (
            <div className="flex-1 flex flex-col justify-between animate-[slideUp_0.3s_ease-out]">
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <button onClick={() => setStep("product")} className="text-(--muted) hover:text-(--fg) pr-1 text-xs">
                    ←
                  </button>
                  <span className="font-bold text-(--fg)">Review Order</span>
                </div>
                <div className="space-y-1 bg-(--bg)/40 p-1.5 rounded border border-(--primary)/5">
                  <div className="flex justify-between font-medium">
                    <span>1x Orbit Speaker</span>
                    <span>$129</span>
                  </div>
                  <div className="flex justify-between text-[7px] text-(--muted)">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-(--primary)/10 pt-1 mt-1 flex justify-between font-bold">
                    <span>Total</span>
                    <span>$129</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep("success")}
                className="w-full rounded-full bg-(--primary) py-1.5 font-bold text-center text-(--surface) shadow-sm hover:bg-(--primary)/90 active:scale-95 transition-all mt-1"
              >
                Confirm Payment
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="flex-1 flex flex-col justify-between items-center text-center animate-[scaleIn_0.4s_ease-out] py-1">
              <div className="my-auto flex flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center border border-green-500/20 shadow shadow-green-500/10">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-(--fg)">Payment Success!</h4>
                  <p className="text-[7px] text-(--muted) mt-0.5">Order has been dispatched.</p>
                </div>
              </div>

              <button
                onClick={() => setStep("product")}
                className="w-full rounded-full bg-(--bg) border border-(--primary)/20 py-1 text-[8px] font-bold text-(--muted) hover:text-(--fg) active:scale-95 transition-all"
              >
                Reset Prototype
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
