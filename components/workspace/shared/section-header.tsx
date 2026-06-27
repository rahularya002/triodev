interface SectionHeaderProps {
  title: string
  action?: React.ReactNode
  icon?: React.ReactNode
  count?: number
}

export function SectionHeader({ title, action, icon, count }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted font-mono flex items-center gap-2">
        {icon}
        {title}
        {count !== undefined && (
          <span className="bg-primary/10 text-primary text-[9px] font-mono py-0.5 px-2 rounded-full font-bold">
            {count}
          </span>
        )}
      </h3>
      {action}
    </div>
  )
}
