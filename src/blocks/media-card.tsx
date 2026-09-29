import type { ComponentType } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

export interface MediaCardAction {
  icon?: ComponentType<{ className?: string }>
  label?: string
  href?: string
}

export interface MediaCardProps {
  src: string
  alt: string
  title: string
  description?: string
  price?: string
  priceSuffix?: string
  badge?: string
  action?: MediaCardAction
  href?: string
  aspect?: string
  className?: string
}

/**
 * Carte média : image plein cadre, overlay titre/description/prix en bas,
 * action (icône) en haut-droite. Carte entière cliquable si `href`.
 */
export function MediaCard({
  src,
  alt,
  title,
  description,
  price,
  priceSuffix,
  badge,
  action,
  href,
  aspect = "aspect-[3/4]",
  className,
}: MediaCardProps) {
  const ActionIcon = action?.icon ?? ArrowUpRight

  const inner = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {badge ? (
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
          {badge}
        </span>
      ) : null}

      {action ? (
        <div className="absolute top-3 right-3">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-background/90 text-foreground backdrop-blur hover:bg-background"
            aria-label={action.label ?? title}
            asChild={!!action.href}
          >
            {action.href ? (
              <Link href={action.href}>
                <ActionIcon className="size-4" />
              </Link>
            ) : (
              <ActionIcon className="size-4" />
            )}
          </Button>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <p className="text-lg font-semibold leading-tight">{title}</p>
        {description ? (
          <p className="mt-1 text-sm text-white/80">{description}</p>
        ) : null}
        {price ? (
          <p className="mt-2 text-sm text-white/80">
            <span className="text-lg font-bold text-white">{price}</span>
            {priceSuffix ? ` ${priceSuffix}` : ""}
          </p>
        ) : null}
      </div>
    </>
  )

  const classes = cn(
    "group relative block overflow-hidden rounded-3xl bg-muted",
    aspect,
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    )
  }

  return <div className={classes}>{inner}</div>
}
