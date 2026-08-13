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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
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
        <div className="rounded-xl border-2 border-primary/50 bg-accent/40">
          <StatCard
            title="Ponto de equilíbrio"
            value={`${formatBRL(CUSTO_POR_SACA)}/sc`}
            sub="Preço mínimo p/ cobrir o custo da safra"
            icon={Scale}
          />
        </div>
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

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Colheita por semana</CardTitle>
            <p className="text-xs text-muted-foreground">Sacas beneficiadas · junho a agosto/2026</p>
          </CardHeader>
          <CardContent>
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Composição do custo da safra</CardTitle>
            <p className="text-xs text-muted-foreground">
              Total {formatBRL(CUSTO_TOTAL_SAFRA)} · benfeitorias (investimento) fora do custo/saca
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={composicaoComPct}
                layout="vertical"
                margin={{ top: 4, right: 76, left: 8, bottom: 0 }}
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
                  width={102}
                  tick={{ fontSize: 12, fill: CHART_AXIS }}
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

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="border-primary/40">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" /> Cotação do café hoje
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Indicador CEPEA/ESALQ · arábica tipo 6 · 13/08/2026 (mock)
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold tracking-tight">{formatBRL(COTACAO_HOJE)}
                  <span className="text-base font-normal text-muted-foreground">/saca</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Custo da safra: {formatBRL(CUSTO_POR_SACA)}/saca
                </p>
              </div>
              <div className="rounded-md bg-success-soft px-4 py-3 text-right">
                <p className="text-xs text-success">Margem potencial</p>
                <p className="text-xl font-semibold text-success">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Alertas de estoque mínimo</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {itensAbaixoMinimo.length} insumos abaixo do mínimo — repor antes da adubação de setembro
              </p>
            </div>
            <Link
              to="/insumos"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver estoque <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {itensAbaixoMinimo.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-3">
                    <TriangleAlert className="size-4 text-destructive" />
                    <div>
                      <p className="text-sm font-medium">{item.nome}</p>
                      <p className="text-xs text-muted-foreground">{item.categoria}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground">
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
