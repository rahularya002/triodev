import { TeamAvatar } from "./TeamAvatar";
import type { TeamMember } from "./types";

type TeamSectionProps = {
  members: TeamMember[];
};

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="space-y-10">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Our Team</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">People behind Triodev</h2>
      </div>

      <div className="section-item flex flex-wrap items-start justify-center gap-8 sm:gap-10 lg:gap-8 xl:gap-10">
        {members.map((member) => (
          <TeamAvatar key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
