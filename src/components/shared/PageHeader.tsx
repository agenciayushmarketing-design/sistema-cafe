import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="shrink-0 [&_button]:h-11 [&_button]:w-full sm:[&_button]:h-9 sm:[&_button]:w-auto">
          {action}
        </div>
      )}
    </div>
  )
}
