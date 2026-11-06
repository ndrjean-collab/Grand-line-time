/** Share taken off the lowest competitor price. 0.05 means the shelf price is 5% below that price. */
export const PRICE_DISCOUNT = 0.05

/**
 * Shelf price: lowest × (1 − PRICE_DISCOUNT), then the greatest amount
 * that ends in 9 cents and is not above that discounted figure.
 */
export function sellingPriceFromLowest(lowest) {
  if (!Number.isFinite(lowest) || lowest <= 0) return null
  const cap = lowest * (1 - PRICE_DISCOUNT)
  let cents = Math.floor(cap * 100 + 1e-8)
  const lastDigit = cents % 10
  cents = lastDigit === 9 ? cents : cents - lastDigit - 1
  if (cents <= 0) return null
  const price = cents / 100
  if (price > cap + 1e-9) return null
  return price
}

export function parseEuro(text) {
  if (typeof text === 'number' && Number.isFinite(text)) return text
  if (typeof text !== 'string') return null
  const match = text.replace(/\s/g, '').match(/(\d{1,5})[.,](\d{2})/)
  if (!match) return null
  const value = Number(`${match[1]}.${match[2]}`)
  return value > 0 && value < 5000 ? value : null
}
