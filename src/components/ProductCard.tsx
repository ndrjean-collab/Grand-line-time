import { Link } from 'react-router-dom'
import { categoryCopy } from '../i18n/categories'
import { useI18n } from '../i18n/I18nProvider'
import type { Product } from '../types'
import { PartArt } from './PartArt'
import { Price } from './Price'
import { StockBadge } from './StockBadge'

export function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useI18n()
  const cat = categoryCopy[product.category]
  return (
    <article className="pcard">
      <Link to={`/produit/${product.slug}`} className="pcard__link">
        <div className={product.image ? 'art-wrap art-wrap--photo' : 'art-wrap'} data-cat={product.category}>
          {product.image ? (
            <img className="part-photo" src={product.image} alt={product.name[locale]} />
          ) : (
            <PartArt art={product.art} category={product.category} title={product.name[locale]} caption={false} />
          )}
        </div>
        <div className="pcard__body">
          <p className="eyebrow">{cat ? t(cat.title) : product.category}</p>
          <h3>{product.name[locale]}</h3>
          <p className="sku">{product.sku}</p>
          <StockBadge product={product} />
          <Price amount={product.priceTtc} rate={product.vatRate} />
          <span className="pcard__more">{t('cardDetails')}</span>
        </div>
      </Link>
    </article>
  )
}
