import type { ReactNode } from "react"

import { cn } from "@ziwako/ui/utils"

import { IntroHeader } from "./intro-header"
import { MediaCard, type MediaCardProps } from "./media-card"
import { type HeadlineSegment } from "./headline-chips-text"

export interface ToursShowcaseProps {
  eyebrow?: string
  title: ReactNode | (string | HeadlineSegment)[]
  /** Actions à droite du titre (boutons). */
  actions?: ReactNode
  tours: MediaCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

const COLUMNS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
}

/**
 * Preset « Our Tours » : en-tête (titre gauche + actions droite) puis grille de
 * `media-card`.
 */
export function ToursShowcase({
  eyebrow,
  title,
  actions,
  tours,
  columns = 4,
  className,
}: ToursShowcaseProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntroHeader
          badge={eyebrow}
          title={title}
          actions={actions}
          layout="split"
          align="left"
          size="lg"
        />
        <div className={cn("mt-10 grid gap-4", COLUMNS[columns])}>
          {tours.map((tour, index) => (
            <MediaCard key={index} {...tour} />
          ))}
        </div>
      </div>
    </section>
  )
}
