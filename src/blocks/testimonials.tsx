"use client"

import { useEffect, useState } from "react"
import { StarIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@ziwako/ui/avatar"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ziwako/ui/carousel"
import { cn } from "@ziwako/ui/utils"

export interface Testimonial {
  id?: string | number
  name: string
  designation?: string
  company?: string
  testimonial: string
  avatar?: string
}

export interface TestimonialsProps {
  heading?: string
  subheading?: string
  items: Testimonial[]
  className?: string
}

export function Testimonials({
  heading,
  subheading,
  items,
  className,
}: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center px-6 py-12",
        className
      )}
    >
      <div className="w-full">
        {heading ? (
          <h2 className="text-center text-5xl font-semibold tracking-[-0.03em]">
            {heading}
          </h2>
        ) : null}
        {subheading ? (
          <p className="mt-3 text-center text-xl text-muted-foreground">
            {subheading}
          </p>
        ) : null}
        <div className="container mx-auto mt-14 w-full px-12 lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl)">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {items.map((testimonial, index) => (
                <CarouselItem key={testimonial.id ?? index}>
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={cn("h-3.5 w-3.5 rounded-full border-2", {
                  "bg-primary border-primary": current === index + 1,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mb-8 rounded-xl bg-accent px-6 py-8 sm:py-6">
      <div className="flex items-center justify-between gap-20">
        <div className="relative hidden aspect-3/4 w-full max-w-[18rem] shrink-0 rounded-xl bg-muted-foreground/20 lg:block" />
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between gap-1">
            <div className="hidden items-center gap-4 sm:flex md:hidden">
              <Avatar className="h-8 w-8 md:h-10 md:w-10">
                {testimonial.avatar ? (
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                ) : null}
                <AvatarFallback className="bg-primary text-xl font-medium text-primary-foreground">
                  {testimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.designation}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="h-5 w-5 fill-muted-foreground stroke-muted-foreground"
                />
              ))}
            </div>
          </div>
          <p className="mt-6 text-lg font-semibold leading-normal tracking-tight sm:text-2xl lg:text-[1.75rem] xl:text-3xl">
            {testimonial.testimonial}
          </p>
          <div className="mt-6 flex items-center gap-4 sm:hidden md:flex">
            <Avatar>
              {testimonial.avatar ? (
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              ) : null}
              <AvatarFallback className="bg-primary text-xl font-medium text-primary-foreground">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
