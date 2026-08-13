const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
})

const brlCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

const num = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 })

export function formatBRL(value: number, cents = false): string {
  return cents ? brlCents.format(value) : brl.format(value)
}

export function formatNumber(value: number, decimals = 0): string {
  if (decimals > 0) {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }
  return num.format(value)
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

export function formatDateShort(iso: string): string {
  const [, m, d] = iso.split("-")
  return `${d}/${m}`
}
