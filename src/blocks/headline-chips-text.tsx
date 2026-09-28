import type { ComponentType } from "react"
import Image from "next/image"

import { cn } from "@ziwako/ui/utils"

export type ChipColor =
  | "primary"
  | "secondary"
  | "blue"
  | "orange"
  | "green"
  | "amber"
  | "red"
  | "purple"
  | "pink"
  | "teal"
  | "violet"
  | "yellow"
  | "muted"

export type ChipTone = "subtle" | "solid"

/** Pattern A — fond clair + texte foncé. */
const CHIP_SUBTLE: Record<ChipColor, string> = {
  primary: "bg-blue-subtle text-blue-fg",
  secondary: "bg-orange-subtle text-orange-fg",
  blue: "bg-blue-subtle text-blue-fg",
  orange: "bg-orange-subtle text-orange-fg",
  green: "bg-green-subtle text-green-fg",
  amber: "bg-amber-subtle text-amber-fg",
  red: "bg-red-subtle text-red-fg",
  purple: "bg-purple-subtle text-purple-fg",
  pink: "bg-pink-subtle text-pink-fg",
  teal: "bg-teal-subtle text-teal-fg",
  violet: "bg-violet-subtle text-violet-fg",
  yellow: "bg-yellow-subtle text-yellow-fg",
  muted: "bg-muted text-foreground",
}

/** Pattern B — fond vif + texte contraste. */
const CHIP_SOLID: Record<ChipColor, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  blue: "bg-blue-solid text-blue-contrast",
  orange: "bg-orange-solid text-orange-contrast",
  green: "bg-green-solid text-green-contrast",
  amber: "bg-amber-solid text-amber-contrast",
  red: "bg-red-solid text-red-contrast",
  purple: "bg-purple-solid text-purple-contrast",
  pink: "bg-pink-solid text-pink-contrast",
  teal: "bg-teal-solid text-teal-contrast",
  violet: "bg-violet-solid text-violet-contrast",
  yellow: "bg-yellow-solid text-yellow-contrast",
  muted: "bg-muted-foreground text-background",
}

export function chipStyle(color: ChipColor = "muted", tone: ChipTone = "subtle") {
  return (tone === "solid" ? CHIP_SOLID : CHIP_SUBTLE)[color]
}

interface SegmentBase {
  color?: ChipColor
  tone?: ChipTone
}

export type HeadlineSegment =
  | { type: "text"; value: string; className?: string }
  | ({ type: "pill"; value: string } & SegmentBase)
  | ({ type: "avatar"; src: string; alt?: string } & SegmentBase)
  | ({ type: "image"; src: string; alt?: string; className?: string } & SegmentBase)
  | ({ type: "icon"; icon: ComponentType<{ className?: string }> } & SegmentBase)

export interface HeadlineChipsTextProps {
  segments: (string | HeadlineSegment)[]
  className?: string
}

/**
 * Rendu inline des segments de titre (texte + chips). À placer dans un
 * `<h1>`/`<h2>`/`<p>` — hérite de la typographie du parent.
 */
export function HeadlineChipsText({ segments, className }: HeadlineChipsTextProps) {
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        const seg: HeadlineSegment =
          typeof segment === "string"
            ? { type: "text", value: segment }
            : segment

        switch (seg.type) {
          case "text":
            return (
              <span key={index} className={seg.className}>
                {seg.value}{" "}
              </span>
            )
          case "pill":
            return (
              <span
                key={index}
                className={cn(
                  "mx-1 inline-flex items-center rounded-full px-[0.6em] py-[0.05em] align-middle text-[0.8em]",
                  chipStyle(seg.color, seg.tone)
                )}
              >
                {seg.value}
              </span>
            )
          case "avatar":
            return (
              <span
                key={index}
                className={cn(
                  "mx-1 inline-block size-[1.3em] overflow-hidden rounded-full align-middle",
                  chipStyle(seg.color, seg.tone)
                )}
              >
                <Image
                  src={seg.src}
                  alt={seg.alt ?? ""}
                  width={128}
                  height={128}
                  className="size-full object-cover"
                />
              </span>
            )
          case "image":
            return (
              <span
                key={index}
                className={cn(
                  "mx-1 inline-block h-[1.3em] w-[2.1em] overflow-hidden rounded-full align-middle",
                  chipStyle(seg.color, seg.tone),
                  seg.className
                )}
              >
                <Image
                  src={seg.src}
                  alt={seg.alt ?? ""}
                  width={160}
                  height={96}
                  className="size-full object-cover"
                />
              </span>
            )
          case "icon": {
            const Icon = seg.icon
            return (
              <span
                key={index}
                className={cn(
                  "mx-1 inline-flex size-[1.3em] items-center justify-center rounded-full align-middle",
                  chipStyle(seg.color, seg.tone)
                )}
              >
                <Icon className="size-[0.7em]" />
              </span>
            )
          }
          default:
            return null
        }
      })}
    </span>
  )
}
