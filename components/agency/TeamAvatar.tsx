"use client";

import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
import type { TeamMember } from "./types";

type TeamAvatarProps = {
  member: TeamMember;
};

export function TeamAvatar({ member }: TeamAvatarProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const playHover = () => {
    if (prefersReducedMotion) return;

    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline()
      .to(
        photoRef.current,
        {
          scale: 1.08,
          filter: "blur(7px)",
          duration: 0.5,
          ease: "power2.out",
        },
        0
      )
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
        0
      )
      .fromTo(
        nameRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        0.08
      )
      .fromTo(
        roleRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        0.16
      );
  };

  const playLeave = () => {
    if (prefersReducedMotion) return;

    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline()
      .to([nameRef.current, roleRef.current], {
        y: 10,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        stagger: 0.04,
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0.05
      )
      .to(
        photoRef.current,
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 0.45,
          ease: "power2.out",
        },
        0.1
      );
  };

  return (
    <article className="group flex flex-col items-center text-center">
      <button
        ref={buttonRef}
        type="button"
        aria-label={`${member.name}, ${member.role}`}
        onMouseEnter={playHover}
        onMouseLeave={playLeave}
        onFocus={playHover}
        onBlur={playLeave}
        className="relative flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full border border-(--primary)/25 bg-(--surface) text-center transition-[border-color,box-shadow] duration-300 hover:border-(--primary)/50 hover:shadow-[0_24px_48px_-28px_rgba(20,28,18,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary)/60 sm:h-44 sm:w-44 lg:h-44 lg:w-44 xl:h-48 xl:w-48"
      >
        <div
          ref={photoRef}
          className="absolute inset-0 origin-center will-change-transform motion-reduce:transition-[filter,transform] motion-reduce:duration-300 motion-reduce:group-hover:scale-105 motion-reduce:group-focus-visible:scale-105"
          style={{ filter: "blur(0px)" }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 176px, 192px"
            className="object-cover"
          />
        </div>

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-full bg-(--primary)/90 px-4 opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100"
        >
          <span
            ref={nameRef}
            className="text-sm font-semibold leading-tight text-[#f6f4ed] sm:text-base opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100"
          >
            {member.name}
          </span>
          <span
            ref={roleRef}
            className="mt-2 max-w-[10rem] text-[10px] leading-snug tracking-[0.1em] text-[#f6f4ed]/90 uppercase sm:text-[11px] opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100"
          >
            {member.role}
          </span>
        </div>
      </button>

      <div className="mt-3.5 flex flex-col items-center">
        <h3 className="text-sm font-semibold tracking-tight text-(--fg) sm:text-base">
          {member.name}
        </h3>
        <p className="mt-1 max-w-[12rem] text-xs text-(--muted) leading-snug">
          {member.role}
        </p>
      </div>
    </article>
  );
}
