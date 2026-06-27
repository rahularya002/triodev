"use client"

import { cn } from "@/lib/utils"

interface FilterOption {
  label: string
  value: string
}

interface FilterBarProps {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function FilterBar({ options, value, onChange, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border",
            value === option.value
              ? "bg-primary text-background border-primary shadow-sm"
              : "bg-surface text-muted border-primary/20 hover:bg-secondary hover:border-primary/45"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
