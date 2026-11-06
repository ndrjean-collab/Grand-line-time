import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PRICE_DISCOUNT, sellingPriceFromLowest } from './price-utils.mjs'

const root = resolve(import.meta.dirname, '..')
const today = new Date().toISOString().slice(0, 10)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms))

function priceFromHtml(html) {
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(match[1])
      const amount = Number(data?.offers?.price)
      if (Number.isFinite(amount) && amount > 0) return amount
    } catch {
      /* keep looking */
    }
  }
  return null
}

const products = JSON.parse(readFileSync(resolve(root, 'src/data/products.json'), 'utf8'))
const sources = JSON.parse(readFileSync(resolve(root, 'src/data/price-sources.json'), 'utf8'))
const byId = new Map(products.map((product) => [product.id, product]))
let updated = 0
let failed = 0

for (const part of sources.parts ?? []) {
  const prices = []
  for (const offer of part.offers ?? []) {
    await sleep(400)
    try {
      const response = await fetch(offer.url, {
        headers: { 'User-Agent': UA, 'Accept-Language': 'fr-FR,fr;q=0.9' },
      })
      if (!response.ok) {
        offer.error = `HTTP ${response.status}`
        failed += 1
        if (offer.priceTtc > 0) prices.push(offer.priceTtc)
        continue
      }
      const amount = priceFromHtml(await response.text())
      if (!amount) {
        offer.error = 'price not found'
        failed += 1
        if (offer.priceTtc > 0) prices.push(offer.priceTtc)
        continue
      }
      offer.priceTtc = Math.round(amount * 100) / 100
      offer.checkedOn = today
      delete offer.error
      prices.push(offer.priceTtc)
      updated += 1
      console.log(part.mpn, offer.seller, offer.priceTtc)
    } catch (error) {
      offer.error = error.message
      failed += 1
      if (offer.priceTtc > 0) prices.push(offer.priceTtc)
    }
  }
  if (!prices.length) continue
  const lowest = Math.min(...prices)
  const cap = lowest * (1 - PRICE_DISCOUNT)
  const selling = sellingPriceFromLowest(lowest)
  if (selling != null && selling > cap + 1e-9) {
    throw new Error(`${part.mpn}: selling price ${selling} is above ${cap}`)
  }
  part.lowestTtc = Math.round(lowest * 100) / 100
  part.sellingPriceTtc = selling
  part.checkedOn = today
  const product = byId.get(part.id)
  if (product && selling) product.priceTtc = selling
}

sources.checkedOn = today
writeFileSync(resolve(root, 'src/data/price-sources.json'), `${JSON.stringify(sources, null, 2)}\n`)
writeFileSync(resolve(root, 'src/data/products.json'), `${JSON.stringify(products, null, 2)}\n`)
console.log(`Refresh done. Updated ${updated} offers, kept previous price after ${failed} failures.`)
