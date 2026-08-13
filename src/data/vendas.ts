import type { Venda } from "./types"

export const vendas: Venda[] = [
  {
    id: 1,
    data: "2026-07-15",
    padrao: "Bebida dura · peneira 16+",
    sacas: 120,
    precoSaca: 1480,
    comprador: "Cooperativa Regional (Cooxupé)",
    dataDeposito: "2026-07-30",
    status: "Recebido",
  },
  {
    id: 2,
    data: "2026-08-05",
    padrao: "Bebida dura · peneira 14/15",
    sacas: 80,
    precoSaca: 1520,
    comprador: "Exportadora Grão Fino",
    dataDeposito: "2026-08-20",
    status: "Aguardando depósito",
  },
]

export const sacasVendidas = vendas.reduce((acc, v) => acc + v.sacas, 0) // 200
export const receitaRealizada = vendas.reduce((acc, v) => acc + v.sacas * v.precoSaca, 0) // 299.200
export const precoMedioVenda = receitaRealizada / sacasVendidas // 1.496
