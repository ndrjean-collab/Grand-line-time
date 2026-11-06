import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PRICE_DISCOUNT, sellingPriceFromLowest } from './price-utils.mjs'

const root = resolve(import.meta.dirname, '..')
const today = new Date().toISOString().slice(0, 10)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
const PER_CATEGORY = 18
const DELAY_MS = 400

const seeds = [
  ['https://www.carmino.fr/c/freinage-1050', 'freinage'],
  ['https://www.carmino.fr/c/jeu-4-plaquettes-frein-avant-1053', 'freinage'],
  ['https://www.carmino.fr/c/jeu-4-plaquettes-frein-arriere-1057', 'freinage'],
  ['https://www.carmino.fr/c/jeu-2-disques-frein-avant-1052', 'freinage'],
  ['https://www.carmino.fr/c/jeu-2-disques-frein-arriere-1056', 'freinage'],
  ['https://www.carmino.fr/c/etrier-frein-1054', 'freinage'],
  ['https://www.carmino.fr/c/systeme-freinage-1075', 'freinage'],
  ['https://www.carmino.fr/c/filtres-1642', 'filtration'],
  ['https://www.carmino.fr/c/filtre-huile-1645', 'filtration'],
  ['https://www.carmino.fr/c/pieces-moteur-1238', 'moteur'],
  ['https://www.carmino.fr/c/distribution-accessoires-courroies-1239', 'moteur'],
  ['https://www.carmino.fr/c/allumage-prechauffage-1259', 'moteur'],
  ['https://www.carmino.fr/c/suspension-direction-train-1101', 'suspension'],
  ['https://www.carmino.fr/c/amortissement-1102', 'suspension'],
  ['https://www.carmino.fr/c/liaison-au-sol-1117', 'suspension'],
  ['https://www.carmino.fr/c/optique-feu-1734', 'eclairage'],
  ['https://www.carmino.fr/c/ampoule-1542', 'eclairage'],
  ['https://www.carmino.fr/c/carrosserie-habitacle-1719', 'carrosserie'],
  ['https://www.carmino.fr/c/electricite-1511', 'electricite'],
  ['https://www.carmino.fr/c/alternateur-1512', 'electricite'],
  ['https://www.carmino.fr/c/equipement-electrique-1523', 'electricite'],
  ['https://www.carmino.fr/c/transmission-boite-1181', 'embrayage'],
  ['https://www.carmino.fr/c/boite-de-vitesses-transfert-1182', 'embrayage'],
  ['https://www.carmino.fr/c/echappement-1654', 'echappement'],
  ['https://www.carmino.fr/c/elements-principaux-echappement-1655', 'echappement'],
  ['https://www.carmino.fr/c/systeme-refroidissement-1679', 'refroidissement'],
  ['https://www.carmino.fr/c/radiateur-1680', 'refroidissement'],
  ['https://www.carmino.fr/c/huiles-liquides-entretien-2087', 'huiles'],
  ['https://www.carmino.fr/c/huile-moteur-2088', 'huiles'],
  ['https://www.carmino.fr/c/liquide-de-frein-2160', 'huiles'],
  ['https://www.carmino.fr/c/liquide-de-refroidissement-2161', 'huiles'],
  ['https://www.carmino.fr/c/systeme-essuyage-1720', 'accessoires'],
]

const priorityBrand = /bosch|brembo|valeo|trw|ate\b|mann|mahle|ngk|sachs|luk|monroe|skf|gates|varta|febi|delphi|textar|ferodo|hella|osram|philips|continental|lemforder|lemförder|meyle|filtron|purflux|nk\b|zimmermann|jurid|magneti|pierburg|dayco|contitech|ina\b|fag\b|blue print|blueprint/i

const sleep = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms))

async function get(url) {
  await sleep(DELAY_MS)
  const response = await fetch(url, {
    headers: { 'User-Agent': UA, 'Accept-Language': 'fr-FR,fr;q=0.9', Accept: 'text/html' },
    redirect: 'follow',
  })
  const html = await response.text()
  return { status: response.status, html, url: response.url }
}

function decode(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseCards(html) {
  const cards = []
  for (const chunk of html.split('class="productItemForStock"').slice(1)) {
    const slice = chunk.slice(0, 2200)
    const url = slice.match(/https:\/\/www\.carmino\.fr\/p\/[^"']+/)
    const ref = slice.match(/class="refProduct">Ref(?:&nbsp;|\s)*:(?:&nbsp;|\s)*([^<]+)/)
    const price = slice.match(/(\d{1,4},\d{2})\s*(?:€|\u20ac)/)
    const brand = slice.match(/manufacturer_default[^>]*alt="([^"]+)"/) || slice.match(/alt="([A-Z][A-Z0-9 .&+\-]{1,32})"/)
    if (!url || !ref || !price) continue
    cards.push({
      url: url[0],
      mpn: decode(ref[1]),
      listPrice: Number(price[1].replace(',', '.')),
      brand: brand ? decode(brand[1]) : '',
    })
  }
  return cards
}

function childLinks(html) {
  return [...new Set([...html.matchAll(/href="(?:https:\/\/www\.carmino\.fr)?(\/c\/[^"#?]+)"/g)].map((match) => match[1]))]
}

function brandLinks(html) {
  return [...new Set([...html.matchAll(/href="((?:https:\/\/www\.carmino\.fr)?\/e\/[^"#?]+)"/g)].map((match) =>
    match[1].startsWith('http') ? match[1] : `https://www.carmino.fr${match[1]}`,
  ))].filter((href) => priorityBrand.test(href))
}

function jsonLdProduct(html) {
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(match[1])
      if (data && data['@type'] === 'Product' && data.offers) return data
    } catch {
      /* ignore broken blocks */
    }
  }
  return null
}

function specsFrom(html) {
  const start = html.indexOf('Caractéristiques techniques')
  if (start < 0) return []
  const slice = html.slice(start, start + 6000)
  const rows = []
  for (const match of slice.matchAll(/<div>([^<:]{2,80})\s*:\s*<strong>([^<]+)<\/strong><\/div>/g)) {
    const label = decode(match[1])
    const value = decode(match[2])
    if (label && value) rows.push({ label, value })
    if (rows.length >= 5) break
  }
  return rows
}

function oeFrom(html) {
  const start = html.indexOf('id="refConstruct"')
  if (start < 0) return []
  const slice = html.slice(start, start + 80000)
  const numbers = []
  for (const match of slice.matchAll(/\/oem\/[^"]+">([^<]+)</g)) {
    const value = decode(match[1])
    if (value && !numbers.includes(value)) numbers.push(value)
    if (numbers.length >= 12) break
  }
  return numbers
}

function fitmentFrom(html) {
  const start = html.indexOf('<div class="infoSection" id="assembleOn">')
  if (start < 0) return []
  const slice = html.slice(start, start + 120000)
  const lines = []
  let make = ''
  for (const match of slice.matchAll(/<span class="fatFont">([^<]+)<\/span>|<div>\s*([^<]{2,120}?)\s*\|/g)) {
    if (match[1]) {
      make = decode(match[1])
      continue
    }
    const raw = decode(match[2] || '')
    if (!make || !raw) continue
    const model = raw.replace(/\s+-\s+[A-Z0-9_]{1,6}\s*$/i, '').replace(/\s+-\s*$/, '').trim()
    if (!model || model.length < 2) continue
    const key = `${make}|${model}`
    if (lines.some((line) => line.key === key)) continue
    lines.push({ key, make, model, detail: raw })
    if (lines.length >= 24) break
  }
  return lines.map(({ make, model, detail }) => ({ make, model, detail }))
}

function artFor(category, name) {
  const text = name.toLowerCase()
  if (category === 'freinage') {
    if (text.includes('plaquette')) return 'pads'
    if (text.includes('flexible') || text.includes('durite')) return 'hose'
    return 'disc'
  }
  if (category === 'filtration') {
    if (text.includes('habitacle') || text.includes('pollen')) return 'cabin-filter'
    if (text.includes('carburant') || text.includes('gazole') || text.includes('essence')) return 'fuel-filter'
    if (text.includes('air') && !text.includes('huile')) return 'cabin-filter'
    return 'oil-filter'
  }
  if (category === 'moteur') {
    if (text.includes('bougie')) return 'spark'
    if (text.includes('support')) return 'mount'
    return 'timing'
  }
  if (category === 'suspension') {
    if (text.includes('bras')) return 'arm'
    if (text.includes('rotule')) return 'balljoint'
    return 'shock'
  }
  if (category === 'eclairage') return text.includes('arri') ? 'taillamp' : 'headlamp'
  if (category === 'carrosserie') return text.includes('rétro') || text.includes('retro') ? 'mirror' : 'bumper'
  if (category === 'electricite') {
    if (text.includes('batter')) return 'battery'
    if (text.includes('démar') || text.includes('demar')) return 'starter'
    return 'alternator'
  }
  if (category === 'embrayage') return text.includes('volant') ? 'flywheel' : 'clutch'
  if (category === 'echappement') return text.includes('sonde') || text.includes('lambda') ? 'lambda' : 'muffler'
  if (category === 'refroidissement') return text.includes('thermostat') ? 'thermostat' : 'radiator'
  if (category === 'huiles') {
    if (text.includes('frein')) return 'brake-fluid'
    if (text.includes('refroid')) return 'coolant'
    return 'oil'
  }
  return text.includes('tapis') ? 'mat' : 'wiper'
}

const labelEn = {
  Hauteur: 'Height',
  'Diamètre extérieur': 'Outside diameter',
  'Diamètre': 'Diameter',
  Longueur: 'Length',
  Largeur: 'Width',
  Épaisseur: 'Thickness',
  'Épaisseur du disque de frein': 'Disc thickness',
  'Épaisseur minimum': 'Minimum thickness',
  Filetage: 'Thread',
  'Type de filtre': 'Filter type',
  'Type de disque de frein': 'Disc type',
  Quantité: 'Quantity',
  'Nombre de trous': 'Number of holes',
  Viscosité: 'Viscosity',
  Contenance: 'Volume',
  Tension: 'Voltage',
  Capacité: 'Capacity',
}

function L(fr, en, de, es, it) {
  return { fr, en, de, es, it }
}

function specL10n(label, value) {
  const en = labelEn[label] || label
  return {
    label: L(label, en, label, label, label),
    value: L(value, value, value, value, value),
  }
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function titles(frenchName, brand, mpn, category) {
  const cat = {
    freinage: ['Freinage', 'Braking', 'Bremsen', 'Frenado', 'Freni'],
    filtration: ['Filtration', 'Filtration', 'Filtration', 'Filtración', 'Filtrazione'],
    moteur: ['Moteur', 'Engine', 'Motor', 'Motor', 'Motore'],
    suspension: ['Suspension', 'Suspension', 'Fahrwerk', 'Suspensión', 'Sospensioni'],
    eclairage: ['Éclairage', 'Lighting', 'Beleuchtung', 'Iluminación', 'Illuminazione'],
    carrosserie: ['Carrosserie', 'Body', 'Karosserie', 'Carrocería', 'Carrozzeria'],
    electricite: ['Électricité', 'Electrical', 'Elektrik', 'Electricidad', 'Elettricità'],
    embrayage: ['Embrayage', 'Clutch', 'Kupplung', 'Embrague', 'Frizione'],
    echappement: ['Échappement', 'Exhaust', 'Auspuff', 'Escape', 'Scarico'],
    refroidissement: ['Refroidissement', 'Cooling', 'Kühlung', 'Refrigeración', 'Raffreddamento'],
    huiles: ['Huiles et liquides', 'Oils and fluids', 'Öle und Flüssigkeiten', 'Aceites y líquidos', 'Oli e liquidi'],
    accessoires: ['Accessoires', 'Accessories', 'Zubehör', 'Accesorios', 'Accessori'],
  }[category]
  const ref = `${brand} ${mpn}`.trim()
  return L(
    frenchName.includes(brand) ? frenchName : `${frenchName} — ${ref}`,
    `${cat[1]} — ${ref}`,
    `${cat[2]} — ${ref}`,
    `${cat[3]} — ${ref}`,
    `${cat[4]} — ${ref}`,
  )
}

const discovered = []
const seenCategoryUrls = new Set()

for (const [url, category] of seeds) {
  if (seenCategoryUrls.has(url)) continue
  seenCategoryUrls.add(url)
  discovered.push({ url, category, priority: false })
}

console.log(`Fetching ${discovered.length} seed categories`)
const queue = [...discovered]
const cardsByCategory = new Map()

while (queue.length && seenCategoryUrls.size < 70) {
  const item = queue.shift()
  let page
  try {
    page = await get(item.url)
  } catch (error) {
    console.log('fail', item.url, error.message)
    continue
  }
  if (page.status !== 200) {
    console.log('status', page.status, item.url)
    continue
  }
  const cards = parseCards(page.html).map((card) => ({ ...card, category: item.category }))
  const bucket = cardsByCategory.get(item.category) || []
  bucket.push(...cards)
  cardsByCategory.set(item.category, bucket)
  console.log(item.category, cards.length, item.url)
  if (item.priority) continue
  for (const href of brandLinks(page.html).slice(0, 3)) {
    if (seenCategoryUrls.has(href)) continue
    seenCategoryUrls.add(href)
    queue.push({ url: href, category: item.category, priority: true })
  }
}

const chosen = []
const seenMpn = new Set()
for (const [category, cards] of cardsByCategory) {
  const unique = []
  const sorted = [...cards].sort((a, b) => Number(priorityBrand.test(b.brand)) - Number(priorityBrand.test(a.brand)))
  for (const card of sorted) {
    const key = card.mpn.toUpperCase().replace(/\s+/g, '')
    if (!key || seenMpn.has(key)) continue
    seenMpn.add(key)
    unique.push(card)
    if (unique.length >= PER_CATEGORY) break
  }
  chosen.push(...unique)
  console.log('chosen', category, unique.length)
}

console.log('Fetching', chosen.length, 'product pages')
const products = []
const sources = []
const vehicleMap = new Map()
let index = 1

for (const card of chosen) {
  let page
  try {
    page = await get(card.url)
  } catch (error) {
    console.log('product fail', card.mpn, error.message)
    continue
  }
  if (page.status !== 200) continue
  const linked = jsonLdProduct(page.html)
  const price = linked?.offers?.price ? Number(linked.offers.price) : card.listPrice
  if (!Number.isFinite(price) || price <= 0) {
    console.log('no price', card.mpn)
    continue
  }
  const brand = linked?.brand?.name || card.brand || 'Marque'
  const mpn = String(linked?.mpn || card.mpn).trim()
  const frenchName = String(linked?.name || 'Pièce automobile').trim()
  const specs = specsFrom(page.html)
  if (specs.length < 3) {
    specs.push({ label: 'Marque', value: brand })
    specs.push({ label: 'Référence fabricant', value: mpn })
    specs.push({ label: 'État', value: 'Neuf' })
  }
  const oeNumbers = oeFrom(page.html)
  const fitment = fitmentFrom(page.html)
  const art = artFor(card.category, `${frenchName} ${mpn}`)
  const id = `glt-${String(index).padStart(4, '0')}`
  const selling = sellingPriceFromLowest(price)
  const name = titles(frenchName, brand, mpn, card.category)
  const summary = L(
    `${brand} ${mpn}. Prix public relevé le ${today}.`,
    `${brand} ${mpn}. Public price checked on ${today}.`,
    `${brand} ${mpn}. Öffentlicher Preis geprüft am ${today}.`,
    `${brand} ${mpn}. Precio público comprobado el ${today}.`,
    `${brand} ${mpn}. Prezzo pubblico verificato il ${today}.`,
  )
  const fitText = fitment.length
    ? L(
        'Les véhicules cités sont ceux écrits sur la page source pour cette référence.',
        'The vehicles listed are those written on the source page for this part number.',
        'Die genannten Fahrzeuge stehen so auf der Quellseite dieser Referenz.',
        'Los vehículos citados son los escritos en la página de origen para esta referencia.',
        'I veicoli indicati sono quelli scritti nella pagina di origine per questo riferimento.',
      )
    : L(
        "Vérifiez la compatibilité avec votre référence d'origine / immatriculation.",
        'Check compatibility with your original part number or registration.',
        'Prüfen Sie die Passform mit Ihrer Originalnummer oder dem Kennzeichen.',
        'Compruebe la compatibilidad con su referencia de origen o matrícula.',
        'Verificate la compatibilità con il riferimento originale o la targa.',
      )
  const description = L(
    `${frenchName} ${brand}, référence ${mpn}. ${fitText.fr}`,
    `${brand} part, reference ${mpn}. ${fitText.en}`,
    `${brand}, Referenz ${mpn}. ${fitText.de}`,
    `Pieza ${brand}, referencia ${mpn}. ${fitText.es}`,
    `Ricambio ${brand}, riferimento ${mpn}. ${fitText.it}`,
  )
  for (const line of fitment) {
    const makeId = slugify(line.make)
    const modelId = slugify(line.model)
    if (!vehicleMap.has(makeId)) vehicleMap.set(makeId, { id: makeId, name: line.make, models: new Map() })
    vehicleMap.get(makeId).models.set(modelId, line.model)
  }
  products.push({
    id,
    slug: slugify(`${frenchName}-${brand}-${mpn}`) || id,
    sku: mpn,
    mpn,
    brand,
    oeNumbers,
    oem: oeNumbers[0] || mpn,
    fictional: false,
    category: card.category,
    art,
    priceTtc: selling,
    vatRate: 0.2,
    fulfillment: 'partner',
    leadMin: 3,
    leadMax: 6,
    bestSeller: false,
    rank: index,
    name,
    summary,
    description,
    specs: specs.slice(0, 5).map((spec) => specL10n(spec.label, spec.value)),
    compatibility: fitment.map((line) => ({
      make: slugify(line.make),
      model: slugify(line.model),
      detail: line.detail,
    })),
  })
  sources.push({
    id,
    mpn,
    brand,
    checkedOn: today,
    offers: [
      {
        seller: 'Carmino',
        url: card.url,
        priceTtc: Math.round(price * 100) / 100,
        currency: 'EUR',
        vatIncluded: true,
      },
    ],
    lowestTtc: Math.round(price * 100) / 100,
    sellingPriceTtc: selling,
  })
  console.log(index, card.category, brand, mpn, price, '->', selling, 'fit', fitment.length, 'oe', oeNumbers.length)
  index += 1
}

const counts = {}
for (const product of products) counts[product.category] = (counts[product.category] || 0) + 1
let bestRank = 1
for (const category of Object.keys(counts)) {
  const first = products.find((product) => product.category === category)
  if (first) {
    first.bestSeller = true
    first.rank = bestRank
    bestRank += 1
  }
}

const vehicles = [...vehicleMap.values()]
  .map((make) => ({
    id: make.id,
    name: { fr: make.name, en: make.name, de: make.name, es: make.name, it: make.name },
    models: [...make.models.entries()].map(([id, name]) => ({
      id,
      name: { fr: name, en: name, de: name, es: name, it: name },
      years: [],
      engines: [],
    })),
  }))
  .sort((a, b) => a.name.fr.localeCompare(b.name.fr, 'fr'))

const priceSources = {
  checkedOn: today,
  currency: 'EUR',
  vatIncluded: true,
  sellingPriceRule: `Lowest observed public TTC price minus ${PRICE_DISCOUNT * 100}%, then rounded down to a price ending in 9 cents, never above that discounted amount.`,
  sites: {
    carmino: 'Product pages returned a public EUR TTC price, specifications and, when present, stated fitment.',
    oscaro: 'Blocked: HTTP 403 Cloudflare challenge.',
    'mister-auto': 'Blocked: HTTP 403 Cloudflare challenge.',
    autodoc: 'Blocked or unreachable from this network (connection failure or HTTP 403).',
    'amazon-fr': 'Blocked: HTTP 503.',
    idealo: 'Blocked: HTTP 403.',
    norauto: 'Blocked: HTTP 403.',
  },
  parts: sources,
}

writeFileSync(resolve(root, 'src/data/products.json'), `${JSON.stringify(products, null, 2)}\n`)
writeFileSync(resolve(root, 'src/data/vehicles.json'), `${JSON.stringify(vehicles, null, 2)}\n`)
writeFileSync(resolve(root, 'src/data/price-sources.json'), `${JSON.stringify(priceSources, null, 2)}\n`)
console.log('WROTE', products.length, counts)
