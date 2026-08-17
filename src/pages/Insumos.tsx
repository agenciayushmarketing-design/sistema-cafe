import { useState } from "react"
import { Plus, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/shared/PageHeader"
import { ScrollHint } from "@/components/shared/ScrollHint"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatNumber } from "@/lib/format"
import { estoque, itensAbaixoMinimo } from "@/data/estoque"

function EntradaCompraDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Entrada de compra
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrada de compra</DialogTitle>
          <DialogDescription>
            Registra a nota de compra e soma a quantidade ao saldo do insumo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Insumo</Label>
            <Select defaultValue="npk-20">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {estoque.map((i) => (
                  <SelectItem key={i.id} value={i.id}>
                    {i.nome} ({i.unidade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="qtd">Quantidade</Label>
              <Input id="qtd" type="number" placeholder="Ex.: 100" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valor">Valor total (R$)</Label>
              <Input id="valor" type="number" placeholder="Ex.: 21.400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nf">Nota fiscal</Label>
              <Input id="nf" placeholder="Nº da NF-e" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input id="fornecedor" placeholder="Ex.: Agro Insumos" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Registrar entrada</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Insumos() {
  return (
    <>
      <PageHeader
        title="Estoque de Insumos"
        subtitle={`${estoque.length} itens em controle · ${itensAbaixoMinimo.length} abaixo do estoque mínimo`}
        action={<EntradaCompraDialog />}
      />

      {itensAbaixoMinimo.length > 0 && (
        <div className="mb-5 flex items-start gap-2 rounded-md border border-destructive/30 bg-danger-soft px-3 py-3 text-xs leading-relaxed text-destructive sm:px-4 sm:text-sm">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <span>
            <span className="font-semibold">
              {itensAbaixoMinimo.length} insumos precisam de reposição:
            </span>{" "}
            {itensAbaixoMinimo.map((i) => i.nome).join(", ")}. A adubação de setembro depende do NPK
            20-05-20.
          </span>
        </div>
      )}

      <Card className="min-w-0">
        <CardContent className="pt-4">
          <ScrollHint />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
                <TableHead className="text-right">Estoque mínimo</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoque.map((item) => {
                const abaixo = item.saldo <= item.minimo
                return (
                  <TableRow key={item.id} className={abaixo ? "bg-danger-soft/40" : undefined}>
                    <TableCell className="font-medium">{item.nome}</TableCell>
                    <TableCell className="text-muted-foreground">{item.categoria}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${abaixo ? "text-destructive" : ""}`}
                    >
                      {formatNumber(item.saldo)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatNumber(item.minimo)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.unidade}</TableCell>
                    <TableCell className="text-center">
                      {abaixo ? (
                        <StatusBadge status="comprar" label="COMPRAR" />
                      ) : (
                        <StatusBadge status="ok" label="OK" />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
