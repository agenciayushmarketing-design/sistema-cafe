import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Sprout,
  Coffee,
  Warehouse,
  HandCoins,
  TrendingUp,
  Boxes,
  CircleDollarSign,
  Users,
  SprayCan,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FAZENDA } from "@/data/lavoura"

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/lavoura", label: "Lavoura", icon: Sprout },
  { to: "/colheita", label: "Colheita", icon: Coffee },
  { to: "/estoque-cafe", label: "Estoque de Café", icon: Warehouse },
  { to: "/vendas", label: "Vendas", icon: HandCoins },
  { to: "/decisao-venda", label: "Decisão de Venda", icon: TrendingUp },
  { to: "/insumos", label: "Estoque de Insumos", icon: Boxes },
  { to: "/financeiro", label: "Financeiro", icon: CircleDollarSign },
  { to: "/equipe", label: "Equipe", icon: Users },
  { to: "/aplicacoes", label: "Aplicações", icon: SprayCan },
]

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Leaf className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{FAZENDA}</p>
          <p className="text-xs text-sidebar-foreground/70">Café arábica · 16 ha</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )
            }
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-sm font-medium">José Carlos Pereira</p>
        <p className="text-xs text-sidebar-foreground/70">Gerente de fazenda</p>
      </div>
    </aside>
  )
}
