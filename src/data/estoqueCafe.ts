import type { EstoqueCafePadrao, MovimentacaoCafe } from "./types"

/** Saldo de café beneficiado por padrão/classificação */
export const estoqueCafePorPadrao: EstoqueCafePadrao[] = [
  { padrao: "Bebida dura · peneira 16+", sacas: 130 },
  { padrao: "Bebida dura · peneira 14/15", sacas: 60 },
  { padrao: "Escolha / catação", sacas: 15 },
]

export const totalEstoqueCafe = estoqueCafePorPadrao.reduce((acc, e) => acc + e.sacas, 0) // 205

/** Localização física do estoque */
export const ESTOQUE_TULHA = 75
export const ESTOQUE_ARMAZEM = 130 // depositado em armazém geral (cooperativa)

export const movimentacoesCafe: MovimentacaoCafe[] = [
  { id: 1, data: "2026-06-12", tipo: "Entrada", descricao: "Beneficiamento — Lote 01 (secador)", sacas: 48, saldoApos: 48 },
  { id: 2, data: "2026-06-26", tipo: "Entrada", descricao: "Beneficiamento — Lote 02", sacas: 85, saldoApos: 133 },
  { id: 3, data: "2026-07-10", tipo: "Entrada", descricao: "Beneficiamento — Lote 03", sacas: 96, saldoApos: 229 },
  { id: 4, data: "2026-07-15", tipo: "Saída", descricao: "Venda — 120 sc peneira 16+ (Cooxupé)", sacas: 120, saldoApos: 109 },
  { id: 5, data: "2026-07-24", tipo: "Entrada", descricao: "Beneficiamento — Lote 04", sacas: 88, saldoApos: 197 },
  { id: 6, data: "2026-08-05", tipo: "Saída", descricao: "Venda — 80 sc peneira 14/15 (Grão Fino)", sacas: 80, saldoApos: 117 },
  { id: 7, data: "2026-08-08", tipo: "Entrada", descricao: "Beneficiamento — Lote 05 (final da colheita)", sacas: 88, saldoApos: 205 },
]
