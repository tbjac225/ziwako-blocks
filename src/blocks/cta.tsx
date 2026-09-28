import Link from "next/link"
import Image from "next/image"

import { Button } from "@ziwako/ui/button"
import { cn } from "@ziwako/ui/utils"

export interface CtaProps {
  heading?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function Cta({
  heading = "Tous vos services et compétences, dans votre poche.",
  primaryButtonText = "Télécharger l'app",
  primaryButtonHref = "/telechargement",
  secondaryButtonText = "Découvrir les produits",
  secondaryButtonHref = "/produits",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  imageAlt = "App",
  className,
}: CtaProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="bg-muted flex w-full flex-col gap-16 overflow-hidden rounded-2xl p-8 md:rounded-3xl lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-extrabold md:mb-4 md:text-6xl lg:mb-6">
              {heading}
            </h3>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-lg text-white hover:from-orange-600 hover:to-orange-700"
              >
                <Link href={primaryButtonHref}>{primaryButtonText}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 rounded-full border-border px-8 py-6 text-lg text-foreground hover:bg-card"
              >
                <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
              </Button>
            </div>
          </div>
          <div className="shrink-0">
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <div className="relative h-70 w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-violet-100 sm:h-80 sm:w-80 md:h-64 md:w-64 dark:from-blue-900/40 dark:to-violet-900/40">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  className="object-cover"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
