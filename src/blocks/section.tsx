import type { ReactNode } from "react"

import { cn } from "@ziwako/ui/utils"

export interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  containerClassName?: string
}

export function Section({
  children,
  id,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-12", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
