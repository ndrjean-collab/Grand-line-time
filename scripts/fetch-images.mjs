/**
 * Download official manufacturer product photos for the catalogue.
 *
 * Only the brand's own site or catalogue is used. Retailer photos
 * (Oscaro, Autodoc, Mister-Auto, Amazon, Carmino, and similar) are refused.
 * Images are stored in the repo as WebP, longest edge at most 800px.
 * Parts with no official image keep the category illustration.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const photoDir = resolve(root, 'public/photos')
const MAX_EDGE = 800
const MIN_EDGE = 280
const DELAY_MS = 350
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

const BLOCKED_HOSTS = [
  'oscaro.',
  'autodoc.',
  'mister-auto.',
  'amazon.',
  'carmino.',
  'partauto.',
  'ebay.',
  'cdiscount.',
  'manomano.',
  'daparto.',
  'pkwteile.',
  'norauto.',
]

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms))
}

function compact(value) {
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '')
}

function hostAllowed(url, suffixes) {
  const host = new URL(url).hostname.toLowerCase()
  if (BLOCKED_HOSTS.some((part) => host.includes(part))) return false
  return suffixes.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))
}

async function fetchUrl(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: '*/*' },
    redirect: 'follow',
    signal: AbortSignal.timeout(25000),
  })
  return response
}

async function bosch(product) {
  if (product.brand !== 'BOSCH') return null
  const number = product.mpn.replace(/\s+/g, '')
  if (!number) return null
  const folder = `${number}PDANWHCO0000`
  const pageUrl = `https://emea.resource.bosch.com/AA/internet/enfinity/img/products/${folder}/index.html`
  const sourceUrl = `https://emea.resource.bosch.com/AA/internet/enfinity/img/products/${folder}/images/img_0_0_0.jpg`
  const page = await fetchUrl(pageUrl)
  await sleep(DELAY_MS)
  if (!page.ok) return null
  const html = await page.text()
  if (!html.includes(`${number}_out.xml`) && !html.includes(number)) return null
  return { sourceUrl, pageUrl, hosts: ['emea.resource.bosch.com'] }
}

async function skf(product) {
  if (product.brand !== 'SKF') return null
  const number = compact(product.mpn)
  const pageUrl = `https://www.skfvertevo.com/lam/en/product-catalogue/${number}`
  const page = await fetchUrl(pageUrl)
  await sleep(DELAY_MS)
  if (!page.ok) return null
  const html = await page.text()
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  for (const block of blocks) {
    let data
    try {
      data = JSON.parse(block[1])
    } catch {
      continue
    }
    const items = Array.isArray(data) ? data : [data]
    for (const item of items) {
      if (!item || item['@type'] !== 'Product') continue
      if (compact(item.sku || '') !== number) continue
      const images = (Array.isArray(item.image) ? item.image : [item.image]).filter((url) => typeof url === 'string')
      const sourceUrl = images.find((url) => compact(url).includes(number))
      if (!sourceUrl) return null
      return { sourceUrl, pageUrl, hosts: ['skfvertevo.com', 'skf.com'] }
    }
  }
  return null
}

async function febi(product) {
  if (product.brand !== 'FEBI BILSTEIN') return null
  const number = product.mpn.trim()
  const pageUrl = `https://partsfinder.bilsteingroup.com/en/article/febi/${encodeURIComponent(number)}`
  const page = await fetchUrl(pageUrl)
  await sleep(DELAY_MS)
  if (!page.ok) return null
  const html = (await page.text()).replace(/&quot;/g, '"')
  const blocks = html.matchAll(/"imageNames"\s*:\s*\[(.*?)\]\s*,\s*"imageCount"\s*:\s*\d+\s*,\s*"brandId"\s*:\s*(\d+)/g)
  for (const block of blocks) {
    const file = [...block[1].matchAll(/"([^"]+)"/g)]
      .map((match) => match[1])
      .find((name) => name.startsWith(`${number}_`) || name.startsWith(`${number}.`))
    if (!file) continue
    const sourceUrl = `https://cdn.partsfinder.bilsteingroup.com/pf-article-zoomed/${block[2]}/${file}`
    return { sourceUrl, pageUrl, hosts: ['bilsteingroup.com'] }
  }
  return null
}

async function purflux(product) {
  if (product.brand !== 'PURFLUX') return null
  const ref = product.mpn.trim()
  const pageUrl = `http://www.purfluxgroupcatalog.com/catalogues/FO/scripts/cat_fich_filtre.php?zone=FR&catalogue=PFX&lang=GB&search=Yes&ref_filtre=${encodeURIComponent(ref)}&onglet=tabs-3`
  const page = await fetchUrl(pageUrl)
  await sleep(DELAY_MS)
  if (!page.ok) return null
  const html = await page.text()
  if (!html.includes(`photos_gd/PFX/${ref}.jpg`) && !html.includes(`photos/PFX/${ref}.jpg`)) return null
  const sourceUrl = `http://www.purfluxgroupcatalog.com/catalogues/import/photos_gd/PFX/${encodeURIComponent(ref)}.jpg`
  return { sourceUrl, pageUrl, hosts: ['purfluxgroupcatalog.com'] }
}

const resolvers = [bosch, skf, febi, purflux]

async function saveWebp(buffer, filePath) {
  const image = sharp(buffer, { failOn: 'error' })
  const meta = await image.metadata()
  if (!meta.width || !meta.height) throw new Error('no dimensions')
  if (Math.max(meta.width, meta.height) < MIN_EDGE) {
    throw new Error(`too small ${meta.width}x${meta.height}`)
  }
  const output = await image
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()
  const saved = await sharp(output).metadata()
  writeFileSync(filePath, output)
  return { width: saved.width, height: saved.height, bytes: output.length, sourceWidth: meta.width, sourceHeight: meta.height }
}

async function main() {
  const products = JSON.parse(readFileSync(resolve(root, 'src/data/products.json'), 'utf8'))
  mkdirSync(photoDir, { recursive: true })
  const found = []
  const missed = []

  for (const product of products) {
    delete product.image
    let located = null
    for (const resolveImage of resolvers) {
      try {
        located = await resolveImage(product)
      } catch (error) {
        console.log(`  ${product.id} ${product.brand} lookup failed: ${error.message}`)
        located = null
      }
      if (located) break
    }
    if (!located) {
      if (['BOSCH', 'SKF', 'FEBI BILSTEIN', 'PURFLUX'].includes(product.brand)) {
        missed.push(`${product.brand} ${product.mpn}`)
        console.log(`miss ${product.brand} ${product.mpn}`)
      }
      continue
    }
    if (!hostAllowed(located.sourceUrl, located.hosts) || !hostAllowed(located.pageUrl, located.hosts)) {
      console.log(`blocked host ${product.mpn} ${located.sourceUrl}`)
      continue
    }
    await sleep(DELAY_MS)
    try {
      const response = await fetchUrl(located.sourceUrl)
      const type = response.headers.get('content-type') || ''
      if (!response.ok || !type.startsWith('image/')) {
        throw new Error(`${response.status} ${type}`)
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      const fileName = `${product.id}.webp`
      const saved = await saveWebp(buffer, resolve(photoDir, fileName))
      product.image = `/photos/${fileName}`
      found.push({
        id: product.id,
        mpn: product.mpn,
        brand: product.brand,
        file: product.image,
        sourceUrl: located.sourceUrl,
        pageUrl: located.pageUrl,
        width: saved.width,
        height: saved.height,
        sourceWidth: saved.sourceWidth,
        sourceHeight: saved.sourceHeight,
      })
      console.log(`ok ${product.brand} ${product.mpn} ${saved.sourceWidth}x${saved.sourceHeight} -> ${saved.width}x${saved.height}`)
    } catch (error) {
      missed.push(`${product.brand} ${product.mpn} (${error.message})`)
      console.log(`fail ${product.brand} ${product.mpn}: ${error.message}`)
    }
  }

  writeFileSync(resolve(root, 'src/data/products.json'), `${JSON.stringify(products, null, 2)}\n`)
  writeFileSync(
    resolve(root, 'src/data/image-sources.json'),
    `${JSON.stringify(
      {
        checkedOn: '2026-11-06',
        rule: 'Official manufacturer image for the exact part number, stored in the repository. No retailer photos and no hotlinking. Parts without an entry keep the category illustration.',
        withPhoto: found.length,
        catalogueSize: products.length,
        parts: found,
      },
      null,
      2,
    )}\n`,
  )
  console.log(`\nphotos ${found.length} / ${products.length}`)
  if (missed.length) console.log(`missed from searched brands:\n${missed.join('\n')}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
