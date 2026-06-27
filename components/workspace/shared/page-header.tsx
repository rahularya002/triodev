interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
      <div>
        <span className="text-[10px] tracking-[0.2em] text-primary font-mono uppercase font-bold">
          {eyebrow}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground mt-1">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted mt-2 max-w-xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  )
}
