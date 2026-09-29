import type { ComponentType } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

import { HeadlineChipsText, type HeadlineSegment } from "./headline-chips-text"

export interface EditorialImage {
  src: string
  alt?: string
}

export interface EditorialStripProps {
  eyebrow?: string
  statement: (string | HeadlineSegment)[]
  images: EditorialImage[]
  note?: string
  cta?: { label: string; href: string }
  iconAction?: {
    icon?: ComponentType<{ className?: string }>
    href?: string
    label?: string
  }
  className?: string
}

/**
 * Preset « Experience » : eyebrow, statement (chips/highlight), bande d'images
 * puis ligne d'action (note + CTA + bouton icône).
 */
export function EditorialStrip({
  eyebrow,
  statement,
  images,
  note,
  cta,
  iconAction,
  className,
}: EditorialStripProps) {
  const Icon = iconAction?.icon ?? ArrowUpRight

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,180px)_1fr] lg:gap-12">
          {eyebrow ? (
            <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {eyebrow}
            </span>
          ) : (
            <span />
          )}
          <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-foreground text-balance sm:text-3xl md:text-4xl">
            <HeadlineChipsText segments={statement} />
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted"
            >
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {note || cta || iconAction ? (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-sm text-muted-foreground">{note}</p>
            <div className="flex items-center gap-3">
              {cta ? (
                <Button className="rounded-full px-5" asChild>
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ) : null}
              {iconAction ? (
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  aria-label={iconAction.label ?? "Action"}
                  asChild={!!iconAction.href}
                >
                  {iconAction.href ? (
                    <Link href={iconAction.href}>
                      <Icon className="size-4" />
                    </Link>
                  ) : (
                    <Icon className="size-4" />
                  )}
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
