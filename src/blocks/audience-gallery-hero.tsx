import type { ComponentType, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Play } from "lucide-react"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

/** Overlays configurables posés sur une cellule de la galerie. */
export type GalleryOverlay =
  | { type: "badge"; label: string }
  | {
      type: "icon"
      icon: ComponentType<{ className?: string }>
      href?: string
      label?: string
    }
  | { type: "play"; href?: string; label?: string }
  | { type: "stat"; value: string; label: string }
  | { type: "cta"; label: string; href: string }

export interface GalleryItem {
  src: string
  alt: string
  /**
   * Contrôle l'occupation de la cellule : `col-span` / `row-span` / `aspect` /
   * décalage (`translate-*`, `z-*`), sur n'importe quel breakpoint.
   * ex. `"lg:col-span-2 lg:row-span-2"`.
   */
  className?: string
  overlay?: GalleryOverlay
}

export interface AudienceGalleryHeroProps {
  badge?: string
  title: ReactNode
  description?: ReactNode
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Cellules de la galerie. Si vide → grille de placeholders. */
  items?: GalleryItem[]
  /**
   * Nombre de colonnes (sucre). Ignoré si `gridClassName` est fourni.
   * @default 4
   */
  columns?: 2 | 3 | 4 | 5
  /** Template de grille complet (prioritaire). ex. `"grid-cols-3 lg:grid-cols-4"`. */
  gridClassName?: string
  /** Classes de base de chaque cellule (aspect, radius, overflow). */
  itemClassName?: string
  className?: string
}

const COLUMN_CLASSES: Record<2 | 3 | 4 | 5, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-5",
}

const DEMO_ITEMS: GalleryItem[] = [
  {
    src: "https://placehold.co/600x900.png",
    alt: "",
    className: "lg:row-span-2",
    overlay: { type: "icon", icon: ArrowUpRight, label: "Ouvrir" },
  },
  { src: "https://placehold.co/900x600.png", alt: "", className: "lg:col-span-2" },
  {
    src: "https://placehold.co/600x600.png",
    alt: "",
    overlay: { type: "badge", label: "LIVE" },
  },
  { src: "https://placehold.co/600x600.png", alt: "", overlay: { type: "play" } },
  {
    src: "https://placehold.co/600x600.png",
    alt: "",
    overlay: { type: "stat", value: "20+", label: "Growing Community" },
  },
  {
    src: "https://placehold.co/900x600.png",
    alt: "",
    className: "lg:col-span-2",
    overlay: { type: "cta", label: "View Product", href: "#" },
  },
]

export function AudienceGalleryHero({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  items,
  columns = 4,
  gridClassName,
  itemClassName,
  className,
}: AudienceGalleryHeroProps) {
  const resolvedItems = items && items.length > 0 ? items : DEMO_ITEMS
  const useFallback = !items || items.length === 0

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {badge ? (
            <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {badge}
            </span>
          ) : null}
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta ? (
                <Button size="lg" className="rounded-2xl px-6" asChild>
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl px-6"
                  asChild
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          )}
        </div>

        <div
          className={cn(
            "mt-12 grid gap-3 md:mt-16 md:gap-4",
            gridClassName ?? COLUMN_CLASSES[columns]
          )}
        >
          {useFallback
            ? Array.from({ length: 8 }).map((_, i) => (
                <GalleryCell key={i} className={itemClassName}>
                  <div className="h-full w-full bg-muted" />
                </GalleryCell>
              ))
            : resolvedItems.map((item, i) => (
                <GalleryCell
                  key={i}
                  className={cn(itemClassName, item.className)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                  {item.overlay ? <GalleryOverlayView overlay={item.overlay} /> : null}
                </GalleryCell>
              ))}
        </div>
      </div>
    </section>
  )
}

function GalleryCell({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-3xl bg-muted",
        className
      )}
    >
      {children}
    </div>
  )
}

function GalleryOverlayView({ overlay }: { overlay: GalleryOverlay }) {
  switch (overlay.type) {
    case "badge":
      return (
        <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-red-solid px-3 py-1 text-xs font-semibold text-red-contrast">
          {overlay.label}
        </span>
      )
    case "icon": {
      const Icon = overlay.icon
      const button = (
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-background/90 backdrop-blur"
          aria-label={overlay.label ?? "Open"}
          asChild={!!overlay.href}
        >
          {overlay.href ? (
            <Link href={overlay.href}>
              <Icon className="size-4" />
            </Link>
          ) : (
            <Icon className="size-4" />
          )}
        </Button>
      )
      return <div className="absolute top-3 right-3">{button}</div>
    }
    case "play": {
      const play = (
        <span className="flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur">
          <Play className="size-5 fill-current" />
        </span>
      )
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          {overlay.href ? (
            <Link href={overlay.href} aria-label={overlay.label ?? "Play"}>
              {play}
            </Link>
          ) : (
            play
          )}
        </div>
      )
    }
    case "stat":
      return (
        <div className="absolute bottom-3 left-3 rounded-2xl bg-primary px-4 py-3 text-primary-foreground">
          <div className="text-2xl font-bold leading-none">{overlay.value}</div>
          <div className="mt-1 text-xs font-medium opacity-90">
            {overlay.label}
          </div>
        </div>
      )
    case "cta":
      return (
        <Button
          size="sm"
          className="absolute bottom-3 left-3 rounded-full"
          asChild
        >
          <Link href={overlay.href}>
            {overlay.label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      )
    default:
      return null
  }
}
