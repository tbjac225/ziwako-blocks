import { cn } from "@ziwako/ui/utils"

export interface StatItem {
  value: string
  label: string
  description?: string
}

export interface StatsProps {
  heading?: string
  description?: string
  items: StatItem[]
  className?: string
}

export function Stats({ heading, description, items, className }: StatsProps) {
  return (
    <div className={cn("bg-background py-20", className)}>
      <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6 py-12 xl:px-0">
        {heading ? (
          <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-[2.75rem]">
            {heading}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-4.5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        ) : null}
        <div className="mt-16 grid justify-center gap-x-10 gap-y-16 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.value}>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-5xl font-medium tracking-tight text-transparent md:text-6xl">
                {item.value}
              </span>
              <p className="mt-6 text-xl font-medium text-foreground">
                {item.label}
              </p>
              {item.description ? (
                <p className="mt-2 text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
