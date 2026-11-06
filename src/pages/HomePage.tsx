import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ReferenceSearch } from '../components/ReferenceSearch'
import { VehicleSelector } from '../components/VehicleSelector'
import { categoryCopy } from '../i18n/categories'
import { useI18n } from '../i18n/I18nProvider'
import { bestSellers, categories } from '../lib/catalog'
import { useMeta } from '../lib/meta'
import { PartArt } from '../components/PartArt'

export function HomePage() {
  const { locale, t } = useI18n()
  useMeta('Grand Line Time', t('metaHome'), locale)
  const picks = bestSellers().slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">{t('heroEyebrow')}</p>
            <h1>
              <span>{t('heroTitle1')}</span>
              <span>{t('heroTitle2')}</span>
            </h1>
            <p className="lede">{t('heroLede')}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/catalogue">
                {t('heroCtaCatalog')}
              </Link>
              <Link className="btn btn--ghost" to="/livraison">
                {t('heroCtaDelivery')}
              </Link>
            </div>
            <dl className="hero__stats">
              <div>
                <dt>{t('heroStat1')}</dt>
                <dd>{t('heroStat1b')}</dd>
              </div>
              <div>
                <dt>{t('heroStat2')}</dt>
                <dd>{t('heroStat2b')}</dd>
              </div>
              <div>
                <dt>{t('heroStat3')}</dt>
                <dd>{t('heroStat3b')}</dd>
              </div>
            </dl>
          </div>
          <VehicleSelector idPrefix="home-vehicle" />
        </div>
      </section>

      <section className="search-band">
        <div className="container search-band__card">
          <div>
            <h2>{t('searchTitle')}</h2>
            <p>{t('searchLede')}</p>
          </div>
          <div>
            <ReferenceSearch large id="home-search" />
            <p className="hint">{t('searchHint')}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <h2>{t('catTitle')}</h2>
              <p>{t('catLede')}</p>
            </div>
            <Link className="text-link" to="/catalogue">
              {t('catAll')}
            </Link>
          </div>
          <div className="cats">
            {categories.map((category, index) => {
              const copy = categoryCopy[category.id]
              const title = copy ? t(copy.title) : category.id
              return (
                <Link key={category.id} to={`/catalogue/${category.id}`} className="cat-card" data-cat={category.id}>
                  <span className="cat-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="art-wrap art-wrap--icon" data-cat={category.id}>
                    <PartArt art={category.art} category={category.id} title={title} caption={false} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy ? t(copy.blurb) : ''}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="container trust__grid">
          <article>
            <span>01</span>
            <h3>{t('trustShip')}</h3>
            <p>{t('trustShipText')}</p>
          </article>
          <article>
            <span>02</span>
            <h3>{t('trustReturn')}</h3>
            <p>{t('trustReturnText')}</p>
          </article>
          <article>
            <span>03</span>
            <h3>{t('trustPay')}</h3>
            <p>{t('trustPayText')}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <h2>{t('bestTitle')}</h2>
              <p>{t('bestLede')}</p>
            </div>
            <Link className="text-link" to="/catalogue">
              {t('bestAll')}
            </Link>
          </div>
          <div className="product-grid">
            {picks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <p className="eyebrow">{t('modesEyebrow')}</p>
          <h2 className="section__title">{t('modesTitle')}</h2>
          <p className="section__lede">{t('modesLede')}</p>
          <div className="modes">
            <article className="mode mode--stock">
              <h3>{t('modesStock')}</h3>
              <p>{t('modesStockText')}</p>
            </article>
            <article className="mode mode--partner">
              <h3>{t('modesPartner')}</h3>
              <p>{t('modesPartnerText')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="europe-band">
        <div className="container europe-band__inner">
          <div>
            <h2>{t('europeTitle')}</h2>
            <p>{t('europeText')}</p>
          </div>
          <Link className="btn btn--light" to="/livraison">
            {t('europeCta')}
          </Link>
        </div>
      </section>
    </>
  )
}
