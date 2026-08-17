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
  X,
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

interface AppSidebarProps {
  open: boolean
  onClose: () => void
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  return (
    <>
      {/* Backdrop — apenas no mobile, quando o menu está aberto */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 will-change-transform lg:w-60 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Leaf className="size-5" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold">{FAZENDA}</p>
            <p className="text-xs text-sidebar-foreground/70">Café arábica · 16 ha</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="-mr-1 flex size-9 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors lg:py-2",
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
    </>
  )
}
