import type { Aplicacao } from "./types"

/** Aplicações na lavoura (16 ha) — a quantidade usada é baixada do estoque de insumos */
export const aplicacoes: Aplicacao[] = [
  { id: 1, data: "2026-08-08", tipo: "Adubação", produtoId: "npk-20", produto: "NPK 20-05-20", dosePorHa: "350 kg/ha", quantidadeUsada: 112, unidade: "sacos", responsavel: "Antônio Silva Filho", local: "Lavoura toda" },
  { id: 2, data: "2026-07-02", tipo: "Pulverização", produtoId: "fungicida", produto: "Fungicida cúprico", dosePorHa: "2,0 kg/ha", quantidadeUsada: 32, unidade: "kg", responsavel: "Antônio Silva Filho", local: "Lavoura toda" },
  { id: 3, data: "2026-05-15", tipo: "Pulverização", produtoId: "herbicida", produto: "Herbicida glifosato", dosePorHa: "2,5 L/ha", quantidadeUsada: 40, unidade: "L", responsavel: "Carlos Eduardo Neves", local: "Entrelinhas" },
  { id: 4, data: "2026-04-18", tipo: "Pulverização", produtoId: "inseticida", produto: "Inseticida p/ broca-do-café", dosePorHa: "0,6 L/ha", quantidadeUsada: 10, unidade: "L", responsavel: "Antônio Silva Filho", local: "Lavoura toda" },
  { id: 5, data: "2026-03-10", tipo: "Adubação", produtoId: "boro", produto: "Ácido bórico", dosePorHa: "3,0 kg/ha", quantidadeUsada: 48, unidade: "kg", responsavel: "Carlos Eduardo Neves", local: "Lavoura toda" },
  { id: 6, data: "2026-02-12", tipo: "Adubação", produtoId: "npk-25", produto: "NPK 25-00-25", dosePorHa: "300 kg/ha", quantidadeUsada: 96, unidade: "sacos", responsavel: "Antônio Silva Filho", local: "Lavoura toda" },
  { id: 7, data: "2026-01-20", tipo: "Pulverização", produtoId: "fungicida", produto: "Fungicida cúprico", dosePorHa: "2,0 kg/ha", quantidadeUsada: 32, unidade: "kg", responsavel: "Antônio Silva Filho", local: "Lavoura toda" },
  { id: 8, data: "2025-12-08", tipo: "Adubação", produtoId: "npk-20", produto: "NPK 20-05-20", dosePorHa: "300 kg/ha", quantidadeUsada: 96, unidade: "sacos", responsavel: "Antônio Silva Filho", local: "Lavoura toda" },
  { id: 9, data: "2025-11-05", tipo: "Adubação", produtoId: "organico", produto: "Adubo orgânico (cama de frango)", dosePorHa: "1,0 t/ha", quantidadeUsada: 6, unidade: "t", responsavel: "João Batista Moreira", local: "Gleba Norte (área mais fraca)" },
  { id: 10, data: "2025-10-15", tipo: "Adubação", produtoId: "calcario", produto: "Calcário dolomítico", dosePorHa: "1,5 t/ha", quantidadeUsada: 24, unidade: "t", responsavel: "João Batista Moreira", local: "Lavoura toda" },
  { id: 11, data: "2025-09-22", tipo: "Pulverização", produtoId: "espalhante", produto: "Espalhante adesivo", dosePorHa: "0,3 L/ha", quantidadeUsada: 5, unidade: "L", responsavel: "Carlos Eduardo Neves", local: "Lavoura toda" },
]
