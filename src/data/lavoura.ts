export const FAZENDA = "Fazenda Santa Helena"
export const SAFRA = "Safra 2025/2026 (set–ago)"
export const ANO_AGRICOLA = "Ano agrícola: setembro/2025 a agosto/2026"

/** Lavoura homogênea — exclusivamente café */
export const lavoura = {
  cultura: "Café arábica",
  variedade: "Catuaí Vermelho IAC 144",
  areaHa: 16,
  pes: 39000,
  anoPlantio: 2016,
  espacamento: "3,5 × 0,7 m",
}

export const SACAS_COLHIDAS = 405
export const CUSTO_TOTAL_SAFRA = 179000
export const CUSTO_POR_SACA = Math.round(CUSTO_TOTAL_SAFRA / SACAS_COLHIDAS) // R$ 442
export const PRODUTIVIDADE_SC_HA = SACAS_COLHIDAS / lavoura.areaHa // 25,3 sc/ha
export const CHUVA_MES_MM = 142

/** Cotação CEPEA/ESALQ (mock) — arábica, R$/saca 60 kg */
export const COTACAO_HOJE = 1560
export const MARGEM_POTENCIAL_SACA = COTACAO_HOJE - CUSTO_POR_SACA // R$ 1.118

/** Série mockada de ~60 dias da cotação (pontos semanais) */
export const cotacaoSerie60d = [
  { data: "15/06", valor: 1432 },
  { data: "20/06", valor: 1448 },
  { data: "25/06", valor: 1470 },
  { data: "30/06", valor: 1455 },
  { data: "05/07", valor: 1490 },
  { data: "10/07", valor: 1512 },
  { data: "15/07", valor: 1498 },
  { data: "20/07", valor: 1524 },
  { data: "25/07", valor: 1538 },
  { data: "30/07", valor: 1520 },
  { data: "04/08", valor: 1545 },
  { data: "09/08", valor: 1552 },
  { data: "13/08", valor: 1560 },
]

/** Colheita por semana (sacas beneficiadas) — junho a agosto/2026 */
export const colheitaPorSemana = [
  { semana: "01/06", sacas: 10 },
  { semana: "08/06", sacas: 16 },
  { semana: "15/06", sacas: 24 },
  { semana: "22/06", sacas: 32 },
  { semana: "29/06", sacas: 44 },
  { semana: "06/07", sacas: 54 },
  { semana: "13/07", sacas: 60 },
  { semana: "20/07", sacas: 52 },
  { semana: "27/07", sacas: 42 },
  { semana: "03/08", sacas: 32 },
  { semana: "10/08", sacas: 22 },
  { semana: "17/08", sacas: 17 },
]

/** Composição do custo da safra por categoria (soma = R$ 179.000, sem benfeitorias) */
export const composicaoCusto = [
  { categoria: "Insumos", valor: 70000 },
  { categoria: "Mão de obra", valor: 64000 },
  { categoria: "Combustível", valor: 16000 },
  { categoria: "Manutenção", valor: 15000 },
  { categoria: "Despesas fixas", valor: 9000 },
  { categoria: "Diversas", valor: 5000 },
]

/** Benfeitorias (investimento) — fora do custo/saca */
export const TOTAL_BENFEITORIAS = 22000
