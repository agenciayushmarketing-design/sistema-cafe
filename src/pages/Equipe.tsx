import { useState } from "react"
import { Printer, ReceiptText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
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
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatBRL, formatDate } from "@/lib/format"
import {
  funcionarios,
  diarias,
  getFuncionario,
  diariasDoFuncionario,
  valesDoFuncionario,
} from "@/data/equipe"
import { FAZENDA } from "@/data/lavoura"
import type { Funcionario } from "@/data/types"

const fixos = funcionarios.filter((f) => f.tipo === "Fixo").length
const safristas = funcionarios.filter((f) => f.tipo === "Safrista").length
const totalDiarias = diarias.reduce((acc, d) => acc + d.valor, 0)
const totalVales = funcionarios.reduce((acc, f) => acc + valesDoFuncionario(f.id), 0)

function ReciboDialog({
  funcionario,
  onClose,
}: {
  funcionario: Funcionario | null
  onClose: () => void
}) {
  if (!funcionario) return null
  const doFunc = diariasDoFuncionario(funcionario.id)
  const bruto = doFunc.reduce((acc, d) => acc + d.valor, 0)
  const vales = valesDoFuncionario(funcionario.id)
  const liquido = bruto - vales

  return (
    <Dialog open={!!funcionario} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Recibo de pagamento de diárias</DialogTitle>
          <DialogDescription>
            Documento mockado para impressão — protótipo, sem valor fiscal.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto rounded-md border bg-white p-4 text-sm leading-relaxed sm:max-h-none sm:p-5">
          <p className="text-center text-base font-semibold">{FAZENDA}</p>
          <p className="text-center text-xs text-muted-foreground">
            Recibo de pagamento de diárias — agosto/2026
          </p>
          <Separator className="my-3" />
          <p>
            <span className="text-muted-foreground">Nome:</span>{" "}
            <span className="font-medium">{funcionario.nome}</span>
          </p>
          <p>
            <span className="text-muted-foreground">CPF:</span> {funcionario.cpf} ·{" "}
            <span className="text-muted-foreground">Função:</span> {funcionario.funcao}
          </p>
          <Separator className="my-3" />
          <div className="overflow-x-auto">
          <table className="w-full min-w-[260px] text-xs">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-1 font-medium">Data</th>
                <th className="pb-1 font-medium">Atividade</th>
                <th className="pb-1 text-right font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              {doFunc.map((d) => (
                <tr key={d.id}>
                  <td className="py-0.5">{formatDate(d.data)}</td>
                  <td className="py-0.5">
                    {d.atividade}
                    {d.local ? ` — ${d.local}` : ""}
                  </td>
                  <td className="py-0.5 text-right">{formatBRL(d.valor, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Separator className="my-3" />
          <div className="space-y-1 text-sm">
            <p className="flex justify-between">
              <span className="text-muted-foreground">
                Total de diárias ({doFunc.length} × diária)
              </span>
              <span className="font-medium">{formatBRL(bruto, true)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">(−) Vales / adiantamentos</span>
              <span className="font-medium">{formatBRL(vales, true)}</span>
            </p>
            <p className="flex justify-between border-t pt-1 text-base font-semibold">
              <span>Líquido a receber</span>
              <span>{formatBRL(liquido, true)}</span>
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 text-center text-xs text-muted-foreground">
            <div className="border-t pt-1">Assinatura do funcionário</div>
            <div className="border-t pt-1">Assinatura do empregador</div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button>
            <Printer className="size-4" /> Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function Equipe() {
  const [reciboDe, setReciboDe] = useState<Funcionario | null>(null)

  return (
    <>
      <PageHeader
        title="Equipe"
        subtitle={`${fixos} funcionários fixos + ${safristas} safristas · ${diarias.length} diárias em agosto (${formatBRL(totalDiarias)}) · vales no mês: ${formatBRL(totalVales)}`}
      />

      <div className="grid grid-cols-1 gap-5 sm:gap-6 2xl:grid-cols-3">
        <Card className="h-fit min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Funcionários</CardTitle>
            <p className="text-xs text-muted-foreground">
              Quadro atual · coluna de vales/adiantamentos de agosto
            </p>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {funcionarios.map((f) => {
                const vales = valesDoFuncionario(f.id)
                return (
                  <li key={f.id} className="flex items-start justify-between gap-2 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{f.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {f.funcao} · desde {formatDate(f.admissao)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Vales no mês:{" "}
                        <span className={vales > 0 ? "font-medium text-warning" : ""}>
                          {formatBRL(vales, true)}
                        </span>
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <StatusBadge status={f.tipo} />
                      {f.tipo === "Safrista" && (
                        <Button
                          variant="outline"
                          size="xs"
                          className="h-8 px-2.5 sm:h-6 sm:px-2"
                          onClick={() => setReciboDe(f)}
                        >
                          <ReceiptText className="size-3" /> Gerar recibo
                        </Button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="min-w-0 2xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Apontamento de diárias — agosto/2026</CardTitle>
            <p className="text-xs text-muted-foreground">
              Diárias lançadas por pessoa, data, atividade e local (campo descritivo)
            </p>
          </CardHeader>
          <CardContent>
            <ScrollHint />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pessoa</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Atividade / local</TableHead>
                  <TableHead className="text-right">Valor da diária</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {diarias.map((d) => {
                  const f = getFuncionario(d.funcionarioId)
                  return (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{f?.nome}</TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(d.data)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {d.atividade}
                        {d.local ? ` — ${d.local}` : ""}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatBRL(d.valor, true)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total do mês ({diarias.length} diárias)</TableCell>
                  <TableCell className="text-right">{formatBRL(totalDiarias, true)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>

      <ReciboDialog funcionario={reciboDe} onClose={() => setReciboDe(null)} />
    </>
  )
}
