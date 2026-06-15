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

      <div className="section-item grid grid-cols-2 place-items-center gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0 xl:gap-x-12">
        {members.map((member) => (
          <TeamAvatar key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
