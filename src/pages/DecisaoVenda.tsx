import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts"
import { Info, Scale, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/PageHeader"
import { formatBRL, formatNumber } from "@/lib/format"
import { CHART_GREEN, CHART_GRID, CHART_AXIS, tooltipStyle } from "@/lib/chart"
import {
  COTACAO_HOJE,
  CUSTO_POR_SACA,
  cotacaoSerie60d,
} from "@/data/lavoura"
import { sacasVendidas, precoMedioVenda } from "@/data/vendas"
import { totalEstoqueCafe } from "@/data/estoqueCafe"

export default function DecisaoVenda() {
  const [sacasInput, setSacasInput] = useState("100")
  const [precoInput, setPrecoInput] = useState(String(COTACAO_HOJE))

  const sacas = Math.max(0, Number(sacasInput) || 0)
  const preco = Math.max(0, Number(precoInput) || 0)
  const receita = sacas * preco
  const margemSaca = preco - CUSTO_POR_SACA
  const margemTotal = margemSaca * sacas
  const acimaEquilibrio = preco >= CUSTO_POR_SACA

  return (
    <>
      <PageHeader
        title="Decisão de Venda"
        subtitle="Cotação, ponto de equilíbrio e simulador de venda do estoque"
      />

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4 text-primary" /> Cotação do café arábica
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Indicador CEPEA/ESALQ tipo 6 · últimos 60 dias (mock)
            </p>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="mb-3 flex flex-wrap items-end gap-4 sm:gap-6">
              <div>
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {formatBRL(COTACAO_HOJE)}
                  <span className="text-base font-normal text-muted-foreground">/saca</span>
                </p>
                <p className="text-xs text-muted-foreground">Hoje, 13/08/2026</p>
              </div>
              <div className="flex min-w-0 items-center gap-2 rounded-md bg-accent px-3 py-2">
                <Scale className="size-4 text-accent-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Ponto de equilíbrio (custo/saca)</p>
                  <p className="text-sm font-semibold text-accent-foreground">
                    {formatBRL(CUSTO_POR_SACA)}/saca
                  </p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <LineChart data={cotacaoSerie60d} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={CHART_GRID} />
                <XAxis
                  dataKey="data"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: CHART_AXIS }}
                  interval={2}
                />
                <YAxis
                  domain={[400, 1650]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: CHART_AXIS }}
                  tickFormatter={(v) => `${formatNumber(Number(v))}`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`${formatBRL(Number(v))}/saca`, "Cotação"]}
                />
                <ReferenceLine
                  y={CUSTO_POR_SACA}
                  stroke={CHART_AXIS}
                  strokeDasharray="4 4"
                  label={{
                    value: `equilíbrio ${formatBRL(CUSTO_POR_SACA)}`,
                    position: "insideBottomLeft",
                    fontSize: 11,
                    fill: CHART_AXIS,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke={CHART_GREEN}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-2 text-xs text-muted-foreground">
              A cotação está {formatBRL(COTACAO_HOJE - CUSTO_POR_SACA)}/saca acima do custo da safra.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Simulador de venda</CardTitle>
            <p className="text-xs text-muted-foreground">
              Estoque disponível: {formatNumber(totalEstoqueCafe)} sacas
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sim-sacas">Sacas a vender</Label>
                <Input
                  id="sim-sacas"
                  type="number"
                  min={0}
                  max={totalEstoqueCafe}
                  value={sacasInput}
                  onChange={(e) => setSacasInput(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sim-preco">Preço por saca (R$)</Label>
                <Input
                  id="sim-preco"
                  type="number"
                  min={0}
                  value={precoInput}
                  onChange={(e) => setPrecoInput(e.target.value)}
                />
              </div>
            </div>
            {sacas > totalEstoqueCafe && (
              <p className="mt-2 text-xs text-destructive">
                Atenção: a quantidade supera o estoque disponível ({formatNumber(totalEstoqueCafe)} sc).
              </p>
            )}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">Receita</p>
                <p className="mt-0.5 text-lg font-semibold">{formatBRL(receita)}</p>
              </div>
              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">Margem total</p>
                <p
                  className={`mt-0.5 text-lg font-semibold ${acimaEquilibrio ? "text-success" : "text-destructive"}`}
                >
                  {formatBRL(margemTotal)}
                </p>
              </div>
              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">Margem por saca</p>
                <p
                  className={`mt-0.5 text-lg font-semibold ${acimaEquilibrio ? "text-success" : "text-destructive"}`}
                >
                  {formatBRL(margemSaca)}
                </p>
              </div>
            </div>
            {!acimaEquilibrio && preco > 0 && (
              <p className="mt-2 text-xs font-medium text-destructive">
                Preço abaixo do ponto de equilíbrio de {formatBRL(CUSTO_POR_SACA)}/saca.
              </p>
            )}

            <Separator className="my-4" />

            <div className="rounded-md bg-secondary p-3 text-sm">
              <p className="font-medium text-secondary-foreground">Comparativo com o já vendido</p>
              <div className="mt-2 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2 sm:gap-2">
                <div>
                  <p className="text-muted-foreground">Vendido até agora</p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {formatNumber(sacasVendidas)} sc a {formatBRL(precoMedioVenda)}/sc (média)
                  </p>
                  <p className="text-muted-foreground">
                    Margem média: {formatBRL(precoMedioVenda - CUSTO_POR_SACA)}/saca
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Simulação atual</p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {formatNumber(sacas)} sc a {formatBRL(preco)}/sc
                  </p>
                  <p
                    className={preco >= precoMedioVenda ? "text-success" : "text-warning"}
                  >
                    {preco >= precoMedioVenda
                      ? `+${formatBRL(preco - precoMedioVenda)}/saca vs preço médio`
                      : `−${formatBRL(precoMedioVenda - preco)}/saca vs preço médio`}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 rounded-md border border-warning/40 bg-warning-soft p-3 text-xs leading-relaxed text-warning">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              Ferramenta de apoio à decisão — não é recomendação de venda. Preços de café são voláteis;
              consulte sua cooperativa ou corretor antes de fechar negócio.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
