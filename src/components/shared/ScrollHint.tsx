import { MoveHorizontal } from "lucide-react"

/** Dica visível apenas em telas pequenas: a tabela ao lado rola na horizontal */
export function ScrollHint() {
  return (
    <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground lg:hidden">
      <MoveHorizontal className="size-3.5 shrink-0" />
      Deslize a tabela para o lado para ver todas as colunas
    </p>
  )
}
