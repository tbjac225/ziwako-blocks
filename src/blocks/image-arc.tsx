import Image from "next/image"

import { cn } from "@ziwako/ui/utils"

export interface ArcImage {
  src: string
  alt: string
}

export interface ImageArcProps {
  items: ArcImage[]
  /** Amplitude de rotation des extrémités (deg). @default 10 */
  curve?: number
  /** Amplitude du décalage vertical des extrémités (px). @default 48 */
  lift?: number
  /** Nombre d'items visibles au centre sur mobile. @default 3 */
  maxMobile?: number
  /** Classes par image (taille/ratio). */
  itemClassName?: string
  className?: string
}

/**
 * Éventail de portraits : range les images en **arc** (rotation + décalage
 * vertical selon la position, centre plus haut, bords plus bas/tournés).
 * Primitive visuelle — pas de section/padding.
 */
export function ImageArc({
  items,
  curve = 10,
  lift = 48,
  maxMobile = 3,
  itemClassName,
  className,
}: ImageArcProps) {
  const count = items.length
  const mid = (count - 1) / 2

  return (
    <div
      className={cn(
        "flex w-full items-end justify-center overflow-hidden",
        className
      )}
    >
      {items.map((item, index) => {
        const t = mid === 0 ? 0 : (index - mid) / mid // -1 … 1
        const rotate = t * curve
        const translateY = Math.abs(t) ** 2 * lift
        const distance = Math.abs(index - mid)
        const hiddenOnMobile = distance > Math.floor(maxMobile / 2)

        return (
          <div
            key={index}
            style={{
              transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
              zIndex: Math.round(count - distance),
            }}
            className={cn(
              "relative aspect-[3/4] w-24 shrink-0 origin-bottom overflow-hidden rounded-2xl border border-border/50 bg-muted shadow-sm sm:w-32 md:w-40",
              "-ml-4 first:ml-0 sm:-ml-5",
              hiddenOnMobile && "hidden sm:block",
              itemClassName
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 160px, 96px"
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
