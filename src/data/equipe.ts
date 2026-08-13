import type { Funcionario, Diaria, Vale } from "./types"

export const funcionarios: Funcionario[] = [
  { id: 1, nome: "José Carlos Pereira", funcao: "Gerente de fazenda", tipo: "Fixo", admissao: "2015-03-10", cpf: "412.870.156-04" },
  { id: 2, nome: "Antônio Silva Filho", funcao: "Tratorista", tipo: "Fixo", admissao: "2017-06-01", cpf: "398.114.622-70" },
  { id: 3, nome: "João Batista Moreira", funcao: "Trabalhador rural", tipo: "Fixo", admissao: "2018-02-15", cpf: "285.740.918-33" },
  { id: 4, nome: "Sebastião Rocha", funcao: "Trabalhador rural", tipo: "Fixo", admissao: "2019-09-20", cpf: "173.526.804-91" },
  { id: 5, nome: "Carlos Eduardo Neves", funcao: "Trabalhador rural", tipo: "Fixo", admissao: "2021-04-05", cpf: "506.238.147-12" },
  { id: 6, nome: "Maria de Fátima Gomes", funcao: "Serviços gerais / tulha", tipo: "Fixo", admissao: "2016-11-08", cpf: "329.615.480-25" },
  { id: 7, nome: "Pedro Henrique Souza", funcao: "Colhedor (safra)", tipo: "Safrista", admissao: "2026-06-01", cpf: "614.092.735-58" },
  { id: 8, nome: "Luiz Fernando Dias", funcao: "Colhedor (safra)", tipo: "Safrista", admissao: "2026-06-01", cpf: "247.381.596-40" },
  { id: 9, nome: "Ana Paula Ferreira", funcao: "Colhedora (safra)", tipo: "Safrista", admissao: "2026-06-15", cpf: "580.463.219-86" },
  { id: 10, nome: "Marcos Vinícius Lima", funcao: "Colhedor (safra)", tipo: "Safrista", admissao: "2026-06-15", cpf: "136.905.472-63" },
]

/** Apontamento de diárias — agosto/2026 */
export const diarias: Diaria[] = [
  { id: 1, funcionarioId: 7, data: "2026-08-13", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 140 },
  { id: 2, funcionarioId: 8, data: "2026-08-13", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 140 },
  { id: 3, funcionarioId: 10, data: "2026-08-12", atividade: "Colheita (derriça)", local: "Gleba Sul", valor: 140 },
  { id: 4, funcionarioId: 4, data: "2026-08-12", atividade: "Colheita (derriça)", local: "Baixada", valor: 130 },
  { id: 5, funcionarioId: 9, data: "2026-08-11", atividade: "Rastelação e abanação", local: "Gleba Sul", valor: 130 },
  { id: 6, funcionarioId: 3, data: "2026-08-11", atividade: "Colheita (derriça)", local: "Gleba Sul", valor: 130 },
  { id: 7, funcionarioId: 5, data: "2026-08-10", atividade: "Colheita (derriça)", local: "Baixada", valor: 130 },
  { id: 8, funcionarioId: 7, data: "2026-08-10", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 140 },
  { id: 9, funcionarioId: 9, data: "2026-08-08", atividade: "Secagem no terreiro", local: "Sede", valor: 130 },
  { id: 10, funcionarioId: 8, data: "2026-08-08", atividade: "Colheita (derriça)", local: "Gleba Sul", valor: 140 },
  { id: 11, funcionarioId: 4, data: "2026-08-07", atividade: "Colheita (derriça)", local: "Baixada", valor: 130 },
  { id: 12, funcionarioId: 10, data: "2026-08-07", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 140 },
  { id: 13, funcionarioId: 2, data: "2026-08-06", atividade: "Transporte de café", local: "Sede", valor: 150 },
  { id: 14, funcionarioId: 3, data: "2026-08-06", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 130 },
  { id: 15, funcionarioId: 5, data: "2026-08-06", atividade: "Colheita (derriça)", local: "Baixada", valor: 130 },
  { id: 16, funcionarioId: 6, data: "2026-08-05", atividade: "Tulha / beneficiamento", local: "Sede", valor: 120 },
  { id: 17, funcionarioId: 7, data: "2026-08-05", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 140 },
  { id: 18, funcionarioId: 8, data: "2026-08-04", atividade: "Colheita (derriça)", local: "Gleba Sul", valor: 140 },
  { id: 19, funcionarioId: 4, data: "2026-08-04", atividade: "Colheita (derriça)", local: "Baixada", valor: 130 },
  { id: 20, funcionarioId: 9, data: "2026-08-03", atividade: "Rastelação e abanação", local: "Gleba Norte", valor: 130 },
  { id: 21, funcionarioId: 10, data: "2026-08-03", atividade: "Colheita (derriça)", local: "Gleba Sul", valor: 140 },
  { id: 22, funcionarioId: 5, data: "2026-08-01", atividade: "Colheita (derriça)", local: "Baixada", valor: 130 },
  { id: 23, funcionarioId: 3, data: "2026-08-01", atividade: "Colheita (derriça)", local: "Gleba Norte", valor: 130 },
  { id: 24, funcionarioId: 2, data: "2026-08-01", atividade: "Roçada mecanizada", local: "Gleba Sul", valor: 150 },
  { id: 25, funcionarioId: 6, data: "2026-08-01", atividade: "Tulha / beneficiamento", local: "Sede", valor: 120 },
]

/** Vales / adiantamentos — agosto/2026 */
export const vales: Vale[] = [
  { id: 1, funcionarioId: 7, data: "2026-08-04", valor: 200 },
  { id: 2, funcionarioId: 8, data: "2026-08-06", valor: 150 },
  { id: 3, funcionarioId: 10, data: "2026-08-08", valor: 100 },
  { id: 4, funcionarioId: 4, data: "2026-08-05", valor: 150 },
]

export function getFuncionario(id: number): Funcionario | undefined {
  return funcionarios.find((f) => f.id === id)
}

export function diariasDoFuncionario(id: number): Diaria[] {
  return diarias.filter((d) => d.funcionarioId === id)
}

export function valesDoFuncionario(id: number): number {
  return vales.filter((v) => v.funcionarioId === id).reduce((acc, v) => acc + v.valor, 0)
}
