import type { ReactNode } from "react"

import { cn } from "@ziwako/ui/utils"

import { IntroHeader } from "./intro-header"
import { VideoEmbed, type VideoEmbedProps } from "./video-embed"
import { type HeadlineSegment } from "./headline-chips-text"

export interface VideoFeatureProps {
  eyebrow?: string
  title: ReactNode | (string | HeadlineSegment)[]
  /** Note courte affichée à droite du titre. */
  note?: string
  video: VideoEmbedProps
  className?: string
}

/**
 * Preset « Video Tour » : eyebrow + titre (gauche) + note (droite) puis vidéo.
 */
export function VideoFeature({
  eyebrow,
  title,
  note,
  video,
  className,
}: VideoFeatureProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <IntroHeader
          badge={eyebrow}
          title={title}
          actions={
            note ? (
              <p className="max-w-xs text-sm text-muted-foreground">{note}</p>
            ) : undefined
          }
          layout="split"
          align="left"
          size="lg"
        />
        <VideoEmbed {...video} className="mt-10" />
      </div>
    </section>
  )
}
