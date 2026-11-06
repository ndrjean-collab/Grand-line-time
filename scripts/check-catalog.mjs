import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PRICE_DISCOUNT, sellingPriceFromLowest } from './price-utils.mjs'

const root = resolve(import.meta.dirname, '..')
const products = JSON.parse(readFileSync(resolve(root, 'src/data/products.json'), 'utf8'))
const vehicles = JSON.parse(readFileSync(resolve(root, 'src/data/vehicles.json'), 'utf8'))
const categories = JSON.parse(readFileSync(resolve(root, 'src/data/categories.json'), 'utf8'))
const arts = JSON.parse(readFileSync(resolve(root, 'src/data/arts.json'), 'utf8'))
const glyphSource = readFileSync(resolve(root, 'src/components/PartArt.tsx'), 'utf8')

const locales = ['fr', 'en', 'de', 'es', 'it']
const errors = []

function loc(value, path) {
  if (!value || typeof value !== 'object') {
    errors.push(`${path} is not a localized object`)
    return
  }
  for (const locale of locales) {
    if (typeof value[locale] !== 'string' || value[locale].trim() === '') {
      errors.push(`${path}.${locale} is missing`)
    }
  }
}

const priceFile = JSON.parse(readFileSync(resolve(root, 'src/data/price-sources.json'), 'utf8'))
const imageFile = JSON.parse(readFileSync(resolve(root, 'src/data/image-sources.json'), 'utf8'))
const imageById = new Map((imageFile.parts ?? []).map((part) => [part.id, part]))
const blockedImageHosts = ['oscaro.', 'autodoc.', 'mister-auto.', 'amazon.', 'carmino.', 'partauto.']
const sourceById = new Map((priceFile.parts ?? []).map((part) => [part.id, part]))

if (!Array.isArray(products) || products.length < 180) {
  errors.push(`expected at least 180 products, got ${products.length}`)
}

const categoryIds = new Set(categories.map((c) => c.id))
const artIds = new Set(arts)
const vehicleById = new Map(vehicles.map((v) => [v.id, v]))
const seen = { id: new Set(), slug: new Set(), sku: new Set(), oem: new Set() }

for (const art of arts) {
  const escaped = art.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const asCall = new RegExp(`\\b${escaped}\\s*\\(`).test(glyphSource)
  const asKey = glyphSource.includes(`'${art}'`) || glyphSource.includes(`"${art}"`)
  if (!asCall && !asKey) errors.push(`no glyph for art "${art}" in PartArt.tsx`)
}

for (const product of products) {
  for (const key of ['id', 'slug', 'sku', 'oem']) {
    if (!product[key] || seen[key].has(product[key])) errors.push(`duplicate or empty ${key}: ${product[key]}`)
    seen[key].add(product[key])
  }
  if (product.fictional !== false) errors.push(`${product.id} must be a real catalogue line`)
  if (product.fulfillment !== 'partner') errors.push(`${product.id} must be partner-fulfilled`)
  if (!categoryIds.has(product.category)) errors.push(`${product.id} unknown category ${product.category}`)
  if (!artIds.has(product.art)) errors.push(`${product.id} unknown art ${product.art}`)
  if (typeof product.priceTtc !== 'number' || product.priceTtc <= 0) errors.push(`${product.id} bad price`)
  if (product.vatRate !== 0.2) errors.push(`${product.id} vatRate must stay at 0.2`)
  if (product.leadMin < 1 || product.leadMax < product.leadMin) errors.push(`${product.id} bad lead time`)
  if (!product.mpn || !product.brand) errors.push(`${product.id} needs a manufacturer reference and brand`)
  if (!Array.isArray(product.oeNumbers)) errors.push(`${product.id} oeNumbers must be an array`)
  const source = sourceById.get(product.id)
  if (!source || !Array.isArray(source.offers) || source.offers.length < 1) {
    errors.push(`${product.id} has no stored public price source`)
  } else if (source.sellingPriceTtc !== product.priceTtc) {
    errors.push(`${product.id} price does not match the stored selling price`)
  } else if (sellingPriceFromLowest(source.lowestTtc) !== product.priceTtc) {
    errors.push(`${product.id} price is not ${PRICE_DISCOUNT * 100}% below the lowest offer`)
  } else if (!source.offers.every((offer) => offer.url && offer.priceTtc > 0)) {
    errors.push(`${product.id} has an offer without a url or price`)
  }
  if (/horizon|rivage|sommet|travers[eé]e/i.test(JSON.stringify(product))) {
    errors.push(`${product.id} still names a fictional make`)
  }
  loc(product.name, `${product.id}.name`)
  loc(product.summary, `${product.id}.summary`)
  loc(product.description, `${product.id}.description`)
  if (!Array.isArray(product.specs) || product.specs.length < 3) errors.push(`${product.id} needs specs`)
  for (const [index, spec] of product.specs.entries()) {
    loc(spec.label, `${product.id}.specs[${index}].label`)
    loc(spec.value, `${product.id}.specs[${index}].value`)
  }
  for (const fit of product.compatibility ?? []) {
    const make = vehicleById.get(fit.make)
    if (!make) {
      errors.push(`${product.id} unknown make ${fit.make}`)
      continue
    }
    const model = make.models.find((item) => item.id === fit.model)
    if (!model) errors.push(`${product.id} unknown model ${fit.model}`)
  }
  const photo = imageById.get(product.id)
  if (product.image) {
    if (!photo) errors.push(`${product.id} photo has no source record`)
    if (!product.image.startsWith('/photos/') || !product.image.endsWith('.webp')) {
      errors.push(`${product.id} photo must be a local WebP`)
    } else if (!existsSync(resolve(root, 'public', product.image.slice(1)))) {
      errors.push(`${product.id} photo file is missing`)
    }
  } else if (photo) {
    errors.push(`${product.id} has a source record but no image`)
  }
  if (photo) {
    let host = ''
    try {
      host = new URL(photo.sourceUrl).hostname.toLowerCase()
    } catch {
      errors.push(`${product.id} photo source URL is invalid`)
    }
    if (blockedImageHosts.some((part) => host.includes(part))) {
      errors.push(`${product.id} photo comes from a retailer`)
    }
    if (photo.file !== product.image) errors.push(`${product.id} photo path does not match the source record`)
    if (photo.mpn !== product.mpn || photo.brand !== product.brand) {
      errors.push(`${product.id} photo record does not match the part`)
    }
  }
}

if ((imageFile.parts ?? []).length !== imageById.size) errors.push('duplicate photo source records')
if (imageFile.withPhoto !== imageById.size) errors.push('photo count does not match the source file')

const best = products.filter((product) => product.bestSeller)
if (best.length < 6) errors.push('expected at least 6 bestsellers')

const forbiddenMakes = vehicles.filter((make) => /horizon|rivage|sommet|travers/i.test(`${make.id} ${make.name.fr}`))
if (forbiddenMakes.length) errors.push('fictional makes are still in vehicles.json')

if (errors.length) {
  console.error(`Catalogue check failed (${errors.length})`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Catalogue OK: ${products.length} priced parts, ${vehicles.length} makes named by source pages.`)
