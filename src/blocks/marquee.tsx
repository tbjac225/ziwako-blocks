import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@ziwako/ui/utils"

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /** Reverse the animation direction. @default false */
  reverse?: boolean
  /** Pause the animation on hover. @default false */
  pauseOnHover?: boolean
  /** Animate vertically instead of horizontally. @default false */
  vertical?: boolean
  /** Number of times to repeat the content. @default 4 */
  repeat?: number
  children: ReactNode
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <>
      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(calc(-100% - var(--gap))); }
          }
          @keyframes marquee-vertical {
            from { transform: translateY(0); }
            to { transform: translateY(calc(-100% - var(--gap))); }
          }
          .animate-marquee { animation: marquee var(--duration) linear infinite; }
          .animate-marquee-vertical { animation: marquee-vertical var(--duration) linear infinite; }
          .animate-reverse { animation-direction: reverse !important; }
          .pause-on-hover:hover .animate-marquee,
          .pause-on-hover:hover .animate-marquee-vertical { animation-play-state: paused !important; }
        `}
      </style>
      <div
        {...props}
        className={cn(
          "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
            "pause-on-hover": pauseOnHover,
          },
          className
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 justify-around gap-(--gap)", {
                "animate-marquee flex-row": !vertical,
                "animate-marquee-vertical flex-col": vertical,
                "animate-reverse": reverse,
              })}
            >
              {children}
            </div>
          ))}
      </div>
    </>
  )
}
