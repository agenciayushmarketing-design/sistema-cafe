import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/PageHeader"
import { ScrollHint } from "@/components/shared/ScrollHint"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatBRL, formatDate, formatNumber } from "@/lib/format"
import {
  lavoura,
  SACAS_COLHIDAS,
  CUSTO_TOTAL_SAFRA,
  CUSTO_POR_SACA,
  PRODUTIVIDADE_SC_HA,
  COTACAO_HOJE,
  colheitaPorSemana,
} from "@/data/lavoura"
import { receitaRealizada, sacasVendidas } from "@/data/vendas"
import { totalEstoqueCafe } from "@/data/estoqueCafe"
import { aplicacoes } from "@/data/aplicacoes"

const margemEstimada = receitaRealizada + totalEstoqueCafe * COTACAO_HOJE - CUSTO_TOTAL_SAFRA

export default function Lavoura() {
  return (
    <>
      <PageHeader
        title="Lavoura"
        subtitle={`${lavoura.cultura} ${lavoura.variedade} · lavoura homogênea plantada em ${lavoura.anoPlantio}`}
        action={<Badge className="border-transparent bg-success-soft text-success">Safra encerrando</Badge>}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Área em produção", value: `${formatNumber(lavoura.areaHa)} ha` },
          { label: "Pés de café", value: formatNumber(lavoura.pes) },
          { label: "Espaçamento", value: lavoura.espacamento },
          { label: "Ano de plantio", value: String(lavoura.anoPlantio) },
          { label: "Sacas colhidas", value: `${formatNumber(SACAS_COLHIDAS)} sc` },
          { label: "Produtividade", value: `${formatNumber(PRODUTIVIDADE_SC_HA, 1)} sc/ha` },
          { label: "Custo acumulado", value: formatBRL(CUSTO_TOTAL_SAFRA) },
          { label: "Custo por saca", value: formatBRL(CUSTO_POR_SACA) },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-3 sm:p-4">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-base font-semibold sm:text-lg">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4 min-w-0 border-primary/40">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4 sm:gap-4 sm:p-5">
          <div className="min-w-0">
            <p className="text-sm font-medium">Margem estimada da safra</p>
            <p className="text-xs text-muted-foreground">
              Receita realizada ({formatNumber(sacasVendidas)} sc vendidas) + estoque de{" "}
              {formatNumber(totalEstoqueCafe)} sc a valor de cotação − custo total
            </p>
          </div>
          <p className="text-xl font-semibold text-success sm:text-2xl">
            {formatBRL(margemEstimada)}
          </p>
        </CardContent>
      </Card>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Histórico de aplicações</CardTitle>
            <p className="text-xs text-muted-foreground">
              Adubações e pulverizações do ano agrícola (set/2025 – ago/2026)
            </p>
          </CardHeader>
          <CardContent>
            <ScrollHint />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Dose/ha</TableHead>
                  <TableHead className="text-right">Qtd. usada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aplicacoes.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(a.data)}</TableCell>
                    <TableCell>
                      <StatusBadge status={a.tipo} />
                    </TableCell>
                    <TableCell>{a.produto}</TableCell>
                    <TableCell className="whitespace-nowrap">{a.dosePorHa}</TableCell>
                    <TableCell className="whitespace-nowrap text-right">
                      {formatNumber(a.quantidadeUsada)} {a.unidade}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Resumo de colheita da safra</CardTitle>
            <p className="text-xs text-muted-foreground">Sacas beneficiadas por semana · jun–ago/2026</p>
          </CardHeader>
          <CardContent>
            <ScrollHint />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semana</TableHead>
                  <TableHead className="text-right">Sacas</TableHead>
                  <TableHead className="text-right">% da safra</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colheitaPorSemana.map((s) => (
                  <TableRow key={s.semana}>
                    <TableCell>Semana de {s.semana}</TableCell>
                    <TableCell className="text-right font-medium">{s.sacas}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatNumber((s.sacas / SACAS_COLHIDAS) * 100, 1)}%
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/40 font-semibold">
                  <TableCell>Total da safra</TableCell>
                  <TableCell className="text-right">{formatNumber(SACAS_COLHIDAS)}</TableCell>
                  <TableCell className="text-right">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
