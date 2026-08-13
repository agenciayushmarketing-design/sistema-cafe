import type { Conta, LancamentoCusteio } from "./types"

export const contasPagar: Conta[] = [
  { id: 1, descricao: "NPK 20-05-20 — 100 sacos (parcela 2/3)", contraparte: "Agro Insumos Sul de Minas", vencimento: "2026-08-25", valor: 21400, status: "Em aberto", categoria: "Insumos" },
  { id: 2, descricao: "Óleo diesel S500 — 2.000 L", contraparte: "Posto Rural Ltda", vencimento: "2026-08-18", valor: 11800, status: "Em aberto", categoria: "Combustível" },
  { id: 3, descricao: "Folha de pagamento — julho/2026", contraparte: "Funcionários fixos", vencimento: "2026-08-05", valor: 14200, status: "Pago", categoria: "Mão de obra" },
  { id: 4, descricao: "Diárias de safristas — quinzena 2 de julho", contraparte: "Safristas", vencimento: "2026-08-01", valor: 6240, status: "Pago", categoria: "Mão de obra" },
  { id: 5, descricao: "Revisão trator Valtra A74 + peças", contraparte: "Mecânica Campo Forte", vencimento: "2026-08-10", valor: 4850, status: "Atrasado", categoria: "Manutenção" },
  { id: 6, descricao: "Fungicida cúprico — 60 kg", contraparte: "Coopercam", vencimento: "2026-09-02", valor: 3180, status: "Em aberto", categoria: "Insumos" },
  { id: 7, descricao: "Energia elétrica — tulha e secador", contraparte: "CEMIG", vencimento: "2026-08-20", valor: 2640, status: "Em aberto", categoria: "Despesas fixas" },
  { id: 8, descricao: "Frete de café — 130 sacas p/ armazém", contraparte: "Transportes Ipê", vencimento: "2026-09-08", valor: 2600, status: "Em aberto", categoria: "Diversas" },
]

export const contasReceber: Conta[] = [
  { id: 1, descricao: "Venda 80 sc — bebida dura peneira 14/15", contraparte: "Exportadora Grão Fino", vencimento: "2026-08-20", valor: 121600, status: "Aguardando depósito", categoria: "Café" },
  { id: 2, descricao: "Venda 120 sc — bebida dura peneira 16+", contraparte: "Cooperativa Regional (Cooxupé)", vencimento: "2026-07-30", valor: 177600, status: "Recebido", categoria: "Café" },
]

/**
 * Custeio único da lavoura (fazenda homogênea — sem separação por talhão).
 * Lançamentos com investimento=true (Benfeitorias) ficam FORA do custo/saca.
 */
export const custeio: LancamentoCusteio[] = [
  { id: 1, data: "2026-08-08", lancamento: "Adubação pós-colheita — NPK 20-05-20 (112 sacos)", valor: 23960, categoria: "Insumos" },
  { id: 2, data: "2026-08-05", lancamento: "Diárias de colheita — quinzena 1 de agosto", valor: 3360, categoria: "Mão de obra" },
  { id: 3, data: "2026-07-28", lancamento: "Óleo diesel S500 — 2.000 L", valor: 11800, categoria: "Combustível" },
  { id: 4, data: "2026-07-25", lancamento: "Folha de pagamento — julho/2026", valor: 14200, categoria: "Mão de obra" },
  { id: 5, data: "2026-07-20", lancamento: "Energia elétrica — tulha e secador", valor: 2640, categoria: "Despesas fixas" },
  { id: 6, data: "2026-07-15", lancamento: "Revisão trator Valtra A74 + peças", valor: 4850, categoria: "Manutenção" },
  { id: 7, data: "2026-07-10", lancamento: "Reforma do terreiro suspenso", valor: 12500, categoria: "Benfeitorias", investimento: true },
  { id: 8, data: "2026-07-02", lancamento: "Fungicida cúprico — 60 kg", valor: 3180, categoria: "Insumos" },
  { id: 9, data: "2026-06-25", lancamento: "Frete de café — sacas p/ armazém", valor: 3900, categoria: "Diversas" },
  { id: 10, data: "2026-06-18", lancamento: "Sacaria de juta — 300 unidades", valor: 2400, categoria: "Insumos" },
  { id: 11, data: "2026-06-10", lancamento: "Manutenção do secador rotativo", valor: 1850, categoria: "Manutenção" },
  { id: 12, data: "2026-05-28", lancamento: "Ampliação da tulha de café", valor: 9500, categoria: "Benfeitorias", investimento: true },
  { id: 13, data: "2026-05-15", lancamento: "Herbicida — manejo de mato-competição", valor: 1240, categoria: "Insumos" },
  { id: 14, data: "2026-05-05", lancamento: "ITR e taxas rurais", valor: 1980, categoria: "Despesas fixas" },
  { id: 15, data: "2026-04-22", lancamento: "Diárias — roçada e desbrota", valor: 1360, categoria: "Mão de obra" },
  { id: 16, data: "2026-04-10", lancamento: "Internet e telefonia rural", valor: 720, categoria: "Despesas fixas" },
]

export const totalCusteioSafra = custeio
  .filter((c) => !c.investimento)
  .reduce((acc, c) => acc + c.valor, 0)

export const totalBenfeitoriasLancadas = custeio
  .filter((c) => c.investimento)
  .reduce((acc, c) => acc + c.valor, 0)
