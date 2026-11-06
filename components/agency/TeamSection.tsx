"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TeamAvatar } from "./TeamAvatar";
import type { TeamMember } from "./types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TeamSectionProps = {
  members: TeamMember[];
};

export function TeamSection({ members }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const avatars = gsap.utils.toArray<HTMLElement>(".team-avatar");
      if (!avatars.length) return;

      if (reducedMotion) {
        gsap.set(avatars, { opacity: 1, x: 0, y: 0, scale: 1 });
        return;
      }

      // Tech Lead settles first; Head of Operations slides in beside them;
      // remaining members cascade in after.
      gsap.set(avatars, { opacity: 0, y: 28, scale: 0.94 });
      gsap.set(avatars[1], { x: -36, y: 12, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(avatars[0], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      }).to(
        avatars[1],
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
        },
        "-=0.35"
      );

      if (avatars.length > 2) {
        tl.to(
          avatars.slice(2),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef, dependencies: [members] }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="team-heading"
      className="space-y-10"
    >
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Our Team</p>
        <h2 id="team-heading" className="mt-2 text-3xl font-semibold tracking-tight">
          People behind Triodev
        </h2>
      </div>

      <div className="section-item flex flex-wrap items-start justify-center gap-8 sm:gap-10 lg:gap-8 xl:gap-10">
        {members.map((member) => (
          <div key={member.name} className="team-avatar">
            <TeamAvatar member={member} />
          </div>
        ))}
      </div>
    </section>
  );
}
