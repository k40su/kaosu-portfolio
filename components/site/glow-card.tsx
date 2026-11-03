import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        "relative overflow-visible rounded-3xl bg-card/60 backdrop-blur-md",
        className
      )}
    >
      <GlowingEffect
        disabled={false}
        variant="white"
        glow
        spread={36}
        proximity={72}
        inactiveZone={0.01}
        borderWidth={1}
      />
      <CardContent className="relative">{children}</CardContent>
    </Card>
  )
}

export function EntryCard({
  title,
  place,
  period,
  description,
}: {
  title: string
  place: string
  period: string
  description: string
}) {
  return (
    <GlowCard>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{place}</p>
        </div>
        <Badge variant="secondary">{period}</Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </GlowCard>
  )
}
