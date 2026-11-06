import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

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

if (!Array.isArray(products) || products.length < 30) {
  errors.push(`expected at least 30 products, got ${products.length}`)
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
  if (product.fictional !== true) errors.push(`${product.id} must be marked fictional: true`)
  if (!categoryIds.has(product.category)) errors.push(`${product.id} unknown category ${product.category}`)
  if (!artIds.has(product.art)) errors.push(`${product.id} unknown art ${product.art}`)
  if (typeof product.priceTtc !== 'number' || product.priceTtc <= 0) errors.push(`${product.id} bad price`)
  if (product.vatRate !== 0.2) errors.push(`${product.id} vatRate must stay at the example rate 0.2`)
  if (product.fulfillment !== 'stock' && product.fulfillment !== 'partner') {
    errors.push(`${product.id} bad fulfillment`)
  }
  if (product.leadMin < 1 || product.leadMax < product.leadMin) errors.push(`${product.id} bad lead time`)
  if (!product.sku.startsWith('GLT-')) errors.push(`${product.id} sku must start with GLT-`)
  if (/d[eé]mo|demonstration|demostraci|dimostrazi|vorführung/i.test(JSON.stringify(product))) {
    errors.push(`${product.id} still contains a forbidden catalogue label`)
  }
  if (!product.oem.startsWith('EX-OEM-')) errors.push(`${product.id} oem must start with EX-OEM-`)
  loc(product.name, `${product.id}.name`)
  loc(product.summary, `${product.id}.summary`)
  loc(product.description, `${product.id}.description`)
  if (!Array.isArray(product.specs) || product.specs.length < 3) errors.push(`${product.id} needs specs`)
  for (const [index, spec] of product.specs.entries()) {
    loc(spec.label, `${product.id}.specs[${index}].label`)
    loc(spec.value, `${product.id}.specs[${index}].value`)
  }
  if (!Array.isArray(product.compatibility) || product.compatibility.length === 0) {
    errors.push(`${product.id} needs example compatibility`)
  }
  for (const fit of product.compatibility ?? []) {
    const make = vehicleById.get(fit.make)
    if (!make) {
      errors.push(`${product.id} unknown make ${fit.make}`)
      continue
    }
    const model = make.models.find((item) => item.id === fit.model)
    if (!model) {
      errors.push(`${product.id} unknown model ${fit.model}`)
      continue
    }
    const years = model.years
    if (fit.yearFrom < years[0] || fit.yearTo > years[years.length - 1] || fit.yearFrom > fit.yearTo) {
      errors.push(`${product.id} year range outside ${fit.model}`)
    }
    for (const engine of fit.engines) {
      if (!model.engines.some((item) => item.id === engine)) {
        errors.push(`${product.id} unknown engine ${engine} on ${fit.model}`)
      }
    }
  }
}

const best = products.filter((product) => product.bestSeller)
if (best.length < 6) errors.push('expected at least 6 bestsellers')

if (errors.length) {
  console.error(`Catalogue check failed (${errors.length})`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Catalogue OK: ${products.length} example products, ${vehicles.length} fictional makes.`)
