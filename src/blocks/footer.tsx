import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { cn } from "@ziwako/ui/utils"

export interface FooterLink {
  name: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocial {
  name: string
  href: string
  icon: LucideIcon
}

export interface FooterProps {
  columns: FooterColumn[]
  socials?: FooterSocial[]
  brand?: string
  copyright?: string
  className?: string
}

export function Footer({
  columns,
  socials = [],
  brand = "Ziwako",
  copyright,
  className,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={cn("border-t border-border bg-card", className)}>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-semibold text-foreground">
                {brand}
              </Link>
              <p className="text-sm text-muted-foreground">
                {copyright ?? `© ${year} ${brand}. Tous droits réservés.`}
              </p>
            </div>

            {socials.length > 0 ? (
              <div className="flex items-center space-x-6">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{social.name}</span>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
