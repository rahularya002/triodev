import type { TeamMember } from "./types";

type TeamSectionProps = {
  members: TeamMember[];
};

export function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="space-y-5">
      <div className="section-item">
        <p className="text-xs tracking-[0.2em] text-(--muted) uppercase">Our Team</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">People behind Triodev</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <article
            key={member.name}
            className="section-item rounded-3xl border border-(--primary)/16 bg-(--surface) p-5"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-(--primary) text-sm font-semibold text-[#f6f4ed]">
              {member.initials}
            </div>
            <h3 className="text-lg font-medium">{member.name}</h3>
            <p className="mt-1 text-xs tracking-[0.14em] text-(--muted) uppercase">{member.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-(--muted)">{member.specialty}</p>
            <div className="mt-4 h-px bg-(--primary)/18" />
            <div className="mt-4 flex gap-2">
              <span className="h-2 w-2 rounded-full bg-(--primary)/40" />
              <span className="h-2 w-2 rounded-full bg-(--primary)/24" />
              <span className="h-2 w-2 rounded-full bg-(--primary)/18" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
