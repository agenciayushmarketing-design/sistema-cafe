import { Warehouse, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { formatBRL, formatDate, formatNumber } from "@/lib/format"
import {
  estoqueCafePorPadrao,
  totalEstoqueCafe,
  movimentacoesCafe,
  ESTOQUE_TULHA,
  ESTOQUE_ARMAZEM,
} from "@/data/estoqueCafe"
import { COTACAO_HOJE } from "@/data/lavoura"

export default function EstoqueCafe() {
  return (
    <>
      <PageHeader
        title="Estoque de Café"
        subtitle={`${formatNumber(totalEstoqueCafe)} sacas beneficiadas disponíveis · valor potencial ${formatBRL(totalEstoqueCafe * COTACAO_HOJE)} à cotação de hoje`}
      />

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
        <Card className="min-w-0">
          <CardContent className="flex items-start justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Estoque na fazenda (tulha)</p>
              <p className="mt-1.5 text-2xl font-semibold">{formatNumber(ESTOQUE_TULHA)} sc</p>
              <p className="mt-1 text-xs text-muted-foreground">Sacaria própria · pronto p/ carregar</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Home className="size-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardContent className="flex items-start justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Depositado em armazém</p>
              <p className="mt-1.5 text-2xl font-semibold">{formatNumber(ESTOQUE_ARMAZEM)} sc</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Armazém geral da cooperativa · nota de depósito
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Warehouse className="size-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/40">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total disponível para venda</p>
            <p className="mt-1.5 text-2xl font-semibold text-primary">
              {formatNumber(totalEstoqueCafe)} sc
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatNumber(ESTOQUE_TULHA)} na tulha + {formatNumber(ESTOQUE_ARMAZEM)} em armazém
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">
        <Card className="h-fit">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Saldo por padrão / classificação</CardTitle>
            <p className="text-xs text-muted-foreground">Classificação por bebida e peneira</p>
          </CardHeader>
          <CardContent>
            <ScrollHint />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Padrão</TableHead>
                  <TableHead className="text-right">Sacas</TableHead>
                  <TableHead className="text-right">Valor à cotação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estoqueCafePorPadrao.map((e) => (
                  <TableRow key={e.padrao}>
                    <TableCell className="font-medium">{e.padrao}</TableCell>
                    <TableCell className="text-right font-medium">{formatNumber(e.sacas)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatBRL(e.sacas * COTACAO_HOJE)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">{formatNumber(totalEstoqueCafe)}</TableCell>
                  <TableCell className="text-right">
                    {formatBRL(totalEstoqueCafe * COTACAO_HOJE)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <p className="mt-3 text-xs text-muted-foreground">
              Valor de referência pela cotação CEPEA de hoje ({formatBRL(COTACAO_HOJE)}/saca) — o preço
              efetivo varia por padrão e negociação.
            </p>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Movimentações</CardTitle>
            <p className="text-xs text-muted-foreground">
              Entradas por beneficiamento · saídas por venda
            </p>
          </CardHeader>
          <CardContent>
            <ScrollHint />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Sacas</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movimentacoesCafe.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(m.data)}</TableCell>
                    <TableCell>
                      <StatusBadge status={m.tipo} />
                    </TableCell>
                    <TableCell>{m.descricao}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${m.tipo === "Saída" ? "text-warning" : "text-success"}`}
                    >
                      {m.tipo === "Saída" ? "−" : "+"}
                      {formatNumber(m.sacas)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatNumber(m.saldoApos)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
