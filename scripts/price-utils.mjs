/** Lowest public EUR TTC price, rounded to the nearest price ending in 9 cents. */
export function sellingPriceFromLowest(amount) {
  if (!Number.isFinite(amount) || amount <= 0) return null
  const tenths = Math.round(amount * 10) / 10
  const value = Math.round((tenths - 0.01) * 100) / 100
  return value > 0 ? value : Math.round(amount * 100) / 100
}

export function parseEuro(text) {
  if (typeof text === 'number' && Number.isFinite(text)) return text
  if (typeof text !== 'string') return null
  const match = text.replace(/\s/g, '').match(/(\d{1,5})[.,](\d{2})/)
  if (!match) return null
  const value = Number(`${match[1]}.${match[2]}`)
  return value > 0 && value < 5000 ? value : null
}
