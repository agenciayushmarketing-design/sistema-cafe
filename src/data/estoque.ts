import type { ItemEstoque } from "./types"

export const estoque: ItemEstoque[] = [
  { id: "npk-20", nome: "NPK 20-05-20", categoria: "Fertilizante", unidade: "sacos 50 kg", saldo: 18, minimo: 30 },
  { id: "npk-25", nome: "NPK 25-00-25", categoria: "Fertilizante", unidade: "sacos 50 kg", saldo: 64, minimo: 25 },
  { id: "calcario", nome: "Calcário dolomítico", categoria: "Fertilizante", unidade: "t", saldo: 12, minimo: 5 },
  { id: "boro", nome: "Ácido bórico", categoria: "Fertilizante", unidade: "kg", saldo: 85, minimo: 40 },
  { id: "organico", nome: "Adubo orgânico (cama de frango)", categoria: "Fertilizante", unidade: "t", saldo: 8, minimo: 4 },
  { id: "fungicida", nome: "Fungicida cúprico (oxicloreto de cobre)", categoria: "Defensivo", unidade: "kg", saldo: 46, minimo: 20 },
  { id: "inseticida", nome: "Inseticida p/ broca-do-café", categoria: "Defensivo", unidade: "L", saldo: 14, minimo: 10 },
  { id: "herbicida", nome: "Herbicida glifosato", categoria: "Defensivo", unidade: "L", saldo: 38, minimo: 25 },
  { id: "espalhante", nome: "Espalhante adesivo", categoria: "Defensivo", unidade: "L", saldo: 9, minimo: 5 },
  { id: "diesel", nome: "Óleo diesel S500", categoria: "Combustível", unidade: "L", saldo: 340, minimo: 500 },
  { id: "gasolina", nome: "Gasolina comum (roçadeiras)", categoria: "Combustível", unidade: "L", saldo: 55, minimo: 30 },
  { id: "sacaria", nome: "Sacaria de juta 60 kg", categoria: "Sacaria", unidade: "unidades", saldo: 120, minimo: 400 },
  { id: "big-bag", nome: "Big bag 1.200 L", categoria: "Sacaria", unidade: "unidades", saldo: 26, minimo: 15 },
]

export const itensAbaixoMinimo = estoque.filter((i) => i.saldo <= i.minimo)
