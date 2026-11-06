import { Link } from 'react-router-dom'
import { PartArt } from '../components/PartArt'
import { Qty } from '../components/Qty'
import { StockBadge } from '../components/StockBadge'
import { useCart } from '../context/CartContext'
import { useI18n } from '../i18n/I18nProvider'
import { getProductById } from '../lib/catalog'
import { formatMoney, splitVat } from '../lib/money'
import { useMeta } from '../lib/meta'

export function CartPage() {
  const { lines, setQty, remove } = useCart()
  const { locale, t } = useI18n()
  useMeta(t('cartTitle'), t('metaCart'), locale)

  const detailed = lines.flatMap((line) => {
    const product = getProductById(line.productId)
    return product ? [{ line, product }] : []
  })
  const totalTtc = detailed.reduce((sum, item) => sum + item.product.priceTtc * item.line.qty, 0)
  const totals = splitVat(totalTtc)

  return (
    <div className="container page">
      <header className="page-hero">
        <h1>{t('cartTitle')}</h1>
      </header>
      {detailed.length === 0 ? (
        <div className="empty">
          <h2>{t('cartEmptyTitle')}</h2>
          <p>{t('cartEmptyText')}</p>
          <Link className="btn btn--dark" to="/catalogue">
            {t('cartContinue')}
          </Link>
        </div>
      ) : (
        <div className="cart">
          <ul className="cart__lines">
            {detailed.map(({ line, product }) => (
              <li key={product.id}>
                <Link to={`/produit/${product.slug}`} className={product.image ? 'art-wrap art-wrap--thumb art-wrap--photo' : 'art-wrap art-wrap--thumb'} data-cat={product.category}>
                  {product.image ? (
                    <img className="part-photo" src={product.image} alt={product.name[locale]} />
                  ) : (
                    <PartArt art={product.art} category={product.category} title={product.name[locale]} caption={false} />
                  )}
                </Link>
                <div>
                  <h2>
                    <Link to={`/produit/${product.slug}`}>{product.name[locale]}</Link>
                  </h2>
                  <p className="sku">{product.sku}</p>
                  <StockBadge product={product} />
                  <button type="button" className="text-link" onClick={() => remove(product.id)}>
                    {t('cartRemove')}
                  </button>
                </div>
                <Qty value={line.qty} onChange={(next) => setQty(product.id, next)} />
                <strong>{formatMoney(product.priceTtc * line.qty, locale)}</strong>
              </li>
            ))}
          </ul>
          <aside className="summary">
            <h2>{t('cartSummary')}</h2>
            <p>
              <span>{t('cartSubtotalHt')}</span>
              <span>{formatMoney(totals.ht, locale)}</span>
            </p>
            <p>
              <span>{t('cartVat', { rate: '20 %' })}</span>
              <span>{formatMoney(totals.vat, locale)}</span>
            </p>
            <p>
              <span>{t('cartShipping')}</span>
              <span>{t('cartShippingLater')}</span>
            </p>
            <p className="summary__total">
              <span>{t('cartTotal')}</span>
              <strong>{formatMoney(totals.ttc, locale)}</strong>
            </p>
            <p className="hint">{t('cartNote')}</p>
            <Link className="btn btn--primary" to="/commande">
              {t('cartCheckout')}
            </Link>
            <Link className="text-link" to="/catalogue">
              {t('cartContinue')}
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
