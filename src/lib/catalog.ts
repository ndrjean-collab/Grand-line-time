import categoriesJson from '../data/categories.json'
import productsJson from '../data/products.json'
import vehiclesJson from '../data/vehicles.json'
import type { Category, Locale, Product, VehicleMake } from '../types'

export const products = productsJson as Product[]
export const vehicles = vehiclesJson as VehicleMake[]
export const categories = categoriesJson as Category[]

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name'
export type Avail = 'all' | 'stock' | 'partner'
export type PriceBand = 'all' | 'lt25' | '25-80' | '80-160' | 'gte160'

export interface CatalogQuery {
  category?: string
  q?: string
  make?: string
  model?: string
  year?: string
  engine?: string
  sort: SortKey
  avail: Avail
  price: PriceBand
}

const sorts = new Set<SortKey>(['featured', 'price-asc', 'price-desc', 'name'])
const avails = new Set<Avail>(['all', 'stock', 'partner'])
const bands = new Set<PriceBand>(['all', 'lt25', '25-80', '80-160', 'gte160'])

export function asSort(value: string | null): SortKey {
  return value && sorts.has(value as SortKey) ? (value as SortKey) : 'featured'
}

export function asAvail(value: string | null): Avail {
  return value && avails.has(value as Avail) ? (value as Avail) : 'all'
}

export function asPrice(value: string | null): PriceBand {
  return value && bands.has(value as PriceBand) ? (value as PriceBand) : 'all'
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

export function getCategory(id: string | undefined) {
  return categories.find((category) => category.id === id)
}

export function findMake(id?: string) {
  return vehicles.find((make) => make.id === id)
}

export function findModel(makeId?: string, modelId?: string) {
  return findMake(makeId)?.models.find((model) => model.id === modelId)
}

export function findEngine(makeId?: string, modelId?: string, engineId?: string) {
  return findModel(makeId, modelId)?.engines.find((engine) => engine.id === engineId)
}

function norm(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

function matchText(product: Product, q: string) {
  const needle = norm(q.trim())
  if (!needle) return true
  const haystack = [
    product.sku,
    product.mpn,
    product.brand,
    product.oem,
    ...(product.oeNumbers ?? []),
    product.slug,
    product.id,
    product.category,
    ...Object.values(product.name),
    ...Object.values(product.summary),
  ]
  return haystack.some((value) => norm(value).includes(needle))
}

function matchPrice(price: number, band: PriceBand) {
  if (band === 'lt25') return price < 25
  if (band === '25-80') return price >= 25 && price < 80
  if (band === '80-160') return price >= 80 && price < 160
  if (band === 'gte160') return price >= 160
  return true
}

function matchVehicle(product: Product, query: CatalogQuery) {
  if (!query.make) return true
  const year = query.year ? Number(query.year) : undefined
  return product.compatibility.some((fit) => {
    if (fit.make !== query.make) return false
    if (query.model && fit.model !== query.model) return false
    if (year !== undefined) {
      if (fit.yearFrom == null || fit.yearTo == null) return false
      if (!Number.isFinite(year) || year < fit.yearFrom || year > fit.yearTo) return false
    }
    if (query.engine && !(fit.engines ?? []).includes(query.engine)) return false
    return true
  })
}

export function queryProducts(query: CatalogQuery, locale: Locale) {
  const list = products.filter((product) => {
    if (query.category && product.category !== query.category) return false
    if (query.avail !== 'all' && product.fulfillment !== query.avail) return false
    if (!matchPrice(product.priceTtc, query.price)) return false
    if (query.q && !matchText(product, query.q)) return false
    if (!matchVehicle(product, query)) return false
    return true
  })

  const sorted = [...list]
  if (query.sort === 'price-asc') sorted.sort((a, b) => a.priceTtc - b.priceTtc || a.rank - b.rank)
  else if (query.sort === 'price-desc') sorted.sort((a, b) => b.priceTtc - a.priceTtc || a.rank - b.rank)
  else if (query.sort === 'name') sorted.sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale))
  else sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller) || a.rank - b.rank)
  return sorted
}

export function relatedProducts(product: Product) {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3)
}

export function bestSellers() {
  return products.filter((product) => product.bestSeller).sort((a, b) => a.rank - b.rank)
}

export function vehicleLabel(
  locale: Locale,
  makeId?: string,
  modelId?: string,
  year?: string,
  engineId?: string,
) {
  const make = findMake(makeId)
  if (!make) return ''
  const model = findModel(makeId, modelId)
  const engine = findEngine(makeId, modelId, engineId)
  return [make.name[locale], model?.name[locale], year, engine?.name[locale]].filter(Boolean).join(' · ')
}
