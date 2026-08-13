import { Outlet } from "react-router-dom"
import { CalendarRange } from "lucide-react"
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
  return (
    <div className="min-h-screen">
      <AppSidebar />
      <div className="ml-60">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/95 px-8 py-3 backdrop-blur">
          <p className="text-xs text-muted-foreground">{ANO_AGRICOLA}</p>
          <div className="flex items-center gap-2">
            <CalendarRange className="size-4 text-muted-foreground" />
            <Select defaultValue="2025-2026">
              <SelectTrigger className="h-8 w-[230px] text-sm">
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
        <main className="min-h-screen px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
