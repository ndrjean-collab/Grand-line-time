import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { categories } from '../lib/catalog'
import { categoryCopy } from '../i18n/categories'
import { locales } from '../i18n/copy'
import { useI18n } from '../i18n/I18nProvider'
import { Logo } from './Logo'
import { ReferenceSearch } from './ReferenceSearch'

export function Header() {
  const { t, locale, setLocale } = useI18n()
  const { count } = useCart()
  const location = useLocation()
  const [menu, setMenu] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)

  useEffect(() => {
    setMenu(false)
    setCatsOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenu(false)
        setCatsOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menu])

  return (
    <header className="header">
      <div className="header__bar container">
        <Logo />
        <nav className="header__nav" aria-label="Grand Line Time">
          <div className={catsOpen ? 'mega is-open' : 'mega'} onMouseLeave={() => setCatsOpen(false)}>
            <button
              className="nav-link"
              type="button"
              aria-expanded={catsOpen}
              aria-controls="cat-menu"
              onClick={() => setCatsOpen((open) => !open)}
            >
              {t('navCatalog')}
            </button>
            <div className="mega__panel" id="cat-menu" hidden={!catsOpen}>
              <Link to="/catalogue" className="mega__all" onClick={() => setCatsOpen(false)}>
                {t('catAll')}
              </Link>
              <ul>
                {categories.map((category, index) => {
                  const copy = categoryCopy[category.id]
                  return (
                    <li key={category.id}>
                      <Link to={`/catalogue/${category.id}`} onClick={() => setCatsOpen(false)}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        {copy ? t(copy.title) : category.id}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <NavLink to="/livraison" className="nav-link">
            {t('navDelivery')}
          </NavLink>
          <NavLink to="/a-propos" className="nav-link">
            {t('navAbout')}
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            {t('navContact')}
          </NavLink>
        </nav>
        <ReferenceSearch id="header-search" />
        <div className="header__tools">
          <label className="lang">
            <span className="sr-only">{t('a11yLang')}</span>
            <select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)}>
              {locales.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.short} — {item.label}
                </option>
              ))}
            </select>
          </label>
          <Link to="/panier" className="cart-btn" aria-label={t('a11yCart', { n: count })}>
            <CartIcon />
            <span>{t('navCart')}</span>
            <span className="cart-count">{count}</span>
          </Link>
          <button className="burger" type="button" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(true)}>
            <span className="sr-only">{t('a11yMenu')}</span>
            <i />
            <i />
          </button>
        </div>
      </div>
      {menu ? (
        <div className="drawer" id="mobile-menu" role="dialog" aria-modal="true" aria-label={t('a11yMenu')}>
          <div className="drawer__top">
            <Logo />
            <button type="button" className="icon-btn" onClick={() => setMenu(false)} aria-label={t('a11yClose')}>
              ×
            </button>
          </div>
          <ReferenceSearch id="drawer-search" />
          <nav>
            <p className="drawer__label">{t('navCatalog')}</p>
            <Link to="/catalogue">{t('catAll')}</Link>
            {categories.map((category) => {
              const copy = categoryCopy[category.id]
              return (
                <Link key={category.id} to={`/catalogue/${category.id}`}>
                  {copy ? t(copy.title) : category.id}
                </Link>
              )
            })}
            <p className="drawer__label">{t('footerHelp')}</p>
            <Link to="/livraison">{t('navDelivery')}</Link>
            <Link to="/retours">{t('navReturns')}</Link>
            <Link to="/a-propos">{t('navAbout')}</Link>
            <Link to="/contact">{t('navContact')}</Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
      <path
        d="M4 6h2.2l1.4 9.2a1.5 1.5 0 0 0 1.5 1.3h8.6a1.5 1.5 0 0 0 1.46-1.16L21 8H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19.5" r="1.2" fill="currentColor" />
      <circle cx="17" cy="19.5" r="1.2" fill="currentColor" />
    </svg>
  )
}
