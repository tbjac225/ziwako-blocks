import type { ReactNode } from "react"

import { cn } from "@ziwako/ui/utils"

export interface BentoCell {
  /** SLOT — n'importe quel composant (carte, image, graphique, formulaire…). */
  content: ReactNode
  /**
   * Occupation de la cellule : `col-span` / `row-span` / `aspect` / `translate`,
   * sur n'importe quel breakpoint. ex. `"lg:col-span-2 lg:row-span-2"`.
   */
  className?: string
}

export interface BentoGridProps {
  cells: BentoCell[]
  /**
   * Nombre de colonnes (sucre). Ignoré si `gridClassName` est fourni.
   * @default 3
   */
  columns?: 2 | 3 | 4 | 5 | 6
  /** Template de grille complet (prioritaire). ex. `"grid-cols-2 lg:grid-cols-3"`. */
  gridClassName?: string
  /** Classes de base de chaque cellule. */
  itemClassName?: string
  className?: string
}

const COLUMNS: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-6",
}

/**
 * Primitive de mise en page « bento » : grille responsive dont **chaque cellule
 * est un slot** (n'importe quel composant) avec occupation configurable.
 * Le block ne rend que la grille — envelopper avec `Section` au besoin.
 */
export function BentoGrid({
  cells,
  columns = 3,
  gridClassName,
  itemClassName,
  className,
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid items-stretch gap-4",
        gridClassName ?? COLUMNS[columns],
        className
      )}
    >
      {cells.map((cell, index) => (
        <div
          key={index}
          className={cn("h-full min-w-0", itemClassName, cell.className)}
        >
          {cell.content}
        </div>
      ))}
    </div>
  )
}
