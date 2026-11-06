import Image from "next/image";
import type { TeamMember } from "./types";

type TeamAvatarProps = {
  member: TeamMember;
};

export function TeamAvatar({ member }: TeamAvatarProps) {
  return (
    <article className="group flex flex-col items-center text-center">
      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border border-(--primary)/25 bg-(--surface) sm:h-44 sm:w-44 lg:h-44 lg:w-44 xl:h-48 xl:w-48">
        {/* Grayscale base layer */}
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 176px, 192px"
          className="object-cover grayscale"
        />
        {/* Color layer fades in on hover — opacity transitions more reliably than filter */}
        <Image
          src={member.image}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 176px, 192px"
          className="team-avatar-color object-cover opacity-0 scale-100 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="mt-3.5 flex flex-col items-center">
        <h3 className="text-sm font-semibold tracking-tight text-(--fg) sm:text-base">
          {member.name}
        </h3>
        <p className="mt-1 max-w-[12rem] text-xs leading-snug text-(--muted)">
          {member.role}
        </p>
      </div>
    </article>
  );
}
