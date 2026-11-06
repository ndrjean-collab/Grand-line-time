import { useMemo, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { ProductCard } from '../components/ProductCard'
import { VehicleSelector } from '../components/VehicleSelector'
import { categoryCopy } from '../i18n/categories'
import { useI18n } from '../i18n/I18nProvider'
import {
  asAvail,
  asPrice,
  asSort,
  categories,
  getCategory,
  queryProducts,
  vehicleLabel,
  type Avail,
  type PriceBand,
  type SortKey,
} from '../lib/catalog'
import { useMeta } from '../lib/meta'

export function CatalogPage() {
  const { categoryId } = useParams()
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const { locale, t } = useI18n()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const searching = location.pathname.startsWith('/recherche')
  const categoryFromQuery = params.get('cat') ?? undefined
  const category = searching ? categoryFromQuery : categoryId
  const knownCategory = getCategory(category)
  const q = params.get('q') ?? ''
  const make = params.get('make') ?? undefined
  const model = params.get('model') ?? undefined
  const year = params.get('year') ?? undefined
  const engine = params.get('engine') ?? undefined
  const sort = asSort(params.get('sort'))
  const avail = asAvail(params.get('avail'))
  const price = asPrice(params.get('price'))

  const results = useMemo(
    () =>
      queryProducts(
        {
          category: knownCategory?.id,
          q: q || undefined,
          make,
          model,
          year,
          engine,
          sort,
          avail,
          price,
        },
        locale,
      ),
    [knownCategory?.id, q, make, model, year, engine, sort, avail, price, locale],
  )

  const catCopy = knownCategory ? categoryCopy[knownCategory.id] : undefined
  const title = searching
    ? q
      ? t('catalogQueryLabel', { q })
      : t('catalogSearchTitle')
    : catCopy
      ? t(catCopy.title)
      : t('catalogAllTitle')

  useMeta(title, t('metaCatalog'), locale)

  if (!searching && categoryId && !knownCategory) {
    return (
      <div className="container page">
        <h1>{t('notFoundTitle')}</h1>
        <p>{t('notFoundText')}</p>
        <Link className="btn btn--dark" to="/catalogue">
          {t('navCatalog')}
        </Link>
      </div>
    )
  }

  const vehicle = vehicleLabel(locale, make, model, year, engine)

  function update(key: string, value: string, fallback: string) {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  function clearVehicle() {
    const next = new URLSearchParams(params)
    next.delete('make')
    next.delete('model')
    next.delete('year')
    next.delete('engine')
    setParams(next)
  }

  function categoryHref(id?: string) {
    if (searching) {
      const next = new URLSearchParams(params)
      if (id) next.set('cat', id)
      else next.delete('cat')
      return `/recherche?${next.toString()}`
    }
    const next = new URLSearchParams(params)
    next.delete('cat')
    const search = next.toString()
    const path = id ? `/catalogue/${id}` : '/catalogue'
    return search ? `${path}?${search}` : path
  }

  const crumbs = [
    { to: '/', label: t('navHome') },
    { to: '/catalogue', label: t('navCatalog') },
    ...(catCopy ? [{ label: t(catCopy.title) }] : searching ? [{ label: t('catalogSearchTitle') }] : []),
  ]

  return (
    <div className="container page">
      <Breadcrumbs items={crumbs} />
      <header className="page-hero">
        <p className="eyebrow">{t('catalogKicker')}</p>
        <h1>{title}</h1>
        {catCopy ? <p>{t(catCopy.blurb)}</p> : <p>{t('catLede')}</p>}
      </header>

      {vehicle ? (
        <p className="vehicle-chip">
          <span>
            {t('catalogVehicle')} : {vehicle}
          </span>
          <button type="button" onClick={clearVehicle}>
            {t('catalogClear')}
          </button>
        </p>
      ) : null}

      <div className="catalog">
        <div className="catalog__tools">
          <button type="button" className="btn btn--dark filters-toggle" onClick={() => setFiltersOpen(true)}>
            {t('catalogFilters')}
          </button>
          <p className="count">{t('catalogCount', { n: results.length })}</p>
          <label className="sort">
            <span>{t('catalogSort')}</span>
            <select value={sort} onChange={(event) => update('sort', event.target.value, 'featured')}>
              <option value={'featured' satisfies SortKey}>{t('catalogSortFeatured')}</option>
              <option value={'price-asc' satisfies SortKey}>{t('catalogSortPriceAsc')}</option>
              <option value={'price-desc' satisfies SortKey}>{t('catalogSortPriceDesc')}</option>
              <option value={'name' satisfies SortKey}>{t('catalogSortName')}</option>
            </select>
          </label>
        </div>

        <div className="catalog__layout">
          <aside className={filtersOpen ? 'filters is-open' : 'filters'} aria-label={t('a11yFilters')}>
            <div className="filters__top">
              <strong>{t('catalogFilters')}</strong>
              <button type="button" className="icon-btn" onClick={() => setFiltersOpen(false)} aria-label={t('a11yClose')}>
                ×
              </button>
            </div>
            <fieldset>
              <legend>{t('catalogCategory')}</legend>
              <Link to={categoryHref(undefined)} className={!knownCategory ? 'is-active' : ''} onClick={() => setFiltersOpen(false)}>
                {t('catalogAllTitle')}
              </Link>
              {categories.map((item) => {
                const copy = categoryCopy[item.id]
                return (
                  <Link
                    key={item.id}
                    to={categoryHref(item.id)}
                    className={item.id === knownCategory?.id ? 'is-active' : ''}
                    onClick={() => setFiltersOpen(false)}
                  >
                    {copy ? t(copy.title) : item.id}
                  </Link>
                )
              })}
            </fieldset>
            <fieldset>
              <legend>{t('catalogAvailability')}</legend>
              {(
                [
                  ['all', 'catalogAvailAll'],
                  ['stock', 'catalogAvailStock'],
                  ['partner', 'catalogAvailPartner'],
                ] as const
              ).map(([value, key]) => (
                <label key={value} className="check">
                  <input
                    type="radio"
                    name="avail"
                    checked={avail === value}
                    onChange={() => update('avail', value satisfies Avail, 'all')}
                  />
                  {t(key)}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>{t('catalogPrice')}</legend>
              {(
                [
                  ['all', 'catalogPriceAll'],
                  ['lt25', 'catalogPrice1'],
                  ['25-80', 'catalogPrice2'],
                  ['80-160', 'catalogPrice3'],
                  ['gte160', 'catalogPrice4'],
                ] as const
              ).map(([value, key]) => (
                <label key={value} className="check">
                  <input
                    type="radio"
                    name="price"
                    checked={price === value}
                    onChange={() => update('price', value satisfies PriceBand, 'all')}
                  />
                  {t(key)}
                </label>
              ))}
            </fieldset>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                const next = new URLSearchParams(params)
                next.delete('avail')
                next.delete('price')
                next.delete('sort')
                setParams(next)
              }}
            >
              {t('catalogReset')}
            </button>
            <VehicleSelector categoryId={searching ? undefined : knownCategory?.id} idPrefix="catalog-vehicle" />
          </aside>

          <div>
            {results.length === 0 ? (
              <div className="empty">
                <h2>{t('catalogEmptyTitle')}</h2>
                <p>{t('catalogEmptyText')}</p>
                <Link className="btn btn--dark" to="/catalogue">
                  {t('catalogAllTitle')}
                </Link>
              </div>
            ) : (
              <div className="product-grid">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
