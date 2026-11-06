import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PartArt, type ArtVariant } from '../components/PartArt'
import { Price } from '../components/Price'
import { ProductCard } from '../components/ProductCard'
import { Qty } from '../components/Qty'
import { StockBadge } from '../components/StockBadge'
import { useCart } from '../context/CartContext'
import { categoryCopy } from '../i18n/categories'
import { useI18n } from '../i18n/I18nProvider'
import { findMake, findModel, getProductBySlug, relatedProducts } from '../lib/catalog'
import { useMeta } from '../lib/meta'

const views: ArtVariant[] = ['main', 'detail', 'schema']

export function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  const { locale, t } = useI18n()
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [view, setView] = useState<ArtVariant>('main')
  const [added, setAdded] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const buyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = buyRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      const scrolledPast = entry.boundingClientRect.bottom < 0
      setShowBar(scrolledPast)
    }, { threshold: 0 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [product?.id])

  useMeta(product ? product.name[locale] : t('pdpMissing'), product ? product.summary[locale] : t('metaCatalog'), locale)

  if (!product) {
    return (
      <div className="container page">
        <h1>{t('pdpMissing')}</h1>
        <Link className="btn btn--dark" to="/catalogue">
          {t('navCatalog')}
        </Link>
      </div>
    )
  }

  const cat = categoryCopy[product.category]
  const related = relatedProducts(product)
  const viewLabel = {
    main: t('pdpViewMain'),
    detail: t('pdpViewDetail'),
    schema: t('pdpViewSchema'),
  }

  function addToCart() {
    add(product!.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { to: '/', label: t('navHome') },
          { to: '/catalogue', label: t('navCatalog') },
          { to: `/catalogue/${product.category}`, label: cat ? t(cat.title) : product.category },
          { label: product.name[locale] },
        ]}
      />
      <article className="pdp">
        <div className="gallery">
          <div className="art-wrap art-wrap--pdp" data-cat={product.category}>
            <PartArt art={product.art} category={product.category} title={product.name[locale]} variant={view} />
          </div>
          <div className="gallery__thumbs" role="tablist" aria-label={product.name[locale]}>
            {views.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={view === item}
                className={view === item ? 'is-active' : ''}
                onClick={() => setView(item)}
              >
                <PartArt art={product.art} category={product.category} title={viewLabel[item]} variant={item} caption={false} />
                <span>{viewLabel[item]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="pdp__info">
          <p className="eyebrow">{cat ? t(cat.title) : product.category}</p>
          <h1>{product.name[locale]}</h1>
          <p className="lede">{product.summary[locale]}</p>
          <dl className="refs">
            <div>
              <dt>{t('pdpRef')}</dt>
              <dd>{product.sku}</dd>
            </div>
            <div>
              <dt>{t('pdpOem')}</dt>
              <dd>{product.oeNumbers.length ? product.oeNumbers.join(', ') : t('pdpOemMissing')}</dd>
            </div>
          </dl>
          <StockBadge product={product} detail />
          <Price amount={product.priceTtc} rate={product.vatRate} large />
          <div className="buy" ref={buyRef}>
            <label>
              <span className="sr-only">{t('pdpQty')}</span>
              <Qty value={qty} onChange={setQty} />
            </label>
            <button type="button" className="btn btn--primary" onClick={addToCart}>
              {added ? t('pdpAdded') : t('pdpAdd')}
            </button>
          </div>
          <p>{product.description[locale]}</p>
        </div>
      </article>

      <section className="sheet">
        <h2>{t('pdpSpecs')}</h2>
        <table>
          <tbody>
            {product.specs.map((spec) => (
              <tr key={spec.label.fr}>
                <th scope="row">{spec.label[locale]}</th>
                <td>{spec.value[locale]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="sheet">
        <h2>{t('pdpCompat')}</h2>
        {product.compatibility.length === 0 ? (
          <p className="callout">{t('pdpCompatCheck')}</p>
        ) : (
          <>
            <p className="callout">{t('pdpCompatDisclaimer')}</p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>{t('compatMake')}</th>
                    <th>{t('compatModel')}</th>
                    <th>{t('compatSource')}</th>
                  </tr>
                </thead>
                <tbody>
                  {product.compatibility.map((fit) => {
                    const make = findMake(fit.make)
                    const model = findModel(fit.make, fit.model)
                    return (
                      <tr key={`${fit.make}-${fit.model}-${fit.detail ?? ''}`}>
                        <td>{make?.name[locale] ?? fit.make}</td>
                        <td>{model?.name[locale] ?? fit.model}</td>
                        <td>{fit.detail || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {related.length > 0 ? (
        <section className="section section--tight">
          <h2>{t('pdpRelated')}</h2>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      {showBar ? (
        <div className="buybar">
          <Price amount={product.priceTtc} rate={product.vatRate} />
          <button type="button" className="btn btn--primary" onClick={addToCart}>
            {added ? t('pdpAdded') : t('pdpAdd')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
