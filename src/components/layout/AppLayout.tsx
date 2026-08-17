import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { CalendarRange, Menu } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AppSidebar } from "./AppSidebar"
import { ANO_AGRICOLA } from "@/data/lavoura"

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  /* Rola para o topo e fecha o menu ao trocar de tela */
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen">
      <AppSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:ml-60">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b bg-background/95 px-4 py-2.5 backdrop-blur sm:px-6 lg:px-8 lg:py-3">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            className="-ml-1 flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <p className="hidden flex-1 text-xs text-muted-foreground lg:block">{ANO_AGRICOLA}</p>

          <div className="ml-auto flex min-w-0 items-center gap-2">
            <CalendarRange className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
            <Select defaultValue="2025-2026">
              <SelectTrigger className="h-9 w-full min-w-0 text-xs sm:w-[230px] sm:text-sm lg:h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-2026">Safra 2025/2026 (set–ago)</SelectItem>
                <SelectItem value="2024-2025" disabled>
                  Safra 2024/2025 (encerrada)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
