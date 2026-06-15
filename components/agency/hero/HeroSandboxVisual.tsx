"use client";

import { useEffect, useRef, useState } from "react";

type SandboxMode = "wave" | "gravitate";

export default function HeroSandboxVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<SandboxMode>("wave");
  const [speed, setSpeed] = useState(5);
  const [force, setForce] = useState(6);
  const [isVisible, setIsVisible] = useState(true);

  // Keep mouse coordinates
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  // Intersection Observer to pause rendering when component is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }
  }, []);

  // Handle resizing and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Detect mobile viewport for density optimizations
    const isMobile = width < 768;

    // Particles array for gravitating mode - optimized density for mobile
    const particleCount = isMobile ? 22 : 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 1.5 + 1.2,
        color: `rgba(95, 124, 81, ${Math.random() * 0.4 + 0.4})`, // Theme primary
      });
    }

    // Grid spacing for wave mode - wider spacing on mobile to reduce rendering operations by 50%
    const gridSpacing = isMobile ? 26 : 20;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Get colors from CSS variables
      const primaryColor = getComputedStyle(canvas).getPropertyValue("--primary").trim() || "#5f7c51";

      if (mode === "wave") {
        time += (speed * 0.01);

        // Draw interactive grid wave
        for (let x = gridSpacing; x < width; x += gridSpacing) {
          for (let y = gridSpacing; y < height; y += gridSpacing) {
            // Base offset wave calculation
            const distanceToCenter = Math.sqrt((x - width / 2) ** 2 + (y - height / 2) ** 2);
            let waveOffset = Math.sin(distanceToCenter * 0.035 - time) * 7;

            // Interactive hover ripple modifier
            if (mouseRef.current.active) {
              const dx = mouseRef.current.x - x;
              const dy = mouseRef.current.y - y;
              const distToMouse = Math.sqrt(dx * dx + dy * dy);
              if (distToMouse < 90) {
                const ripple = Math.sin(distToMouse * 0.12 - time * 2.5) * (force * 1.5) * (1 - distToMouse / 90);
                waveOffset += ripple;
              }
            }

            // Draw grid points
            ctx.beginPath();
            ctx.arc(x, y + waveOffset, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = primaryColor;
            ctx.globalAlpha = 0.4;
            ctx.fill();

            // Connect neighboring lines in a subtle wire mesh
            if (x > gridSpacing && Math.random() > 0.88) {
              ctx.beginPath();
              ctx.moveTo(x - gridSpacing, y);
              ctx.lineTo(x, y + waveOffset);
              ctx.strokeStyle = primaryColor;
              ctx.globalAlpha = 0.07;
              ctx.stroke();
            }
          }
        }
      } else if (mode === "gravitate") {
        // Run gravitating particle updates
        particles.forEach((p) => {
          if (mouseRef.current.active) {
            // Pull towards mouse cursor
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
              const pullForce = (1 - dist / 130) * (force * 0.035);
              p.vx += (dx / dist) * pullForce;
              p.vy += (dy / dist) * pullForce;
            }
          }

          // Friction
          p.vx *= 0.95;
          p.vy *= 0.95;

          // Velocity caps
          const maxSpeed = speed * 0.7;
          const currSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currSpeed > maxSpeed) {
            p.vx = (p.vx / currSpeed) * maxSpeed;
            p.vy = (p.vy / currSpeed) * maxSpeed;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Screen wrapping
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Draw connections
          particles.forEach((other) => {
            const dx = other.x - p.x;
            const dy = other.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const connectionRange = isMobile ? 45 : 55;
            if (dist < connectionRange) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = primaryColor;
              ctx.globalAlpha = (1 - dist / connectionRange) * 0.12;
              ctx.stroke();
            }
          });

          // Draw Node dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = 0.75;
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [mode, speed, force, isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999, active: false };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || e.touches.length === 0) return;
    mouseRef.current = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
      active: true,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] sm:h-[360px] w-full flex flex-col justify-between rounded-3xl border border-(--primary)/16 bg-(--surface) p-5 sm:p-6 shadow-xl shadow-(--primary)/5 overflow-hidden group select-none"
    >
      {/* Blurred background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-(--primary)/6 blur-[60px]" />
      </div>

      {/* Header controls overlay */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-(--primary) font-mono uppercase font-bold">
            Interactive Product Core
          </span>
          <p className="text-[9px] text-(--muted) mt-0.5 font-mono">
            Hover or drag to direct vector forces
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="flex gap-1 bg-(--primary)/10 p-0.5 rounded-full self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setMode("wave")}
            className={`flex-1 sm:flex-none rounded-full px-2.5 py-0.8 text-[9px] font-bold tracking-wider uppercase transition-all ${
              mode === "wave"
                ? "bg-(--primary) text-(--surface) shadow"
                : "text-(--muted) hover:text-(--fg)"
            }`}
          >
            Wave Grid
          </button>
          <button
            onClick={() => setMode("gravitate")}
            className={`flex-1 sm:flex-none rounded-full px-2.5 py-0.8 text-[9px] font-bold tracking-wider uppercase transition-all ${
              mode === "gravitate"
                ? "bg-(--primary) text-(--surface) shadow"
                : "text-(--muted) hover:text-(--fg)"
            }`}
          >
            Orbiter
          </button>
        </div>
      </div>

      {/* Main interactive Canvas */}
      <div className="relative flex-1 w-full my-3 sm:my-4 rounded-2xl bg-(--bg)/20 border border-(--primary)/10 overflow-hidden shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          className="w-full h-full cursor-crosshair will-change-transform"
        />
      </div>

      {/* Footer customization sliders */}
      <div className="relative z-10 flex gap-4 items-center border-t border-(--primary)/10 pt-3">
        {/* Speed Slider */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-[8px] font-mono text-(--muted) uppercase tracking-wider">
            <span>Flow Speed</span>
            <span>{speed}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-1 bg-(--primary)/15 rounded-lg appearance-none cursor-pointer accent-(--primary)"
          />
        </div>

        {/* Force Slider */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-[8px] font-mono text-(--muted) uppercase tracking-wider">
            <span>Force Pull</span>
            <span>{force}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
            className="w-full h-1 bg-(--primary)/15 rounded-lg appearance-none cursor-pointer accent-(--primary)"
          />
        </div>
      </div>
    </div>
  );
}
