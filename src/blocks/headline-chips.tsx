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

function chipStyle(color: ChipColor = "muted", tone: ChipTone = "subtle") {
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

export interface HeadlineChipsProps {
  /** `string` = texte simple ; objet = segment typé (pill/avatar/image/icon). */
  segments?: (string | HeadlineSegment)[]
  align?: "left" | "center"
  size?: "md" | "lg" | "xl"
  className?: string
}

const SIZE_CLASSES: Record<NonNullable<HeadlineChipsProps["size"]>, string> = {
  md: "text-2xl sm:text-4xl md:text-5xl",
  lg: "text-3xl sm:text-5xl md:text-6xl",
  xl: "text-4xl sm:text-6xl md:text-7xl",
}

const DEMO_SEGMENTS: HeadlineSegment[] = [
  { type: "pill", value: "Talk to", color: "secondary" },
  { type: "avatar", src: "https://placehold.co/128x128.png", alt: "", color: "blue" },
  { type: "pill", value: "verified", color: "green" },
  { type: "icon", icon: CheckIcon, color: "purple" },
  { type: "text", value: "shoppers near you", className: "font-extrabold" },
  { type: "image", src: "https://placehold.co/160x96.png", alt: "", color: "orange" },
]

// Petite icône check inline (évite une dépendance lucide pour ce seul usage).
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function HeadlineChips({
  segments,
  align = "center",
  size = "xl",
  className,
}: HeadlineChipsProps) {
  const resolved =
    segments && segments.length > 0 ? segments : DEMO_SEGMENTS

  return (
    <section className={cn("bg-background py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          className={cn(
            "mx-auto max-w-5xl text-balance font-extrabold leading-[1.08] tracking-tight text-foreground",
            SIZE_CLASSES[size],
            align === "center" ? "text-center" : "text-left"
          )}
        >
          {resolved.map((segment, index) => {
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
        </h2>
      </div>
    </section>
  )
}
