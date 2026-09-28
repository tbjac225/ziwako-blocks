import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

import {
  HeadlineChipsText,
  chipStyle,
  type ChipColor,
  type ChipTone,
  type HeadlineSegment,
} from "./headline-chips-text"

export type SplitHeroVariant = "card" | "tinted" | "solid"
export type SplitHeroSide = "left" | "right"
export type FloaterPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

export type SplitHeroFloater =
  | {
      type: "chip"
      label: string
      color?: ChipColor
      tone?: ChipTone
      position?: FloaterPosition
    }
  | {
      type: "image"
      src: string
      alt?: string
      width?: number
      height?: number
      className?: string
      position?: FloaterPosition
    }

export interface SplitHeroProps {
  variant?: SplitHeroVariant
  /** Côté du panneau média. @default "right" */
  mediaSide?: SplitHeroSide
  /** SLOT — panneau contenu (n'importe quel composant). */
  content: ReactNode
  /** SLOT — panneau média (image, mockup, illustration…). */
  media: ReactNode
  contentClassName?: string
  mediaClassName?: string
  className?: string
}

const VARIANT_OUTER: Record<SplitHeroVariant, string> = {
  card: "bg-foreground py-12 md:py-16",
  tinted: "bg-background py-12 md:py-16",
  solid: "bg-background",
}

const VARIANT_GRID: Record<SplitHeroVariant, string> = {
  card: "mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8",
  tinted:
    "mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-border lg:grid-cols-2",
  solid: "grid lg:grid-cols-2",
}

const PANEL_RADIUS: Record<SplitHeroVariant, string> = {
  card: "rounded-3xl",
  tinted: "",
  solid: "",
}

const CONTENT_BG: Record<SplitHeroVariant, string> = {
  card: "bg-background",
  tinted: "bg-muted",
  solid: "bg-card",
}

const MEDIA_BG: Record<SplitHeroVariant, string> = {
  card: "bg-muted",
  tinted: "bg-primary",
  solid: "bg-secondary",
}

export function SplitHero({
  variant = "tinted",
  mediaSide = "right",
  content,
  media,
  contentClassName,
  mediaClassName,
  className,
}: SplitHeroProps) {
  const contentPanel = (
    <div
      className={cn(
        "flex flex-col justify-center overflow-hidden p-8 md:p-12",
        PANEL_RADIUS[variant],
        CONTENT_BG[variant],
        contentClassName
      )}
    >
      {content}
    </div>
  )

  const mediaPanel = (
    <div
      className={cn(
        "relative flex min-h-[320px] items-center justify-center overflow-hidden p-6 md:p-10",
        PANEL_RADIUS[variant],
        MEDIA_BG[variant],
        mediaClassName
      )}
    >
      {media}
    </div>
  )

  return (
    <section className={cn(VARIANT_OUTER[variant], className)}>
      <div className={VARIANT_GRID[variant]}>
        {mediaSide === "left" ? (
          <>
            {mediaPanel}
            {contentPanel}
          </>
        ) : (
          <>
            {contentPanel}
            {mediaPanel}
          </>
        )}
      </div>
    </section>
  )
}

export interface SplitHeroContentProps {
  eyebrow?: string
  /** Titre rich — réutilise les segments de `headline-chips`. */
  title?: (string | HeadlineSegment)[]
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
  /** Contenu additionnel (preuve sociale, illustrations…). */
  children?: ReactNode
}

export function SplitHeroContent({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
  children,
}: SplitHeroContentProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {eyebrow ? (
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {eyebrow}
        </span>
      ) : null}
      {title ? (
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          <HeadlineChipsText segments={title} />
        </h2>
      ) : null}
      {subtitle ? (
        <p className="max-w-md text-lg text-muted-foreground">{subtitle}</p>
      ) : null}
      {primaryCta || secondaryCta ? (
        <div className="flex flex-wrap gap-3">
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
      {children}
    </div>
  )
}

const FLOATER_POS: Record<FloaterPosition, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
}

export interface SplitHeroMediaProps {
  floaters?: SplitHeroFloater[]
  className?: string
  /** Média libre (mockup, image, vidéo…). */
  children: ReactNode
}

export function SplitHeroMedia({
  floaters,
  className,
  children,
}: SplitHeroMediaProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative z-10 flex w-full items-center justify-center">
        {children}
      </div>
      {floaters?.map((floater, index) => {
        const position = floater.position ?? "top-right"
        if (floater.type === "chip") {
          return (
            <span
              key={index}
              className={cn(
                "absolute z-20 inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium shadow-sm",
                FLOATER_POS[position],
                chipStyle(floater.color, floater.tone)
              )}
            >
              {floater.label}
            </span>
          )
        }
        return (
          <Image
            key={index}
            src={floater.src}
            alt={floater.alt ?? ""}
            width={floater.width ?? 96}
            height={floater.height ?? 96}
            className={cn("absolute z-20", FLOATER_POS[position], floater.className)}
          />
        )
      })}
    </div>
  )
}
