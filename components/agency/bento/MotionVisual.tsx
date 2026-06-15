"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MotionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubble1Ref = useRef<HTMLDivElement>(null);
  const bubble2Ref = useRef<HTMLDivElement>(null);
  const bubble3Ref = useRef<HTMLDivElement>(null);
  
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    // Floating continuous animation
    gsap.to(bubble1Ref.current, {
      y: "-=15",
      x: "+=8",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    gsap.to(bubble2Ref.current, {
      y: "+=12",
      x: "-=10",
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.5,
    });

    gsap.to(bubble3Ref.current, {
      y: "-=8",
      x: "-=8",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.2,
    });
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setDragOffset({ x: dx, y: dy });
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Parallax shifting
    gsap.to(bubble1Ref.current, {
      x: x * 0.15,
      y: y * 0.15 - 10,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.to(bubble2Ref.current, {
      x: x * -0.1 - 20,
      y: y * -0.1 + 15,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(bubble3Ref.current, {
      x: x * 0.05 + 40,
      y: y * 0.05 + 30,
      duration: 0.7,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    gsap.to([bubble1Ref.current, bubble2Ref.current, bubble3Ref.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const startDrag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    const endDrag = () => {
      if (isDragging) {
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
        // Elastic rebound
        gsap.fromTo(
          bubble1Ref.current,
          { x: dragOffset.x, y: dragOffset.y },
          { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" }
        );
      }
    };

    window.addEventListener("mouseup", endDrag);
    return () => window.removeEventListener("mouseup", endDrag);
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-full w-full select-none items-center justify-center overflow-hidden rounded-2xl bg-(--bg) p-4 transition-all duration-500 cursor-pointer"
    >
      {/* Visual Canvas */}
      <div className="relative h-44 w-full max-w-sm overflow-hidden rounded-xl border border-(--primary)/10 bg-(--surface)/30 backdrop-blur-sm">
        {/* Floating instruction */}
        <div className="absolute left-3 top-3 z-10 pointer-events-none">
          <p className="text-[8px] uppercase tracking-[0.2em] text-(--muted)">Spring Field</p>
          <p className="text-[7px] text-(--primary) mt-0.5 font-mono">Hover to shift, drag primary node</p>
        </div>

        {/* Bubble 3 (Accent Small) */}
        <div
          ref={bubble3Ref}
          className="absolute left-[55%] top-[20%] h-10 w-10 rounded-full border border-(--primary)/20 bg-(--primary)/5 backdrop-blur-md transition-all will-change-transform pointer-events-none"
        />

        {/* Bubble 2 (Secondary Medium) */}
        <div
          ref={bubble2Ref}
          className="absolute left-[15%] top-[40%] h-14 w-14 rounded-full border border-(--primary)/25 bg-(--surface)/70 backdrop-blur-[2px] transition-all will-change-transform pointer-events-none"
        />

        {/* Bubble 1 (Primary Draggable Node) */}
        <div
          ref={bubble1Ref}
          onMouseDown={startDrag}
          style={{
            transform: isDragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : undefined,
          }}
          className={`absolute left-[40%] top-[30%] h-16 w-16 cursor-grab active:cursor-grabbing rounded-full border border-(--primary)/40 bg-gradient-to-tr from-(--primary)/90 to-(--primary)/50 flex flex-col items-center justify-center text-center text-white shadow-lg shadow-(--primary)/25 hover:border-white/40 transition-shadow will-change-transform ${
            isDragging ? "shadow-2xl shadow-(--primary)/50 scale-105 active:scale-100" : ""
          }`}
        >
          <svg className="h-4 w-4 text-(--surface) animate-bounce mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
          <span className="text-[8px] font-bold text-(--surface) tracking-wider uppercase leading-none select-none">
            DRAG
          </span>
        </div>

        {/* Center Grid Lines */}
        <div className="absolute inset-0 pointer-events-none border border-dashed border-(--primary)/5 m-8 rounded-lg" />
      </div>
    </div>
  );
}
