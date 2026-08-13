import type { LancamentoColheita } from "./types"

/** Conversão usada no protótipo: 480 litros de café da roça ≈ 1 saca beneficiada (60 kg) */
export const LITROS_POR_SACA = 480

export const lancamentosColheita: LancamentoColheita[] = [
  { id: 1, data: "2026-08-13", litros: 2160, sacas: 4.5, funcionario: "Pedro Henrique Souza", local: "Gleba Norte" },
  { id: 2, data: "2026-08-13", litros: 1920, sacas: 4.0, funcionario: "Luiz Fernando Dias", local: "Gleba Norte" },
  { id: 3, data: "2026-08-12", litros: 960, sacas: 2.0, funcionario: "Sebastião Rocha", local: "Baixada" },
  { id: 4, data: "2026-08-12", litros: 2400, sacas: 5.0, funcionario: "Marcos Vinícius Lima", local: "Gleba Sul" },
  { id: 5, data: "2026-08-11", litros: 2640, sacas: 5.5, funcionario: "João Batista Moreira", local: "Gleba Sul" },
  { id: 6, data: "2026-08-11", litros: 1200, sacas: 2.5, funcionario: "Carlos Eduardo Neves", local: "Baixada" },
  { id: 7, data: "2026-08-10", litros: 2880, sacas: 6.0, funcionario: "Pedro Henrique Souza", local: "Gleba Norte" },
  { id: 8, data: "2026-08-10", litros: 2400, sacas: 5.0, funcionario: "Luiz Fernando Dias", local: "Gleba Sul" },
  { id: 9, data: "2026-08-08", litros: 720, sacas: 1.5, funcionario: "Sebastião Rocha", local: "Baixada" },
  { id: 10, data: "2026-08-08", litros: 3120, sacas: 6.5, funcionario: "Marcos Vinícius Lima", local: "Gleba Norte" },
  { id: 11, data: "2026-08-07", litros: 2640, sacas: 5.5, funcionario: "João Batista Moreira", local: "Gleba Sul" },
  { id: 12, data: "2026-08-07", litros: 1440, sacas: 3.0, funcionario: "Carlos Eduardo Neves", local: "Baixada" },
  { id: 13, data: "2026-08-06", litros: 2880, sacas: 6.0, funcionario: "Pedro Henrique Souza", local: "Gleba Norte" },
  { id: 14, data: "2026-08-06", litros: 2160, sacas: 4.5, funcionario: "Luiz Fernando Dias", local: "Gleba Sul" },
  { id: 15, data: "2026-08-05", litros: 960, sacas: 2.0, funcionario: "Sebastião Rocha", local: "Baixada" },
  { id: 16, data: "2026-08-05", litros: 2400, sacas: 5.0, funcionario: "Marcos Vinícius Lima", local: "Gleba Norte" },
  { id: 17, data: "2026-08-04", litros: 1200, sacas: 2.5, funcionario: "Carlos Eduardo Neves", local: "Gleba Sul" },
  { id: 18, data: "2026-08-04", litros: 3360, sacas: 7.0, funcionario: "João Batista Moreira", local: "Gleba Norte" },
]

export const sacasUltimosDias = lancamentosColheita.reduce((acc, l) => acc + l.sacas, 0)
