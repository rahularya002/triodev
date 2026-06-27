import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2",
        {
          "border-transparent bg-primary text-background shadow-sm":
            variant === "default",
          "border-transparent bg-background text-foreground":
            variant === "secondary",
          "border-transparent bg-red-500 text-white shadow-sm":
            variant === "destructive",
          "border-transparent bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400":
            variant === "success",
          "border-transparent bg-amber-500/15 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400":
            variant === "warning",
          "text-foreground border-border": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
