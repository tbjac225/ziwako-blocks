import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { cn } from "@ziwako/ui/utils"

export interface FeatureItem {
  title: string
  description: string
  icon?: LucideIcon
  href?: string
  linkLabel?: string
  gradient?: string
}

export interface FeaturesProps {
  heading?: string
  description?: string
  items: FeatureItem[]
  className?: string
}

export function Features({
  heading,
  description,
  items,
  className,
}: FeaturesProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-white px-6 py-20 sm:py-28 dark:bg-card",
        className
      )}
    >
      <div className="w-full grow sm:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg)">
        {heading ? (
          <h2 className="mx-auto text-center text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-[2.75rem]/[1.2]">
            {heading}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-3 text-pretty text-center text-lg tracking-[-0.01em] text-muted-foreground sm:text-2xl">
            {description}
          </p>
        ) : null}
        <div className="mt-18 grid w-full gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                className="group flex w-full flex-col text-start"
                key={feature.title}
              >
                <div
                  className={cn(
                    "relative mb-5 flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br sm:mb-6 dark:opacity-90",
                    feature.gradient ?? "from-primary/20 to-primary/5"
                  )}
                >
                  {Icon ? (
                    <Icon className="h-16 w-16 text-primary opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60" />
                  ) : null}
                </div>
                <div className="px-1">
                  <span className="text-[22px] font-medium tracking-[-0.015em] text-foreground">
                    {feature.title}
                  </span>
                  <p className="mt-1 max-w-[25ch] text-[17px] text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.href && feature.linkLabel ? (
                    <Link
                      href={feature.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {feature.linkLabel}
                      <span className="text-lg leading-none">&rarr;</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
