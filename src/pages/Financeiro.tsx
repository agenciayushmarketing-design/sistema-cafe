import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/shared/PageHeader"
import { ScrollHint } from "@/components/shared/ScrollHint"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { formatBRL, formatDate, formatNumber } from "@/lib/format"
import { CircleDollarSign, Wallet, Percent, PiggyBank } from "lucide-react"
import {
  contasPagar,
  contasReceber,
  custeio,
  totalCusteioSafra,
  totalBenfeitoriasLancadas,
} from "@/data/financeiro"
import { CUSTO_TOTAL_SAFRA, CUSTO_POR_SACA, COTACAO_HOJE } from "@/data/lavoura"
import { receitaRealizada, sacasVendidas } from "@/data/vendas"
import { totalEstoqueCafe } from "@/data/estoqueCafe"

const totalPagarAberto = contasPagar
  .filter((c) => c.status !== "Pago")
  .reduce((acc, c) => acc + c.valor, 0)

const valorEstoquePotencial = totalEstoqueCafe * COTACAO_HOJE // 319.800
const margemRealizada = receitaRealizada - sacasVendidas * CUSTO_POR_SACA
const margemProjetada = receitaRealizada + valorEstoquePotencial - CUSTO_TOTAL_SAFRA

export default function Financeiro() {
  return (
    <>
      <PageHeader
        title="Financeiro"
        subtitle={`A pagar em aberto: ${formatBRL(totalPagarAberto)} · custeio único da lavoura de café (sem separação por talhão)`}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard
          title="Receita da safra"
          value={formatBRL(receitaRealizada)}
          sub={`+ ${formatBRL(valorEstoquePotencial)} potenciais (${formatNumber(totalEstoqueCafe)} sc × cotação)`}
          icon={CircleDollarSign}
        />
        <StatCard
          title="Custo total da safra"
          value={formatBRL(CUSTO_TOTAL_SAFRA)}
          sub={`${formatBRL(CUSTO_POR_SACA)}/saca · benfeitorias fora do cálculo`}
          icon={Wallet}
        />
        <StatCard
          title="Margem realizada"
          value={formatBRL(margemRealizada)}
          sub={`${formatNumber(sacasVendidas)} sc vendidas − custo apropriado`}
          icon={Percent}
          tone="positive"
        />
        <StatCard
          title="Margem projetada"
          value={formatBRL(margemProjetada)}
          sub="Receita + estoque a valor de cotação − custo total"
          icon={PiggyBank}
          tone="positive"
        />
      </div>

      <div className="mt-5 sm:mt-6">
        <Tabs defaultValue="pagar">
          <TabsList className="w-full max-w-full justify-start overflow-x-auto">
            <TabsTrigger value="pagar" className="shrink-0">
              Contas a Pagar
            </TabsTrigger>
            <TabsTrigger value="receber" className="shrink-0">
              Contas a Receber
            </TabsTrigger>
            <TabsTrigger value="custeio" className="shrink-0">
              Custeio por Categoria
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pagar">
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Contas a Pagar</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {contasPagar.filter((c) => c.status !== "Pago").length} títulos em aberto ·{" "}
                  {formatBRL(totalPagarAberto)}
                </p>
              </CardHeader>
              <CardContent>
                <ScrollHint />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contasPagar.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.descricao}</TableCell>
                        <TableCell className="text-muted-foreground">{c.contraparte}</TableCell>
                        <TableCell className="text-muted-foreground">{c.categoria}</TableCell>
                        <TableCell className="whitespace-nowrap">{formatDate(c.vencimento)}</TableCell>
                        <TableCell className="text-right font-medium">{formatBRL(c.valor)}</TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={c.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="receber">
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Contas a Receber</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Vendas de café da safra 2025/2026 ·{" "}
                  {formatBRL(
                    contasReceber
                      .filter((c) => c.status !== "Recebido")
                      .reduce((acc, c) => acc + c.valor, 0)
                  )}{" "}
                  aguardando depósito
                </p>
              </CardHeader>
              <CardContent>
                <ScrollHint />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contasReceber.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.descricao}</TableCell>
                        <TableCell className="text-muted-foreground">{c.contraparte}</TableCell>
                        <TableCell className="whitespace-nowrap">{formatDate(c.vencimento)}</TableCell>
                        <TableCell className="text-right font-medium">{formatBRL(c.valor)}</TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={c.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custeio">
            <Card className="min-w-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Custeio por Categoria</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Lançamentos de custo da lavoura · insumos, mão de obra, combustível, manutenção,
                  benfeitorias, despesas fixas e diversas
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-start gap-2 rounded-md border border-primary/30 bg-accent/50 px-4 py-3 text-xs leading-relaxed text-accent-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0" />
                  <span>
                    <span className="font-semibold">Regra de cálculo:</span> lançamentos de{" "}
                    <span className="font-semibold">BENFEITORIAS</span> são investimento na propriedade
                    (terreiro, tulha) e ficam <span className="font-semibold">FORA do custo/saca</span>.
                    Custo da safra: {formatBRL(CUSTO_TOTAL_SAFRA)} ÷ 405 sc ={" "}
                    {formatBRL(CUSTO_POR_SACA)}/saca. Benfeitorias no período:{" "}
                    {formatBRL(totalBenfeitoriasLancadas)}.
                  </span>
                </div>
                <ScrollHint />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Lançamento</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {custeio.map((c) => (
                      <TableRow key={c.id} className={c.investimento ? "bg-accent/30" : undefined}>
                        <TableCell className="whitespace-nowrap">{formatDate(c.data)}</TableCell>
                        <TableCell className="font-medium">{c.lancamento}</TableCell>
                        <TableCell>
                          {c.investimento ? (
                            <Badge className="border-transparent bg-accent text-accent-foreground">
                              {c.categoria} · investimento
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">{c.categoria}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">{formatBRL(c.valor)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Custeio do período (sem benfeitorias)</TableCell>
                      <TableCell className="text-right">{formatBRL(totalCusteioSafra)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="text-muted-foreground">
                        Benfeitorias (investimento — fora do custo/saca)
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatBRL(totalBenfeitoriasLancadas)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
