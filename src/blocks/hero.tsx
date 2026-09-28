import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

export interface HeroCta {
  label: string
  href: string
  external?: boolean
}

export interface HeroStoreBadge {
  href: string
  imageSrc: string
  imageAlt?: string
  width?: number
  height?: number
}

export interface HeroProps {
  title: ReactNode
  titleHighlight?: ReactNode
  subtitle?: ReactNode
  primaryCta?: HeroCta
  storeBadge?: HeroStoreBadge
  className?: string
}

export function Hero({
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  storeBadge,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] w-full flex-col items-center justify-center gap-16 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-white px-6 py-16 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-background",
        className
      )}
    >
      <div className="max-w-4xl text-center">
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
          {title}
          {titleHighlight ? (
            <>
              {" "}
              <span className="text-orange-solid">{titleHighlight}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <h2 className="mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-foreground/80 md:text-3xl">
            {subtitle}
          </h2>
        ) : null}
        {(storeBadge || primaryCta) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            {storeBadge ? (
              <Link
                href={storeBadge.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={storeBadge.imageSrc}
                  alt={storeBadge.imageAlt ?? "Get it on Google Play"}
                  width={storeBadge.width ?? 230}
                  height={storeBadge.height ?? 100}
                />
              </Link>
            ) : null}
            {primaryCta ? (
              <Button
                size="lg"
                className="h-16 bg-orange-solid px-8 py-6 text-base hover:bg-orange-700"
                asChild
              >
                <Link
                  href={primaryCta.href}
                  target={primaryCta.external ? "_blank" : undefined}
                  rel={primaryCta.external ? "noopener noreferrer" : undefined}
                  className="text-xl font-bold"
                >
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
