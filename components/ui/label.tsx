import * as React from "react"
import { cn } from "@/lib/utils"

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-bold font-mono tracking-[0.15em] uppercase text-muted",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
