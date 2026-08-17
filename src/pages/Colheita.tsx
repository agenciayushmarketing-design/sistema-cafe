import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/shared/PageHeader"
import { ScrollHint } from "@/components/shared/ScrollHint"
import { formatDate, formatNumber } from "@/lib/format"
import { lancamentosColheita, sacasUltimosDias, LITROS_POR_SACA } from "@/data/colheitas"
import { funcionarios } from "@/data/equipe"
import { SACAS_COLHIDAS } from "@/data/lavoura"

const totalLitros = lancamentosColheita.reduce((acc, l) => acc + l.litros, 0)

function NovoLancamentoDialog() {
  const [open, setOpen] = useState(false)
  const [litros, setLitros] = useState("")
  const sacas = litros ? Number(litros) / LITROS_POR_SACA : 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Novo lançamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo lançamento de colheita</DialogTitle>
          <DialogDescription>
            Registro diário por funcionário. Conversão automática: {LITROS_POR_SACA} litros ≈ 1 saca
            beneficiada (60 kg).
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" type="date" defaultValue="2026-08-13" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="local">Local / talhão (opcional)</Label>
              <Input id="local" placeholder="Ex.: Gleba Norte" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="litros">Medida (litros)</Label>
              <Input
                id="litros"
                type="number"
                placeholder="Ex.: 2400"
                value={litros}
                onChange={(e) => setLitros(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Conversão em sacas</Label>
              <div className="flex h-9 items-center rounded-md border bg-muted px-3 text-sm font-medium">
                {sacas > 0 ? `${formatNumber(sacas, 1)} sacas` : "—"}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Funcionário</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar funcionário" />
              </SelectTrigger>
              <SelectContent>
                {funcionarios.map((f) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.nome} ({f.tipo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setOpen(false)}>Salvar lançamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Colheita() {
  return (
    <>
      <PageHeader
        title="Colheita"
        subtitle={`Total da safra: ${formatNumber(SACAS_COLHIDAS)} sacas beneficiadas · últimos 10 dias: ${formatNumber(sacasUltimosDias, 1)} sacas`}
        action={<NovoLancamentoDialog />}
      />

      <Card className="min-w-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Lançamentos diários</CardTitle>
          <p className="text-xs text-muted-foreground">
            Medida no campo em litros · conversão {LITROS_POR_SACA} L ≈ 1 saca beneficiada (60 kg) ·
            campo local/talhão é apenas descritivo
          </p>
        </CardHeader>
        <CardContent>
          <ScrollHint />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Medida (litros)</TableHead>
                <TableHead className="text-right">Sacas</TableHead>
                <TableHead>Funcionário</TableHead>
                <TableHead>Local / talhão</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lancamentosColheita.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="whitespace-nowrap">{formatDate(l.data)}</TableCell>
                  <TableCell className="text-right">{formatNumber(l.litros)}</TableCell>
                  <TableCell className="text-right font-medium">{formatNumber(l.sacas, 1)}</TableCell>
                  <TableCell>{l.funcionario}</TableCell>
                  <TableCell className="text-muted-foreground">{l.local ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total dos últimos 10 dias</TableCell>
                <TableCell className="text-right">{formatNumber(totalLitros)}</TableCell>
                <TableCell className="text-right">{formatNumber(sacasUltimosDias, 1)}</TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
