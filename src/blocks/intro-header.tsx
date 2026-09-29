import type { ReactNode } from "react"
import Link from "next/link"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

import { HeadlineChipsText, type HeadlineSegment } from "./headline-chips-text"

export interface IntroHeaderProps {
  badge?: string
  /** Titre rich : `ReactNode` ou segments (`headline-chips` → chips/highlight). */
  title: ReactNode | (string | HeadlineSegment)[]
  description?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  align?: "center" | "left"
  size?: "md" | "lg" | "xl"
  className?: string
}

const SIZE_CLASSES: Record<NonNullable<IntroHeaderProps["size"]>, string> = {
  md: "text-2xl sm:text-3xl md:text-4xl",
  lg: "text-3xl sm:text-4xl md:text-5xl",
  xl: "text-4xl sm:text-5xl md:text-6xl",
}

/**
 * En-tête d'introduction de section : badge, titre rich (chips/highlight),
 * description et double CTA. Centré ou aligné à gauche.
 */
export function IntroHeader({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  align = "center",
  size = "lg",
  className,
}: IntroHeaderProps) {
  const isCenter = align === "center"

  return (
    <div
      className={cn(
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left",
        className
      )}
    >
      {badge ? (
        <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {badge}
        </span>
      ) : null}

      <h2
        className={cn(
          "mt-4 text-balance font-extrabold tracking-tight text-foreground",
          SIZE_CLASSES[size]
        )}
      >
        {Array.isArray(title) ? (
          <HeadlineChipsText segments={title} />
        ) : (
          title
        )}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground",
            isCenter && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}

      {primaryCta || secondaryCta ? (
        <div
          className={cn(
            "mt-8 flex flex-col gap-3 sm:flex-row",
            isCenter ? "items-center justify-center" : "items-start"
          )}
        >
          {primaryCta ? (
            <Button className="rounded-2xl px-6" asChild>
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button variant="outline" className="rounded-2xl px-6" asChild>
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
