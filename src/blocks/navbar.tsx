"use client"

import type { ComponentProps, ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"

import { Button } from "@ziwako/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@ziwako/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@ziwako/ui/navigation-menu"
import { cn } from "@ziwako/ui/utils"

import { ThemeToggle } from "./theme-toggle"

export interface NavbarDropdownItem {
  title: string
  description?: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavbarItem {
  label: string
  href?: string
  items?: NavbarDropdownItem[]
}

export interface NavbarProps {
  logo?: ReactNode
  items?: NavbarItem[]
  cta?: { label: string; href: string }
  showThemeToggle?: boolean
  className?: string
  sticky?: boolean
}

export function Navbar({
  logo,
  items = [],
  cta,
  showThemeToggle = true,
  className,
  sticky = true,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "z-50 h-16 w-full border-b bg-white/80 backdrop-blur-xl dark:bg-[#0f172a]/80",
        sticky && "fixed top-0 left-0 right-0",
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          {logo}
          <NavbarMenu className="hidden md:block" items={items} />
        </div>

        <div className="flex items-center gap-3">
          {showThemeToggle ? <ThemeToggle className="rounded-2xl" /> : null}
          {cta ? (
            <Button className="rounded-2xl bg-orange-solid" asChild>
              <Link href={cta.href}>
                {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : null}
          <div className="md:hidden">
            <NavbarSheet logo={logo} items={items} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavbarMenu({
  items,
  ...props
}: ComponentProps<typeof NavigationMenu> & { items: NavbarItem[] }) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-1 space-x-0 text-sm">
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 rounded-3xl p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.items.map((child) => (
                    <li key={child.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={child.href}
                          className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          {child.icon ? (
                            <child.icon className="mb-4 size-6" />
                          ) : null}
                          <div className="text-sm font-semibold leading-none">
                            {child.title}
                          </div>
                          {child.description ? (
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {child.description}
                            </p>
                          ) : null}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              <Button variant="ghost" asChild>
                <Link href={item.href ?? "#"}>{item.label}</Link>
              </Button>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function NavbarSheet({ logo, items }: { logo?: ReactNode; items: NavbarItem[] }) {
  return (
    <Sheet>
      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        {logo}
        <div className="mt-12 space-y-4 text-base">
          {items.map((item) => (
            <div key={item.label}>
              {item.href ? (
                <Link href={item.href} className="inline-block">
                  {item.label}
                </Link>
              ) : (
                <div className="font-bold">{item.label}</div>
              )}
              {item.items && item.items.length > 0 ? (
                <ul className="mt-2 ml-1 space-y-3 border-l pl-4">
                  {item.items.map((child) => (
                    <li key={child.title}>
                      <Link
                        href={child.href}
                        className="flex items-center gap-2"
                      >
                        {child.icon ? (
                          <child.icon className="mr-2 h-5 w-5 text-muted-foreground" />
                        ) : null}
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
