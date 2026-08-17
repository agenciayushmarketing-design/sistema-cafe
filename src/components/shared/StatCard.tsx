import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  sub?: string
  icon: LucideIcon
  tone?: "default" | "positive" | "warning"
  /** Destaca o card com borda e fundo de acento (ex.: ponto de equilíbrio) */
  highlight?: boolean
}

export function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  tone = "default",
  highlight = false,
}: StatCardProps) {
  return (
    <Card className={cn("min-w-0", highlight && "border-2 border-primary/50 bg-accent/40")}>
      <CardContent className="flex items-start justify-between gap-2 p-4 sm:p-5">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground sm:text-sm">{title}</p>
          <p
            className={cn(
              "mt-1 text-xl font-semibold tracking-tight sm:mt-1.5 sm:text-2xl",
              tone === "positive" && "text-success",
              tone === "warning" && "text-warning"
            )}
          >
            {value}
          </p>
          {sub && <p className="mt-1 text-xs leading-snug text-muted-foreground">{sub}</p>}
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground sm:size-9">
          <Icon className="size-4" />
        </div>
      </CardContent>
    </Card>
  )
}
