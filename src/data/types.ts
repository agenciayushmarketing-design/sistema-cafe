export interface LancamentoColheita {
  id: number
  data: string
  litros: number
  sacas: number
  funcionario: string
  local?: string
}

export type CategoriaInsumo = "Fertilizante" | "Defensivo" | "Combustível" | "Sacaria"

export interface ItemEstoque {
  id: string
  nome: string
  categoria: CategoriaInsumo
  unidade: string
  saldo: number
  minimo: number
}

export type StatusConta =
  | "Pago"
  | "Em aberto"
  | "Atrasado"
  | "Recebido"
  | "A receber"
  | "Aguardando depósito"

export interface Conta {
  id: number
  descricao: string
  contraparte: string
  vencimento: string
  valor: number
  status: StatusConta
  categoria: string
}

export type CategoriaCusto =
  | "Insumos"
  | "Mão de obra"
  | "Combustível"
  | "Manutenção"
  | "Benfeitorias"
  | "Despesas fixas"
  | "Diversas"

export interface LancamentoCusteio {
  id: number
  data: string
  lancamento: string
  valor: number
  categoria: CategoriaCusto
  /** Benfeitorias são investimento — ficam fora do custo/saca */
  investimento?: boolean
}

export interface Funcionario {
  id: number
  nome: string
  funcao: string
  tipo: "Fixo" | "Safrista"
  admissao: string
  cpf: string
}

export interface Diaria {
  id: number
  funcionarioId: number
  data: string
  atividade: string
  local?: string
  valor: number
}

export interface Vale {
  id: number
  funcionarioId: number
  data: string
  valor: number
}

export interface Aplicacao {
  id: number
  data: string
  tipo: "Adubação" | "Pulverização"
  produtoId: string
  produto: string
  dosePorHa: string
  quantidadeUsada: number
  unidade: string
  responsavel: string
  local?: string
}

export interface Venda {
  id: number
  data: string
  padrao: string
  sacas: number
  precoSaca: number
  comprador: string
  dataDeposito: string
  status: "Recebido" | "Aguardando depósito"
}

export interface EstoqueCafePadrao {
  padrao: string
  sacas: number
}

export interface MovimentacaoCafe {
  id: number
  data: string
  tipo: "Entrada" | "Saída"
  descricao: string
  sacas: number
  saldoApos: number
}
