import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const styles: Record<string, string> = {
  // estoque de insumos
  ok: "bg-success-soft text-success border-transparent",
  comprar: "bg-destructive text-destructive-foreground border-transparent",
  // contas e vendas
  Pago: "bg-success-soft text-success border-transparent",
  Recebido: "bg-success-soft text-success border-transparent",
  "Em aberto": "bg-warning-soft text-warning border-transparent",
  "A receber": "bg-warning-soft text-warning border-transparent",
  "Aguardando depósito": "bg-warning-soft text-warning border-transparent",
  Atrasado: "bg-destructive text-destructive-foreground border-transparent",
  // equipe
  Fixo: "bg-accent text-accent-foreground border-transparent",
  Safrista: "bg-warning-soft text-warning border-transparent",
  // aplicações
  Adubação: "bg-success-soft text-success border-transparent",
  Pulverização: "bg-accent text-accent-foreground border-transparent",
  // movimentações de café
  Entrada: "bg-success-soft text-success border-transparent",
  Saída: "bg-warning-soft text-warning border-transparent",
}

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium", styles[status])}>
      {label ?? status}
    </Badge>
  )
}
