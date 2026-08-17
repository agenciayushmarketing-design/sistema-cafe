import { useState } from "react"
import { ArrowDown, Plus } from "lucide-react"
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
import { formatDate, formatNumber } from "@/lib/format"
import { aplicacoes } from "@/data/aplicacoes"
import { estoque } from "@/data/estoque"

function NovaAplicacaoDialog() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Nova aplicação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova aplicação</DialogTitle>
          <DialogDescription>
            A quantidade usada é baixada automaticamente do estoque de insumos.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="data-ap">Data</Label>
              <Input id="data-ap" type="date" defaultValue="2026-08-13" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="local-ap">Local / talhão (opcional)</Label>
              <Input id="local-ap" placeholder="Ex.: Gleba Norte" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Produto (do estoque)</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar insumo" />
              </SelectTrigger>
              <SelectContent>
                {estoque
                  .filter((i) => i.categoria === "Fertilizante" || i.categoria === "Defensivo")
                  .map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      {i.nome} — saldo {formatNumber(i.saldo)} {i.unidade}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="dose">Dose por ha</Label>
              <Input id="dose" placeholder="Ex.: 350 kg/ha" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="qtd-ap">Quantidade usada</Label>
              <Input id="qtd-ap" type="number" placeholder="Ex.: 112" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Registrar e baixar estoque</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Aplicacoes() {
  return (
    <>
      <PageHeader
        title="Aplicações"
        subtitle="Adubações e pulverizações do ano agrícola — cada registro baixa a quantidade usada do estoque de insumos"
        action={<NovaAplicacaoDialog />}
      />

      <Card className="min-w-0">
        <CardContent className="pt-4">
          <ScrollHint />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Dose/ha</TableHead>
                <TableHead className="text-right">Qtd. usada</TableHead>
                <TableHead className="text-right">Baixa no estoque</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Local / talhão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aplicacoes.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="whitespace-nowrap">{formatDate(a.data)}</TableCell>
                  <TableCell>
                    <StatusBadge status={a.tipo} />
                  </TableCell>
                  <TableCell className="font-medium">{a.produto}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {a.dosePorHa}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    {formatNumber(a.quantidadeUsada)} {a.unidade}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    <span className="inline-flex items-center gap-1 font-medium text-destructive">
                      <ArrowDown className="size-3.5" />− {formatNumber(a.quantidadeUsada)} {a.unidade}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.responsavel}</TableCell>
                  <TableCell className="text-muted-foreground">{a.local ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-3 text-xs text-muted-foreground">
            Integração estoque ↔ campo: a adubação pós-colheita de 08/08 (NPK 20-05-20, 112 sacos)
            deixou o saldo do fertilizante em 18 sacos — abaixo do mínimo de 30. Veja o alerta
            "COMPRAR" na tela Estoque de Insumos.
          </p>
        </CardContent>
      </Card>
    </>
  )
}
