import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { Logo } from './Logo'
import { Rich } from './Rich'

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo tone="light" />
          <p className="footer__blurb">{t('footerBlurb')}</p>
          <p className="footer__domain">{t('footerDomain')}</p>
        </div>
        <div>
          <p className="footer__title">{t('footerShop')}</p>
          <Link to="/catalogue">{t('navCatalog')}</Link>
          <Link to="/panier">{t('navCart')}</Link>
          <Link to="/commande">{t('checkoutTitle')}</Link>
        </div>
        <div>
          <p className="footer__title">{t('footerHelp')}</p>
          <Link to="/livraison">{t('navDelivery')}</Link>
          <Link to="/retours">{t('navReturns')}</Link>
          <Link to="/contact">{t('navContact')}</Link>
          <Link to="/a-propos">{t('navAbout')}</Link>
        </div>
        <div>
          <p className="footer__title">{t('footerLegal')}</p>
          <Link to="/cgv">{t('navTerms')}</Link>
          <Link to="/mentions-legales">{t('navLegal')}</Link>
          <Link to="/confidentialite">{t('navPrivacy')}</Link>
        </div>
      </div>
      <div className="container footer__base">
        <p>
          <Rich text={t('footerRights', { year })} />
        </p>
        <p>{t('footerVat')}</p>
      </div>
    </footer>
  )
}
