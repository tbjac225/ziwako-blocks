import Link from "next/link"
import Image from "next/image"

import { cn } from "@ziwako/ui/utils"

export interface LogoProps {
  href?: string
  src?: string
  alt?: string
  wordmark?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({
  href = "/",
  src = "/ziwako.svg",
  alt = "Ziwako",
  wordmark,
  width = 100,
  height = 32,
  className,
  priority,
}: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-2", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-8 w-auto"
        priority={priority}
      />
      {wordmark ? (
        <span className="text-xl font-bold text-foreground">{wordmark}</span>
      ) : null}
    </Link>
  )
}
