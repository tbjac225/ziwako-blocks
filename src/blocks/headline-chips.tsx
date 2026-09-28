import { cn } from "@ziwako/ui/utils"

import {
  HeadlineChipsText,
  type HeadlineSegment,
} from "./headline-chips-text"

export {
  HeadlineChipsText,
  type ChipColor,
  type ChipTone,
  type HeadlineSegment,
} from "./headline-chips-text"

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

const DEMO_SEGMENTS: HeadlineSegment[] = [
  { type: "pill", value: "Talk to", color: "secondary" },
  { type: "avatar", src: "https://placehold.co/128x128.png", alt: "", color: "blue" },
  { type: "pill", value: "verified", color: "green" },
  { type: "icon", icon: CheckIcon, color: "purple" },
  { type: "text", value: "shoppers near you", className: "font-extrabold" },
  { type: "image", src: "https://placehold.co/160x96.png", alt: "", color: "orange" },
]

export function HeadlineChips({
  segments,
  align = "center",
  size = "xl",
  className,
}: HeadlineChipsProps) {
  const resolved = segments && segments.length > 0 ? segments : DEMO_SEGMENTS

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
          <HeadlineChipsText segments={resolved} />
        </h2>
      </div>
    </section>
  )
}
