import { Link } from "react-router-dom"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts"
import {
  Package2,
  CloudRain,
  Wheat,
  Scale,
  Warehouse,
  TriangleAlert,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatBRL, formatNumber } from "@/lib/format"
import { CHART_GREEN, CHART_GRID, CHART_AXIS, tooltipStyle } from "@/lib/chart"
import {
  SACAS_COLHIDAS,
  CUSTO_POR_SACA,
  CHUVA_MES_MM,
  COTACAO_HOJE,
  MARGEM_POTENCIAL_SACA,
  colheitaPorSemana,
  composicaoCusto,
  CUSTO_TOTAL_SAFRA,
} from "@/data/lavoura"
import { totalEstoqueCafe } from "@/data/estoqueCafe"
import { itensAbaixoMinimo } from "@/data/estoque"

const composicaoComPct = composicaoCusto.map((c) => ({
  ...c,
  pct: (c.valor / CUSTO_TOTAL_SAFRA) * 100,
}))

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral da safra 2025/2026 — atualizado em 13/08/2026"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Sacas colhidas"
          value={`${formatNumber(SACAS_COLHIDAS)} sc`}
          sub="Beneficiadas 60 kg · safra 2025/26"
          icon={Package2}
        />
        <StatCard
          title="Custo por saca"
          value={formatBRL(CUSTO_POR_SACA)}
          sub={`Custo total ${formatBRL(CUSTO_TOTAL_SAFRA)}`}
          icon={Wheat}
        />
        <StatCard
          title="Ponto de equilíbrio"
          value={`${formatBRL(CUSTO_POR_SACA)}/sc`}
          sub="Preço mínimo p/ cobrir o custo da safra"
          icon={Scale}
          highlight
        />
        <StatCard
          title="Sacas em estoque"
          value={`${formatNumber(totalEstoqueCafe)} sc`}
          sub="Tulha + armazém · disponíveis p/ venda"
          icon={Warehouse}
        />
        <StatCard
          title="Chuva no mês"
          value={`${CHUVA_MES_MM} mm`}
          sub="Acumulado de agosto · pluviômetro sede"
          icon={CloudRain}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Colheita por semana</CardTitle>
            <p className="text-xs text-muted-foreground">Sacas beneficiadas · junho a agosto/2026</p>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={colheitaPorSemana} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={CHART_GRID} />
                <XAxis
                  dataKey="semana"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: CHART_AXIS }}
                  interval={1}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: CHART_AXIS }} />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`${v} sacas`, "Colheita"]}
                  labelFormatter={(l) => `Semana de ${l}`}
                />
                <Bar dataKey="sacas" fill={CHART_GREEN} radius={[4, 4, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Composição do custo da safra</CardTitle>
            <p className="text-xs text-muted-foreground">
              Total {formatBRL(CUSTO_TOTAL_SAFRA)} · benfeitorias (investimento) fora do custo/saca
            </p>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={composicaoComPct}
                layout="vertical"
                margin={{ top: 4, right: 44, left: 4, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} stroke={CHART_GRID} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: CHART_AXIS }}
                  tickFormatter={(v) => `${Math.round(Number(v) / 1000)} mil`}
                />
                <YAxis
                  type="category"
                  dataKey="categoria"
                  tickLine={false}
                  axisLine={false}
                  width={96}
                  tick={{ fontSize: 11, fill: CHART_AXIS }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  contentStyle={tooltipStyle}
                  formatter={(v) => [formatBRL(Number(v)), "Custo"]}
                />
                <Bar dataKey="valor" fill={CHART_GREEN} radius={[0, 4, 4, 0]} maxBarSize={22}>
                  <LabelList
                    dataKey="pct"
                    position="right"
                    formatter={(v: number) => `${formatNumber(v, 0)}%`}
                    style={{ fontSize: 12, fill: "#3f4a3d", fontWeight: 500 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:gap-6 xl:grid-cols-2">
        <Card className="min-w-0 border-primary/40">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" /> Cotação do café hoje
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Indicador CEPEA/ESALQ · arábica tipo 6 · 13/08/2026 (mock)
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
              <div>
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatBRL(COTACAO_HOJE)}
                  <span className="text-base font-normal text-muted-foreground">/saca</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Custo da safra: {formatBRL(CUSTO_POR_SACA)}/saca
                </p>
              </div>
              <div className="w-full rounded-md bg-success-soft px-4 py-3 sm:w-auto sm:text-right">
                <p className="text-xs text-success">Margem potencial</p>
                <p className="text-lg font-semibold text-success sm:text-xl">
                  {formatBRL(MARGEM_POTENCIAL_SACA)}/saca
                </p>
              </div>
            </div>
            <Link
              to="/decisao-venda"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Simular venda na tela Decisão de Venda <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="flex flex-col gap-2 pb-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle className="text-base">Alertas de estoque mínimo</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {itensAbaixoMinimo.length} insumos abaixo do mínimo — repor antes da adubação de setembro
              </p>
            </div>
            <Link
              to="/insumos"
              className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver estoque <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {itensAbaixoMinimo.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-2.5"
                >
                  <div className="flex items-start gap-3">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.nome}</p>
                      <p className="text-xs text-muted-foreground">{item.categoria}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 pl-7 sm:justify-end sm:gap-4 sm:pl-0">
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Saldo{" "}
                      <span className="font-semibold text-foreground">
                        {formatNumber(item.saldo)} {item.unidade}
                      </span>{" "}
                      · mínimo {formatNumber(item.minimo)}
                    </p>
                    <StatusBadge status="comprar" label="COMPRAR" />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
