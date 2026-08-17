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
import { vendas, sacasVendidas, receitaRealizada, precoMedioVenda } from "@/data/vendas"
import { totalEstoqueCafe } from "@/data/estoqueCafe"

export default function Vendas() {
  return (
    <>
      <PageHeader
        title="Vendas"
        subtitle="Negociações de café da safra 2025/2026"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Sacas vendidas", value: `${formatNumber(sacasVendidas)} sc` },
          { label: "Preço médio", value: `${formatBRL(precoMedioVenda)}/sc` },
          { label: "Receita realizada", value: formatBRL(receitaRealizada) },
          { label: "Sacas remanescentes", value: `${formatNumber(totalEstoqueCafe)} sc` },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-3 sm:p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-base font-semibold sm:text-lg">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-5 min-w-0 sm:mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Negociações</CardTitle>
          <p className="text-xs text-muted-foreground">
            Vendas fechadas na safra · o valor entra em Contas a Receber até o depósito
          </p>
        </CardHeader>
        <CardContent>
          <ScrollHint />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Padrão</TableHead>
                <TableHead className="text-right">Sacas</TableHead>
                <TableHead className="text-right">Preço/saca</TableHead>
                <TableHead className="text-right">Valor total</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Depósito</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendas.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="whitespace-nowrap">{formatDate(v.data)}</TableCell>
                  <TableCell className="font-medium">{v.padrao}</TableCell>
                  <TableCell className="text-right">{formatNumber(v.sacas)}</TableCell>
                  <TableCell className="text-right">{formatBRL(v.precoSaca)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatBRL(v.sacas * v.precoSaca)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{v.comprador}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(v.dataDeposito)}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={v.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total vendido</TableCell>
                <TableCell className="text-right">{formatNumber(sacasVendidas)}</TableCell>
                <TableCell className="text-right">{formatBRL(precoMedioVenda)}</TableCell>
                <TableCell className="text-right">{formatBRL(receitaRealizada)}</TableCell>
                <TableCell colSpan={3} />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
